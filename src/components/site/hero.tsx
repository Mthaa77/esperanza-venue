"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Calendar, MapPin, ChevronDown, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "./data";
import { WhatsAppIcon, StarIcon } from "./icons";
import { CountUp } from "./count-up";

/** Inline style helper for staggered entrance delays */
const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  const bgRef = useRef<HTMLDivElement | null>(null);

  // Parallax written straight to the DOM node — no React re-render on every scroll frame.
  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      // Stop doing work once the hero is off-screen
      if (y > window.innerHeight * 1.2) return;
      el.style.transform = `translate3d(0, ${y * 0.3}px, 0) scale(1.08)`;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const waLink = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hi Esperanza, I'd like to enquire about a wedding date."
  )}`;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
      aria-label="Esperanza Wedding Venue — hero"
    >
      {/* Parallax background — next/image gives us priority loading + responsive sizes (better LCP) */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transform: "scale(1.08)" }}
        aria-hidden="true"
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FB_IMG_1790835015425-BiDzvKBKtgAbgTdwkiUISMgA51CL8r.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
        />
      </div>

      {/* Cinematic overlay */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.10 0.03 50 / 0.65) 0%, oklch(0.10 0.03 50 / 0.45) 35%, oklch(0.10 0.03 50 / 0.78) 100%), radial-gradient(ellipse 80% 50% at 50% 45%, oklch(0.10 0.03 50 / 0.5) 0%, oklch(0.10 0.03 50 / 0.72) 70%, oklch(0.10 0.03 50 / 0.88) 100%)",
        }}
      />
      {/* Warm gold ambient glow */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 60%, oklch(0.78 0.13 75 / 0.14) 0%, transparent 70%)",
        }}
      />

      {/* Fade into the page background so the ticker below doesn't meet a hard edge */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32 bg-gradient-to-t from-black/40 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-24 text-center sm:px-6">
        <div className="reveal-up" style={delay(0)}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md">
            <MapPin className="h-3.5 w-3.5" />
            Pretoria East · Gauteng
          </span>
        </div>

        <h1
          className="reveal-up mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          style={{
            ...delay(120),
            fontFamily: "var(--font-playfair), Georgia, serif",
            textShadow: "0 2px 8px rgba(0,0,0,0.5), 0 0 32px rgba(0,0,0,0.3)",
          }}
        >
          A wedding venue with a{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 bg-clip-text text-transparent">
              difference
            </span>
            <svg
              className="absolute -bottom-2 left-0 h-2 w-full text-amber-300/70"
              viewBox="0 0 200 8"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M2 5 Q 50 1 100 4 T 198 5"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1}
                style={{ animation: "hero-underline 1.1s 0.9s cubic-bezier(0.22,1,0.36,1) forwards" }}
              />
            </svg>
          </span>
        </h1>

        <p
          className="reveal-up mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/95 sm:text-lg"
          style={{ ...delay(260), textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
        >
          A working equestrian farm on the banks of the Pienaars River. Forest chapel, barn
          reception strung with fairy lights, horses &amp; donkeys serving drinks — a real
          countryside wedding, not a manicured one.
        </p>

        <p
          className="reveal-up mx-auto mt-4 max-w-xl font-serif text-lg italic leading-relaxed text-amber-200/90 sm:text-xl"
          style={{ ...delay(360), textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
        >
          &ldquo;ŉ Troue met &apos;n verskil — waar die plaas die fees is.&rdquo;
        </p>

        <div
          className="reveal-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={delay(460)}
        >
          <Button
            asChild
            size="lg"
            className="group h-12 rounded-full px-7 text-base shadow-gold-glow transition-transform hover:-translate-y-0.5"
          >
            <a href="#enquiry">
              <Calendar className="h-5 w-5 transition-transform group-hover:rotate-6" />
              Book a viewing
            </a>
          </Button>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/60 bg-white/15 px-7 text-base font-medium text-white backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white/25 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
          >
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp Marina
          </a>
        </div>

        {/* Quick stats — count up when they scroll into view */}
        <dl
          className="reveal-up mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-2 sm:gap-6"
          style={delay(580)}
        >
          <div className="rounded-xl border border-white/20 bg-black/30 px-2 py-4 backdrop-blur-md transition-colors hover:border-amber-300/40 sm:px-3">
            <dt className="flex items-center justify-center gap-1 text-xs uppercase tracking-wider text-white/80">
              <StarIcon className="h-3 w-3 text-amber-300" />
              Google rating
            </dt>
            <dd className="mt-1 font-serif text-2xl font-semibold text-white sm:text-3xl">
              <CountUp to={CONTACT.stats.rating} decimals={1} />
              <span className="text-base text-white/70">/5</span>
            </dd>
            <dd className="text-[11px] text-white/75">{CONTACT.stats.reviewCount} reviews</dd>
          </div>
          <div className="rounded-xl border border-white/20 bg-black/30 px-2 py-4 backdrop-blur-md transition-colors hover:border-amber-300/40 sm:px-3">
            <dt className="text-xs uppercase tracking-wider text-white/80">Facebook</dt>
            <dd className="mt-1 font-serif text-2xl font-semibold text-white sm:text-3xl">
              <CountUp to={CONTACT.stats.fbLikes} group />
              <span className="text-base text-white/70">+</span>
            </dd>
            <dd className="text-[11px] text-white/75">
              likes &amp; {CONTACT.stats.fbCheckins.toLocaleString("en-US")} check-ins
            </dd>
          </div>
          <div className="rounded-xl border border-white/20 bg-black/30 px-2 py-4 backdrop-blur-md transition-colors hover:border-amber-300/40 sm:px-3">
            <dt className="text-xs uppercase tracking-wider text-white/80">Instagram</dt>
            <dd className="mt-1 font-serif text-2xl font-semibold text-white sm:text-3xl">
              <CountUp to={CONTACT.stats.igPosts} />
              <span className="text-base text-white/70">+</span>
            </dd>
            <dd className="text-[11px] text-white/75">real-wedding posts</dd>
          </div>
        </dl>

        <p
          className="reveal-up mt-10 inline-flex items-center gap-1.5 text-xs text-white/80"
          style={delay(700)}
        >
          <Heart className="h-3 w-3 text-rose-300" />
          Affordable · Self-catering or full-service · Pet friendly
        </p>
        <p
          className="reveal-up mt-2 font-serif text-sm italic text-amber-200/70"
          style={delay(760)}
        >
          Bekostigbaar · Self-katering of vol-diens · Troeteldier-vriendelik
        </p>
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
      >
        <span className="flex flex-col items-center gap-1.5 text-[10px] uppercase tracking-[0.2em]">
          Scroll
          <ChevronDown className="h-4 w-4 animate-bounce motion-reduce:animate-none" />
        </span>
      </a>

      <style>{`
        @keyframes hero-underline { to { stroke-dashoffset: 0; } }
        @media (prefers-reduced-motion: reduce) {
          #top svg path { animation: none !important; stroke-dashoffset: 0 !important; }
        }
      `}</style>
    </section>
  );
}
