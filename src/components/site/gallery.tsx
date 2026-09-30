"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { Filter, Sparkles, ArrowRight } from "lucide-react";
import { GALLERY_IMAGES } from "./data";
import FlexCarousel from "@/components/FlexCarousel";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CONTACT } from "./data";
import { WhatsAppIcon } from "./icons";

const CATEGORIES = ["All", "Ceremony", "Reception", "Animals", "Details", "Rooms"] as const;
type Category = (typeof CATEGORIES)[number];

export function Gallery() {
  const [category, setCategory] = useState<Category>("All");

  const filtered = useMemo(
    () => (category === "All" ? GALLERY_IMAGES : GALLERY_IMAGES.filter((img) => img.category === category)),
    [category]
  );

  const changeCategory = useCallback((cat: Category) => {
    setCategory(cat);
  }, []);

  const waLink = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hi Esperanza, I saw your gallery and I'd love to view the venue."
  )}`;

  return (
    <section id="gallery" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ═══ Premium section header ═══ */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-gold-gradient">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-amber-400/60" />
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            Capture the moment
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-amber-400/60" />
          </p>
          <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Every frame tells a story
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg text-balance">
            From the first dance under golden fairy lights to the confetti send-off through the trees,
            these are real moments from real weddings at Esperanza. Drag, swipe, or tap to explore —
            each image is a glimpse of what your day could look like.
          </p>
        </div>

        {/* ═══ Category filter pills — premium sticky bar ═══ */}
        <div className="sticky top-16 z-30 -mx-4 mt-10 flex flex-wrap items-center justify-center gap-2 glass-light px-4 py-3 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Filter className="h-3 w-3" />
            Filter:
          </span>
          {CATEGORIES.map((cat) => {
            const count = cat === "All" ? GALLERY_IMAGES.length : GALLERY_IMAGES.filter((i) => i.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => changeCategory(cat)}
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-all duration-300 hover:scale-105",
                  category === cat
                    ? "border-transparent bg-gold-gradient text-black shadow-gold-glow"
                    : "border-border bg-card text-foreground/70 hover:border-primary/30 hover:text-foreground"
                )}
              >
                {cat}
                <span className={cn("rounded-full px-1.5 text-[10px]", category === cat ? "bg-black/20" : "bg-muted")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ═══ WebGL FlexCarousel — the only view ═══ */}
        <div className="mt-8" style={{ width: "100%", height: "560px", position: "relative" }}>
          <FlexCarousel
            items={filtered.map((img) => ({
              src: img.src,
              alt: img.alt,
              title: img.tag,
              subtitle: img.category,
            }))}
            preset="liquid"
            intro="rise"
            cardHeight={0.54}
            gap={12}
            squeeze={0.2}
            focusOnClick
            captions
          />
        </div>

        {/* ═══ Premium CTA strip ═══ */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-muted/40 p-6 sm:flex-row sm:p-8">
          <div className="text-center sm:text-left">
            <h3 className="font-serif text-xl font-semibold text-foreground sm:text-2xl">
              Your story starts here
            </h3>
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
              Book a viewing and walk the grounds where these moments were captured.
              Every wedding is different — yours will be too.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-gold-gradient px-6 text-sm font-semibold text-black shadow-gold-glow transition-all duration-300 hover:scale-105 hover:shadow-gold-glow-lg"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Book a viewing
              <ArrowRight className="h-4 w-4" />
            </a>
            <Button asChild variant="outline" className="h-11 rounded-full border-gold-gradient card-lift hover:shadow-gold-glow">
              <a href={CONTACT.social.instagram} target="_blank" rel="noopener noreferrer">
                See more on Instagram
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
