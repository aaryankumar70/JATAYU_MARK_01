import React from "react";
import * as THREE from "three";

export const LightingAndEnvironment: React.FC = () => {
  return (
    <>
      {/* 1. Natural Clerestory Architectural Daylight from high zenith */}
      <directionalLight
        position={[-2.5, 6.0, 3.5]}
        intensity={1.5}
        color={new THREE.Color("#FFFFFF")}
      />

      {/* 2. Soft Architectural Rim / Silhouette Light */}
      <directionalLight
        position={[3.0, 4.0, -3.0]}
        intensity={0.65}
        color={new THREE.Color("#F3EFE6")}
      />

      {/* 3. Subtle Warm Ambient Fill — like light bouncing off limestone and ivory walls */}
      <ambientLight intensity={0.85} color={new THREE.Color("#FAF9F6")} />

      {/* 4. Underside Soft Bounce Light */}
      <directionalLight
        position={[0, -3.0, 1.5]}
        intensity={0.3}
        color={new THREE.Color("#F5F3ED")}
      />

      {/* 5. Minimal Soft Contact Shadow Floor Plane */}
      <group position={[0, -0.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[3.2, 3.2]} />
          <meshBasicMaterial
            color={new THREE.Color("#D8D4CA")}
            transparent
            opacity={0.16}
            depthWrite={false}
          />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[1.4, 1.4]} />
          <meshBasicMaterial
            color={new THREE.Color("#A8A49A")}
            transparent
            opacity={0.14}
            depthWrite={false}
          />
        </mesh>
      </group>
    </>
  );
};
