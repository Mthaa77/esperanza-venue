"use client";

import { useState, useMemo } from "react";
import { Check, X, Minus, Table2, X as CloseIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Package } from "./packages";

interface FormattedPackage extends Package {
  priceDisplay: string;
  featuresList: string[];
}

/**
 * Side-by-side feature comparison table for the packages section.
 * Derives the comparison rows from the union of all package features.
 * Accepts an optional `mode` prop so the price column stays in sync with the
 * weekday/weekend pricing toggle in the parent Packages component.
 */
export function PackageComparison({ packages, mode = "weekday" }: { packages: Package[]; mode?: "weekday" | "weekend" }) {
  const [open, setOpen] = useState(false);

  const WEEKEND_PREMIUM = 0.25;

  const formatted: FormattedPackage[] = useMemo(
    () =>
      packages.map((p) => {
        const adjusted = Math.round(p.priceFrom * (mode === "weekend" ? 1 + WEEKEND_PREMIUM : 1));
        return {
          ...p,
          priceDisplay: `R${(adjusted / 100).toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
          featuresList: p.features.split("\n").filter(Boolean),
        };
      }),
    [packages, mode]
  );

  // Build a normalized feature matrix: each row = a feature, columns = packages
  const { rows, allFeatures } = useMemo(() => {
    const all = new Set<string>();
    formatted.forEach((p) => p.featuresList.forEach((f) => all.add(normalize(f))));
    const allFeatures = Array.from(all).sort();
    // For each package, build a set of normalized features for O(1) lookup
    const rows = allFeatures.map((feature) => ({
      feature,
      // For each package, did they include this feature (by normalized match)?
      cells: formatted.map((p) => {
        const set = new Set(p.featuresList.map(normalize));
        return set.has(feature);
      }),
    }));
    return { rows, allFeatures };
  }, [formatted]);

  if (formatted.length === 0) return null;

  return (
    <>
      {/* Toggle button */}
      <div className="mt-6 flex justify-center">
        <Button
          type="button"
          variant="outline"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full"
          aria-expanded={open}
          aria-controls="package-comparison-table"
        >
          <Table2 className="h-4 w-4" />
          {open ? "Hide comparison" : "Compare packages side-by-side"}
        </Button>
      </div>

      {/* Comparison table */}
      {open && (
        <div
          id="package-comparison-table"
          className="mt-6 animate-float-up overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
        >
          {/* Desktop / tablet table */}
          <div className="hidden sm:block">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th
                    scope="col"
                    className="sticky left-0 z-10 w-2/5 bg-muted/50 p-4 text-left text-xs font-semibold uppercase tracking-wider text-foreground/70"
                  >
                    Feature
                  </th>
                  {formatted.map((p) => (
                    <th
                      key={p.id}
                      scope="col"
                      className={cn(
                        "p-4 text-center align-bottom",
                        p.popular && "bg-primary/5"
                      )}
                    >
                      {p.popular && (
                        <span className="mb-1 inline-block rounded-full bg-primary px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary-foreground">
                          Popular
                        </span>
                      )}
                      <span className="block font-serif text-base font-semibold text-foreground">
                        {p.name}
                      </span>
                      <span className="mt-0.5 block text-xs font-medium text-primary">
                        {p.priceDisplay}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={cn(
                      "border-b border-border/60 transition-colors hover:bg-muted/30",
                      i % 2 === 1 && "bg-muted/20"
                    )}
                  >
                    <th
                      scope="row"
                      className="sticky left-0 z-10 w-2/5 bg-card p-4 text-left text-xs font-medium text-foreground/80"
                    >
                      {row.feature}
                    </th>
                    {row.cells.map((included, j) => (
                      <td
                        key={j}
                        className={cn(
                          "p-4 text-center",
                          formatted[j].popular && "bg-primary/5"
                        )}
                      >
                        {included ? (
                          <Check
                            className="mx-auto h-5 w-5 text-emerald-600"
                            aria-label="Included"
                          />
                        ) : (
                          <Minus
                            className="mx-auto h-4 w-4 text-muted-foreground/40"
                            aria-label="Not included"
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                {/* Footer row with CTA */}
                <tr className="border-t-2 border-border bg-muted/50">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-muted/50 p-4 text-left text-xs font-semibold uppercase tracking-wider text-foreground/70"
                  >
                    Choose
                  </th>
                  {formatted.map((p) => (
                    <td
                      key={p.id}
                      className={cn("p-4 text-center", p.popular && "bg-primary/5")}
                    >
                      <a
                        href="#enquiry"
                        className={cn(
                          "inline-flex h-9 items-center justify-center rounded-full px-4 text-xs font-medium transition-colors",
                          p.popular
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "border border-primary/30 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground"
                        )}
                      >
                        Select
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile stacked cards (table is hard to read on narrow screens) */}
          <div className="divide-y divide-border sm:hidden">
            {formatted.map((p) => (
              <div key={p.id} className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-base font-semibold text-foreground">
                        {p.name}
                      </h3>
                      {p.popular && (
                        <span className="rounded-full bg-primary px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary-foreground">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-primary">{p.priceDisplay}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {allFeatures.map((feature) => {
                    const set = new Set(p.featuresList.map(normalize));
                    const included = set.has(feature);
                    return (
                      <li key={feature} className="flex items-center gap-2.5 text-sm">
                        {included ? (
                          <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                        ) : (
                          <X className="h-4 w-4 shrink-0 text-muted-foreground/40" />
                        )}
                        <span className={included ? "text-foreground/80" : "text-muted-foreground/60 line-through"}>
                          {feature}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <a
                  href="#enquiry"
                  className={cn(
                    "mt-4 flex h-10 w-full items-center justify-center rounded-full text-sm font-medium transition-colors",
                    p.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-primary/30 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground"
                  )}
                >
                  Select {p.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

/** Normalize a feature string for matching: trim, lowercase, remove trailing punctuation */
function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/[.]+$/, "");
}

/* Keep X import used (mobile view) */
void CloseIcon;
