import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore } from "../timeline/scrollStore";

export const CameraRig: React.FC = () => {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  const activeSegment = useScrollStore((s) => s.activeSegment);
  const isReducedMotion = useScrollStore((s) => s.isReducedMotion);

  useFrame((_, delta) => {
    const targetPos = new THREE.Vector3(...activeSegment.camera.pos);
    const targetLook = new THREE.Vector3(...activeSegment.camera.target);

    if (isReducedMotion) {
      camera.position.copy(targetPos);
      camera.lookAt(targetLook);
      currentLookAt.current.copy(targetLook);
    } else {
      // Calm, architectural lerp rate
      const lerpFactor = Math.min(1, delta * 3.2);
      camera.position.lerp(targetPos, lerpFactor);
      currentLookAt.current.lerp(targetLook, lerpFactor);
      camera.lookAt(currentLookAt.current);
    }
  });

  return null;
};
