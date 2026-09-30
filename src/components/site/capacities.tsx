import { Users, Ruler, CloudRain, Car, Music, Accessibility } from "lucide-react";
import { SectionHeading } from "./section-heading";

interface SpecRow {
  setting: string;
  capacity: string;
  type: string;
  backup: string;
}

const SPECS: SpecRow[] = [
  {
    setting: "Forest Chapel",
    capacity: "Up to 180",
    type: "Outdoor · riverside",
    backup: "Stables chapel",
  },
  {
    setting: "Chapel on the Dam",
    capacity: "Up to 120",
    type: "Outdoor · over water",
    backup: "Stables chapel",
  },
  {
    setting: "Stables Chapel",
    capacity: "Up to 80",
    type: "Covered · all-weather",
    backup: "— (primary backup)",
  },
  {
    setting: "Garden Ceremony",
    capacity: "Up to 200+",
    type: "Outdoor · lawn",
    backup: "Stables chapel",
  },
  {
    setting: "Barn Reception",
    capacity: "Up to 200 seated",
    type: "Covered · barn",
    backup: "— (all-weather)",
  },
  {
    setting: "Garden Reception",
    capacity: "Up to 300+",
    type: "Outdoor · with marquee",
    backup: "Barn reception",
  },
];

const QUICK_FACTS = [
  { icon: Car, label: "On-site parking", value: "Yes, ample" },
  { icon: Music, label: "Sound system", value: "Built-in" },
  { icon: Accessibility, label: "Wheelchair access", value: "Barn + ground-floor rooms" },
  { icon: CloudRain, label: "Rain backup", value: "Stables chapel (covered)" },
];

export function Capacities() {
  return (
    <section id="capacities" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="At a glance"
          title="Capacities & specs"
          description="The quick reference couples ask for when comparing venues. All capacities are seated dinner unless noted; standing cocktail is higher."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          {/* Capacities table — spans 3 cols on desktop */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:col-span-3">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th scope="col" className="p-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground/70 sm:p-4">
                      Setting
                    </th>
                    <th scope="col" className="p-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground/70 sm:p-4">
                      <span className="inline-flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        Capacity
                      </span>
                    </th>
                    <th scope="col" className="hidden p-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground/70 sm:table-cell sm:p-4">
                      Type
                    </th>
                    <th scope="col" className="hidden p-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground/70 sm:table-cell sm:p-4">
                      Rain backup
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SPECS.map((row, i) => (
                    <tr
                      key={row.setting}
                      className={`border-b border-border/60 transition-colors hover:bg-muted/30 ${i % 2 === 1 ? "bg-muted/20" : ""}`}
                    >
                      <th scope="row" className="p-3 text-left font-medium text-foreground sm:p-4">
                        {row.setting}
                      </th>
                      <td className="p-3 text-foreground/80 sm:p-4">
                        <span className="inline-flex items-center gap-1.5">
                          <Ruler className="h-3.5 w-3.5 text-primary/60" />
                          {row.capacity}
                        </span>
                      </td>
                      <td className="hidden p-3 text-muted-foreground sm:table-cell sm:p-4">
                        {row.type}
                      </td>
                      <td className="hidden p-3 text-muted-foreground sm:table-cell sm:p-4">
                        {row.backup}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="border-t border-border bg-muted/30 px-4 py-2.5 text-[11px] text-muted-foreground">
              Capacities are seated-dinner. Standing cocktail allows ~30% more. Marquee available for larger garden receptions.
            </p>
          </div>

          {/* Quick facts — spans 2 cols on desktop */}
          <div className="space-y-3 lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground/70">
                Quick facts
              </h3>
              <ul className="space-y-3">
                {QUICK_FACTS.map((fact) => (
                  <li key={fact.label} className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                      <fact.icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                        {fact.label}
                      </p>
                      <p className="text-sm font-medium text-foreground">{fact.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dressing rooms count */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground/70">
                Dressing rooms
              </h3>
              <div className="flex items-baseline gap-2">
                <p className="font-serif text-3xl font-semibold text-foreground">5</p>
                <p className="text-sm text-muted-foreground">on-site rooms</p>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                2 included in standard hire · 3 add-on · 2 coming soon
              </p>
              <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Honeybee, Horse, Donkey, River, Hen&apos;s Nest
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  River Cabin No. 1 + Stallion Cottage (coming soon)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
