# AreaAlert

<p align="center">
  <img src="public/areaalert-logo.png" alt="AreaAlert Logo" width="120" />
</p>

<p align="center">
  <strong>Community Utility Outage & Service Status Platform</strong>
</p>

<p align="center">
  <a href="https://area-alert-opal.vercel.app">
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

| Category           | Technology                  |
| ------------------ | --------------------------- |
| **Framework**      | Next.js 16 (App Router)     |
| **UI Library**     | React 19                    |
| **Language**       | TypeScript 5                |
| **Styling**        | Tailwind CSS v4             |
| **UI Components**  | shadcn/ui (base-nova style) |
| **Authentication** | Better Auth                 |
| **Database**       | MongoDB                     |
| **Deployment**     | Vercel                      |
| **Icons**          | Lucide React                |
| **Charts**         | Recharts                    |
| **Animations**     | Framer Motion               |
| **Form Handling**  | React Server Actions        |

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  App Router   │  │   Auth Flow  │  │  UI Layer    │  │
│  │  (Pages)      │  │  (Better     │  │  (shadcn/ui) │  │
│  │               │  │   Auth)      │  │              │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────────┘  │
│         │                 │                             │
│  ┌──────▼─────────────────▼──────┐                     │
│  │      Server Actions Layer      │                     │
│  │   (Authentication + JWT)       │                     │
│  └──────────────┬────────────────┘                     │
└─────────────────┼───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│                 EXTERNAL BACKEND API                    │
│            (Report CRUD & Business Logic)               │
└─────────────────────────────────────────────────────────┘
```

### Two-Tier Design

- **Frontend** handles UI, authentication, and user sessions via Better Auth
- **Backend** manages report data, business logic, and external integrations
- Server Actions proxy requests between the two with JWT authorization

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- External backend API running at `NEXT_PUBLIC_BASE_URL`

### Installation

```bash
git clone https://github.com/yourusername/area-alert.git
cd area-alert
npm install
```

### Environment Setup

Create a `.env.local` file:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Better Auth
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# External Backend
NEXT_PUBLIC_BASE_URL=http://localhost:8000

# Image Upload
NEXT_PUBLIC_IMAGE_UPLOAD_API=your_imgbb_api_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production

```bash
npm run build
npm run start
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
│   └── api/auth/                 # Better Auth handler
├── components/
│   ├── ui/                       # shadcn/base-ui components
│   ├── shared/                   # Navbar, Footer, ThemeProvider
│   └── pages/                    # Page-specific components
├── lib/
│   ├── auth.ts                   # Better Auth server config
│   ├── auth-client.ts            # Better Auth client
│   ├── actions/report.ts         # Server actions
│   └── types.ts                  # TypeScript definitions
└── public/
    └── data/area.json            # District/Area hierarchy
```

---

## Server Actions

All server actions authenticate via session, then proxy to the external backend:

```typescript
// Server-side session validation
const session = await auth.api.getSession({ headers: await headers() });

// JWT token extraction for backend calls
const token = await getTokenServer();
// Passed as: Authorization: Bearer <token>
```

| Action               | Method | Endpoint                  | Auth |
| -------------------- | ------ | ------------------------- | ---- |
| `createReport`       | POST   | `/api/reports`            | Yes  |
| `getReports`         | GET    | `/api/reports`            | No   |
| `voteReport`         | POST   | `/api/reports/:id/vote`   | Yes  |
| `updateReportStatus` | PUT    | `/api/reports/:id/status` | Yes  |
| `deleteReport`       | DELETE | `/api/reports/:id`        | Yes  |
| `updateReport`       | PATCH  | `/api/reports/:id`        | Yes  |

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

- GitHub: [@yourusername](https://github.com/JowelislamHabib)
- LinkedIn: [Your Name](https://www.linkedin.com/in/jowelislamhabib/)
- Email: your.email@example.com
