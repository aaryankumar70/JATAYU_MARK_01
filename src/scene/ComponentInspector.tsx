import React, { useMemo, useState, useEffect } from "react";
import { useScrollStore } from "../timeline/scrollStore";
import droneNodesData from "../data/droneNodes.json";

export const ComponentInspector: React.FC = () => {
  const activeComponent = useScrollStore((s) => s.activeComponent);
  const activeChapter = useScrollStore((s) => s.activeChapter);
  const activeAnchor = useScrollStore((s) => s.activeAnchor);
  const scrollToComponent = useScrollStore((s) => s.scrollToComponent);

  // Track window dimensions dynamically
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Map of component nodes from droneNodes.json
  const nodeMap = useMemo(() => {
    const map: Record<string, (typeof droneNodesData.nodes)[0]> = {};
    droneNodesData.nodes.forEach((n) => {
      map[n.id] = n;
    });
    return map;
  }, []);

  // Display inspector during Chapter 2 or Chapter 3, or when a component is actively selected
  const shouldRender = Boolean(activeComponent) && (activeChapter === 2 || activeChapter === 3);

  if (!shouldRender || !activeComponent) return null;

  const node = nodeMap[activeComponent] || droneNodesData.nodes[0];
  const isMobile = dimensions.width < 768;

  // Screen layout geometry for clear whitespace placement
  const isAnchorValid = activeAnchor.visible && activeAnchor.x > 0 && activeAnchor.y > 0;
  const isComponentOnLeft = isAnchorValid ? activeAnchor.x < dimensions.width * 0.5 : false;

  // Dedicated whitespace text coordinates (never overlapping the center drone)
  const cardWidth = Math.min(340, dimensions.width - 48);
  let textX = 0;
  let textY = 0;

  if (isMobile) {
    textX = 24;
    textY = Math.max(dimensions.height - 290, 80);
  } else {
    textX = isComponentOnLeft
      ? Math.max(dimensions.width * 0.65, dimensions.width - cardWidth - 48)
      : Math.min(dimensions.width * 0.08, 96);
    textY = isAnchorValid
      ? Math.max(130, Math.min(dimensions.height - 300, activeAnchor.y - 70))
      : dimensions.height * 0.35;
  }

  // Dynamic SVG leader line path
  let pathD = "";
  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;

  if (isAnchorValid) {
    startX = activeAnchor.x;
    startY = activeAnchor.y;

    if (isMobile) {
      endX = textX + 40;
      endY = textY;
      pathD = `M ${startX} ${startY} L ${endX} ${endY}`;
    } else {
      endX = isComponentOnLeft ? textX - 16 : textX + cardWidth + 16;
      endY = textY + 28;

      // Technical orthogonal elbow: Component -> Midpoint X -> Target Y -> Text edge
      const midX = isComponentOnLeft
        ? startX + (endX - startX) * 0.45
        : startX - (startX - endX) * 0.45;

      pathD = `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;
    }
  }

  return (
    <div
      id="component-annotation-layer"
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden"
    >
      {/* 1. Thin Technical Leader Line (Terminates directly at 3D component anchor) */}
      {isAnchorValid && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle backline contrast on light background */}
          <path
            d={pathD}
            fill="none"
            stroke="#FAF9F6"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Main technical 1.2px leader line */}
          <path
            d={pathD}
            fill="none"
            stroke="#111111"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Anchor dot on 3D component */}
          <circle
            cx={startX}
            cy={startY}
            r="3.5"
            fill="#B89758"
            stroke="#111111"
            strokeWidth="1.2"
          />
          <circle
            cx={startX}
            cy={startY}
            r="8"
            fill="none"
            stroke="#B89758"
            strokeWidth="0.8"
            strokeDasharray="2,2"
          />

          {/* End cap dot at text connection */}
          <circle
            cx={endX}
            cy={endY}
            r="2.5"
            fill="#111111"
          />
        </svg>
      )}

      {/* 2. Text in Dedicated Whitespace (Never overlapping the drone) */}
      <div
        className="absolute pointer-events-auto transition-all duration-300 select-text bg-[#FAF9F6]/85 backdrop-blur-[2px] p-2 sm:p-0"
        style={{
          left: `${textX}px`,
          top: `${textY}px`,
          maxWidth: `${cardWidth}px`,
        }}
      >
        {/* Subsystem category label in #777777 */}
        <div className="flex items-center space-x-2 mb-1.5">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#777777] uppercase font-medium">
            {node.category} · {node.subsystem}
          </span>
        </div>

        {/* Small Technical Title in #111111 */}
        <h3 className="font-serif text-[22px] sm:text-[25px] font-semibold tracking-[0.06em] text-[#111111] uppercase leading-tight">
          {node.title}
        </h3>

        {/* Secondary Title / Description in #333333 */}
        <div className="text-[12px] font-mono tracking-[0.18em] text-[#333333] uppercase mt-1 mb-3 font-medium">
          {node.subtitle}
        </div>

        {/* Thin divider line */}
        <div className="w-16 h-[1px] bg-[#111111] mb-3 opacity-80" />

        {/* 2–4 Specification Lines in #555555 */}
        <ul className="space-y-1.5">
          {node.specLines.map((line, idx) => (
            <li
              key={idx}
              className="flex items-start text-[12px] font-sans text-[#555555] leading-snug"
            >
              <span className="text-[#B89758] mr-2 select-none text-[11px] font-mono leading-tight">
                —
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>

        {/* Component Sequence Quick Navigation (1 to 9) */}
        <div className="mt-4 pt-3 border-t border-[#E8E5DD] flex items-center space-x-2">
          <span className="text-[9px] font-mono text-[#777777] uppercase tracking-wider">
            BOM NODE:
          </span>
          <div className="flex items-center space-x-1.5">
            {droneNodesData.nodes.map((item, i) => (
              <button
                key={item.id}
                onClick={() => scrollToComponent(item.id)}
                className={`px-1.5 py-0.5 text-[9px] font-mono transition-colors ${
                  item.id === activeComponent
                    ? "bg-[#111111] text-[#FAF9F6] font-bold"
                    : "text-[#777777] hover:text-[#111111] hover:bg-[#EAE7DF]"
                }`}
                title={item.title}
              >
                0{i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
