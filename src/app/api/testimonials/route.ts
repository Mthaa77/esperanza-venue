import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const testimonials = await db.testimonial.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
    return NextResponse.json(testimonials);
  } catch (err) {
    console.error("[testimonials/GET]", err);
    return NextResponse.json(
      { ok: false, errors: "Failed to fetch testimonials" },
      { status: 500 },
    );
  }
}
