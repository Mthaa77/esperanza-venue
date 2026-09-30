import { NextResponse } from "next/server";

export const runtime = "nodejs";

const contactInfo = {
  businessName: "Esperanza Wedding Venue",
  tagline: "Wedding Venue with a difference",
  address:
    "Plot 588 Mooiplaats, Volstruis Street, Pretoria East, Pretoria, 0036, Gauteng",
  phoneMarina: "076 857 6886",
  phoneChrista: "076 259 5633",
  phoneGoogle: "+27 76 184 5660",
  email: "esperanzaweddings@gmail.com",
  whatsapp: "27768576886",
  social: {
    facebookWedding: "https://www.facebook.com/espereranzaweddings",
    facebookEquestrian:
      "https://www.facebook.com/p/Esperanza-Equestrian-Centre-and-Venue-100057376881511",
    facebookParty: "https://www.facebook.com/esperanzaparty",
    instagram: "https://www.instagram.com/esperanzaweddingsvenue",
  },
};

export async function GET() {
  return NextResponse.json(contactInfo);
}
