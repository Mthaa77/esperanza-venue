/**
 * Bundled copy of the seed content.
 *
 * Used by the homepage when the database is empty or unreachable (e.g. a serverless host such as
 * Vercel, where a SQLite file doesn't persist). `prisma/seed.ts` imports the same arrays, so the
 * seeded database and the fallback can never drift apart.
 */

export const SEED_TESTIMONIALS = [
  {
    name: "Google Reviewer",
    source: "Google",
    rating: 5,
    text: "We had the most incredible experience at Esperanza for our wedding. A very special thank you to Christa, Marinna, and their amazing team for making our dream wedding come true.",
    eventType: "Wedding",
    featured: true,
  },
  {
    name: "Gustav & Chané",
    source: "On-site",
    rating: 5,
    text: "Esperanza was the best decision we could possibly make with regards to our wedding day! ...We loved having horses apart of our special day, and Marina and Juan went out of their way to make our dream wedding become a reality.",
    eventType: "Wedding",
    featured: true,
  },
  {
    name: "Afrikaans Reviewer",
    source: "Google",
    rating: 5,
    text: "Esperanza is die perfekte venue vir 'n regte plaas troue... Die hoogte punt van die aand was die donkie wat die drinks bedien.",
    eventType: "Wedding",
    featured: false,
  },
  {
    name: "Google Reviewer",
    source: "Google",
    rating: 5,
    text: "My son had the best birthday party at Esperanza. Marcel and Juan was great with the kids and was very patient with them... My son said it was the best birthday party he has ever had!",
    eventType: "Kids Party",
    featured: false,
  },
];

/** priceFrom is stored in ZAR cents (integer) to avoid float issues. */
export const SEED_PACKAGES = [
  {
    name: "Self-Catering Hire",
    slug: "self-catering",
    description: "Bring your own caterer, alcohol and décor. Braai facilities on site.",
    priceFrom: 1800000, // R18,000.00
    features:
      "Bring your own caterer\nBring your own alcohol\nBraai facilities on site\nTwo dressing rooms included\nCeremony + reception venue",
    popular: false,
    order: 1,
  },
  {
    name: "Full-Service Package",
    slug: "full-service",
    description: "Venue arranges catering, entertainment and décor to your budget.",
    priceFrom: 4200000, // R42,000.00
    features:
      "In-house catering to budget\nDJ + live music arranged\nDonkey cocktail hour add-on\nTwo dressing rooms included\nForest / Dam / Stables chapel choice\nFull barn reception setup",
    popular: true,
    order: 2,
  },
  {
    name: "Birthday / Kids Party",
    slug: "kids-party",
    description: "Jumping castle, waterslide, trampoline, playground, animal interaction.",
    priceFrom: 650000, // R6,500.00
    features:
      "Jumping castle + waterslide\nTrampoline + playground\nFarm animal interaction\nOptional muddy obstacle course\nBraai facilities",
    popular: false,
    order: 3,
  },
];
