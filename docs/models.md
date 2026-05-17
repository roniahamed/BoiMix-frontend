# User Management Models
## User Model:
    id = NanoID

    email unique
    phone_number unique
    username unique
    password_hash

    first_name
    last_name

    role

    is_email_verified
    is_phone_verified
    is_active

    last_login_at

    created_at
    updated_at
    deleted_at

    --> Role enum 
        member
        vendor
        moderator
        admin

    --> Relationship: 
        User → Profile (OneToOne)
        User → Address (OneToOne)
        User → UserReputation (OneToOne)
        User → NotificationSettings (OneToOne)


## Profiles: 
    id = NanoID
    user_id

    avatar
    bio
    gender
    date_of_birth

    verification_badge

    created_at
    updated_at

    --> Relationship:
        profile.user_id → User.id (OneToOne)


## Address
    id = NanoID
    user_id

    division
    district
    city
    area

    note

    latitude
    longitude

    created_at
    updated_at

    --> Relationship
        address.user_id → User.id (OneToOne)


## UserReputation
    id = NanoID
    user_id

    reputation_score
    average_rating

    total_reviews
    total_borrowed
    total_lent
    total_swapped

    total_successful_transactions

    badge_count
    late_return_count
    report_count

    created_at
    updated_at

    --> Relationship 
        user_reputation.user_id → User.id (OneToOne)


## NotificationSettings
    id = NanoID
    user_id

    email_enabled
    sms_enabled
    in_app_enabled

    created_at
    updated_at

    --> Relationship
        notification_settings.user_id → User.id (OneToOne)


# Book Management Models

## Book Model:

    required:
        id = NanoID 
        owner_id

        title
        author
        cover_image

        category
        language

        condition

        availability_status
        availability_count

        created_at
        updated_at
    options:
        description
        publication_year
        isbn
        edition
        publisher
        page_count
        tags

    -- condition enum:
        new
        like_new
        good
        acceptable
        poor
    
    -- availability_status enum:
        available
        borrowed
        reserved
        unavailable

    --> Relationship:
        book.owner_id → User.id (ManyToOne)


## BookImages
    id = NanoID
    book_id
    image
    thumbnail
    created_at

    --> Relationship:
        book_images.book_id → Book.id (OneToMany)


## BookCategory
    id = NanoID
    name unique
    slug
    created_at

    --> Relationship:
        book_category.id → Book.category (ManyToMany)

    

