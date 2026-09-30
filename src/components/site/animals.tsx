import Image from "next/image";
import {
  Wine,
  PawPrint,
  Sparkles,
  Dog,
  Quote,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { ANIMALS } from "./data";
import { HorseIcon, CartIcon, RiderIcon, RidingIcon } from "./icons";

type IconType = typeof Wine;
const ICONS: Record<string, IconType> = {
  wine: Wine,
  horse: HorseIcon as unknown as IconType,
  paw: PawPrint,
  rider: RiderIcon as unknown as IconType,
  cart: CartIcon as unknown as IconType,
  riding: RidingIcon as unknown as IconType,
  dog: Dog,
};

export function Animals() {
  return (
    <section id="animals" className="relative scroll-mt-20 overflow-hidden bg-foreground py-20 text-background sm:py-28">
      {/* Subtle texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, oklch(0.78 0.13 75 / 0.4) 0, transparent 40%), radial-gradient(circle at 80% 80%, oklch(0.42 0.09 145 / 0.4) 0, transparent 40%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-amber-300">
            <span className="h-px w-8 bg-amber-300/40" />
            The signature
            <span className="h-px w-8 bg-amber-300/40" />
          </p>
          <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-background text-balance sm:text-4xl lg:text-5xl">
            Animals are the difference
          </h2>
          <p className="mt-4 text-base leading-relaxed text-background/95 sm:text-lg text-balance">
            Most rustic venues have a farm aesthetic. Esperanza has a working farm — with horses,
            donkeys, cows, calves, sheep and free-roaming peacocks that your guests will actually
            meet. Below is what makes the day unforgettable.
          </p>
          <p className="mt-3 font-serif text-lg italic text-amber-300/90">
            &ldquo;Die diere is die verskil — want hier bedien die donkies self die drankies.&rdquo;
          </p>
        </div>

        {/* Highlight feature */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src="/images/donkey-drinks.png"
              alt="Donkey carrying a tray of welcome drinks during cocktail hour"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 p-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-black">
                <Sparkles className="h-3 w-3" />
                Most photographed
              </span>
              <h3 className="mt-3 font-serif text-2xl font-semibold text-white">
                Donkey-served cocktail hour
              </h3>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl border border-background/20 bg-background/10 p-6 backdrop-blur-sm sm:p-8">
            <Quote className="h-8 w-8 text-amber-300" />
            <blockquote className="mt-3 font-serif text-xl italic leading-relaxed text-background sm:text-2xl">
              Esperanza is die perfekte venue vir &apos;n regte plaas troue... Die hoogte punt van
              die aand was die donkie wat die drinks bedien.
            </blockquote>
            <p className="mt-4 text-sm text-background/80">
              — Afrikaans-language Google review
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-background/20 pt-6 text-sm">
              <div>
                <p className="font-medium text-background">Flower-collared</p>
                <p className="text-background/80">donkeys dressed for the day</p>
              </div>
              <div>
                <p className="font-medium text-background">Tray of welcome drinks</p>
                <p className="text-background/80">or canapés, weather permitting</p>
              </div>
            </div>
          </div>
        </div>

        {/* Other animal experiences grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ANIMALS.slice(1).map((animal) => {
            const Icon = ICONS[animal.icon] ?? PawPrint;
            return (
              <article
                key={animal.title}
                className="group flex gap-4 rounded-xl border border-background/20 bg-background/10 p-5 backdrop-blur-sm transition-all hover:border-amber-300/50 hover:bg-background/15"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-amber-300/15 text-amber-300 transition-colors group-hover:bg-amber-300 group-hover:text-black">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-serif text-base font-semibold text-background">
                    {animal.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-background/85">
                    {animal.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-background/80">
            Pet-friendly venue · Well-behaved dogs on lead welcome in the wedding party.
          </p>
          <a
            href="#enquiry"
            className="shrink-0 rounded-full bg-amber-400 px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-amber-300"
          >
            Add animals to my day
          </a>
        </div>
      </div>
    </section>
  );
}
