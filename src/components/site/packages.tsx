"use client";

import { useState, useMemo } from "react";
import { Check, Crown, ArrowRight, Sparkles, CalendarDays, Sun, Moon } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { PackageComparison } from "./package-comparison";
import { cn } from "@/lib/utils";
import { useInView } from "./use-in-view";

export interface Package {
  id: string;
  name: string;
  slug: string;
  description: string;
  priceFrom: number;
  priceDisplay?: string;
  features: string;
  popular?: boolean;
  order?: number;
}

type PricingMode = "weekday" | "weekend";

// Weekend premium: Fridays & Saturdays carry a 25% premium over weekday (Sun-Thu) rates.
// This is indicative — final quote always confirmed on enquiry.
const WEEKEND_PREMIUM = 0.25;

function formatZAR(cents: number): string {
  return `R${(cents / 100).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export function Packages({ packages }: { packages: Package[] }) {
  const [mode, setMode] = useState<PricingMode>("weekday");
  const [gridRef, gridVisible] = useInView<HTMLDivElement>(0.1);

  const formatted = useMemo(
    () =>
      packages.map((p) => {
        const basePrice = p.priceFrom;
        const adjustedPrice = Math.round(
          basePrice * (mode === "weekend" ? 1 + WEEKEND_PREMIUM : 1)
        );
        return {
          ...p,
          weekdayPrice: basePrice,
          weekdayDisplay: formatZAR(basePrice),
          weekendPrice: Math.round(basePrice * (1 + WEEKEND_PREMIUM)),
          weekendDisplay: formatZAR(Math.round(basePrice * (1 + WEEKEND_PREMIUM))),
          currentPrice: adjustedPrice,
          currentDisplay: formatZAR(adjustedPrice),
          featuresList: p.features.split("\n").filter(Boolean),
        };
      }),
    [packages, mode]
  );

  return (
    <section id="packages" className="scroll-mt-20 bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Packages & pricing"
          title="Transparent pricing, finally"
          description="Real starting prices, in plain sight. Pick weekday or weekend and see exactly what changes — no brochure hunting, no surprise line items."
        />
        <p className="mx-auto mt-3 max-w-3xl text-center font-serif text-base italic text-amber-700/70">
          &ldquo;Bekostigbaar en eerlik — geen verborge kostes, net regte pryse.&rdquo;
        </p>

        {/* Seasonal pricing toggle */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" />
            Select your day:
          </span>
          <div role="group" aria-label="Pricing day" className="inline-flex rounded-full border border-border bg-card p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setMode("weekday")}
              aria-pressed={mode === "weekday"}
              className={cn(
                "inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-all",
                mode === "weekday"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Sun className="h-3.5 w-3.5" />
              Weekday
              <span className={cn("text-[10px]", mode === "weekday" ? "text-primary-foreground/70" : "text-muted-foreground/70")}>
                Sun–Thu
              </span>
            </button>
            <button
              type="button"
              onClick={() => setMode("weekend")}
              aria-pressed={mode === "weekend"}
              className={cn(
                "inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-all",
                mode === "weekend"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Moon className="h-3.5 w-3.5" />
              Weekend
              <span className={cn("text-[10px]", mode === "weekend" ? "text-primary-foreground/70" : "text-muted-foreground/70")}>
                Fri–Sat
              </span>
            </button>
          </div>
          <span className="text-xs text-muted-foreground" aria-live="polite">
            {mode === "weekday"
              ? "Save 20% with a weekday wedding"
              : `+25% weekend premium applies`}
          </span>
        </div>

        <div ref={gridRef} className="mt-10 grid items-stretch gap-6 lg:grid-cols-3">
          {formatted.map((pkg, idx) => (
            <article
              key={pkg.id}
              data-visible={gridVisible}
              style={{ "--reveal-delay": `${idx * 120}ms` } as React.CSSProperties}
              className={cn(
                "in-view-reveal relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-sm ring-1 hover:-translate-y-1 hover:shadow-xl",
                pkg.popular
                  ? "ring-primary/40 lg:scale-[1.03]"
                  : "ring-border"
              )}
            >
              {pkg.popular && (
                <>
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-amber-500 to-primary" />
                  <span className="absolute right-4 top-5 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground shadow-md">
                    <Crown className="h-3 w-3" />
                    Most popular
                  </span>
                </>
              )}

              <div className="p-6 sm:p-7">
                <h3 className="font-serif text-xl font-semibold text-foreground sm:text-2xl">
                  {pkg.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pkg.description}
                </p>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">
                    Starting from
                  </span>
                </div>
                {/* Price with animated swap */}
                <div className="flex items-baseline gap-2">
                  <p
                    key={mode}
                    className="font-serif text-3xl font-semibold tabular-nums text-foreground animate-float-up sm:text-4xl"
                  >
                    {pkg.currentDisplay}
                  </p>
                  {mode === "weekend" && (
                    <span className="text-sm text-muted-foreground line-through">
                      {pkg.weekdayDisplay}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {mode === "weekday"
                    ? "Weekday rate (Sun–Thu). Final quote depends on guest count & add-ons."
                    : "Weekend rate (Fri–Sat). Final quote depends on guest count & add-ons."}
                </p>

                <a
                  href="#enquiry"
                  className={cn(
                    "mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors",
                    pkg.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-primary/30 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground"
                  )}
                >
                  Request this package
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-auto border-t border-border bg-muted/30 p-6 sm:p-7">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground/70">
                  What&apos;s included
                </p>
                <ul className="space-y-2.5">
                  {pkg.featuresList.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          pkg.popular ? "text-primary" : "text-emerald-600"
                        )}
                      />
                      <span className="text-foreground/80">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* Comparison table toggle */}
        <PackageComparison packages={packages} mode={mode} />

        {/* Add-ons note */}
        <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-5 sm:flex-row sm:items-center">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
            <Sparkles className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="font-medium text-foreground">Every package can be tailored.</p>
            <p className="text-sm text-muted-foreground">
              Add a donkey-served cocktail hour, live band, horseback entrance, pony cart rides,
              or hand the whole day to us as a full-service quote. We work to your budget.
            </p>
          </div>
          <a
            href="#enquiry"
            className="shrink-0 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Build my quote
          </a>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Prices are indicative starting points in South African Rand (ZAR), inclusive of VAT.
          Weekday = Sun–Thu, Weekend = Fri–Sat (+25%). Final pricing confirmed on enquiry. EFT preferred.
        </p>
      </div>
    </section>
  );
}
