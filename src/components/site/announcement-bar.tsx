import { StarIcon } from "./icons";
import { CONTACT } from "./data";

export function AnnouncementBar() {
  const items = [
    `Viewings by appointment`,
    `WhatsApp ${CONTACT.phoneMarina}`,
    `${CONTACT.stats.rating}★ on Google (${CONTACT.stats.reviewCount} reviews)`,
    `Pretoria East, Gauteng`,
    `Donkeys serve the drinks. Yes, really.`,
    `Pet-friendly venue`,
    `Self-catering or full-service`,
  ];
  const doubled = [...items, ...items];

  return (
    <div
      className="barn-wood text-primary-foreground"
      role="complementary"
      aria-label="Venue highlights"
    >
      <div className="relative flex items-center gap-3 overflow-hidden px-3 py-2 text-[11px] sm:px-6 sm:text-sm">
        {/* Static brand chip — always visible */}
        <div className="flex shrink-0 items-center gap-2 pr-3 font-medium sm:pr-4">
          <StarIcon className="h-3.5 w-3.5 shrink-0 text-amber-300" />
          <span className="hidden sm:inline">Esperanza</span>
        </div>

        {/* Marquee track — clipped, never causes body overflow */}
        <div
          className="relative min-w-0 flex-1 overflow-hidden"
          aria-hidden="true"
        >
          <div className="flex w-max animate-marquee items-center gap-6 whitespace-nowrap sm:gap-8">
            {doubled.map((item, i) => (
              <span key={i} className="text-primary-foreground/90">
                <span className="mr-2 text-amber-300">✦</span>
                {item}
              </span>
            ))}
          </div>
          {/* Fade edges so text doesn't appear to "cut" abruptly */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[oklch(0.40_0.06_50)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[oklch(0.40_0.06_50)] to-transparent" />
        </div>
      </div>
    </div>
  );
}
