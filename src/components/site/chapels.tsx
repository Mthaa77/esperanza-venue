import Image from "next/image";
import { TreePine, Waves, Warehouse } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { CHAPELS } from "./data";
import { HorseIcon as Horse } from "./icons";

const ACCENT_STYLES: Record<string, { ring: string; badge: string; icon: typeof TreePine }> = {
  forest: {
    ring: "ring-emerald-200/60 hover:ring-emerald-400/70",
    badge: "bg-emerald-100/90 text-emerald-800",
    icon: TreePine,
  },
  gold: {
    ring: "ring-amber-200/60 hover:ring-amber-400/70",
    badge: "bg-amber-100/90 text-amber-800",
    icon: Waves,
  },
  barn: {
    ring: "ring-orange-200/60 hover:ring-orange-400/70",
    badge: "bg-orange-100/90 text-orange-800",
    icon: Warehouse,
  },
};

export function Chapels() {
  return (
    <section id="chapels" className="scroll-mt-20 bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Choose your ceremony"
          title="Four chapels, one property"
          description="Forest, dam, stables or garden — pick the setting that fits your day. Couples can enter on horseback, or arrive via donkey cart. All chapels are within easy walking distance of the barn reception."
        />
        <p className="mx-auto mt-3 max-w-3xl text-center font-serif text-base italic text-amber-700/70">
          &ldquo;Kies jou plek — woud, dam, stalle of tuin. Elke hoek van die plaas vertel &apos;n storie.&rdquo;
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CHAPELS.map((chapel) => {
            const style = ACCENT_STYLES[chapel.accent] ?? ACCENT_STYLES.forest;
            const Icon = style.icon;
            return (
              <article
                key={chapel.name}
                className={`group flex flex-col overflow-hidden rounded-2xl bg-card shadow-sm ring-1 transition-all hover:-translate-y-1 hover:shadow-xl ${style.ring}`}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={chapel.image}
                    alt={chapel.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-4 pt-14">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${style.badge}`}
                    >
                      <Icon className="h-3 w-3" />
                      {chapel.tagline}
                    </span>
                    <h3 className="mt-2 font-serif text-xl font-semibold text-white drop-shadow-sm">
                      {chapel.name}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {chapel.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {chapel.features.map((f) => (
                      <li
                        key={f}
                        className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-foreground/70"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        {/* Entrance callout */}
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 text-center sm:flex-row sm:text-left">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
            <Horse className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <h3 className="font-serif text-lg font-semibold text-foreground">
              Arrive on horseback, or by donkey cart
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              The bride can be walked down the aisle on horseback, or the couple can arrive at the
              ceremony via donkey cart. A signature Esperanza moment — add-on, subject to rider
              availability.
            </p>
          </div>
          <a
            href="#enquiry"
            className="shrink-0 rounded-full border border-primary/30 bg-primary/5 px-5 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Ask about it
          </a>
        </div>
      </div>
    </section>
  );
}
