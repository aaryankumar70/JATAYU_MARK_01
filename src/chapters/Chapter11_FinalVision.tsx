import React from "react";

export const Chapter11_FinalVision: React.FC = () => {
  return (
    <section
      id="chapter-11"
      className="relative h-screen w-full flex flex-col justify-between items-center px-8 py-14 sm:py-16 pointer-events-none select-none"
    >
      {/* Top Title: JATAYU / MARK 01 / PROTOTYPE CONFIGURATION */}
      <div className="pt-8 sm:pt-12 text-center pointer-events-auto">
        <h2 className="font-serif text-[36px] sm:text-[54px] font-normal tracking-[0.22em] text-[#111111] uppercase leading-none">
          Jatayu
        </h2>
        <div className="text-[12px] sm:text-[14px] font-mono tracking-[0.3em] text-[#333333] uppercase mt-2.5 font-semibold">
          Mark 01
        </div>
        <div className="inline-block mt-3 px-3 py-1 border border-[#111111] text-[10px] font-mono tracking-[0.25em] text-[#111111] uppercase bg-[#FAF9F6]/80">
          Prototype Configuration
        </div>
      </div>

      {/* Middle: Clear negative space where the complete 3D drone hovers */}
      <div className="flex-1 w-full" aria-hidden="true" />

      {/* Bottom statement: FROM ONE DRONE TO A SYSTEM OF AERIAL INTELLIGENCE */}
      <div className="pb-8 sm:pb-12 text-center pointer-events-auto">
        <p className="font-mono text-[11px] sm:text-[13px] tracking-[0.3em] text-[#111111] uppercase max-w-xl font-medium">
          From One Drone to a System of Aerial Intelligence.
        </p>

        <div className="mt-8 flex items-center justify-center space-x-6">
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="text-[10px] font-mono tracking-[0.25em] text-[#555555] hover:text-[#111111] uppercase transition-colors px-3 py-1.5 border border-[#E8E5DD] hover:border-[#111111]"
          >
            ↑ Return to Surface
          </button>
        </div>
      </div>
    </section>
  );
};
