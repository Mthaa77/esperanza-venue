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

/** Animated number that counts up once when scrolled into view. Honors reduced motion. */
export function CountUp({ to, decimals = 0, duration = 1400, group = false, className }: CountUpProps) {
  const [ref, visible] = useInView<HTMLSpanElement>(0.4);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!visible) return;
    // Reduced motion => zero-length animation: jumps to the final value on the first frame
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 0 : duration;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = total === 0 ? 1 : Math.min((now - start) / total, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, to, duration]);

  const shown = visible ? value : 0;
  const text = group
    ? Math.round(shown).toLocaleString("en-US")
    : shown.toFixed(decimals);

  return (
    <span ref={ref} className={className} aria-label={String(to)}>
      <span aria-hidden="true">{text}</span>
    </span>
  );
}
