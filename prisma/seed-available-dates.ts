/**
 * Seed available dates for the Esperanza Wedding Venue.
 * Generates 8 open dates (5 weekend + 3 weekday specials) in the next 3-13 weeks.
 * Run with: bun run prisma/seed-available-dates.ts
 */
import { db } from "@/lib/db";

function isWeekend(dateStr: string): boolean {
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDay();
  return day === 5 || day === 6; // Friday or Saturday
}

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

async function main() {
  console.log("Seeding available dates...");

  const today = new Date();
  const dates: { date: string; status: string; isWeekend: boolean; discount: number | null; note: string | null }[] = [];

  // Generate 5 weekend dates (Fridays/Saturdays) in the next 3-13 weeks
  const weekendOffsets = [21, 28, 35, 49, 70]; // days from now
  for (const offset of weekendOffsets) {
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    // Adjust to nearest Friday (5) or Saturday (6)
    const day = d.getDay();
    if (day < 5) d.setDate(d.getDate() + (5 - day));
    else if (day === 0) d.setDate(d.getDate() + 5);
    const dateStr = formatDate(d);
    if (!dates.find((x) => x.date === dateStr)) {
      dates.push({
        date: dateStr,
        status: "open",
        isWeekend: true,
        discount: null,
        note: null,
      });
    }
  }

  // Generate 3 weekday specials (Sundays-Thursdays) with a 15% discount
  const weekdayOffsets = [25, 42, 63];
  for (const offset of weekdayOffsets) {
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    const day = d.getDay();
    // Skip if it's a weekend
    if (day === 5 || day === 6) {
      d.setDate(d.getDate() + (day === 6 ? 2 : 3)); // Move to Monday/Tuesday
    }
    const dateStr = formatDate(d);
    if (!dates.find((x) => x.date === dateStr)) {
      dates.push({
        date: dateStr,
        status: "open",
        isWeekend: false,
        discount: 15,
        note: "Weekday special — 15% off",
      });
    }
  }

  // Upsert all dates
  for (const d of dates) {
    await db.availableDate.upsert({
      where: { date: d.date },
      create: d,
      update: {},
    });
    console.log(`  ✓ ${d.date} (${d.isWeekend ? "weekend" : "weekday"}${d.discount ? ` -${d.discount}%` : ""})`);
  }

  console.log(`\nSeeded ${dates.length} available dates.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
