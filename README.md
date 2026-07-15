<p align="center">
  <img src="public/areaalert-logo.png" alt="AreaAlert Logo" width="420" />
</p>

<p align="center">
  <strong>Community Utility Outage & Service Status Platform</strong>
</p>

<p align="center">
  <a href="https://area-alert-bd.vercel.app">
    <img src="https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  <img src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

---

## Overview

**AreaAlert** is a full-stack community reporting platform that enables residents to report and track utility outages (electricity, internet, water, gas, floods) in their neighborhoods. By turning individual reports into collective insight, it helps citizens, journalists, researchers, NGOs, and local authorities identify patterns and respond more effectively.

### The Problem

In Bangladesh, utility outages are frequent and unpredictable. Residents waste hours discovering outages the hard way. AreaAlert creates a transparent, community-driven record of service issues — saving time, reducing frustration, and empowering informed decisions.

---

## Features

### Reporting System

- Multi-step report submission with field validation
- Support for 5 utility types: Electricity, Internet, Water, Gas, Flood
- Image upload via ImgBB integration
- Automatic location-based organization

### Community Verification

- Upvote/downvote system for report validation
- "Resolved" voting to confirm service restoration
- Reporter attribution with profiles
- Trust signals through community consensus

### Smart Discovery

- Advanced filtering by district, area, utility type, status
- Date range filtering for historical analysis
- Real-time search with pagination
- Comprehensive report statistics

### Interactive Safety Map

- Geographic visualization of outages by district and area
- Tabbed interface for district vs. area views
- Color-coded severity indicators

### Authentication and Security

- Email/password authentication with secure sessions
- Google OAuth integration
- Role-based access control (Admin, User)
- Session caching for performance

### Admin Dashboard

- User management with ban/unban capabilities
- Report moderation and status updates
- System statistics and analytics
- Role-based route protection

### User Experience

- Dark/light mode with system preference detection
- Fully responsive across mobile, tablet, and desktop
- Smooth scroll animations
- Accessible components following WCAG guidelines

---

## Tech Stack

| Category       | Technology                             |
| -------------- | -------------------------------------- |
| **Frontend**   | Next.js 16 (App Router), React 19      |
| **Backend**    | Express 5, TypeScript                  |
| **Database**   | MongoDB (native driver, no Mongoose)   |
| **Auth**       | Better Auth (frontend), JWKS (backend) |
| **Build**      | esbuild (backend), Next.js (frontend)  |
| **Styling**    | Tailwind CSS v4, shadcn/ui             |
| **Deployment** | Vercel (both frontend and backend)     |
| **Icons**      | Lucide React                           |
| **Charts**     | Recharts                               |
| **Animations** | Framer Motion                          |

---

## Architecture

The system runs as two separate Vercel deployments communicating over HTTP:

```
+-------------------------------------------------------------------+
|                       FRONTEND (Next.js 16)                       |
|                                                                   |
|   +--------------+   +--------------+   +--------------+          |
|   |  App Router  |   |  Auth Flow   |   |   UI Layer   |          |
|   |   (Pages)    |   |(Better Auth) |   | (shadcn/ui)  |          |
|   +------+-------+   +------+-------+   +--------------+          |
|          |                  |                                     |
|          |              (MongoDB)                                 |
|          |                  |                                     |
|   +------v------------------v------+                              |
|   |      Server Actions Layer      |                              |
|   |     (Authentication + JWT)     |                              |
|   +----------------+---------------+                              |
+--------------------+----------------------------------------------+
                     |
                     | JWT token
                     +--> Authorization: Bearer <token>
                     |
                     v
+-------------------------------------------------------------------+
|                       EXTERNAL BACKEND API                        |
|                         (Express 5 API)                           |
|                 (Report CRUD & Business Logic)                    |
|                                                                   |
|                            (MongoDB)                              |
+-------------------------------------------------------------------+
```

### How Auth Works Across the Boundary

The frontend owns authentication via Better Auth (connected directly to MongoDB). When server actions need to call the backend, they extract a JWT from the session and pass it in the `Authorization` header. The backend verifies the JWT by fetching the JWKS endpoint from the frontend (`${CLIENT_URL}/api/auth/jwks`) — it never handles passwords or sessions directly.

### Backend Details

- **Express 5** (beta) with TypeScript
- **MongoDB native driver** — no ORM, direct collection access
- **esbuild** bundles to a single `api/index.js` for Vercel serverless
- **Role-based access**: `verifyToken` (JWT validation), `verifyReporter` (user or admin), `verifyAdmin` (admin only)
- **Safety stats endpoint** uses MongoDB aggregation pipeline to compute per-district/area safety scores

---

## Getting Started

This project has two repositories:

- **Frontend**: `area-alert` (this repo) — Next.js 16
- **Backend**: `area-alert-backend` ([Area-Alert-Backend](https://github.com/JowelislamHabib/Area-Alert-Backend)) — Express 5 API server

Both must be running for full functionality.

### Prerequisites

- Node.js 18+
- MongoDB database (shared between frontend and backend)
- Backend running at `http://localhost:8000`

### Frontend Setup

```bash
git clone https://github.com/JowelislamHabib/area-alert.git
cd area-alert
npm install
```

Create a `.env.local` file:

```env
# MongoDB (for Better Auth)
MONGODB_URI=your_mongodb_connection_string

# Better Auth
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Backend API
NEXT_PUBLIC_BASE_URL=http://localhost:8000

# Image Upload (ImgBB)
NEXT_PUBLIC_IMAGE_UPLOAD_API=your_imgbb_api_key
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Backend Setup

```bash
git clone https://github.com/JowelislamHabib/area-alert-backend.git
cd area-alert-backend
npm install
```

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=8000
CLIENT_URL=http://localhost:3000
```

```bash
npm run dev
```

Backend runs on [http://localhost:8000](http://localhost:8000).

### Production

```bash
# Frontend
npm run build && npm run start

# Backend
npm run build && npm start
```

---

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Login/Register pages
│   ├── admin/                    # Admin dashboard
│   ├── reports/                  # Reports and Report detail
│   ├── safety-map/               # Interactive outage map
│   ├── about/, contact/, etc.    # Static pages
│   └── api/auth/[...all]/        # Better Auth catch-all handler
├── components/
│   ├── ui/                       # shadcn/base-ui components (19)
│   ├── shared/                   # Navbar, Footer, ThemeProvider
│   ├── home/, reports/, admin/   # Page-specific components
│   └── safety-map/, about/, etc.
├── lib/
│   ├── auth.ts                   # Better Auth server config
│   ├── auth-client.ts            # Better Auth client
│   ├── actions/
│   │   ├── report.ts             # Report CRUD server actions
│   │   └── admin.ts              # Admin server actions
│   ├── api/uploadImage.ts        # ImgBB image upload
│   ├── getTokenServer.ts         # JWT extraction for backend calls
│   ├── types.ts                  # TypeScript definitions
│   └── utils.ts                  # cn() and helpers
├── proxy.ts                      # Route protection logic (not wired up as middleware)
└── public/
    └── data/area.json            # District/Area hierarchy
```

---

## Server Actions

Server actions authenticate via Better Auth session, then proxy to the Express backend with a JWT bearer token:

```typescript
// Server-side session validation
const session = await auth.api.getSession({ headers: await headers() });

// JWT token extraction for backend calls
const token = await getTokenServer();
// Passed as: Authorization: Bearer <token>
```

### Report actions (`src/lib/actions/report.ts`)

| Action               | Method | Endpoint                    | Auth |
| -------------------- | ------ | --------------------------- | ---- |
| `createReport`       | POST   | `/api/reports`              | Yes  |
| `getReports`         | GET    | `/api/reports`              | No   |
| `getReportById`      | GET    | `/api/reports/:id`          | No   |
| `getReportStatsData` | GET    | `/api/reports/safety-stats` | No   |
| `voteReport`         | POST   | `/api/reports/:id/vote`     | Yes  |
| `updateReportStatus` | PUT    | `/api/reports/:id/status`   | Yes  |
| `deleteReport`       | DELETE | `/api/reports/:id`          | Yes  |
| `updateReport`       | PATCH  | `/api/reports/:id`          | Yes  |

### Admin actions (`src/lib/actions/admin.ts`)

| Action              | Method | Endpoint                  | Auth  |
| ------------------- | ------ | ------------------------- | ----- |
| `getAdminUserStats` | GET    | `/api/admin/users-stats`  | Admin |

---

## Use Cases

| Persona          | How They Use AreaAlert                  |
| ---------------- | --------------------------------------- |
| Residents        | Check outages before leaving home       |
| Parents          | Plan routes avoiding waterlogged areas  |
| Remote Workers   | Verify internet status before meetings  |
| Travelers        | Check conditions along travel routes    |
| Journalists      | Investigate outage patterns for stories |
| Researchers      | Analyze urban infrastructure trends     |
| Local Government | Prioritize maintenance based on reports |
| Small Businesses | Plan operations around utility status   |
| NGOs             | Coordinate relief efforts during crises |

---

## Deployment

Deployed on Vercel with zero configuration:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/area-alert)

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Author

**Jowel Islam Habib**

- GitHub: [@JowelislamHabib](https://github.com/JowelislamHabib)
- LinkedIn: [Jowel Islam Habib](https://www.linkedin.com/in/jowelislamhabib/)
- Email: [Jowel@Bintofajjal.com](mailto:Jowel@Bintofajjal.com)
