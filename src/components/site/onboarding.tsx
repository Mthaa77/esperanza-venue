"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, Sparkles, Calendar, Users, Heart, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT } from "./data";
import { WhatsAppIcon } from "./icons";

/**
 * Two interactive onboarding components in one:
 * 1. "Find Your Package" — a 3-step quiz that recommends a package
 * 2. "Plan Your Day" — a visual step selector that builds a wedding day flow
 *
 * Both render as a single premium interactive panel.
 */

type QuizStep = 0 | 1 | 2 | 3; // 3 = results

const EVENT_TYPES = [
  { value: "Wedding", icon: Heart, emoji: "💍" },
  { value: "Corporate / Year-end", icon: Calendar, emoji: "🏢" },
  { value: "Birthday (16th / 18th / 21st)", icon: PartyPopper, emoji: "🎉" },
  { value: "Kids party", icon: Sparkles, emoji: "🧒" },
];

const GUEST_RANGES = [
  { value: "Intimate (under 50)", icon: Users, count: "<50" },
  { value: "Medium (50–120)", icon: Users, count: "50-120" },
  { value: "Large (120–200)", icon: Users, count: "120-200" },
  { value: "Very large (200+)", icon: Users, count: "200+" },
];

const STYLE_PREFS = [
  { value: "Self-catering — I want to bring my own everything", package: "Self-Catering Hire", price: "R18,000" },
  { value: "Full-service — you handle catering, music & entertainment", package: "Full-Service Package", price: "R42,000" },
  { value: "Party-focused — jumping castle, animals & garden fun", package: "Birthday / Kids Party", price: "R6,500" },
];

export function Onboarding() {
  const [step, setStep] = useState<QuizStep>(0);
  const [eventType, setEventType] = useState("");
  const [guestRange, setGuestRange] = useState("");
  const [stylePref, setStylePref] = useState("");

  const recommendation = STYLE_PREFS.find((s) => s.value === stylePref);

  const canProceed = (s: QuizStep) => {
    if (s === 0) return !!eventType;
    if (s === 1) return !!guestRange;
    if (s === 2) return !!stylePref;
    return true;
  };

  function reset() {
    setStep(0);
    setEventType("");
    setGuestRange("");
    setStylePref("");
  }

  const waLink = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    recommendation
      ? `Hi Esperanza, I completed your quiz and I'm interested in the ${recommendation.package} (${recommendation.price}). Event type: ${eventType}. Guests: ${guestRange}.`
      : "Hi Esperanza, I'd like to enquire about a wedding date."
  )}`;

  return (
    <section id="onboarding" className="scroll-mt-20 bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-gold-gradient">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-500/50" />
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            Get started
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-500/50" />
          </p>
          <h2
            className="text-3xl font-semibold leading-tight tracking-tight text-foreground text-balance sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Find your perfect package
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg text-balance">
            Answer three quick questions and we'll match you to the right package. No commitment —
            just a starting point for our conversation.
          </p>
        </div>

        {/* Interactive quiz card */}
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-premium-lg">
          {/* Progress bar */}
          <div className="h-1.5 bg-muted">
            <div
              className="h-full bg-gold-gradient transition-all duration-500"
              style={{ width: step === 3 ? "100%" : `${(step / 3) * 100}%` }}
            />
          </div>

          {/* Step content */}
          <div className="p-6 sm:p-10">
            {step < 3 && (
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  Step {step + 1} of 3
                </p>
                <h3
                  className="mt-2 text-2xl font-semibold text-foreground"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {step === 0 && "What are you planning?"}
                  {step === 1 && "How many guests?"}
                  {step === 2 && "What's your style?"}
                </h3>
              </div>
            )}

            {/* Step 0 — Event type */}
            {step === 0 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {EVENT_TYPES.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setEventType(opt.value)}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-300 hover:scale-[1.02]",
                      eventType === opt.value
                        ? "border-amber-400 bg-amber-50 shadow-gold-glow"
                        : "border-border bg-background hover:border-amber-300/50"
                    )}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span className="text-sm font-medium text-foreground">{opt.value}</span>
                    {eventType === opt.value && (
                      <Check className="ml-auto h-5 w-5 text-amber-600" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Step 1 — Guest count */}
            {step === 1 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {GUEST_RANGES.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setGuestRange(opt.value)}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-300 hover:scale-[1.02]",
                      guestRange === opt.value
                        ? "border-amber-400 bg-amber-50 shadow-gold-glow"
                        : "border-border bg-background hover:border-amber-300/50"
                    )}
                  >
                    <opt.icon className="h-5 w-5 text-amber-500" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{opt.value}</p>
                      <p className="text-xs text-muted-foreground">{opt.count} guests</p>
                    </div>
                    {guestRange === opt.value && (
                      <Check className="ml-auto h-5 w-5 text-amber-600" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Step 2 — Style preference */}
            {step === 2 && (
              <div className="space-y-3">
                {STYLE_PREFS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setStylePref(opt.value)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-300 hover:scale-[1.01]",
                      stylePref === opt.value
                        ? "border-amber-400 bg-amber-50 shadow-gold-glow"
                        : "border-border bg-background hover:border-amber-300/50"
                    )}
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{opt.value}</p>
                      <p className="mt-0.5 text-xs text-amber-600">from {opt.price}</p>
                    </div>
                    {stylePref === opt.value && (
                      <Check className="h-5 w-5 text-amber-600" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Step 3 — Results */}
            {step === 3 && recommendation && (
              <div className="text-center animate-fade-in-scale">
                <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-gold-gradient shadow-gold-glow-lg">
                  <Sparkles className="h-8 w-8 text-black" />
                </span>
                <h3
                  className="text-2xl font-semibold text-foreground"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Your recommended package
                </h3>
                <div className="mx-auto mt-4 max-w-md rounded-2xl border-2 border-amber-400/40 bg-amber-50/50 p-6 shadow-gold-glow">
                  <p
                    className="text-3xl font-bold text-amber-700"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {recommendation.package}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {recommendation.price} · {eventType} · {guestRange}
                  </p>
                  <p className="mt-3 font-serif text-base italic text-amber-700/80">
                    &ldquo;ŉ Pakket wat by jou pas — en jou begroping respekteer.&rdquo;
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-gold-gradient px-6 text-sm font-semibold text-black shadow-gold-glow transition-all hover:scale-105 hover:shadow-gold-glow-lg"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Discuss on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-medium text-foreground transition-all hover:bg-accent"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Start over
                  </button>
                </div>
              </div>
            )}

            {/* Navigation buttons (hidden on results step) */}
            {step < 3 && (
              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => step > 0 && setStep((step - 1) as QuizStep)}
                  disabled={step === 0}
                  className={cn(
                    "inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-all",
                    step === 0
                      ? "pointer-events-none opacity-0"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => canProceed(step) && setStep((step + 1) as QuizStep)}
                  disabled={!canProceed(step)}
                  className={cn(
                    "inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-all duration-300",
                    canProceed(step)
                      ? "bg-gold-gradient text-black shadow-gold-glow hover:scale-105"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                >
                  {step === 2 ? "See my match" : "Continue"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
