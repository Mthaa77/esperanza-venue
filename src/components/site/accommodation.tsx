import Image from "next/image";
import { DoorOpen, Users, Clock, Sparkles } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { ACCOMMODATION, COMING_SOON_ROOMS } from "./data";
import { SHARED_BLUR_DATA_URL } from "./blur-placeholder";

export function Accommodation() {
  return (
    <section id="accommodation" className="scroll-mt-20 bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Dressing rooms & accommodation"
          title="Five rooms, each with character"
          description="Two dressing rooms are included in standard venue hire — for the bride and groom's party. Three further on-site cabins give families a place to sleep, change and breathe — no need to drive off the farm after dark."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ACCOMMODATION.map((room) => (
            <article
              key={room.name}
              className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  placeholder="blur"
                  blurDataURL={SHARED_BLUR_DATA_URL}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute left-3 top-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-background/95 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-foreground shadow-sm">
                    {room.type}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-serif text-lg font-semibold text-foreground">{room.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {room.description}
                </p>
                <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    Sleeps {room.sleeps}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <DoorOpen className="h-3.5 w-3.5" />
                    On-site
                  </span>
                </div>
              </div>
            </article>
          ))}

          {/* Coming soon card */}
          <article className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-background/50 p-6 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-amber-100 text-amber-700">
              <Clock className="h-6 w-6" />
            </span>
            <h3 className="font-serif text-base font-semibold text-foreground">Coming soon</h3>
            <p className="text-sm text-muted-foreground">
              Two additional accommodation units in development:
            </p>
            <ul className="flex flex-wrap justify-center gap-2">
              {COMING_SOON_ROOMS.map((r) => (
                <li
                  key={r}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] text-foreground/80"
                >
                  <Sparkles className="h-3 w-3 text-amber-600" />
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[11px] text-muted-foreground/70">
              Ask about availability during enquiry
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
