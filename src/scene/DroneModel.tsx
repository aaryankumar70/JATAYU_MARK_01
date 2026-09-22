/**
 * ============================================================================
 * JATAYU MARK 01 — PROTOTYPE CONFIGURATION (F450 CLASS)
 * 
 * Physically Plausible & Mathematically Aligned Quadcopter Model:
 * - Real F450 wheelbase: 450mm diagonal (motor radius R = 0.225m)
 * - 4 Symmetrical quadrants: FL (Front-Left), FR (Front-Right), BL (Back-Left), BR (Back-Right)
 * - Exact vertical contact datum: Plates -> Arms -> Motors -> Propellers
 * - Component-level anchor references for pixel-accurate annotation leader lines
 * - Smooth 9-step exploded view with true physical separation vectors
 * ============================================================================
 */

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore } from "../timeline/scrollStore";

// Wheelbase & geometry constants (in meters)
const R_MOTOR = 0.225; // 225mm from drone center to motor center
const OFFSET = R_MOTOR * Math.SQRT1_2; // ~0.1591m along X and Z axes
const ARM_START = 0.055; // Plate radius where arm begins
const ARM_LENGTH = R_MOTOR - ARM_START; // ~0.170m

interface CornerDef {
  id: "FL" | "FR" | "BL" | "BR";
  x: number;
  z: number;
  angle: number; // Y-rotation so +Z points along the arm to (x, z)
  isFront: boolean;
  isCCW: boolean;
}

// 4 Symmetrical quadrants
const CORNERS: CornerDef[] = [
  { id: "FL", x: -OFFSET, z: OFFSET, angle: -Math.PI / 4, isFront: true, isCCW: true },
  { id: "FR", x: OFFSET, z: OFFSET, angle: Math.PI / 4, isFront: true, isCCW: false },
  { id: "BL", x: -OFFSET, z: -OFFSET, angle: -(3 * Math.PI) / 4, isFront: false, isCCW: false },
  { id: "BR", x: OFFSET, z: -OFFSET, angle: (3 * Math.PI) / 4, isFront: false, isCCW: true },
];

function easePower2Out(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1 - c, 2);
}

export const DroneModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { camera, size } = useThree();

  const activeSegment = useScrollStore((s) => s.activeSegment);
  const explodedProgress = useScrollStore((s) => s.explodedProgress);
  const activeComponent = useScrollStore((s) => s.activeComponent);
  const setActiveComponent = useScrollStore((s) => s.setActiveComponent);
  const setActiveAnchor = useScrollStore((s) => s.setActiveAnchor);

  // Group references for the 9 BOM subsystems
  const groupRefs = useRef<{ [key: string]: THREE.Group | null }>({});
  // Specific physical anchor references on the actual visible 3D mesh
  const anchorMeshRefs = useRef<{ [key: string]: THREE.Object3D | null }>({});
  const propSpinRefs = useRef<THREE.Group[]>([]);

  // PBR Materials
  const materials = useMemo(() => {
    return {
      f450FrontArm: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#A82B24"), // Red polyamide nylon
        roughness: 0.42,
        metalness: 0.08,
      }),
      f450RearArm: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#E5E3DB"), // Ivory polyamide nylon
        roughness: 0.42,
        metalness: 0.06,
      }),
      pcbPlate: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#18191B"),
        roughness: 0.38,
        metalness: 0.25,
      }),
      pcbTraces: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#C89F56"), // Gold solder pads & traces
        roughness: 0.25,
        metalness: 0.85,
      }),
      motorStator: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1A1A1A"),
        roughness: 0.5,
        metalness: 0.6,
      }),
      motorBellGold: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#CFA038"), // A2212 Anodized gold
        roughness: 0.25,
        metalness: 0.88,
      }),
      motorCopper: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#B85D28"), // Copper coil windings
        roughness: 0.35,
        metalness: 0.8,
      }),
      steelShaft: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#DCE0E8"),
        roughness: 0.18,
        metalness: 0.95,
      }),
      propellerNylon: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1B1B1D"),
        roughness: 0.32,
        metalness: 0.12,
      }),
      escHeatshrink: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#D4961D"), // Yellow industrial heatshrink
        roughness: 0.45,
        metalness: 0.1,
      }),
      escCapacitor: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#254868"),
        roughness: 0.3,
        metalness: 0.4,
      }),
      pixhawkCase: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1C1C1E"),
        roughness: 0.45,
        metalness: 0.15,
      }),
      pixhawkLed: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#22C55E"),
        emissive: new THREE.Color("#22C55E"),
        emissiveIntensity: 0.65,
        roughness: 0.1,
      }),
      gpsPuck: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#191A1C"),
        roughness: 0.35,
        metalness: 0.18,
      }),
      carbonMast: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#2A2B2D"),
        roughness: 0.3,
        metalness: 0.6,
      }),
      rpiPcb: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1B5927"), // Pi green
        roughness: 0.38,
        metalness: 0.2,
      }),
      aluminumHeatsink: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#A8ACB5"),
        roughness: 0.28,
        metalness: 0.85,
      }),
      cameraOptics: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0E1118"),
        roughness: 0.08,
        metalness: 0.95,
      }),
      ribbonWhite: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#DCD9D0"),
        roughness: 0.55,
        metalness: 0.05,
      }),
      lipoBlue: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#274768"),
        roughness: 0.4,
        metalness: 0.12,
      }),
      xt60Yellow: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#E0A812"),
        roughness: 0.35,
        metalness: 0.15,
      }),
      blackNylon: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#141416"),
        roughness: 0.7,
        metalness: 0.05,
      }),
    };
  }, []);

  // Frame update: Propeller spin, idle breathing, explosion interpolation & anchor projection
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Propeller spin during flight
    const isFlight =
      activeSegment.chapterNumber === 1 ||
      activeSegment.chapterNumber === 4 ||
      activeSegment.chapterNumber === 11;
    const propSpeed = isFlight ? 34 : 3.0;

    propSpinRefs.current.forEach((group, idx) => {
      if (group) {
        const dir = CORNERS[idx % 4].isCCW ? 1 : -1;
        group.rotation.y += dir * propSpeed * delta;
      }
    });

    // Idle hover
    if (groupRef.current) {
      if (activeSegment.modelState.idleRotate && !activeComponent) {
        groupRef.current.rotation.y += 0.16 * delta;
        groupRef.current.position.y = Math.sin(time * 1.4) * 0.02;
      } else {
        groupRef.current.position.y = THREE.MathUtils.lerp(
          groupRef.current.position.y,
          0,
          delta * 2.5
        );
      }
    }

    // Explosion offsets for the 9 BOM components
    // When explodedProgress === 0, ALL offsets are exactly [0, 0, 0] (perfect alignment!)
    const t = easePower2Out(explodedProgress);

    const offsets: Record<string, [number, number, number]> = {
      propellers: [0, 0.48 * t, 0],
      motors: [0, 0.26 * t, 0],
      esc: [0, -0.08 * t, 0],
      frame: [0, 0, 0],
      battery: [0, -0.46 * t, -0.15 * t],
      flight_controller: [0, 0.35 * t, -0.05 * t],
      gps: [0, 0.62 * t, -0.18 * t],
      camera: [0, -0.08 * t, 0.45 * t],
      companion_computer: [0, 0.44 * t, 0.16 * t],
    };

    Object.entries(offsets).forEach(([id, offset]) => {
      const g = groupRefs.current[id];
      if (g) {
        g.position.set(offset[0], offset[1], offset[2]);

        // Active component highlight vs background dimming
        const isSelected = activeComponent === id;
        const isAnySelected = Boolean(activeComponent);

        g.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.material && !Array.isArray(mesh.material)) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              if (isAnySelected) {
                if (isSelected) {
                  mat.emissive = new THREE.Color("#C89F56");
                  mat.emissiveIntensity = 0.38;
                } else {
                  mat.emissive = new THREE.Color("#000000");
                  mat.emissiveIntensity = 0;
                }
              } else {
                mat.emissive = new THREE.Color("#000000");
                mat.emissiveIntensity = 0;
              }
            }
          }
        });
      }
    });

    // Project the EXACT physical mesh anchor of the active component to screen pixels
    if (activeComponent && anchorMeshRefs.current[activeComponent]) {
      const anchorMesh = anchorMeshRefs.current[activeComponent];
      if (anchorMesh) {
        const worldPos = new THREE.Vector3();
        anchorMesh.getWorldPosition(worldPos);

        // Project 3D coordinate to NDC [-1, 1]
        const projected = worldPos.clone().project(camera);

        // Convert to screen pixel coordinates
        const screenX = ((projected.x + 1) / 2) * size.width;
        const screenY = ((-projected.y + 1) / 2) * size.height;

        const isVisible = projected.z < 1;
        setActiveAnchor({ x: screenX, y: screenY, visible: isVisible });
      }
    } else {
      setActiveAnchor({ x: 0, y: 0, visible: false });
    }
  });

  const handleSelect = (id: string, e?: any) => {
    if (e && typeof e.stopPropagation === "function") {
      e.stopPropagation();
    }
    setActiveComponent(activeComponent === id ? null : id);
  };

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ================================================================== */}
      {/* 4. AIRFRAME: F450-CLASS FRAME (Central Plates & Polyamide Arms)     */}
      {/* ================================================================== */}
      <group
        ref={(el) => (groupRefs.current["frame"] = el)}
        onClick={(e) => handleSelect("frame", e)}
      >
        {/* Bottom PCB Plate with power distribution bus (Y = -0.015) */}
        <mesh position={[0, -0.015, 0]} material={materials.pcbPlate} castShadow>
          <cylinderGeometry args={[0.072, 0.072, 0.003, 8]} />
        </mesh>
        <mesh position={[0, -0.013, 0]} material={materials.pcbTraces}>
          <cylinderGeometry args={[0.066, 0.066, 0.001, 8]} />
        </mesh>

        {/* Top PCB Plate (Y = +0.015) */}
        <mesh position={[0, 0.015, 0]} material={materials.pcbPlate} castShadow>
          <cylinderGeometry args={[0.068, 0.068, 0.003, 8]} />
        </mesh>
        <mesh position={[0, 0.017, 0]} material={materials.pcbTraces}>
          <cylinderGeometry args={[0.062, 0.062, 0.001, 8]} />
        </mesh>

        {/* 4 Standoff Spacers clamping top and bottom plates */}
        {[-0.038, 0.038].map((sx) =>
          [-0.038, 0.038].map((sz) => (
            <mesh
              key={`post-${sx}-${sz}`}
              position={[sx, 0, sz]}
              material={materials.steelShaft}
            >
              <cylinderGeometry args={[0.003, 0.003, 0.028, 12]} />
            </mesh>
          ))
        )}

        {/* 4 F450 Polyamide Truss Arms */}
        {CORNERS.map((corner, idx) => {
          const armMat = corner.isFront ? materials.f450FrontArm : materials.f450RearArm;
          // Representative anchor for frame: Front-Right arm
          const isAnchor = corner.id === "FR";

          return (
            <group
              key={`arm-${corner.id}`}
              rotation={[0, corner.angle, 0]}
              ref={isAnchor ? (el) => (anchorMeshRefs.current["frame"] = el) : undefined}
            >
              {/* Arm root clamp between top & bottom plates (z = 0 to ARM_START) */}
              <mesh position={[0, 0, ARM_START * 0.5]} material={armMat} castShadow>
                <boxGeometry args={[0.028, 0.028, ARM_START]} />
              </mesh>

              {/* Top horizontal truss rail (Y = +0.012) */}
              <mesh
                position={[0, 0.012, ARM_START + ARM_LENGTH * 0.5]}
                material={armMat}
                castShadow
              >
                <boxGeometry args={[0.024, 0.006, ARM_LENGTH]} />
              </mesh>

              {/* Bottom horizontal truss rail (Y = -0.012) */}
              <mesh
                position={[0, -0.012, ARM_START + ARM_LENGTH * 0.5]}
                material={armMat}
                castShadow
              >
                <boxGeometry args={[0.024, 0.006, ARM_LENGTH]} />
              </mesh>

              {/* Diagonal lattice reinforcing webs along the arm */}
              {[-0.055, -0.025, 0.005, 0.035, 0.065].map((zRel, rIdx) => (
                <mesh
                  key={`web-${rIdx}`}
                  position={[0, 0, ARM_START + ARM_LENGTH * 0.5 + zRel]}
                  rotation={[rIdx % 2 === 0 ? 0.52 : -0.52, 0, 0]}
                  material={armMat}
                >
                  <boxGeometry args={[0.018, 0.022, 0.004]} />
                </mesh>
              ))}

              {/* Motor mount circular platform at the tip (Z = R_MOTOR) */}
              <mesh position={[0, 0.008, R_MOTOR]} material={armMat} castShadow>
                <cylinderGeometry args={[0.02, 0.02, 0.014, 20]} />
              </mesh>

              {/* M3 steel mounting bolts on arm tip */}
              {[-0.009, 0.009].map((bx) =>
                [-0.009, 0.009].map((bz) => (
                  <mesh
                    key={`bolt-${bx}-${bz}`}
                    position={[bx, 0.0155, R_MOTOR + bz]}
                    material={materials.steelShaft}
                  >
                    <cylinderGeometry args={[0.0016, 0.0016, 0.002, 8]} />
                  </mesh>
                ))
              )}
            </group>
          );
        })}

        {/* 4 Arched Landing Skids extending down from frame roots */}
        {CORNERS.map((corner) => (
          <group
            key={`leg-${corner.id}`}
            position={[corner.x * 0.45, -0.055, corner.z * 0.45]}
          >
            <mesh material={materials.blackNylon} castShadow>
              <cylinderGeometry args={[0.0045, 0.0045, 0.08, 10]} />
            </mesh>
            {/* Rubber ground contact foot (Y = -0.095) */}
            <mesh position={[0, -0.04, 0]} material={materials.blackNylon}>
              <sphereGeometry args={[0.0075, 10, 10]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ================================================================== */}
      {/* 2. MOTORS: A2212 1000KV BLDC ×4 (Seated directly on arm tips)      */}
      {/* ================================================================== */}
      <group
        ref={(el) => (groupRefs.current["motors"] = el)}
        onClick={(e) => handleSelect("motors", e)}
      >
        {CORNERS.map((corner) => {
          // Representative anchor: Front-Right motor
          const isAnchor = corner.id === "FR";

          return (
            <group
              key={`motor-${corner.id}`}
              position={[corner.x, 0.015, corner.z]}
              ref={isAnchor ? (el) => (anchorMeshRefs.current["motors"] = el) : undefined}
            >
              {/* Black Stator Base with mounting holes (Y: 0 to 0.008) */}
              <mesh position={[0, 0.004, 0]} material={materials.motorStator} castShadow>
                <cylinderGeometry args={[0.014, 0.016, 0.008, 20]} />
              </mesh>

              {/* Internal Copper Wire Windings visible beneath bell */}
              <mesh position={[0, 0.012, 0]} material={materials.motorCopper}>
                <cylinderGeometry args={[0.011, 0.011, 0.008, 16]} />
              </mesh>

              {/* Anodized Gold Rotor Bell (Y: 0.008 to 0.032) */}
              <mesh position={[0, 0.02, 0]} material={materials.motorBellGold} castShadow>
                <cylinderGeometry args={[0.014, 0.014, 0.024, 24]} />
              </mesh>

              {/* Bell top cooling vents */}
              {Array.from({ length: 4 }).map((_, i) => (
                <mesh
                  key={`vent-${i}`}
                  position={[0, 0.0322, 0]}
                  rotation={[0, (i * Math.PI) / 4, 0]}
                  material={materials.motorStator}
                >
                  <boxGeometry args={[0.022, 0.001, 0.003]} />
                </mesh>
              ))}

              {/* 3.17mm Ground Steel Prop Shaft (extends up to Y = 0.050) */}
              <mesh position={[0, 0.038, 0]} material={materials.steelShaft}>
                <cylinderGeometry args={[0.0016, 0.0016, 0.02, 12]} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* ================================================================== */}
      {/* 1. PROPELLERS: 1045 (10 × 4.5 in) (Seated directly on motor bells) */}
      {/* ================================================================== */}
      <group
        ref={(el) => (groupRefs.current["propellers"] = el)}
        onClick={(e) => handleSelect("propellers", e)}
      >
        {CORNERS.map((corner, idx) => {
          // Representative anchor: Front-Right propeller hub
          const isAnchor = corner.id === "FR";

          return (
            <group
              key={`prop-${corner.id}`}
              position={[corner.x, 0.047, corner.z]}
              ref={isAnchor ? (el) => (anchorMeshRefs.current["propellers"] = el) : undefined}
            >
              {/* Spinning propeller sub-group */}
              <group
                ref={(el) => {
                  if (el) propSpinRefs.current[idx] = el;
                }}
              >
                {/* Center Prop Hub */}
                <mesh position={[0, 0.004, 0]} material={materials.propellerNylon} castShadow>
                  <cylinderGeometry args={[0.008, 0.008, 0.008, 16]} />
                </mesh>

                {/* Aluminum Acorn Prop Nut clamping the hub */}
                <mesh position={[0, 0.012, 0]} material={materials.steelShaft}>
                  <coneGeometry args={[0.005, 0.01, 14]} />
                </mesh>

                {/* Blade 1 (tapered 10-inch airfoil along local Z) */}
                <group
                  position={[0, 0.004, 0.065]}
                  rotation={[0, corner.isCCW ? -0.16 : 0.16, 0]}
                >
                  <mesh material={materials.propellerNylon} castShadow>
                    <boxGeometry args={[0.018, 0.002, 0.12]} />
                  </mesh>
                </group>

                {/* Blade 2 (opposite blade along local -Z) */}
                <group
                  position={[0, 0.004, -0.065]}
                  rotation={[0, corner.isCCW ? 0.16 : -0.16, 0]}
                >
                  <mesh material={materials.propellerNylon} castShadow>
                    <boxGeometry args={[0.018, 0.002, 0.12]} />
                  </mesh>
                </group>
              </group>
            </group>
          );
        })}
      </group>

      {/* ================================================================== */}
      {/* 3. ESC: 30A SPEED CONTROLLERS ×4 (Mounted under the arms)          */}
      {/* ================================================================== */}
      <group
        ref={(el) => (groupRefs.current["esc"] = el)}
        onClick={(e) => handleSelect("esc", e)}
      >
        {CORNERS.map((corner) => {
          const isAnchor = corner.id === "FR";
          const distAlongArm = ARM_START + ARM_LENGTH * 0.42;

          return (
            <group
              key={`esc-${corner.id}`}
              rotation={[0, corner.angle, 0]}
              ref={isAnchor ? (el) => (anchorMeshRefs.current["esc"] = el) : undefined}
            >
              {/* ESC Body attached beneath the arm rail */}
              <group position={[0, -0.022, distAlongArm]}>
                {/* Yellow Heatshrink Pack */}
                <mesh material={materials.escHeatshrink} castShadow>
                  <boxGeometry args={[0.024, 0.009, 0.05]} />
                </mesh>

                {/* Aluminum Heatsink Plate */}
                <mesh position={[0, 0.005, 0]} material={materials.aluminumHeatsink}>
                  <boxGeometry args={[0.022, 0.0015, 0.046]} />
                </mesh>

                {/* Low-ESR Filter Electrolytic Capacitor */}
                <mesh
                  position={[0, 0, -0.03]}
                  rotation={[Math.PI / 2, 0, 0]}
                  material={materials.escCapacitor}
                >
                  <cylinderGeometry args={[0.0045, 0.0045, 0.012, 12]} />
                </mesh>

                {/* Motor phase wires running outward along arm to motor */}
                {[-0.006, 0, 0.006].map((wx, i) => (
                  <mesh
                    key={`pw-${i}`}
                    position={[wx, 0.006, 0.036]}
                    material={materials.blackNylon}
                  >
                    <cylinderGeometry args={[0.0012, 0.0012, 0.022, 6]} />
                  </mesh>
                ))}
              </group>
            </group>
          );
        })}
      </group>

      {/* ================================================================== */}
      {/* 5. BATTERY: 3S LiPo (~5200mAh) Pack (Mounted under bottom plate)   */}
      {/* ================================================================== */}
      <group
        ref={(el) => (groupRefs.current["battery"] = el)}
        onClick={(e) => handleSelect("battery", e)}
      >
        <group
          position={[0, -0.036, -0.01]}
          ref={(el) => (anchorMeshRefs.current["battery"] = el)}
        >
          {/* Blue Soft-Pack LiPo Enclosure (135 × 44 × 34 mm) */}
          <mesh material={materials.lipoBlue} castShadow>
            <boxGeometry args={[0.052, 0.034, 0.135]} />
          </mesh>

          {/* Silver foil edge cell dividers */}
          <mesh position={[0, 0, 0]} material={materials.aluminumHeatsink}>
            <boxGeometry args={[0.053, 0.002, 0.136]} />
          </mesh>

          {/* Dual Black Woven Velcro Straps cinch-clamping to frame */}
          {[-0.035, 0.035].map((spz, sIdx) => (
            <mesh
              key={`strap-${sIdx}`}
              position={[0, 0, spz]}
              material={materials.blackNylon}
            >
              <boxGeometry args={[0.056, 0.036, 0.014]} />
            </mesh>
          ))}

          {/* 12AWG Heavy Duty Silicone Leads & Yellow XT60 Connector */}
          <mesh position={[0.012, 0.012, 0.075]} material={materials.blackNylon}>
            <cylinderGeometry args={[0.0022, 0.0022, 0.018, 8]} />
          </mesh>
          <mesh position={[0.012, 0.014, 0.088]} material={materials.xt60Yellow}>
            <boxGeometry args={[0.015, 0.009, 0.015]} />
          </mesh>

          {/* 4-Pin JST-XH Balance Lead */}
          <mesh position={[-0.012, 0.012, 0.075]} material={materials.ribbonWhite}>
            <boxGeometry args={[0.01, 0.003, 0.014]} />
          </mesh>
        </group>
      </group>

      {/* ================================================================== */}
      {/* 6. FLIGHT CONTROLLER: PIXHAWK 2.4.8 (Mounted on top center plate)  */}
      {/* ================================================================== */}
      <group
        ref={(el) => (groupRefs.current["flight_controller"] = el)}
        onClick={(e) => handleSelect("flight_controller", e)}
      >
        <group
          position={[0, 0.026, -0.015]}
          ref={(el) => (anchorMeshRefs.current["flight_controller"] = el)}
        >
          {/* Vibration-Damping Silicone Foam Pad (Y = 0) */}
          <mesh position={[0, -0.004, 0]} material={materials.blackNylon}>
            <boxGeometry args={[0.048, 0.005, 0.084]} />
          </mesh>

          {/* Pixhawk 2.4.8 Contoured Enclosure */}
          <mesh position={[0, 0.007, 0]} material={materials.pixhawkCase} castShadow>
            <boxGeometry args={[0.044, 0.014, 0.08]} />
          </mesh>

          {/* Center Multi-Color Prism Status/Safety LED */}
          <mesh position={[0, 0.0145, -0.005]} material={materials.pixhawkLed}>
            <boxGeometry args={[0.008, 0.002, 0.008]} />
          </mesh>

          {/* Forward Flight Orientation Arrow on casing */}
          <mesh position={[0, 0.0145, 0.018]} material={materials.pcbTraces}>
            <coneGeometry args={[0.004, 0.008, 3]} />
          </mesh>

          {/* Dual-Row Main/Aux Servo Output Pins at rear */}
          <mesh position={[0, 0.012, -0.034]} material={materials.steelShaft}>
            <boxGeometry args={[0.038, 0.005, 0.007]} />
          </mesh>

          {/* JST-GH Port Connectors (GPS, Telem1, Telem2, I2C) */}
          {[-0.012, 0, 0.012].map((px, pIdx) => (
            <mesh
              key={`port-${pIdx}`}
              position={[px, 0.012, 0.032]}
              material={materials.ribbonWhite}
            >
              <boxGeometry args={[0.007, 0.0035, 0.005]} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ================================================================== */}
      {/* 7. GPS: u-blox NEO-M8N GNSS (Elevated on anti-EMI carbon mast)     */}
      {/* ================================================================== */}
      <group
        ref={(el) => (groupRefs.current["gps"] = el)}
        onClick={(e) => handleSelect("gps", e)}
      >
        <group
          position={[0, 0.017, -0.09]}
          ref={(el) => (anchorMeshRefs.current["gps"] = el)}
        >
          {/* CNC Aluminum Folding Mast Base Clamped to Top Plate */}
          <mesh position={[0, 0.006, 0]} material={materials.steelShaft}>
            <cylinderGeometry args={[0.008, 0.009, 0.012, 16]} />
          </mesh>

          {/* 12cm Anti-EMI Carbon Fiber Mast Rod */}
          <mesh position={[0, 0.07, 0]} material={materials.carbonMast}>
            <cylinderGeometry args={[0.0025, 0.0025, 0.12, 12]} />
          </mesh>

          {/* Aluminum Top Mast Collar */}
          <mesh position={[0, 0.13, 0]} material={materials.steelShaft}>
            <cylinderGeometry args={[0.007, 0.007, 0.008, 16]} />
          </mesh>

          {/* u-blox NEO-M8N Circular Disc Antenna Puck */}
          <mesh position={[0, 0.14, 0]} material={materials.gpsPuck} castShadow>
            <cylinderGeometry args={[0.026, 0.026, 0.011, 24]} />
          </mesh>

          {/* Top Compass Reference Arrow */}
          <mesh position={[0, 0.146, 0.006]} material={materials.steelShaft}>
            <coneGeometry args={[0.003, 0.006, 3]} />
          </mesh>
        </group>
      </group>

      {/* ================================================================== */}
      {/* 8. CAMERA: RASPBERRY PI CAMERA MODULE 3 (Sony IMX708 Autopilot)    */}
      {/* ================================================================== */}
      <group
        ref={(el) => (groupRefs.current["camera"] = el)}
        onClick={(e) => handleSelect("camera", e)}
      >
        <group
          position={[0, -0.008, 0.078]}
          ref={(el) => (anchorMeshRefs.current["camera"] = el)}
        >
          {/* Forward-Angled Nylon Mounting Bracket between front red arms */}
          <mesh position={[0, -0.004, 0]} material={materials.blackNylon}>
            <boxGeometry args={[0.032, 0.018, 0.014]} />
          </mesh>

          {/* Camera Module 3 Green PCB (25 × 24 mm) angled 15° down */}
          <mesh
            position={[0, -0.002, 0.009]}
            rotation={[0.26, 0, 0]}
            material={materials.rpiPcb}
          >
            <boxGeometry args={[0.025, 0.024, 0.002]} />
          </mesh>

          {/* Sony IMX708 Autofocus Square Sensor Enclosure */}
          <mesh
            position={[0, -0.002, 0.014]}
            rotation={[0.26, 0, 0]}
            material={materials.blackNylon}
          >
            <boxGeometry args={[0.012, 0.012, 0.007]} />
          </mesh>

          {/* Optical Glass Lens Element */}
          <mesh
            position={[0, -0.002, 0.019]}
            rotation={[Math.PI / 2 + 0.26, 0, 0]}
            material={materials.cameraOptics}
          >
            <cylinderGeometry args={[0.004, 0.004, 0.002, 16]} />
          </mesh>

          {/* 15-Pin Flexible Flat CSI Ribbon Cable running back to Pi 5 */}
          <mesh
            position={[0, 0.006, -0.018]}
            rotation={[-0.22, 0, 0]}
            material={materials.ribbonWhite}
          >
            <boxGeometry args={[0.016, 0.001, 0.035]} />
          </mesh>
        </group>
      </group>

      {/* ================================================================== */}
      {/* 9. COMPANION COMPUTER: RASPBERRY PI 5 8GB (Edge Neural Compute)    */}
      {/* ================================================================== */}
      <group
        ref={(el) => (groupRefs.current["companion_computer"] = el)}
        onClick={(e) => handleSelect("companion_computer", e)}
      >
        <group
          position={[0, 0.026, 0.038]}
          ref={(el) => (anchorMeshRefs.current["companion_computer"] = el)}
        >
          {/* Brass mounting standoffs (Y: 0 to 0.006) */}
          {[-0.022, 0.022].map((px) =>
            [-0.032, 0.032].map((pz) => (
              <mesh
                key={`pi-post-${px}-${pz}`}
                position={[px, -0.003, pz]}
                material={materials.pcbTraces}
              >
                <cylinderGeometry args={[0.002, 0.002, 0.006, 8]} />
              </mesh>
            ))
          )}

          {/* Raspberry Pi 5 Iconic Green FR4 PCB (85 × 56 mm) */}
          <mesh material={materials.rpiPcb} castShadow>
            <boxGeometry args={[0.054, 0.0025, 0.082]} />
          </mesh>

          {/* Official Active Cooler (Extruded Aluminum Fin Heatsink) */}
          <mesh position={[0, 0.007, 0.004]} material={materials.aluminumHeatsink} castShadow>
            <boxGeometry args={[0.04, 0.01, 0.046]} />
          </mesh>

          {/* Active Cooler Micro Blower Fan Hub */}
          <mesh position={[0, 0.013, 0.004]} material={materials.blackNylon}>
            <cylinderGeometry args={[0.013, 0.013, 0.003, 18]} />
          </mesh>

          {/* Dual Micro-HDMI & USB-C Ports along edge */}
          {[-0.016, -0.005, 0.006].map((zPos, pIdx) => (
            <mesh
              key={`p-port-${pIdx}`}
              position={[-0.027, 0.0035, zPos]}
              material={materials.steelShaft}
            >
              <boxGeometry args={[0.0035, 0.004, 0.007]} />
            </mesh>
          ))}

          {/* Quad USB & Gigabit Ethernet Metallic Cans at rear */}
          <mesh position={[-0.012, 0.007, 0.036]} material={materials.steelShaft}>
            <boxGeometry args={[0.013, 0.011, 0.015]} />
          </mesh>
          <mesh position={[0.012, 0.007, 0.036]} material={materials.steelShaft}>
            <boxGeometry args={[0.013, 0.011, 0.015]} />
          </mesh>

          {/* 40-Pin Gold GPIO Header */}
          <mesh position={[0.023, 0.005, -0.008]} material={materials.pcbTraces}>
            <boxGeometry args={[0.005, 0.005, 0.046]} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
