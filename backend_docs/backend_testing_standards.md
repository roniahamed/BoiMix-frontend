# BoiMix Backend Testing Standards

This document defines the minimum testing standards for the BoiMix backend.

No implemented backend feature should be considered complete without tests.

## Core Rule

Every implemented backend module must have tests.

That includes:

- models when logic exists there
- services
- selectors
- APIs
- permissions
- async tasks where business behavior matters
- integration boundaries where failures or payload shaping matter

## Testing Layers

Use multiple layers on purpose.

### Unit Tests

Use for:

- service logic
- selector behavior
- utility helpers
- permission checks
- small model behavior

Goal:

- fast feedback
- narrow business rule validation

### API Tests

Use for:

- endpoint auth behavior
- request validation
- response shape
- pagination/filter/sort behavior
- permission boundaries
- workflow endpoint behavior

Goal:

- confirm the real HTTP contract

### Integration Tests

Use for:

- payment flow
- membership purchase flow
- borrow request lifecycle
- exchange negotiation lifecycle
- wallet and payout movement
- notification dispatch orchestration
- search indexing trigger behavior

Goal:

- prove important modules work together

## Mandatory Coverage Areas

These flows must always have strong test coverage:

- auth and session flows
- role/permission boundaries
- membership and borrow pass logic
- buy checkout and order creation
- borrow approval, rejection, return, and dispute
- exchange offer, accept, reject, counter flow
- wallet/ledger/refund/payout behavior
- report/moderation actions
- message and notification authorization
- dashboard summary calculations

## Minimum Expectation Per Feature

For each implemented feature, include:

- happy path tests
- validation failure tests
- permission failure tests
- state conflict tests
- regression tests for discovered bugs

If a feature changes money, credits, inventory, or identity state, add extra edge-case tests.

## Factories And Fixtures

Prefer factories over large hand-built fixtures.

Do:

- keep factories readable
- support realistic defaults
- override only what the test needs
- create small reusable fixture helpers for auth and common setup

Do not:

- create giant opaque fixture blobs
- make each test manually build full object graphs when a factory can handle it

## Naming Rules

Test names should explain behavior clearly.

Good:

- `test_user_cannot_borrow_without_active_membership`
- `test_archived_plan_does_not_break_historical_purchase_view`
- `test_dashboard_summary_excludes_deleted_notifications`

Avoid:

- `test_case_1`
- `test_service`
- `test_endpoint`

## Database And Query Testing

Test important query behavior where it matters.

Examples:

- ordering and pagination
- location filtering
- duplicate prevention
- pass-credit decrement
- idempotent retry behavior

For high-risk endpoints, watch for inefficient behavior and unexpected duplicate writes.

## Async Testing

For Celery-driven logic:

- test task trigger conditions
- test payload/context passed to the task
- test retry-worthy failure handling where important
- test business state before and after async completion when relevant

Do not assume async work is correct just because the task was queued.

## External Integration Testing

For integrations like:

- Firebase
- Cloudinary
- Google Books
- Elasticsearch
- Photon
- Nominatim

Use mocks/fakes around the boundary in most tests.

Add targeted integration-style tests for:

- payload normalization
- failure handling
- retry-safe behavior

Do not make routine test runs depend on real third-party availability.

## Regression Rule

Every real bug fix should add or update at least one regression test.

If a bug can reappear silently, the test should prove it does not.

## What Not To Do

Do not:

- rely only on manual Postman testing
- skip tests for money or inventory flows
- mark a feature done and promise tests later
- keep flaky tests without fixing or quarantining them intentionally
- write tests that only assert status code when business behavior is the real risk

## Done Checklist

A backend feature is not done unless:

1. core logic is implemented
2. migrations exist if needed
3. happy-path tests exist
4. failure/permission tests exist
5. docs are updated if contract changed

## Short Version

Every backend feature gets tests.

Especially:

- money
- membership
- borrow
- exchange
- auth
- permissions
- dashboard aggregates
