import React from "react";

export const Chapter10_Future: React.FC = () => {
  const upgrades = [
    {
      subsystem: "CAMERA",
      prototype: "Raspberry Pi Camera Module 3 (Fixed Mount)",
      future: "3-Axis Stabilized Dual EO / IR Thermal Sensor Gimbal",
      target: "Day & night 24/7 thermal signature identification",
    },
    {
      subsystem: "COMPUTE",
      prototype: "Raspberry Pi 5 8GB (Arm Cortex-A76)",
      future: "Dedicated Edge Tensor Accelerator (e.g. Jetson Orin Nano)",
      target: "Dense multi-class 30+ FPS edge neural inference",
    },
    {
      subsystem: "GNSS",
      prototype: "u-blox NEO-M8N GNSS on Mast",
      future: "Multi-Band Dual RTK-GNSS + Redundant Compass",
      target: "Centimeter-level georeferencing & spoofing resilience",
    },
    {
      subsystem: "FLIGHT CONTROLLER",
      prototype: "Pixhawk 2.4.8-class running ArduPilot",
      future: "Triple-Redundant Isolated Autopilot (Cube Orange+ class)",
      target: "Fail-operational hardware redundancy & DO-178C standards",
    },
    {
      subsystem: "COMMUNICATION",
      prototype: "Basic 915/433 MHz Telemetry Radio Pair",
      future: "COFDM Encrypted Long-Range IP Data & Video Link",
      target: "Resilient metropolitan multi-kilometer throughput",
    },
    {
      subsystem: "BATTERY",
      prototype: "3S LiPo ~5200mAh (XT60)",
      future: "6S High-Density LiPo Pack with SMBus Smart Gauge",
      target: "Extended patrol endurance & real-time cell health telemetry",
    },
    {
      subsystem: "AIRFRAME",
      prototype: "F450 Polyamide Nylon Arms & Open PCB Plates",
      future: "Custom Molded 3K Carbon-Fiber Monocoque (IP54)",
      target: "All-weather rain/dust sealing & aerodynamic efficiency",
    },
  ];

  const roadmap = [
    {
      version: "MARK 01",
      title: "PROTOTYPE VALIDATION",
      desc: "Single-aircraft proof-of-concept on F450 architecture. Validates onboard vision, edge model execution, and telemetry pipeline.",
    },
    {
      version: "MARK 02",
      title: "PERSISTENT DUAL PATROL",
      desc: "Staggered twin-aircraft deployment rotating operational duty to extend persistent sector coverage without observation gaps.",
    },
    {
      version: "MARK 03",
      title: "AUTOMATED DOCKING & CHARGING",
      desc: "Autonomous precision landing on weatherproof docking stations for rapid battery exchange and automated pre-flight diagnostics.",
    },
    {
      version: "MARK 04",
      title: "MULTI-SECTOR METROPOLITAN GRID",
      desc: "Coordinated fleet patrolling adjacent civic sectors with distributed ground telemetry and centralized dispatch.",
    },
  ];

  return (
    <section
      id="chapter-10"
      className="relative min-h-screen w-full flex flex-col justify-between p-8 sm:p-14 lg:p-20 bg-[#FAF9F6] border-t border-[#E8E5DD] relative z-20 select-none"
    >
      <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#777777] uppercase block mb-1">
            Chapter 10 · Hardware Roadmap & Evolution
          </span>
          <span className="text-[11px] font-mono tracking-[0.2em] text-[#111111] uppercase font-bold">
            Prototype to Production Scaling Path
          </span>
        </div>
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#555555] uppercase font-medium">
          ROADMAP ARCHITECTURE
        </span>
      </div>

      <div className="my-auto max-w-5xl w-full py-10">
        <h2 className="font-serif text-[32px] sm:text-[44px] font-normal tracking-[0.08em] text-[#111111] uppercase mb-3">
          Future Architecture
        </h2>
        <p className="font-sans text-[15px] text-[#555555] font-normal max-w-2xl mb-12">
          The Jatayu Mark 01 Prototype establishes the operational software and sensor loop using accessible, workable hardware. Future iterations scale each subsystem to specialized aerospace standards.
        </p>

        {/* 1. Subsystem Upgrades Table */}
        <div className="border-t border-[#111111] pt-4 mb-16">
          <div className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#111111] uppercase mb-4">
            Subsystem Upgrade Matrix
          </div>
          <div className="divide-y divide-[#E8E5DD]">
            {upgrades.map((u) => (
              <div
                key={u.subsystem}
                className="py-3.5 grid grid-cols-1 md:grid-cols-4 gap-2 text-[12px]"
              >
                <div className="font-mono font-bold text-[#111111] tracking-wider">
                  {u.subsystem}
                </div>
                <div className="font-sans text-[#777777]">
                  <span className="font-mono text-[10px] text-[#777777] uppercase block">
                    Mark 01 Prototype:
                  </span>
                  {u.prototype}
                </div>
                <div className="font-sans font-medium text-[#111111]">
                  <span className="font-mono text-[10px] text-[#B89758] uppercase block">
                    Future Production:
                  </span>
                  {u.future}
                </div>
                <div className="font-sans text-[#555555] italic md:text-right">
                  {u.target}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Generational Deployment Roadmap */}
        <div className="border-t border-[#111111] pt-4">
          <div className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#111111] uppercase mb-6">
            Operational Scaling Roadmap
          </div>
          <div className="border-l border-[#111111] pl-6 sm:pl-10 space-y-6 font-mono">
            {roadmap.map((step, idx) => (
              <div key={step.version} className="relative">
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3 h-[1px] bg-[#111111]" />
                <div className="flex items-baseline space-x-3">
                  <span className="text-[11px] font-bold tracking-[0.2em] text-[#B89758] uppercase">
                    {step.version}
                  </span>
                  <span className="text-[13px] font-semibold tracking-[0.15em] text-[#111111] uppercase">
                    {step.title}
                  </span>
                </div>
                <p className="font-sans text-[13px] text-[#555555] font-normal mt-1 max-w-2xl">
                  {step.desc}
                </p>
                {idx < roadmap.length - 1 && (
                  <div className="text-[10px] text-[#777777] py-0.5 select-none pl-1">
                    ↓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[#E8E5DD] pt-4 flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-[#555555] uppercase">
        <span className="text-[#333333]">System Evolution: Progressive Hardware Maturation</span>
        <span className="text-[#777777]">Scroll to Final Vision ↓</span>
      </div>
    </section>
  );
};
