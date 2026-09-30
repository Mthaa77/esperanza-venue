"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "./data";

/**
 * Tracks scroll progress (0..1) and the currently-active section
 * (the section whose top is ~30% from the top of the viewport).
 *
 * Shared by ScrollProgress (the top progress bar) and the Header
 * (for the mobile drawer's active-section highlight).
 */
export function useScrollState() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };
    updateProgress();

    // Track active section via IntersectionObserver
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((s) => observer.observe(s));

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      observer.disconnect();
    };
  }, []);

  return { progress, activeSection };
}
