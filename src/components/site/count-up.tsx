"use client";

import { useEffect, useState } from "react";
import { useInView } from "./use-in-view";

interface CountUpProps {
  to: number;
  decimals?: number;
  duration?: number;
  /** Format with thousands separators (en-US, matches the rest of the site) */
  group?: boolean;
  className?: string;
}

/**
 * Animated number that counts up once when scrolled into view.
 *
 * The server-rendered HTML (and no-JS visitors, crawlers, link previews, reduced-motion users)
 * always show the FINAL value. The animation only kicks in on the client, once the element is
 * actually visible — so the number is never "0" in anything that isn't a live, animating browser.
 */
export function CountUp({ to, decimals = 0, duration = 1200, group = false, className }: CountUpProps) {
  const [ref, visible] = useInView<HTMLSpanElement>(0.4);
  // null = "show the final value" (SSR, before the animation starts, reduced motion)
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(t >= 1 ? null : to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, to, duration]);

  const shown = value ?? to;
  const text = group
    ? Math.round(shown).toLocaleString("en-US")
    : shown.toFixed(decimals);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
