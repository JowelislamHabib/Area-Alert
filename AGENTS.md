<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AreaAlert

Community utility outage platform (Bangladesh). Next.js 16.2.10, Tailwind CSS v4, shadcn/ui (base-nova).

## Commands

```sh
npm run dev      # Next.js dev server (Turbopack)
npm run build    # Production build + TypeScript check
npm run lint     # ESLint (core-web-vitals + typescript presets)
```

## Stack quirks

- **shadcn/ui style is `base-nova`** — all primitives come from `@base-ui/react`, NOT `@radix-ui/react`. No `asChild`/`Slot` pattern; use `render` prop instead (see `src/components/ui/sheet.tsx:65` for the pattern).
- **Tailwind CSS v4** — uses `@import "tailwindcss"` (not v3 `@tailwind` directives). Uses `@tailwindcss/postcss` plugin. Theme vars use `oklch()` colors. No `tailwind.config.js` — theme is in `globals.css` via `@theme`.
- **React 19** — no `React.FC`, no `defaultProps` on components.
- **Add components**: `npx shadcn@latest add <component> -y`
- **cn() utility**: `tailwind-merge` + `clsx` at `src/lib/utils.ts`
- **Icons**: `lucide-react`
- **Fonts**: Geist Sans / Geist Mono via `next/font/google`
- **Path alias**: `@/*` → `./src/*`

## Auth

Not implemented yet. Login/register pages are shells. `betterAuth` planned. Do not add auth middleware or API routes.

## Project state

Early scaffold. Source structure:
- `src/app/page.tsx` — default Next.js starter (unused)
- `src/app/(auth)/login/` — shell page, `/register/` is empty
- `src/components/shared/Navbar/Navbar.tsx` — client component, sticky nav
- `src/components/ui/` — shadcn/components (only button, sheet installed)

## PLAN.md

Full PRD in repo root. Navigation structure:
- **Logged out**: Home, Explore Reports, About, Contact, Login, Register
- **Logged in**: adds Add Report, My Reports, replaces Login/Register with Logout
