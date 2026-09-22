import React from "react";

export const Chapter04_System: React.FC = () => {
  const acronym = [
    { letter: "J", word: "Joint" },
    { letter: "A", word: "Autonomous" },
    { letter: "T", word: "Tracking" },
    { letter: "A", word: "Anomaly" },
    { letter: "Y", word: "Yield" },
    { letter: "U", word: "Unit" },
  ];

  const steps = [
    { name: "DRONE", role: "F450 Airframe Platform & Pixhawk Autopilot" },
    { name: "VISION", role: "Raspberry Pi Camera Module 3 Optical Sensor Feed" },
    { name: "INTELLIGENCE", role: "Raspberry Pi 5 8GB Edge Neural Pipeline" },
    { name: "LOCATION", role: "u-blox NEO-M8N GNSS Coordinate & Heading Provenance" },
    { name: "EVENT", role: "Classified Incident Packet with Bounding Box & Metadata" },
    { name: "GROUND STATION", role: "Authorized Human Review & Command Dispatch" },
  ];

  return (
    <div id="chapter-04" className="relative w-full">
      {/* 1. First Part: Physical Reassembly Lockup */}
      <section className="min-h-screen w-full flex flex-col justify-between p-8 sm:p-14 lg:p-20 pointer-events-none select-none">
        <div className="flex items-center justify-between pointer-events-auto border-b border-[#E8E5DD] pb-4">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#777777] uppercase">
            Chapter 04 · System Transition
          </span>
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#333333] uppercase font-semibold">
            Prototype Reassembly Complete
          </span>
        </div>

        {/* Center monumental statement in open gallery space */}
        <div className="my-auto max-w-2xl pointer-events-auto">
          <h2 className="font-serif text-[42px] sm:text-[64px] lg:text-[76px] font-normal tracking-[0.08em] text-[#111111] uppercase leading-[0.95] mb-4">
            This is the aircraft.
          </h2>

          <div className="w-12 h-[1px] bg-[#111111] mb-5 opacity-60" />

          <p className="font-serif italic text-[20px] sm:text-[26px] text-[#333333] tracking-wide">
            But Jatayu is the system around it.
          </p>
        </div>

        <div className="border-t border-[#E8E5DD] pt-4 flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-[#555555] uppercase pointer-events-auto">
          <span className="text-[#333333]">Mark 01 Prototype Configuration: Ready</span>
          <span className="text-[#777777]">Scroll to System Architecture ↓</span>
        </div>
      </section>

      {/* 2. Second Part: What is Jatayu Architectural Definition */}
      <section className="min-h-screen w-full flex flex-col justify-between p-8 sm:p-14 lg:p-20 bg-[#FAF9F6] border-t border-[#E8E5DD] relative z-20">
        <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-4">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#777777] uppercase">
            System Definition
          </span>
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#333333] uppercase font-medium">
            Closed-Loop Operation
          </span>
        </div>

        <div className="my-auto max-w-2xl py-8">
          <h3 className="font-serif text-[34px] sm:text-[48px] font-normal tracking-[0.1em] text-[#111111] uppercase mb-6">
            What is Jatayu?
          </h3>

          {/* Acronym reveal: J-A-T-A-Y-U, one word per letter */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-x-3 gap-y-6 mb-6">
            {acronym.map((a) => (
              <div key={a.word} className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <span className="font-serif text-[40px] sm:text-[48px] leading-none text-[#111111]">
                  {a.letter}
                </span>
                <div className="w-5 h-[1px] bg-[#B89758] my-2 opacity-80" />
                <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.15em] text-[#555555] uppercase">
                  {a.word}
                </span>
              </div>
            ))}
          </div>

          <div className="inline-block mb-8 px-3 py-1.5 border border-[#111111] bg-[#FAF9F6]">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.18em] text-[#111111] uppercase font-semibold">
              Joint Autonomous Tracking &amp; Anomaly Yield Unit
            </span>
          </div>

          <p className="font-sans text-[17px] sm:text-[19px] text-[#333333] leading-relaxed font-light mb-12">
            A drone-based aerial monitoring system designed to patrol predefined sectors, observe the environment, detect selected visual events, attach spatial context and deliver flagged events to an authorized ground station.
          </p>

          {/* Clean minimal vertical line diagram without cards */}
          <div className="border-l border-[#111111] pl-6 sm:pl-8 space-y-4 font-mono">
            {steps.map((s, idx) => (
              <div key={s.name} className="relative">
                <div className="absolute -left-[31px] sm:-left-[39px] top-2 w-2 h-[1px] bg-[#111111]" />
                <div className="flex items-baseline space-x-3">
                  <span className="text-[13px] font-bold tracking-[0.2em] text-[#111111] uppercase">
                    {s.name}
                  </span>
                  <span className="text-[12px] font-sans text-[#555555] font-normal">
                    — {s.role}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className="text-[10px] text-[#777777] py-0.5 select-none pl-1">
                    ↓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[#E8E5DD] pt-4 flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-[#555555] uppercase">
          <span className="text-[#333333]">Continuous Operational Architecture</span>
          <span className="text-[#777777]">Scroll to Operational Loop ↓</span>
        </div>
      </section>
    </div>
  );
};
