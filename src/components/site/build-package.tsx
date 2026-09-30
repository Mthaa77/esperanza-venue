"use client";

import { useState, useMemo, useCallback } from "react";
import { Check, Plus, Minus, Calculator, RotateCcw, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./section-heading";
import { ADD_ONS, type AddOn } from "./data";
import { HorseIcon, CartIcon } from "./icons";
import {
  Music,
  Mic,
  Sparkles as SparklesIcon,
  Gamepad2,
  Waves,
  Lasso,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS: Record<AddOn["icon"], typeof Music> = {
  music: Music,
  mic: Mic,
  sparkles: SparklesIcon,
  cart: CartIcon as unknown as typeof Music,
  horse: HorseIcon as unknown as typeof Music,
  lasso: Lasso as unknown as typeof Music,
  gamepad: Gamepad2,
  waves: Waves,
};

const PACKAGE_OPTIONS = [
  { id: "self-catering", name: "Self-Catering Hire", basePrice: 18000 },
  { id: "full-service", name: "Full-Service Package", basePrice: 42000 },
  { id: "kids-party", name: "Birthday / Kids Party", basePrice: 6500 },
];

function formatZAR(amount: number): string {
  return `R${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export function BuildPackage() {
  const [selectedPackage, setSelectedPackage] = useState<string>("full-service");
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());

  const toggleAddOn = useCallback((name: string) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setSelectedPackage("full-service");
    setSelectedAddOns(new Set());
  }, []);

  const total = useMemo(() => {
    const pkg = PACKAGE_OPTIONS.find((p) => p.id === selectedPackage);
    const base = pkg?.basePrice ?? 0;
    const addOnsTotal = ADD_ONS.filter((a) => selectedAddOns.has(a.name)).reduce(
      (sum, a) => sum + a.priceFrom,
      0
    );
    return base + addOnsTotal;
  }, [selectedPackage, selectedAddOns]);

  const selectedPackageObj = PACKAGE_OPTIONS.find((p) => p.id === selectedPackage);
  const selectedAddOnObjs = ADD_ONS.filter((a) => selectedAddOns.has(a.name));
  const hasAddOns = selectedAddOns.size > 0;

  // Build a WhatsApp link with the summary
  const summaryText = useMemo(() => {
    const lines = [
      `Hi Esperanza, I'd like a quote for:`,
      ``,
      `Package: ${selectedPackageObj?.name ?? ""} (${formatZAR(selectedPackageObj?.basePrice ?? 0)})`,
    ];
    if (hasAddOns) {
      lines.push(``, `Add-ons:`);
      selectedAddOnObjs.forEach((a) => lines.push(`- ${a.name} (${formatZAR(a.priceFrom)})`));
    }
    lines.push(``, `Estimated total: ${formatZAR(total)}`, ``, `Is this date available?`);
    return lines.join("\n");
  }, [selectedPackageObj, hasAddOns, selectedAddOnObjs, total]);

  const waLink = `https://wa.me/27768576886?text=${encodeURIComponent(summaryText)}`;

  return (
    <section id="build-package" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Build your day"
          title="Estimate your package"
          description="Pick a base package, tick the add-ons you love, and get an instant indicative total. Send the summary straight to Marina on WhatsApp — we'll confirm a written quote within 24-48 hours."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* Left: package selector + add-ons */}
          <div className="lg:col-span-2">
            {/* Step 1 — base package */}
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  1
                </span>
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  Choose a base package
                </h3>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {PACKAGE_OPTIONS.map((pkg) => {
                  const selected = selectedPackage === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={cn(
                        "relative flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition-all",
                        selected
                          ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                          : "border-border bg-background hover:border-primary/30"
                      )}
                      aria-pressed={selected}
                    >
                      {selected && (
                        <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                      <span className="font-serif text-sm font-semibold text-foreground">
                        {pkg.name}
                      </span>
                      <span className="text-xs font-medium text-primary">
                        from {formatZAR(pkg.basePrice)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2 — add-ons */}
            <div className="mt-4 rounded-2xl border border-border bg-card p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  2
                </span>
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  Add the experiences you love
                </h3>
                <span className="ml-auto rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {selectedAddOns.size} selected
                </span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {ADD_ONS.map((addon) => {
                  const selected = selectedAddOns.has(addon.name);
                  const Icon = ICONS[addon.icon] ?? Sparkles;
                  return (
                    <button
                      key={addon.name}
                      type="button"
                      onClick={() => toggleAddOn(addon.name)}
                      className={cn(
                        "group relative flex items-start gap-3 rounded-xl border p-4 text-left transition-all",
                        selected
                          ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                          : "border-border bg-background hover:border-primary/30 hover:shadow-sm"
                      )}
                      aria-pressed={selected}
                    >
                      <span
                        className={cn(
                          "grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors",
                          selected
                            ? "bg-primary text-primary-foreground"
                            : "bg-primary/10 text-primary group-hover:bg-primary/15"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-serif text-sm font-semibold text-foreground">
                            {addon.name}
                          </p>
                          {addon.popular && (
                            <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-amber-700">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {addon.description}
                        </p>
                        <p className="mt-2 text-xs font-medium text-primary">
                          from {formatZAR(addon.priceFrom)}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "absolute right-3 top-3 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-all",
                          selected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-transparent group-hover:border-primary/40"
                        )}
                      >
                        {selected ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3 w-3" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: live summary (sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 overflow-hidden rounded-2xl border-2 border-primary/30 bg-card shadow-lg">
              {/* Header */}
              <div className="barn-wood p-5 text-primary-foreground">
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-amber-300" />
                  <h3 className="font-serif text-lg font-semibold">Your estimate</h3>
                </div>
                <p className="mt-1 text-xs text-primary-foreground/80">
                  Indicative only — final quote confirmed on enquiry.
                </p>
              </div>

              {/* Body */}
              <div className="p-5">
                {/* Base package */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Base package
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">
                      {selectedPackageObj?.name}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {formatZAR(selectedPackageObj?.basePrice ?? 0)}
                  </p>
                </div>

                {/* Add-ons list */}
                {hasAddOns ? (
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Add-ons ({selectedAddOns.size})
                    </p>
                    <ul className="space-y-2">
                      {selectedAddOnObjs.map((a) => (
                        <li key={a.name} className="flex items-start justify-between gap-2 text-sm">
                          <div className="flex items-start gap-2">
                            <button
                              type="button"
                              onClick={() => toggleAddOn(a.name)}
                              aria-label={`Remove ${a.name}`}
                              className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Minus className="h-2.5 w-2.5" />
                            </button>
                            <span className="text-foreground/80">{a.name}</span>
                          </div>
                          <span className="text-foreground/70">{formatZAR(a.priceFrom)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="mt-4 rounded-lg border border-dashed border-border bg-muted/30 p-3 text-center text-xs text-muted-foreground">
                    <Sparkles className="mx-auto mb-1 h-4 w-4 text-primary/40" />
                    No add-ons yet. Tap any above.
                  </div>
                )}

                {/* Total */}
                <div className="mt-5 flex items-baseline justify-between border-t-2 border-border pt-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
                    Estimated total
                  </span>
                  <div className="text-right">
                    <p className="font-serif text-2xl font-semibold text-foreground">
                      {formatZAR(total)}
                    </p>
                    <p className="text-[10px] text-muted-foreground">starting from · incl. VAT</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 space-y-2">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Send to Marina on WhatsApp
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#enquiry"
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    Send as full enquiry
                  </a>
                  <button
                    type="button"
                    onClick={reset}
                    className="flex h-9 w-full items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset selection
                  </button>
                </div>

                <p className="mt-3 text-center text-[10px] text-muted-foreground">
                  Prices indicative. Final quote depends on date, guest count & duration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
