import Image from "next/image";
import { Wine, CupSoda, GlassWater, ArrowRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { SNACKBAR } from "./data";
import { SHARED_BLUR_DATA_URL } from "./blur-placeholder";

const ICONS: Record<string, typeof Wine> = {
  champagne: Wine,
  juice: CupSoda,
  gin: GlassWater,
};

export function Snackbar() {
  return (
    <section id="snackbar" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Snack bar & refreshments"
          title="Three bars, every guest covered"
          description="Welcome Drinks, The Juice Box (non-alcoholic) and a craft Gin & Cocktails menu — so teetotallers, kids and serious cocktail drinkers are all looked after. Bars work to your budget: cash, consumption or open."
        />

        {/* Premium feature photo — wine tasting setup */}
        <div className="mt-10 mb-10 grid gap-6 lg:grid-cols-5 lg:items-stretch">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-border lg:col-span-3 lg:aspect-auto">
            <Image
              src="/images/wine-tasting.jpeg"
              alt="Rustic wine tasting setup with sage green linens, red wine glasses, magenta flowers and eucalyptus garlands"
              fill
              placeholder="blur"
              blurDataURL={SHARED_BLUR_DATA_URL}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              Wine tasting · sage linens · eucalyptus garlands
            </span>
          </div>
          <div className="flex flex-col justify-center rounded-2xl border border-border bg-muted/40 p-6 lg:col-span-2 sm:p-8">
            <h3 className="font-serif text-xl font-semibold text-foreground sm:text-2xl">
              Styled to your theme
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Our bar team styles the tables to match your wedding palette — sage linens, eucalyptus
              garlands, magenta blooms, or whatever your florist brings. Every glass is polished,
              every table is dressed.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-foreground/80">
              <li className="flex items-center gap-2">
                <Wine className="h-4 w-4 text-primary" />
                Craft gin shelf + signature botanical cocktails
              </li>
              <li className="flex items-center gap-2">
                <CupSoda className="h-4 w-4 text-primary" />
                Cold-pressed juices + DIY spritzer station
              </li>
              <li className="flex items-center gap-2">
                <GlassWater className="h-4 w-4 text-primary" />
                Welcome-drink trays (sometimes delivered by donkey)
              </li>
            </ul>
            <a
              href="#enquiry"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
            >
              Style my bar
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {SNACKBAR.map((bar) => {
            const Icon = ICONS[bar.icon] ?? Wine;
            return (
              <article
                key={bar.name}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-7 w-7" />
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {bar.tagline}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-2xl font-semibold text-foreground">
                  {bar.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {bar.description}
                </p>
                <a
                  href="#enquiry"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
                >
                  Include this bar
                  <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            );
          })}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted-foreground">
          Self-catering couples can bring their own alcohol; full-service couples can have the bar
          open for guests on consumption or set amount. We hold a liquor licence.
        </p>
      </div>
    </section>
  );
}
