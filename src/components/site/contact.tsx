import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { EnquiryForm } from "./enquiry-form";
import { Newsletter } from "./newsletter";
import { Directions } from "./directions";
import { CONTACT } from "./data";
import { WhatsAppIcon } from "./icons";

export function Contact() {
  const waMarina = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hi Marina, I'd like to enquire about a date at Esperanza."
  )}`;
  const waChrista = `https://wa.me/${CONTACT.whatsappChrista}?text=${encodeURIComponent(
    "Hi Christa, I'd like to enquire about a date at Esperanza."
  )}`;

  const mapEmbed = `https://www.google.com/maps?q=${CONTACT.mapQuery}&output=embed`;

  return (
    <section id="contact" className="scroll-mt-20 bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get in touch"
          title="Book a viewing"
          description="Viewings are by appointment only — and mobile signal on the farm is poor for voice calls, so WhatsApp is by far the best first contact. Drop your details below and we'll WhatsApp you to set up a time."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          {/* Contact details */}
          <div className="space-y-6 lg:col-span-2">
            {/* WhatsApp-first CTA */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-500 text-white">
                  <WhatsAppIcon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    WhatsApp us first
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Mobile signal on the farm is poor — WhatsApp is the fastest reply.
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <a
                  href={waMarina}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg bg-background px-4 py-2.5 text-sm transition-colors hover:bg-emerald-100"
                >
                  <span>
                    <span className="font-medium text-foreground">Marina</span>{" "}
                    <span className="text-muted-foreground">· Owner</span>
                  </span>
                  <span className="font-mono text-xs text-foreground">{CONTACT.phoneMarinaDisplay}</span>
                </a>
                <a
                  href={waChrista}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg bg-background px-4 py-2.5 text-sm transition-colors hover:bg-emerald-100"
                >
                  <span>
                    <span className="font-medium text-foreground">Christa</span>{" "}
                    <span className="text-muted-foreground">· Coordinator</span>
                  </span>
                  <span className="font-mono text-xs text-foreground">{CONTACT.phoneChristaDisplay}</span>
                </a>
              </div>
            </div>

            {/* Other contact methods */}
            <div className="space-y-3 rounded-2xl border border-border bg-card p-5">
              <ContactRow icon={Mail} label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
              <ContactRow icon={Phone} label="Phone (Marina)" value={CONTACT.phoneMarinaDisplay} href={`tel:${CONTACT.phoneMarina.replace(/\s/g, "")}`} />
              <ContactRow icon={Phone} label="Phone (Christa)" value={CONTACT.phoneChristaDisplay} href={`tel:${CONTACT.phoneChrista.replace(/\s/g, "")}`} />
              <ContactRow icon={Clock} label="Hours" value="Viewings by appointment" />
              <ContactRow icon={MapPin} label="Address" value={CONTACT.address} />
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
              <iframe
                title="Esperanza Wedding Venue location map"
                src={mapEmbed}
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <p className="flex items-start gap-2 text-xs text-muted-foreground">
              <MessageCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Visitors must request a pin location to find the property — the farm is in the
              Mooiplaats smallholdings and sat-nav can be misleading.
            </p>

            {/* Directions card — turn-by-turn + landmarks + arrival info */}
            <Directions />
          </div>

          {/* Form + Newsletter */}
          <div className="space-y-6 lg:col-span-3">
            <div id="enquiry" className="scroll-mt-24">
              <div className="mb-4 flex items-center gap-2">
                <h3 className="font-serif text-xl font-semibold text-foreground">Enquiry form</h3>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                  Reply within 48h
                </span>
              </div>
              <EnquiryForm />
            </div>
            <Newsletter />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/60">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="text-sm text-foreground break-words">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block">
      {inner}
    </a>
  ) : (
    inner
  );
}
