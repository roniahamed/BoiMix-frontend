# BoiMix Frontend Phase Plan

## Summary
- Source of truth: `Product engineer/Product page.md`.
- Implementation order: `Product engineer/Phase by Phase.md`.
- Active implementation scope: **Phase 8 — User Profile**.
- Completed/background phases: Phase 0 through Phase 7 are treated as already implemented for this frontend pass.
- Do not build Phase 9 dashboard, Phase 10 marketplace checkout, borrow workflows, swap workflows, messaging, notifications, moderator, admin, or final-polish features until their roadmap phase is reached.

## Active Phase: Phase 8 — User Profile
- Build public user profile routes:
  - `/u/[username]`
  - `/u/[username]/reviews`
  - `/u/[username]/library`
  - `/u/[username]/activity`
  - `/u/[username]/badges`
  - `/u/[username]/followers`
  - `/u/[username]/following`
  - `/u/[username]/location`
- Use static mock profile data until backend contracts are defined.
- Reuse existing shared components where possible:
  - `BookCard`
  - `ReviewCard`
  - `UserCard`
  - `UserAvatar`
  - `UserBadge`
  - `StatsWidget`
  - `EmptyState`
- Keep profile pages public and presentational.
- Keep follow/message actions non-mutating.
- Show public service-area information only; do not expose exact private addresses.
- Unknown usernames should render a friendly not-found state.

## Phase History / Previous Plan Log
Keep this section as the project memory. Do not delete completed phase plans when moving to a new phase.

### Phase 0 — Project Setup
- Initialized the frontend foundation at the repo root using Next.js App Router, TypeScript, npm, and the existing docs/assets structure.
- Installed and configured:
  - Tailwind CSS
  - Shadcn UI
  - ESLint
  - Prettier
  - Husky
  - lint-staged
  - TanStack Query
  - Axios
  - React Hook Form
  - Zod
  - Framer Motion
  - Lucide React
- Configured Tailwind breakpoints to match the spec:
  - `sm: 576px`
  - `md: 768px`
  - `lg: 992px`
  - `xl: 1200px`
  - `2xl: 1400px`
- Added initial app structure:
  - `app/`
  - `components/ui/`
  - `components/shared/`
  - `lib/`
  - `hooks/`
  - `providers/`
  - `types/`
  - `styles/`
  - `public/brand/`
- Added base providers:
  - TanStack Query provider
  - theme-ready layout wrapper
- Added minimum App Router files:
  - root layout
  - global styles
  - root page for setup verification
- Preserved existing product docs and image folders.

### Phase 1 — Design System
- Defined BoiMix/Rokomari-inspired design tokens for colors, typography, spacing, radius, shadows, responsive breakpoints, and container widths.
- Added global design system styles in `styles/design-system.css`.

### Phase 2 — Base UI Components
- Added reusable UI primitives for buttons, form controls, feedback, dialogs, drawers, tooltips, popovers, tabs, accordion, breadcrumb, pagination, and related base components.

### Phase 3 — Layout Components
- Added main, marketing, dashboard, admin, and moderator layout structures.
- Added desktop/mobile navigation, site header, footer, sidebar navigation, mega menu, mobile bottom navigation, and mobile floating action affordances.

### Phase 3.5 — State Management
- Added API client/query foundations, auth/theme providers, and Zustand stores for auth, cart, wishlist, search, filters, UI, and theme state.

### Phase 4 — Reusable Components
- Added shared reusable components including book cards, book gallery, reviews, rating stars, user cards, user avatar, badges, filters, image upload, skeletons, empty states, timeline, countdown, notifications, messaging previews, analytics cards, and request/dispute cards.

### Phase 5 — Homepage
- Added homepage structure and visual sections using the BoiMix design system and available brand/category/banner assets.

### Phase 6 — Authentication
- Added auth pages:
  - `/auth/login`
  - `/auth/register`
  - `/auth/verify-otp`
  - `/auth/forgot-password`
  - `/auth/reset-password`
  - `/auth/complete-profile`
  - `/auth/choose-language`
  - `/auth/verify-student-id`

### Phase 7 — Book Module
- Added book discovery routes and module UI:
  - `/books`
  - `/books/[slug]`
  - `/books/search`
  - `/books/trending`
  - `/books/new`
  - `/books/near-me`
  - `/books/top-rated`
  - `/books/category`
  - `/books/category/[genre]`
  - `/books/borrow`
  - `/books/upload`
- Implemented listing, search, filters, categories, book details, gallery, owner information, reviews, similar/related books, and book upload surface.

### Phase 8 — User Profile
- Current active phase.
- Added public profile routes, profile components, shared mock profile data, profile types, not-found state, route smoke testing, and responsive overflow checks.

## Locked Future Phases
- Phase 9: Dashboard  
  Build user overview, library management, wishlist, cart, borrowed, purchases, sales, reviews, notifications, messages, analytics, settings, and security.
- Phase 10: Marketplace  
  Build product listing, product details, cart, checkout, payment, and order tracking.
- Phase 11: Borrow System  
  Build membership, borrow request, timeline, handover, return, review, and dispute.
- Phase 12: Swap System  
  Build discover, offer, proposal, counter offer, agreement, handover, complete, and dispute.
- Phase 13: Central Library  
  Build Central Library landing page, BoiMix verified inventory, direct buy, library borrow integration, and featured collections.
- Phase 14: Community  
  Build feed, create post, post details, comments, reactions, and reviews.
- Phase 15: Messaging  
  Build conversation list, chat window, attachments, typing indicator, and seen status.
- Phase 16: Notifications  
  Build notification center, unread state, grouped notifications, and archive.
- Phase 17: Moderator Panel  
  Build reports, disputes, verification queue, review moderation, slider, and inventory.
- Phase 18: Admin Panel  
  Build users, books, borrow, sales, reports, analytics, sponsors, featured listings, notifications, email, SMS, queue, and system health.
- Phase 19: Final Polish  
  Complete responsive QA, accessibility, SEO, performance, skeletons, error pages, empty states, animations, and Lighthouse QA.

## Phase 8 Acceptance Criteria
- All public profile routes render for `/u/rahim_sheikh`.
- Unknown usernames render a friendly profile not-found state.
- Profile pages are responsive and avoid horizontal overflow.
- Public profile tabs include profile, reviews, library, activity, badges, followers, following, and location.
- Library uses public listed/shared books only.
- Location page shows readable service-area details without private address exposure.
- No Phase 9 dashboard management, checkout, borrow request, swap agreement, real messaging, or notification workflows are implemented.
- `npm run lint` passes.
- `npm run typecheck` passes.
- `npm run format:check` passes.

## Assumptions
- Mock data is acceptable for Phase 8 because the current frontend book module also uses local mock data.
- `/u/[username]/location` is included because it is listed in `Product engineer/Product page.md`.
- Existing `package.json` and `package-lock.json` changes for `puppeteer-core` are preserved.
