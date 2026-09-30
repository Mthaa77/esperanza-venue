"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircleQuestion, ChevronDown } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { CONTACT } from "./data";
import { WhatsAppIcon } from "./icons";
import { Button } from "@/components/ui/button";

interface Faq {
  q: string;
  a: string;
  category: "Pricing" | "Logistics" | "Animals" | "Venue";
}

const FAQS: Faq[] = [
  {
    category: "Pricing",
    q: "How much does a wedding at Esperanza cost?",
    a: "Our packages start from R6,500 for a kids' party, R18,000 for self-catering wedding hire, and R42,000 for a full-service wedding package. Final pricing depends on the date (peak vs off-peak), guest count, and which add-ons you choose (donkey cocktail hour, live band, horseback entrance, etc.). Every enquiry gets a written quote — no surprises.",
  },
  {
    category: "Pricing",
    q: "Can we bring our own caterer and alcohol?",
    a: "Yes — that's exactly what the self-catering package is for. Bring your own caterer, your own alcohol, and even your own décor. We have braai facilities on site and a liquor licence for the bar. The full-service package is the alternative if you'd rather we handle catering to your budget.",
  },
  {
    category: "Pricing",
    q: "Is there a deposit, and how do we pay?",
    a: "Yes — a booking deposit secures your date. We accept EFT (preferred) and can arrange card payment. The balance is typically split into instalments leading up to the day. We'll confirm the exact structure in your written quote.",
  },
  {
    category: "Logistics",
    q: "How many guests can the venue hold?",
    a: "The barn reception seats up to 200 guests comfortably. For larger weddings, we can extend into the garden reception area with a marquee. The forest chapel and dam chapel are best for ceremonies up to 180 guests; the stables chapel suits intimate ceremonies up to 80.",
  },
  {
    category: "Logistics",
    q: "Do you have on-site accommodation?",
    a: "Yes — five dressing rooms / cabins are included: Honeybee Cottage, Horse Room, Donkey Room, River Cabin, and Hen's Nest. Two dressing rooms are included in standard venue hire; the others can be added. Two further units (River Cabin No. 1 and Stallion Cottage) are coming soon.",
  },
  {
    category: "Logistics",
    q: "Why is WhatsApp the best way to contact you?",
    a: "Mobile signal on the farm is poor for voice calls — WhatsApp is reliable and lets us share photos, pin locations, and answer quickly. Marina (076 857 6886) and Christa (076 259 5633) both monitor WhatsApp. Viewings are by appointment only, and we'll send you a pin location to find the property.",
  },
  {
    category: "Logistics",
    q: "What happens if it rains on the day?",
    a: "The barn reception is fully covered, so your reception is safe regardless of weather. For ceremonies, the stables chapel is our all-weather backup — a working horse stable transformed with white draping and fairy lights. The forest and dam chapels are outdoor, so we monitor the forecast and can move the ceremony indoors if needed.",
  },
  {
    category: "Animals",
    q: "Can the donkey really serve drinks at our wedding?",
    a: "Yes — this is our signature moment. A donkey in a flower collar carries a wooden tray of welcome drinks and canapés through your guests during the cocktail hour. It's the single most photographed and most talked-about moment of the day. Weather permitting, subject to the donkey's mood on the day.",
  },
  {
    category: "Animals",
    q: "Can the bride arrive on horseback?",
    a: "Yes. The bride (or groom) can be walked down the aisle on horseback, or arrive at the ceremony via donkey cart. This is an add-on subject to rider and horse availability — book early. Our riding-school staff handle the horse throughout.",
  },
  {
    category: "Animals",
    q: "Are we allowed to bring our dog to the wedding?",
    a: "Absolutely — Esperanza is a pet-friendly venue. Well-behaved dogs on lead are welcome as part of the wedding party (ring-bearer duties, family photos, the works). We'll happily coordinate meet-and-greets with our farm dogs too.",
  },
  {
    category: "Venue",
    q: "What's included in standard venue hire?",
    a: "Two dressing rooms, banquet tables and chairs, fairy-light installation, braai facilities, the on-site bar and snack bar, farm animal interaction, multiple photo locations, ample parking, a built-in sound system, power and backup lighting, ceremony seating, and ladies' and gents' ablutions. See the 'What comes with the day' section above for the full list.",
  },
  {
    category: "Venue",
    q: "Do you arrange the DJ and entertainment, or do we source that?",
    a: "We can do either. We book and coordinate DJs, live bands, classical/rock/Afrikaans/Latin/opera singers, donkey-served cocktail hours, donkey and pony cart rides, horseback entrances, lasso/roping demonstrations, and boeresport games ourselves — so the day stays cohesive. Or bring your own; we'll coordinate with outside vendors.",
  },
];

const CATEGORIES = ["All", "Pricing", "Logistics", "Animals", "Venue"] as const;

export function Faq() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const filtered = category === "All" ? FAQS : FAQS.filter((f) => f.category === category);

  const waLink = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hi Esperanza, I have a question that isn't answered on the website."
  )}`;

  return (
    <section id="faq" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Frequently asked"
          title="Questions couples ask us"
          description="The most common questions we get over WhatsApp and at viewings. If yours isn't here, just message us — we reply within 24-48 hours."
        />

        {/* Category filter */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={
                "inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium transition-colors " +
                (category === cat
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground/70 hover:border-primary/30 hover:text-foreground")
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ accordion */}
        <div className="mt-10">
          <Accordion type="single" collapsible className="space-y-3">
            {filtered.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`item-${i}`}
                className="overflow-hidden rounded-xl border border-border bg-card px-5 shadow-sm transition-colors data-[state=open]:border-primary/30 data-[state=open]:shadow-md"
              >
                <AccordionTrigger className="hover:no-underline">
                  <span className="flex items-start gap-3 text-left">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                      <HelpCircle className="h-3.5 w-3.5" />
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="font-serif text-base font-medium text-foreground sm:text-lg">
                        {faq.q}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/70">
                        {faq.category}
                      </span>
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-9 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Still have questions CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-border bg-muted/40 p-6 text-center sm:flex-row sm:text-left">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
            <MessageCircleQuestion className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <h3 className="font-serif text-lg font-semibold text-foreground">
              Still have a question?
            </h3>
            <p className="text-sm text-muted-foreground">
              WhatsApp Marina or Christa — we&apos;re happy to answer anything, no matter how small.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button asChild className="rounded-full">
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp us
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <a href="#enquiry">
                Send an enquiry
                <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* FAQPage JSON-LD structured data — enables Google rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.a,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
