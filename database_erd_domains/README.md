# BoiMix Domain ERD Files

The full master ERD remains in `../database_erd.dbml`. These smaller DBML files are split by backend domain so each one is easier to review in dbdiagram.io.

| File                                        | Domain                                                                                                                  | Tables | Internal refs | Cross-domain refs omitted |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | -----: | ------------: | ------------------------: |
| `01_auth_users_profile.dbml`                | Auth, users, profile, verification, location, devices, security entrypoints                                             |     23 |            27 |                       105 |
| `02_media_storage_processing.dbml`          | Cloudinary media, variants, backend resize/optimization, Celery job tracking                                            |      4 |             3 |                       115 |
| `03_books_listings_reviews_reputation.dbml` | Book metadata, ISBN lookup, listings, book images, Q&A, reviews, badges, reputation                                     |     22 |            27 |                       148 |
| `04_central_library_donation.dbml`          | Central library branches, inventory, queues, donation intake, pickup, quality check, donor rewards                      |     18 |            26 |                       146 |
| `05_membership_pass_plans.dbml`             | Backend-controlled membership plans, borrow pass packages, credits, purchases, upgrade quotes, audit logs               |     14 |            25 |                       104 |
| `06_commerce_orders_payments.dbml`          | Wishlist, carts, buy checkout, payment, wallet, escrow, refund, delivery, orders, shipment, payout, invoices            |     26 |            40 |                       128 |
| `07_borrow_exchange_disputes.dbml`          | Borrow lifecycle, owner review, counter offers, returns, extensions, deposits, pass reservations, exchange, disputes    |     19 |            37 |                       133 |
| `08_chat_notifications.dbml`                | Realtime chat, message delivery/read state, presence, exchange proposal in chat, notifications, Firebase delivery       |     12 |            15 |                       112 |
| `09_moderation_support.dbml`                | Reports, moderation events, account strikes, admin actions, support tickets                                             |      9 |            11 |                       111 |
| `10_reading_dashboard_analytics.dbml`       | Reading dashboard, goals, currently-reading/progress/streak/queue, analytics/search/share/recommendation events         |     17 |            27 |                       129 |
| `11_cms_campaigns_marketing.dbml`           | CMS pages, hero banners, sponsors, testimonials, newsletter, FAQ, community posts, campaigns, discounts, featured slots |     23 |            20 |                       142 |
