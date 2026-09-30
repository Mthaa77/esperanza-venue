"use client";

import { useState, useId, FormEvent } from "react";
import {
  Calendar,
  Users,
  Mail,
  Phone,
  User,
  Wallet,
  Send,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WhatsAppIcon } from "./icons";
import { CONTACT } from "./data";
import { toast } from "sonner";

const EVENT_TYPES = [
  "Wedding",
  "Corporate / Year-end",
  "Birthday (16th / 18th / 21st)",
  "Kids party",
  "Team building",
  "Other",
];
const PACKAGE_INTERESTS = [
  "Self-catering hire",
  "Full-service package",
  "Birthday / kids party",
  "Just looking / viewing",
  "Not sure yet",
];
const BUDGETS = [
  "Under R15,000",
  "R15,000 - R30,000",
  "R30,000 - R50,000",
  "R50,000 - R100,000",
  "Over R100,000",
  "Prefer to discuss",
];

export function EnquiryForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formId = useId();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      firstName: String(data.get("firstName") ?? "").trim(),
      lastName: String(data.get("lastName") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      weddingDate: String(data.get("weddingDate") ?? "").trim() || undefined,
      guestCount: data.get("guestCount") ? Number(data.get("guestCount")) : undefined,
      eventType: String(data.get("eventType") ?? "") || undefined,
      packageInterest: String(data.get("packageInterest") ?? "") || undefined,
      budget: String(data.get("budget") ?? "") || undefined,
      message: String(data.get("message") ?? "").trim(),
    };

    const nextErrors: Record<string, string> = {};
    if (payload.firstName.length < 2) nextErrors.firstName = "Please enter your first name";
    if (payload.lastName.length < 2) nextErrors.lastName = "Please enter your last name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) nextErrors.email = "Please enter a valid email";
    if (payload.phone.replace(/\s/g, "").length < 8) nextErrors.phone = "Please enter a valid phone number";
    if (payload.message.length < 10) nextErrors.message = "Tell us a little more (at least 10 characters)";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      toast.error("Please check the highlighted fields");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("Submission failed");
      }
      setSubmitted(true);
      toast.success("Enquiry sent! Marina or Christa will be in touch within 24-48 hours.");
      form.reset();
    } catch {
      toast.error("Something went wrong. Please WhatsApp us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="font-serif text-2xl font-semibold text-foreground">Enquiry received</h3>
        <p className="max-w-md text-sm text-muted-foreground">
          Thank you. Marina or Christa will reply within 24-48 hours via WhatsApp or email. For
          urgent enquiries, please WhatsApp us directly.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="rounded-full">
            <a
              href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
                "Hi Esperanza, I just sent an enquiry via the website."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp Marina now
            </a>
          </Button>
          <Button variant="outline" className="rounded-full" onClick={() => setSubmitted(false)}>
            Send another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
      aria-label="Wedding enquiry form"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" required error={errors.firstName} htmlFor={`${formId}-firstName`}>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id={`${formId}-firstName`} name="firstName" placeholder="Marina" className="pl-9" required aria-invalid={!!errors.firstName} />
          </div>
        </Field>
        <Field label="Last name" required error={errors.lastName} htmlFor={`${formId}-lastName`}>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id={`${formId}-lastName`} name="lastName" placeholder="du Plessis" className="pl-9" required aria-invalid={!!errors.lastName} />
          </div>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email" required error={errors.email} htmlFor={`${formId}-email`}>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id={`${formId}-email`} type="email" name="email" placeholder="you@example.com" className="pl-9" required aria-invalid={!!errors.email} />
          </div>
        </Field>
        <Field label="Phone / WhatsApp" required error={errors.phone} htmlFor={`${formId}-phone`}>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id={`${formId}-phone`} type="tel" name="phone" placeholder="082 123 4567" className="pl-9" required aria-invalid={!!errors.phone} />
          </div>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Event date" htmlFor={`${formId}-date`}>
          <div className="relative">
            <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
            <Input id={`${formId}-date`} type="date" name="weddingDate" className="pl-9" />
          </div>
        </Field>
        <Field label="Guest count" htmlFor={`${formId}-guests`}>
          <div className="relative">
            <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id={`${formId}-guests`} type="number" name="guestCount" min={1} max={500} placeholder="120" className="pl-9" />
          </div>
        </Field>
        <Field label="Budget" htmlFor={`${formId}-budget`}>
          <div className="relative">
            <Wallet className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Select name="budget">
              <SelectTrigger id={`${formId}-budget`} className="pl-9">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                {BUDGETS.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Event type" htmlFor={`${formId}-eventType`}>
          <Select name="eventType">
            <SelectTrigger id={`${formId}-eventType`}>
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              {EVENT_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Package interest" htmlFor={`${formId}-package`}>
          <Select name="packageInterest">
            <SelectTrigger id={`${formId}-package`}>
              <SelectValue placeholder="Select a package" />
            </SelectTrigger>
            <SelectContent>
              {PACKAGE_INTERESTS.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field label="Tell us about your day" required error={errors.message} htmlFor={`${formId}-message`}>
        <Textarea
          id={`${formId}-message`}
          name="message"
          placeholder="We're planning a wedding for ~120 guests in spring 2026, interested in the forest chapel + barn reception, self-catering. We'd love the donkey to serve welcome drinks..."
          rows={4}
          required
          aria-invalid={!!errors.message}
        />
      </Field>

      <div className="flex flex-col-reverse items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-xs text-muted-foreground">
          We&apos;ll only use your details to reply to this enquiry. No marketing, no spam.
        </p>
        <Button type="submit" disabled={submitting} className="h-11 w-full rounded-full sm:w-auto">
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send enquiry
            </>
          )}
        </Button>
      </div>

      {Object.keys(errors).length > 0 && (
        <p className="flex items-center gap-2 text-xs text-destructive">
          <AlertCircle className="h-3.5 w-3.5" />
          Please fix the highlighted fields above.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  required,
  error,
  htmlFor,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} className="text-xs font-medium text-foreground">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
