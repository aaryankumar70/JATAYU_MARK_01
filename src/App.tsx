/**
 * ============================================================================
 * JATAYU — MARK 01
 * Architectural Exhibition & Aerospace Engineering Showcase
 * Rebuilt strictly around the physical drone centerpiece
 * ============================================================================
 */

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useScrollStore } from "./timeline/scrollStore";
import { SceneCanvas } from "./scene/SceneCanvas";
import { ComponentInspector } from "./scene/ComponentInspector";
import { NavigationBar } from "./hud/NavigationBar";

// 11 Core Narrative Chapters
import { Chapter01_Aircraft } from "./chapters/Chapter01_Aircraft";
import { Chapter02_Anatomy } from "./chapters/Chapter02_Anatomy";
import { Chapter03_Components } from "./chapters/Chapter03_Components";
import { Chapter04_System } from "./chapters/Chapter04_System";
import { Chapter05_HowItWorks } from "./chapters/Chapter05_HowItWorks";
import { Chapter06_Intelligence } from "./chapters/Chapter06_Intelligence";
import { Chapter07_TheEvent } from "./chapters/Chapter07_TheEvent";
import { Chapter08_GroundStation } from "./chapters/Chapter08_GroundStation";
import { Chapter09_Requirements } from "./chapters/Chapter09_Requirements";
import { Chapter10_Future } from "./chapters/Chapter10_Future";
import { Chapter11_FinalVision } from "./chapters/Chapter11_FinalVision";

export default function App() {
  const setScrollProgress = useScrollStore((s) => s.setScrollProgress);
  const isReducedMotion = useScrollStore((s) => s.isReducedMotion);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll engine
    if (!isReducedMotion) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
      });
      lenisRef.current = lenis;
      if (typeof window !== "undefined") {
        (window as unknown as { __lenis?: Lenis | null }).__lenis = lenis;
      }

      lenis.on("scroll", (e) => {
        const progress = e.progress; // 0 to 1 normalized
        setScrollProgress(progress);
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      return () => {
        if (typeof window !== "undefined") {
          (window as unknown as { __lenis?: Lenis | null }).__lenis = null;
        }
        lenis.destroy();
      };
    } else {
      // Reduced motion fallback
      const handleScroll = () => {
        const totalHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
        setScrollProgress(progress);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [setScrollProgress, isReducedMotion]);

  return (
    <div className="bg-[#FAF9F6] text-[#181818] min-h-screen relative font-sans selection:bg-[#E8E5DD] selection:text-[#181818]">
      {/* 1. Minimal Architectural Top Navigation: JATAYU / MARK 01 */}
      <NavigationBar />

      {/* 2. Hero 3D Stage — The Drone as the primary physical hero object */}
      <SceneCanvas />

      {/* 3. Subsystem Component Inspector Callout */}
      <ComponentInspector />

      {/* 4. Sequential 11 Narrative Chapters */}
      <main id="exhibition-flow" className="relative z-10">
        <Chapter01_Aircraft />
        <Chapter02_Anatomy />
        <Chapter03_Components />
        <Chapter04_System />
        <Chapter05_HowItWorks />
        <Chapter06_Intelligence />
        <Chapter07_TheEvent />
        <Chapter08_GroundStation />
        <Chapter09_Requirements />
        <Chapter10_Future />
        <Chapter11_FinalVision />
      </main>
    </div>
  );
}
