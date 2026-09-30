import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, ArrowUp } from "lucide-react";
import { NAV_LINKS, CONTACT, BRAND_ASSETS } from "./data";
import { FacebookIcon, InstagramIcon, WhatsAppIcon, StarIcon } from "./icons";

export function Footer() {
  const waLink = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hi Esperanza, I'd like to enquire about a date."
  )}`;

  return (
    <footer className="mt-auto bg-foreground text-background">
      <div className="gold-divider" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-5">
            <Link href="#top" className="flex items-center gap-3">
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-background/30 transition-all hover:ring-amber-300/60">
                <Image
                  src={BRAND_ASSETS.logo3dSign}
                  alt="Esperanza Wedding Venue 3D logo sign"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-serif text-xl font-semibold tracking-tight text-background">
                  Esperanza
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-background/70">
                  Wedding Venue
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-background/70">
              A working equestrian farm on the banks of the Pienaars River, converted into a
              rustic, animal-filled wedding & events venue. Affordable, flexible, and genuinely
              countryside.
            </p>
            <p className="mt-4 font-serif text-lg italic text-amber-300">
              &ldquo;{CONTACT.tagline}.&rdquo;
            </p>
            <p className="mt-1 font-serif text-base italic text-amber-200/60">
              &ldquo;ŉ Troueplek met &apos;n verskil&rdquo;
            </p>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-2 text-sm text-background/70">
              <div className="flex items-center gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={i < 4 ? "h-4 w-4 text-amber-400" : "h-4 w-4 text-amber-400/40"}
                  />
                ))}
              </div>
              <span>
                <strong className="text-background">4.4</strong> · 225 Google reviews
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-background/60">
              Explore
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 lg:grid-cols-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-background/80 transition-colors hover:text-amber-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-background/60">
              Visit & contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-background/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                <span>
                  Marina {CONTACT.phoneMarinaDisplay} (WhatsApp) · Christa {CONTACT.phoneChristaDisplay}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-amber-300">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                <span>Viewings by appointment only</span>
              </li>
            </ul>

            {/* Social */}
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Esperanza"
                className="grid h-10 w-10 place-items-center rounded-full bg-background/10 text-background transition-colors hover:bg-emerald-500 hover:text-white"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a
                href={CONTACT.social.facebookWedding}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Esperanza Wedding Venue on Facebook"
                className="grid h-10 w-10 place-items-center rounded-full bg-background/10 text-background transition-colors hover:bg-blue-600 hover:text-white"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href={CONTACT.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Esperanza Wedding Venue on Instagram"
                className="grid h-10 w-10 place-items-center rounded-full bg-background/10 text-background transition-colors hover:bg-pink-600 hover:text-white"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>

            <p className="mt-4 text-[11px] text-background/50">
              Facebook: {CONTACT.stats.fbLikes.toLocaleString()} likes · {CONTACT.stats.fbCheckins.toLocaleString()} check-ins
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-6 sm:flex-row">
          <p className="text-xs text-background/60">
            © {new Date().getFullYear()} Esperanza Wedding Venue. All rights reserved.
            <span className="mx-2 text-background/30">·</span>
            Also trades as Esperanza Equestrian Centre &amp; Esperanza Party Venue.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-background/60">
              Rebuilt with care by Carter Digitals
            </p>
            <a
              href="#top"
              aria-label="Back to top"
              className="grid h-9 w-9 place-items-center rounded-full border border-background/20 text-background/80 transition-colors hover:border-amber-300 hover:text-amber-300"
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
