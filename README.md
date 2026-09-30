# Esperanza Wedding Venue

Single-page marketing site for Esperanza Wedding Venue (Pretoria East) — Next.js 16, Tailwind 4, shadcn/ui, Prisma + SQLite.

## Run locally

```bash
bun install
cp .env.example .env
mkdir -p db
bun run db:push
bun run prisma/seed.ts   # loads packages + testimonials
bun run dev              # http://localhost:3000
```

## Notes
- Content and contact details live in `src/components/site/data.ts`.
- Packages and testimonials are read from the database at request time (revalidated hourly).
- Homepage motion respects `prefers-reduced-motion`.
