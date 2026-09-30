"use client";

/**
 * Top scroll-progress bar (thin gold gradient, width = scroll percentage).
 *
 * The active-section state is owned by the Header via useScrollState(),
 * and this component receives the progress value as a prop — so we have a
 * single IntersectionObserver + scroll listener for the whole header.
 */
export function ScrollProgress({ progress }: { progress: number }) {
  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-primary via-amber-500 to-primary transition-[width] duration-150"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

/**
 * Inline styles that highlight the active desktop nav link via attribute selector.
 * Kept as a style block so the desktop nav stays decoupled from React state.
 */
export function ActiveSectionStyles({ activeSection }: { activeSection: string }) {
  const activeHref = activeSection || "";
  return (
    <style>{`
      nav[data-main-nav] a[data-target="${activeHref}"] {
        color: var(--primary) !important;
        position: relative;
      }
      nav[data-main-nav] a[data-target="${activeHref}"]::after {
        content: "";
        position: absolute;
        left: 12px;
        right: 12px;
        bottom: 6px;
        height: 2px;
        background: var(--primary);
        border-radius: 2px;
      }
    `}</style>
  );
}
