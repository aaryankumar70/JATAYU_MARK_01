import React, { useState } from "react";

export const Chapter07_TheEvent: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<0 | 1 | 2>(0);

  const scenarios = [
    {
      title: "CROWD ANOMALY",
      condition: "Sustained Pedestrian Clustering",
      trigger: "Density exceeds 0.40 persons/m² for > 35 seconds",
      indicators: [
        { key: "LOCAL DENSITY", val: "0.48 / M²" },
        { key: "PERSISTENCE", val: "52 SECONDS" },
        { key: "VELOCITY FLUX", val: "-82% (STATIONARY)" },
      ],
      description:
        "High localized density with constrained egress vectors flagged as an atypical public gathering or pathway obstruction.",
    },
    {
      title: "POSSIBLE ACCIDENT",
      condition: "Rapid Deceleration & Vehicle Cluster",
      trigger: "Sudden velocity delta > 30 km/h with adjacent vehicle stoppage",
      indicators: [
        { key: "DELTA VELOCITY", val: "-44 KM/H IN 1.2S" },
        { key: "LANE IMPEDANCE", val: "PRIMARY CORRIDOR" },
        { key: "SECONDARY QUEUE", val: "FORMING (+6 VEHICLES)" },
      ],
      description:
        "Kinematic vector collapse followed by roadway queueing flagged for traffic management verification.",
    },
    {
      title: "OPTICAL SMOKE / PLUME",
      condition: "Visual Contrast Plume Diffusion",
      trigger: "Persistent expanding low-frequency edge contour detected across frames",
      indicators: [
        { key: "DIFFUSION CONTOUR", val: "EXPANDING 14M²" },
        { key: "CONTRAST DELTA", val: "HIGH SIGMA VARIANCE" },
        { key: "PLUME PERSISTENCE", val: "CONFIRMED (18S)" },
      ],
      description:
        "Optical contrast differential and spreading plume flagged for immediate civil protection and operator verification.",
    },
  ];

  const current = scenarios[activeScenario];

  return (
    <section
      id="chapter-07"
      className="relative min-h-screen w-full flex flex-col justify-between p-8 sm:p-14 lg:p-20 bg-[#FAF9F6] border-t border-[#E8E5DD] relative z-20 select-none"
    >
      <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#777777] uppercase block mb-1">
            Chapter 07 · Incident Detection Logic
          </span>
          <span className="text-[11px] font-mono tracking-[0.2em] text-[#111111] uppercase font-bold">
            Human-in-the-Loop Validation Logic
          </span>
        </div>
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#555555] uppercase font-medium">
          DECISION BOUNDARY
        </span>
      </div>

      <div className="my-auto max-w-4xl w-full py-10">
        <div className="max-w-xl mb-8">
          <h2 className="font-serif text-[32px] sm:text-[44px] font-normal tracking-[0.08em] text-[#111111] uppercase">
            The Event
          </h2>
          <p className="font-sans text-[15px] text-[#555555] font-normal leading-relaxed mt-2">
            The aircraft does not make autonomous operational decisions. It detects deviations from baseline patterns and flags candidate anomalies for authorized operator verification.
          </p>
        </div>

        {/* Scenario Selectors */}
        <div className="flex border-b border-[#E8E5DD] mb-8 font-mono text-[11px]">
          {scenarios.map((sc, idx) => (
            <button
              key={sc.title}
              onClick={() => setActiveScenario(idx as 0 | 1 | 2)}
              className={`py-3 px-4 sm:px-6 tracking-[0.2em] uppercase transition-colors border-b-2 -mb-[2px] ${
                activeScenario === idx
                  ? "border-[#111111] text-[#111111] font-bold"
                  : "border-transparent text-[#777777] hover:text-[#111111]"
              }`}
            >
              {sc.title}
            </button>
          ))}
        </div>

        {/* Selected Scenario Presentation */}
        <div className="border border-[#E8E5DD] bg-white p-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-4 mb-6 border-b border-[#E8E5DD]">
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#B89758] uppercase block font-semibold">
                {current.condition}
              </span>
              <h3 className="font-serif text-[24px] sm:text-[28px] tracking-[0.06em] text-[#111111] uppercase mt-0.5">
                {current.title}
              </h3>
            </div>
            <div className="text-[10px] font-mono text-[#555555] tracking-wider mt-2 sm:mt-0">
              CRITERIA: {current.trigger}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            {current.indicators.map((ind) => (
              <div key={ind.key} className="border-l border-[#111111] pl-3 font-mono">
                <span className="text-[9px] text-[#777777] tracking-widest block uppercase font-medium">
                  {ind.key}
                </span>
                <span className="text-[14px] text-[#111111] font-bold tracking-wide">
                  {ind.val}
                </span>
              </div>
            ))}
          </div>

          <p className="font-sans text-[14px] text-[#555555] font-normal leading-relaxed pt-4 border-t border-[#F0EDE6]">
            {current.description}
          </p>
        </div>
      </div>

      <div className="border-t border-[#E8E5DD] pt-4 flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-[#555555] uppercase">
        <span className="text-[#333333]">Operational Rule: Zero Autonomous Weaponization or Action</span>
        <span className="text-[#777777]">Scroll to Ground Station Dispatch ↓</span>
      </div>
    </section>
  );
};
