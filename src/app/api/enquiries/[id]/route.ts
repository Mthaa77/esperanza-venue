import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

export const runtime = "nodejs";

const updateSchema = z.object({
  status: z.enum(["new", "contacted", "closed"]).optional(),
});

/**
 * PATCH /api/enquiries/[id] — update an enquiry's status (new | contacted | closed).
 * Used by the admin panel's "mark as read" / "mark as closed" buttons.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data: { status?: string } = {};
    if (parsed.data.status) data.status = parsed.data.status;

    const updated = await db.enquiry.update({
      where: { id },
      data,
    });

    return NextResponse.json({ ok: true, enquiry: updated });
  } catch (err) {
    console.error("[enquiries/[id]/PATCH]", err);
    return NextResponse.json(
      { ok: false, error: "Failed to update enquiry" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/enquiries/[id] — permanently delete an enquiry.
 * Used by the admin panel's delete button.
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.enquiry.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[enquiries/[id]/DELETE]", err);
    return NextResponse.json(
      { ok: false, error: "Failed to delete enquiry" },
      { status: 500 }
    );
  }
}
