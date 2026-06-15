
My inspirations is rokomari landing page. 




# BoiMix Vision

BoiMix is a community-driven book platform for Bangladesh that combines a central library, book marketplace, book swapping, and reader engagement in one place.

Core Purposes
1. Central Library
* BoiMix-owned library
* Users can borrow books from the library
* Users can buy books from the library
2. Book Marketplace
* Anyone can list books for sale
* Anyone can buy books from other users
3. Peer-to-Peer Book Swap
* Users can exchange books directly with each other
* Safe and structured swapping system
4. Reading Community
* Book reviews and ratings
* Personal thoughts and reading notes
* Comments, reactions, and discussions
* Follow readers with similar interests



## Main Goal

Create the largest digital book ecosystem in Bangladesh where people can:

* Borrow books
* Buy and sell books
* Swap books
* Share knowledge and reading experiences
* Build meaningful connections through books

## Revenue Sources

* Library book sales
* Library borrowing fees
* Featured listings
* Sponsored content
* Publisher partnerships
* Premium memberships
* Advertisements




## Long-Term Impact

* Increase reading habits in Bangladesh
* Make books more affordable and accessible
* Build a strong community of readers
* Provide valuable insights for publishers and sponsors



# Full Project Product Plan and Pages. 

# BoiMix — Complete Product Architecture, UX System & Platform Blueprint



# MARKETING & PUBLIC
/
/explore/central-library
/explore/swaps
/explore/store
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


# AUTH
/auth/login
/auth/register
/auth/verify-otp
/auth/forgot-password
/auth/reset-password
/auth/complete-profile
/auth/choose-language
/auth/verify-student-id


# public profile
/u/[username]
/u/[username]/reviews
/u/[username]/library
/u/[username]/activity
/u/[username]/badges
/u/[username]/followers
/u/[username]/following
/u/[username]/location

# /DASHBOARD
/dashboard/overview
/dashboard/library
/dashboard/books/add
/dashboard/books/edit/[id]
/dashboard/borrowed
/dashboard/swap
/dashboard/swap/offers
/dashboard/purchases
/dashboard/sales
/dashboard/wishlist
/dashboard/cart
/dashboard/address
/dashboard/messages
/dashboard/notifications
/dashboard/reviews
/dashboard/reports
/dashboard/settings
/dashboard/security
/dashboard/verification
/dashboard/notification-settings
/dashboard/analytics


# / MODERATOR
/mod/reports
/mod/disputes
/mod/flagged-users
/mod/flagged-books
/mod/review-moderation
/mod/verification-queue
/mod/swap-disputes
/mod/sales-disputes
/mod/borrow-disputes
/mod/slider
/mod/books/user-inventory
/mod/books/official-inventory
/mod/sales/all-sales
/mod/borrow/all-borrow




# / ADMIN
/admin/overview
/admin/users
/admin/books/user-inventory
/admin/books/official-inventory
/admin/borrow
/admin/sales
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
/admin/slider

## BOOK DISCOVERY

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
/books/sell
/books/borrow


# Swap Flow

/swap/discover
/swap/offer/[book-slug]
/swap/proposal/[id]
/swap/counter-offer/[id]
/swap/agreement/[id]
/swap/handover/[id]
/swap/complete/[id]
/swap/dispute/[id]


# Sell flow 

/cart/
/cart/checkout
/orders/payment
/orders/tracking


# Borrow

/Application-Membership/join
/Application-Membership/payment
/Application-Membership/success
/Application-Membership/failure
/Application-Membership/monthly-subscription 

/dashboard/borrowed
/dashboard/borrowed/[id]
/dashboard/borrowed/[id]/handover
/dashboard/borrowed/[id]/return
/dashboard/borrowed/[id]/review
/dashboard/borrowed/[id]/dispute



# Notification 

/notifications/all


# Message

/messages/list-of-conversation
/messages/[username]/details




# USER FLOW DIAGRAMS

Signup Flow
Homepage
→ Register
→ OTP Verification
→ Complete Profile
→ Select Location
→ Upload Avatar
→ Welcome Dashboard


## Borrow Workflow

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

## Swap Workflow

Browse Swap Books
→ Select Offer Book
→ Send Swap Proposal
→ Accept / Counter / Decline
→ Agreement Created
→ Handover
→ Both Confirm
→ Reviews Unlock


## Marketplace Buying Flow
Browse Marketplace
→ Open Listing
→ Buy Now
→ Checkout
→ bKash/Nagad
→ Escrow Hold
→ Seller Ships
→ Buyer Confirms
→ Funds Released


## Reporting Flow
Open Report
→ Select Reason
→ Upload Evidence
→ Moderator Queue
→ Investigation
→ Resolution
→ Notification Sent

## COMPONENT LIBRARY
BookCard
BookGallery
BookConditionBadge
AvailabilityBadge
SwapBadge
BorrowStatusBadge
OfficialBoiMixTag
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



# MOBILE NAVIGATION ARCHITECTURE
Bottom Navigation
Home
Search
Add Book
Notifications
Profile


## Notification Hierarchy
### Critical
├── Borrow approved
├── Return overdue
├── Swap accepted

### Important
├── New message
├── Due reminder
├── Review received

### Passive
├── Badge earned
├── Trending books
├── Community updates


Notification UX Rules
### Rule	Purpose
### Real-time unread count	Urgency
### Group duplicate notifications	Reduce spam
### Actionable notifications	Faster conversion
### Deep linking	Lower friction
### Smart reminders	Retention


# BORROW WORKFLOW STATE MACHINE
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



# NEXT.JS APP ROUTER STRUCTURE

example: 
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