export interface TimelineSegment {
  id: string;
  chapterNumber: number;
  name: string;
  range: [number, number]; // normalized scroll [start, end]
  camera: {
    pos: [number, number, number];
    target: [number, number, number];
    fov?: number;
  };
  modelState: {
    idleRotate: boolean;
    scale: number;
    opacity: number;
    positionOffset: [number, number, number];
  };
  activeComponentId?: string;
}

export const TIMELINE_SEGMENTS: TimelineSegment[] = [
  // CHAPTER 01: THE AIRCRAFT (Hero Drone, Dominant, 60-70% of viewport)
  {
    id: "CH_01_AIRCRAFT",
    chapterNumber: 1,
    name: "The Aircraft",
    range: [0.00, 0.08],
    camera: { pos: [0, 0.22, 1.42], target: [0, -0.02, 0], fov: 40 },
    modelState: { idleRotate: true, scale: 1.15, opacity: 1.0, positionOffset: [0, 0, 0] },
  },

  // CHAPTER 02: THE ANATOMY (Physical Disassembly Begins)
  {
    id: "CH_02_ANATOMY",
    chapterNumber: 2,
    name: "The Anatomy",
    range: [0.08, 0.20],
    camera: { pos: [0.95, 0.65, 1.35], target: [0, 0.02, 0], fov: 42 },
    modelState: { idleRotate: false, scale: 1.1, opacity: 1.0, positionOffset: [0, 0, 0] },
  },

  // CHAPTER 03: THE 9 PROTOTYPE COMPONENTS
  // 1. PROPELLERS
  {
    id: "CH_03_COMP_PROPS",
    chapterNumber: 3,
    name: "1045 Propellers",
    range: [0.200, 0.233],
    camera: { pos: [0.48, 0.68, 0.52], target: [0.16, 0.52, 0.16], fov: 36 },
    modelState: { idleRotate: false, scale: 1.1, opacity: 1.0, positionOffset: [0, 0, 0] },
    activeComponentId: "propellers",
  },
  // 2. MOTORS
  {
    id: "CH_03_COMP_MOTORS",
    chapterNumber: 3,
    name: "A2212 1000KV Motors",
    range: [0.233, 0.266],
    camera: { pos: [0.46, 0.45, 0.50], target: [0.16, 0.28, 0.16], fov: 36 },
    modelState: { idleRotate: false, scale: 1.1, opacity: 1.0, positionOffset: [0, 0, 0] },
    activeComponentId: "motors",
  },
  // 3. ESC
  {
    id: "CH_03_COMP_ESC",
    chapterNumber: 3,
    name: "30A ESC",
    range: [0.266, 0.300],
    camera: { pos: [0.38, 0.12, 0.46], target: [0.08, -0.09, 0.08], fov: 36 },
    modelState: { idleRotate: false, scale: 1.1, opacity: 1.0, positionOffset: [0, 0, 0] },
    activeComponentId: "esc",
  },
  // 4. ARMS / FRAME
  {
    id: "CH_03_COMP_FRAME",
    chapterNumber: 3,
    name: "F450 Class Frame",
    range: [0.300, 0.333],
    camera: { pos: [0.75, 0.55, 0.95], target: [0, 0, 0], fov: 40 },
    modelState: { idleRotate: false, scale: 1.1, opacity: 1.0, positionOffset: [0, 0, 0] },
    activeComponentId: "frame",
  },
  // 5. BATTERY
  {
    id: "CH_03_COMP_BATTERY",
    chapterNumber: 3,
    name: "3S LiPo ~5200mAh",
    range: [0.333, 0.366],
    camera: { pos: [0.45, -0.35, 0.55], target: [0, -0.48, -0.16], fov: 36 },
    modelState: { idleRotate: false, scale: 1.1, opacity: 1.0, positionOffset: [0, 0, 0] },
    activeComponentId: "battery",
  },
  // 6. FLIGHT CONTROLLER (PIXHAWK 2.4.8)
  {
    id: "CH_03_COMP_FC",
    chapterNumber: 3,
    name: "Pixhawk 2.4.8-Class",
    range: [0.366, 0.400],
    camera: { pos: [0.28, 0.52, 0.42], target: [0, 0.38, -0.06], fov: 38 },
    modelState: { idleRotate: false, scale: 1.1, opacity: 1.0, positionOffset: [0, 0, 0] },
    activeComponentId: "flight_controller",
  },
  // 7. GPS (u-blox NEO-M8N)
  {
    id: "CH_03_COMP_GPS",
    chapterNumber: 3,
    name: "u-blox NEO-M8N GNSS",
    range: [0.400, 0.433],
    camera: { pos: [0.28, 0.88, 0.32], target: [0, 0.78, -0.27], fov: 36 },
    modelState: { idleRotate: false, scale: 1.1, opacity: 1.0, positionOffset: [0, 0, 0] },
    activeComponentId: "gps",
  },
  // 8. CAMERA (Raspberry Pi Camera Module 3)
  {
    id: "CH_03_COMP_CAMERA",
    chapterNumber: 3,
    name: "Raspberry Pi Camera 3",
    range: [0.433, 0.466],
    camera: { pos: [0.25, 0.05, 0.88], target: [0, -0.08, 0.53], fov: 36 },
    modelState: { idleRotate: false, scale: 1.1, opacity: 1.0, positionOffset: [0, 0, 0] },
    activeComponentId: "camera",
  },
  // 9. COMPANION COMPUTER (Raspberry Pi 5 8GB)
  {
    id: "CH_03_COMP_COMPANION",
    chapterNumber: 3,
    name: "Raspberry Pi 5 8GB",
    range: [0.466, 0.500],
    camera: { pos: [0.32, 0.62, 0.58], target: [0, 0.47, 0.20], fov: 36 },
    modelState: { idleRotate: false, scale: 1.1, opacity: 1.0, positionOffset: [0, 0, 0] },
    activeComponentId: "companion_computer",
  },

  // CHAPTER 04: THE SYSTEM & REASSEMBLY (Reverse explosion -> Whole drone -> Transition)
  {
    id: "CH_04_SYSTEM",
    chapterNumber: 4,
    name: "The System",
    range: [0.50, 0.58],
    camera: { pos: [0.5, 0.28, 1.5], target: [0, 0, 0], fov: 42 },
    modelState: { idleRotate: true, scale: 1.1, opacity: 1.0, positionOffset: [0, 0, 0] },
  },

  // CHAPTERS 05 TO 10: PURE ARCHITECTURAL SYSTEM DIAGRAMS (3D Drone opacity = 0)
  {
    id: "CH_05_HOW_IT_WORKS",
    chapterNumber: 5,
    name: "How It Works",
    range: [0.58, 0.66],
    camera: { pos: [0, 0, 3], target: [0, 0, 0], fov: 45 },
    modelState: { idleRotate: false, scale: 0.5, opacity: 0.0, positionOffset: [0, 0, 0] },
  },
  {
    id: "CH_06_INTELLIGENCE",
    chapterNumber: 6,
    name: "Intelligence",
    range: [0.66, 0.73],
    camera: { pos: [0, 0, 3], target: [0, 0, 0], fov: 45 },
    modelState: { idleRotate: false, scale: 0.5, opacity: 0.0, positionOffset: [0, 0, 0] },
  },
  {
    id: "CH_07_THE_EVENT",
    chapterNumber: 7,
    name: "The Event",
    range: [0.73, 0.80],
    camera: { pos: [0, 0, 3], target: [0, 0, 0], fov: 45 },
    modelState: { idleRotate: false, scale: 0.5, opacity: 0.0, positionOffset: [0, 0, 0] },
  },
  {
    id: "CH_08_GROUND_STATION",
    chapterNumber: 8,
    name: "Ground Station",
    range: [0.80, 0.87],
    camera: { pos: [0, 0, 3], target: [0, 0, 0], fov: 45 },
    modelState: { idleRotate: false, scale: 0.5, opacity: 0.0, positionOffset: [0, 0, 0] },
  },
  {
    id: "CH_09_REQUIREMENTS",
    chapterNumber: 9,
    name: "Requirements",
    range: [0.87, 0.93],
    camera: { pos: [0, 0, 3], target: [0, 0, 0], fov: 45 },
    modelState: { idleRotate: false, scale: 0.5, opacity: 0.0, positionOffset: [0, 0, 0] },
  },
  {
    id: "CH_10_FUTURE",
    chapterNumber: 10,
    name: "Future",
    range: [0.93, 0.97],
    camera: { pos: [0, 0, 3], target: [0, 0, 0], fov: 45 },
    modelState: { idleRotate: false, scale: 0.5, opacity: 0.0, positionOffset: [0, 0, 0] },
  },

  // CHAPTER 11: FINAL VISION (Return to Complete Drone in Pure White Space)
  {
    id: "CH_11_FINAL_VISION",
    chapterNumber: 11,
    name: "Final Vision",
    range: [0.97, 1.00],
    camera: { pos: [0, 0.22, 1.42], target: [0, -0.02, 0], fov: 40 },
    modelState: { idleRotate: true, scale: 1.15, opacity: 1.0, positionOffset: [0, 0, 0] },
  },
];
