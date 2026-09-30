"use client";

import { Quote } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { StarIcon } from "./icons";
import { CONTACT } from "./data";
import { CountUp } from "./count-up";
import { useInView } from "./use-in-view";
import { cn } from "@/lib/utils";

export interface Testimonial {
  id: string;
  name: string;
  source: string;
  rating: number;
  text: string;
  eventType?: string | null;
  featured?: boolean;
}

// Palette stays inside the brand (gold / forest / barn-wood). The old badges used blue,
// which the design brief explicitly rules out.
const SOURCE_BADGE: Record<string, { label: string; className: string }> = {
  Google: { label: "Google", className: "bg-amber-100 text-amber-900" },
  Facebook: { label: "Facebook", className: "bg-orange-100 text-orange-900" },
  "On-site": { label: "On-site", className: "bg-emerald-100 text-emerald-900" },
};

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className={cn("h-4 w-4", i < rating ? "text-amber-500" : "text-border")} />
      ))}
    </div>
  );
}

/** Star row that fills fractional ratings properly (4.4 => 4 full + 40% of the fifth). */
function FractionalStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="relative inline-block h-7 w-7">
            <StarIcon className="absolute inset-0 h-7 w-7 text-background/25" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <StarIcon className="h-7 w-7 text-amber-400" />
            </span>
          </span>
        );
      })}
    </div>
  );
}

function Card({ t, index, visible, big }: { t: Testimonial; index: number; visible: boolean; big?: boolean }) {
  const badge = SOURCE_BADGE[t.source] ?? SOURCE_BADGE["On-site"];
  return (
    <figure
      data-visible={visible}
      style={{ "--reveal-delay": `${index * 110}ms` } as React.CSSProperties}
      className={cn(
        "in-view-reveal relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm hover:-translate-y-0.5 hover:shadow-lg sm:p-7",
        t.featured ? "border-primary/30 ring-1 ring-primary/20" : "border-border",
        big && "sm:col-span-2 sm:p-10"
      )}
    >
      {/* Oversized decorative quote mark */}
      <Quote
        className={cn(
          "absolute right-5 top-5 text-primary/10",
          big ? "h-20 w-20" : "h-14 w-14"
        )}
        aria-hidden="true"
      />

      <div className="relative flex items-center gap-3">
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
            badge.className
          )}
        >
          {badge.label}
        </span>
        <Stars rating={t.rating} />
      </div>

      <blockquote
        className={cn(
          "relative mt-4 flex-1 leading-relaxed text-foreground/85",
          big ? "font-serif text-xl sm:text-2xl" : "text-sm sm:text-base"
        )}
      >
        &ldquo;{t.text}&rdquo;
      </blockquote>

      <figcaption className="relative mt-5 flex items-center gap-3 border-t border-border pt-4">
        {/* Initial avatar — no fake photos */}
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-amber-200 to-amber-400 font-serif text-base font-semibold text-amber-950"
          aria-hidden="true"
        >
          {t.name.trim().charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="truncate font-serif text-base font-semibold text-foreground">{t.name}</p>
          {t.eventType && <p className="truncate text-xs text-muted-foreground">{t.eventType}</p>}
        </div>
        {t.featured && (
          <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-primary">
            Featured
          </span>
        )}
      </figcaption>
    </figure>
  );
}

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [gridRef, gridVisible] = useInView<HTMLDivElement>(0.08);
  const { rating, reviewCount } = CONTACT.stats;

  // Empty state — the old "Reviews loading..." was a lie (nothing is loading).
  if (!testimonials || testimonials.length === 0) {
    return (
      <section id="testimonials" className="scroll-mt-20 bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Real couples & families"
            title={`${rating} stars from ${reviewCount} reviews`}
            description="Couples tell it better than we do. Ask us for recent reviews and we'll send them over on WhatsApp."
          />
          <div className="mt-8 text-center">
            <a
              href="#enquiry"
              className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Ask about our reviews
            </a>
          </div>
        </div>
      </section>
    );
  }

  // Lead with the first featured review as a wide hero card; the rest flow underneath.
  const leadIdx = testimonials.findIndex((t) => t.featured);
  const lead = leadIdx >= 0 ? testimonials[leadIdx] : null;
  const rest = lead ? testimonials.filter((t) => t.id !== lead.id) : testimonials;

  return (
    <section id="testimonials" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Real couples & families"
          title={`${rating} stars from ${reviewCount} reviews`}
          description="Reviews from Google, Facebook and on-site submissions. The single most-mentioned moment? The donkey that serves the drinks."
        />

        <div ref={gridRef} className="mt-12 grid gap-6 sm:grid-cols-2">
          {lead && <Card t={lead} index={0} visible={gridVisible} big />}
          {rest.map((t, i) => (
            <Card key={t.id} t={t} index={i + (lead ? 1 : 0)} visible={gridVisible} />
          ))}
        </div>

        {/* Aggregate rating — numbers come from CONTACT.stats, not hardcoded twice */}
        <div className="mt-10 flex flex-col items-center gap-6 rounded-2xl bg-foreground p-8 text-background sm:flex-row sm:justify-between sm:p-10">
          <div className="text-center sm:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-amber-300">
              Aggregate rating
            </p>
            <p className="mt-2 font-serif text-5xl font-semibold text-background">
              <CountUp to={rating} decimals={1} />
              <span className="text-2xl text-background/60">/5</span>
            </p>
            <p className="mt-1 text-sm text-background/75">
              Across {reviewCount} Google reviews &amp; counting
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 sm:items-end">
            <FractionalStars rating={rating} />
            <a
              href="#enquiry"
              className="rounded-full border border-amber-300/50 px-5 py-2 text-sm font-medium text-amber-200 transition-colors hover:bg-amber-300 hover:text-amber-950"
            >
              See it for yourself — book a viewing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
