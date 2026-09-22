import React from "react";

export const Chapter08_GroundStation: React.FC = () => {
  return (
    <section
      id="chapter-08"
      className="relative min-h-screen w-full flex flex-col justify-between p-8 sm:p-14 lg:p-20 bg-[#FAF9F6] border-t border-[#E8E5DD] relative z-20 select-none"
    >
      <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#777777] uppercase block mb-1">
            Chapter 08 · Ground Command Interface
          </span>
          <span className="text-[11px] font-mono tracking-[0.2em] text-[#111111] uppercase font-bold">
            Bandwidth-Efficient Event Telemetry
          </span>
        </div>
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#555555] uppercase font-medium">
          AIR-TO-GROUND TELEMETRY LINK
        </span>
      </div>

      <div className="my-auto max-w-4xl w-full py-10">
        <div className="max-w-xl mb-8">
          <h2 className="font-serif text-[32px] sm:text-[44px] font-normal tracking-[0.08em] text-[#111111] uppercase">
            The Ground Station
          </h2>
          <p className="font-sans text-[15px] text-[#555555] font-normal leading-relaxed mt-2">
            The aircraft does not stream continuous high-bandwidth video back to base. Instead, it transmits lightweight, encrypted event packets containing visual keyframes, GNSS spatial provenance, and confidence scores for operator triage.
          </p>
        </div>

        {/* Transmitted Event Packet Mockup */}
        <div className="border border-[#E8E5DD] bg-white p-8">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E8E5DD]">
            <div className="flex items-center space-x-3">
              <span className="w-2 h-2 rounded-full bg-[#B89758]" />
              <span className="font-mono text-[12px] font-bold tracking-[0.2em] text-[#111111] uppercase">
                INCOMING EVENT PACKET #JAT-8821
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#555555] tracking-wider">
              PACKET SIZE: 38 KB (TELEMETRY PROTOCOL)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6 font-mono text-[12px]">
            {/* Left: Spatial Coordinates & Telemetry */}
            <div className="space-y-3">
              <div className="text-[10px] text-[#777777] uppercase tracking-wider pb-1 border-b border-[#F0EDE6] font-semibold">
                Spatial Coordinates (u-blox GNSS)
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#555555]">LATITUDE:</span>
                <span className="text-[#111111] font-bold">12.9716° N</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#555555]">LONGITUDE:</span>
                <span className="text-[#111111] font-bold">77.5946° E</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#555555]">ALTITUDE (MSL):</span>
                <span className="text-[#111111] font-bold">920.4 M (AGL: 45 M)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#555555]">TIMESTAMP (UTC):</span>
                <span className="text-[#111111] font-bold">2026-09-21 11:58:24</span>
              </div>
            </div>

            {/* Right: Anomaly Evaluation & Verification */}
            <div className="space-y-3">
              <div className="text-[10px] text-[#777777] uppercase tracking-wider pb-1 border-b border-[#F0EDE6] font-semibold">
                Perception Evidence (Pi 5 Pipeline)
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#555555]">CLASSIFICATION:</span>
                <span className="text-[#111111] font-bold">PEDESTRIAN CLUSTER</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#555555]">INFERENCE SCORE:</span>
                <span className="text-[#B89758] font-bold">0.88 CONFIRMED</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#555555]">AIRCRAFT NODE:</span>
                <span className="text-[#111111] font-bold">MARK 01 · PATROL SECTOR 4</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#555555]">OPERATOR REVIEW:</span>
                <span className="text-[#111111] font-bold">PENDING VERIFICATION</span>
              </div>
            </div>
          </div>

          <div className="bg-[#FAF9F6] border border-[#E8E5DD] p-4 flex flex-col sm:flex-row sm:items-center justify-between font-mono text-[11px] gap-2">
            <span className="text-[#333333]">
              Operator Decision: [1] ACKNOWLEDGE & DISPATCH [2] DISMISS NORMAL [3] RE-ORBIT SECTOR
            </span>
            <span className="text-[#B89758] font-bold uppercase tracking-wider">
              AUTHORIZATION LEVEL 1
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E8E5DD] pt-4 flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-[#555555] uppercase">
        <span className="text-[#333333]">RF Architecture: Basic 915 MHz Telemetry Link</span>
        <span className="text-[#777777]">Scroll to Technical Inventory ↓</span>
      </div>
    </section>
  );
};
