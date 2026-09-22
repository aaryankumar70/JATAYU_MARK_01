import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { DroneModel } from "./DroneModel";
import { CameraRig } from "./CameraRig";
import { LightingAndEnvironment } from "./LightingAndEnvironment";
import { useScrollStore } from "../timeline/scrollStore";

export const SceneCanvas: React.FC = () => {
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const canvasVisible = useScrollStore((s) => s.canvasVisible);

  if (hasWebGLError) {
    return (
      <div
        id="webgl-fallback-container"
        className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center bg-[#FAF9F6]"
      >
        <div className="border border-[#E8E5DD] bg-white p-8 max-w-md text-center shadow-xs">
          <div className="text-[10px] font-mono text-[#6B6864] uppercase tracking-[0.2em] mb-2">
            Engineering Schematic Render
          </div>
          <p className="text-[14px] text-[#6B6864] mb-4 font-sans">
            Displaying structural blueprint view.
          </p>
          <div className="inline-block px-3 py-1 border border-[#181818] text-[#181818] font-mono text-[11px] tracking-wider">
            JATAYU MARK 01 ARTIFACT
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="main-3d-viewport"
      className={`fixed inset-0 z-0 transition-opacity duration-700 overflow-hidden ${
        canvasVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Warm natural light ambient vignette for museum cathedral atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.6) 0%, rgba(250, 249, 246, 0.75) 55%, #EBE7DD 100%)",
        }}
      />

      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.18, 1.45], fov: 42 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            setHasWebGLError(true);
          });
        }}
      >
        <CameraRig />
        <LightingAndEnvironment />
        <DroneModel />
      </Canvas>
    </div>
  );
};
