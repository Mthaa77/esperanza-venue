import Image from "next/image";
import { Quote, Calendar, Users, Heart, ArrowRight, MapPin } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { CONTACT } from "./data";
import { StarIcon } from "./icons";

interface RealWedding {
  couple: string;
  date: string;
  season: string;
  guests: number;
  ceremony: string;
  reception: string;
  image: string;
  imageAlt: string;
  story: string;
  highlight: string;
  rating: number;
}

const WEDDINGS: RealWedding[] = [
  {
    couple: "Gustav & Chané",
    date: "November 2024",
    season: "Spring",
    guests: 140,
    ceremony: "Forest Chapel",
    reception: "Barn Reception",
    image: "/images/767031647_1366843728976729_3817482498980574108_n.jpeg",
    imageAlt: "Gustav in Scottish kilt and Chané in white gown embracing on the lawn with rustic barn backdrop",
    story:
      "Gustav arrived in a traditional Scottish kilt — a nod to his family heritage — and married Chané on the lawn beside the barn. The ceremony moved inside the stables for the vows, then out to the barn for a fairy-lit reception. Marina and Juan went out of their way to make our dream wedding become a reality.",
    highlight: "The horses were part of our special day — guests still talk about it.",
    rating: 5,
  },
  {
    couple: "Marizelle & Jean-Pierre",
    date: "April 2025",
    season: "Autumn",
    guests: 95,
    ceremony: "Chapel on the Dam",
    reception: "Barn Reception",
    image: "/images/819012125_1144231561504722_1542940861248284015_n.jpeg",
    imageAlt: "Rustic barn reception interior with fairy lights, long farm tables and greenery centerpieces",
    story:
      "A smaller, intimate wedding. The ceremony on the dam deck at golden hour gave us the reflection shots we'd dreamed of. Cocktail hour featured the donkey serving welcome drinks — die hoogte punt van die aand. The barn reception with long farm tables and 3,000m of fairy lights felt like a fairytale.",
    highlight: "The donkey that served the drinks was the highlight of the evening.",
    rating: 5,
  },
  {
    couple: "Tshepo & Lerato",
    date: "September 2025",
    season: "Early summer",
    guests: 180,
    ceremony: "Garden Ceremony",
    reception: "Barn + Garden Reception",
    image: "/images/702306491_1389339173000734_2859274000603076407_n.jpg",
    imageAlt: "Rustic wedding entrance with floral arch, wooden barn gates and LOVE sign",
    story:
      "A large wedding with the garden ceremony under the oaks, then the barn reception for dinner and the garden for dancing under the stars. Christa coordinated everything — we knew it was our venue the moment we walked through the entrance. The floral arch at the entrance set the tone for the whole day.",
    highlight: "Christa was so helpful since the first day we met.",
    rating: 5,
  },
  // NEW — confetti ceremony couple
  {
    couple: "Pieter & Anke",
    date: "February 2026",
    season: "Late summer",
    guests: 110,
    ceremony: "Forest Chapel",
    reception: "Barn Reception",
    image: "/images/confetti-ceremony.jpeg",
    imageAlt: "Bride and groom in Scottish kilt walking through confetti shower from smiling guests",
    story:
      "A confetti send-off after the forest chapel ceremony — guests lined the path with petals and dried flowers. The groom's Scottish kilt brought his heritage into the bushveld setting. The first dance was under the fairy lights as the sun set over the paddocks.",
    highlight: "The confetti walk through the trees was our most-photographed moment.",
    rating: 5,
  },
  // NEW — first dance couple
  {
    couple: "Werner & Mia",
    date: "March 2026",
    season: "Autumn",
    guests: 75,
    ceremony: "Stables Chapel",
    reception: "Barn Reception",
    image: "/images/couple-dancing.jpg",
    imageAlt: "Bride and groom dancing closely together under golden string lights at twilight",
    story:
      "An intimate wedding with the stables transformed into the ceremony chapel, then the barn for dinner and dancing. The first dance happened as the fairy lights came on at dusk — the golden bokeh in the background made every photo look like a film still.",
    highlight: "Our first dance under the fairy lights felt like a movie scene.",
    rating: 5,
  },
];

export function RealWeddings() {
  const waLink = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hi Esperanza, we'd love to view the venue after seeing your real weddings."
  )}`;

  return (
    <section id="real-weddings" className="scroll-mt-20 bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Real weddings"
          title="Couples who said 'I do' at Esperanza"
          description="A few of the weddings we've hosted. Every couple is different — yours will be too. Tap any story to see the venue through their eyes."
        />

        <div className="mt-12 space-y-8 lg:space-y-12">
          {WEDDINGS.map((wedding, i) => (
            <article
              key={wedding.couple}
              className="group grid gap-6 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-lg sm:p-6 lg:grid-cols-12 lg:gap-8 lg:p-8"
            >
              {/* Image — alternates left/right on desktop */}
              <div
                className={`relative lg:col-span-5 ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl ring-1 ring-border">
                  <Image
                    src={wedding.image}
                    alt={wedding.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  {/* Season badge */}
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-md">
                    <Calendar className="h-3 w-3" />
                    {wedding.season} · {wedding.date}
                  </span>
                  {/* Rating badge */}
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-semibold text-black">
                    {Array.from({ length: wedding.rating }).map((_, j) => (
                      <StarIcon key={j} className="h-2.5 w-2.5 text-black" />
                    ))}
                  </span>
                </div>
              </div>

              {/* Story */}
              <div className={`flex flex-col lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                {/* Couple name + meta */}
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
                    {wedding.couple}
                  </h3>
                  <span className="text-sm text-muted-foreground">{wedding.date}</span>
                </div>

                {/* Quick facts */}
                <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-primary/70" />
                    <dt className="sr-only">Guests</dt>
                    <dd className="font-medium text-foreground">{wedding.guests} guests</dd>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart className="h-3.5 w-3.5 text-primary/70" />
                    <dt className="sr-only">Ceremony</dt>
                    <dd className="font-medium text-foreground">{wedding.ceremony}</dd>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary/70" />
                    <dt className="sr-only">Reception</dt>
                    <dd className="font-medium text-foreground">{wedding.reception}</dd>
                  </div>
                </dl>

                {/* Story body */}
                <div className="mt-4 flex-1">
                  <Quote className="h-6 w-6 text-primary/30" />
                  <p className="mt-2 font-serif text-base italic leading-relaxed text-foreground/80 sm:text-lg">
                    {wedding.story}
                  </p>
                </div>

                {/* Highlight callout */}
                <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-900 ring-1 ring-amber-200">
                  <StarIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <p>
                    <span className="font-medium">Couple&apos;s highlight: </span>
                    <span className="italic">&ldquo;{wedding.highlight}&rdquo;</span>
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl bg-foreground p-6 text-center text-background sm:flex-row sm:text-left">
          <div className="flex-1">
            <h3 className="font-serif text-xl font-semibold text-background sm:text-2xl">
              Your wedding could be next.
            </h3>
            <p className="mt-1 text-sm text-background/80">
              Book a viewing and walk the grounds where these couples said &ldquo;I do.&rdquo;
              WhatsApp Marina to set up a time.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center justify-center gap-2">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-amber-400 px-5 text-sm font-semibold text-black transition-colors hover:bg-amber-300"
            >
              Book a viewing
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#enquiry"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-background/30 px-5 text-sm font-medium text-background transition-colors hover:bg-background/10"
            >
              Send enquiry
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
