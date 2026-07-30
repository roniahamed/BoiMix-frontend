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
- Membership/pass UI is present in `/explore/central-library/memberships` and `/dashboard/passes`.
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
- Support email/password authentication with otp verification.

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
- every book image need to resize and it convert to less then 1 mb, but user can submit less than 15 mb images.
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

i want to use elasticsearch and i want to install it locally. and every search query save in elasticsearch. with location.

Responsibilities:

- Book search by title, author, ISBN, publisher, genre, language.
- Filter by availability mode, condition, price, owner type, distance.
- Sort by newest, rating, distance, price, popularity.
- Support Bengali/English text. others languages will be supported.
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

### 9. Memberships, Subscriptions, Borrow Passes

Requirement:

BoiMix borrowing uses a two-step access model:

1. A long-term library membership/subscription establishes the user's maximum borrow limit and library access.
2. Consumable borrow passes are required to order premium/online borrow books.

Current frontend rules from the membership pages:

- Basic Member: one-time `৳500`, valid for 4 years, borrow books up to `৳500`.
- Standard Member: one-time `৳1000`, valid for 4 years, borrow books up to `৳1000`, priority queue.
- Premium Member: one-time `৳2000`, valid for 4 years, borrow books up to `৳2000+`, VIP/express priority and badge.
- Membership fee is non-refundable.
- Membership can be renewed after 4 years.
- Membership upgrade should charge only the tier difference when possible.
- Welcome gift gives 5 free borrows valid for 2 months.
- Every member gets 1 donated book free per month.
- Borrow passes are consumable top-ups:
  - Mini Pass: `৳40`, 2 books, valid 1 month.
  - Standard Pass: `৳70`, 4 books, valid 1 month.
  - Pro Pass: `৳100`, 7 books, valid 2 months.
- Premium books always require a valid borrow pass, even for premium members.
- Donated monthly free book does not consume a borrow pass.

Responsibilities:

- Manage public membership plans and borrow pass packages.
- Keep all membership and pass rules backend-configurable from admin.
- Allow adding new plans/packages without code deploy.
- Allow editing pricing, validity, limits, benefits, and eligibility rules.
- Allow disabling/removing public visibility without deleting historical purchases.
- Allow future product changes if BoiMix wants to replace or expand the current plan structure.
- Track active membership tier, validity, renewal, and upgrades.
- Track borrow limit per membership.
- Track active pass wallet and pass expiry.
- Consume pass credits when a borrow order is confirmed.
- Refund/restore pass credit only when policy allows.
- Issue welcome free-borrow credits on first membership activation.
- Issue monthly donated-book credit.
- Enforce premium-book pass requirements.
- Enforce membership requirement before central library borrowing.
- Store all purchases in wallet/order ledger.
- Expose active pass wallet and usage history to dashboard.
- Admin can create/update/disable plans without code deploy.
- Admin can archive old plans and publish new plans while preserving purchase history.

Core tables:

- `membership_plans`
- `user_memberships`
- `membership_events`
- `borrow_pass_packages`
- `user_borrow_passes`
- `borrow_pass_credits`
- `borrow_pass_usages`
- `free_borrow_credits`
- `monthly_donated_book_credits`
- `plan_purchases`
- `membership_upgrade_quotes`
- `library_queue_priorities`
- `plan_change_logs`

Key APIs:

- `GET /api/memberships/plans`
- `GET /api/borrow-passes/packages`
- `GET /api/me/membership`
- `GET /api/me/passes`
- `GET /api/me/passes/history`
- `POST /api/memberships/checkout`
- `POST /api/memberships/renew`
- `POST /api/memberships/upgrade-quote`
- `POST /api/memberships/upgrade`
- `POST /api/borrow-passes/checkout`
- `POST /api/borrow-passes/{id}/consume`
- `POST /api/borrow-passes/{id}/restore`
- `GET /api/me/borrow-capacity`
- `GET /api/me/free-borrow-credits`
- `GET /api/admin/memberships/plans`
- `POST /api/admin/memberships/plans`
- `PATCH /api/admin/memberships/plans/{id}`
- `DELETE /api/admin/memberships/plans/{id}`
- `POST /api/admin/memberships/plans/{id}/archive`
- `GET /api/admin/borrow-passes/packages`
- `POST /api/admin/borrow-passes/packages`
- `PATCH /api/admin/borrow-passes/packages/{id}`
- `DELETE /api/admin/borrow-passes/packages/{id}`
- `POST /api/admin/borrow-passes/packages/{id}/archive`

Borrow eligibility rules:

```txt
Borrow request
  -> user must have active membership for central library/premium borrow
  -> book value must be <= membership borrow limit
  -> if donated monthly free book and monthly credit unused: no pass consumed
  -> else if premium/online borrow: valid unexpired pass credit required
  -> deposit/borrow limit must be available
  -> create borrow order
  -> reserve pass credit only after request is accepted or payment is confirmed
```

Pass lifecycle:

```txt
purchased -> active -> reserved -> consumed
                    -> restored
          -> expired
```

Membership lifecycle:

```txt
pending_payment -> active -> upgraded -> expired -> renewed
               -> cancelled_by_admin
```

Dashboard data:

- active membership name/tier
- member ID
- valid until
- borrow limit
- available borrow capacity
- currently locked amount
- active passes count
- pass credits remaining
- pass expiry date
- welcome gift credits remaining
- monthly donated book credit status
- pass usage history

Plan-management rules:

- Plans/packages are backend data, not frontend constants.
- Old plans should be soft-deleted or archived, not hard-deleted, if any user purchase/history references them.
- New plans can be added later with different price, duration, borrow limits, benefits, or visibility.
- Editing a plan should not silently rewrite historical purchase snapshots; purchase records should keep their original effective terms.

### 10. Marketplace Orders

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

### 11. Borrow System

Responsibilities:

- Order-centric borrow workflow.
- Deposit lock.
- Membership/pass eligibility check.
- Pass reservation and consumption.
- Monthly donated free-book credit check.
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
- `borrow_order_pass_reservations`
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
- `POST /api/borrow/orders/{id}/reserve-pass`
- `PATCH /api/borrow/orders/{id}/owner-handover`
- `PATCH /api/borrow/orders/{id}/borrower-receive`
- `POST /api/borrow/orders/{id}/return`
- `PATCH /api/borrow/orders/{id}/owner-confirm-return`
- `POST /api/borrow/orders/{id}/extensions`
- `POST /api/borrow/orders/{id}/disputes`
- `POST /api/borrow/orders/{id}/reviews`
- `POST /api/borrow/orders/check-eligibility`

Celery tasks:

- Expire pending borrow requests after 48 hours.
- Send due-date reminders.
- Apply overdue penalties.
- Expire old pass reservations.
- Issue monthly donated-book credits.
- Auto-complete meetup returns after timeout.
- Move stale courier returns to admin review.

### 12. Exchange System

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

### 13. Wallet And Ledger

Responsibilities:

- Deposit wallet.
- Locked deposit.
- Sales earnings.
- Payout request.
- Membership payments.
- Borrow pass purchases.
- Free-credit grants.
- Refunds/restores where policy allows.
- Manual/admin adjustments.
- One immutable ledger for every money or credit movement.

Core tables:

- `wallets`
- `wallet_transactions`
- `deposit_locks`
- `ledger_entries`
- `payment_intents`
- `payment_confirmations`
- `payout_requests`

Key APIs:

- `GET /api/me/wallet`
- `GET /api/me/wallet/transactions`
- `POST /api/me/wallet/deposit`
- `POST /api/me/wallet/payouts`
- `GET /api/me/wallet/ledger`
- `POST /api/payments/intents`
- `POST /api/payments/confirm`

### 14. Reviews, Badges, Reputation

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

### 15. Messaging

Requirement:

Use WebSocket for realtime chat with typing, delivered/read/seen indication.

Responsibilities:

- Conversations.
- Direct messages.
- Message attachments.
- Related order/borrow/exchange context.
- Exchange proposal cards inside chat messages.
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
- `message_exchange_proposals`

REST APIs:

- `GET /api/messages/conversations`
- `POST /api/messages/conversations`
- `GET /api/messages/conversations/{id}`
- `POST /api/messages/conversations/{id}/messages`
- `PATCH /api/messages/conversations/{id}/read`
- `POST /api/messages/conversations/{id}/exchange-proposals`
- `PATCH /api/messages/exchange-proposals/{id}/accept`
- `PATCH /api/messages/exchange-proposals/{id}/decline`

WebSocket:

- `WS /ws/conversations/{conversation_id}`

Events:

- `message.created`
- `message.delivered`
- `message.read`
- `typing.started`
- `typing.stopped`
- `presence.updated`

### 16. Notifications

Requirement:

In-app notifications using Firebase notification.

Responsibilities:

- Store notifications in database.
- Send realtime in-app notification.
- Send FCM push notification.
- Support read/unread state.
- Support notification categories: system, message, borrow, exchange, review, order, wallet.
- Support polymorphic `action_url`.
- Support user-side notification removal.

Core tables:

- `notifications`
- `notification_deliveries`
- `user_device_tokens`
- `notification_preferences`

Key APIs:

- `GET /api/notifications`
- `PATCH /api/notifications/{id}/read`
- `PATCH /api/notifications/read-all`
- `DELETE /api/notifications/{id}`
- `POST /api/me/devices`
- `PATCH /api/me/notification-preferences`

Celery tasks:

- `send_push_notification`
- `fanout_notification`
- `cleanup_old_notifications`

### 17. Central Library Operations

Responsibilities:

- Manage BoiMix-owned central library inventory separately from user listings.
- Track each physical library copy, condition, source, and availability.
- Mark books as regular, premium, donated, featured, new arrival, or most borrowed.
- Manage library collections and category shelves.
- Manage library queue priority from membership tier.
- Apply library-specific borrow duration, extension, and delivery rules.

Core tables:

- `library_branches`
- `library_inventory_items`
- `library_inventory_events`
- `library_collections`
- `library_collection_items`
- `library_book_flags`
- `library_queue_entries`

Key APIs:

- `GET /api/central-library/home`
- `GET /api/central-library/books`
- `GET /api/central-library/collections`
- `GET /api/central-library/stats`
- `POST /api/admin/central-library/inventory`
- `PATCH /api/admin/central-library/inventory/{id}`

### 18. Donations And Donor Rewards

Responsibilities:

- Support `/books/upload?mode=donate`.
- Let users submit one or more donated books.
- Verify metadata, condition, and pickup details.
- Schedule collection/pickup.
- Accept donation into central library inventory.
- Reject donation with reason.
- Award free Library Pass months, badges, and permanent Donor profile tag.

Core tables:

- `donation_requests`
- `donation_items`
- `donation_pickups`
- `donation_quality_checks`
- `donor_rewards`
- `donor_reward_redemptions`
- `donor_profile_tags`

Key APIs:

- `POST /api/donations`
- `GET /api/me/donations`
- `GET /api/donations/{id}`
- `PATCH /api/donations/{id}/pickup`
- `GET /api/admin/donations`
- `PATCH /api/admin/donations/{id}/verify`
- `PATCH /api/admin/donations/{id}/accept`
- `PATCH /api/admin/donations/{id}/reject`

### 19. Payments, Escrow, Delivery, Payouts

Responsibilities:

- Support checkout recipient fields: name, phone, district, thana, address.
- Group multi-seller orders and calculate delivery per seller.
- Store delivery zones and shipping rates, currently Dhaka `৳60` and outside Dhaka `৳120` per seller.
- Create payment intents for bKash, Nagad, COD, memberships, passes, and deposits.
- Hold marketplace money in escrow until buyer delivery confirmation.
- Release seller earnings into wallet ledger.
- Support seller payout to bKash, Nagad, or bank.
- Generate invoice data for buyer orders.

Core tables:

- `payment_intents`
- `payment_confirmations`
- `escrow_holds`
- `refunds`
- `delivery_zones`
- `shipping_rates`
- `shipments`
- `shipment_events`
- `payout_accounts`
- `payout_requests`
- `invoices`

### 20. Reading Tracker

Responsibilities:

- Annual reading goal.
- Currently reading items.
- Page progress logs.
- Mark as finished.
- Weekly page totals.
- Reading streaks.
- Up-next reading queue.
- Reading badges.

Core tables:

- `reading_goals`
- `reading_items`
- `reading_progress_logs`
- `reading_streaks`
- `reading_queue_items`

Key APIs:

- `GET /api/me/reading`
- `PATCH /api/me/reading/goals/current-year`
- `POST /api/me/reading/items`
- `POST /api/me/reading/items/{id}/progress`
- `POST /api/me/reading/items/{id}/finish`
- `POST /api/me/reading/queue`

### 21. CMS, Marketing, Campaigns

Responsibilities:

- Homepage hero carousel.
- Category blocks.
- Author spotlight.
- Testimonials.
- Newsletter subscriptions.
- FAQ categories/items.
- Festival/campaign pages with events, featured authors, featured books, new arrivals, and discount rules.
- Featured listing and publisher partnership revenue surfaces.

Core tables:

- `cms_pages`
- `hero_banners`
- `sponsors`
- `sponsor_campaigns`
- `testimonials`
- `newsletter_subscribers`
- `faqs`
- `author_spotlights`
- `community_posts`
- `campaigns`
- `campaign_events`
- `campaign_categories`
- `campaign_books`
- `campaign_authors`
- `discount_rules`
- `featured_listing_slots`
- `publisher_partnerships`

Key APIs:

- `GET /api/home`
- `POST /api/newsletter/subscribe`
- `GET /api/faqs`
- `GET /api/sponsors`
- `GET /api/testimonials`
- `GET /api/campaigns/{slug}`
- `GET /api/admin/cms/pages`
- `POST /api/admin/campaigns`

### 22. Auth Security And Onboarding Extras

Responsibilities:

- Email/password login and registration beside Firebase Google/Apple.
- Email OTP verification and resend.
- Password reset flow.
- Password change from dashboard.
- Terms/privacy version acceptance.
- Preferred language.
- Student ID verification and discount eligibility.
- Account deletion request and retention workflow.
- Session/device listing and security events.

Core tables:

- `otp_codes`
- `password_reset_requests`
- `terms_acceptances`
- `user_preferences`
- `student_verifications`
- `user_devices`
- `security_events`
- `account_deletion_requests`

Key APIs:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/otp/verify`
- `POST /api/auth/otp/resend`
- `POST /api/auth/password/forgot`
- `POST /api/auth/password/reset`
- `POST /api/me/password/change`
- `PATCH /api/me/preferences`
- `POST /api/me/student-verification`
- `POST /api/me/account-deletion`

### 23. Recommendations And Event Analytics

Responsibilities:

- Recently viewed books.
- Personalized "Only For You" lists.
- Search appearances and impressions.
- Book/listing clicks.
- Wishlist saves.
- Listing CTR.
- Daily analytics snapshots for dashboard charts.
- Recommendation source labels.

Core tables:

- `book_view_events`
- `search_impression_events`
- `listing_click_events`
- `recommendation_events`
- `daily_user_analytics`
- `daily_listing_analytics`

### 24. Support, Reports, Strikes

Responsibilities:

- User reports against books, users, reviews, messages, orders, borrow orders, and exchanges.
- Account standing.
- Warning, temporary ban, permanent ban.
- Strike expiry after 6 months where policy allows.
- Support ticket flow from FAQ/contact.
- Moderator/admin audit trail.

Core tables:

- `reports`
- `report_categories`
- `report_events`
- `account_strikes`
- `moderation_actions`
- `support_tickets`
- `support_ticket_messages`

## User Dashboard Backend Map

The dashboard is not one feature. It is a collection of user-owned operational views. Each route needs its own API surface.

| Frontend Route                   | Backend Domain             | Data Needed                                                                                |
| -------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------ |
| `/dashboard`                     | dashboard shell            | menu badges, unread counts, pending actions                                                |
| `/dashboard/overview`            | dashboard analytics        | stats, action summary, activity, continue actions.                                         |
| `/dashboard/action-center`       | borrow/exchange/messages   | pending borrow requests, exchange offers, due returns                                      |
| `/dashboard/library`             | books/inventory            | user listings, inventory status, edit/delete actions                                       |
| `/dashboard/reading`             | reading tracker            | reading goals, progress logs, currently reading                                            |
| `/dashboard/borrowed`            | borrow                     | orders where current user is borrower                                                      |
| `/dashboard/lent`                | borrow                     | orders where current user is owner/lender                                                  |
| `/dashboard/requests`            | borrow                     | incoming borrow requests requiring owner action                                            |
| `/dashboard/exchanges`           | exchange                   | active exchange orders                                                                     |
| `/dashboard/exchanges/offers`    | exchange                   | incoming/outgoing exchange proposals and counter offers                                    |
| `/dashboard/sales`               | marketplace                | seller customer orders                                                                     |
| `/dashboard/orders`              | marketplace                | buyer purchase orders                                                                      |
| `/dashboard/cart`                | carts                      | buy/borrow cart redirect/state                                                             |
| `/dashboard/wallet`              | wallet                     | available balance, locked funds, payout, ledger                                            |
| `/dashboard/passes`              | memberships/passes         | active membership, active passes, borrow capacity, plan store, free credits, usage history |
| `/dashboard/messages`            | messaging                  | conversation list, unread count                                                            |
| `/dashboard/messages/[username]` | messaging                  | conversation thread, realtime chat                                                         |
| `/dashboard/notifications`       | notifications              | notification list, read/unread                                                             |
| `/dashboard/settings`            | users/location/preferences | profile, address, map pin, notification preferences                                        |
| `/dashboard/security`            | auth/security              | password/session/device/2FA placeholders                                                   |
| `/dashboard/verification`        | verification/media         | ID upload, verification status                                                             |
| `/dashboard/reports`             | moderation                 | submitted reports, account standing                                                        |
| `/dashboard/analytics`           | analytics                  | books, borrow, exchange, sales, community charts                                           |
| `/dashboard/followers`           | social                     | follower list                                                                              |
| `/dashboard/following`           | social                     | following list                                                                             |

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
- `GET /api/me/analytics/membership`

## Missing Coverage Audit

These areas were missing or too shallow in the earlier draft and must be included before backend implementation starts:

- Membership/subscription plans.
- Membership purchase, renewal, upgrade, expiry, and non-refundable policy.
- Borrow pass packages.
- Active pass wallet.
- Pass credit reserve, consume, restore, and expire logic.
- Welcome gift: 5 free borrows valid for 2 months.
- Monthly donated free-book credit that does not consume paid pass credits.
- Premium-book pass requirement.
- Membership-based borrow limit and priority queue.
- Dashboard membership/pass summary.
- Pass usage history.
- Admin plan and pass-package management.
- Payment intent and manual payment confirmation lifecycle.
- Immutable wallet/ledger entries for memberships, passes, sales, deposits, payouts, free credits, and adjustments.
- Expiry warning notifications for membership and passes.
- Membership/reputation/badge connection.
- Central library operational rules: inventory source, donated books, premium books, queue priority, borrow duration.
- Donation request, pickup, quality check, central inventory conversion, donor reward, and donor tag workflow.
- Reading tracker: annual goal, currently reading, page logs, streaks, queue, and reading badges.
- CMS/content system for homepage hero, categories, testimonials, sponsors, FAQs, community previews, and newsletter.
- Festival/campaign system for events, featured authors, campaign books, discounts, publisher partnerships, and featured listing revenue.
- Auth extras: local email/password, OTP, password reset, terms/privacy acceptance, preferred language, student discount verification, account deletion.
- Reports/support/account standing: target-specific reports, strike policy, warning/ban lifecycle, support ticket messages.
- Payment/escrow/delivery details: multi-seller shipping, Dhaka/outside-Dhaka rates, invoice, courier tracking, payout accounts, minimum withdrawal policy.
- Recommendations and event analytics: recently viewed, only-for-you, impressions, clicks, CTR, wishlist saves, daily snapshots.
- Coupons/promo/referral/sponsored/featured listing revenue items still need final product policy before schema freeze.

Resolved product decisions:

- Membership schema follows only the 4-year deposit model: Basic `৳500`, Standard `৳1000`, Premium `৳2000`.
- Monthly `Basic/Premium/Elite` plan copy in `/explore/central-library` is stale frontend content and must not drive backend schema.

Open product decisions before schema freeze:

- Decide if FAQ cancellation/refund copy is still valid, because membership details say one-time non-refundable.
- Decide student discount scope: membership only, borrow passes, delivery, or all purchases.
- Decide upload image limit: frontend says 5MB, backend requirement says accept up to 15MB and compress below 1MB.

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
