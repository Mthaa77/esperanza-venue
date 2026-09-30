import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

export const runtime = "nodejs";

const newsletterSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const email = parsed.data.email.toLowerCase().trim();
    const existing = await db.newsletter.findUnique({ where: { email } });

    if (existing) {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }

    await db.newsletter.create({ data: { email } });
    return NextResponse.json({ ok: true, alreadySubscribed: false });
  } catch (err) {
    console.error("[newsletter/POST]", err);
    return NextResponse.json(
      { ok: false, errors: "Failed to subscribe" },
      { status: 500 },
    );
  }
}
