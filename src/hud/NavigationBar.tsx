import React from "react";
import { useScrollStore } from "../timeline/scrollStore";

export const NavigationBar: React.FC = () => {
  const scrollProgress = useScrollStore((s) => s.scrollProgress);

  return (
    <>
      {/* 1. Subtle hairline progress line along the very top edge */}
      <div className="fixed top-0 left-0 right-0 h-[1.5px] bg-[#E8E5DD] z-50 pointer-events-none">
        <div
          className="h-full bg-[#111111] transition-all duration-100 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />
      </div>

      {/* 2. Global Minimal Header: Top-Left JATAYU, Top-Right MARK 01 · PROTOTYPE CONFIGURATION */}
      <header className="fixed top-0 left-0 right-0 z-40 px-8 sm:px-14 py-7 flex items-center justify-between pointer-events-none">
        {/* Top-Left: JATAYU */}
        <div
          onClick={() => {
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="pointer-events-auto cursor-pointer group flex items-center space-x-2"
        >
          <span className="font-serif text-[18px] sm:text-[20px] font-normal tracking-[0.22em] text-[#111111] uppercase transition-opacity group-hover:opacity-70">
            Jatayu
          </span>
        </div>

        {/* Top-Right: MARK 01 · PROTOTYPE CONFIGURATION */}
        <div className="pointer-events-auto flex items-center space-x-2 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-[#111111] uppercase font-semibold">
          <span>Mark 01</span>
          <span className="text-[#B89758] hidden sm:inline">·</span>
          <span className="text-[#333333] hidden sm:inline font-normal">Prototype Configuration</span>
        </div>
      </header>
    </>
  );
};
