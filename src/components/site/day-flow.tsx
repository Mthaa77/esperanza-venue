import { Clock, Sun, Sparkles, Wine, Moon, Heart, ArrowRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { CONTACT } from "./data";
import { WhatsAppIcon } from "./icons";

interface TimelineStep {
  time: string;
  title: string;
  description: string;
  icon: typeof Sun;
  accent: "morning" | "midday" | "golden" | "dusk" | "night";
}

const TIMELINE: TimelineStep[] = [
  {
    time: "09:00",
    title: "Bridal prep — Honeybee Cottage",
    description:
      "Hair, makeup and champagne in the largest of our dressing rooms. Bride + bridesmaids get ready together, with the Hen's Nest upstairs for the photographer.",
    icon: Sun,
    accent: "morning",
  },
  {
    time: "13:00",
    title: "Groom's party — Horse Room",
    description:
      "Groom and groomsmen get ready in the Horse Room next to the stables. Quirky riding memorabilia on the walls makes a great photo backdrop.",
    icon: Sun,
    accent: "morning",
  },
  {
    time: "14:30",
    title: "Guests arrive",
    description:
      "Cars directed to on-site parking. Welcome drinks are served at the snack bar — sometimes by donkey, weather permitting. Guests can meet the farm animals.",
    icon: Wine,
    accent: "midday",
  },
  {
    time: "15:30",
    title: "Ceremony — Forest Chapel",
    description:
      "Couple married under the trees by the river. 3-minute walk from the barn. Bride arrives on horseback or via donkey cart (optional add-on).",
    icon: Heart,
    accent: "midday",
  },
  {
    time: "16:30",
    title: "Cocktail hour + canapés",
    description:
      "Guests mingle with welcome drinks and canapés while the couple takes photos with the horses. Donkey cart shuttles older guests to the reception.",
    icon: Sparkles,
    accent: "golden",
  },
  {
    time: "17:30",
    title: "Golden-hour couple shoot",
    description:
      "Our 3rd-most-photographed moment: the couple with the horses and farm animals in the warm evening light. Photographer works the paddocks and stables.",
    icon: Sun,
    accent: "golden",
  },
  {
    time: "18:00",
    title: "Reception — the Barn",
    description:
      "Guests seated at long farm tables under 3,000m of fairy lights. First dance on the stage built for live music. Speeches, dinner, toasts.",
    icon: Moon,
    accent: "dusk",
  },
  {
    time: "20:00",
    title: "DJ + live music",
    description:
      "DJ takes over from the band. Floor opens. Bar stays open with craft gin and cocktails, or guests drift outside to the fairy-lit garden for air.",
    icon: Moon,
    accent: "night",
  },
  {
    time: "23:00",
    title: "Last dance + send-off",
    description:
      "Sparkler send-off (or lanterns, weather permitting). Couple retreats to the River Cabin; close family can stay in our on-site dressing rooms.",
    icon: Moon,
    accent: "night",
  },
];

const ACCENT_STYLES: Record<TimelineStep["accent"], { dot: string; line: string; ring: string }> = {
  morning: {
    dot: "bg-amber-100 text-amber-700 ring-amber-200",
    line: "bg-amber-200/60",
    ring: "ring-amber-200/60",
  },
  midday: {
    dot: "bg-emerald-100 text-emerald-700 ring-emerald-200",
    line: "bg-emerald-200/60",
    ring: "ring-emerald-200/60",
  },
  golden: {
    dot: "bg-orange-100 text-orange-700 ring-orange-200",
    line: "bg-orange-200/60",
    ring: "ring-orange-200/60",
  },
  dusk: {
    dot: "bg-violet-100 text-violet-700 ring-violet-200",
    line: "bg-violet-200/60",
    ring: "ring-violet-200/60",
  },
  night: {
    dot: "bg-slate-200 text-slate-700 ring-slate-300",
    line: "bg-slate-300/60",
    ring: "ring-slate-300/60",
  },
};

export function DayFlow() {
  const waLink = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hi Esperanza, I'd love to talk through how a wedding day flows at the farm."
  )}`;

  return (
    <section id="day-flow" className="scroll-mt-20 bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="A day at Esperanza"
          title="How your wedding day flows"
          description="From bridal prep at 9am to the last dance at 11pm — a typical timeline for a full-day hire. Every wedding is different; we'll shape the day to yours."
        />
        <p className="mx-auto mt-3 max-w-3xl text-center font-serif text-base italic text-amber-700/70">
          &ldquo;Van die oggendkoffie tot die laaste dans — jou dag, jou storie.&rdquo;
        </p>

        {/* Timeline */}
        <ol className="relative mt-12 space-y-6 sm:space-y-8">
          {/* Vertical connecting line (desktop) */}
          <div
            className="pointer-events-none absolute left-[1.125rem] top-2 bottom-2 w-px bg-gradient-to-b from-amber-200/40 via-emerald-200/40 to-slate-300/40 sm:left-6"
            aria-hidden="true"
          />

          {TIMELINE.map((step, i) => {
            const styles = ACCENT_STYLES[step.accent];
            const Icon = step.icon;
            return (
              <li
                key={step.time}
                className="group relative flex gap-4 sm:gap-6"
              >
                {/* Dot + time */}
                <div className="relative z-10 flex flex-col items-center">
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-full ring-4 ring-background ${styles.dot} transition-transform group-hover:scale-110`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="mt-1.5 hidden font-mono text-[10px] font-medium text-muted-foreground sm:block">
                    {step.time}
                  </span>
                </div>

                {/* Content card */}
                <div className={`flex-1 rounded-xl border bg-card p-4 shadow-sm ring-1 transition-all group-hover:-translate-y-0.5 group-hover:shadow-md sm:p-5 ${styles.ring}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      {/* Mobile time chip */}
                      <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:hidden">
                        <Clock className="h-2.5 w-2.5" />
                        {step.time}
                      </span>
                      <h3 className="font-serif text-base font-semibold text-foreground sm:text-lg">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                    <span className="hidden shrink-0 font-mono text-xs font-medium text-muted-foreground sm:block">
                      #{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 text-center sm:flex-row sm:text-left">
          <div className="flex-1">
            <h3 className="font-serif text-lg font-semibold text-foreground">
              Want to shape this timeline to your day?
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Every wedding is different. Tell us your must-haves and we&apos;ll build a custom
              schedule around them.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center justify-center gap-2">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Plan my day
            </a>
            <a
              href="#enquiry"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Send enquiry
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
