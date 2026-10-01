"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Phone, Calendar, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
            className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-target={link.href}
                className={cn(
                  "nav-link-premium relative rounded-full px-3 py-2 text-[12px] font-semibold tracking-[0.01em] transition-all duration-300 after:absolute after:inset-x-3 after:bottom-0.5 after:h-px after:origin-center after:scale-x-0 after:bg-current after:transition-transform hover:after:scale-x-100",
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
          <div className="hidden shrink-0 items-center gap-2 xl:flex">
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
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="flex shrink-0 items-center gap-2 xl:hidden">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message Esperanza on WhatsApp"
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-full transition-all duration-300",
                scrolled
                  ? "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  : "border border-white/20 bg-white/10 text-white hover:border-emerald-300/50 hover:bg-emerald-400/15"
              )}
            >
              <WhatsAppIcon className="size-4" />
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className={cn(
                "group inline-flex size-10 items-center justify-center rounded-full transition-all duration-300",
                scrolled ? "bg-primary text-primary-foreground shadow-lg" : "glass-dark text-white"
              )}
            >
              <span className="relative block size-5">
                <Menu className={cn("absolute inset-0 size-5 transition-all duration-300", open ? "rotate-90 scale-0 opacity-0" : "scale-100 opacity-100")} />
                <X className={cn("absolute inset-0 size-5 transition-all duration-300", open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0")} />
              </span>
            </button>
          </div>
        </div>
        <div
          className={cn(
            "overflow-hidden border-t bg-[#fffaf0] text-[#2c211a] shadow-[0_24px_60px_oklch(0.18_0.04_45_/_0.2)] transition-all duration-500 xl:hidden",
            open ? "max-h-[min(70svh,38rem)] border-amber-300/35 opacity-100" : "max-h-0 border-transparent opacity-0"
          )}
        >
          <div className="flex items-center justify-between border-b border-amber-900/10 px-5 pb-4 pt-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-700">Explore Esperanza</p>
              <p className="mt-1 font-serif text-lg text-[#2c211a]">Your day, your way</p>
            </div>
            <span className="grid size-9 place-items-center rounded-full border border-amber-400/30 bg-amber-50 text-amber-700 shadow-sm" aria-hidden="true">✦</span>
          </div>
          <nav className="grid max-h-[calc(70svh-10rem)] grid-cols-2 gap-2 overflow-y-auto overscroll-contain p-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Mobile navigation">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${i * 35}ms` : "0ms" }}
                className={cn(
                  "group flex min-h-12 items-center justify-between rounded-xl border border-amber-900/10 bg-white/70 px-3.5 py-3 text-sm font-semibold text-[#3b2a20] shadow-sm transition-all duration-300",
                  open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
                  activeSection === link.href
                      ? "border-primary/20 bg-primary text-primary-foreground shadow-lg"
                    : "hover:border-amber-500/40 hover:bg-amber-50 hover:text-primary hover:shadow-md"
                )}
              >
                <span>{link.label}</span>
                <ArrowUpRight className="size-4 opacity-60" />
              </a>
            ))}
          </nav>
          <div className="grid grid-cols-2 gap-2 border-t border-amber-900/10 bg-amber-50/70 p-4">
            <a href={`tel:${CONTACT.phoneChrista.replace(/\s/g, "")}`} onClick={() => setOpen(false)} className={cn("flex h-11 items-center justify-center gap-2 rounded-full border text-xs font-semibold", "border-amber-900/15 bg-white text-[#3b2a20] hover:bg-amber-50")}>
              <Phone className="size-4" /> Call
            </a>
            <a href="#enquiry" onClick={() => setOpen(false)} className="flex h-11 items-center justify-center gap-2 rounded-full bg-gold-gradient text-xs font-bold text-black shadow-gold-glow">
              <Calendar className="size-4" /> Enquire
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
