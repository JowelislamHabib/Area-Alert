# AreaAlert

## Commands

```sh
npm run dev      # Next.js 16 dev server (Turbopark default)
npm run build    # Production build (includes TS check via next build)
npm run lint     # ESLint (flat config, eslint.config.mjs – core-web-vitals + TS)
npm run start    # Start production server
```

## Architecture

- **Next.js 16 App Router** (React 19). Server components by default; add `"use client"` for interactivity.
- **Tailwind CSS v4** — `@import "tailwindcss"`, `@theme inline {}`, `oklch()` colors. PostCSS via `@tailwindcss/postcss`.
- **`tw-animate-css`** imported in `globals.css` for animation utilities.
- **`@/` path alias** maps to `./src/*`.
- **Fonts**: Geist (Geist + Geist_Mono) via `next/font/google` – set as `--font-geist-sans` / `--font-geist-mono` CSS variables.

## Auth (Better Auth)

- **Server config**: `src/lib/auth.ts` — `betterAuth()` with `mongodbAdapter` (MongoDB, DB `AreaAlert`). Email/password + Google OAuth. Schema auto-managed.
- **Client**: `src/lib/auth-client.ts` — exports `signIn`, `signUp`, `useSession` via `createAuthClient`.
- **API catch-all**: `src/app/api/auth/[...all]/route.ts` handles all auth endpoints via `toNextJsHandler(auth)`.
- **Env required**: `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.

## UI / Components

- **shadcn/ui `base-nova`** — uses `@base-ui/react` primitives (NOT Radix UI).
- **All UI components** in `src/components/ui/` use `cn()` from `@/lib/utils` (`clsx` + `tailwind-merge`).
- **Toast**: Sonner `<Toaster position="top-center" richColors />` in root layout. Import `toast` from `sonner`.
- **Icons**: `lucide-react`.
- **Charts (planned)**: Recharts per `GUIDE.md` — not yet installed.
- **Form patterns**: `useState` for controlled inputs + `useActionState` for pending states. `noValidate` on forms — custom validation only.
- **Session gating in Navbar**: `useSession` from `better-auth/react`; `authClient.signOut()` for logout.

## Directory Layout

```
src/
  app/                    # Next.js App Router pages + API routes
    (auth)/               # Route group — /login, /register
    api/auth/[...all]/    # Better Auth handler
  components/
    ui/                   # shadcn primitives (button, card, input, label, dropdown-menu, sheet)
    shared/               # Navbar, Footer
    pages/                # Page-specific (home/ sections only; rest unimplemented)
    designs/              # Empty (future)
    modals/               # Empty (future)
  lib/
    auth.ts               # Server auth config
    auth-client.ts        # Client auth client
    utils.ts              # cn() helper
    api/uploadImage.ts    # ImgBB upload + URL validation
    actions/              # Empty (future server actions)
    core/                 # Empty (future business logic)
```

## Project State

- Auth system is functional (login, register, Google OAuth, session, navbar gating).
- Home page is built (Hero, Features, Categories, Stats, HowItWorks, CTA sections).
- Everything else (Reports CRUD, Explore, Dashboard, About, Contact, charts) is **not implemented**.
- `PLAN.md` contains full product spec for remaining work. **Excluded from git** (`.gitignore`).

## Conventions

- **Image upload**: ImgBB API via `src/lib/api/uploadImage.ts`. Key from `NEXT_PUBLIC_IMAGE_UPLOAD_API`.
- **Password validation** (registration): 6+ chars, 1 uppercase, 1 number, 1 special char — show rule checklist inline with check/x icons.
- **Env keys present**: Stripe keys (`PUBLISHABLE` + `SECRET`) exist in `.env` but are unused.
- **ESLint**: Flat config (`eslint.config.mjs`), extends `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`. No Prettier or formatter config.
