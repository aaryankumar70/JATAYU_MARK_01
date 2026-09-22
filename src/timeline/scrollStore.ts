import { create } from "zustand";
import { TIMELINE_SEGMENTS, TimelineSegment } from "./segments";
import droneNodesData from "../data/droneNodes.json";

interface CameraCoords {
  pos: [number, number, number];
  target: [number, number, number];
  fov?: number;
}

interface ComponentScreenAnchor {
  x: number;
  y: number;
  visible: boolean;
}

interface ScrollState {
  scrollProgress: number; // 0 to 1
  activeChapter: number; // 1 to 11
  activeSegment: TimelineSegment;
  activeComponent: string | null; // node id being inspected
  explodedProgress: number; // 0 to 1
  cameraTarget: CameraCoords;
  canvasVisible: boolean;
  isReducedMotion: boolean;
  activeAnchor: ComponentScreenAnchor;

  // Actions
  setScrollProgress: (progress: number) => void;
  setActiveChapter: (num: number) => void;
  setActiveComponent: (id: string | null) => void;
  setExplodedProgress: (p: number) => void;
  setCameraTarget: (coords: CameraCoords) => void;
  setIsReducedMotion: (val: boolean) => void;
  setActiveAnchor: (anchor: ComponentScreenAnchor) => void;
  scrollToChapter: (num: number) => void;
  scrollToComponent: (id: string) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  scrollProgress: 0,
  activeChapter: 1,
  activeSegment: TIMELINE_SEGMENTS[0],
  activeComponent: null,
  explodedProgress: 0,
  cameraTarget: {
    pos: TIMELINE_SEGMENTS[0].camera.pos,
    target: TIMELINE_SEGMENTS[0].camera.target,
    fov: TIMELINE_SEGMENTS[0].camera.fov || 40,
  },
  canvasVisible: true,
  isReducedMotion: false,
  activeAnchor: { x: 0, y: 0, visible: false },

  setScrollProgress: (progress: number) => {
    const clamped = Math.max(0, Math.min(1, progress));

    // Dynamic DOM viewport synchronizer
    if (typeof document !== "undefined") {
      const ch3 = document.getElementById("chapter-03");

      if (ch3) {
        const r3 = ch3.getBoundingClientRect();
        const scrollableDist = r3.height - window.innerHeight;

        // 1. Inside Chapter 03: The 9 BOM Hardware Components
        // r3.top is negative or zero, r3.bottom is still below viewport
        if (r3.top <= 15 && r3.bottom >= window.innerHeight - 15) {
          const p3 = Math.max(0, Math.min(0.9999, -r3.top / Math.max(1, scrollableDist)));
          const stepIdx = Math.min(8, Math.floor(p3 * 9));
          const compId = droneNodesData.nodes[stepIdx].id;
          const seg =
            TIMELINE_SEGMENTS.find((s) => s.activeComponentId === compId) ||
            TIMELINE_SEGMENTS[2];

          set({
            scrollProgress: clamped,
            activeChapter: 3,
            activeSegment: seg,
            activeComponent: compId,
            explodedProgress: 1.0,
            canvasVisible: true,
            cameraTarget: {
              pos: seg.camera.pos,
              target: seg.camera.target,
              fov: seg.camera.fov || 36,
            },
          });
          return;
        }

        // 2. Before Chapter 03: Chapter 01 or Chapter 02
        if (r3.top > 15) {
          const ch2 = document.getElementById("chapter-02");
          if (ch2) {
            const r2 = ch2.getBoundingClientRect();
            if (r2.top <= window.innerHeight * 0.7) {
              // Chapter 02: Mechanical Separation
              const p2 = Math.max(
                0,
                Math.min(1, (window.innerHeight * 0.7 - r2.top) / Math.max(1, r2.height * 0.75))
              );
              const seg2 = TIMELINE_SEGMENTS[1];
              set({
                scrollProgress: clamped,
                activeChapter: 2,
                activeSegment: seg2,
                activeComponent: null,
                explodedProgress: p2,
                canvasVisible: true,
                cameraTarget: {
                  pos: seg2.camera.pos,
                  target: seg2.camera.target,
                  fov: seg2.camera.fov || 42,
                },
              });
              return;
            }
          }

          // Chapter 01: Hero Aircraft
          const seg1 = TIMELINE_SEGMENTS[0];
          set({
            scrollProgress: clamped,
            activeChapter: 1,
            activeSegment: seg1,
            activeComponent: null,
            explodedProgress: 0.0,
            canvasVisible: true,
            cameraTarget: {
              pos: seg1.camera.pos,
              target: seg1.camera.target,
              fov: seg1.camera.fov || 40,
            },
          });
          return;
        }

        // 3. Past Chapter 03: Chapter 04 (Reassembly & System Transition) and beyond
        if (r3.bottom < window.innerHeight - 15) {
          const ch4 = document.getElementById("chapter-04");
          if (ch4) {
            const r4 = ch4.getBoundingClientRect();
            if (r4.top < window.innerHeight * 0.7 && r4.bottom > window.innerHeight * 0.15) {
              const p4 = Math.max(
                0,
                Math.min(1, -r4.top / Math.max(1, r4.height - window.innerHeight))
              );
              // Drone smoothly reassembles into complete aircraft during early Chapter 04
              const reassembleProgress = Math.max(0, 1.0 - p4 * 2.2);
              const seg4 =
                TIMELINE_SEGMENTS.find((s) => s.id === "CH_04_SYSTEM") ||
                TIMELINE_SEGMENTS[11];

              set({
                scrollProgress: clamped,
                activeChapter: 4,
                activeSegment: seg4,
                activeComponent: null,
                explodedProgress: reassembleProgress,
                canvasVisible: true,
                cameraTarget: {
                  pos: seg4.camera.pos,
                  target: seg4.camera.target,
                  fov: seg4.camera.fov || 42,
                },
              });
              return;
            }
          }

          // Chapters 05 to 11
          let foundCh = 4;
          for (let c = 5; c <= 11; c++) {
            const pad = c < 10 ? `0${c}` : `${c}`;
            const el = document.getElementById(`chapter-${pad}`);
            if (el) {
              const r = el.getBoundingClientRect();
              if (r.top <= window.innerHeight * 0.6 && r.bottom >= window.innerHeight * 0.1) {
                foundCh = c;
              }
            }
          }

          const seg =
            TIMELINE_SEGMENTS.find((s) => s.chapterNumber === foundCh) ||
            TIMELINE_SEGMENTS[TIMELINE_SEGMENTS.length - 1];

          set({
            scrollProgress: clamped,
            activeChapter: foundCh,
            activeSegment: seg,
            activeComponent: null,
            explodedProgress: 0.0,
            canvasVisible: foundCh === 11, // 3D canvas returns in Chapter 11
            cameraTarget: {
              pos: seg.camera.pos,
              target: seg.camera.target,
              fov: seg.camera.fov || 45,
            },
          });
          return;
        }
      }
    }

    // Static fallback
    const segment =
      TIMELINE_SEGMENTS.find((s) => clamped >= s.range[0] && clamped <= s.range[1]) ||
      TIMELINE_SEGMENTS[0];

    set({
      scrollProgress: clamped,
      activeSegment: segment,
      activeChapter: segment.chapterNumber,
      activeComponent: segment.activeComponentId || null,
      explodedProgress: clamped > 0.1 && clamped < 0.5 ? 1.0 : 0.0,
      canvasVisible: clamped < 0.55 || clamped >= 0.95,
      cameraTarget: {
        pos: segment.camera.pos,
        target: segment.camera.target,
        fov: segment.camera.fov || 42,
      },
    });
  },

  setActiveChapter: (num: number) => set({ activeChapter: num }),
  setActiveComponent: (id: string | null) => set({ activeComponent: id }),
  setExplodedProgress: (p: number) => set({ explodedProgress: p }),
  setCameraTarget: (coords: CameraCoords) => set({ cameraTarget: coords }),
  setIsReducedMotion: (val: boolean) => set({ isReducedMotion: val }),
  setActiveAnchor: (anchor: ComponentScreenAnchor) => set({ activeAnchor: anchor }),

  scrollToChapter: (num: number) => {
    const padded = num < 10 ? `0${num}` : `${num}`;
    const targetSelector = `#chapter-${padded}`;
    const el = document.getElementById(`chapter-${padded}`);
    const lenis = (typeof window !== "undefined" && (window as unknown as { __lenis?: { scrollTo: (t: string | HTMLElement, opts?: object) => void } }).__lenis) || null;

    if (lenis) {
      lenis.scrollTo(el || targetSelector, { duration: 1.2, offset: 0 });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  },

  scrollToComponent: (id: string) => {
    const targetSelector = `#comp-step-${id}`;
    const el = document.getElementById(`comp-step-${id}`);
    const lenis = (typeof window !== "undefined" && (window as unknown as { __lenis?: { scrollTo: (t: string | HTMLElement, opts?: object) => void } }).__lenis) || null;

    if (lenis) {
      lenis.scrollTo(el || targetSelector, { duration: 1.2, offset: 0 });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  },
}));
