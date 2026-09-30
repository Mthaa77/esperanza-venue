import { db } from "@/lib/db";
import { Header } from "@/components/site/header";
import { AnnouncementBar } from "@/components/site/announcement-bar";
import { PromoBanner } from "@/components/site/promo-banner";
import { Hero } from "@/components/site/hero";
import { LiveTicker } from "@/components/site/live-ticker";
import { About } from "@/components/site/about";
import { Chapels } from "@/components/site/chapels";
import { BarnVenue } from "@/components/site/barn-venue";
import { Packages, type Package } from "@/components/site/packages";
import { AvailabilityChecker } from "@/components/site/availability-checker";
import { Capacities } from "@/components/site/capacities";
import { ServicesTable } from "@/components/site/services-table";
import { Onboarding } from "@/components/site/onboarding";
import { DayFlow } from "@/components/site/day-flow";
import { Included } from "@/components/site/included";
import { Animals } from "@/components/site/animals";
import { Entertainment } from "@/components/site/entertainment";
import { BuildPackage } from "@/components/site/build-package";
import { Accommodation } from "@/components/site/accommodation";
import { Snackbar } from "@/components/site/snackbar";
import { Gallery } from "@/components/site/gallery";
import { Testimonials, type Testimonial } from "@/components/site/testimonials";
import { RealWeddings } from "@/components/site/real-weddings";
import { Faq } from "@/components/site/faq";
import { ViewingChecklist } from "@/components/site/viewing-checklist";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { BackToTop } from "@/components/site/back-to-top";
import { MobileEnquireBar } from "@/components/site/mobile-enquire-bar";
import { AdminPanel } from "@/components/site/admin-panel";

// Revalidate every 60 minutes so seed/admin edits appear without a hard refresh
export const revalidate = 3600;

async function getPackages(): Promise<Package[]> {
  try {
    const rows = await db.package.findMany({
      orderBy: { order: "asc" },
    });
    return rows.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      priceFrom: p.priceFrom,
      priceDisplay: `R${(p.priceFrom / 100).toLocaleString("en-US", {
        maximumFractionDigits: 0,
      })}`,
      features: p.features,
      popular: p.popular,
      order: p.order,
    }));
  } catch (err) {
    console.error("[page] failed to load packages:", err);
    return [];
  }
}

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const rows = await db.testimonial.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
    return rows.map((t) => ({
      id: t.id,
      name: t.name,
      source: t.source,
      rating: t.rating,
      text: t.text,
      eventType: t.eventType,
      featured: t.featured,
    }));
  } catch (err) {
    console.error("[page] failed to load testimonials:", err);
    return [];
  }
}

export default async function Home() {
  const [packages, testimonials] = await Promise.all([getPackages(), getTestimonials()]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:shadow-md"
      >
        Skip to content
      </a>

      <Header />
      <div className="pt-14">
        <AnnouncementBar />
        <PromoBanner />
      </div>

      <main id="main" className="flex-1 pattern-grain">
        <Hero />
        <LiveTicker />
        <Gallery />
        <div className="pattern-botanical">
          <About />
        </div>
        <Chapels />
        <BarnVenue />
        <Packages packages={packages} />
        {/* Availability checker — interactive date-checking widget */}
        <section id="availability" className="scroll-mt-20 bg-muted/40 pb-20 sm:pb-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <AvailabilityChecker />
          </div>
        </section>
        <ServicesTable />
        <Onboarding />
        <Included />
        <Capacities />
        <Animals />
        <Entertainment />
        <BuildPackage />
        <div className="pattern-botanical">
          <Accommodation />
        </div>
        <DayFlow />
        <Snackbar />
        <Testimonials testimonials={testimonials} />
        <RealWeddings />
        <ViewingChecklist />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <WhatsAppFab />
      <BackToTop />
      <MobileEnquireBar />
      <AdminPanel />
    </div>
  );
}
