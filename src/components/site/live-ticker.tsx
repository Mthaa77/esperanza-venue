"use client";

import { useEffect, useMemo, useState } from "react";
import { Star, Users, MapPin, Calendar, Heart, Sparkles, Wine, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CONTACT } from "./data";

/**
 * Ticker — scrolling marquee bar under the hero.
 * Upgrades: pauses on hover/focus, respects reduced motion (becomes a static wrapped list),
 * decorative duplicate is hidden from screen readers, open dates link to the availability checker.
 */
interface TickerItem {
  icon?: LucideIcon;
  text: string;
  href?: string;
  serif?: boolean;
}

const BASE_ITEMS: TickerItem[] = [
  { icon: Star, text: `${CONTACT.stats.rating}★ on Google · ${CONTACT.stats.reviewCount} reviews` },
  { icon: Users, text: `${CONTACT.stats.fbLikes.toLocaleString("en-US")}+ Facebook likes` },
  { icon: MapPin, text: "Pretoria East · Gauteng · on the Pienaars River" },
  { icon: Sparkles, text: "Donkeys serve the welcome drinks · yes, really" },
  { icon: Truck, text: "Arrive on horseback or by donkey cart" },
  { icon: Wine, text: "Craft gin shelf + botanical cocktails" },
  { icon: Heart, text: "Pet-friendly venue · bring your dog" },
  { icon: Calendar, text: "Viewings by appointment · WhatsApp preferred" },
  { text: "ŉ Troue met 'n verskil — waar die plaas die fees is", serif: true },
  { text: "Self-katering of vol-diens · bekostigbaar", serif: true },
  { text: "Four chapels · one booking · forest, dam, stables, garden" },
  { text: "Seats up to 200 guests · 3,000m of fairy lights" },
];

interface OpenDate {
  date: string;
  discount: number | null;
}

function TickerRow({ items, hidden }: { items: TickerItem[]; hidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-10 pr-10"
      aria-hidden={hidden ? "true" : undefined}
    >
      {items.map((item, i) => {
        const Icon = item.icon;
        const inner = (
          <>
            {Icon && <Icon className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />}
            <span className={item.serif ? "font-serif italic text-amber-200/80" : ""}>
              {item.text}
            </span>
          </>
        );
        return (
          <li key={i} className="inline-flex items-center gap-10 whitespace-nowrap">
            {item.href ? (
              <a
                href={item.href}
                tabIndex={hidden ? -1 : undefined}
                className="inline-flex items-center gap-2 rounded text-sm font-medium text-amber-100 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                {inner}
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 text-sm font-medium text-amber-100/85">
                {inner}
              </span>
            )}
            <span className="text-amber-500/40" aria-hidden="true">
              ✦
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function LiveTicker() {
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/available-dates?status=open&weeks=8", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok && Array.isArray(data.dates)) {
          const formatted = (data.dates as OpenDate[]).slice(0, 4).map((d) => {
            const date = new Date(d.date + "T00:00:00");
            return (
              date.toLocaleDateString("en-ZA", { weekday: "short", day: "numeric", month: "short" }) +
              (d.discount ? ` -${d.discount}%` : "")
            );
          });
          if (formatted.length > 0) setDates(formatted);
        }
      })
      .catch(() => {
        /* ticker works fine without live dates */
      });
    return () => controller.abort();
  }, []);

  const items = useMemo<TickerItem[]>(() => {
    // Open dates go FIRST — they're the only live, conversion-relevant item in the bar.
    const live: TickerItem[] =
      dates.length > 0
        ? [{ icon: Calendar, text: `Open dates: ${dates.join(" · ")}`, href: "#availability" }]
        : [];
    return [...live, ...BASE_ITEMS];
  }, [dates]);

  return (
    <div
      className="marquee-pausable relative overflow-hidden border-y border-amber-400/20 bg-deep-forest py-3"
      role="region"
      aria-label="Venue highlights"
    >
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[oklch(0.20_0.03_50)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[oklch(0.20_0.03_50)] to-transparent" />

      {/* Two identical rows => seamless -50% loop. Second row is decorative only. */}
      <div className="flex w-max animate-marquee items-center motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-2">
        <TickerRow items={items} />
        <div className="motion-reduce:hidden">
          <TickerRow items={items} hidden />
        </div>
      </div>
    </div>
  );
}
