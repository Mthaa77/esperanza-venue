import Image from "next/image";
import { Leaf, Wallet, MapPinned } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { HorseIcon as Horse } from "./icons";

const VALUE_PROPS = [
  {
    icon: Wallet,
    title: "Affordable & flexible",
    body:
      "Self-catering or full-service. Bring your own caterer, alcohol and décor, or let us quote to your budget. No expensive vendor lock-in.",
  },
  {
    icon: Leaf,
    title: "A genuine working farm",
    body:
      "Not a manicured formal venue. Real stables, real paddocks, real dust — the kind of countryside character a city venue can only fake.",
  },
  {
    icon: Horse,
    title: "Animals are the signature",
    body:
      "Horses, donkeys, cows, calves, sheep and peacocks walk the property. Donkeys serve your welcome drinks. Horses carry the bride down the aisle.",
  },
  {
    icon: MapPinned,
    title: "Multiple settings, one booking",
    body:
      "Forest, dam, stables and garden — all four ceremony settings on one property. Pair any ceremony with any reception. No venue-hopping.",
  },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About Esperanza"
          title="A working farm, not a manicured venue"
          description="Esperanza is a working equestrian farm and horse riding school (Show Jumping, Dressage and Western lessons) on the banks of the Pienaars River in Mooiplaats, Pretoria East — converted into a multi-purpose event venue that has kept its farm soul."
        />
        <p className="mx-auto mt-3 max-w-3xl text-center font-serif text-lg italic text-amber-700/80">
          &ldquo;ŉ Regte plaas met &apos;n regte hart — waar jou troue deel word van die storie.&rdquo;
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-center">
          {/* Image collage — premium upgrade with floral-arch + barn + horses */}
          <div className="relative aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5]">
            {/* Main: floral-arch couple (premium boho-luxe) */}
            <div className="absolute left-0 top-0 h-3/4 w-3/4 overflow-hidden rounded-2xl shadow-xl ring-1 ring-border">
              <Image
                src="/images/collage-floral-arch.jpg"
                alt="Couple under floral arch of pampas grass and white blooms — bohemian-luxe wedding"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 75vw, 30vw"
                priority
              />
            </div>
            {/* Inset: horses (working-farm character) */}
            <div className="absolute bottom-0 right-0 h-3/5 w-3/5 overflow-hidden rounded-2xl border-4 border-background shadow-xl ring-1 ring-border">
              <Image
                src="/images/horses.png"
                alt="Brown horses in a green paddock on the equestrian farm"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 60vw, 24vw"
              />
            </div>
            <div className="absolute bottom-4 left-4 rounded-full bg-primary px-4 py-2 text-xs font-medium uppercase tracking-wider text-primary-foreground shadow-lg">
              Real horses. Real farm.
            </div>
          </div>

          {/* Copy + value props */}
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-foreground/80 sm:text-lg">
              The property offers a forest chapel by the river, a barn-style reception venue
              strung with fairy lights, and a working farm setting with horses, donkeys, cows,
              calves, sheep and peacocks that guests can interact with and be photographed
              alongside.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              Beyond weddings, the same property hosts year-end and corporate functions, team
              building, birthday parties, Christmas parties and children&apos;s parties. One farm,
              many venues — and the team handles catering, music and entertainment so couples
              don&apos;t have to source multiple vendors.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {VALUE_PROPS.map((vp) => (
                <div
                  key={vp.title}
                  className="group rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
                      <vp.icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-serif text-base font-semibold text-foreground">{vp.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{vp.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
