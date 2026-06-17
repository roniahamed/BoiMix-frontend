# BoiMix Frontend Phase Plan

## Summary
- Source of truth: `Product engineer/Product page.md`.
- Implementation order: `Product engineer/Phase by Phase.md`.
- Active implementation scope: **Phase 0 only**.
- Do not build homepage, book cards, auth pages, dashboards, marketplace, borrow, swap, or community features until their roadmap phase is reached.
- Initialize the Next.js frontend at the **repo root** using **npm**, preserving existing docs and image folders.

## Active Phase: Phase 0 — Project Setup
- Initialize a Next.js App Router project with TypeScript at repo root.
- Install and configure:
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
- Configure Tailwind breakpoints to match the spec:
  - `sm: 576px`
  - `md: 768px`
  - `lg: 992px`
  - `xl: 1200px`
  - `2xl: 1400px`
- Add initial app structure:
  - `app/`
  - `components/ui/`
  - `components/shared/`
  - `lib/`
  - `hooks/`
  - `providers/`
  - `types/`
  - `styles/`
  - `public/brand/`
- Move/copy brand assets into `public/brand/`:
  - BoiMix logo
  - BoiMix cover image
- Configure base providers only:
  - TanStack Query provider
  - Theme-ready layout wrapper
- Create only the minimum required App Router files:
  - root layout
  - global styles
  - minimal root page for setup verification
- Do not create production UI sections yet.

## Locked Future Phases
- Phase 1: Design System  
  Define brand colors, typography, spacing, radius, shadows, container widths, and responsive tokens.
- Phase 2: Base UI Components  
  Build buttons, form controls, feedback components, and navigation primitives.
- Phase 3: Layout Components  
  Build marketing, dashboard, admin, moderator layouts, header, footer, sidebar, mobile nav.
- Phase 3.5: State Management  
  Finalize API client, auth context, search/filter/cart/wishlist/theme state, validation, and error handling.
- Phase 4: Reusable Components  
  Build Book Card, Book Gallery, Rating Stars, Review Card, User components, filters, uploads, skeletons, empty states, modals.
- Phase 5: Homepage  
  Build hero, search, CTAs, categories, trending/new books, central library, marketplace, swap, community, sponsors, newsletter.
- Phase 6: Authentication  
  Build login, register, OTP, forgot/reset password, complete profile, choose language.
- Phase 7: Book Module  
  Build book listing, search, filters, category pages, book details, reviews, similar/related books.
- Phase 8: User Profile  
  Build public profile, reviews, library, activity, followers, following, badges.
- Phase 9: Dashboard  
  Build user overview, library, wishlist, cart, borrowed, purchases, sales, reviews, notifications, messages, analytics, settings, security.
- Phase 10: Marketplace  
  Build product listing, product details, cart, checkout, payment, order tracking.
- Phase 11: Borrow System  
  Build membership, borrow request, timeline, handover, return, review, dispute.
- Phase 12: Swap System  
  Build discover, offer, proposal, counter offer, agreement, handover, complete, dispute.
- Phase 13: Community  
  Build feed, create post, post details, comments, reactions, reviews.
- Phase 14: Messaging  
  Build conversation list, chat window, attachments, typing indicator, seen status.
- Phase 15: Notifications  
  Build notification center, unread state, grouped notifications, archive.
- Phase 16: Moderator Panel  
  Build reports, disputes, verification queue, review moderation, slider, inventory.
- Phase 17: Admin Panel  
  Build users, books, borrow, sales, reports, analytics, sponsors, featured listings, notifications, email, SMS, queue, system health.
- Phase 18: Final Polish  
  Complete responsive QA, accessibility, SEO, performance, skeletons, error pages, empty states, animations, Lighthouse QA.

## Phase 0 Acceptance Criteria
- `npm install` completes successfully.
- `npm run dev` starts the Next.js app.
- `npm run lint` passes.
- `npm run typecheck` passes.
- `npm run format:check` passes.
- Shadcn UI is initialized and ready for Phase 2.
- Tailwind uses the required custom breakpoints.
- Existing product docs and image folders remain preserved.
- No future-phase product UI is implemented.

## Assumptions
- The frontend app should live at the repo root.
- npm is the package manager.
- The Rokomari-inspired design system guides styling, but detailed tokens are finalized in Phase 1.
- Book Card and Book Details requirements are parked until Phase 4 and Phase 7 respectively.
