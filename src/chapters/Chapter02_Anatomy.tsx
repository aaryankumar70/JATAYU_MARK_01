import React from "react";
import { useScrollStore } from "../timeline/scrollStore";

export const Chapter02_Anatomy: React.FC = () => {
  const explodedProgress = useScrollStore((s) => s.explodedProgress);

  const callouts = [
    { label: "1045 PROPELLERS", pos: "top-[20%] left-[10%] sm:left-[16%]" },
    { label: "A2212 BLDC MOTORS", pos: "top-[28%] right-[10%] sm:right-[16%]" },
    { label: "30A SPEED ESC", pos: "top-[64%] left-[8%] sm:left-[14%]" },
    { label: "F450 TRUSS ARMS", pos: "top-[52%] right-[12%] sm:right-[18%]" },
    { label: "3S 5200mAh LiPo", pos: "bottom-[22%] left-[15%] sm:left-[22%]" },
    { label: "PIXHAWK 2.4.8 FC", pos: "top-[16%] left-[45%]" },
    { label: "u-blox NEO-M8N GPS", pos: "top-[14%] right-[32%]" },
    { label: "CAMERA MODULE 3", pos: "bottom-[26%] right-[15%] sm:right-[22%]" },
  ];

  const pct = Math.round(explodedProgress * 100);

  return (
    <section
      id="chapter-02"
      className="relative min-h-[150vh] w-full flex flex-col justify-between p-8 sm:p-14 lg:p-20 pointer-events-none select-none"
    >
      {/* Top minimal header */}
      <div className="flex items-center justify-between pointer-events-auto border-b border-[#E8E5DD] pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#777777] uppercase block mb-1">
            Chapter 02 · Mechanical Separation Sequence
          </span>
          <h2 className="font-serif text-[24px] sm:text-[32px] font-normal tracking-[0.1em] text-[#111111] uppercase">
            The Anatomy
          </h2>
        </div>

        <div className="font-mono text-[11px] tracking-[0.25em] text-[#333333] font-semibold">
          DISASSEMBLY {pct}%
        </div>
      </div>

      {/* Floating minimal subsystem callouts positioned around the separating F450 3D model */}
      <div className="absolute inset-0 pointer-events-none">
        {callouts.map((item) => (
          <div
            key={item.label}
            className={`absolute ${item.pos} flex items-center space-x-2 transition-opacity duration-500 ${
              explodedProgress > 0.12 ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89758]" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#111111] uppercase bg-[#FAF9F6]/90 px-2 py-0.5 border border-[#E8E5DD] shadow-xs">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom statement */}
      <div className="border-t border-[#E8E5DD] pt-4 flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-[#555555] uppercase pointer-events-auto">
        <span className="text-[#333333]">Every Physical Subsystem Is Independently Addressable</span>
        <span className="text-[#777777]">Scroll to Inspect BOM Specifications ↓</span>
      </div>
    </section>
  );
};
