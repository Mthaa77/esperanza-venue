import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div
      id={id}
      className={cn(
        "max-w-3xl scroll-mt-24",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-gold-gradient",
            align === "center" && "flex items-center justify-center gap-3"
          )}
        >
          {align === "center" && (
            <>
              <span className="h-px w-14 bg-gradient-to-r from-transparent via-amber-500/40 to-amber-500/80" aria-hidden="true" />
              <span className="grid size-5 place-items-center rounded-full border border-amber-500/45 text-[9px] text-amber-600" aria-hidden="true">✦</span>
              {eyebrow}
              <span className="grid size-5 place-items-center rounded-full border border-amber-500/45 text-[9px] text-amber-600" aria-hidden="true">✦</span>
              <span className="h-px w-14 bg-gradient-to-l from-transparent via-amber-500/40 to-amber-500/80" aria-hidden="true" />
            </>
          )}
          {align === "left" && eyebrow}
        </p>
      )}
      <h2
        className="text-3xl font-semibold leading-tight tracking-tight text-foreground text-balance sm:text-4xl lg:text-5xl"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg text-balance">
          {description}
        </p>
      )}
    </div>
  );
}
