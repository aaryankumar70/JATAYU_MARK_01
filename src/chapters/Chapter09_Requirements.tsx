import React from "react";

export const Chapter09_Requirements: React.FC = () => {
  const categories = [
    {
      domain: "AIRFRAME & PROPULSION",
      items: [
        { name: "Frame", spec: "F450-class quadcopter frame with integrated PCB power distribution" },
        { name: "Motors", spec: "A2212 1000KV brushless outrunner motors (×4)" },
        { name: "Electronic Speed Controllers", spec: "30A class ESCs (×4) with linear BEC & active cooling" },
        { name: "Propellers", spec: "1045 (10 × 4.5 in) nylon composite, CW + CCW pairs" },
      ],
    },
    {
      domain: "AVIONICS & NAVIGATION",
      items: [
        { name: "Flight Controller", spec: "Pixhawk 2.4.8-class running open-source ArduPilot" },
        { name: "GNSS / Compass", spec: "u-blox NEO-M8N GNSS module elevated on folding mast" },
        { name: "Telemetry Radio", spec: "Basic 915/433 MHz telemetry transceiver pair (air + ground)" },
        { name: "RC Manual Link", spec: "6-channel or greater manual control transmitter / receiver (PPM/SBUS)" },
      ],
    },
    {
      domain: "VISION & SENSOR PAYLOAD",
      items: [
        { name: "Optical Camera", spec: "Raspberry Pi Camera Module 3 (Sony IMX708, autofocus)" },
        { name: "Mounting Bracket", spec: "Forward/downward angled vibration-damped bracket" },
        { name: "Video Interface", spec: "Dedicated 15-pin CSI-2 ribbon cable directly to companion board" },
      ],
    },
    {
      domain: "COMPUTE & POWER",
      items: [
        { name: "Companion Computer", spec: "Raspberry Pi 5 8GB (Broadcom BCM2712 quad-core 2.4GHz)" },
        { name: "Thermal Dissipation", spec: "Official Raspberry Pi active cooler (aluminum heatsink + fan)" },
        { name: "Flight Battery", spec: "3S LiPo approximately 5200mAh (11.1V nominal, XT60 connector)" },
        { name: "Local Storage", spec: "High-endurance microSD for OS, model weights & incident logs" },
      ],
    },
    {
      domain: "SOFTWARE STACK",
      items: [
        { name: "Autopilot Firmware", spec: "ArduPilot Copter with automated waypoint & failsafe RTL routines" },
        { name: "Edge Inference", spec: "Local computer vision pipeline running on Raspberry Pi 5" },
        { name: "MAVLink Bridge", spec: "Bidirectional telemetry bridge binding GPS and camera frames" },
        { name: "Ground UI", spec: "Web-based situational dashboard for incident triage & operator review" },
      ],
    },
    {
      domain: "ESTIMATED BENCHMARKS",
      items: [
        { name: "All-Up-Weight (AUW)", spec: "~1,250g (TARGET with 5200mAh battery)" },
        { name: "Flight Endurance", spec: "12–16 min (ESTIMATED, dependent on payload & battery health)" },
        { name: "Edge Inference Latency", spec: "TARGET ~10–15 FPS on lightweight quantized models" },
        { name: "Hover Stability", spec: "Standard GNSS hold (ESTIMATED ±1.5m horizontal)" },
      ],
    },
  ];

  return (
    <section
      id="chapter-09"
      className="relative min-h-screen w-full flex flex-col justify-between p-8 sm:p-14 lg:p-20 bg-[#FAF9F6] border-t border-[#E8E5DD] relative z-20 select-none"
    >
      <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#777777] uppercase block mb-1">
            Chapter 09 · Technical Inventory
          </span>
          <span className="text-[11px] font-mono tracking-[0.2em] text-[#111111] uppercase font-bold">
            Jatayu Mark 01 Prototype Configuration BOM
          </span>
        </div>
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#555555] uppercase font-medium">
          BASELINE ARCHITECTURE
        </span>
      </div>

      <div className="my-auto max-w-5xl w-full py-10">
        <h2 className="font-serif text-[32px] sm:text-[44px] font-normal tracking-[0.08em] text-[#111111] uppercase mb-2">
          Requirements
        </h2>
        <p className="font-sans text-[15px] text-[#555555] font-normal mb-10 max-w-2xl">
          An honest, physically workable bill of materials for the Mark 01 flight prototype. Built using open architecture components to prove closed-loop aerial intelligence before scaling to customized avionics.
        </p>

        {/* Clean Editorial Index (No Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {categories.map((cat) => (
            <div key={cat.domain} className="border-t border-[#111111] pt-4">
              <div className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#111111] uppercase mb-3">
                {cat.domain}
              </div>
              <div className="divide-y divide-[#E8E5DD]">
                {cat.items.map((it) => (
                  <div
                    key={it.name}
                    className="py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between text-[13px]"
                  >
                    <span className="font-mono font-medium text-[#333333] text-[12px] sm:w-2/5">
                      {it.name}
                    </span>
                    <span className="font-sans font-normal text-[#555555] text-[12px] sm:w-3/5 sm:text-right mt-0.5 sm:mt-0">
                      {it.spec}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#E8E5DD] pt-4 flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-[#555555] uppercase">
        <span className="text-[#333333]">Engineering Truth: Proven Hardware Stack</span>
        <span className="text-[#777777]">Scroll to Future Upgrades & Scaling Roadmap ↓</span>
      </div>
    </section>
  );
};
