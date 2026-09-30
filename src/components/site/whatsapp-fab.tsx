"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./icons";
import { CONTACT } from "./data";
import { cn } from "@/lib/utils";

export function WhatsAppFab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waLink = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hi Esperanza, I'd like to enquire about a wedding date."
  )}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Esperanza Wedding Venue"
      className={cn(
        // Desktop-only — mobile uses the sticky MobileEnquireBar instead
        "group fixed right-6 bottom-6 z-40 hidden items-center gap-2 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 transition-all duration-300 hover:bg-emerald-600 hover:shadow-xl lg:flex",
        "h-14 px-5",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <span className="relative grid place-items-center">
        <span className="absolute inset-0 rounded-full animate-pulse-ring" aria-hidden="true" />
        <WhatsAppIcon className="relative h-6 w-6" />
      </span>
      <span className="hidden text-sm font-medium sm:inline">
        WhatsApp Marina
      </span>
    </a>
  );
}
