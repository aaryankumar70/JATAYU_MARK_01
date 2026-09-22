import React from "react";

export const Chapter06_Intelligence: React.FC = () => {
  return (
    <section
      id="chapter-06"
      className="relative min-h-screen w-full flex flex-col justify-between p-8 sm:p-14 lg:p-20 bg-[#FAF9F6] border-t border-[#E8E5DD] relative z-20 select-none"
    >
      <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#777777] uppercase block mb-1">
            Chapter 06 · Edge Perception Architecture
          </span>
          <span className="text-[11px] font-mono tracking-[0.2em] text-[#111111] uppercase font-bold">
            Onboard Neural Processing Pipeline
          </span>
        </div>
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#555555] uppercase font-medium">
          LOCAL INFERENCE ENGINE
        </span>
      </div>

      <div className="my-auto max-w-5xl w-full py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="font-serif text-[32px] sm:text-[44px] font-normal tracking-[0.08em] text-[#111111] uppercase">
              Intelligence
            </h2>
            <p className="font-sans text-[15px] text-[#555555] font-normal mt-1">
              Onboard vision pipeline: Camera frame → Quantized object detection → Temporal tracking → Event evaluation.
            </p>
          </div>
          <div className="font-mono text-[11px] tracking-[0.2em] text-[#111111] font-semibold mt-4 md:mt-0">
            RATE: TARGET 10–15 FPS · INFERENCE: ESTIMATED ~70–90 MS (RPI 5)
          </div>
        </div>

        {/* Clean, authentic computer vision frame simulation */}
        <div className="border border-[#E8E5DD] bg-white p-6 sm:p-8 relative">
          {/* Datum markings */}
          <div className="absolute top-3 left-4 text-[9px] font-mono text-[#777777]">
            PI_CAM_3 · SONY IMX708 · 1080P RAW
          </div>
          <div className="absolute top-3 right-4 text-[9px] font-mono text-[#777777]">
            PROTOTYPE FOV 75° · ALT ESTIMATED 45M
          </div>

          <div className="relative w-full aspect-16/9 bg-[#F7F5EE] border border-[#E8E5DD] overflow-hidden flex items-center justify-center">
            {/* Subtle grid lines simulating aerial orthophoto grid */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  "linear-gradient(#111111 1px, transparent 1px), linear-gradient(90deg, #111111 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Bounding Box 01: Vehicle */}
            <div className="absolute top-[28%] left-[22%] w-[18%] h-[24%] border border-[#111111] p-1.5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[8px] font-mono tracking-wider bg-white/95 px-1 border border-[#E8E5DD] text-[#111111] font-semibold">
                <span>VEHICLE #041</span>
                <span>CONF: 0.91</span>
              </div>
              <div className="text-[7px] font-mono text-[#555555] flex justify-between bg-white/80 px-0.5">
                <span>HEADING: 32°</span>
                <span>EST: IN MOTION</span>
              </div>
            </div>

            {/* Bounding Box 02: Cluster */}
            <div className="absolute top-[40%] right-[25%] w-[32%] h-[38%] border border-[#B89758] p-2 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[8px] font-mono tracking-wider bg-[#FAF9F6] px-1 border border-[#E8E5DD]">
                <span className="text-[#B89758] font-bold">CLUSTER #018</span>
                <span className="text-[#111111]">N=14 · CONF: 0.88</span>
              </div>

              {/* Sub-detections inside cluster */}
              <div className="grid grid-cols-2 gap-1 my-auto">
                <div className="border border-dashed border-[#111111]/40 text-[7px] font-mono p-0.5 text-center text-[#333333]">
                  PED_088 (0.89)
                </div>
                <div className="border border-dashed border-[#111111]/40 text-[7px] font-mono p-0.5 text-center text-[#333333]">
                  PED_089 (0.86)
                </div>
                <div className="border border-dashed border-[#111111]/40 text-[7px] font-mono p-0.5 text-center text-[#333333]">
                  PED_090 (0.92)
                </div>
                <div className="border border-dashed border-[#111111]/40 text-[7px] font-mono p-0.5 text-center text-[#333333]">
                  PED_091 (0.84)
                </div>
              </div>

              <div className="text-[7px] font-mono text-[#111111] flex justify-between bg-white/90 px-1 border border-[#E8E5DD]">
                <span className="text-[#B89758] font-semibold">DENSITY: 0.42/M²</span>
                <span>PERSISTENCE: 48S</span>
              </div>
            </div>

            {/* Crosshair optical center */}
            <div className="w-6 h-6 border-t border-b border-l border-r border-[#111111]/30 flex items-center justify-center">
              <div className="w-1 h-1 bg-[#111111]/50" />
            </div>
          </div>

          {/* Pipeline stages caption below the frame */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 mt-4 border-t border-[#E8E5DD] font-mono text-[11px]">
            <div>
              <span className="text-[#777777] block text-[9px] uppercase">01 / CAPTURE</span>
              <span className="text-[#111111] font-medium">Camera Module 3 CSI</span>
            </div>
            <div>
              <span className="text-[#777777] block text-[9px] uppercase">02 / DETECT</span>
              <span className="text-[#111111] font-medium">Quantized Neural Core</span>
            </div>
            <div>
              <span className="text-[#777777] block text-[9px] uppercase">03 / TRACK</span>
              <span className="text-[#111111] font-medium">Temporal Association</span>
            </div>
            <div>
              <span className="text-[#B89758] block text-[9px] uppercase font-semibold">04 / EVALUATE</span>
              <span className="text-[#111111] font-medium">Anomaly Thresholds</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E8E5DD] pt-4 flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-[#555555] uppercase">
        <span className="text-[#333333]">Processing Standard: Zero Cloud Dependency for Flight Inference</span>
        <span className="text-[#777777]">Scroll to The Event Evaluation ↓</span>
      </div>
    </section>
  );
};
