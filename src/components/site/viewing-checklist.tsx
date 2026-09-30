"use client";

import { ClipboardList, Check, HelpCircle, MapPin, Camera, Users, Printer } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { CONTACT } from "./data";
import { WhatsAppIcon } from "./icons";

const CHECKLIST_ITEMS = [
  {
    category: "Venue & space",
    items: [
      "Walk all four ceremony settings (forest, dam, stables, garden) — imagine your guests in each.",
      "Check the barn reception capacity against your guest count (seats up to 200).",
      "Visit the dressing rooms (Honeybee, Horse, Donkey, River, Hen's Nest) — where will your party get ready?",
      "Ask about the rain backup plan — what happens if the forest chapel can't be used?",
      "Walk the 3-minute path from ceremony to reception — is it accessible for elderly guests?",
    ],
  },
  {
    category: "Logistics & timing",
    items: [
      "Confirm the hire window — what time can vendors arrive, and what's the hard end time?",
      "Ask about noise restrictions — is there a curfew for live music?",
      "Check the bar setup — cash bar, consumption bar, or open bar? What's the corkage fee?",
      "Confirm parking — how many cars can the venue hold? Is there secure overnight parking?",
      "Ask about power — are there enough outlets for a DJ, lighting, and catering equipment?",
    ],
  },
  {
    category: "Animals & experiences",
    items: [
      "Meet the donkey who'll serve drinks — confirm availability for your date.",
      "Ask about the horseback entrance — rider availability, weight limit, and rehearsal.",
      "Check which farm animals will be on-site — are the peacocks free-roaming year-round?",
      "Ask about pony/horse rides for guests — age limits, duration, and supervision.",
      "Confirm the pet-friendly policy if you plan to bring your dog.",
    ],
  },
  {
    category: "Catering & bar",
    items: [
      "Self-catering? Ask about braai facilities, kitchen access, and vendor power.",
      "Full-service? Ask to see a sample menu and confirm the caterer works to your budget.",
      "Confirm alcohol rules — bring your own, or via the on-site bar? Corkage fees?",
      "Ask about the snack bar (Welcome Drinks, Juice Box, Gin & Cocktails).",
      "Confirm table settings — are banquet tables, chairs, and linens included?",
    ],
  },
  {
    category: "Questions to ask Marina/Christa",
    items: [
      "What's included in the standard hire vs. what costs extra?",
      "Is my date provisional or confirmed? How long is it held?",
      "What's the deposit structure and payment schedule?",
      "Which outside vendors have you worked with before (photographers, florists)?",
      "Can you share 2-3 recent couple references I could message?",
    ],
  },
];

const QUICK_TIPS = [
  {
    icon: MapPin,
    title: "Bring a charged phone",
    body: "Mobile signal is poor on the farm. Download directions offline and bring a power bank.",
  },
  {
    icon: Camera,
    title: "Take photos of everything",
    body: "You'll compare venues later — photograph each ceremony setting, the barn, and the dressing rooms.",
  },
  {
    icon: Users,
    title: "Bring your decision-makers",
    body: "Both partners, plus anyone contributing financially or helping plan. One viewing is usually enough.",
  },
];

export function ViewingChecklist() {
  const waLink = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hi Esperanza, I'd like to book a viewing. What dates do you have available in the next 2-3 weeks?"
  )}`;

  function handlePrint() {
    window.print();
  }

  return (
    <section id="viewing-checklist" className="scroll-mt-20 bg-background py-20 sm:py-28 print:py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Before you visit"
            title="Your viewing checklist"
            description="A viewing is the single most important step. Print this or save it to your phone — these are the questions and things to look for when you walk the property with Marina or Christa."
          />
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium text-foreground shadow-sm transition-all hover:border-primary/30 hover:text-primary print:hidden"
          >
            <Printer className="h-4 w-4" />
            Print this checklist
          </button>
        </div>

        {/* Quick tips */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {QUICK_TIPS.map((tip) => (
            <div
              key={tip.title}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <tip.icon className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{tip.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{tip.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Checklist categories */}
        <div className="mt-10 space-y-6">
          {CHECKLIST_ITEMS.map((cat, idx) => (
            <div
              key={cat.category}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              <div className="flex items-center gap-3 border-b border-border bg-muted/40 px-5 py-3 sm:px-6">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {idx + 1}
                </span>
                <h3 className="font-serif text-base font-semibold text-foreground sm:text-lg">
                  {cat.category}
                </h3>
                <span className="ml-auto text-xs text-muted-foreground">
                  {cat.items.length} items
                </span>
              </div>
              <ul className="divide-y divide-border/60">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 px-5 py-3 sm:px-6 sm:py-3.5">
                    <span
                      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded border-2 border-muted-foreground/30 text-transparent transition-colors hover:border-primary"
                      aria-hidden="true"
                    >
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-sm leading-relaxed text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-border bg-muted/40 p-6 text-center sm:flex-row sm:text-left">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
            <ClipboardList className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <h3 className="font-serif text-lg font-semibold text-foreground">
              Ready to book a viewing?
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Viewings are by appointment only and take 45-60 minutes. WhatsApp Marina to set up a
              time that suits you both.
            </p>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Book a viewing
          </a>
        </div>

        {/* Helper note */}
        <p className="mt-6 flex items-start gap-2 text-center text-xs text-muted-foreground">
          <HelpCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span className="mx-auto max-w-2xl text-left">
            Don&apos;t worry if you forget to ask something during the viewing — Marina and Christa
            are both on WhatsApp and happy to answer follow-up questions afterwards.
          </span>
        </p>
      </div>
    </section>
  );
}
