# BoiMix Backend Phase By Phase Plan

## Ground Rules

- Do not change frontend UI first.
- Build backend contracts to match existing frontend routes.
- Replace mock data gradually.
- PostgreSQL is the source of truth.
- Redis is cache/queue/realtime support, not source of truth.
- Every phase ends with API docs, tests, and frontend integration notes.
- Dashboard must be treated as a first-class backend product, not an afterthought.
- everyquery need to be optimises also write the minimal and optimise code.
- only write the essinsial comment, don't write generic comment and unnessery comment.
- for writing the models also refer the frontend code and try to match the frontend code with backend code.
- if any changes on the front-end then notify me about that changes and ask for the changes on the back-end.

## Phase 0 - Backend Project Foundation

Goal:

Create the backend skeleton and local production-like environment.

Tasks:

- Create Django project.
- Add Django REST Framework.
- Add PostgreSQL/PostGIS.
- Add Redis.
- Add Celery worker and Celery beat.
- Add Django Channels.
- Add Docker Compose.
- Add environment config.
- Add healthcheck endpoint.
- Add base API error format.
- Add OpenAPI/Swagger docs.

Deliverables:

- `GET /api/health`
- Docker services boot locally.
- GitHub Actions runs backend lint/test.

## Phase 1 - Auth, Users, Roles

Goal:

Support Firebase Google/Apple login and local BoiMix user identity.

Tasks:

- Firebase Admin SDK setup.
- Verify Firebase ID token.
- Create/link local user.
- Issue app JWT access/refresh tokens.
- Add roles: user, moderator, admin.
- Add current user endpoint.
- Add username uniqueness.
- Add auth middleware and permissions.

APIs:

- `POST /api/auth/firebase-login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/auth/me`

Frontend routes unlocked:

- `/auth/login`
- `/auth/register`
- `/auth/complete-profile`
- `/auth/choose-language`
- `/dashboard`

Acceptance:

- Google/Apple Firebase token creates or logs in a BoiMix user.
- Frontend can store access token through existing auth provider path.

## Phase 2 - Profile, Settings, Followers

Goal:

Replace mock profile JSON with real users and profile APIs.

Tasks:

- User profile model.
- Public profile visibility fields.
- Profile edit endpoint.
- Social links.
- Reading interests.
- Follower/following tables.
- Public/private address boundary.
- Profile activity feed base table.

APIs:

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

Frontend routes unlocked:

- `/u/[username]`
- `/u/[username]/reviews`
- `/u/[username]/library`
- `/u/[username]/activity`
- `/u/[username]/badges`
- `/dashboard/settings`
- `/dashboard/followers`
- `/dashboard/following`

Acceptance:

- Unknown username returns 404-friendly response.
- Public profile hides exact private address.

## Phase 3 - Media, Cloudinary, Image Processing

Goal:

Support all image/document uploads with background optimization.

Tasks:

- Media asset model.
- Upload endpoint.
- Cloudinary integration.
- Celery image resize/optimize.
- WebP conversion.
- Attach assets to profile, books, messages, verification.
- Store variants.
- Delete cleanup.

APIs:

- `POST /api/media/uploads`
- `GET /api/media/{id}`
- `DELETE /api/media/{id}`

Frontend routes unlocked:

- `/books/upload`
- `/dashboard/verification`
- `/dashboard/settings`
- chat attachments later

Acceptance:

- Uploaded image is stored in Cloudinary.
- Worker creates optimized WebP variants.
- API returns original and variant URLs.

## Phase 4 - Book Catalog, Listings, ISBN Autofill

Goal:

Replace book mock APIs and support upload book.

Tasks:

- Book metadata schema.
- Author/publisher/category models.
- Listing model with owner.
- Sell/borrow/exchange mode model.
- Availability and quantity model.
- Image attachment.
- ISBN local lookup.
- Google Books API fallback.
- Book Q&A.
- Rating aggregate placeholders.

APIs:

- `GET /api/books`
- `GET /api/books/{slug}`
- `POST /api/books`
- `PATCH /api/books/{id}`
- `DELETE /api/books/{id}`
- `GET /api/books/isbn/{isbn}`
- `GET /api/me/library`
- `GET /api/books/categories`
- `POST /api/books/{id}/questions`
- `POST /api/books/questions/{id}/answers`

Frontend routes unlocked:

- `/`
- `/books`
- `/books/[slug]`
- `/books/search`
- `/books/trending`
- `/books/new`
- `/books/category`
- `/books/category/[genre]`
- `/books/upload`
- `/dashboard/library`

Acceptance:

- Existing `BookCardBook` frontend shape can be returned by list APIs.
- ISBN endpoint checks DB before Google Books.

## Phase 5 - Search And Location

Goal:

Move book search, location search, reverse location, and nearby discovery to backend.

Tasks:

- Elasticsearch setup.
- Book index mapping.
- Bengali/English analyzer strategy.
- Celery indexing task.
- PostGIS location schema.
- Photon integration/proxy.
- Reverse geocode endpoint.
- Redis cache for geocode/search suggestions.
- Nearby books radius query.

APIs:

- `GET /api/search/books`
- `GET /api/search/suggestions`
- `GET /api/search/users`
- `GET /api/locations/search`
- `GET /api/locations/reverse`
- `GET /api/books/nearby`

Frontend routes unlocked:

- `/books/search`
- `/books/near-me`
- `/explore/central-library/search`
- `/explore/exchanges/search`
- `/books/upload` location field
- `/dashboard/settings` location field

Acceptance:

- Frontend no longer calls Photon/Nominatim directly.
- Nearby books use PostGIS distance.

## Phase 6 - Wishlist, Buy Cart, Borrow Cart

Goal:

Replace local persisted cart/wishlist stores with authenticated APIs.

Tasks:

- Wishlist model.
- Buy cart model.
- Borrow cart model.
- Quantity rules.
- Borrow eligibility pre-check.
- Owner grouping rules.
- Optimistic frontend mutation contract.

APIs:

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
- `POST /api/me/borrow-cart/check-eligibility`

Frontend routes unlocked:

- `/wishlist`
- `/cart`
- `/cart/checkout`
- `/borrow/checkout`
- book card wishlist/cart actions

Acceptance:

- Cart/wishlist survives across devices.
- Borrow cart validates deposit and owner grouping.

## Phase 7 - Memberships, Subscriptions, Borrow Passes

Goal:

Implement BoiMix's two-step borrow access model: long-term membership plus consumable borrow passes.

Tasks:

- Membership plan model.
- Borrow pass package model.
- Plan versioning and soft-delete/archive strategy.
- Admin-configurable plan benefits/rules instead of frontend constants.
- Active user membership model.
- Membership purchase checkout.
- Membership renewal after 4 years.
- Membership upgrade quote and upgrade payment.
- Active pass wallet.
- Pass purchase checkout.
- Pass expiry.
- Pass credit reserve/consume/restore rules.
- Welcome gift: 5 free borrows, valid for 2 months.
- Monthly donated free-book credit.
- Premium-book pass requirement.
- Borrow capacity calculation.
- Priority queue flags by membership tier.
- Member ID generation.
- Dashboard pass usage history.
- Admin plan management.
- Admin can add new plan/package, edit existing, archive old ones, and publish replacements.

APIs:

- `GET /api/memberships/plans`
- `GET /api/borrow-passes/packages`
- `GET /api/me/membership`
- `GET /api/me/passes`
- `GET /api/me/passes/history`
- `GET /api/me/borrow-capacity`
- `GET /api/me/free-borrow-credits`
- `POST /api/memberships/checkout`
- `POST /api/memberships/renew`
- `POST /api/memberships/upgrade-quote`
- `POST /api/memberships/upgrade`
- `POST /api/borrow-passes/checkout`
- `POST /api/borrow-passes/{id}/consume`
- `POST /api/borrow-passes/{id}/restore`

Frontend routes unlocked:

- `/explore/central-library/memberships`
- `/dashboard/passes`
- `/borrow/checkout` eligibility summary
- `/dashboard/overview` membership/pass cards

Acceptance:

- Basic, Standard, Premium membership plans come from backend.
- Mini, Standard, Pro borrow pass packages come from backend.
- Admin can create a new membership or pass package without code deploy.
- Archiving a plan does not break historical purchases, ledger entries, or active memberships.
- Active pass wallet shows real active passes and expiry.
- Borrow capacity shows real membership limit, locked amount, and available amount.
- Welcome gift and monthly donated free-book credits are tracked separately from paid pass credits.
- Premium books cannot be borrowed without a valid pass credit.

## Phase 8 - Marketplace Orders, Sales, Wallet

Goal:

Support buy checkout, buyer orders, seller dashboard, order tracking, and earnings.

Tasks:

- Order model.
- Order item model.
- Payment status model.
- Shipment model.
- Seller order dashboard.
- Buyer order dashboard.
- Wallet ledger.
- Sales earning hold/release.
- Payout request model.
- Membership/pass payments and purchase ledger entries.
- Manual payment confirmation support for bKash/Nagad/COD-style early operations.

APIs:

- `POST /api/orders/checkout`
- `GET /api/me/orders`
- `GET /api/me/sales`
- `GET /api/orders/{id}`
- `PATCH /api/orders/{id}/confirm`
- `PATCH /api/orders/{id}/cancel`
- `PATCH /api/orders/{id}/ship`
- `PATCH /api/orders/{id}/complete`
- `GET /api/orders/{id}/tracking`
- `GET /api/me/wallet`
- `GET /api/me/wallet/transactions`
- `GET /api/me/wallet/ledger`
- `POST /api/me/wallet/payouts`
- `POST /api/payments/intents`
- `POST /api/payments/confirm`

Frontend routes unlocked:

- `/cart/checkout`
- `/orders/payment`
- `/orders/success`
- `/orders/tracking/[id]`
- `/dashboard/orders`
- `/dashboard/sales`
- `/dashboard/wallet`
- payment confirmation for memberships and passes

Acceptance:

- Seller can confirm, ship, cancel order.
- Buyer can see tracking timeline.
- Wallet transactions are ledger-based.

## Phase 9 - Borrow Workflow

Goal:

Implement production borrow workflow from request to return.

Tasks:

- Borrow order entity.
- Deposit lock.
- Membership/pass eligibility check.
- Borrow pass reservation and consumption.
- Welcome gift/free monthly donated book credit usage.
- Request creation.
- Owner accept/reject.
- Counter offer.
- Payment status.
- Owner handover confirmation.
- Borrower receive confirmation.
- Active borrow date/due date.
- Return initiation.
- Courier tracking or meetup return.
- Owner confirm return.
- Extension request.
- Dispute creation.
- Borrow review.
- Auto-expiry Celery tasks.
- Reminder notification tasks.
- Expire stale pass reservations.

APIs:

- `POST /api/borrow/orders`
- `POST /api/borrow/orders/check-eligibility`
- `GET /api/me/borrowed`
- `GET /api/me/lent`
- `GET /api/me/borrow-requests`
- `GET /api/borrow/orders/{id}`
- `PATCH /api/borrow/orders/{id}/accept`
- `PATCH /api/borrow/orders/{id}/reject`
- `POST /api/borrow/orders/{id}/counter-offers`
- `PATCH /api/borrow/orders/{id}/counter-offers/{counter_id}/accept`
- `PATCH /api/borrow/orders/{id}/counter-offers/{counter_id}/reject`
- `PATCH /api/borrow/orders/{id}/pay`
- `POST /api/borrow/orders/{id}/reserve-pass`
- `PATCH /api/borrow/orders/{id}/owner-handover`
- `PATCH /api/borrow/orders/{id}/borrower-receive`
- `POST /api/borrow/orders/{id}/return`
- `PATCH /api/borrow/orders/{id}/owner-confirm-return`
- `POST /api/borrow/orders/{id}/extensions`
- `POST /api/borrow/orders/{id}/disputes`
- `POST /api/borrow/orders/{id}/reviews`

Frontend routes unlocked:

- `/borrow/request/[id]`
- `/borrow/active/[id]`
- `/borrow/checkout`
- `/dashboard/borrowed`
- `/dashboard/lent`
- `/dashboard/requests`
- `/dashboard/action-center`
- `/dashboard/passes`

Acceptance:

- Borrow status machine prevents invalid transitions.
- Deposit releases only after valid completion or admin decision.
- Pass credit is consumed only when borrow policy says the order is committed.
- Cancel/reject/expire restores reserved pass credit according to policy.

## Phase 10 - Exchange Workflow

Goal:

Implement peer-to-peer exchange proposals and agreements.

Tasks:

- Exchange order model.
- Incoming/outgoing offer views.
- Proposal creation.
- Counter offer.
- Accept/reject.
- Agreement reached.
- Handover.
- Complete.
- Dispute.
- Notification hooks.

APIs:

- `POST /api/exchanges`
- `GET /api/me/exchanges`
- `GET /api/me/exchanges/offers`
- `GET /api/exchanges/{id}`
- `PATCH /api/exchanges/{id}/accept`
- `PATCH /api/exchanges/{id}/reject`
- `POST /api/exchanges/{id}/counter-offers`
- `PATCH /api/exchanges/{id}/counter-offers/{counter_id}/accept`
- `PATCH /api/exchanges/{id}/counter-offers/{counter_id}/reject`
- `PATCH /api/exchanges/{id}/handover`
- `PATCH /api/exchanges/{id}/complete`
- `POST /api/exchanges/{id}/disputes`

Frontend routes unlocked:

- `/exchange/offer/[bookId]`
- `/dashboard/exchanges`
- `/dashboard/exchanges/offers`
- `/explore/exchanges`
- `/explore/exchanges/search`
- `/dashboard/action-center`

Acceptance:

- Incoming/outgoing offers match current dashboard tabs.
- Only proposal participants can mutate exchange state.

## Phase 11 - Messaging Realtime

Goal:

Replace mock conversations with persisted realtime chat.

Tasks:

- Conversation model.
- Participant model.
- Message model.
- Attachment model.
- Read receipt.
- Typing event.
- Presence/last seen.
- Exchange proposal message cards.
- WebSocket auth.
- Redis Channels layer.
- Link conversations to borrow/order/exchange context.

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

Frontend routes unlocked:

- `/dashboard/messages`
- `/dashboard/messages/[username]`
- floating/right sidebar message widget
- message buttons from book/order/borrow/exchange pages

Acceptance:

- Realtime message send/receive works.
- Typing indicator works.
- Read/seen state works.
- Unread count updates without refresh.

## Phase 12 - Notifications And Firebase FCM

Goal:

Support in-app notifications and Firebase push notifications.

Tasks:

- Notification model.
- Notification delivery model.
- Device token registration.
- Notification preferences.
- Polymorphic action URL.
- User-side delete/remove action.
- Celery push sender.
- WebSocket notification badge update.
- Generate notifications from borrow/exchange/order/message/review events.

APIs:

- `GET /api/notifications`
- `PATCH /api/notifications/{id}/read`
- `PATCH /api/notifications/read-all`
- `DELETE /api/notifications/{id}`
- `POST /api/me/devices`
- `DELETE /api/me/devices/{id}`
- `PATCH /api/me/notification-preferences`

Frontend routes unlocked:

- `/dashboard/notifications`
- notification popover
- notification badge in nav
- `/dashboard/settings` notification tab

Acceptance:

- Notification is stored in DB.
- Authenticated browser can register FCM token.
- Push notification sends through Firebase.

## Phase 13 - Reputation, Reviews, Badges, Analytics

Goal:

Make user dashboard insights and reputation real.

Tasks:

- Review eligibility engine.
- Book review model.
- User transaction review model.
- Reputation score model.
- Badge rules.
- Membership badges and VIP badge.
- Pass usage and on-time return contribution.
- Aggregated analytics tables.
- Celery recalculation tasks.
- Daily analytics snapshots.

APIs:

- `POST /api/reviews`
- `GET /api/users/{username}/reviews`
- `GET /api/me/reputation`
- `GET /api/badges`
- `GET /api/me/analytics/overview`
- `GET /api/me/analytics/books`
- `GET /api/me/analytics/borrow`
- `GET /api/me/analytics/exchanges`
- `GET /api/me/analytics/sales`
- `GET /api/me/analytics/community`
- `GET /api/me/analytics/membership`

Frontend routes unlocked:

- `/dashboard/analytics`
- `/dashboard/overview`
- `/u/[username]/reviews`
- `/u/[username]/badges`
- book details reviews
- trust/reputation widgets

Acceptance:

- Reputation changes after completed reviews/status events.
- Dashboard analytics no longer use static arrays.

## Phase 14 - Verification, Reports, Moderation

Goal:

Support identity verification, reports, disputes, and moderator/admin workflows.

Tasks:

- Verification document upload.
- Verification review queue.
- User/book/report/dispute models.
- Moderator actions.
- Admin audit log.
- Account standing.
- Abuse/report lifecycle.
- Admin plan/pass controls.
- Admin membership/payment adjustment audit.

APIs:

- `POST /api/me/verifications`
- `GET /api/me/verifications`
- `POST /api/reports`
- `GET /api/me/reports`
- `GET /api/mod/reports`
- `PATCH /api/mod/reports/{id}`
- `GET /api/mod/disputes`
- `PATCH /api/mod/disputes/{id}`
- `GET /api/admin/audit-log`
- `GET /api/admin/memberships/plans`
- `POST /api/admin/memberships/plans`
- `PATCH /api/admin/memberships/plans/{id}`
- `GET /api/admin/borrow-passes/packages`
- `POST /api/admin/borrow-passes/packages`
- `PATCH /api/admin/borrow-passes/packages/{id}`

Frontend routes unlocked:

- `/dashboard/verification`
- `/dashboard/reports`
- future moderator panel
- future admin panel

Acceptance:

- User can submit verification docs.
- User can track submitted reports.
- Moderator/admin actions are audited.

## Phase 15 - Dashboard Summary And Badges

Goal:

Make dashboard navigation, action center, counters, and overview real.

Tasks:

- Dashboard summary query service.
- Redis short cache.
- Per-user counts.
- Pending action detector.
- Nav badge counts.
- Right sidebar summary.
- Membership/pass summary.
- Free credit and pass expiry warnings.

APIs:

- `GET /api/me/dashboard/summary`
- `GET /api/me/dashboard/actions`
- `GET /api/me/dashboard/activity`
- `GET /api/me/dashboard/membership-summary`

Frontend routes unlocked:

- `/dashboard`
- `/dashboard/overview`
- `/dashboard/action-center`
- sidebar/mobile nav badges
- right sidebar widget

Acceptance:

- Dashboard counts match source modules.
- Counts update after borrow/exchange/order/message/notification mutations.
- Dashboard warns before membership/pass expiry.

## Phase 16 - Central Library Operations And Donations

Goal:

Make central library, donation intake, donor rewards, and library curation real.

Tasks:

- Central library inventory item model.
- Library item source: purchased, donated, partner, admin-added.
- Premium/donated/regular flags.
- Featured/new/most-borrowed/collection curation.
- Donation request model.
- Donation items and pickup details.
- Donation verification and quality check workflow.
- Convert accepted donations into central library inventory.
- Donor reward grants: free Library Pass months, badge, permanent Donor tag.
- Admin donation queue and audit log.

APIs:

- `GET /api/central-library/home`
- `GET /api/central-library/books`
- `GET /api/central-library/collections`
- `GET /api/central-library/stats`
- `POST /api/donations`
- `GET /api/me/donations`
- `GET /api/donations/{id}`
- `PATCH /api/donations/{id}/pickup`
- `GET /api/admin/donations`
- `PATCH /api/admin/donations/{id}/verify`
- `PATCH /api/admin/donations/{id}/accept`
- `PATCH /api/admin/donations/{id}/reject`

Frontend routes unlocked:

- `/explore/central-library`
- `/explore/central-library/search`
- `/explore/central-library/donate`
- `/books/upload?mode=donate`

Acceptance:

- Donated books do not become public inventory until accepted by admin.
- Donor rewards are ledgered and visible through badges/pass history.
- Central library lists are curated from backend, not static slicing.

## Phase 17 - Reading Tracker And Personalization

Goal:

Make reading dashboard, recently viewed, and personalized recommendations real.

Tasks:

- Annual reading goals.
- Currently reading records.
- Reading progress logs.
- Mark finished flow.
- Weekly page totals.
- Reading streak calculation.
- Reading queue.
- Recently viewed events.
- For-you recommendation feed.
- Daily user/listing analytics snapshots.

APIs:

- `GET /api/me/reading`
- `PATCH /api/me/reading/goals/current-year`
- `POST /api/me/reading/items`
- `POST /api/me/reading/items/{id}/progress`
- `POST /api/me/reading/items/{id}/finish`
- `POST /api/me/reading/queue`
- `GET /api/me/recently-viewed`
- `GET /api/recommendations/books`

Frontend routes unlocked:

- `/dashboard/reading`
- `/dashboard/overview`
- homepage recently viewed
- homepage "Only For You"

Acceptance:

- Reading progress survives refresh and cross-device use.
- Streak and weekly pages derive from logs, not static numbers.
- Recommendations expose a reason/source label.

## Phase 18 - CMS, Sponsors, Newsletter, Festival Campaigns

Goal:

Support all public marketing/content surfaces and monetization placements.

Tasks:

- CMS page model.
- Hero banners.
- FAQ categories and items.
- Testimonials.
- Sponsors and sponsor campaigns.
- Newsletter subscribers.
- Author spotlights.
- Community post previews.
- Festival/campaign pages.
- Campaign events, categories, books, authors.
- Discount rules with validity windows.
- Featured listing slots.
- Publisher partnership records.

APIs:

- `GET /api/home`
- `GET /api/faqs`
- `GET /api/sponsors`
- `GET /api/testimonials`
- `POST /api/newsletter/subscribe`
- `GET /api/campaigns/{slug}`
- `GET /api/admin/cms/pages`
- `POST /api/admin/campaigns`
- `POST /api/admin/featured-listings`

Frontend routes unlocked:

- `/`
- `/faq`
- `/explore/festival`
- homepage sponsors/testimonials/newsletter

Acceptance:

- Homepage content can change from admin/backend without code deploy.
- Festival page is backed by campaign data.
- Sponsored/featured placement has start/end time and audit history.

## Phase 19 - Auth Security, Preferences, Student Discounts

Goal:

Complete non-Firebase auth flows and dashboard security features.

Tasks:

- Local email/password registration and login.
- Email OTP verification and resend.
- Password reset flow.
- Password change.
- Terms/privacy version acceptance.
- Preferred language.
- Student ID verification model.
- Student discount eligibility.
- Session/device tracking.
- Security event log.
- Account deletion request and retention policy.

APIs:

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

Frontend routes unlocked:

- `/auth/login`
- `/auth/register`
- `/auth/verify-otp`
- `/auth/forgot-password`
- `/auth/reset-password`
- `/auth/complete-profile`
- `/auth/choose-language`
- `/auth/verify-student-id`
- `/dashboard/security`

Acceptance:

- OTP cannot be brute-forced or reused.
- Password reset and registration OTP modes are separated.
- Student discount is tied to verified status and plan policy.

## Phase 20 - Support, Reports, Strikes, Account Standing

Goal:

Make reports, account standing, support messages, and moderation policy real.

Tasks:

- Generic report target model.
- Report lifecycle events.
- Account strike model.
- Warning, temporary ban, permanent ban workflow.
- Strike expiry task after 6 months where policy allows.
- Support ticket model.
- Support ticket messages or support-linked conversation.
- Moderator/admin actions and audit log.

APIs:

- `POST /api/reports`
- `GET /api/me/reports`
- `GET /api/me/account-standing`
- `GET /api/mod/reports`
- `PATCH /api/mod/reports/{id}`
- `POST /api/support/tickets`
- `GET /api/me/support/tickets`
- `POST /api/support/tickets/{id}/messages`

Frontend routes unlocked:

- `/dashboard/reports`
- `/faq` contact support CTA
- future moderator dashboard

Acceptance:

- Report status shown to reporter.
- Strikes affect account standing and expire according to policy.
- Moderator actions are immutable/audited.

## Phase 21 - Schema Freeze And Product Policy Review

Goal:

Resolve frontend/backend conflicts before production migration starts.

Checklist:

- Membership policy finalized: only 4-year Basic/Standard/Premium deposit model is valid for backend schema.
- Refund/cancellation policy finalized.
- Student discount scope finalized.
- Borrow durations finalized by plan/book type.
- Premium book pass rules finalized.
- Donation rewards finalized.
- Delivery zones and rates finalized.
- Withdrawal minimum and payout methods finalized.
- Image upload max size finalized.
- `/orders/success` target route fixed or backend docs map it to `/dashboard/orders`.
- Duplicate cart/wishlist store migration path selected.

Acceptance:

- No model/table is created while key product rules are still contradictory.
- API contracts reflect one consistent policy.

## Phase 22 - Production Deployment

Goal:

Ship backend safely to VPS.

Tasks:

- Production Docker Compose.
- Nginx config.
- SSL.
- GitHub Actions deploy.
- Database migration command.
- Static/media env config.
- Backup script.
- Log rotation.
- Monitoring basics.
- Rate limits.
- Security headers.

Services:

- frontend
- backend
- postgres
- redis
- celery-worker
- celery-beat
- channels-worker
- elasticsearch
- photon
- nginx

Acceptance:

- Push to main deploys to VPS.
- Migrations run safely.
- Healthcheck passes after deploy.
- Database backup exists.

## Frontend Integration Order

1. Auth/session.
2. Profile/settings.
3. Books and upload.
4. Search/location.
5. Wishlist/cart.
6. Membership/pass system.
7. Marketplace orders.
8. Borrow dashboard.
9. Exchange dashboard.
10. Messages WebSocket.
11. Notifications FCM.
12. Analytics/reputation.
13. Reports/verification.
14. Central library operations and donations.
15. Reading tracker and personalization.
16. CMS, sponsors, newsletter, festival campaigns.
17. Auth security extras and student discounts.
18. Support, reports, strikes, account standing.

## Dashboard Priority Order

1. `/dashboard/overview`
2. `/dashboard/action-center`
3. `/dashboard/library`
4. `/dashboard/borrowed`
5. `/dashboard/lent`
6. `/dashboard/requests`
7. `/dashboard/exchanges`
8. `/dashboard/exchanges/offers`
9. `/dashboard/messages`
10. `/dashboard/notifications`
11. `/dashboard/orders`
12. `/dashboard/sales`
13. `/dashboard/wallet`
14. `/dashboard/passes`
15. `/dashboard/analytics`
16. `/dashboard/settings`
17. `/dashboard/security`
18. `/dashboard/verification`
19. `/dashboard/reports`
20. `/dashboard/followers`
21. `/dashboard/following`

## Missing Coverage Audit

These backend areas were missing or too shallow in the first architecture draft and are now explicit scope:

- Subscription/membership plans.
- Membership purchase, renewal, upgrade, expiry.
- Borrow pass packages.
- Active pass wallet.
- Pass credit reserve, consume, restore, expire.
- Welcome gift: 5 free borrows valid for 2 months.
- Monthly donated free-book credit.
- Premium-book pass requirement.
- Membership-based borrow limit and priority queue.
- Dashboard membership/pass summary.
- Pass usage history.
- Admin plan/package management.
- Payment intents and manual payment confirmations.
- Immutable wallet/ledger entries for memberships, passes, sales, deposits, payouts.
- Expiry warning notifications for membership and passes.
- Membership/reputation/badge connection.
- Central library operational inventory, collections, premium/donated flags, queue priority.
- Donation request, pickup, quality check, accepted-to-inventory conversion, donor reward.
- Reading tracker: goals, progress logs, streaks, queue.
- CMS/content: homepage hero, sponsors, testimonials, newsletter, FAQ, terms/privacy.
- Festival/campaigns: events, authors, campaign books, discounts, featured placements.
- Local email/password auth, OTP, password reset, student discount verification, account deletion.
- Payment/escrow/delivery: per-seller delivery fee, courier tracking, invoice, payout accounts.
- Book details actions: report categories, Q&A, review eligibility, helpful votes, share events.
- Exchange discovery/matching: owner meetup locations, proposal date/location/message, nearby sort.
- Chat exchange proposal cards and notification delete/action URL.
- Unimplemented linked frontend routes must be handled: `/community`, `/terms`, `/privacy`, `/newsletter`, `/featured-libraries`, `/books/for-you`.
