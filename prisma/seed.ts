import { db } from "@/lib/db";

async function main() {
  // Wipe existing rows so the seed is idempotent
  await db.testimonial.deleteMany();
  await db.package.deleteMany();

  // ----------------------------------------------------------------
  // Testimonials (real reviews sourced from the company profile)
  // ----------------------------------------------------------------
  await db.testimonial.createMany({
    data: [
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
    ],
  });

  // ----------------------------------------------------------------
  // Packages
  // priceFrom is stored in ZAR cents (integer) to avoid float issues.
  // ----------------------------------------------------------------
  await db.package.createMany({
    data: [
      {
        name: "Self-Catering Hire",
        slug: "self-catering",
        description:
          "Bring your own caterer, alcohol and décor. Braai facilities on site.",
        priceFrom: 1800000, // R18,000.00 in cents
        features:
          "Bring your own caterer\nBring your own alcohol\nBraai facilities on site\nTwo dressing rooms included\nCeremony + reception venue",
        popular: false,
        order: 1,
      },
      {
        name: "Full-Service Package",
        slug: "full-service",
        description:
          "Venue arranges catering, entertainment and décor to your budget.",
        priceFrom: 4200000, // R42,000.00 in cents
        features:
          "In-house catering to budget\nDJ + live music arranged\nDonkey cocktail hour add-on\nTwo dressing rooms included\nForest / Dam / Stables chapel choice\nFull barn reception setup",
        popular: true,
        order: 2,
      },
      {
        name: "Birthday / Kids Party",
        slug: "kids-party",
        description:
          "Jumping castle, waterslide, trampoline, playground, animal interaction.",
        priceFrom: 650000, // R6,500.00 in cents
        features:
          "Jumping castle + waterslide\nTrampoline + playground\nFarm animal interaction\nOptional muddy obstacle course\nBraai facilities",
        popular: false,
        order: 3,
      },
    ],
  });

  console.log("✓ Seed complete: 4 testimonials, 3 packages inserted");
}

main()
  .then(() => db.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await db.$disconnect();
    process.exit(1);
  });
