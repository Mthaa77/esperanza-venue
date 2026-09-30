import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://esperanzaweddings.co.za"),
  title: "Esperanza Wedding Venue | Rustic Farm Weddings in Pretoria East",
  description:
    "Esperanza is a working equestrian farm and rustic wedding venue on the banks of the Pienaars River in Pretoria East. Forest chapel, barn reception with fairy lights, donkeys serving drinks, horses & farm animals. Affordable, self-catering or full-service packages.",
  keywords: [
    "wedding venue Pretoria East",
    "farm wedding venue Pretoria",
    "affordable wedding venue Gauteng",
    "forest chapel wedding venue Pretoria",
    "horse farm wedding venue Pretoria",
    "barn wedding venue Pretoria East",
    "rustic wedding venue Gauteng animals",
    "self-catering wedding venues Pretoria",
    "kids obstacle course party venue Pretoria",
    "team building venue near Pretoria East",
    "pet-friendly wedding venue Gauteng",
  ],
  authors: [{ name: "Esperanza Wedding Venue" }],
  openGraph: {
    title: "Esperanza Wedding Venue | Rustic Farm Weddings in Pretoria East",
    description:
      "A working equestrian farm & rustic wedding venue on the Pienaars River. Forest chapel, barn reception, donkeys serving drinks, horses & farm animals.",
    url: "https://esperanzaweddings.co.za",
    siteName: "Esperanza Wedding Venue",
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Esperanza Wedding Venue | Rustic Farm Weddings in Pretoria East",
    description:
      "A working equestrian farm & rustic wedding venue on the Pienaars River. Forest chapel, barn reception, donkeys serving drinks.",
  },
  alternates: { canonical: "https://esperanzaweddings.co.za" },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "WeddingVenue",
  name: "Esperanza Wedding Venue",
  alternateName: ["Esperanza Equestrian Centre and Venue", "Esperanza Party Venue"],
  slogan: "Wedding Venue with a difference",
  description:
    "Working equestrian farm and rustic wedding venue on the banks of the Pienaars River in Mooiplaats, Pretoria East. Forest chapel, barn reception with fairy lights, donkeys serving drinks, horses & farm animals.",
  url: "https://esperanzaweddings.co.za",
  telephone: "+27 76 857 6886",
  email: "esperanzaweddings@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot 588 Mooiplaats, Volstruis Street",
    addressLocality: "Pretoria East",
    addressRegion: "Gauteng",
    postalCode: "0036",
    addressCountry: "ZA",
  },
  geo: { "@type": "GeoCoordinates", latitude: "-25.78", longitude: "28.33" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.4",
    reviewCount: "225",
  },
  sameAs: [
    "https://www.facebook.com/espereranzaweddings",
    "https://www.facebook.com/p/Esperanza-Equestrian-Centre-and-Venue-100057376881511",
    "https://www.facebook.com/esperanzaparty",
    "https://www.instagram.com/esperanzaweddingsvenue",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${cormorant.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
