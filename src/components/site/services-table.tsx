"use client";

import { useState } from "react";
import { Check, X, Minus, ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceTier {
  name: string;
  price: string;
  popular?: boolean;
  description: string;
}

interface ServiceRow {
  category: string;
  feature: string;
  selfCatering: boolean | "partial";
  fullService: boolean | "partial";
  kidsParty: boolean | "partial";
  detail?: string;
}

const TIERS: ServiceTier[] = [
  {
    name: "Self-Catering",
    price: "from R18,000",
    description: "Bring your own caterer, alcohol & décor",
  },
  {
    name: "Full-Service",
    price: "from R42,000",
    popular: true,
    description: "We arrange catering, music & entertainment",
  },
  {
    name: "Birthday / Kids",
    price: "from R6,500",
    description: "Jumping castle, animals & garden fun",
  },
];

const ROWS: ServiceRow[] = [
  { category: "Venue", feature: "Barn reception (seats 200)", selfCatering: true, fullService: true, kidsParty: true },
  { category: "Venue", feature: "Choice of 4 ceremony settings", selfCatering: true, fullService: true, kidsParty: false },
  { category: "Venue", feature: "Two dressing rooms included", selfCatering: true, fullService: true, kidsParty: true },
  { category: "Venue", feature: "Fairy-light installation (3,000m)", selfCatering: true, fullService: true, kidsParty: true },
  { category: "Catering", feature: "Bring your own caterer", selfCatering: true, fullService: false, detail: "Full-service includes in-house catering to your budget" },
  { category: "Catering", feature: "In-house catering to budget", selfCatering: false, fullService: true, kidsParty: "partial", detail: "Kids parties can add catering" },
  { category: "Catering", feature: "Braai facilities on site", selfCatering: true, fullService: true, kidsParty: true },
  { category: "Bar", feature: "On-site bar & snack bar", selfCatering: true, fullService: true, kidsParty: "partial", detail: "Cash bar available for kids parties" },
  { category: "Bar", feature: "Craft gin & cocktail menu", selfCatering: "partial", fullService: true, kidsParty: false, detail: "Self-catering can add the gin shelf" },
  { category: "Animals", feature: "Farm animal interaction", selfCatering: true, fullService: true, kidsParty: true },
  { category: "Animals", feature: "Donkey-served cocktail hour", selfCatering: false, fullService: true, kidsParty: false, detail: "Add-on for self-catering (R1,800)" },
  { category: "Animals", feature: "Horseback entrance", selfCatering: false, fullService: true, kidsParty: false, detail: "Add-on (R3,000)" },
  { category: "Animals", feature: "Pony & horse rides for guests", selfCatering: false, fullService: true, kidsParty: true },
  { category: "Entertainment", feature: "DJ + live bands arranged", selfCatering: false, fullService: true, kidsParty: false, detail: "Add-on for self-catering (from R6,500)" },
  { category: "Entertainment", feature: "Jumping castle & waterslide", selfCatering: false, fullService: false, kidsParty: true },
  { category: "Entertainment", feature: "Boeresport farm games", selfCatering: false, fullService: "partial", kidsParty: true, detail: "Add-on for full-service" },
  { category: "Logistics", feature: "On-site parking", selfCatering: true, fullService: true, kidsParty: true },
  { category: "Logistics", feature: "Built-in sound system", selfCatering: true, fullService: true, kidsParty: true },
  { category: "Logistics", feature: "Power & backup lighting", selfCatering: true, fullService: true, kidsParty: true },
  { category: "Logistics", feature: "Tables, chairs & ceremony seating", selfCatering: true, fullService: true, kidsParty: true },
];

function CellIcon({ value }: { value: boolean | "partial" }) {
  if (value === true) return <Check className="mx-auto h-5 w-5 text-emerald-600" aria-label="Included" />;
  if (value === "partial") return <Minus className="mx-auto h-4 w-4 text-amber-500" aria-label="Partial / add-on" />;
  return <X className="mx-auto h-4 w-4 text-muted-foreground/30" aria-label="Not included" />;
}

export function ServicesTable() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Group rows by category
  const categories = Array.from(new Set(ROWS.map((r) => r.category)));

  return (
    <section id="services-table" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Premium heading */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-gold-gradient">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-500/50" />
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            What's included
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-500/50" />
          </p>
          <h2
            className="text-3xl font-semibold leading-tight tracking-tight text-foreground text-balance sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Compare every service, side by side
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg text-balance">
            The full breakdown of what each package includes — no hidden costs, no surprises.
            Tap any row with a detail badge to expand it.
          </p>
        </div>

        {/* Premium tier cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1",
                tier.popular
                  ? "bg-gold-gradient text-black shadow-gold-glow-lg"
                  : "border border-border bg-card shadow-premium-sm hover:shadow-premium"
              )}
            >
              {tier.popular && (
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-black/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="h-3 w-3" />
                  Popular
                </span>
              )}
              <h3
                className={cn(
                  "text-lg font-semibold",
                  tier.popular ? "text-black" : "text-foreground"
                )}
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                {tier.name}
              </h3>
              <p className={cn("mt-1 text-sm", tier.popular ? "text-black/70" : "text-muted-foreground")}>
                {tier.description}
              </p>
              <p className={cn("mt-2 font-serif text-2xl font-bold", tier.popular ? "text-black" : "text-primary")}>
                {tier.price}
              </p>
            </div>
          ))}
        </div>

        {/* Premium interactive table */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-premium">
          {/* Table header — sticky */}
          <div className="sticky top-0 z-10 grid grid-cols-[1fr_80px_80px_80px] gap-2 border-b-2 border-amber-400/30 bg-gradient-to-r from-muted/60 to-muted/30 px-4 py-3 sm:grid-cols-[1fr_120px_120px_120px] sm:px-6">
            <span className="text-xs font-bold uppercase tracking-wider text-foreground/70">Service</span>
            {TIERS.map((tier) => (
              <span
                key={tier.name}
                className={cn(
                  "text-center text-xs font-bold uppercase tracking-wider",
                  tier.popular ? "text-amber-700" : "text-foreground/60"
                )}
              >
                {tier.name}
              </span>
            ))}
          </div>

          {/* Table body — grouped by category */}
          {categories.map((cat) => {
            const catRows = ROWS.filter((r) => r.category === cat);
            return (
              <div key={cat}>
                {/* Category header row */}
                <div className="border-b border-border/40 bg-luxury-mesh px-4 py-2 sm:px-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-gold-gradient">
                    {cat}
                  </span>
                </div>
                {/* Feature rows */}
                {catRows.map((row) => {
                  const rowKey = `${row.category}-${row.feature}`;
                  const isExpanded = expandedRow === rowKey;
                  const hasDetail = !!row.detail;
                  return (
                    <div key={rowKey}>
                      <button
                        type="button"
                        onClick={() => hasDetail && setExpandedRow(isExpanded ? null : rowKey)}
                        disabled={!hasDetail}
                        className={cn(
                          "grid w-full grid-cols-[1fr_80px_80px_80px] items-center gap-2 border-b border-border/30 px-4 py-2.5 transition-colors sm:grid-cols-[1fr_120px_120px_120px] sm:px-6",
                          hasDetail ? "cursor-pointer hover:bg-amber-50/40" : "cursor-default",
                          isExpanded && "bg-amber-50/40"
                        )}
                      >
                        <span className="flex items-center gap-2 text-left text-sm text-foreground/80">
                          {hasDetail && (
                            <ChevronDown
                              className={cn(
                                "h-3.5 w-3.5 shrink-0 text-amber-500 transition-transform duration-300",
                                isExpanded ? "rotate-180" : ""
                              )}
                            />
                          )}
                          {row.feature}
                        </span>
                        <span className="flex justify-center"><CellIcon value={row.selfCatering} /></span>
                        <span className="flex justify-center"><CellIcon value={row.fullService} /></span>
                        <span className="flex justify-center"><CellIcon value={row.kidsParty} /></span>
                      </button>
                      {/* Expandable detail */}
                      {isExpanded && row.detail && (
                        <div className="animate-fade-in-scale border-b border-border/30 bg-amber-50/30 px-4 py-3 sm:px-6">
                          <p className="ml-6 text-xs leading-relaxed text-amber-800/80">
                            <Sparkles className="mr-1.5 inline h-3 w-3 text-amber-500" />
                            {row.detail}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-4 w-4 text-emerald-600" />
            Included
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Minus className="h-4 w-4 text-amber-500" />
            Partial / add-on
          </span>
          <span className="inline-flex items-center gap-1.5">
            <X className="h-4 w-4 text-muted-foreground/30" />
            Not included
          </span>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <a
            href="#enquiry"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-gold-gradient px-6 text-sm font-semibold text-black shadow-gold-glow transition-all duration-300 hover:scale-105 hover:shadow-gold-glow-lg"
          >
            Build my quote
            <Sparkles className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
