import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

export const runtime = "nodejs";

/**
 * GET /api/available-dates
 * Returns all available dates, optionally filtered by status.
 * Query params:
 *   - status: "open" | "held" | "booked" (default: "open")
 *   - weeks: number of weeks ahead to look (default: 12)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "open";
    const weeks = Math.min(Number(searchParams.get("weeks") || 12), 26);

    const dates = await db.availableDate.findMany({
      where: status === "all" ? undefined : { status },
      orderBy: { date: "asc" },
    });

    // If no dates in DB, fall back to generating indicative ones client-side
    // (the promo banner handles this). But if we have dates, filter by weeks.
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() + weeks * 7);

    const filtered = dates.filter((d) => {
      const date = new Date(d.date);
      return date >= new Date() && date <= cutoff;
    });

    return NextResponse.json({
      ok: true,
      dates: filtered,
      source: filtered.length > 0 ? "database" : "fallback",
    });
  } catch (err) {
    console.error("[available-dates/GET]", err);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch available dates" },
      { status: 500 }
    );
  }
}

const createSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  status: z.enum(["open", "held", "booked"]).optional(),
  isWeekend: z.boolean().optional(),
  discount: z.number().int().min(0).max(100).optional(),
  note: z.string().optional(),
});

/**
 * POST /api/available-dates
 * Creates or upserts an available date. Used by the admin to manage availability.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const d = parsed.data;
    const date = await db.availableDate.upsert({
      where: { date: d.date },
      create: {
        date: d.date,
        status: d.status ?? "open",
        isWeekend: d.isWeekend ?? isWeekend(d.date),
        discount: d.discount ?? null,
        note: d.note ?? null,
      },
      update: {
        ...(d.status ? { status: d.status } : {}),
        ...(d.isWeekend !== undefined ? { isWeekend: d.isWeekend } : {}),
        ...(d.discount !== undefined ? { discount: d.discount } : {}),
        ...(d.note !== undefined ? { note: d.note } : {}),
      },
    });

    return NextResponse.json({ ok: true, date }, { status: 201 });
  } catch (err) {
    console.error("[available-dates/POST]", err);
    return NextResponse.json(
      { ok: false, error: "Failed to create available date" },
      { status: 500 }
    );
  }
}

function isWeekend(dateStr: string): boolean {
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDay();
  return day === 5 || day === 6; // Friday or Saturday
}
