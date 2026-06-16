
### Design Inspiration

The primary design inspiration for BoiMix is the Rokomari landing page and overall user experience.

I like Rokomari's clean and modern layout, warm color palette, book-focused design, simple navigation, and well-organized content sections. The homepage should feel familiar to book lovers, making it easy to discover, browse, borrow, buy, and swap books.
link: https://www.rokomari.com/
Please take inspiration from the following aspects of Rokomari:

* Layout system of rokomari
* Clean and professional book marketplace appearance
* reader-friendly color scheme
* Large hero/banner section
* Well-structured book categories and collections
* Card-based book presentation
* Clear typography and spacing
* Mobile-friendly responsive design
* Easy navigation and search experience
* Trustworthy and community-focused feel

However,  copy Rokomari's design directly. Create a modern identity for BoiMix while following a similar design philosophy.

BoiMix combines:

* Central Library (Borrow Books)
* Book Marketplace (Buy & Sell Books)
* Peer-to-Peer Book Swap
* Reader Community (Posts, Reviews, Comments, Reactions)

The overall design should feel like a combination of a modern digital library, book marketplace, and reader community platform.

## Design System & Style Reference: Rokomari-Inspired

Create a professional and modern book platform heavily inspired by the clean, minimal, and reader-friendly UX of Rokomari, but powered by a modern tech stack.

### Color Palette (Exact Rokomari Colors)
- **Primary Brand Color:** Blue (`#0397d3`) - Used for main buttons, links, and branding.
- **Accent / Action Color:** Orange (`#ff9900` or `#f90`) - Used for "Add to Cart", ratings, and highlighting.
- **Success / In-Stock:** Green (`#33c24d`).
- **Backgrounds:** Clean White (`#ffffff`) for main areas and Light Gray (`#f5f5f5`) for section separations.
- **Text Colors:** Dark Gray (`#333333`) for primary readability, and lighter grays (`#666666`, `#737373`, `#9c9c9c`) for secondary text like author names.
- **Borders & Dividers:** Soft grays (`#cdcdcd`, `#a2a2a2`).

###  Typography (Exact Rokomari Fonts)
- **Primary Font (English):** `Roboto`, `Lato`, and `Poppins`.
- **Secondary Font (Bengali):** `SiyamRupali`.
- **Hierarchy:** Excellent typography hierarchy matching Rokomari's exact structure.

### UI/UX Elements
- **Layout:** Spacious layout matching Rokomari's structure.
- **Cards:** Card-based book listings matching Rokomari's style (white background, gray text, soft shadows).
- **Buttons & Actions (Exact Rokomari Style):**
  - **"Buy Now" Button:** Orange (`#ff9900`) with white text.
  - **"Add to Cart" Button:** Blue (`#0397d3`) with white text and IonIcons cart icon.
  - **"Add to List" Button:** Outline button with light gray border and heart icon.
  - **"View Details":** Light gray (`#f5f5f5`) footer on cards with bold Blue (`#0397d3`) text.
- **Status Tags:** Green (`#33c24d`) text with a solid checkmark for "In Stock".
- **Shapes:** Rounded corners exactly like Rokomari.
- **Shadows:** Soft shadows exactly like Rokomari.
- **Icons:** `IonIcons` and `FontAwesome` (Exactly as used in Rokomari).

### Technology Stack & Architecture
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Customized to match Rokomari's Bootstrap breakpoints: `sm: 576px`, `md: 768px`, `lg: 992px`, `xl: 1200px`, `2xl: 1400px`)
- **UI Components:** Shadcn UI (Themed strictly with Rokomari colors and styles)

The design should feel:
- Professional & Trustworthy
- Modern & Fast
- Community-driven
- Library-focused

Visual quality should be comparable to leading platforms such as Rokomari, Goodreads, and modern e-commerce marketplaces.




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



# MARKETING & PUBLIC pages
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


# AUTH pages
/auth/login
/auth/register
/auth/verify-otp
/auth/forgot-password
/auth/reset-password
/auth/complete-profile
/auth/choose-language
/auth/verify-student-id


# public profile pages
/u/[username]
/u/[username]/reviews
/u/[username]/library
/u/[username]/activity
/u/[username]/badges
/u/[username]/followers
/u/[username]/following
/u/[username]/location

# /DASHBOARD pages
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


# / MODERATOR pages
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




# / ADMIN pages
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

## BOOK DISCOVERY pages

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


# Swap Flow pages

/swap/discover
/swap/offer/[book-slug]
/swap/proposal/[id]
/swap/counter-offer/[id]
/swap/agreement/[id]
/swap/handover/[id]
/swap/complete/[id]
/swap/dispute/[id]


# Sell flow  pages

/cart/
/cart/checkout
/orders/payment
/orders/tracking


# Borrow pages

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



# 1. Book Details Page
    1.1. Book Information
        1.1.1. Title
        1.1.2. Author
        1.1.3. Publisher
        1.1.4. ISBN
        1.1.5. Genre
        1.1.6. Language
        1.1.7. Edition
        1.1.8. Page Count
        1.1.9. Description
        1.1.10. Cover Image
        1.1.11. Back Cover Image
        1.1.12. Table of Contents
        1.1.13. Index
        1.1.14. tag ( swap, sell, lent )
        1.1.15. availability
                1.1.15.1. sell (for how much quantity)
                1.1.15.2. borrow (for how much quantity)
                1.1.15.3. swap (for how much quantity)
        1.1.16. location
        1.1.17. distance 
        1.1.18. condition (new, excellent, good, fair, poor)
        1.1.19. price 
        1.1.20. swap price 
        1.1.21. rating (1-5)
        1.1.22. total-borrow 
        1.1.23. total-sell 
        1.1.24. total-swap 
    1.2. Owner Information
        1.2.1. Owner Name
        1.2.2. Owner Profile Image
        1.2.3. Owner Reputation
        1.2.4. Owner Location
        1.2.5. Owner Review and rating
        1.2.6. Owner Badges
    1.3. Action Buttons
        1.3.1. Borrow
        1.3.2. swap
        1.3.3. Sell
        1.3.4. Message
    1.4. Reviews
        1.4.1. Review List
        1.4.2. Review Details
        1.4.3. Review Form ( Only for the validated user who borrowed or bought or swapped the book )


# 2. Book Card
    2.1. Book Cover Image
    2.2. Book Title
    2.3. Book Author
    2.4. Book tag ( swap, sell, lent )
    2.5. Book rating and review count
    2.6. Book price
    2.7. Wishlist icon 
    2.8. Book distance (only for borrow and swap)
    2.9. Book location
    2.10. Book condition (new, excellent, good, fair, poor)
    2.11. Book availability ( stack / not stack )
    2.12. Mart (icon)
    note: ( add to card,
     swap, 
     borrow Button. on the cover image )

    Design: (Desktop and Mobile Responsive.)
    Card design: (cover image top (showing tag(swap, sell, lent)))
    Card image bottom: (title, author)
    card bottom: (rating, price, distance, location, condition, availability)
    left rating + review count, right distence 
    left instock right location 
    left condition, right price
    Hover: ( hover( showing add to card, swap, borrow. on the cover image ) left ( whishlist icon)
    Card bottom Hover ( details view )(verified icon on only centerl library )
    )
    when a user using hover hover have adding a backgroud color. 
    if book are in wishlist show (heart icon)
    if book are in card show (card icon)



# 3. Search Page
    3.1. Search Bar
    3.2. Filter Options
    3.3. Results Grid
    3.4. Sort Options
    3.5. Pagination
    3.6. Total Results
    3.7. No Results Found
    3.8. Error Message




# Prompt for Card




    Design a modern, compact, marketplace-style Book Card UI component for a Book Exchange Platform.

## Device Support

* Desktop Responsive
* Mobile Responsive

## Card Layout

### Cover Section (Top)

* Large book cover image (portrait ratio)
* Top-left overlay badges:

  * Swap
  * Sell
  * Borrow/Lent
* Multiple badges can appear simultaneously. Examples: * [Swap] * [Sell] * [Borrow] or * [Swap] [Sell] or * [Swap] [Sell] [Borrow]
* 

* Top-right:

  * Wishlist Heart Icon
  * Filled heart if already in wishlist.
* Cover image should have subtle shadow and rounded corners.

### Book Information Section

Below the cover image:

* Book Title

  * Maximum 2 lines
  * Ellipsis after overflow
  * Bold typography

* Author Name

  * Single line
  * Smaller text than title

### Metadata Section

Compact two-column information layout:

Row 1:

* Left: Rating ★ + Review Count
* Right: Distance (e.g., 0.5 km)

Row 2:

* Left: Availability Status

  * In Stock
  * Out of Stock
* Right: Location

  * Example: Dhaka

Row 3:

* Left: Condition

  * New
  * Excellent
  * Good
  * Fair
  * Poor
* Right: Price

  * Example: $6

### Hover Interaction (Desktop)

When hovering over the card:

#### Cover Image Overlay

Show a semi-transparent dark overlay.

Display action buttons centered on the image:

* **Add to Cart** (Solid Blue `#0397d3` button with white text and cart icon)
* **Borrow Request** (Solid Green `#33c24d` button with white text and library/book icon)
* **Swap Request** (Outline button: White background, Blue `#0397d3` border & text, swap icon)

If the book is already in cart:

* Show Cart Filled Icon

If the book is already in wishlist:

* Show Filled Heart Icon

#### Card Hover Effect

* Slight elevation
* Soft shadow increase
* Smooth transition (200ms–300ms)
* Subtle background color change

### Bottom Footer Section

* **View Details Bar:** Light gray (`#f5f5f5`) full-width footer at the bottom of the card with centered Blue (`#0397d3`) "View Details" text.

For books owned by verified libraries only:

* Display Verified Badge/Icon beside "View Details"

### Design Style

* Modern marketplace design
* Clean spacing
* Compact card height
* Rounded corners (12px–16px)
* Soft shadows
* Professional typography
* High readability
* Mobile-first responsive design

### States

Support the following states:

1. Sell Book
2. Swap Book
3. Borrow Book
4. Wishlist Active
5. Cart Active
6. In Stock
7. Out of Stock
8. Verified Library
9. Non-Verified User

### Deliverables

Create:

* Desktop Card Design
* Mobile Card Design
* Hover State Design
* Wishlist Active State
* Cart Active State
* Verified Library State

Design should feel similar to modern marketplace platforms such as Facebook Marketplace, Amazon Books, Goodreads, and Airbnb cards while remaining clean, compact, and book-focused.
