# BoiMix Backend Feature Dependency Audit

## Scope

This audit maps the current frontend routes, mock APIs, local stores, and data files to backend features. No implementation code was changed. The goal is to prevent missing models/fields before backend schema work starts.

## Critical Missing Or Under-Specified Backend Areas

### 1. Membership Policy Now Fixed

Canonical backend membership model:

- 4-year one-time membership deposits only.
- Tiers: Basic `৳500`, Standard `৳1000`, Premium `৳2000`.
- Monthly `Basic/Premium/Elite` plan copy is stale frontend content and must not shape the backend schema.

Backend should model:

- `plan_kind`: deposit_membership, borrow_pass, promo_plan
- `billing_period`: one_time
- `validity_days`
- `borrow_item_limit`
- `borrow_value_limit`
- `borrow_duration_days`
- `delivery_benefit`
- `refund_policy`
- `student_discount_percent`
- `is_public`, `effective_from`, `effective_until`

### 2. Central Library Operations

Frontend has a full central library surface: featured books, new arrivals, most borrowed, collections, categories, FAQs, membership CTA, donation CTA, and search.

Required backend logic:

- Central inventory source and ownership.
- Library book copy tracking.
- Book copy condition and availability.
- Premium/donated/regular library book classification.
- Featured/new/most-borrowed/collection curation.
- Queue priority by membership tier.
- Borrow duration policy per membership/book type.
- Central library search filters.

Required tables:

- `library_branches`
- `library_inventory_items`
- `library_inventory_events`
- `library_collections`
- `library_collection_items`
- `library_book_flags`
- `library_queue_entries`

### 3. Donation Flow And Donor Rewards

`/explore/central-library/donate` links donation to `/books/upload?mode=donate`. The backend plan must not treat donation as a normal listing only.

Required backend logic:

- Donation request submission.
- Multiple donated book items per request.
- ISBN/manual metadata capture.
- Pickup/collection scheduling.
- Admin verification and quality check.
- Convert accepted donation into central library inventory.
- Reject/return donation with reason.
- Donor reward issuance: free Library Pass months, badges, permanent Donor tag.

Required tables:

- `donation_requests`
- `donation_items`
- `donation_pickups`
- `donation_quality_checks`
- `donor_rewards`
- `donor_reward_redemptions`
- `donor_profile_tags`

### 4. Payments, Escrow, Delivery, And Payouts

Checkout and wallet screens already assume escrow, bKash/Nagad/COD, delivery pricing, seller earnings, and withdrawals.

Required backend logic:

- Checkout recipient fields: name, phone, district, thana, full address.
- Multi-seller order grouping.
- Delivery charge per seller: Dhaka vs outside Dhaka, currently `৳60` and `৳120`.
- Payment intent and manual confirmation.
- Escrow hold until buyer confirms delivery.
- Seller confirm/ship/cancel workflow.
- Courier name and tracking number.
- Seller payout to bKash, Nagad, or bank.
- Minimum withdrawal amount, currently `৳500` in UI.
- Invoice generation.

Required tables:

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

### 5. Auth, OTP, Security, And Student Verification

Frontend includes email/password login, registration, OTP, password reset, complete profile, choose language, student ID verification, password change, and account deletion.

Required backend logic:

- Email/password auth in addition to Firebase Google/Apple.
- OTP create/verify/resend with TTL and rate limit.
- Password reset token/OTP mode.
- Terms/privacy acceptance timestamp and version.
- Preferred language.
- Student verification for discount.
- Password change with current password.
- Active sessions/devices.
- Account deletion workflow with retention policy.

Required tables:

- `otp_codes`
- `password_reset_requests`
- `terms_acceptances`
- `user_preferences`
- `student_verifications`
- `user_devices`
- `security_events`
- `account_deletion_requests`

### 6. Reading Tracker

`/dashboard/reading` needs real reading goals, currently reading, progress logs, streaks, badges, and reading queue.

Required tables:

- `reading_goals`
- `reading_items`
- `reading_progress_logs`
- `reading_streaks`
- `reading_queue_items`

Required APIs:

- `GET /api/me/reading`
- `PATCH /api/me/reading/goals/current-year`
- `POST /api/me/reading/items`
- `POST /api/me/reading/items/{id}/progress`
- `POST /api/me/reading/items/{id}/finish`
- `POST /api/me/reading/queue`

### 7. CMS, Marketing, Sponsors, Testimonials, Newsletter

Homepage uses hero carousel, categories, trending/new/nearby/for-you, author spotlight, reader/community sections, testimonials, sponsors, and newsletter.

Required backend logic:

- Admin-editable hero carousel.
- Sponsored blocks and sponsor logos.
- Testimonials.
- Newsletter subscriptions.
- Community post preview.
- Author spotlight.
- Static pages for terms/privacy.
- FAQ categories and items.

Required tables:

- `cms_pages`
- `hero_banners`
- `sponsors`
- `sponsor_campaigns`
- `testimonials`
- `newsletter_subscribers`
- `faqs`
- `author_spotlights`
- `community_posts`

### 8. Festival, Campaigns, Discounts, Featured Listings

`/explore/festival` has event schedule, categories, authors, festival books, new arrivals, and special discount CTA.

Required backend logic:

- Festival/campaign pages.
- Event schedule and location.
- Campaign categories.
- Featured authors.
- Campaign book lists.
- Discount rules and validity windows.
- Sponsored/featured listing placements.
- Publisher partnership campaigns.

Required tables:

- `campaigns`
- `campaign_events`
- `campaign_categories`
- `campaign_books`
- `campaign_authors`
- `discount_rules`
- `featured_listing_slots`
- `publisher_partnerships`

### 9. Recommendations And Analytics Events

Frontend shows "Recently Viewed", "Only For You", top viewed books, impressions, wishlist saves, CTR, exchange conversion, sales revenue, XP/followers, and reputation radar.

Required backend logic:

- Track book views, search appearances, clicks, wishlist saves.
- Recently viewed per user/session.
- Recommendation source labels.
- Daily analytics snapshots.
- Per-user analytics cache.

Required tables:

- `book_view_events`
- `search_impression_events`
- `listing_click_events`
- `recommendation_events`
- `daily_user_analytics`
- `daily_listing_analytics`

### 10. Reports, Strikes, Support, And Account Standing

`/dashboard/reports` includes report history, account standing, strikes, warnings, temporary ban, permanent ban, and strike expiry after 6 months.

Required backend logic:

- Report target can be book, user, review, message, order, borrow, exchange.
- Moderation review lifecycle.
- Strike/warning policy.
- Automatic expiry of strikes.
- Support contact from FAQ to messages.

Required tables:

- `reports`
- `report_events`
- `account_strikes`
- `moderation_actions`
- `support_tickets`
- `support_ticket_messages`

### 11. Book Detail Actions: Q&A, Reports, Share, Review Eligibility

Book details include wishlist, share, report, Q&A, review filters/sorting, write-review modal, buy actions, borrow actions, exchange actions, owner info, exact-address privacy, related books, and mobile sticky actions.

Required backend logic:

- Report reasons/categories seeded and admin-editable.
- Q&A ask/answer permissions.
- Review eligibility after valid sale/borrow/exchange only.
- Helpful review vote.
- Review aggregate by star count.
- Related book recommendations.
- Share event tracking.
- Exact owner address hidden until accepted transaction.

Required tables:

- `report_categories`
- `book_questions`
- `book_answers`
- `review_eligibilities`
- `review_helpful_votes`
- `share_events`
- `related_book_events`

### 12. Exchange Discovery And Matching

Exchange pages include recently added, near you, category filters, search, sort by newest/nearby/popular/A-Z, proposal with selected owned book, proposed location/date, and message.

Required backend logic:

- Exchange-only listing filter.
- Match candidate discovery from user's own library.
- Proposed meetup location/date/message.
- Owner preferred meetup locations.
- Nearby exchange listings through PostGIS.
- Exchange listing popularity/rating sort.

Required tables:

- `exchange_preferences`
- `exchange_proposals`
- `exchange_proposal_messages`
- `user_meetup_locations`
- `exchange_search_events`

## Route-To-Backend Dependency Matrix

| Frontend area                          | Backend domains needed                                                                 |
| -------------------------------------- | -------------------------------------------------------------------------------------- |
| `/`                                    | books, categories, CMS, sponsors, testimonials, newsletter, recommendations, community |
| `/auth/*`                              | auth, OTP, Firebase, profile onboarding, student verification, terms/privacy           |
| `/books/*`                             | catalog, inventory, media, ISBN, search, location, reviews, Q&A                        |
| `/books/upload`                        | media, ISBN, listings, sell/borrow/exchange modes, location proxy, donation mode       |
| `/cart`, `/cart/checkout`, `/orders/*` | cart, checkout, payments, escrow, delivery, orders, invoices                           |
| `/borrow/*`                            | borrow workflow, deposits, memberships, passes, delivery/return, disputes, reviews     |
| `/exchange/*`, `/explore/exchanges/*`  | exchange workflow, offers, counters, handover, disputes                                |
| `/explore/central-library/*`           | central library inventory, membership, passes, donations, collections, FAQs            |
| `/explore/festival`                    | campaigns, events, discounts, featured authors/books                                   |
| `/dashboard/*`                         | all user-owned modules plus dashboard summary APIs                                     |
| `/u/[username]/*`                      | public profile, library, reviews, activity, badges, privacy boundaries                 |
| `/wishlist`                            | wishlist, listing availability                                                         |
| `/faq`                                 | CMS FAQ, support/messaging                                                             |

## Backend Fields That Must Not Be Missed

- `book_listings.inventory_status`: available, borrowed, draft, archived, sold.
- `book_listing_modes.mode`: sell, borrow, exchange, donate.
- `book_listing_modes.quantity`, `price`, `deposit`, `borrow_fee`, `borrow_duration_days`, `exchange_value`, `exchange_preference`.
- `locations.lat`, `locations.lng`, `locations.display_address`, `locations.private_address`, `district`, `thana`, `postal_code`.
- `user_meetup_locations.name`, `address`, `lat`, `lng`, `is_default`, `visibility`.
- `borrow_order_owner_details.owner_id`, `handover_method`, `meetup_location_id`, `meetup_datetime`, `courier_district`, `courier_thana`, `courier_address`, `phone`, `message`.
- `membership_plans.borrow_value_limit`, `borrow_item_limit`, `borrow_duration_days`, `validity_days`, `billing_period`, `refund_policy`.
- `borrow_pass_credits.status`: active, reserved, consumed, restored, expired.
- `orders.seller_count`, `delivery_zone`, `delivery_fee`, `payment_method`, `escrow_status`.
- `wallet_transactions.source_type`: sale, escrow, withdrawal, deposit, membership, pass, refund, adjustment, free_credit.
- `reports.target_type`, `target_id`, `status`, `resolution`, `strike_id`.
- `notifications.channel`: in_app, websocket, fcm, email.
- `analytics_events.event_type`, `source`, `session_id`, `user_id`, `listing_id`, `location`.

## Frontend Issues To Notify Before Backend Integration

- `/orders/success` links to `/dashboard/purchases`, but the existing buyer order route is `/dashboard/orders`.
- Several linked routes do not currently have matching pages: `/community`, `/community/readers/*`, `/community/leaderboard`, `/terms`, `/privacy`, `/newsletter`, `/featured-libraries`, `/books/for-you`.
- `/explore/central-library` and `/faq` still contain stale membership/subscription copy that conflicts with the now-finalized 4-year deposit model. Backend should follow deposit model only, and frontend copy should be updated later.
- Upload page says max 5MB images, but backend requirement says users can submit up to 15MB and worker compresses under 1MB. Pick one frontend copy/policy.
- Browser calls Photon/Nominatim directly in upload/settings; backend should replace these with `/api/locations/search` and `/api/locations/reverse`.
- `stores/*` and `lib/store/*` contain overlapping cart/wishlist stores; migration should choose one API-backed source of truth.
- Borrow checkout groups requests per owner and stores separate meetup/courier details per owner; backend request schema must not flatten this into one address.
- Book report reasons are hardcoded in frontend; backend should serve categories so moderation policy and UI stay aligned.
