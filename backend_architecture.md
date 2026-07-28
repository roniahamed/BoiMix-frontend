# BoiMix Backend Architecture

## Purpose

This document maps the current BoiMix frontend to a production backend. The current codebase is a Next.js frontend with mock API routes, JSON data, and local Zustand stores. The backend must replace those mocks without changing the product direction.

No third-party backend database service is used. PostgreSQL is the source of truth.

## Current Frontend Findings

- App framework: Next.js App Router, TypeScript, Tailwind CSS, Shadcn UI.
- Real backend client already exists in `lib/api/client.ts` through `NEXT_PUBLIC_API_BASE_URL`.
- Mock APIs live in `app/api/*`.
- Server components use `lib/fetchLocal.ts` to read local JSON.
- Client flows use Zustand stores:
  - auth session
  - buy cart
  - borrow cart
  - wishlist
  - borrow orders
  - exchange orders
  - message unread count
- Dashboard pages are present and need full backend coverage.
- Upload book flow currently previews local files and mock-submits form data.
- Location search/reverse geocode is currently called from browser using Photon/Nominatim.
- Messaging and notification UIs exist but are not backed by WebSocket, database, or Firebase yet.

## Recommended Backend Stack

- Backend API: Django + Django REST Framework
- Realtime: Django Channels
- Database: PostgreSQL + PostGIS
- Cache: Redis
- Queue: Celery + Redis
- Search: Elasticsearch
- Location search: self-hosted Photon with Elasticsearch index
- Auth provider: Firebase Admin SDK for Google and Apple identity token verification
- Push notification: Firebase Cloud Messaging
- Storage: Cloudinary
- Image processing: Pillow/libvips through Celery workers
- Deployment: Docker Compose on VPS, Nginx reverse proxy, GitHub Actions CI/CD

## System Services

```txt
Next.js frontend
  |
  | REST API / WebSocket
  v
Django API + DRF + Channels
  |
  |-- PostgreSQL/PostGIS: primary data
  |-- Redis: cache, rate limits, Channels layer, Celery broker
  |-- Celery workers: image jobs, notification jobs, search indexing, reputation jobs
  |-- Elasticsearch: book and user discovery
  |-- Photon: location autocomplete/search
  |-- Firebase: Google/Apple auth verification + FCM
  |-- Cloudinary: image storage
```

## Backend Modules

### 1. Auth

Responsibilities:

- Verify Firebase Google/Apple ID tokens.
- Create or link local BoiMix user accounts.
- Issue app access/refresh tokens.
- Support roles: user, moderator, admin.
- Store Firebase UID and provider metadata.
- Support email/password authentication.

Core tables:

- `users`
- `firebase_identities`
- `refresh_tokens`
- `user_sessions`

Key APIs:

- `POST /api/auth/firebase-login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/auth/me`

### 2. Users And Profiles

Responsibilities:

- Public profile pages.
- Dashboard profile editing.
- Avatar/cover image references.
- Reading interests.
- Public privacy boundaries.
- Followers/following.
- Verification status.

Core tables:

- `user_profiles`
- `user_social_links`
- `user_reading_interests`
- `follows`
- `user_verifications`
- `verification_documents`

Key APIs:

- `GET /api/users/{username}`
- `PATCH /api/me/profile`
- `GET /api/users/{username}/library`
- `GET /api/users/{username}/reviews`
- `GET /api/users/{username}/activity`
- `GET /api/users/{username}/badges`
- `GET /api/me/followers`
- `GET /api/me/following`
- `POST /api/users/{id}/follow`
- `DELETE /api/users/{id}/follow`

### 3. Books And Inventory

Responsibilities:

- Book metadata.
- User-owned listings.
- BoiMix central library listings.
- Sell, borrow, exchange availability.
- Stock/quantity tracking.
- Condition, edition, language, category, publisher.
- Book details page.
- Owner information.
- Q&A and reviews.

Core tables:

- `book_metadata`
- `authors`
- `publishers`
- `categories`
- `book_categories`
- `book_listings`
- `book_listing_modes`
- `book_images`
- `book_questions`
- `book_answers`

Key APIs:

- `GET /api/books`
- `GET /api/books/{slug}`
- `POST /api/books`
- `PATCH /api/books/{id}`
- `DELETE /api/books/{id}`
- `GET /api/me/library`
- `GET /api/books/categories`
- `POST /api/books/{id}/questions`
- `POST /api/books/questions/{id}/answers`

### 4. ISBN Autofill

Requirement:

First check own database. If found, return local normalized value. If not found, call Google Books API, normalize, store, then return.

Core tables:

- `book_metadata`
- `isbn_lookup_logs`
- `external_book_sources`

Key APIs:

- `GET /api/books/isbn/{isbn}`

Flow:

```txt
Request ISBN
  -> normalize ISBN
  -> query book_metadata
  -> if found return source=local
  -> else call Google Books API
  -> normalize title/author/publisher/page_count/description/cover
  -> save book_metadata and source metadata
  -> return source=google_books
```

### 5. Media And Cloudinary

Responsibilities:

- Upload book covers, back covers, inside pages, table of contents, index images.
- Upload profile avatar/cover.
- Upload verification documents.
- Upload chat attachments.
- Validate file size/type.
- Resize, optimize, convert to WebP in background and delete the original.
- every book using the thumbnail and cover images.
- Store Cloudinary public IDs and variants.

Core tables:

- `media_assets`
- `media_variants`
- `media_processing_jobs`

Key APIs:

- `POST /api/media/uploads`
- `GET /api/media/{id}`
- `DELETE /api/media/{id}`

Celery tasks:

- `process_image_upload`
- `generate_webp_variants`
- `delete_cloudinary_asset`
- `attach_media_to_entity`

### 6. Location And Maps

Responsibilities:

- Store user/listing coordinates with PostGIS.
- Support nearby books.
- Search locations.
- Reverse geocode map pin.
- Cache repeated location requests in Redis.
- Keep exact address private until transaction is accepted.

Core tables:

- `locations`
- `user_locations`
- `listing_locations`
- `service_areas`

Key APIs:

- `GET /api/locations/search?q=...`
- `GET /api/locations/reverse?lat=...&lng=...`
- `GET /api/books/nearby?lat=...&lng=...&radius_km=...`

Search:

- Photon handles autocomplete.
- PostGIS handles distance and radius query.
- Redis caches geocode/reverse-geocode results.

### 7. Search

Requirement:

Use Photon and Elasticsearch for location search, reverse location search, and book search.

Responsibilities:

- Book search by title, author, ISBN, publisher, genre, language.
- Filter by availability mode, condition, price, owner type, distance.
- Sort by newest, rating, distance, price, popularity.
- Support Bengali/English text.
- Index listing and metadata changes from Celery.

Indexes:

- `books`
- `users`
- `locations`

Key APIs:

- `GET /api/search/books`
- `GET /api/search/suggestions`
- `GET /api/search/users`

### 8. Wishlist And Carts

Responsibilities:

- Replace local wishlist store.
- Replace buy cart store.
- Replace borrow cart store.
- Support authenticated cross-device state.

Core tables:

- `wishlists`
- `wishlist_items`
- `carts`
- `cart_items`
- `borrow_carts`
- `borrow_cart_items`

Key APIs:

- `GET /api/me/wishlist`
- `POST /api/me/wishlist/items`
- `DELETE /api/me/wishlist/items/{book_id}`
- `GET /api/me/cart`
- `POST /api/me/cart/items`
- `PATCH /api/me/cart/items/{id}`
- `DELETE /api/me/cart/items/{id}`
- `GET /api/me/borrow-cart`
- `POST /api/me/borrow-cart/items`
- `DELETE /api/me/borrow-cart/items/{book_id}`

### 9. Marketplace Orders

Responsibilities:

- Buy checkout.
- Seller customer orders dashboard.
- Buyer order dashboard.
- Order tracking.
- Shipping details.
- Cancel/confirm/ship/complete flow.
- Wallet ledger for seller earnings.

Core tables:

- `orders`
- `order_items`
- `order_status_events`
- `payments`
- `shipments`
- `seller_payouts`

Key APIs:

- `POST /api/orders/checkout`
- `GET /api/me/orders`
- `GET /api/me/sales`
- `GET /api/orders/{id}`
- `PATCH /api/orders/{id}/confirm`
- `PATCH /api/orders/{id}/cancel`
- `PATCH /api/orders/{id}/ship`
- `PATCH /api/orders/{id}/complete`
- `GET /api/orders/{id}/tracking`

### 10. Borrow System

Responsibilities:

- Order-centric borrow workflow.
- Deposit lock.
- Owner review.
- Counter offer.
- Payment.
- Dual handover confirmation.
- Active borrow countdown.
- Return initiation.
- Courier tracking or meetup confirmation.
- Dispute.
- Review.
- Auto-expiry and auto-complete tasks.

Core tables:

- `borrow_orders`
- `borrow_order_items`
- `borrow_status_events`
- `borrow_counter_offers`
- `borrow_return_proofs`
- `borrow_extensions`
- `deposit_locks`
- `disputes`

Key APIs:

- `POST /api/borrow/orders`
- `GET /api/me/borrowed`
- `GET /api/me/lent`
- `GET /api/borrow/orders/{id}`
- `PATCH /api/borrow/orders/{id}/accept`
- `PATCH /api/borrow/orders/{id}/reject`
- `POST /api/borrow/orders/{id}/counter-offers`
- `PATCH /api/borrow/orders/{id}/counter-offers/{counter_id}/accept`
- `PATCH /api/borrow/orders/{id}/pay`
- `PATCH /api/borrow/orders/{id}/owner-handover`
- `PATCH /api/borrow/orders/{id}/borrower-receive`
- `POST /api/borrow/orders/{id}/return`
- `PATCH /api/borrow/orders/{id}/owner-confirm-return`
- `POST /api/borrow/orders/{id}/extensions`
- `POST /api/borrow/orders/{id}/disputes`
- `POST /api/borrow/orders/{id}/reviews`

Celery tasks:

- Expire pending borrow requests after 48 hours.
- Send due-date reminders.
- Apply overdue penalties.
- Auto-complete meetup returns after timeout.
- Move stale courier returns to admin review.

### 11. Exchange System

Responsibilities:

- Proposal creation.
- Incoming/outgoing offers.
- Counter offers.
- Agreement.
- Meetup/handover.
- Complete/reject/dispute.

Core tables:

- `exchange_orders`
- `exchange_status_events`
- `exchange_counter_offers`
- `exchange_handover_confirmations`
- `disputes`

Key APIs:

- `POST /api/exchanges`
- `GET /api/me/exchanges`
- `GET /api/me/exchanges/offers`
- `GET /api/exchanges/{id}`
- `PATCH /api/exchanges/{id}/accept`
- `PATCH /api/exchanges/{id}/reject`
- `POST /api/exchanges/{id}/counter-offers`
- `PATCH /api/exchanges/{id}/counter-offers/{counter_id}/accept`
- `PATCH /api/exchanges/{id}/handover`
- `PATCH /api/exchanges/{id}/complete`
- `POST /api/exchanges/{id}/disputes`

### 12. Wallet And Passes

Responsibilities:

- Deposit wallet.
- Locked deposit.
- Sales earnings.
- Payout request.
- Membership/pass plans.
- Borrowing capacity.

Core tables:

- `wallets`
- `wallet_transactions`
- `deposit_locks`
- `membership_plans`
- `user_memberships`
- `borrow_passes`
- `payout_requests`

Key APIs:

- `GET /api/me/wallet`
- `GET /api/me/wallet/transactions`
- `POST /api/me/wallet/deposit`
- `POST /api/me/wallet/payouts`
- `GET /api/memberships/plans`
- `POST /api/memberships/checkout`
- `GET /api/me/passes`

### 13. Reviews, Badges, Reputation

Requirement:

Reputation score is calculated from reviews, ratings, and badges.

Responsibilities:

- Book reviews.
- User transaction reviews.
- Review eligibility only after valid borrow/sale/exchange.
- Badge assignment.
- Reputation recalculation.

Core tables:

- `reviews`
- `review_targets`
- `badges`
- `user_badges`
- `reputation_scores`
- `reputation_events`

Reputation inputs:

- Average transaction rating.
- On-time return ratio.
- Successful exchange count.
- Completed sales count.
- Response rate.
- Verification status.
- Dispute ratio.
- Badge weights.

Key APIs:

- `GET /api/users/{username}/reviews`
- `POST /api/reviews`
- `POST /api/reviews/{id}/helpful`
- `GET /api/me/reputation`
- `GET /api/badges`

Celery tasks:

- `recalculate_user_reputation`
- `award_badges`
- `refresh_rating_aggregates`

### 14. Messaging

Requirement:

Use WebSocket for realtime chat with typing, delivered/read/seen indication.

Responsibilities:

- Conversations.
- Direct messages.
- Message attachments.
- Related order/borrow/exchange context.
- Typing indicators.
- Online/last seen.
- Read receipts.
- Unread counters.

Core tables:

- `conversations`
- `conversation_participants`
- `messages`
- `message_attachments`
- `message_receipts`
- `presence_sessions`

REST APIs:

- `GET /api/messages/conversations`
- `POST /api/messages/conversations`
- `GET /api/messages/conversations/{id}`
- `POST /api/messages/conversations/{id}/messages`
- `PATCH /api/messages/conversations/{id}/read`

WebSocket:

- `WS /ws/conversations/{conversation_id}`

Events:

- `message.created`
- `message.delivered`
- `message.read`
- `typing.started`
- `typing.stopped`
- `presence.updated`

### 15. Notifications

Requirement:

In-app notifications using Firebase notification.

Responsibilities:

- Store notifications in database.
- Send realtime in-app notification.
- Send FCM push notification.
- Support read/unread state.
- Support notification categories: system, message, borrow, exchange, review, order, wallet.

Core tables:

- `notifications`
- `notification_deliveries`
- `user_device_tokens`
- `notification_preferences`

Key APIs:

- `GET /api/notifications`
- `PATCH /api/notifications/{id}/read`
- `PATCH /api/notifications/read-all`
- `POST /api/me/devices`
- `PATCH /api/me/notification-preferences`

Celery tasks:

- `send_push_notification`
- `fanout_notification`
- `cleanup_old_notifications`

## User Dashboard Backend Map

The dashboard is not one feature. It is a collection of user-owned operational views. Each route needs its own API surface.

| Frontend Route                   | Backend Domain             | Data Needed                                             |
| -------------------------------- | -------------------------- | ------------------------------------------------------- |
| `/dashboard`                     | dashboard shell            | menu badges, unread counts, pending actions             |
| `/dashboard/overview`            | dashboard analytics        | stats, action summary, activity, continue reading       |
| `/dashboard/action-center`       | borrow/exchange/messages   | pending borrow requests, exchange offers, due returns   |
| `/dashboard/library`             | books/inventory            | user listings, inventory status, edit/delete actions    |
| `/dashboard/reading`             | reading tracker            | reading goals, progress logs, currently reading         |
| `/dashboard/borrowed`            | borrow                     | orders where current user is borrower                   |
| `/dashboard/lent`                | borrow                     | orders where current user is owner/lender               |
| `/dashboard/requests`            | borrow                     | incoming borrow requests requiring owner action         |
| `/dashboard/exchanges`           | exchange                   | active exchange orders                                  |
| `/dashboard/exchanges/offers`    | exchange                   | incoming/outgoing exchange proposals and counter offers |
| `/dashboard/sales`               | marketplace                | seller customer orders                                  |
| `/dashboard/orders`              | marketplace                | buyer purchase orders                                   |
| `/dashboard/cart`                | carts                      | buy/borrow cart redirect/state                          |
| `/dashboard/wallet`              | wallet                     | available balance, locked funds, payout, ledger         |
| `/dashboard/passes`              | memberships                | active passes, borrow capacity, plan store              |
| `/dashboard/messages`            | messaging                  | conversation list, unread count                         |
| `/dashboard/messages/[username]` | messaging                  | conversation thread, realtime chat                      |
| `/dashboard/notifications`       | notifications              | notification list, read/unread                          |
| `/dashboard/settings`            | users/location/preferences | profile, address, map pin, notification preferences     |
| `/dashboard/security`            | auth/security              | password/session/device/2FA placeholders                |
| `/dashboard/verification`        | verification/media         | ID upload, verification status                          |
| `/dashboard/reports`             | moderation                 | submitted reports, account standing                     |
| `/dashboard/analytics`           | analytics                  | books, borrow, exchange, sales, community charts        |
| `/dashboard/followers`           | social                     | follower list                                           |
| `/dashboard/following`           | social                     | following list                                          |

Dashboard summary API:

- `GET /api/me/dashboard/summary`

Response should include:

- unread message count
- unread notification count
- pending borrow request count
- pending exchange offer count
- active borrow count
- return due count
- active sales count
- wallet available balance
- reputation score
- active pass summary

Dashboard analytics APIs:

- `GET /api/me/analytics/overview`
- `GET /api/me/analytics/books`
- `GET /api/me/analytics/borrow`
- `GET /api/me/analytics/exchanges`
- `GET /api/me/analytics/sales`
- `GET /api/me/analytics/community`

## Response Cache Plan

Use Redis for:

- public book detail cache
- book listing/search cache for non-personalized requests
- profile public cache
- category cache
- location search/reverse geocode cache
- dashboard summary short cache
- analytics cache

Do not cache:

- chat thread writes
- payment mutations
- borrow/exchange status mutations
- verification documents
- private addresses

Cache invalidation:

- listing update invalidates book detail, owner library, search index job
- review update invalidates rating/reputation/profile
- borrow/exchange/order mutation invalidates dashboard summary and notifications

## Security Rules

- All dashboard APIs require authentication.
- Every mutation checks object ownership or role permission.
- Exact address visible only after accepted transaction.
- Verification documents are private.
- Message access limited to conversation participants.
- Moderation/admin APIs require moderator/admin role.
- Rate limit auth, upload, message, location, and ISBN endpoints.

## Deployment Architecture

VPS services through Docker Compose:

- `nginx`
- `frontend`
- `backend`
- `postgres`
- `redis`
- `celery-worker`
- `celery-beat`
- `channels-worker`
- `elasticsearch`
- `photon`

GitHub Actions:

- lint
- typecheck
- backend tests
- build Docker images
- push image
- deploy to VPS over SSH
- run migrations
- restart services

Backups:

- PostgreSQL daily dump
- media metadata backup
- Redis not treated as durable data
- Cloudinary assets retained by public ID

## Frontend Migration Strategy

1. Keep current UI.
2. Replace `fetchLocal.ts` reads route by route.
3. Replace local Zustand persisted stores with API-backed TanStack Query mutations.
4. Keep local stores only for UI state and optimistic state.
5. Move browser Photon/Nominatim calls behind backend location APIs.
6. Add WebSocket client for messages and notification badge updates.
7. Add Firebase client token registration for push notifications.
