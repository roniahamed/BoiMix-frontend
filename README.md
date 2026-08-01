# BoiMix Book Marketplace

BoiMix is a reader-first platform for buying, selling, borrowing, and exchanging books across local communities in Bangladesh. It helps students, collectors, casual readers, and book owners discover nearby listings, manage personal libraries, and connect with trusted readers. Users can browse marketplace books, borrow from the Central Library, propose peer-to-peer exchanges, track orders, manage wallet activity, and keep conversations in one dashboard. The product combines discovery, trust signals, profile reputation, and operational workflows so book circulation feels easier and more reliable.

## Live Demo

- Production Website: Not configured in this repository
- Staging: Not configured in this repository
- Preview Deployment: Not configured in this repository

<!-- ## Screenshots

Available repository assets:

![BoiMix public profile preview](images/public%20profiles.png)
![BoiMix activity preview](images/activity%20image.png)

Suggested screenshots to add before release:

- Home
- Books listing
- Book details
- Dashboard overview
- Mobile navigation
- Authentication -->

## Features

- Responsive book marketplace for buying, borrowing, and exchanging books
- Central Library browsing with featured books, collections, categories, and membership flows
- Book listing, search, filtering, category, trending, new, nearby, and top-rated routes
- Book detail pages with gallery, reviews, Q&A, wishlist, cart, borrow, buy, and exchange actions
- Peer-to-peer exchange discovery, offer creation, offer management, and exchange tracking screens
- Borrow checkout, active borrow tracking, deposits, disputes, extension requests, return validation, and peer review modals
- Buy cart, borrow cart, checkout, order success, payment, and order tracking screens
- User dashboard for overview, action center, library, reading tracker, borrowing, lending, exchanges, sales, orders, wallet, messages, notifications, reports, settings, security, and verification
- Public profile pages with activity, library, reviews, badges, reputation, verification, and location details
- Authentication screens for login, registration, OTP verification, student ID verification, profile completion, password reset, and language choice
- Zustand-powered local state for auth, carts, wishlist, filters, search, UI state, theme, orders, borrow flows, exchanges, and messages
- TanStack Query data-fetching helpers with shared query keys and cache defaults
- Axios API client with configurable base URL, bearer token injection, timeout handling, and normalized errors
- Mock Next.js API routes backed by local data for books, profiles, categories, readers, sponsors, testimonials, orders, wallet transactions, authors, and community content
- React Hook Form and Zod form validation patterns
- Toast notifications with Sonner
- Charts and analytics with Recharts
- Location-aware UI using Leaflet and React Leaflet
- Image upload/preview components and ISBN scanner UI
- Theme state plumbing with next-themes and persisted Zustand preference
- SEO metadata, Open Graph metadata, Twitter card metadata, and robots settings
- Accessible UI primitives with ARIA labels, semantic navigation, focus states, dialogs, drawers, tooltips, and keyboard-friendly Radix components

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-App%20Router-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-latest-61DAFB?logo=react&logoColor=111111)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![npm](https://img.shields.io/badge/npm-package%20manager-CB3837?logo=npm&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix%20UI-primitives-161618?logo=radixui&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-components-000000)
![Zustand](https://img.shields.io/badge/Zustand-state-443E38)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-data-FF4154?logo=reactquery&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-api-5A29E4?logo=axios&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-forms-EC5990?logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-validation-3E67B1)
![Recharts](https://img.shields.io/badge/Recharts-analytics-22C55E)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-animation-0055FF?logo=framer&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-maps-199900?logo=leaflet&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-quality-4B32C3?logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-formatting-F7B93E?logo=prettier&logoColor=111111)

- Framework: Next.js App Router
- Language: TypeScript with strict mode
- Package Manager: npm
- UI Library: React, Radix UI, shadcn-style components
- Styling: Tailwind CSS v4, CSS variables, custom BoiMix design tokens
- Icons: Lucide React
- State Management: Zustand and React Context providers
- Server State: TanStack Query
- API Communication: Axios and Next.js route handlers
- Forms: React Hook Form
- Validation: Zod
- Charts: Recharts
- Animations: Framer Motion and tw-animate-css
- Maps: Leaflet and React Leaflet
- Notifications: Sonner
- Code Quality: ESLint, Prettier, Husky, lint-staged

## Architecture Overview

BoiMix uses the Next.js App Router with route groups organized by product workflow: public marketplace pages, authentication, carts, borrow flows, orders, exchange flows, public profiles, and dashboard sections. Layout components wrap public, dashboard, auth, cart, order, exchange, wishlist, and profile experiences so navigation and page chrome remain consistent.

The component system is split between reusable primitives in `components/ui`, shared product widgets in `components/shared`, layout shells in `components/layout`, and feature-specific dashboard, cart, borrow, messages, profile, and exploration components. Data currently comes from local JSON files and mock Next.js API routes, with `fetchLocal` used for server-rendered mock data and an Axios client prepared for a real backend.

Client state is handled with Zustand stores for persistent carts, wishlist, theme, orders, and user-facing workflow state. TanStack Query provides server-state defaults, query key conventions, and a typed `useApiQuery` wrapper for API-driven screens.

## Prerequisites

- Node.js 20 or newer recommended
- npm 10 or newer recommended
- Git

## Installation and Setup

Clone the repository:

```bash
git clone https://github.com/roniahamed/boimix.git
cd boimix
```

Install dependencies:

```bash
npm install
```

Create a local environment file if you need to point the frontend at an external API:

```bash
cp .env.example .env.local
```

If no `.env.example` exists, create `.env.local` manually and add only the variables required for your environment.

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Environment Variables

| Variable                   | Required | Description                                                                                                             |
| -------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | No       | API base URL used by the Axios client. Defaults to `/api`, which points to the local Next.js route handlers.            |
| `NEXT_PUBLIC_APP_URL`      | No       | Absolute application URL used by server-side local fetch helpers. Defaults to `http://localhost:3000` when unavailable. |

## Available Scripts

| Command                | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `npm run dev`          | Start the Next.js development server.                |
| `npm run build`        | Create a production build.                           |
| `npm run start`        | Start the production server after a build.           |
| `npm run lint`         | Run ESLint with zero warnings allowed.               |
| `npm run typecheck`    | Run TypeScript type checking without emitting files. |
| `npm run format`       | Format supported files with Prettier.                |
| `npm run format:check` | Check formatting with Prettier.                      |
| `npm run prepare`      | Initialize Husky hooks.                              |

## Running the Project

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Production server:

```bash
npm run start
```

Docker is not configured in this repository.

## Folder Structure

```text
.
├── app/
│   ├── api/
│   ├── auth/
│   ├── books/
│   ├── borrow/
│   ├── cart/
│   ├── dashboard/
│   ├── exchange/
│   ├── explore/
│   ├── orders/
│   ├── u/
│   └── wishlist/
├── components/
│   ├── borrow/
│   ├── cart/
│   ├── dashboard/
│   ├── explore/
│   ├── home/
│   ├── layout/
│   ├── messages/
│   ├── notifications/
│   ├── profile/
│   ├── shared/
│   └── ui/
├── hooks/
├── lib/
│   ├── api/
│   ├── data/
│   ├── forms/
│   ├── mock/
│   ├── query/
│   └── store/
├── providers/
├── public/
│   ├── banners/
│   ├── book-covers/
│   ├── brand/
│   └── categories/
├── stores/
├── styles/
├── types/
├── frontend_docs/
├── backend_docs/
├── images/
└── boimix images/
```

## API Integration

The frontend is prepared for a backend API through `lib/api/client.ts`, which creates a shared Axios instance. The base URL is read from `NEXT_PUBLIC_API_BASE_URL` and falls back to `/api`.

Authentication tokens are held in the Zustand auth store and synchronized into the Axios client by `AuthProvider`. When an access token exists, requests include an `Authorization: Bearer <token>` header. Response errors are normalized through the API error helper. A token refresh strategy is not implemented in the current frontend.

For local development and UI prototyping, the app includes Next.js route handlers under `app/api` and JSON-backed data under `lib/data`. Server-rendered pages also use `fetchLocal` to read mock data directly.

## Authentication

BoiMix includes complete frontend authentication screens for login, registration, OTP verification, student ID verification, profile completion, forgot password, reset password, and language selection. The active session model is stored in Zustand with `user`, `accessToken`, and `isAuthenticated` fields.

The current implementation prepares bearer-token API requests but does not include a committed backend auth service, cookie session handling, OAuth provider, or refresh-token flow.

## State Management

Zustand manages interactive client state across the application. Persistent stores are used for carts, borrow cart, wishlist, orders, and theme preferences. Non-persistent stores handle filters, search state, UI state, auth session state, borrow workflows, exchange workflows, and messaging state.

TanStack Query is used for server-state management with shared defaults: one-minute stale time, disabled window-focus refetching, one retry for queries, and no retries for mutations.

## Styling

BoiMix uses Tailwind CSS v4 with design tokens defined in `styles/design-system.css` and imported through `app/globals.css`. The UI layer follows a shadcn-style component architecture with Radix UI primitives, Lucide icons, CSS variables, custom breakpoints, semantic color tokens, chart tokens, shadows, and container utilities.

Theme state is wired with `next-themes` and a persisted Zustand theme store. The current provider forces the light theme while retaining the theme infrastructure for future expansion.

## Performance Optimizations

- Next.js App Router server components for many page-level routes
- Next Image with AVIF/WebP format support and remote image allowlisting
- Optimized package imports for Lucide React, Recharts, date-fns, Framer Motion, clsx, and Hook Form resolvers
- Font loading with `display: "swap"`
- Dynamic imports for map-heavy client components
- React Suspense boundaries around cart, checkout, payment, profile book views, and header search behavior
- TanStack Query caching defaults for API-backed client data
- Scroll containers and compact responsive layouts for large book lists

## Accessibility

The component set includes semantic navigation landmarks, ARIA labels for icon buttons and interactive controls, accessible pagination, breadcrumbs, dialogs, drawers, tabs, radio groups, checkboxes, alerts, tooltips, and loading buttons. Image components include meaningful alt text across book covers, profile media, and gallery content. Focus-visible ring styles are defined through the shared UI primitives.

## SEO

The root layout defines site metadata for title templates, description, keywords, authors, Open Graph, Twitter cards, robots indexing, viewport, and theme colors. Several book and profile routes also define page-level metadata. Sitemap, robots file routes, structured data, and canonical URL helpers are not currently committed.

## Testing

No unit, integration, or end-to-end test runner is configured in `package.json`. The repository currently provides linting, type checking, and formatting as the primary quality gates:

```bash
npm run lint
npm run typecheck
npm run format:check
```

## Deployment

No deployment platform configuration is committed. A standard Next.js deployment can be configured on platforms such as Vercel, Netlify, Cloudflare, Render, Railway, or a Node.js server.

General deployment flow:

```bash
npm install
npm run build
npm run start
```

Configure `NEXT_PUBLIC_API_BASE_URL` in the deployment environment when connecting the frontend to a production backend.

## Troubleshooting

Port already in use:

```bash
npm run dev -- -p 3001
```

API requests hit mock data instead of a backend:

- Set `NEXT_PUBLIC_API_BASE_URL` in `.env.local`.
- Restart the development server after changing environment variables.

Build fails after dependency updates:

```bash
rm -rf .next
npm install
npm run typecheck
npm run build
```

Formatting or linting fails:

```bash
npm run format
npm run lint
```

Map components fail in server-rendered contexts:

- Keep Leaflet-based UI behind client components or dynamic imports.
- Verify `leaflet/dist/leaflet.css` is imported where the map component is used.

## Roadmap

- Connect the prepared frontend API layer to the production backend services documented in `backend_docs`
- Complete production authentication, authorization, session refresh, and role-based access flows
- Add real payment, order settlement, deposit, wallet, and notification integrations
- Expand moderation and admin workflows beyond navigation scaffolding
- Add automated unit, integration, and end-to-end testing
- Add production deployment configuration and environment examples
- Add release-ready screenshots for core desktop and mobile workflows

## Custom License

Copyright © 2026 Roni Ahamed.

This project is licensed under a Custom License. Viewing and learning from the source code are permitted, and modification is allowed for personal learning. Commercial use is prohibited without written permission. Redistribution requires permission, and attribution is required. See the `LICENSE` file in the repository root for the full license.

## Contributing

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes:

```bash
git commit -m "Add your feature"
```

4. Push your branch:

```bash
git push origin feature/your-feature-name
```

5. Open a pull request with a clear description of the change.

## Contact

- GitHub: https://github.com/roniahamed
- Portfolio: https://www.roniahamed.com
- LinkedIn: https://www.linkedin.com/in/roniahamed/
- Email: mdroniahamed56@gmail.com

If you find this project useful, please consider starring the repository on GitHub.
