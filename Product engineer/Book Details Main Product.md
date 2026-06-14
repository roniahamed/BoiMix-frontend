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

* Add to Cart
* Swap Request
* Borrow Request

If the book is already in cart:

* Show Cart Filled Icon

If the book is already in wishlist:

* Show Filled Heart Icon

#### Card Hover Effect

* Slight elevation
* Soft shadow increase
* Smooth transition (200ms–300ms)
* Subtle background color change

### Bottom Hover Actions

Show:

* View Details Button

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
