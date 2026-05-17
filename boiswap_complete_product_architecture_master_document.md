# BoiSwap — Complete Product Architecture, UX System & Platform Blueprint

## Product Identity

**BoiSwap** is a Bangladesh-focused community-driven peer-to-peer book lending, swap, and marketplace ecosystem.

This is not a simple CRUD application.

It is a:

- Trust-based marketplace
- Community platform
- Real-time workflow system
- Reputation engine
- Multi-role moderation platform
- Event-driven notification platform
- Discovery/search ecosystem
- Mobile-first social utility

---

# 1. PRODUCT POSITIONING

## Comparable Ecosystems

| Platform | Similarity |
|---|---|
| Airbnb | Trust + review architecture |
| Bikroy | Bangladesh marketplace behavior |
| Goodreads | Book community behavior |
| Facebook Marketplace | Social discovery patterns |
| Reddit | Community-driven engagement |

---

# 2. TOTAL PAGE COUNT

| Category | Estimated Count |
|---|---|
| Public marketing pages | 12 |
| Discovery pages | 14 |
| Authentication pages | 8 |
| User dashboard pages | 26 |
| Borrow workflow pages | 12 |
| Swap workflow pages | 8 |
| Marketplace pages | 18 |
| Notification pages | 6 |
| Moderator pages | 11 |
| Admin pages | 24 |
| Error/System pages | 9 |

# TOTAL ESTIMATED PLATFORM PAGES

# ~148 Pages

---

# MVP PAGE COUNT

| Area | Count |
|---|---|
| Public | 8 |
| Auth | 5 |
| Dashboard | 10 |
| Borrow Flow | 6 |
| Notification | 3 |
| Admin | 6 |

# MVP TOTAL

# ~38–45 Pages

---

# 3. FULL PLATFORM SITEMAP

## MARKETING & PUBLIC

```txt
/
/about
/how-it-works
/community-guidelines
/trust-safety
/contact
/faq
/terms
/privacy
/featured-libraries
/top-readers
/donate
```

---

## AUTH

```txt
/auth/login
/auth/register
/auth/verify-otp
/auth/forgot-password
/auth/reset-password
/auth/complete-profile
/auth/choose-language
/auth/verify-student-id
```

---

## BOOK DISCOVERY

```txt
/books
/books/[slug]
/books/search
/books/trending
/books/new
/books/near-me
/books/category/[genre]
/books/location/[district]
/books/swap
/books/isbn/[isbn]
```

---

## USER PROFILES

```txt
/u/[username]
/u/[username]/reviews
/u/[username]/library
/u/[username]/activity
/u/[username]/badges
/u/[username]/followers
/u/[username]/following
```

---

## USER DASHBOARD

```txt
/dashboard/overview
/dashboard/library
/dashboard/books/add
/dashboard/books/edit/[id]
/dashboard/borrowed
/dashboard/lent
/dashboard/swap
/dashboard/swap/offers
/dashboard/wishlist
/dashboard/messages
/dashboard/notifications
/dashboard/reviews
/dashboard/reports
/dashboard/settings
/dashboard/security
/dashboard/verification
/dashboard/notification-settings
/dashboard/analytics
```

---

## BORROW FLOW

```txt
/borrow/request/[id]
/borrow/active/[id]
/borrow/handover/[id]
/borrow/return/[id]
/borrow/review/[id]
/borrow/dispute/[id]
```

---

## SWAP FLOW

```txt
/swap/discover
/swap/offer/[bookId]
/swap/proposal/[id]
/swap/counter-offer/[id]
/swap/agreement/[id]
/swap/handover/[id]
/swap/complete/[id]
/swap/dispute/[id]
```

---

## MARKETPLACE

```txt
/marketplace/browse
/marketplace/listing/[id]
/marketplace/sell
/marketplace/orders
/marketplace/checkout
/marketplace/payment
/marketplace/tracking
/marketplace/seller/[username]
/marketplace/seller-dashboard
/marketplace/seller-verification
```

---

## NOTIFICATIONS

```txt
/notifications/all
/notifications/messages
/notifications/system
/notifications/archive
```

---

## MODERATOR

```txt
/mod/reports
/mod/disputes
/mod/flagged-users
/mod/flagged-books
/mod/review-moderation
/mod/verification-queue
/mod/swap-disputes
/mod/borrow-disputes
```

---

## ADMIN

```txt
/admin/overview
/admin/users
/admin/books
/admin/borrow
/admin/swap
/admin/reports
/admin/disputes
/admin/reviews
/admin/badges
/admin/verification
/admin/notifications
/admin/analytics
/admin/sponsors
/admin/featured-listings
/admin/settings
/admin/audit-log
/admin/sms
/admin/email-templates
/admin/queue-monitor
/admin/system-health
```

---

# 4. PAGE PRIORITY MATRIX

## CRITICAL LAUNCH PAGES

| Page | Why Critical |
|---|---|
| Homepage | Discovery |
| Search | Core utility |
| Book Details | Conversion page |
| Register/Login | User acquisition |
| Upload Book | Inventory growth |
| Borrow Timeline | Trust workflow |
| Notifications | Core communication |
| Profile Page | Trust system |
| Reviews | Accountability |
| Admin Dashboard | Platform safety |

---

## SECONDARY PAGES

| Page | Phase |
|---|---|
| Wishlist | Phase 2 |
| Reading Groups | Phase 2 |
| Verification Center | Phase 2 |
| Swap System | Phase 2 |
| Seller Dashboard | Phase 3 |
| Payments | Phase 3 |

---

## ADVANCED ECOSYSTEM PAGES

| Page | Phase |
|---|---|
| Publisher Analytics | Phase 4 |
| Public API Docs | Phase 4 |
| Premium Membership | Phase 4 |
| Sponsor Management | Phase 4 |

---

# 5. PAGE ARCHITECTURE (DETAILED)

# Homepage

| Field | Details |
|---|---|
| Route | / |
| Purpose | Discovery + onboarding |
| Public/Private | Public |
| Roles | All |
| Components | Hero, SearchBar, TrendingBooks, NearbyBooks, TopLenders, CTA |
| Main Actions | Search, browse, signup |
| API Requirements | Trending, categories, nearby books |
| Real-time | Low |
| SEO Importance | Extremely High |
| Difficulty | Medium |
| MVP | Yes |
| Mobile UX | Sticky search, swipe cards |
| Desktop UX | Multi-column layout |
| Edge Cases | Empty inventory |

---

# Book Details Page

| Field | Details |
|---|---|
| Route | /books/[slug] |
| Purpose | Borrow/swap conversion |
| Public/Private | Public |
| Roles | All |
| Components | Gallery, Meta, Reviews, OwnerCard, Reputation, TimelinePreview |
| Main Actions | Borrow, swap, message |
| API Requirements | Book, owner, reviews, availability |
| Real-time | Medium |
| SEO Importance | Extremely High |
| Difficulty | High |
| MVP | Yes |
| Mobile UX | Sticky action footer |
| Desktop UX | Split layout |
| Edge Cases | Book becomes unavailable |

---

# Search Page

| Field | Details |
|---|---|
| Route | /books/search |
| Purpose | Discovery engine |
| Public/Private | Public |
| Roles | All |
| Components | SearchBar, Filters, ResultsGrid, SortBar |
| Main Actions | Filter, search |
| API Requirements | Full-text search |
| Real-time | Low |
| SEO Importance | High |
| Difficulty | Very High |
| MVP | Yes |
| Mobile UX | Filter drawer |
| Desktop UX | Sidebar filtering |
| Edge Cases | No results |

---

# Borrow Timeline Page

| Field | Details |
|---|---|
| Route | /borrow/active/[id] |
| Purpose | Transaction trust tracking |
| Public/Private | Private |
| Roles | Member+ |
| Components | Timeline, DueCountdown, Chat, StatusBadges |
| Main Actions | Confirm handover, return, report |
| API Requirements | Workflow state machine |
| Real-time | Critical |
| SEO Importance | None |
| Difficulty | Extremely High |
| MVP | Yes |
| Mobile UX | Vertical timeline |
| Desktop UX | Dual user layout |
| Edge Cases | Partial confirmation |

---

# Notifications Center

| Field | Details |
|---|---|
| Route | /notifications/all |
| Purpose | Workflow continuity |
| Public/Private | Private |
| Roles | Member+ |
| Components | NotificationFeed, Filters, Actions |
| Main Actions | Read, archive, open |
| API Requirements | Event streaming |
| Real-time | Critical |
| SEO Importance | None |
| Difficulty | High |
| MVP | Yes |
| Mobile UX | Drawer-first |
| Desktop UX | Inbox layout |
| Edge Cases | Duplicate notifications |

---

# Admin Dispute Center

| Field | Details |
|---|---|
| Route | /admin/disputes |
| Purpose | Platform trust moderation |
| Public/Private | Private |
| Roles | Moderator/Admin |
| Components | EvidenceViewer, Timeline, ActionPanel |
| Main Actions | Resolve, freeze, escalate |
| API Requirements | High relational complexity |
| Real-time | Medium |
| SEO Importance | None |
| Difficulty | Extreme |
| MVP | Basic version |
| Mobile UX | Tablet optimized |
| Desktop UX | Multi-panel moderation |
| Edge Cases | Conflicting evidence |

---

# 6. USER FLOW DIAGRAMS

## Signup Flow

```txt
Homepage
→ Register
→ OTP Verification
→ Complete Profile
→ Select Location
→ Upload Avatar
→ Welcome Dashboard
```

---

## Borrow Workflow

```txt
Browse Books
→ Open Book
→ Send Borrow Request
→ Owner Accepts
→ Notification Sent
→ Handover Confirmed
→ Borrow Timeline Active
→ Due Reminder
→ Return Confirmation
→ Review Unlock
→ Reputation Updated
```

---

## Swap Workflow

```txt
Browse Swap Books
→ Select Offer Book
→ Send Swap Proposal
→ Accept / Counter / Decline
→ Agreement Created
→ Handover
→ Both Confirm
→ Reviews Unlock
```

---

## Marketplace Buying Flow

```txt
Browse Marketplace
→ Open Listing
→ Buy Now
→ Checkout
→ bKash/Nagad
→ Escrow Hold
→ Seller Ships
→ Buyer Confirms
→ Funds Released
```

---

## Reporting Flow

```txt
Open Report
→ Select Reason
→ Upload Evidence
→ Moderator Queue
→ Investigation
→ Resolution
→ Notification Sent
```

---

# 7. DASHBOARD INFORMATION ARCHITECTURE

## USER DASHBOARD

```txt
Overview
├── My Library
├── Borrowed Books
├── Lent Books
├── Active Swaps
├── Wishlist
├── Reviews
├── Messages
├── Notifications
├── Analytics
├── Verification
├── Settings
```

---

## MODERATOR DASHBOARD

```txt
Reports Queue
├── Active Disputes
├── Flagged Users
├── Verification Queue
├── Review Moderation
├── Swap Conflicts
├── Borrow Conflicts
```

---

## ADMIN DASHBOARD

```txt
Platform Metrics
├── User Management
├── Queue Monitoring
├── Notification Health
├── SMS Usage
├── Financial Analytics
├── Sponsors
├── Audit Logs
├── System Health
```

---

# 8. DESIGN SYSTEM STRUCTURE

## TYPOGRAPHY

| Type | Size |
|---|---|
| Hero | 64px |
| H1 | 40px |
| H2 | 32px |
| H3 | 24px |
| Body | 16px |
| Small | 14px |

---

## COLOR SYSTEM

| Role | Usage |
|---|---|
| Primary Blue | Main actions |
| Success Green | Completed actions |
| Warning Orange | Due alerts |
| Danger Red | Overdue/disputes |
| Trust Blue | Verified users |
| Community Purple | Community modules |

---

## SPACING SYSTEM

```txt
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64
```

---

## LAYOUT GRID

| Device | Grid |
|---|---|
| Mobile | 4-column |
| Tablet | 8-column |
| Desktop | 12-column |

---

# 9. COMPONENT LIBRARY

```txt
BookCard
BookGallery
BookConditionBadge
AvailabilityBadge
SwapBadge
BorrowStatusBadge
TrustScoreMeter
UserAvatar
UserMiniCard
ReviewCard
RatingStars
BadgePill
BadgeGrid
TimelineTracker
DueCountdown
NotificationBell
NotificationItem
SearchBar
FilterSidebar
LocationPicker
ISBNScanner
ImageUploader
ChatWindow
MessageBubble
BorrowRequestCard
SwapOfferCard
DisputeCard
AdminTable
VerificationCard
AnalyticsCard
StatsWidget
LoadingSkeleton
EmptyState
ConfirmationModal
ToastAlert
BottomActionBar
StickyMobileActions
```

---

# 10. MOBILE NAVIGATION ARCHITECTURE

## Bottom Navigation

```txt
Home
Search
Add Book
Notifications
Profile
```

---

## Mobile UX Priorities

| Priority | Reason |
|---|---|
| Sticky actions | Faster conversion |
| Lightweight images | Bangladesh bandwidth |
| Drawer interactions | Mobile usability |
| OTP-first auth | Local user behavior |
| Infinite scroll | Discovery retention |

---

# 11. NOTIFICATION UX ARCHITECTURE

## Notification Hierarchy

```txt
Critical
├── Borrow approved
├── Return overdue
├── Swap accepted

Important
├── New message
├── Due reminder
├── Review received

Passive
├── Badge earned
├── Trending books
├── Community updates
```

---

## Notification UX Rules

| Rule | Purpose |
|---|---|
| Real-time unread count | Urgency |
| Group duplicate notifications | Reduce spam |
| Actionable notifications | Faster conversion |
| Deep linking | Lower friction |
| Smart reminders | Retention |

---

# 12. BORROW WORKFLOW STATE MACHINE

```txt
Available
→ Requested
→ Approved
→ Handover Pending
→ Borrowed
→ Due Soon
→ Overdue
→ Return Pending
→ Completed
→ Reviewed
```

This is the HEART of the platform.

Everything depends on this workflow being reliable.

---

# 13. TRUST & REPUTATION UX

## Core Trust Signals

| Feature | Psychological Effect |
|---|---|
| Verified badges | Reduces fear |
| Return rate | Reliability signal |
| Response speed | Trustworthiness |
| Public reviews | Social proof |
| Timeline transparency | Accountability |
| Late penalties | Behavioral pressure |

---

# 14. ENGINEERING COMPLEXITY ANALYSIS

## Hardest Engineering Areas

| Area | Complexity |
|---|---|
| Notifications | Extreme |
| Swap negotiation | Extreme |
| Search ranking | High |
| Real-time sync | High |
| Reputation system | High |
| Escrow payment | Extreme |
| Moderation tools | High |

---

## Highest Scaling Risks

| System | Risk |
|---|---|
| Search | Heavy filtering |
| Notifications | Event explosion |
| Chat | Concurrent sockets |
| Marketplace feed | Ranking load |
| Analytics | Aggregation queries |

---

## Most State-Heavy Pages

| Page | Why |
|---|---|
| Borrow Timeline | Multi-state workflow |
| Swap Agreement | Two-party synchronization |
| Notifications | Read/unread/live states |
| Dashboard | Many async widgets |
| Search | Persistent filters |

---

# 15. NEXT.JS APP ROUTER STRUCTURE

```txt
app/
│
├── (marketing)/
│   ├── page.tsx
│   ├── about/
│   ├── faq/
│   └── trust-safety/
│
├── (auth)/
│   ├── login/
│   ├── register/
│   ├── verify-otp/
│   └── forgot-password/
│
├── books/
│   ├── page.tsx
│   ├── [slug]/
│   ├── category/
│   ├── search/
│   ├── near-me/
│   └── trending/
│
├── u/
│   └── [username]/
│
├── (dashboard)/
│   ├── dashboard/
│   ├── library/
│   ├── borrowed/
│   ├── lent/
│   ├── notifications/
│   ├── reviews/
│   ├── settings/
│   └── verification/
│
├── borrow/
├── swap/
├── marketplace/
├── notifications/
├── messages/
│
├── (moderator)/
│   └── mod/
│
├── (admin)/
│   └── admin/
│
├── api/
│
├── not-found.tsx
├── error.tsx
└── layout.tsx
```

---

# 16. MVP LAUNCH STRATEGY

## ABSOLUTE MINIMUM REQUIRED PAGES

```txt
Homepage
Search
Book Details
Register/Login
Upload Book
My Library
Borrow Requests
Borrow Timeline
Notifications
Profile
Reviews
Basic Settings
Basic Admin
```

---

## PAGES YOU SHOULD MERGE INITIALLY

| Merge | Reason |
|---|---|
| Borrowed + Lent | Reduce complexity |
| Notifications tabs | Single inbox first |
| Analytics | Inside overview |
| Reviews + Reputation | Same module |
| Verification + Profile | Simpler onboarding |

---

## PAGES TO POSTPONE

| Page | Reason |
|---|---|
| Reading groups | Complex social system |
| Full chat app | Expensive infra |
| Publisher APIs | Too early |
| Advanced moderation AI | Future optimization |
| Sponsor system | Monetization later |

---

## FLOWS THAT MUST BE PERFECT

| Flow | Importance |
|---|---|
| Login/OTP | Acquisition |
| Search | Discovery |
| Upload Book | Supply growth |
| Borrow request | Core conversion |
| Notifications | Workflow continuity |
| Return confirmation | Trust |
| Reviews | Reputation |

---

# 17. MODERN UX STRATEGY

## COMMUNITY ENGAGEMENT

| Idea | Impact |
|---|---|
| Books near you | Local trust |
| Reading streaks | Retention |
| Monthly badges | Gamification |
| Top readers leaderboard | Social status |
| Featured libraries | Pride effect |

---

## RETENTION LOOPS

```txt
Borrow Book
→ Review
→ Badge Earned
→ Reputation Increases
→ Higher Approval Chance
→ More Borrowing
→ Social Recognition
```

---

## MARKETPLACE CONVERSION UX

| Pattern | Purpose |
|---|---|
| Sticky CTA | Mobile conversion |
| Trust badges near CTA | Reduce hesitation |
| Seller response time | Confidence |
| Nearby-first ranking | Faster transactions |
| Escrow explanation | Safety perception |

---

# 18. FINAL STRATEGIC ASSESSMENT

BoiSwap is realistically a:

- Mid-scale startup architecture
- Real-time event-driven system
- Trust marketplace ecosystem
- Multi-role moderation platform
- Community platform
- Mobile-first Bangladesh product

## Your Biggest Challenges

1. Trust UX
2. Notification reliability
3. Borrow/swap state management
4. Search relevance
5. Marketplace moderation
6. Mobile-first Bangladesh UX
7. Real-time synchronization

## Strategic Recommendation

DO NOT build everything at once.

Perfect these first:

- Discovery
- Borrow workflow
- Reputation system
- Notifications
- Trust UX

Only after that:

- Marketplace
- Social ecosystem
- Monetization
- Publisher APIs
- Premium memberships

---

# 19. RECOMMENDED FRONTEND STACK ARCHITECTURE

| Area | Recommendation |
|---|---|
| State Management | Zustand + React Query |
| Forms | React Hook Form + Zod |
| Tables | TanStack Table |
| Search | Meilisearch |
| Real-time | WebSocket + Channels |
| UI | Tailwind + shadcn/ui |
| Animations | Framer Motion |
| Charts | Recharts |
| Internationalization | next-intl |

---

# 20. RECOMMENDED DATABASE DOMAINS

## Core Tables

```txt
users
profiles
books
book_images
borrow_requests
borrow_transactions
swap_requests
swap_transactions
reviews
badges
notifications
messages
reports
verification_requests
marketplace_listings
orders
payments
```

---

# 21. PERFORMANCE-CRITICAL PAGES

| Page | Optimization Required |
|---|---|
| Homepage | SSR + caching |
| Search | Debounced query |
| Book details | Edge caching |
| Notifications | Incremental loading |
| Dashboard | Widget lazy loading |
| Marketplace feed | Infinite virtualization |

---

# 22. REAL-TIME ARCHITECTURE

## WebSocket Required Areas

```txt
Notifications
Chat
Borrow state updates
Swap negotiation
Unread counts
Admin moderation queues
```

---

# 23. SEO STRATEGY

## SEO-Optimized Page Types

| Page | SEO Value |
|---|---|
| Book pages | Long-tail traffic |
| Genre pages | Discovery |
| District pages | Local search |
| User libraries | UGC indexing |
| Trending books | Fresh content |

---

# 24. TRUST SYSTEM ARCHITECTURE

## Reputation Formula Inputs

```txt
On-time returns
Review ratings
Response speed
Dispute history
Successful swaps
Successful lends
Verification status
```

---

# 25. ADMIN MODERATION FLOW

```txt
User Reported
→ Queue Created
→ Moderator Assigned
→ Evidence Reviewed
→ Temporary Action
→ Final Resolution
→ Notifications Sent
→ Audit Log Saved
```

---

# 26. FUTURE EXPANSION IDEAS

## Phase 5 Possibilities

- AI book recommendations
- Smart trust prediction
- University library integration
- Public API ecosystem
- Reading analytics
- Audiobook integration
- Publisher dashboard
- Community forums
- Local reading events
- QR-based handover confirmation

---

# END OF MASTER PRODUCT ARCHITECTURE DOCUMENT

