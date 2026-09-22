import React from "react";

export const Chapter05_HowItWorks: React.FC = () => {
  const stages = [
    {
      title: "PATROL",
      desc: "Pixhawk autopilot guides the F450 aircraft across predefined waypoint sectors.",
    },
    {
      title: "OBSERVE",
      desc: "Raspberry Pi Camera Module 3 optical sensor continuously captures the aerial scene.",
    },
    {
      title: "DETECT",
      desc: "Raspberry Pi 5 runs lightweight quantized object detection on incoming frames.",
    },
    {
      title: "TRACK",
      desc: "Candidate targets and boundaries are correlated over sequential temporal windows.",
    },
    {
      title: "ANALYZE",
      desc: "Event evaluation algorithms score spatial density, velocity, persistence, and sector.",
      criteria: ["DENSITY", "VELOCITY", "PERSISTENCE", "LOCATION"],
    },
    {
      title: "CLASSIFY",
      desc: "Determines possible incident signature against predefined operational thresholds.",
    },
    {
      title: "ALERT",
      desc: "Dispatches compact event packet with bounding coordinates to authorized ground operator.",
    },
  ];

  return (
    <section
      id="chapter-05"
      className="relative min-h-screen w-full flex flex-col justify-between p-8 sm:p-14 lg:p-20 bg-[#FAF9F6] border-t border-[#E8E5DD] relative z-20 select-none"
    >
      {/* Top identifier */}
      <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#777777] uppercase block mb-1">
            Chapter 05 · Systematic Architecture
          </span>
          <span className="text-[11px] font-mono tracking-[0.2em] text-[#111111] uppercase font-bold">
            Closed-Loop Operational Processing Pipeline
          </span>
        </div>
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#555555] uppercase font-medium">
          7-STAGE OPERATIONAL PIPELINE
        </span>
      </div>

      {/* Main architectural flow diagram */}
      <div className="my-auto max-w-4xl w-full py-10">
        <h2 className="font-serif text-[32px] sm:text-[44px] font-normal tracking-[0.08em] text-[#111111] uppercase mb-4">
          How It Works
        </h2>
        <p className="font-sans text-[15px] text-[#555555] font-normal max-w-xl mb-12">
          A deterministic processing flow from aerial waypoint patrol to ground human verification.
        </p>

        {/* Elegant flow pipeline */}
        <div className="border-l border-[#111111] pl-6 sm:pl-10 space-y-6 font-mono">
          {stages.map((stg, i) => (
            <div key={stg.title} className="relative group">
              <div className="absolute -left-[31px] sm:-left-[47px] top-2 w-3 h-[1px] bg-[#111111]" />

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between max-w-2xl">
                <div>
                  <span className="text-[14px] font-bold tracking-[0.2em] text-[#111111] uppercase">
                    0{i + 1} · {stg.title}
                  </span>
                  <p className="font-sans text-[13px] text-[#555555] font-normal mt-1">
                    {stg.desc}
                  </p>
                </div>

                {stg.criteria && (
                  <div className="flex flex-wrap gap-1.5 mt-2 sm:mt-0">
                    {stg.criteria.map((c) => (
                      <span
                        key={c}
                        className="text-[9px] font-mono tracking-wider text-[#111111] bg-[#F0EDE6] border border-[#E8E5DD] px-1.5 py-0.5"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {i < stages.length - 1 && (
                <div className="text-[10px] text-[#777777] py-1 select-none pl-1">
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom datum */}
      <div className="border-t border-[#E8E5DD] pt-4 flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-[#555555] uppercase">
        <span className="text-[#333333]">Processing Standard: Deterministic Edge Execution</span>
        <span className="text-[#777777]">Scroll to Visual AI Intelligence ↓</span>
      </div>
    </section>
  );
};
