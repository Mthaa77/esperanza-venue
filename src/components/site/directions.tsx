import { Navigation, Plane, Building2, Car, TreePine, AlertTriangle, Check } from "lucide-react";

const DIRECTIONS = [
  {
    step: 1,
    text: "From Pretoria CBD, take the N4 east (Witbank Highway) for ~22 km.",
  },
  {
    step: 2,
    text: "Take the R515 (Mooiplaats / Boschkop) off-ramp and turn right towards Mooiplaats.",
  },
  {
    step: 3,
    text: "Continue for ~6 km on the R515 until you reach the Mooiplaats smallholdings area.",
  },
  {
    step: 4,
    text: "Turn onto Volstruis Street (look for the small white Esperanza sign at the junction).",
  },
  {
    step: 5,
    text: "Continue on the dirt road for ~800 m. The farm entrance is on your left, marked by wooden post-and-rail fencing and a green horse gate.",
  },
  {
    step: 6,
    text: "Drive in slowly — horses, donkeys and peacocks roam freely. Park in the designated area to your right, just past the stables.",
  },
];

const LANDMARKS = [
  {
    icon: Plane,
    label: "OR Tambo Intl. Airport",
    detail: "~75 km · 55 min drive",
    note: "Joburg / international flights",
  },
  {
    icon: Plane,
    label: "Wonderboom Airport",
    detail: "~35 km · 30 min drive",
    note: "Pretoria regional — private flights",
  },
  {
    icon: Building2,
    label: "Pretoria CBD",
    detail: "~30 km · 30 min drive",
    note: "Nearest major city centre",
  },
  {
    icon: Building2,
    label: "Silverton / Meyerspark shops",
    detail: "~12 km · 12 min drive",
    note: "Last stop for supplies / fuel",
  },
  {
    icon: TreePine,
    label: "Rietvlei Nature Reserve",
    detail: "~18 km · 20 min drive",
    note: "Nearest accommodation & game viewing",
  },
  {
    icon: Car,
    label: "Pienaars River",
    detail: "On the property",
    note: "Forest chapel sits on its banks",
  },
];

export function Directions() {
  return (
    <div className="space-y-6">
      {/* Turn-by-turn directions */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
            <Navigation className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-serif text-base font-semibold text-foreground sm:text-lg">
              Finding the farm
            </h3>
            <p className="text-xs text-muted-foreground">
              Sat-nav can be misleading in Mooiplaats — follow these landmarks instead.
            </p>
          </div>
        </div>

        <ol className="mt-5 space-y-3">
          {DIRECTIONS.map((dir) => (
            <li key={dir.step} className="flex items-start gap-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                {dir.step}
              </span>
              <p className="pt-0.5 text-sm leading-relaxed text-foreground/80">{dir.text}</p>
            </li>
          ))}
        </ol>

        {/* Pin warning */}
        <div className="mt-5 flex items-start gap-2.5 rounded-lg bg-amber-50 p-3 ring-1 ring-amber-200">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <div>
            <p className="text-sm font-medium text-amber-900">
              Send a WhatsApp for the exact pin location
            </p>
            <p className="text-xs text-amber-800/80">
              Google Maps sometimes drops the pin on the wrong plot in the smallholdings. We&apos;ll
              send you a precise WhatsApp location pin before your viewing.
            </p>
          </div>
        </div>
      </div>

      {/* Nearest landmarks */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <h3 className="font-serif text-base font-semibold text-foreground sm:text-lg">
          Nearby landmarks
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          For out-of-town guests planning travel and accommodation.
        </p>

        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {LANDMARKS.map((lm) => (
            <li
              key={lm.label}
              className="flex items-start gap-3 rounded-lg border border-border/60 bg-background p-3 transition-colors hover:border-primary/30"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <lm.icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{lm.label}</p>
                <p className="text-xs font-medium text-primary">{lm.detail}</p>
                <p className="text-[11px] text-muted-foreground">{lm.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* What to expect at arrival */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <h3 className="font-serif text-base font-semibold text-foreground sm:text-lg">
          When you arrive
        </h3>
        <ul className="mt-3 space-y-2">
          {[
            "Drive in slowly — animals and children may be on the road.",
            "Park in the designated area beside the stables (follow the signs).",
            "Marina or Christa will meet you at the barn reception entrance.",
            "Wear flat shoes — parts of the property are grass and dirt paths.",
            "Allow 45-60 minutes for a full viewing of all ceremony + reception settings.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span className="text-foreground/80">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
