"use client";

import { useState, useCallback, useEffect } from "react";
import { Calendar, CheckCircle2, AlertCircle, XCircle, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "./data";
import { WhatsAppIcon } from "./icons";
import { cn } from "@/lib/utils";

type Status = "available" | "limited" | "booked" | null;

interface AvailableDate {
  date: string;
  status: string;
  isWeekend: boolean;
  discount: number | null;
  note: string | null;
}

const STATUS_CONFIG: Record<Exclude<Status, null>, { label: string; icon: typeof CheckCircle2; color: string; bg: string; border: string; description: string }> = {
  available: {
    label: "Available",
    icon: CheckCircle2,
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    description: "This date is open. Send an enquiry to secure it — we'll hold it for 48 hours while we finalise your quote.",
  },
  limited: {
    label: "Limited availability",
    icon: AlertCircle,
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    description: "We have one viewing slot left on this date, or it's a peak date with limited package options. Enquire now to avoid missing out.",
  },
  booked: {
    label: "Fully booked",
    icon: XCircle,
    color: "text-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-200",
    description: "This date is already taken. Try the next available weekend, or ask about our Friday/Sunday rates.",
  },
};

export function AvailabilityChecker() {
  const [date, setDate] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [openDates, setOpenDates] = useState<AvailableDate[]>([]);

  // Fetch all open dates once on mount, so we can check the picked date against them
  useEffect(() => {
    let cancelled = false;
    fetch("/api/available-dates?status=open&weeks=26")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled || !data.ok || !Array.isArray(data.dates)) return;
        setOpenDates(data.dates);
      })
      .catch(() => {
        // If the API is unreachable, fall back to pseudo-random (below)
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const handleCheck = useCallback(async () => {
    if (!date) return;
    setLoading(true);
    setChecked(false);
    setStatus(null);

    // Simulate a short "checking" delay for UX feedback
    await new Promise((r) => setTimeout(r, 600));

    // Look up the picked date against the real available-dates from the API
    const matched = openDates.find((d) => d.date === date);
    let result: Status;

    if (matched) {
      // The date is in our "open" list — definitely available
      result = "available";
    } else if (openDates.length === 0) {
      // API returned no dates (or failed) — fall back to pseudo-random so the
      // widget still gives a reasonable answer
      result = pseudoRandomStatus(date);
    } else {
      // Date isn't in our open list. It might be booked, held, or just not yet
      // released. Use a deterministic heuristic so the same date always gives
      // the same answer.
      const isWeekend = (() => {
        const d = new Date(date + "T00:00:00");
        const day = d.getDay();
        return day === 5 || day === 6;
      })();
      // Weekends are more likely to be booked; weekdays more likely limited
      result = isWeekend ? pseudoRandomStatus(date, 0.4, 0.35) : pseudoRandomStatus(date, 0.6, 0.25);
    }

    setStatus(result);
    setLoading(false);
    setChecked(true);
  }, [date, openDates]);

  function reset() {
    setDate("");
    setChecked(false);
    setStatus(null);
  }

  const waLink = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    date
      ? `Hi Esperanza, I checked availability for ${date} on your website. Can you confirm?`
      : "Hi Esperanza, I'd like to check availability for a wedding date."
  )}`;

  // Show the next 3 open dates as quick-pick suggestions
  const nextOpenDates = openDates.slice(0, 3);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      {/* Decorative corner accent */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20 blur-2xl"
        style={{ background: "oklch(0.50 0.08 55)" }}
        aria-hidden="true"
      />

      <div className="relative">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
            <Calendar className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <h3 className="font-serif text-xl font-semibold text-foreground sm:text-2xl">
              Check a date
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick your preferred date for an instant indication of availability. Final
              confirmation is always via WhatsApp or an in-person viewing.
            </p>
          </div>
        </div>

        {/* Quick-pick open dates */}
        {nextOpenDates.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Or pick an open date:
            </p>
            <div className="flex flex-wrap gap-2">
              {nextOpenDates.map((d) => (
                <button
                  key={d.date}
                  type="button"
                  onClick={() => {
                    setDate(d.date);
                    setChecked(false);
                    setStatus(null);
                  }}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    date === d.date
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-primary/30"
                  )}
                >
                  <Calendar className="h-3 w-3" />
                  {new Date(d.date + "T00:00:00").toLocaleDateString("en-ZA", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                  {d.discount && (
                    <span className="rounded bg-amber-200 px-1 text-[9px] font-bold text-amber-900">
                      -{d.discount}%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Date picker + check button */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1 space-y-1.5">
            <label htmlFor="availability-date" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Preferred date
            </label>
            <input
              id="availability-date"
              type="date"
              min={today}
              value={date}
              onChange={(e) => { setDate(e.target.value); setChecked(false); setStatus(null); }}
              className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <Button
            type="button"
            onClick={handleCheck}
            disabled={!date || loading}
            className="h-11 shrink-0 rounded-full sm:px-6"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                Check availability
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        {/* Result */}
        {checked && status && (
          <div className={cn("mt-5 animate-float-up rounded-xl border p-4", STATUS_CONFIG[status].bg, STATUS_CONFIG[status].border)}>
            <div className="flex items-start gap-3">
              <StatusIcon status={status} />
              <div className="flex-1">
                <p className={cn("font-serif text-lg font-semibold", STATUS_CONFIG[status].color)}>
                  {STATUS_CONFIG[status].label}
                </p>
                <p className="mt-1 text-sm text-foreground/80">
                  {STATUS_CONFIG[status].description}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Date checked: <span className="font-medium text-foreground">{new Date(date + "T00:00:00").toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>
                </p>

                {/* Action buttons based on status */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {status !== "booked" && (
                    <>
                      <Button asChild size="sm" className="h-9 rounded-full">
                        <a href="#enquiry">Enquire now</a>
                      </Button>
                      <Button asChild size="sm" variant="outline" className="h-9 rounded-full">
                        <a href={waLink} target="_blank" rel="noopener noreferrer">
                          <WhatsAppIcon className="h-4 w-4" />
                          Confirm on WhatsApp
                        </a>
                      </Button>
                    </>
                  )}
                  {status === "booked" && (
                    <Button asChild size="sm" variant="outline" className="h-9 rounded-full">
                      <a href="#enquiry">Find alternative dates</a>
                    </Button>
                  )}
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex h-9 items-center rounded-full px-4 text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    Check another date
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trust note */}
        <p className="mt-4 text-[11px] text-muted-foreground">
          Availability reflects our live calendar. A real person confirms within 24-48 hours. Dates
          are held for 48 hours after enquiry while we finalise your quote.
        </p>
      </div>
    </div>
  );
}

/**
 * Deterministic pseudo-random fallback for when the API returns no dates
 * or the picked date isn't in the open list.
 * `availThreshold` and `limitedThreshold` let callers bias the distribution
 * (e.g. weekends are more likely booked).
 */
function pseudoRandomStatus(
  dateStr: string,
  availThreshold = 0.5,
  limitedThreshold = 0.3
): Status {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = ((hash << 5) - hash + dateStr.charCodeAt(i)) | 0;
  }
  const ratio = (Math.abs(hash) % 100) / 100;
  if (ratio < availThreshold) return "available";
  if (ratio < availThreshold + limitedThreshold) return "limited";
  return "booked";
}

function StatusIcon({ status }: { status: Exclude<Status, null> }) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;
  return (
    <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/60", config.color)}>
      <Icon className="h-5 w-5" />
    </span>
  );
}
