import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

// Format a price stored in ZAR cents into a human string e.g. "R18,000".
// We use "en" grouping with an explicit comma so the display is stable
// regardless of the runtime's default locale.
function formatZar(cents: number): string {
  const rand = Math.round(cents / 100);
  return `R${rand.toLocaleString("en-US")}`;
}

export async function GET() {
  try {
    const packages = await db.package.findMany({
      orderBy: { order: "asc" },
    });

    const withDisplay = packages.map((p) => ({
      ...p,
      priceDisplay: formatZar(p.priceFrom),
    }));

    return NextResponse.json(withDisplay);
  } catch (err) {
    console.error("[packages/GET]", err);
    return NextResponse.json(
      { ok: false, errors: "Failed to fetch packages" },
      { status: 500 },
    );
  }
}
