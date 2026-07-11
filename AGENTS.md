# AreaAlert

## Commands

```sh
npm run dev      # Next.js 16 dev server with Turbopack
npm run build    # Production build (compiles + TS check)
npm run lint     # ESLint (flat config, eslint.config.mjs)
```

## Architecture

- **Next.js 16 App Router** (React 19). Server components by default; add `"use client"` for interactivity.
- **Tailwind CSS v4** — uses `@import`, `@theme inline {}`, `oklch()` colors. PostCSS plugin `@tailwindcss/postcss`.
- **`@/` path alias** maps to `./src/*`.

## Auth (Better Auth)

- **Server config**: `src/lib/auth.ts` — `betterAuth()` with `mongodbAdapter` (MongoDB, DB `AreaAlert`). Email/password + Google OAuth. Schema auto-managed.
- **Client**: `src/lib/auth-client.ts` — exports `signIn`, `signUp`, `useSession` via `createAuthClient`.
- **API catch-all**: `src/app/api/auth/[...all]/route.ts` handles all auth endpoints via `toNextJsHandler(auth)`.
- **Env required**: `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.

## UI / Components

- **shadcn/ui style `base-nova`** — uses `@base-ui/react` primitives (NOT Radix UI). Components use `data-slot` attributes.
- **All UI components** in `src/components/ui/` use `cn()` from `@/lib/utils` (`clsx` + `tailwind-merge`).
- **Toast**: Sonner `<Toaster position="top-center" richColors />` in root layout. Import `toast` from `sonner`.
- **Icons**: `lucide-react`.
- **Form patterns**: Use `useState` for controlled inputs + `useActionState` for form pending states. `noValidate` on forms to suppress browser defaults in favor of custom validation.

## Directory Layout

```
src/
  app/            # Next.js App Router pages + API routes
    (auth)/       # Route group — /login, /register
    api/auth/[...all]/  # Better Auth handler
  components/
    ui/           # shadcn primitives
    shared/       # Shared layout (Navbar)
    pages/        # Page-specific components (mostly empty)
  lib/
    auth.ts       # Server auth config
    auth-client.ts # Client auth client
    utils.ts      # cn() helper
    api/          # API utility functions (uploadImage)
```

## Project State

- Auth system is functional (login, register, Google OAuth, session).
- Everything else (Report CRUD, Explore, Dashboard, About, Contact) is **not implemented**.
- `PLAN.md` contains full product spec for remaining work.

## Conventions

- Image upload: ImgBB API via `src/lib/api/uploadImage.ts`. Key from `NEXT_PUBLIC_IMAGE_UPLOAD_API`.
- Password validation (registration): 6+ chars, 1 uppercase, 1 number, 1 special char — show rule checklist inline.
- `useSession` from `better-auth/react` is available but not yet used for UI gating.
