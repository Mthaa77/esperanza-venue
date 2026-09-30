"use client";

import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { CONTACT } from "./data";
import { cn } from "@/lib/utils";

/**
 * Mobile-only sticky bottom bar that appears after the hero is scrolled past.
 * Gives mobile users persistent, fast access to the two most important CTAs.
 */
export function MobileEnquireBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waLink = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hi Esperanza, I'd like to enquire about a wedding date."
  )}`;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 lg:hidden",
        "transition-transform duration-300",
        show ? "translate-y-0" : "translate-y-full"
      )}
      role="region"
      aria-label="Quick contact"
    >
      <div className="border-t border-border bg-card/95 backdrop-blur-md shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-2 px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href="#enquiry"
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Calendar className="h-4 w-4" />
            Enquire
          </a>
        </div>
      </div>
    </div>
  );
}
