import React, { useMemo } from "react";
import * as THREE from "three";
import { useScrollStore } from "../../timeline/scrollStore";
import telemetryData from "../../data/telemetrySamples.json";

export const PatrolSpline: React.FC = () => {
  const activeSegment = useScrollStore((s) => s.activeSegment);

  const points = useMemo(() => {
    // Generate 3D waypoint coordinates mapped from the 5 waypoints
    return [
      new THREE.Vector3(-1.8, 0.4, 1.2),
      new THREE.Vector3(-0.9, 0.45, 0.4),
      new THREE.Vector3(0.0, 0.5, -0.6),
      new THREE.Vector3(1.2, 0.55, -1.1),
      new THREE.Vector3(1.9, 0.4, 0.2),
      new THREE.Vector3(-1.8, 0.4, 1.2), // loop back
    ];
  }, []);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points, true), [points]);
  const curvePoints = useMemo(() => curve.getPoints(60), [curve]);
  const lineGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(curvePoints), [curvePoints]);

  if (activeSegment.id !== "PATROL") return null;

  return (
    <group position={[0, -0.2, 0]}>
      {/* Flight trajectory spline */}
      <primitive object={new THREE.Line(lineGeometry, new THREE.LineDashedMaterial({
        color: new THREE.Color("#4FD8E0"),
        dashSize: 0.1,
        gapSize: 0.05,
        linewidth: 1,
      }))} />

      {/* Waypoint beacons */}
      {telemetryData.patrolWaypoints.map((wp, idx) => {
        const p = points[idx];
        if (!p) return null;
        return (
          <group key={wp.id} position={[p.x, p.y, p.z]}>
            <mesh>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshBasicMaterial color={new THREE.Color("#4FD8E0")} />
            </mesh>
            {/* Ground beacon projection stem */}
            <mesh position={[0, -p.y / 2 - 0.2, 0]}>
              <cylinderGeometry args={[0.002, 0.002, p.y + 0.4, 8]} />
              <meshBasicMaterial color={new THREE.Color("#1B4A4D")} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};
