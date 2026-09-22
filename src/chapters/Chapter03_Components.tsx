import React from "react";
import { useScrollStore } from "../timeline/scrollStore";
import droneNodesData from "../data/droneNodes.json";

export const Chapter03_Components: React.FC = () => {
  const activeComponent = useScrollStore((s) => s.activeComponent);
  const scrollToComponent = useScrollStore((s) => s.scrollToComponent);

  const activeIndex = droneNodesData.nodes.findIndex((n) => n.id === activeComponent);
  const currentNum = activeIndex >= 0 ? activeIndex + 1 : 1;

  return (
    <section
      id="chapter-03"
      className="relative w-full h-[900vh] pointer-events-none select-none"
    >
      {/* 9 dedicated scroll step anchors positioned along the 900vh timeline */}
      <div className="absolute inset-0 pointer-events-none">
        {droneNodesData.nodes.map((node, idx) => (
          <div
            key={node.id}
            id={`comp-step-${node.id}`}
            style={{
              top: `${(idx / 9) * 100}%`,
              height: `${(1 / 9) * 100}%`,
            }}
            className="absolute left-0 w-full pointer-events-none"
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Sticky framing overlay across all 9 component inspection phases */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between p-8 sm:p-14 lg:p-20 overflow-hidden pointer-events-none select-none z-10">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pointer-events-auto border-b border-[#E8E5DD] pb-4">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#777777] uppercase block mb-1">
              Chapter 03 · Prototype Subsystem Architecture
            </span>
            <div className="font-mono text-[11px] tracking-[0.25em] text-[#111111] uppercase font-semibold">
              Jatayu Mark 01 Prototype Configuration
            </div>
          </div>

          {/* 9-step progress indicator */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 font-mono text-[10px] tracking-wider text-[#777777]">
            <span className="hidden sm:inline text-[#777777] uppercase mr-1">NODE</span>
            {droneNodesData.nodes.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => scrollToComponent(item.id)}
                className={`transition-all px-1.5 py-0.5 ${
                  item.id === activeComponent
                    ? "bg-[#111111] text-[#FAF9F6] font-bold"
                    : "text-[#777777] hover:text-[#111111] hover:bg-[#EAE7DF]"
                }`}
                title={item.title}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Center: Dedicated clear whitespace for the 3D drone & ComponentInspector */}
        <div className="flex-1 w-full" aria-hidden="true" />

        {/* Bottom Framing Status Bar */}
        <div className="border-t border-[#E8E5DD] pt-4 flex items-center justify-between text-[10px] font-mono tracking-[0.25em] uppercase pointer-events-auto text-[#555555]">
          <span className="text-[#333333] font-medium">
            Subsystem [0{currentNum}/09]: {droneNodesData.nodes[activeIndex >= 0 ? activeIndex : 0].title}
          </span>
          <span className="text-[#777777] hidden sm:inline">
            {currentNum < 9
              ? "Scroll to Inspect Next Subsystem ↓"
              : "Scroll to System Transition ↓"}
          </span>
        </div>
      </div>
    </section>
  );
};
