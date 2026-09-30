import {
  DoorOpen,
  Table,
  Lightbulb,
  Flame,
  Wine,
  PawPrint,
  Camera,
  Car,
  Music,
  Zap,
  Armchair,
  Bath,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { INCLUDED } from "./data";

const ICONS: Record<string, typeof DoorOpen> = {
  door: DoorOpen,
  table: Table,
  lights: Lightbulb,
  flame: Flame,
  bar: Wine,
  paw: PawPrint,
  camera: Camera,
  car: Car,
  music: Music,
  power: Zap,
  chair: Armchair,
  toilet: Bath,
};

export function Included() {
  return (
    <section id="included" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Included in venue hire"
          title="What comes with the day"
          description="No hidden extras on the basics. Two dressing rooms, the ceremony setup, the barn reception, fairy lights, braai facilities and the farm — all part of every hire."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {INCLUDED.map((item) => {
            const Icon = ICONS[item.icon] ?? DoorOpen;
            return (
              <div
                key={item.label}
                className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          Need something you don&apos;t see here? We&apos;ve arranged everything from mobile cold
          rooms to petting zoos to fireworks. Ask us — we&apos;ll tell you straight whether it&apos;s
          possible.
        </p>
      </div>
    </section>
  );
}
