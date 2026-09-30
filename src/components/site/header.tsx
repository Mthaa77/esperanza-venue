"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Phone, Calendar, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { NAV_LINKS, CONTACT, BRAND_ASSETS } from "./data";
import { WhatsAppIcon } from "./icons";
import { ScrollProgress, ActiveSectionStyles } from "./scroll-progress";
import { useScrollState } from "./use-scroll-state";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { progress, activeSection } = useScrollState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waLink = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hi Esperanza, I'd like to enquire about a wedding date."
  )}`;

  return (
    <>
      <ScrollProgress progress={progress} />
      <ActiveSectionStyles activeSection={activeSection} />
      {/* Floating premium navbar */}
      <header
        style={{
          position: "fixed",
          top: "0.75rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "calc(100% - 2rem)",
          maxWidth: "72rem",
          borderRadius: "9999px",
          zIndex: 50,
        }}
        className={cn(
          "transition-all duration-500",
          scrolled
            ? "glass-light shadow-premium-lg ring-1 ring-amber-400/20"
            : "glass-dark ring-1 ring-white/10"
        )}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-2 sm:px-5 sm:py-2.5">
          {/* Logo — premium 3D sign with gold ring */}
          <Link href="#top" className="group flex items-center gap-2.5" aria-label="Esperanza Wedding Venue — home">
            <span
              className={cn(
                "relative h-10 w-10 shrink-0 overflow-hidden rounded-full transition-all duration-500 sm:h-11 sm:w-11",
                scrolled
                  ? "ring-2 ring-amber-400/50 shadow-gold-glow"
                  : "ring-2 ring-white/25"
              )}
            >
              <Image
                src={BRAND_ASSETS.logo3dSign}
                alt="Esperanza Wedding Venue 3D logo sign"
                fill
                sizes="44px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span
                className={cn(
                  "font-[var(--font-playfair)] text-lg font-semibold tracking-tight transition-colors duration-300 sm:text-xl",
                  scrolled ? "text-foreground" : "text-white drop-shadow-lg"
                )}
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Esperanza
              </span>
              <span
                className={cn(
                  "text-[9px] font-medium uppercase tracking-[0.25em] transition-colors duration-300 sm:text-[10px]",
                  scrolled ? "text-amber-600" : "text-amber-300/90"
                )}
              >
                Wedding Venue
              </span>
            </span>
          </Link>

          {/* Desktop nav — inline links inside the floating pill */}
          <nav
            data-main-nav
            className="hidden items-center gap-0.5 lg:flex"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-target={link.href}
                className={cn(
                  "nav-link-premium rounded-full px-3 py-1.5 text-[13px] font-medium transition-all duration-300",
                  scrolled
                    ? "text-foreground/70 hover:text-amber-700"
                    : "text-white/85 hover:text-white"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex h-9 items-center gap-2 rounded-full px-3.5 text-[13px] font-medium transition-all duration-300 hover:scale-105",
                scrolled
                  ? "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:shadow-emerald-glow"
                  : "border border-white/20 text-white hover:border-emerald-300/50 hover:shadow-emerald-glow"
              )}
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
            <Button
              asChild
              size="default"
              className="h-9 rounded-full bg-gold-gradient px-5 text-[13px] font-semibold text-black shadow-gold-glow transition-all duration-300 hover:scale-105 hover:shadow-gold-glow-lg"
            >
              <a href="#enquiry">
                <Calendar className="h-3.5 w-3.5" />
                Enquire
              </a>
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open menu"
                  className={cn(
                    "inline-flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300",
                    scrolled
                      ? "bg-muted text-foreground hover:bg-accent"
                      : "glass-dark text-white"
                  )}
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm border-l border-amber-400/20 p-0" style={{ boxShadow: "-20px 0 60px oklch(0.40 0.06 50 / 0.15)" }}>
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="flex h-full flex-col bg-gradient-to-b from-background via-background to-muted/20">
                  {/* Premium tray header with luxury mesh bg */}
                  <div className="relative flex flex-col gap-4 overflow-hidden border-b border-amber-400/15 px-6 pb-6 pt-7">
                    <div className="pointer-events-none absolute inset-0 bg-luxury-mesh" />
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-amber-400/40 shadow-gold-glow">
                          <Image
                            src={BRAND_ASSETS.logo3dSign}
                            alt="Esperanza Wedding Venue 3D logo"
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </span>
                        <div className="flex flex-col leading-none">
                          <span
                            className="text-xl font-semibold text-foreground"
                            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                          >
                            Esperanza
                          </span>
                          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-amber-600">Wedding Venue</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        aria-label="Close menu"
                        className="grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground transition-all hover:bg-accent hover:text-foreground hover:rotate-90"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    {/* Afrikaans tagline in header */}
                    <p className="relative font-serif text-sm italic text-amber-700/70">
                      &ldquo;ŉ Troue met &apos;n verskil&rdquo;
                    </p>
                  </div>
                  {/* Premium tray nav links */}
                  <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3" aria-label="Mobile navigation">
                    {NAV_LINKS.map((link, i) => {
                      const isActive = activeSection === link.href;
                      return (
                        <a
                          key={link.href}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          aria-current={isActive ? "true" : undefined}
                          style={{ animationDelay: `${i * 35}ms` }}
                          className={cn(
                            "flex animate-fade-in-scale items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300",
                            isActive
                              ? "bg-gradient-to-r from-amber-50 to-amber-50/30 text-amber-700 shadow-premium-sm border-l-[3px] border-amber-400"
                              : "text-foreground/75 hover:bg-amber-50/30 hover:text-amber-800"
                          )}
                        >
                          <span className={cn("transition-transform duration-300", isActive && "translate-x-1.5")}>
                            {link.label}
                          </span>
                          {isActive ? (
                            <span className="h-2 w-2 rounded-full bg-amber-500 shadow-gold-glow" aria-hidden="true" />
                          ) : (
                            <span className="h-1 w-1 rounded-full bg-border" aria-hidden="true" />
                          )}
                        </a>
                      );
                    })}
                  </nav>
                  {/* Premium tray CTA footer */}
                  <div className="space-y-2.5 border-t border-amber-400/15 bg-gradient-to-t from-amber-50/20 to-transparent p-4">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 text-sm font-medium text-emerald-700 transition-all duration-300 hover:scale-[1.02] hover:bg-emerald-100 hover:shadow-emerald-glow"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      WhatsApp Marina
                    </a>
                    <a
                      href={`tel:${CONTACT.phoneChrista.replace(/\s/g, "")}`}
                      onClick={() => setOpen(false)}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border bg-card text-sm font-medium transition-all hover:bg-accent"
                    >
                      <Phone className="h-4 w-4" />
                      Call Christa
                    </a>
                    <Button
                      asChild
                      className="h-12 w-full rounded-full bg-gold-gradient text-black shadow-gold-glow transition-all duration-300 hover:scale-[1.02] hover:shadow-gold-glow-lg"
                    >
                      <a href="#enquiry" onClick={() => setOpen(false)}>
                        <Calendar className="h-4 w-4" />
                        Enquire now
                      </a>
                    </Button>
                    {/* Rating badge */}
                    <div className="flex items-center justify-center gap-1 pt-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                      <span className="font-medium">{CONTACT.stats.rating}★</span>
                      <span>· {CONTACT.stats.reviewCount} Google reviews</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
