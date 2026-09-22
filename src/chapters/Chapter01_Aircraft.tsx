import React from "react";

export const Chapter01_Aircraft: React.FC = () => {
  return (
    <section
      id="chapter-01"
      className="relative h-screen w-full flex flex-col justify-between items-center px-8 py-14 sm:py-16 pointer-events-none select-none"
    >
      {/* Top Title: JATAYU MARK 01 / PROTOTYPE CONFIGURATION */}
      <div className="pt-8 sm:pt-12 text-center pointer-events-auto">
        <h1 className="font-serif text-[36px] sm:text-[54px] font-normal tracking-[0.22em] text-[#111111] uppercase leading-none">
          Jatayu
        </h1>
        <div className="text-[12px] sm:text-[14px] font-mono tracking-[0.3em] text-[#333333] uppercase mt-2.5 font-semibold">
          Mark 01
        </div>
        <div className="inline-block mt-3 px-3 py-1 border border-[#111111] text-[10px] font-mono tracking-[0.25em] text-[#111111] uppercase bg-[#FAF9F6]/80">
          Prototype Configuration
        </div>
      </div>

      {/* Middle: Generous open negative space for the dominant hero drone */}
      <div className="flex-1 w-full" aria-hidden="true" />

      {/* Bottom Statement: AERIAL INTELLIGENCE FOR PERSISTENT INCIDENT MONITORING */}
      <div className="pb-8 sm:pb-12 text-center pointer-events-auto">
        <p className="font-mono text-[11px] sm:text-[13px] tracking-[0.28em] text-[#111111] uppercase font-medium">
          Aerial Intelligence For
        </p>
        <p className="font-mono text-[11px] sm:text-[13px] tracking-[0.28em] text-[#555555] uppercase mt-1">
          Persistent Incident Monitoring
        </p>
        <div className="mt-8 flex justify-center">
          <span className="text-[9px] font-mono tracking-[0.3em] text-[#777777] uppercase">
            Scroll to Inspect Prototype Assembly ↓
          </span>
        </div>
      </div>
    </section>
  );
};
