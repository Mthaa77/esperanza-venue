import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

/**
 * DELETE /api/available-dates/[id]
 * Removes an available date from the calendar.
 * Used by the admin panel's "Manage dates" tab.
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.availableDate.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[available-dates/[id]/DELETE]", err);
    return NextResponse.json(
      { ok: false, error: "Failed to delete available date" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/available-dates/[id]
 * Updates an available date's status (open | held | booked).
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body as { status?: string };

    if (status && !["open", "held", "booked"].includes(status)) {
      return NextResponse.json(
        { ok: false, error: "Status must be open, held, or booked" },
        { status: 400 }
      );
    }

    const updated = await db.availableDate.update({
      where: { id },
      data: status ? { status } : {},
    });

    return NextResponse.json({ ok: true, date: updated });
  } catch (err) {
    console.error("[available-dates/[id]/PATCH]", err);
    return NextResponse.json(
      { ok: false, error: "Failed to update available date" },
      { status: 500 }
    );
  }
}
