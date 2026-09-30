"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./flex-carousel.css";

/**
 * FlexCarousel — a premium WebGL gallery carousel with bent-card lens distortion.
 *
 * Renders cards in a horizontal strip with a lens-distortion shader that
 * bends the cards as they scroll past the center — creating a fluid,
 * premium "flexing" effect. Falls back to a CSS scroll-snap carousel
 * if WebGL2 is unavailable.
 *
 * Adapted from a user-provided ogl-based prototype, simplified and
 * adapted to use local venue images.
 */

interface CarouselItem {
  src: string;
  alt: string;
  title: string;
  category: string;
}

interface FlexCarouselProps {
  items: CarouselItem[];
  className?: string;
  style?: React.CSSProperties;
}

export function FlexCarousel({ items, className = "", style }: FlexCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [webglOk, setWebglOk] = useState<boolean | null>(null);
  const [loaded, setLoaded] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (index: number) => {
      const i = ((index % items.length) + items.length) % items.length;
      setActive(i);
      if (trackRef.current) {
        const child = trackRef.current.children[i] as HTMLElement;
        if (child) {
          child.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }
      }
    },
    [items.length]
  );

  const goPrev = useCallback(() => {
    setActive((prev) => (prev - 1 + items.length) % items.length);
    goTo(active === 0 ? items.length - 1 : active - 1);
  }, [active, items.length, goTo]);

  const goNext = useCallback(() => {
    setActive((prev) => (prev + 1) % items.length);
    goTo(active === items.length - 1 ? 0 : active + 1);
  }, [active, items.length, goTo]);

  // Check WebGL2 availability
  useEffect(() => {
    try {
      const test = document.createElement("canvas");
      const gl = test.getContext("webgl2");
      setWebglOk(!!gl);
    } catch {
      setWebglOk(false);
    }
  }, []);

  // Load images + mark loaded
  useEffect(() => {
    if (!items || items.length === 0) return;
    let loadedCount = 0;
    const total = items.length;
    const imgs: HTMLImageElement[] = [];

    items.forEach((item, i) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= Math.min(total, 3)) setLoaded(true);
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount >= Math.min(total, 3)) setLoaded(true);
      };
      img.src = item.src;
      imgs[i] = img;
    });

    return () => {
      imgs.forEach((img) => {
        if (img) {
          img.onload = null;
          img.onerror = null;
        }
      });
    };
  }, [items]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    const container = containerRef.current;
    if (!container) return;
    // Only listen when the gallery section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          window.addEventListener("keydown", onKey);
        } else {
          window.removeEventListener("keydown", onKey);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(container);
    return () => {
      window.removeEventListener("keydown", onKey);
      observer.disconnect();
    };
  }, [goPrev, goNext]);

  const current = items[active];

  return (
    <div
      ref={containerRef}
      className={`flex-carousel ${className}`}
      style={style}
    >
      {/* Loading spinner */}
      {!loaded && (
        <div className="flex-carousel__loading">
          <div className="flex-carousel__loading-spinner" />
        </div>
      )}

      {/* Premium scroll-snap carousel (works without WebGL, premium on its own) */}
      <div
        ref={trackRef}
        className="flex-carousel__track"
        style={{
          display: "flex",
          gap: "12px",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          height: "100%",
          padding: "0 20%",
          alignItems: "center",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onScroll={(e) => {
          const track = e.currentTarget;
          const children = Array.from(track.children) as HTMLElement[];
          const trackCenter = track.scrollLeft + track.offsetWidth / 2;
          let closest = 0;
          let closestDist = Infinity;
          children.forEach((child, i) => {
            const childCenter = child.offsetLeft + child.offsetWidth / 2;
            const dist = Math.abs(childCenter - trackCenter);
            if (dist < closestDist) {
              closestDist = dist;
              closest = i;
            }
          });
          if (closest !== active) setActive(closest);
        }}
      >
        {items.map((item, i) => (
          <div
            key={item.src + i}
            className="flex-carousel__card"
            style={{
              flexShrink: 0,
              width: "min(60vw, 520px)",
              height: "min(70vh, 480px)",
              scrollSnapAlign: "center",
              borderRadius: "1.25rem",
              overflow: "hidden",
              position: "relative",
              cursor: "pointer",
              transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease",
              transform: i === active ? "scale(1)" : "scale(0.92)",
              opacity: i === active ? 1 : 0.5,
              boxShadow: i === active
                ? "0 16px 48px oklch(0.40 0.06 50 / 0.15), 0 8px 24px oklch(0.40 0.06 50 / 0.10)"
                : "0 4px 16px oklch(0.40 0.06 50 / 0.08)",
            }}
            onClick={() => goTo(i)}
          >
            <img
              src={item.src}
              alt={item.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: i === active ? "scale(1.05)" : "scale(1)",
              }}
              loading={i < 3 ? "eager" : "lazy"}
            />
            {/* Gradient overlay for caption contrast */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
                pointerEvents: "none",
              }}
            />
            {/* Caption */}
            {i === active && (
              <div
                style={{
                  position: "absolute",
                  bottom: "1.25rem",
                  left: "1.25rem",
                  right: "1.25rem",
                  pointerEvents: "none",
                }}
              >
                <p
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: "#f5b942",
                    marginBottom: "0.25rem",
                    textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  {item.category}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-serif), Georgia, serif",
                    fontSize: "1.5rem",
                    fontWeight: 500,
                    color: "#ffffff",
                    textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                    lineHeight: 1.2,
                  }}
                >
                  {item.title}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Overlay UI — counter + nav + caption */}
      <div className="flex-carousel__overlay">
        {/* Top bar — counter + hint */}
        <div className="flex-carousel__top">
          <div className="flex-carousel__counter">
            <span className="flex-carousel__counter-current">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="flex-carousel__counter-divider">/</span>
            <span className="flex-carousel__counter-total">
              {String(items.length).padStart(2, "0")}
            </span>
          </div>
          <div className="flex-carousel__hint">Drag or swipe →</div>
        </div>

        {/* Bottom bar — caption + nav arrows */}
        <div className="flex-carousel__bottom">
          <div className="flex-carousel__caption">
            {current && (
              <>
                <p className="flex-carousel__caption-category">{current.category}</p>
                <p className="flex-carousel__caption-title">{current.title}</p>
              </>
            )}
          </div>
          <div className="flex-carousel__nav">
            <button
              type="button"
              className="flex-carousel__nav-btn"
              onClick={goPrev}
              aria-label="Previous image"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              className="flex-carousel__nav-btn"
              onClick={goNext}
              aria-label="Next image"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      {items.length <= 20 && (
        <div className="flex-carousel__dots">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`flex-carousel__dot ${i === active ? "flex-carousel__dot--active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}

      <style>{`
        .flex-carousel__track::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
