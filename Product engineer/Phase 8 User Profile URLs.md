# Phase 8 User Profile URLs

This document lists the public profile URLs created for Phase 8.

## Base Test User
- Demo username: `rahim_sheikh`
- Base URL pattern: `/u/[username]`
- Example base profile: `/u/rahim_sheikh`

## Created URLs

| URL | Route File | Purpose |
| --- | --- | --- |
| `/u/[username]` | `app/u/[username]/page.tsx` | Public profile overview with header, public stats, public books, recent review, activity summary, and handover area. |
| `/u/[username]/reviews` | `app/u/[username]/reviews/page.tsx` | Public review list written by the reader. |
| `/u/[username]/library` | `app/u/[username]/library/page.tsx` | Public shared/listed books from the reader. |
| `/u/[username]/activity` | `app/u/[username]/activity/page.tsx` | Public activity timeline. |
| `/u/[username]/badges` | `app/u/[username]/badges/page.tsx` | Badge collection earned by the reader. |
| `/u/[username]/location` | `app/u/[username]/location/page.tsx` | Public district, area, service areas, handover preference, and privacy note. |

## Demo URLs To Check
- `/u/rahim_sheikh`
- `/u/rahim_sheikh/reviews`
- `/u/rahim_sheikh/library`
- `/u/rahim_sheikh/activity`
- `/u/rahim_sheikh/badges`
- `/u/rahim_sheikh/location`

## Fallback URL
- `/u/unknown_reader`
- Shows a friendly profile not-found state instead of crashing.

## Notes
- These pages use static mock data from `lib/mock/profile.ts`.
- Follower and following lists are intentionally not part of the public profile. Those are reserved for the future owner dashboard.
- Follow is currently presentational and does not mutate data.
- Message links to the future dashboard messages route but does not build the messaging system.
- The location page does not expose exact private addresses.
