"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Lock, X, Eye, EyeOff, Inbox, RefreshCw, Trash2, ExternalLink, CheckCheck, RotateCcw, CalendarPlus, CalendarDays, AlertCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WhatsAppIcon } from "./icons";
import { toast } from "sonner";

/**
 * Hidden admin panel for viewing enquiries.
 *
 * Opens when:
 *  - The URL hash is `#admin` (e.g. https://site/#admin), OR
 *  - The keyboard shortcut Ctrl+Shift+A (Cmd+Shift+A on Mac) is pressed.
 *
 * Password-gated with a simple client-side check (ESPERANZA_ADMIN env var if
 * set, otherwise a default). NOT production-grade auth — this is a convenience
 * for Marina/Christa to quickly view enquiries without a full admin backend.
 * For real security, wire up NextAuth.js (already in the stack).
 *
 * Reads from the open /api/enquiries GET endpoint. To clear the session,
 * the admin can click "Sign out".
 */

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "esperanza2026";
const SESSION_KEY = "esperanza:admin-session";

interface Enquiry {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  weddingDate: string | null;
  guestCount: number | null;
  eventType: string | null;
  packageInterest: string | null;
  budget: string | null;
  message: string;
  status: string;
  createdAt: string;
}

interface AvailableDate {
  id: string;
  date: string;
  status: string;
  isWeekend: boolean;
  discount: number | null;
  note: string | null;
}

export function AdminPanel() {
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Enquiry | null>(null);
  // Tab state: "enquiries" | "dates"
  const [tab, setTab] = useState<"enquiries" | "dates">("enquiries");
  // Enquiry filter: "all" | "new" | "contacted" | "closed"
  const [enquiryFilter, setEnquiryFilter] = useState<"all" | "new" | "contacted" | "closed">("all");
  // Available dates state
  const [availableDates, setAvailableDates] = useState<AvailableDate[]>([]);
  const [datesLoading, setDatesLoading] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newDiscount, setNewDiscount] = useState("");
  const [newNote, setNewNote] = useState("");

  // Build a Set of "booked" date strings for conflict detection
  const bookedDatesSet = useMemo(() => {
    const s = new Set<string>();
    availableDates.forEach((d) => {
      if (d.status === "booked") s.add(d.date);
    });
    return s;
  }, [availableDates]);

  // Compute stats from enquiries
  const stats = useMemo(() => {
    const total = enquiries.length;
    const newCount = enquiries.filter((e) => e.status === "new").length;
    const contacted = enquiries.filter((e) => e.status === "contacted").length;
    const closed = enquiries.filter((e) => e.status === "closed").length;
    // "This week" = created within the last 7 days
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const thisWeek = enquiries.filter((e) => new Date(e.createdAt).getTime() >= weekAgo).length;
    // Conflicts: enquiries whose weddingDate matches a booked AvailableDate
    const conflicts = enquiries.filter((e) =>
      e.weddingDate ? bookedDatesSet.has(e.weddingDate) : false
    ).length;
    // Conversion rate: (contacted + closed) / total — i.e. how many have been actioned
    const conversion = total > 0 ? Math.round(((contacted + closed) / total) * 100) : 0;
    return { total, newCount, contacted, closed, thisWeek, conflicts, conversion };
  }, [enquiries, bookedDatesSet]);

  // Filtered enquiries based on the active filter pill
  const filteredEnquiries = useMemo(() => {
    if (enquiryFilter === "all") return enquiries;
    return enquiries.filter((e) => e.status === enquiryFilter);
  }, [enquiries, enquiryFilter]);

  // Open via #admin hash
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#admin") setOpen(true);
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  // Open via Ctrl+Shift+A / Cmd+Shift+A
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Check existing session
  useEffect(() => {
    if (!open) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        setAuthed(true);
      }
    } catch {
      // ignore
    }
  }, [open]);

  const loadEnquiries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/enquiries");
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setEnquiries(data);
    } catch {
      setError("Could not load enquiries. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load available dates from /api/available-dates — declared before the
  // useEffect that uses it to avoid the TDZ ("Cannot access before initialization").
  const loadAvailableDates = useCallback(async () => {
    setDatesLoading(true);
    try {
      const res = await fetch("/api/available-dates?status=all&weeks=52");
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setAvailableDates(data.dates || []);
    } catch {
      toast.error("Could not load available dates");
    } finally {
      setDatesLoading(false);
    }
  }, []);

  // Load enquiries when authed
  useEffect(() => {
    if (authed && enquiries.length === 0 && !loading) {
      loadEnquiries();
    }
  }, [authed, enquiries.length, loading, loadEnquiries]);

  // Load available dates when authed — needed for conflict detection on the
  // enquiries tab too, not just the dates tab.
  useEffect(() => {
    if (authed && availableDates.length === 0 && !datesLoading) {
      loadAvailableDates();
    }
  }, [authed, availableDates.length, datesLoading, loadAvailableDates]);

  // Update enquiry status (mark as contacted / closed / new)
  const updateStatus = useCallback(async (id: string, status: "new" | "contacted" | "closed") => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update");
      setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
      toast.success(`Marked as ${status}`);
    } catch {
      toast.error("Failed to update enquiry");
    }
  }, []);

  // Delete an enquiry
  const deleteEnquiry = useCallback(async (id: string) => {
    if (!confirm("Delete this enquiry permanently? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      toast.success("Enquiry deleted");
    } catch {
      toast.error("Failed to delete enquiry");
    }
  }, []);

  // Add a new available date via POST /api/available-dates
  const addAvailableDate = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate) {
      toast.error("Pick a date first");
      return;
    }
    try {
      const body: { date: string; discount?: number; note?: string } = { date: newDate };
      if (newDiscount) body.discount = Math.min(100, Math.max(0, parseInt(newDiscount, 10)));
      if (newNote) body.note = newNote;
      const res = await fetch("/api/available-dates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to add");
      toast.success(`Added ${newDate}`);
      setNewDate("");
      setNewDiscount("");
      setNewNote("");
      loadAvailableDates();
    } catch {
      toast.error("Failed to add date");
    }
  }, [newDate, newDiscount, newNote, loadAvailableDates]);

  // Delete an available date via DELETE /api/available-dates/[id]
  const deleteAvailableDate = useCallback(async (id: string) => {
    if (!confirm("Remove this date from the calendar?")) return;
    try {
      const res = await fetch(`/api/available-dates/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setAvailableDates((prev) => prev.filter((d) => d.id !== id));
      toast.success("Date removed");
    } catch {
      toast.error("Failed to delete date");
    }
  }, []);

  // Cycle a date's status: open → held → booked → open
  const cycleDateStatus = useCallback(async (id: string, current: string) => {
    const next = current === "open" ? "held" : current === "held" ? "booked" : "open";
    try {
      const res = await fetch(`/api/available-dates/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error("Failed to update");
      setAvailableDates((prev) => prev.map((d) => (d.id === id ? { ...d, status: next } : d)));
      toast.success(`Marked as ${next}`);
    } catch {
      toast.error("Failed to update date");
    }
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // ignore
      }
      toast.success("Signed in to admin");
    } else {
      toast.error("Incorrect password");
    }
  }

  function handleSignOut() {
    setAuthed(false);
    setPassword("");
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
    setOpen(false);
    if (window.location.hash === "#admin") {
      history.replaceState(null, "", window.location.pathname);
    }
  }

  function handleClose() {
    setOpen(false);
    if (window.location.hash === "#admin") {
      history.replaceState(null, "", window.location.pathname);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Admin panel"
    >
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-muted/50 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
              <Inbox className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-serif text-lg font-semibold text-foreground">Esperanza Admin</h2>
              <p className="text-xs text-muted-foreground">Enquiries dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {authed && (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={loadEnquiries}
                  disabled={loading}
                  className="h-8 rounded-full"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="h-8 rounded-full"
                >
                  Sign out
                </Button>
              </>
            )}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close admin panel"
              className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {!authed ? (
            <div className="flex min-h-[300px] items-center justify-center p-8">
              <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
                <div className="text-center">
                  <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
                    <Lock className="h-6 w-6" />
                  </span>
                  <h3 className="font-serif text-xl font-semibold text-foreground">Admin sign in</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Enter the admin password to view enquiries.
                  </p>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="pr-10"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <Button type="submit" className="h-11 w-full rounded-full">
                  Sign in
                </Button>
                <p className="text-center text-[11px] text-muted-foreground">
                  Default password: <code className="rounded bg-muted px-1 py-0.5">esperanza2026</code>
                  <br />
                  (Change via <code className="rounded bg-muted px-1 py-0.5">NEXT_PUBLIC_ADMIN_PASSWORD</code> env var)
                </p>
              </form>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-sm text-destructive">{error}</p>
              <Button onClick={loadEnquiries} className="mt-4 rounded-full">
                Try again
              </Button>
            </div>
          ) : (
            <div className="p-4 sm:p-5">
              {/* Tab switcher */}
              <div className="mb-4 inline-flex rounded-full border border-border bg-muted/30 p-1">
                <button
                  type="button"
                  onClick={() => setTab("enquiries")}
                  className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors ${
                    tab === "enquiries" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Inbox className="h-3.5 w-3.5" />
                  Enquiries
                  {enquiries.length > 0 && (
                    <span className={`rounded-full px-1.5 text-[10px] ${tab === "enquiries" ? "bg-primary-foreground/20" : "bg-muted"}`}>
                      {enquiries.length}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setTab("dates")}
                  className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors ${
                    tab === "dates" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <CalendarDays className="h-3.5 w-3.5" />
                  Available dates
                  {availableDates.length > 0 && (
                    <span className={`rounded-full px-1.5 text-[10px] ${tab === "dates" ? "bg-primary-foreground/20" : "bg-muted"}`}>
                      {availableDates.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Enquiries tab */}
              {tab === "enquiries" && (
                <>
              {enquiries.length === 0 && !loading ? (
                <p className="py-12 text-center text-sm text-muted-foreground">
                  No enquiries yet. New enquiries will appear here.
                </p>
              ) : (
                <>
                  {/* Stats dashboard */}
                  <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
                    <StatCard label="Total" value={stats.total} />
                    <StatCard label="New" value={stats.newCount} accent="emerald" />
                    <StatCard label="Contacted" value={stats.contacted} accent="amber" />
                    <StatCard label="Closed" value={stats.closed} accent="slate" />
                    <StatCard label="This week" value={stats.thisWeek} accent="primary" />
                    <StatCard label="Conversion" value={`${stats.conversion}%`} accent="primary" />
                  </div>

                  {/* Conflicts warning */}
                  {stats.conflicts > 0 && (
                    <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                      <div>
                        <p className="text-sm font-medium text-rose-900">
                          {stats.conflicts} date {stats.conflicts === 1 ? "conflict" : "conflicts"} detected
                        </p>
                        <p className="text-xs text-rose-800/80">
                          {stats.conflicts === 1 ? "An enquiry has" : "Some enquiries have"} a wedding date that
                          matches a <strong>booked</strong> date in your calendar. Review and suggest
                          alternative dates to {stats.conflicts === 1 ? "this couple" : "these couples"}.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Filter pills */}
                  <div className="mb-3 flex flex-wrap items-center gap-1.5">
                    {(["all", "new", "contacted", "closed"] as const).map((f) => {
                      const count =
                        f === "all"
                          ? enquiries.length
                          : enquiries.filter((e) => e.status === f).length;
                      return (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setEnquiryFilter(f)}
                          className={`inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-xs font-medium capitalize transition-colors ${
                            enquiryFilter === f
                              ? "bg-primary text-primary-foreground"
                              : "border border-border bg-background text-foreground/70 hover:border-primary/30"
                          }`}
                        >
                          {f}
                          <span className={`rounded-full px-1 text-[10px] ${enquiryFilter === f ? "bg-primary-foreground/20" : "bg-muted"}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Enquiries list (filtered) */}
                  <div className="space-y-2">
                    {filteredEnquiries.length === 0 ? (
                      <p className="py-8 text-center text-sm text-muted-foreground">
                        No {enquiryFilter !== "all" ? enquiryFilter : ""} enquiries.
                      </p>
                    ) : (
                    filteredEnquiries.map((enq) => {
                      // Conflict: this enquiry's weddingDate matches a booked date
                      const hasConflict = enq.weddingDate ? bookedDatesSet.has(enq.weddingDate) : false;
                      return (
                      <div
                        key={enq.id}
                        className={`rounded-xl border bg-background p-4 transition-colors hover:border-primary/30 ${
                          hasConflict ? "border-rose-300 ring-1 ring-rose-200" : "border-border"
                        }`}
                      >
                        {/* Conflict badge */}
                        {hasConflict && (
                          <div className="mb-2 flex items-center gap-1.5 rounded-md bg-rose-100 px-2 py-1 text-[11px] font-medium text-rose-800">
                            <AlertCircle className="h-3 w-3" />
                            Date conflict: {new Date(enq.weddingDate!).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })} is booked
                          </div>
                        )}
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-serif text-base font-semibold text-foreground">
                                {enq.firstName} {enq.lastName}
                              </h3>
                              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                                enq.status === "new"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : enq.status === "contacted"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-slate-100 text-slate-600"
                              }`}>
                                {enq.status}
                              </span>
                            </div>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {new Date(enq.createdAt).toLocaleString("en-ZA", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })}
                            </p>
                          </div>
                          <div className="flex shrink-0 gap-1.5">
                            <a
                              href={`https://wa.me/${enq.phone.replace(/\D/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="grid h-8 w-8 place-items-center rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                              aria-label={`WhatsApp ${enq.firstName}`}
                            >
                              <WhatsAppIcon className="h-4 w-4" />
                            </a>
                            <a
                              href={`mailto:${enq.email}`}
                              className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary hover:bg-primary/20"
                              aria-label={`Email ${enq.firstName}`}
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                            {/* Mark as contacted / reopen */}
                            {enq.status === "new" ? (
                              <button
                                type="button"
                                onClick={() => updateStatus(enq.id, "contacted")}
                                aria-label="Mark as contacted"
                                title="Mark as contacted"
                                className="grid h-8 w-8 place-items-center rounded-full bg-amber-50 text-amber-700 hover:bg-amber-100"
                              >
                                <CheckCheck className="h-4 w-4" />
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => updateStatus(enq.id, "new")}
                                aria-label="Reopen as new"
                                title="Reopen as new"
                                className="grid h-8 w-8 place-items-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80"
                              >
                                <RotateCcw className="h-3.5 w-3.5" />
                              </button>
                            )}
                            {/* Close / mark closed */}
                            {enq.status !== "closed" && (
                              <button
                                type="button"
                                onClick={() => updateStatus(enq.id, "closed")}
                                aria-label="Mark as closed"
                                title="Mark as closed"
                                className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
                              >
                                <Lock className="h-3.5 w-3.5" />
                              </button>
                            )}
                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => deleteEnquiry(enq.id)}
                              aria-label="Delete enquiry"
                              title="Delete enquiry"
                              className="grid h-8 w-8 place-items-center rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Details grid */}
                        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs sm:grid-cols-4">
                          {enq.weddingDate && (
                            <div>
                              <dt className="text-muted-foreground">Date</dt>
                              <dd className="font-medium text-foreground">
                                {new Date(enq.weddingDate).toLocaleDateString("en-ZA", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </dd>
                            </div>
                          )}
                          {enq.guestCount != null && (
                            <div>
                              <dt className="text-muted-foreground">Guests</dt>
                              <dd className="font-medium text-foreground">{enq.guestCount}</dd>
                            </div>
                          )}
                          {enq.eventType && (
                            <div>
                              <dt className="text-muted-foreground">Event</dt>
                              <dd className="font-medium text-foreground">{enq.eventType}</dd>
                            </div>
                          )}
                          {enq.budget && (
                            <div>
                              <dt className="text-muted-foreground">Budget</dt>
                              <dd className="font-medium text-foreground">{enq.budget}</dd>
                            </div>
                          )}
                        </dl>

                        {/* Contact + message */}
                        <div className="mt-3 border-t border-border pt-3 text-xs">
                          <p className="text-muted-foreground">
                            <span className="font-medium text-foreground">{enq.email}</span> · {enq.phone}
                            {enq.packageInterest && ` · ${enq.packageInterest}`}
                          </p>
                          <p className="mt-2 leading-relaxed text-foreground/80">{enq.message}</p>
                        </div>
                      </div>
                      );
                    })
                    )}
                  </div>
                </>
              )}
                </>
              )}

              {/* Available dates tab */}
              {tab === "dates" && (
                <>
                  {/* Add date form */}
                  <form onSubmit={addAvailableDate} className="mb-4 rounded-xl border border-border bg-background p-4">
                    <h3 className="mb-3 flex items-center gap-2 font-serif text-sm font-semibold text-foreground">
                      <CalendarPlus className="h-4 w-4 text-primary" />
                      Add an available date
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div>
                        <label htmlFor="new-date" className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          Date
                        </label>
                        <input
                          id="new-date"
                          type="date"
                          value={newDate}
                          onChange={(e) => setNewDate(e.target.value)}
                          className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div>
                        <label htmlFor="new-discount" className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          Discount % (optional)
                        </label>
                        <input
                          id="new-discount"
                          type="number"
                          min={0}
                          max={100}
                          placeholder="15"
                          value={newDiscount}
                          onChange={(e) => setNewDiscount(e.target.value)}
                          className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div>
                        <label htmlFor="new-note" className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          Note (optional)
                        </label>
                        <input
                          id="new-note"
                          type="text"
                          placeholder="Weekday special"
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                    </div>
                    <Button type="submit" className="mt-3 h-9 rounded-full" disabled={!newDate}>
                      <CalendarPlus className="h-3.5 w-3.5" />
                      Add date
                    </Button>
                  </form>

                  {/* Dates list */}
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">{availableDates.length}</span> dates
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={loadAvailableDates}
                      disabled={datesLoading}
                      className="h-8 rounded-full"
                    >
                      <RefreshCw className={`h-3.5 w-3.5 ${datesLoading ? "animate-spin" : ""}`} />
                      Refresh
                    </Button>
                  </div>

                  {availableDates.length === 0 && !datesLoading ? (
                    <p className="py-12 text-center text-sm text-muted-foreground">
                      No dates yet. Add one above.
                    </p>
                  ) : (
                    <div className="space-y-1.5">
                      {availableDates.map((d) => (
                        <div
                          key={d.id}
                          className="flex items-center justify-between gap-2 rounded-lg border border-border bg-background p-3"
                        >
                          <div className="flex items-center gap-2.5">
                            <CalendarDays className="h-4 w-4 text-primary" />
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {new Date(d.date + "T00:00:00").toLocaleDateString("en-ZA", {
                                  weekday: "short",
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </p>
                              <p className="text-[11px] text-muted-foreground">
                                {d.isWeekend ? "Weekend" : "Weekday"}
                                {d.discount ? ` · -${d.discount}% discount` : ""}
                                {d.note ? ` · ${d.note}` : ""}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => cycleDateStatus(d.id, d.status)}
                              className={`rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider transition-colors ${
                                d.status === "open"
                                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                  : d.status === "held"
                                  ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                                  : "bg-rose-100 text-rose-700 hover:bg-rose-200"
                              }`}
                              title="Click to cycle: open → held → booked → open"
                            >
                              {d.status}
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteAvailableDate(d.id)}
                              aria-label="Delete date"
                              title="Delete date"
                              className="grid h-7 w-7 place-items-center rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Small stat card for the admin insights dashboard.
 */
function StatCard({
  label,
  value,
  accent = "slate",
}: {
  label: string;
  value: string | number;
  accent?: "slate" | "emerald" | "amber" | "primary";
}) {
  const accentClasses: Record<string, string> = {
    slate: "text-foreground",
    emerald: "text-emerald-700",
    amber: "text-amber-700",
    primary: "text-primary",
  };
  return (
    <div className="rounded-xl border border-border bg-background p-3 text-center">
      <p className={`font-serif text-xl font-semibold leading-none ${accentClasses[accent]}`}>
        {value}
      </p>
      <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

/* Keep TrendingUp import used (for future conversion-trend display) */
void TrendingUp;

