# XOrithm Status Dashboard

A real-time server status dashboard built with Next.js, Tailwind CSS, and NextAuth.js. Monitor the health of your infrastructure at a glance with live status indicators, filtering, and detailed server metrics.

---

## Live Demo

[https://xorithm-server-status.vercel.app](https://xorithm-server-status.vercel.app)

**Demo credentials:**
- Email: `demo@xorithm.com`
- Password: `demo1234`

---

## Features

- **Authentication** — Sign up, log in, and log out with email and password. Routes are protected via Next.js middleware.
- **Server list** — View all servers with color-coded status badges (Up, Degraded, Down).
- **Filter & sort** — Filter by status and sort by name, response time, or uptime.
- **Detail view** — Click any server card to see name, IP address, response time, and uptime in a modal.
- **Auto-refresh** — Dashboard revalidates every 30 seconds with a live countdown timer and manual refresh button.
- **Loading skeletons** — Skeleton cards shown while data loads for a polished experience.
- **Empty state** — Friendly message with a clear filter option when no servers match the current filter.
- **Animations** — Cards stagger in on load, modal slides up on open, cards lift on hover.
- **Responsive** — Fully usable on mobile, tablet, and desktop.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Auth:** NextAuth.js (Credentials provider, JWT sessions)
- **Language:** TypeScript
- **Deployment:** Vercel

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AhmedAmirSalem/xorithm-status-dashboard.git
cd xorithm-status-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
NEXTAUTH_SECRET=your-random-secret-here
NEXTAUTH_URL=http://localhost:3000
```

Generate a secret with:
```bash
openssl rand -base64 32
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── [...nextauth]/route.ts   # NextAuth handler
│   │       └── signup/route.ts          # Registration endpoint
│   ├── (auth)/
│   │   ├── login/page.tsx               # Login page
│   │   └── signup/page.tsx              # Signup page
│   ├── dashboard/
│   │   ├── page.tsx                     # Dashboard page
│   │   └── loading.tsx                  # Skeleton loading state
│   ├── layout.tsx                       # Root layout with SessionProvider
│   └── page.tsx                         # Root redirect → /dashboard
├── components/
│   ├── dashboard/
│   │   ├── DashboardClient.tsx          # Client state management
│   │   ├── FilterBar.tsx                # Filter tabs + sort dropdown
│   │   ├── RefreshBar.tsx               # Auto-refresh countdown
│   │   ├── ServerDetailModal.tsx        # Server detail modal
│   │   ├── ServerGrid.tsx               # Server card grid + empty state
│   │   └── SummaryCards.tsx             # Up/Degraded/Down stat cards
│   ├── Navbar.tsx                       # Top navigation bar
│   ├── NavbarClient.tsx                 # Client-side sign out button
│   ├── ServerCard.tsx                   # Individual server card
│   ├── SkeletonCard.tsx                 # Loading skeleton card
│   └── StatusBadge.tsx                  # Color-coded status pill
├── lib/
│   ├── auth.ts                          # NextAuth configuration
│   ├── mock-servers.ts                  # Static server data
│   └── mock-users.ts                    # JSON-persisted user store
├── types/
│   └── next-auth.d.ts                   # Session type augmentation
└── middleware.ts                        # Route protection
```

---

## Design Choices

### Authentication
NextAuth.js with the Credentials provider was chosen for its tight Next.js integration, built-in JWT session handling, and easy upgrade path to a real database via its adapter system. Users are currently persisted to a local `users.json` file, which survives server restarts and can be replaced with a database adapter (e.g. Prisma + PostgreSQL) with no changes to the rest of the codebase.

### Data Layer
Server data lives in `mock-servers.ts` as a static TypeScript array, satisfying the requirements for mock/static data. The structure mirrors what a real monitoring API would return, making it straightforward to swap in a live data source later.

### Component Architecture
The dashboard is split into focused single-responsibility components grouped under `components/dashboard/`. Interactive state (filter, sort, selected server, countdown) is owned by `DashboardClient.tsx` and passed down as props, keeping the logic centralised and the display components pure.

### Auto-refresh
The 30-second auto-refresh with a visual countdown bar simulates the real-world pattern of a monitoring frontend periodically polling a backend for the latest server health snapshot. The refresh function is designed to be replaced with an actual API call with no structural changes.

### Styling
Tailwind CSS utility classes are used throughout with a dark theme (`gray-950` base) chosen to match the aesthetic of professional status dashboards like those from Stripe and Linear.

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXTAUTH_SECRET` | Secret used to sign JWT tokens. Generate with `openssl rand -base64 32`. |
| `NEXTAUTH_URL` | Base URL of the application. Use `http://localhost:3000` for local development. |

---

## Deployment

The project is deployed on Vercel. To deploy your own instance:

1. Push the repository to GitHub.
2. Import the project at [vercel.com](https://vercel.com).
3. Add `NEXTAUTH_SECRET` and `NEXTAUTH_URL` as environment variables.
4. Click Deploy.
