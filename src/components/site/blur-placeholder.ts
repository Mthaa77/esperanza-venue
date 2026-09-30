/**
 * A tiny shared base64 blur placeholder (a warm neutral gradient) used by
 * Next.js Image's `placeholder="blur"` + `blurDataURL` for static images
 * that don't have an auto-generated blur placeholder.
 *
 * The SVG is 8x6 pixels, base64-encoded, and uses the brand's warm cream
 * tone so it blends with the site background while the real image loads.
 *
 * Using a shared placeholder keeps the HTML small (one string reused
 * across all images) rather than generating per-image LQIPs at build time.
 */

// 8x6 SVG with a warm gradient from cream to muted amber, base64-encoded.
const BLUR_SVG =
  "data:image/svg+xml;base64," +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="6">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f5efe0"/>
          <stop offset="1" stop-color="#d4c4a0"/>
        </linearGradient>
      </defs>
      <rect width="8" height="6" fill="url(#g)"/>
    </svg>`
  ).toString("base64");

export const SHARED_BLUR_DATA_URL = BLUR_SVG;
