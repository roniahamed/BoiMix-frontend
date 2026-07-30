# BoiMix Backend Feature Dependency Audit

## Scope

This audit maps the current frontend routes, mock APIs, local stores, and data files to backend features. No implementation code was changed. The goal is to prevent missing models/fields before backend schema work starts.

## Critical Missing Or Under-Specified Backend Areas

### 1. Product Plan Conflict To Resolve First

Different pages describe membership differently:

- `/explore/central-library/memberships` describes 4-year one-time membership deposits: Basic `৳500`, Standard `৳1000`, Premium `৳2000`.
- `/explore/central-library` describes monthly Basic/Premium/Elite plans: `৳0`, `৳199`, `৳499`, with 7/14/21 day borrow duration.
- `/faq` mentions Basic/Premium/Elite, cancellation, student discount, refund within 7 days, and free delivery for higher tiers.

Backend must either normalize these into one policy or support plan versioning with:

- `plan_kind`: deposit_membership, monthly_subscription, borrow_pass, promo_plan
- `billing_period`: one_time, monthly, yearly
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
- `membership_plans.borrow_value_limit`, `borrow_item_limit`, `borrow_duration_days`, `validity_days`, `billing_period`, `refund_policy`.
- `borrow_pass_credits.status`: active, reserved, consumed, restored, expired.
- `orders.seller_count`, `delivery_zone`, `delivery_fee`, `payment_method`, `escrow_status`.
- `wallet_transactions.source_type`: sale, escrow, withdrawal, deposit, membership, pass, refund, adjustment, free_credit.
- `reports.target_type`, `target_id`, `status`, `resolution`, `strike_id`.
- `notifications.channel`: in_app, websocket, fcm, email.
- `analytics_events.event_type`, `source`, `session_id`, `user_id`, `listing_id`, `location`.

## Frontend Issues To Notify Before Backend Integration

- `/orders/success` links to `/dashboard/purchases`, but the existing buyer order route is `/dashboard/orders`.
- Membership naming and pricing conflict across central library page, membership details page, and FAQ.
- Upload page says max 5MB images, but backend requirement says users can submit up to 15MB and worker compresses under 1MB. Pick one frontend copy/policy.
- Browser calls Photon/Nominatim directly in upload/settings; backend should replace these with `/api/locations/search` and `/api/locations/reverse`.
- `stores/*` and `lib/store/*` contain overlapping cart/wishlist stores; migration should choose one API-backed source of truth.
