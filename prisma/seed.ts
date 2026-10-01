import { db } from "@/lib/db";
import { SEED_PACKAGES, SEED_TESTIMONIALS } from "@/lib/fallback-data";

async function main() {
  // Wipe existing rows so the seed is idempotent
  await db.testimonial.deleteMany();
  await db.package.deleteMany();

  // ----------------------------------------------------------------
  // Testimonials (real reviews sourced from the company profile)
  // ----------------------------------------------------------------
  await db.testimonial.createMany({ data: SEED_TESTIMONIALS });

  // priceFrom is stored in ZAR cents (integer) to avoid float issues.
  await db.package.createMany({ data: SEED_PACKAGES });

  console.log("✓ Seed complete: 4 testimonials, 3 packages inserted");
}

main()
  .then(() => db.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await db.$disconnect();
    process.exit(1);
  });
