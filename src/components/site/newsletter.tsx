"use client";

import { useState, FormEvent } from "react";
import { Mail, Send, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function Newsletter() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      const json = await res.json();
      setDone(true);
      toast.success(json.alreadySubscribed ? "You're already on the list!" : "Subscribed!");
      form.reset();
    } catch {
      toast.error("Subscription failed. Try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-foreground p-6 text-background sm:p-8">
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full opacity-30 blur-2xl"
        style={{ background: "oklch(0.78 0.13 75)" }}
        aria-hidden="true"
      />
      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-amber-400 text-black">
            <Mail className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-serif text-lg font-semibold text-background">
              Open days & seasonal specials
            </h3>
            <p className="text-xs text-background/70">
              A short note when we host an open day or run a last-minute date special.
            </p>
          </div>
        </div>

        {done ? (
          <div className="mt-5 flex items-center gap-3 rounded-lg bg-background/10 px-4 py-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-white">
              <Check className="h-4 w-4" />
            </span>
            <p className="text-sm text-background">
              You&apos;re on the list. We&apos;ll be in touch when the next date opens up.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="h-11 flex-1 border-background/20 bg-background/10 text-background placeholder:text-background/50"
              aria-label="Email address"
            />
            <Button
              type="submit"
              disabled={submitting}
              className="h-11 shrink-0 bg-amber-400 text-black hover:bg-amber-300"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Subscribe
                </>
              )}
            </Button>
          </form>
        )}

        <p className="mt-3 text-[11px] text-background/50">
          No spam. Unsubscribe with one click. We never sell your details.
        </p>
      </div>
    </div>
  );
}
