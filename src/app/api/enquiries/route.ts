import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

export const runtime = "nodejs";

const enquirySchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().min(8, "Phone number must be at least 8 characters"),
  weddingDate: z.string().optional(),
  guestCount: z
    .number()
    .int("Guest count must be a whole number")
    .min(1, "Guest count must be at least 1")
    .max(500, "Guest count cannot exceed 500")
    .optional(),
  eventType: z.string().optional(),
  packageInterest: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = enquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const d = parsed.data;
    const enquiry = await db.enquiry.create({
      data: {
        firstName: d.firstName,
        lastName: d.lastName,
        email: d.email,
        phone: d.phone,
        weddingDate: d.weddingDate ?? null,
        guestCount: d.guestCount ?? null,
        eventType: d.eventType ?? null,
        packageInterest: d.packageInterest ?? null,
        budget: d.budget ?? null,
        message: d.message,
      },
    });

    return NextResponse.json({ ok: true, id: enquiry.id }, { status: 201 });
  } catch (err) {
    console.error("[enquiries/POST]", err);
    return NextResponse.json(
      { ok: false, errors: { formErrors: ["Something went wrong. Please try again."] } },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const enquiries = await db.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(enquiries);
  } catch (err) {
    console.error("[enquiries/GET]", err);
    return NextResponse.json(
      { ok: false, errors: "Failed to fetch enquiries" },
      { status: 500 },
    );
  }
}
