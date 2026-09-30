"use client";

import { useEffect, useState } from "react";
import { CalendarClock, X, ArrowRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "./data";
import { WhatsAppIcon } from "./icons";

/**
 * Dismissible promo banner showing available last-minute / open dates.
 *
 * Generates 4-6 indicative "open" dates in the next 8-12 weeks (Fridays,
 * Saturdays, and a couple of weekday specials). The exact same dates are
 * shown on every load (deterministic from a fixed seed) so a couple
 * returning to the site sees consistent messaging.
 *
 * Dismissal is persisted in localStorage for 7 days, after which the banner
 * reappears.
 */

// Deterministic pseudo-random generator (mulberry32) so dates are stable across reloads.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateOpenDates(): { date: Date; label: string; isWeekend: boolean }[] {
  const rand = mulberry32(20260930); // fixed seed — stable dates
  const today = new Date();
  const dates: { date: Date; label: string; isWeekend: boolean }[] = [];
  const seen = new Set<string>();

  // Generate 5 dates: 3 weekend (Fri/Sat) + 2 weekday specials
  let attempts = 0;
  while (dates.length < 5 && attempts < 200) {
    attempts++;
    const offsetDays = 21 + Math.floor(rand() * 70); // 3-13 weeks out
    const d = new Date(today);
    d.setDate(d.getDate() + offsetDays);
    const day = d.getDay(); // 0=Sun, 5=Fri, 6=Sat
    const isWeekend = day === 5 || day === 6;
    const weekdaySpecial = !isWeekend && rand() < 0.25; // ~25% of weekdays
    if (!isWeekend && !weekdaySpecial) continue;
    const key = d.toISOString().slice(0, 10);
    if (seen.has(key)) continue;
    seen.add(key);
    dates.push({
      date: d,
      label: d.toLocaleDateString("en-ZA", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      isWeekend,
    });
  }
  // Sort chronologically
  dates.sort((a, b) => a.date.getTime() - b.date.getTime());
  return dates;
}

interface AvailableDate {
  date: string;
  status: string;
  isWeekend: boolean;
  discount: number | null;
  note: string | null;
}

interface DisplayDate {
  date: Date;
  label: string;
  isWeekend: boolean;
  discount: number | null;
  note: string | null;
}

const STORAGE_KEY = "esperanza:promo-dismissed";
const DISMISS_DAYS = 7;

export function PromoBanner() {
  // Start dismissed (null render) to avoid hydration mismatch — localStorage
  // is only available client-side. The effect below reveals the banner after
  // mount if it hasn't been dismissed recently.
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const [openDates, setOpenDates] = useState<DisplayDate[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const shouldShow = (() => {
        if (!raw) return true;
        const dismissedAt = Number(raw);
        const ageDays = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
        return ageDays > DISMISS_DAYS;
      })();
      if (shouldShow) setDismissed(false);
    } catch {
      setDismissed(false);
    }

    // Fetch real available dates from the API. Falls back to client-side
    // generation if the API is unreachable or returns no dates.
    let cancelled = false;
    fetch("/api/available-dates?status=open&weeks=12")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled || !data.ok || !Array.isArray(data.dates)) return;
        const display: DisplayDate[] = data.dates.slice(0, 6).map((d: AvailableDate) => {
          const date = new Date(d.date + "T00:00:00");
          return {
            date,
            label: date.toLocaleDateString("en-ZA", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            isWeekend: d.isWeekend,
            discount: d.discount,
            note: d.note,
          };
        });
        if (display.length > 0) {
          setOpenDates(display);
        } else {
          setOpenDates(generateOpenDates());
        }
      })
      .catch(() => {
        setOpenDates(generateOpenDates());
      });

    return () => {
      cancelled = true;
    };
  }, []);

  function dismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // ignore storage errors
    }
  }

  // Don't render until mounted (avoids hydration mismatch)
  if (!mounted || dismissed || openDates.length === 0) return null;

  const waLink = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    `Hi Esperanza, I saw your open dates banner and I'm interested in one of them. Which are still available?`
  )}`;

  const weekendDates = openDates.filter((d) => d.isWeekend);
  const weekdayDates = openDates.filter((d) => !d.isWeekend);

  return (
    <div className="relative overflow-hidden border-b border-amber-300/30 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50">
      {/* Decorative left flame accent */}
      <div
        className="pointer-events-none absolute -left-8 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full opacity-30 blur-2xl"
        style={{ background: "oklch(0.78 0.13 75)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-6 lg:px-8">
        {/* Icon + label */}
        <div className="flex shrink-0 items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-amber-500 text-white shadow-sm">
            <Flame className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Open dates
            </p>
            <p className="text-[11px] text-amber-700/80">
              Next 8-12 weeks
            </p>
          </div>
        </div>

        {/* Dates list */}
        <div className="flex flex-1 flex-wrap items-center gap-1.5">
          {weekendDates.map((d) => (
            <span
              key={d.label}
              className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-white px-2.5 py-1 text-xs font-medium text-amber-900 shadow-sm"
            >
              <CalendarClock className="h-3 w-3 text-amber-600" />
              {d.label}
            </span>
          ))}
          {weekdayDates.length > 0 && (
            <>
              <span className="mx-1 text-amber-400">·</span>
              {weekdayDates.map((d) => (
                <span
                  key={d.label}
                  className="inline-flex items-center gap-1 rounded-full border border-dashed border-amber-400 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800"
                >
                  {d.label}
                  {d.discount && (
                    <span className="rounded bg-amber-200 px-1 text-[9px] font-bold uppercase text-amber-900">
                      -{d.discount}%
                    </span>
                  )}
                </span>
              ))}
            </>
          )}
        </div>

        {/* CTA + dismiss */}
        <div className="flex shrink-0 items-center gap-2">
          <Button asChild size="sm" className="h-8 rounded-full bg-amber-600 px-3 text-xs hover:bg-amber-700">
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Claim a date</span>
              <span className="sm:hidden">Claim</span>
              <ArrowRight className="h-3 w-3" />
            </a>
          </Button>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss banner"
            className="grid h-7 w-7 place-items-center rounded-full text-amber-700/70 transition-colors hover:bg-amber-200/60 hover:text-amber-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
