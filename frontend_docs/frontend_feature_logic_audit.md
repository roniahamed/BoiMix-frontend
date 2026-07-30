# BoiMix Frontend Feature And Logic Audit

## Purpose

This document lists the features and frontend-side logic currently present in the BoiMix codebase. It is intentionally focused on frontend behavior only: routes, UI flows, local state, validation, mock APIs, mock data, redirects, filters, and simulated actions.

## Frontend Architecture Shape

- App framework: Next.js App Router with TypeScript.
- UI system: Tailwind CSS, shadcn-style local UI components, lucide icons.
- Data pattern today: local JSON/mock data through `fetchLocal`, mock `app/api/*` routes, and persisted Zustand stores.
- Real backend readiness: `lib/api/client.ts` supports `NEXT_PUBLIC_API_BASE_URL`, but most pages still use mocks or local stores.
- Location calls: upload/settings/profile flows call Photon/Nominatim directly from browser.
- Realtime features: chat and notification UIs exist, but realtime behavior is simulated/local.

## Mock API And Data Layer

Mock API routes:

- `/api/books`
- `/api/books/[slug]`
- `/api/categories`
- `/api/community`
- `/api/orders/tracking`
- `/api/profile`
- `/api/readers`
- `/api/sponsors`
- `/api/testimonials`
- `/api/wallet/transactions`
- `/api/authors/humayun-ahmed/books`

Local data files:

- `books.json`, `bookDetails.json`, `categories.json`
- `profileData.json`, `readers.json`, `community.json`
- `sponsors.json`, `testimonials.json`
- `tracking.json`, `transactions.json`
- `passes.ts`, `analytics.ts`, `sales.ts`, `exchanges.ts`
- `mock-messages.ts`, `bd-locations.ts`, `upload-book.ts`

Important logic:

- `fetchLocal(endpoint)` maps API-like endpoints to local JSON.
- Server pages use `fetchLocal` for book/profile/home/search data.
- Mock API routes return JSON with optional query param handling in some routes.

## Local Stores And Client State

Zustand stores:

- `useCartStore`: buy cart items, quantity, selected items, persisted state.
- `useBorrowCartStore`: borrow cart items, direct checkout item, persisted state.
- `useWishlistStore`: wishlist book ids, persisted state.
- `useOrderStore`: purchase orders, persisted state.
- `useBorrowStore`: borrow orders, borrow wallet/deposit, status transitions.
- `useExchangeStore`: exchange proposals, user books, status transitions.
- `useMessageStore`: unread message count based on mock conversations.

Duplicate store families:

- `stores/cart-store.ts` and `lib/store/use-cart-store.ts`.
- `stores/wishlist-store.ts` and `lib/store/use-wishlist-store.ts`.

Frontend logic risk:

- Cart/wishlist/order/borrow/exchange data can diverge because different store files and mock data sources exist.

## Public Home Page

Route: `/`

Features:

- Hero carousel.
- Personalization card with welcome message, recently viewed books, active exchanges.
- Categories carousel.
- Trending books.
- Author spotlight.
- New books.
- Nearby books.
- Only For You recommendations.
- Central Library promotion.
- Marketplace promotion.
- Exchange Books promotion.
- Community Readers section.
- Community Posts section.
- Testimonials.
- Sponsors.
- Newsletter form.

Logic:

- Uses `/api/books`, `/api/categories`, `/api/readers`, `/api/community`, `/api/sponsors`, `/api/testimonials` through `fetchLocal`.
- Book sections are created by slicing/reversing the same mock book list.
- Central Library books are filtered by `providerType === "library"` or `tags.includes("borrow")`.
- Marketplace books are filtered by `tags.includes("sell")`.
- Exchange books are filtered by `tags.includes("exchange")`.
- Recently viewed and recommendations are static slices.
- Newsletter form posts to `/newsletter`, but that route is not implemented.

Missing frontend routes linked from home:

- `/community`
- `/community/readers/*`
- `/community/leaderboard`
- `/featured-libraries`
- `/books/for-you`
- `/newsletter`

## Auth And Onboarding

Routes:

- `/auth/login`
- `/auth/register`
- `/auth/verify-otp`
- `/auth/forgot-password`
- `/auth/reset-password`
- `/auth/complete-profile`
- `/auth/choose-language`
- `/auth/verify-student-id`

Features:

- Email/password login form.
- Google login button UI.
- Registration with full name, email, password, confirm password, terms acceptance.
- OTP verification with 6-digit code and resend countdown.
- Forgot password flow routes to OTP reset mode.
- Reset password form.
- Complete profile form with avatar placeholder, location, bio.
- Language choice: Bangla or English.
- Student ID verification with institution, student ID, ID image placeholder.

Logic:

- Forms use `react-hook-form` and `zod` validation.
- Login/register/reset flows simulate API calls with delay.
- Register routes to `/auth/verify-otp`.
- OTP routes to `/auth/complete-profile`.
- Complete profile routes to `/auth/choose-language`.
- Choose language routes to `/auth/verify-student-id`; skip routes to `/dashboard`.
- Student verification routes to `/`.
- Forgot password routes to `/auth/verify-otp?mode=reset`.
- Reset password routes to `/auth/login?reset=success`.

Validation:

- Login email must be valid.
- Password minimum is 6 characters.
- Register full name minimum is 3 characters.
- Terms acceptance required.
- OTP must be exactly 6 digits.
- Student institution and student ID minimum length is 3.

## Book Catalog And Discovery

Routes:

- `/books`
- `/books/search`
- `/books/trending`
- `/books/new`
- `/books/near-me`
- `/books/top-rated`
- `/books/category`
- `/books/category/[genre]`
- `/books/borrow`

Features:

- Book listing grid.
- Search page.
- Trending books.
- New books.
- Nearby books.
- Top-rated books.
- Category listing and genre pages.
- Borrow browsing entry.

Logic:

- Uses mock book data through `fetchLocal`.
- Search reads query params and filters book title/author/tag in-memory.
- Category pages use route params/query params to filter.
- Sort/filter behavior is frontend-side on mock arrays in several pages.
- Book cards expose sell/borrow/exchange visual states based on tags and provider type.

## Book Details

Route: `/books/[slug]`

Features:

- Image gallery with selected image.
- Sell/borrow/exchange badges.
- Price, original price, exchange value, borrow fee, borrow duration.
- Rating and review count.
- Condition, location, distance.
- Wishlist, share, report actions.
- Owner profile block.
- Buy action.
- Borrow action.
- Exchange action.
- Book Q&A.
- Reviews and rating breakdown.
- Related/recommended books.
- Mobile sticky/top actions.

Logic:

- Loads base books and detail mock data through `fetchLocal`.
- Infers current mode by slug test values or first tag.
- Builds availability counts from mode.
- Merges selected book data into one current book object.
- Share uses `navigator.share` when available, otherwise copies URL.
- Report modal uses hardcoded reasons and validates reason selection.
- Q&A supports client-side ask/answer modal state and pagination.
- Reviews support filter by star, sort by rating, pagination, and write-review modal.
- Review form submit is simulated.

## Book Upload

Route: `/books/upload`

Features:

- Multi-section add-book form.
- Image uploads for front cover, back cover, inside pages, table of contents, index.
- ISBN field with auto-fill button.
- Title, author, publisher, genre, language, edition, page count, description.
- Availability mode: sell, borrow, exchange.
- Sell fields: original price, discounted price, quantity.
- Borrow fields: quantity, max duration, deposit, borrow fee.
- Exchange fields: quantity, estimated exchange value, exchange preference.
- Condition selection: New, Excellent, Good, Fair, Poor.
- Location mode: profile default or custom.
- Custom location search suggestions and map pin.
- Tags, edition details, condition note.
- Live preview card.

Logic:

- Form uses `react-hook-form`, `zod`, `Controller`, and `useWatch`.
- `availabilityMode` controls which sell/borrow/exchange field set is visible.
- ISBN auto-fill uses hardcoded `QUICK_FILL_BOOKS`; it does not call an API yet.
- Custom location search calls Photon directly.
- Map reverse geocode calls Nominatim directly.
- Submit simulates delay and routes to `/books`.
- Image files are held in local component state.
- Description character count displays `0/1000`, but schema does not enforce 1000 in this file.

Important note:

- `/books/upload?mode=donate` is linked from donation page, but upload form currently does not branch on `mode=donate`.

## Wishlist

Route: `/wishlist`

Features:

- Wishlist listing page.
- Empty state.
- Book cards for wishlist items.

Logic:

- Uses local wishlist store.
- Also fetches `/api/profile` for fallback book data.
- Unknown wishlist items use fallback dummy content.

## Buy Cart And Checkout

Routes:

- `/cart`
- `/cart/checkout`
- `/dashboard/cart`

Features:

- Buy cart.
- Borrow cart.
- Cart tabs or grouped cart UI.
- Checkout selected items through query param `items`.
- Shipping details form.
- Payment method selection: bKash, Nagad, COD.
- Order summary with subtotal, delivery fee, total.

Logic:

- Buy cart uses local persisted cart store.
- Checkout filters selected cart items from URL query.
- Shipping validation uses `zod`.
- District/thana options come from `bd-locations.ts`.
- Delivery fee uses unique seller count.
- Dhaka delivery charge is `৳60` per seller.
- Outside Dhaka delivery charge is `৳120` per seller.
- Checkout creates a local order in `useOrderStore`.
- COD clears selected cart items and routes to `/orders/success`.
- bKash/Nagad routes to `/orders/payment?method=...&amount=...`.

## Payment, Orders, Tracking

Routes:

- `/orders/payment`
- `/orders/success`
- `/orders/tracking/[id]`
- `/dashboard/orders`
- `/dashboard/sales`
- `/dashboard/wallet`

Features:

- Simulated bKash/Nagad payment gateway.
- Account number and PIN inputs.
- Escrow messaging.
- Order success page.
- Buyer purchase history.
- Order tracking timeline.
- Seller customer orders dashboard.
- Seller order details dialog.
- Seller ship dialog.
- Seller revenue stats.
- Wallet balance, escrow, lifetime earnings.
- Wallet transactions.
- Withdraw dialog with bKash, Nagad, bank.

Logic:

- Payment reads `method` and `amount` from URL.
- Payment validates account number and PIN are present.
- Payment clears cart and routes to success after delay.
- Success page generates random display order id.
- Success page links to `/dashboard/purchases`, but actual orders route is `/dashboard/orders`.
- Buyer orders come from local persisted `useOrderStore`.
- Seller orders come from `MOCK_CUSTOMER_ORDERS`.
- Seller can locally confirm, ship, cancel orders.
- Shipping dialog stores courier name and tracking number into local state.
- Wallet page uses hardcoded wallet and transaction data.
- Withdrawal method and amount are local UI state only.

## Borrow Cart And Borrow Workflow

Routes:

- `/borrow/checkout`
- `/borrow/request/[id]`
- `/borrow/active/[id]`
- `/dashboard/borrowed`
- `/dashboard/lent`
- `/dashboard/requests`
- `/dashboard/action-center`

Features:

- Borrow eligibility check.
- Borrow cart checkout.
- Direct borrow checkout.
- Group borrow request by owner.
- Handover method per owner: meetup or courier.
- Meetup location, meetup date/time, phone.
- Courier district, thana, full address, full name, phone.
- Message to owner.
- Per-owner borrow fee and estimated courier fee.
- Submit borrow requests.
- Active borrow timeline.
- Status stepper and vertical timeline.
- Return initiation.
- Extension request.
- Dispute.
- Peer review after completion.
- Deposit wallet card.

Logic:

- Borrow cart uses local persisted `useBorrowCartStore`.
- Borrow orders and wallet use `useBorrowStore`.
- Eligibility checks available deposit limit and active order count.
- Current mock max active orders is `100`.
- Borrow request route uses fixed mock `depositRequired = 300` and `borrowFee = 50`.
- Borrow checkout creates one local order per item.
- Borrow order status machine includes `pending_owner_review`, `counter_offered`, `accepted`, `rejected`, `paid`, `handed_over_by_owner`, `borrow_active`, `return_initiated`, `completed`, `disputed`.
- Adding an order locks deposit and decreases available limit.
- Completing or rejecting releases deposit.
- Return modal requires tracking ID for courier returns.
- Extension modal allows 1 to 7 days and optional reason.
- Dispute modal requires at least 20 characters.
- Peer review requires 1 to 5 rating.
- Active borrow page includes simulator buttons for testing status changes.

## Exchange Workflow

Routes:

- `/explore/exchanges`
- `/explore/exchanges/search`
- `/exchange/offer/[bookId]`
- `/dashboard/exchanges`
- `/dashboard/exchanges/offers`

Features:

- Exchange landing page.
- Exchange search and filters.
- Exchange categories.
- Recently added exchange books.
- Near-you exchange books.
- Exchange proposal page.
- Select a book from own library.
- Proposed meetup location.
- Proposed date/time.
- Optional message.
- Dashboard exchange list.
- Exchange offers tab.
- Exchange details dialog.
- Counter offer and status badges.

Logic:

- Exchange landing uses mock books filtered by non-library and exchange tag.
- Search filters by query, category, and sort.
- Sort options: newest, nearby, popular, A-Z.
- Proposal page loads requested book from mock list.
- User's own exchangeable books come from `useExchangeStore`.
- Proposal creation stores data locally in `useExchangeStore`.
- Exchange statuses include pending proposal, counter offered, accepted, rejected, completed, disputed.
- Dashboard actions mutate local exchange status.

## Central Library

Routes:

- `/explore/central-library`
- `/explore/central-library/search`
- `/explore/central-library/memberships`
- `/explore/central-library/donate`
- `/memberships`

Features:

- Central Library landing page.
- Central hero, categories, collections, why-us section.
- Featured books.
- New arrivals.
- Most borrowed.
- FAQ section.
- Membership details page.
- Donate books page.
- `/memberships` redirects to central-library membership page.

Logic:

- Library books are filtered by `providerType === "library"` or library/borrow tags.
- Featured/new/most borrowed are array slices.
- Search page uses query params for library results.
- Membership details page shows canonical deposit-based membership and borrow passes.
- Donation page explains list, verify/collect, earn rewards flow.
- Donation CTA links to `/books/upload?mode=donate`.

Canonical membership UI:

- Basic Member: `৳500`, valid 4 years, borrow books priced up to `৳500`.
- Standard Member: `৳1000`, valid 4 years, borrow books priced up to `৳1000`.
- Premium Member: `৳2000`, valid 4 years, borrow books priced up to `৳2000` or more.
- Welcome Gift: 5 free borrows valid for 2 months.
- Bonus: 1 donated book free every month.
- Premium books always require a Borrow Pass.
- Membership fee is shown as one-time and non-refundable.

Borrow pass UI:

- Mini Pass: `৳40`, 2 books, valid 1 month.
- Standard Pass: `৳70`, 4 books, valid 1 month.
- Pro Pass: `৳100`, 7 books, valid 2 months.

Stale frontend copy:

- `/explore/central-library` still contains older monthly plan cards: Basic/Premium/Elite.
- `/faq` still mentions Basic/Premium/Elite plan rules and refund/cancel copy.

## Membership And Pass Dashboard

Route: `/dashboard/passes`

Features:

- Membership summary card.
- Active pass wallet.
- Pass wallet breakdown.
- Pass store plans.
- Pass history.

Logic:

- Uses `lib/data/passes.ts`.
- Shows active membership, borrow capacity, active passes, remaining credits, expiry, and history.
- Current data is static/mock.
- Plan purchase buttons are UI only.

## Festival And Campaign Page

Route: `/explore/festival`

Features:

- Book fair/festival hero.
- Festival stats.
- Festival categories.
- Upcoming events.
- Featured authors.
- Featured festival books.
- New arrivals.
- Festival special offer CTA.

Logic:

- Events, categories, stats, authors are static arrays inside the page.
- Books are selected by slicing mock book list.
- Category links route into book categories/search.
- Event CTA scrolls to page section.

## FAQ

Route: `/faq`

Features:

- FAQ categories: Borrowing, Membership, Delivery & Return, Payment, Exchanging.
- Accordion display.
- Contact support CTA to `/dashboard/messages`.

Logic:

- FAQ content is static in the page.
- Some membership answers are stale compared with canonical deposit membership.

## User Dashboard Shell

Routes:

- `/dashboard`
- `/dashboard/overview`
- `/dashboard/action-center`
- `/dashboard/library`
- `/dashboard/reading`
- `/dashboard/borrowed`
- `/dashboard/lent`
- `/dashboard/requests`
- `/dashboard/exchanges`
- `/dashboard/exchanges/offers`
- `/dashboard/sales`
- `/dashboard/orders`
- `/dashboard/cart`
- `/dashboard/wallet`
- `/dashboard/passes`
- `/dashboard/messages`
- `/dashboard/messages/[username]`
- `/dashboard/notifications`
- `/dashboard/settings`
- `/dashboard/security`
- `/dashboard/verification`
- `/dashboard/reports`
- `/dashboard/analytics`
- `/dashboard/followers`
- `/dashboard/following`

Dashboard layout features:

- Sidebar navigation.
- Mobile dashboard navigation.
- Right sidebar widgets.
- Static badge counts in navigation.
- Dashboard shell redirects/links between modules.

## Dashboard Overview

Route: `/dashboard/overview`

Features:

- Welcome hero banner.
- Stat cards.
- Action center widget.
- Activity timeline.
- Continue reading section.
- Recommended books.

Logic:

- Uses profile mock library books.
- Recommended books are sliced from profile library books.
- Stats/activity widgets are component-level static/mock data.

## Dashboard Action Center

Route: `/dashboard/action-center`

Features:

- Pending borrow requests.
- Active borrowed books due soon.
- Pending exchange offers.
- Pending exchange counter offers.
- Empty all-caught-up state.

Logic:

- Reads local borrow and exchange stores.
- Current user id is hardcoded as `current-user`.
- Filters borrow orders by owner/borrower and status.
- Filters exchange orders by owner/proposer and status.

## Dashboard Library

Route: `/dashboard/library`

Features:

- User library manager.
- Needs attention banner.
- Stats: total books, available, lent out, active swaps, listed for sale.
- Add book action.
- Library grid.

Logic:

- Uses profile mock library books.
- Counts are derived from `inventoryStatus` and tags.
- Needs attention uses lent count and hardcoded missing-cover text.

Inventory statuses used:

- `available`
- `borrowed`
- `draft`
- `archived`
- `sold`

## Dashboard Reading

Route: `/dashboard/reading`

Features:

- Annual reading goal.
- Edit reading goal modal.
- Currently reading card.
- Log page progress modal.
- Mark as finished button.
- Reading activity.
- Current streak.
- Pages this week.
- Badges earned.
- Up-next reading queue.

Logic:

- Uses local component state.
- `pagesRead`, `annualGoal`, `booksRead`, `pagesThisWeek` are local values.
- Progress percent is calculated from pages read and total pages.
- Goal progress is calculated from books read and annual goal.
- Logging pages increments local state and caps at total pages.

## Dashboard Analytics

Route: `/dashboard/analytics`

Features:

- Tabs: Overview, Books Analytics, Borrowing Insights, Exchanges, Marketplace & Sales, Community & Reputation.
- Overview stat cards and charts.
- Books: total listings, search appearances, wishlist saves, CTR, views/wishlist/click trends, top viewed books.
- Borrow: borrowed/returned trends, average reading days, pass renewals.
- Exchange: successful/pending/rejected outcomes, approval rate, completion time.
- Sales: revenue, books sold, escrow payout success, order and average price charts.
- Community: reputation, followers, XP level, XP/follower chart, reputation radar, reviews chart.

Logic:

- Uses `lib/data/analytics.ts` arrays and hardcoded stat labels.
- Tab selection is local component state.
- Charts use Recharts.

## Dashboard Settings

Route: `/dashboard/settings`

Features:

- Profile information.
- Avatar upload/remove UI.
- Full name, username, designation, bio.
- Address details.
- Map location picker.
- Address search.
- Street suggestions.
- Notification preferences: email, push, marketing.

Logic:

- Uses local component state for map position, search results, street results, and address details.
- Location search calls Nominatim directly.
- Reverse geocode calls Nominatim directly.
- Selecting a result fills street/city/state/zip/country/lat/lng.
- Notification switches are UI-only.

## Dashboard Security

Route: `/dashboard/security`

Features:

- Change password form.
- Danger zone.
- Delete account button.

Logic:

- Form has current password, new password, confirm password fields.
- No submit handler/backend integration yet.
- Delete account button is UI-only.

## Dashboard Verification

Route: `/dashboard/verification`

Features:

- Identity verification page.
- Benefits sidebar.
- Document type select: NID, passport, driving license.
- Front/back document image upload UI.
- Document number input.

Logic:

- Upload inputs are hidden file inputs.
- Submit button is UI-only.

## Dashboard Reports

Route: `/dashboard/reports`

Features:

- Tabs: My Reports, Account Standing.
- Submitted reports list.
- Account status card.
- Strike history.
- Strike policy.

Logic:

- Report rows are hardcoded dummy data.
- Strike policy is static: warning, 7-day temporary ban, permanent ban.
- Strike expiry copy says 6 months of good behavior.

## Dashboard Notifications

Route: `/dashboard/notifications`

Features:

- Notification list.
- Notification tabs.
- Notification card with actor, type icon, timestamp, action link.
- Mark as read.
- Remove notification action.

Logic:

- Uses `mockNotifications`.
- Notification type controls icon and color.
- Read/unread state is local in notification components.
- Remove action is UI-only in card dropdown.

Notification types currently used:

- `exchange_accepted`
- `message`
- `borrow_request`
- `review`
- `system`
- `borrow_returned`

## Messaging

Routes:

- `/dashboard/messages`
- `/dashboard/messages/[username]`

Features:

- Conversation list.
- Search conversations.
- Chat thread.
- Online/last-seen indicator.
- Typing indicator.
- Message input.
- Attach button UI.
- Exchange proposal card inside messages.
- Accept/decline exchange proposal from chat.
- Floating message widget.
- Right sidebar message widget.

Logic:

- Uses `MOCK_CONVERSATIONS`.
- Sending a message appends local message.
- Simulated reply appears after typing delay.
- Exchange proposal modal uses hardcoded own books and their books.
- Accept/decline mutates local message proposal status.
- `prefill` query param can prefill message input.

Message fields:

- id, senderId, text, time, isRead.
- optional attachment.
- optional exchangeProposal with offering/requesting book and pending/accepted/declined status.

## Public Profiles

Routes:

- `/u/[username]`
- `/u/[username]/reviews`
- `/u/[username]/library`
- `/u/[username]/activity`
- `/u/[username]/badges`

Features:

- Public profile shell.
- Profile header.
- Sidebar profile info.
- Public library.
- Public reviews.
- Activity timeline.
- Badge collection.
- Location card.
- Verification badges.
- Edit profile dialog for own profile.

Logic:

- Loads `mockProfiles`, `profileLibraryBooks`, `profileReviews`, and activity from `/api/profile`.
- Unknown username shows profile not found.
- `isOwnProfile` is hardcoded true in some pages.
- Public profile exact address privacy note exists in mock data.
- Edit profile dialog uses local state and direct geocoding calls.

## Followers And Following

Routes:

- `/dashboard/followers`
- `/dashboard/following`

Features:

- Follower list page.
- Following list page.
- User cards.

Logic:

- Uses static/mock profile-related data.
- Follow/unfollow behavior is not fully backend-backed yet.

## Navigation And Layout

Features:

- Desktop navbar.
- Mobile navbar.
- Mobile bottom navigation.
- Mobile floating action button.
- Mega menu.
- Quick nav bar.
- Site header/footer.
- Dashboard layout/sidebar.
- Admin layout shell.
- Moderator layout shell.

Logic:

- Navigation items come from `lib/navigation.ts`.
- Several nav badges are static values.
- Mobile bottom add-book opens `AddBookDialog`.
- Header tracks scroll position to style at top/not-at-top.
- Footer links to `/terms`, `/privacy`, `/community-guidelines`.

Missing linked routes:

- `/terms`
- `/privacy`
- `/community-guidelines`
- `/admin/*`
- `/mod/*`

## Add Book Dialog

Component: `components/shared/add-book-button.tsx`

Features:

- Add book modal/dialog.
- Quick action to upload/list a new book.
- Used from dashboard sales, library, mobile bottom nav.

Logic:

- Dialog open/close state is local.
- Navigational actions route to upload/listing flows.

## Search Components

Components:

- `components/shared/search-bar.tsx`
- `components/shared/library-search-bar.tsx`
- `components/layout/search-bar.tsx`

Features:

- General search UI.
- Library/exchange search UI.
- Suggestion dropdown.
- Hidden query fields support.

Logic:

- Query state is local.
- Submit builds URL query params and routes with `router.push`.
- Some suggestion lists are static.
- Search behavior differs by `mode`.

## Location Components

Components:

- `location-map`
- `location-picker`
- profile/location card components.

Features:

- Map display.
- Draggable/clickable marker behavior.
- Location picker UI.
- Address display and privacy messaging.

Logic:

- Uses browser-only dynamic import for map in pages.
- Location search/reverse geocode currently handled in page components, not centralized.
- Exact address privacy is shown as copy, not enforced by frontend.

## Images And Upload UI

Components:

- `image-uploader`
- `image-upload`
- `book-gallery`
- profile avatar upload placeholders.

Features:

- Preview local selected images.
- Book gallery image switching.
- Multiple book image slots.

Logic:

- Image files are held in local state.
- No real upload progress or Cloudinary integration yet.
- Upload page says max 5MB image copy.

## Reviews, Badges, Reputation UI

Features:

- Star rating components.
- Review cards.
- Review form.
- Trust score meter.
- Badge pills/grids/collections.
- Reputation dashboard charts.

Logic:

- Rating visuals are component-driven.
- Review form submit is simulated.
- Reputation/badges are static/mock or derived from local/mock data.

## Admin And Moderator Shells

Components/routes:

- `components/layout/admin-layout.tsx`
- `components/layout/moderator-layout.tsx`
- admin/mod nav entries in `lib/navigation.ts`

Features:

- Layout shell exists for admin and moderator areas.
- Navigation includes reports, disputes, verification queue style entries.

Logic:

- Actual admin/mod pages are mostly future scope.
- Current frontend has no full admin CRUD UI for plans/content/moderation.

## Known Frontend-Only Simulations

- Auth submit actions.
- OTP verify/resend.
- Password reset.
- Book upload submit.
- Payment confirmation.
- Borrow request creation.
- Borrow status simulator.
- Return initiation.
- Extension request.
- Dispute creation.
- Peer review submit.
- Exchange proposal submit.
- Chat reply and typing.
- Report submit toast.
- Review submit.
- Seller order confirm/ship/cancel.
- Wallet withdrawal.

## Important Frontend Gaps To Remember

- Monthly Basic/Premium/Elite membership cards are stale and should be removed or replaced with backend-driven deposit plans.
- FAQ membership/refund/cancel content conflicts with canonical membership policy.
- `/orders/success` links to `/dashboard/purchases`, but the route is `/dashboard/orders`.
- `/books/upload?mode=donate` is linked but donation mode is not implemented in the form.
- Browser directly calls Photon/Nominatim in multiple places.
- Cart/wishlist stores are duplicated across `stores/*` and `lib/store/*`.
- Admin plan/CMS management UI is not built yet, though backend docs now require backend-controlled plans.
- Many public links exist without pages: `/community`, `/terms`, `/privacy`, `/newsletter`, `/featured-libraries`, `/books/for-you`.
