import Image from "next/image";
import { Lightbulb, Trees, Flower, Sparkles, ArrowRight, Warehouse, Images, Users, Ruler } from "lucide-react";
import { SectionHeading } from "./section-heading";

const RECEPTION_OPTIONS = [
  {
    icon: Warehouse,
    title: "Barn-style reception",
    body: "Our main barn venue, strung with fairy lights and exposed bulbs. Long farm tables, brick-and-wood walls, a stage built for the band.",
  },
  {
    icon: Trees,
    title: "Woodland reception",
    body: "Tables set amongst the trees with lights strung overhead — for couples who want to dance under the stars.",
  },
  {
    icon: Flower,
    title: "Garden reception",
    body: "Outdoor garden reception on the lawn beside the barn — pairs with a marquee for summer evenings.",
  },
];

const SPECS = [
  { icon: Users, label: "Seats up to", value: "200 guests" },
  { icon: Ruler, label: "Reception area", value: "320 m² barn" },
  { icon: Lightbulb, label: "Fairy lights", value: "3,000 m strung" },
];

export function BarnVenue() {
  return (
    <section id="barn" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Image side */}
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-border">
              <Image
                src="/images/754066387_1582196683552068_5524149596110241383_n.jpeg"
                alt="Rustic barn reception venue at twilight with fairy-lit pergola"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Gradient scrim for the badge contrast */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent" aria-hidden="true" />

              {/* "View gallery" photo-count badge — top-left, no longer overlapping */}
              <a
                href="#gallery"
                aria-label="View 12 photos in the gallery"
                className="group absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md ring-1 ring-white/20 transition-all hover:bg-black/75 hover:ring-white/40"
              >
                <Images className="h-3.5 w-3.5" />
                <span>12 photos</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Specs strip — BELOW the image, no longer floating/overlapping */}
            <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl border border-border bg-card p-3 shadow-sm sm:gap-3 sm:p-4">
              {SPECS.map((spec) => (
                <div key={spec.label} className="flex flex-col items-center gap-1.5 text-center sm:flex-row sm:gap-2.5 sm:text-left">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber-100 text-amber-700">
                    <spec.icon className="h-4 w-4" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground sm:text-[10px]">
                      {spec.label}
                    </p>
                    <p className="font-serif text-xs font-semibold text-foreground sm:text-sm">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Copy side */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="The Barn Venue"
              title="Barn reception, strung with fairy lights"
              description="A working horse barn transformed into a warm reception venue — exposed wood, brick walls, thousands of fairy lights and a stage built for live music. Seats up to 200 guests."
            />
            <p className="mt-3 font-serif text-base italic text-amber-700/70">
              &ldquo;ŉ Skuur vol feëliggies — waar die musiek speel en die stories gebore word.&rdquo;
            </p>

            <div className="mt-8 space-y-4">
              {RECEPTION_OPTIONS.map((opt) => (
                <div
                  key={opt.title}
                  className="group flex gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <opt.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-serif text-base font-semibold text-foreground">
                      {opt.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {opt.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-lg bg-primary/5 p-3 text-sm text-primary">
              <Sparkles className="h-4 w-4 shrink-0" />
              <p>
                The barn pairs with any of our four ceremony settings. Couples can move from
                forest chapel to barn reception in a 3-minute walk.
              </p>
            </div>

            <a
              href="#enquiry"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
            >
              Check a date
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
