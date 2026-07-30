# BoiMix Backend Implementation Instructions

This document defines the working rules for implementing the BoiMix backend.

It is not the feature plan itself. It is the instruction layer for how backend work should be done so the architecture stays consistent.

## Core Rules

Do:

- Follow modular monolith architecture.
- Build feature-based Django apps.
- Keep PostgreSQL as the source of truth.
- Use Redis only for cache, queue, websocket layer, and temporary state.
- Keep search and map services outside the app process.
- Route all frontend data through backend APIs.
- Match backend contracts to real frontend routes and UI flows.
- Build backend configuration so plans, passes, CMS content, and policy-driven data can change without code deploy.
- Write code in small, testable layers: API, service, selector, task, integration.
- Keep domain rules inside the owning feature module.

Do not:

- Do not turn this into microservices at the start.
- Do not put business logic inside serializers, views, or model save hooks unless the logic is truly tiny.
- Do not let frontend constants become backend truth when the data should be admin-controlled.
- Do not call Photon, Nominatim, Google Books, Cloudinary, or Firebase directly from the browser for protected workflows.
- Do not use Redis as durable storage.
- Do not expose Elasticsearch, Photon, or Nominatim publicly.
- Do not create generic utility dumping grounds that hide feature ownership.

## Architecture Rules

The final backend structure should follow this direction:

- `config/` for project wiring
- `apps/` for feature modules
- `integrations/` for external services
- `common/` for shared framework-level helpers
- `tests/` for integration and shared test helpers
- `scripts/` for operational or seed commands

Each feature should prefer this layout:

- `models.py`
- `api/v1/views.py`
- `api/v1/serializers.py`
- `api/v1/urls.py`
- `services.py`
- `selectors.py`
- `tasks.py`
- `permissions.py`
- `admin.py`
- `tests/`

## Layer Responsibilities

Use this split consistently:

- `views` and `serializers`
  - request parsing
  - response formatting
  - auth/permission entry
- `services`
  - write-side business logic
  - transaction boundaries
  - state changes
- `selectors`
  - read queries
  - filtering
  - dashboard aggregates
- `tasks`
  - image optimization
  - indexing
  - notifications
  - async recalculation jobs
- `integrations`
  - Firebase
  - Cloudinary
  - Google Books
  - Elasticsearch
  - Photon
  - Nominatim

Avoid:

- fat views
- fat serializers
- cross-app hidden writes
- duplicated query logic across views

## Database Rules

Do:

- Use PostgreSQL with PostGIS.
- Create explicit migrations for every schema change.
- Keep money, deposit, fee, and payout fields explicit.
- Store historical snapshots for plan purchases, order pricing, and membership rules where needed.
- Use foreign keys, constraints, unique indexes, and status enums carefully.
- Soft-delete or archive where history matters.
- Keep audit-friendly fields like `created_at`, `updated_at`, `created_by`, `archived_at` where relevant.

Do not:

- Do not delete historical financial or membership records to satisfy current UI.
- Do not store critical workflow state only in JSON blobs.
- Do not use nullable fields as a replacement for proper state modeling.
- Do not let stale frontend copy define schema.

## API Rules

Do:

- Keep API versioned, starting with `/api/v1/`.
- Keep response shape stable once frontend integration begins.
- Use cursor or page-based pagination consistently.
- Return backend-driven enums, labels, and policy data where UI depends on product rules.
- Add filters and search params intentionally, not ad hoc.
- Keep write APIs idempotent where retry is likely.

Do not:

- Do not make the frontend stitch multiple endpoints just to render one primary dashboard card if a summary endpoint is appropriate.
- Do not return raw provider payloads directly to the frontend.
- Do not mix admin and user API surfaces together.

## Search And Map Rules

Final infrastructure decision:

- VPS 1 hosts the app stack.
- VPS 2 hosts Elasticsearch, Photon, and Nominatim.
- VPS 1 talks to VPS 2 over private network only.

Do:

- Put book search behind backend APIs.
- Put location search and reverse geocode behind backend APIs.
- Cache repeated geocode and search requests in Redis.
- Reindex through Celery jobs.
- Keep search documents denormalized only as much as query performance needs.

Do not:

- Do not let frontend call Photon or Nominatim directly.
- Do not expose internal search ports publicly.
- Do not treat Elasticsearch as primary data storage.

## Media Rules

Do:

- Accept upload metadata in backend.
- Push originals to Cloudinary.
- Run resize, optimization, and WebP generation through Celery.
- Store generated variants in structured tables.
- Validate upload ownership and content type.

Do not:

- Do not perform heavy image processing in request-response cycle.
- Do not trust frontend file metadata alone.
- Do not overwrite historical media references blindly.

## Auth And Security Rules

Do:

- Verify Google and Apple sign-in through Firebase Admin SDK.
- Keep local user accounts and provider identities mapped explicitly.
- Support token refresh and session revocation.
- Protect dashboard and private routes with auth.
- Check ownership on every mutation.
- Rate limit auth, message, upload, search, and ISBN endpoints.
- Keep verification documents private.

Do not:

- Do not trust client role claims.
- Do not leak exact private addresses before transaction rules allow it.
- Do not expose admin or moderation endpoints without role checks and audit logs.

## Membership And Pass Rules

Do:

- Treat membership plans and borrow pass packages as backend-controlled records.
- Support add, edit, archive, disable, and replacement flows.
- Preserve historical purchases and historical plan snapshots.
- Keep plan logic configurable from admin/backend, not hardcoded in frontend.

Do not:

- Do not hardcode plan names, prices, durations, or limits into backend logic when they belong in data.
- Do not break active memberships when a plan is edited or archived.

## Background Jobs Rules

Use Celery for:

- image processing
- search indexing
- recommendation refresh
- push notification fan-out
- reputation recalculation
- digest jobs
- cleanup jobs

Do:

- Make jobs idempotent where practical.
- Keep retry policy explicit.
- Record failures in logs and, where needed, status tables.

Do not:

- Do not hide business-critical async failure states.
- Do not enqueue jobs without enough identifiers to recover the context later.

## Testing Rules

Do:

- Write unit tests for services and selectors.
- Write API tests for core user flows.
- Write integration tests for payment, borrow, exchange, membership, and messaging flows.
- Add fixture/factory support early.
- Test permission boundaries.
- Test race-prone flows like checkout, borrow approval, and pass-credit deduction.

Do not:

- Do not rely only on manual Postman checks.
- Do not skip tests on modules that change money, inventory, membership, or user identity.

## Documentation Rules

Keep these docs updated when backend work starts:

- `backend_architecture.md`
- `backend_phase_by_phase_plan.md`
- `backend_feature_dependency_audit.md`
- `database_erd.dbml`
- domain ERD files if structure changes materially

Add docs when needed for:

- API conventions
- environment variables
- deployment runbook
- incident recovery
- admin operations

Do not:

- Do not let docs drift for major schema or infrastructure changes.
- Do not keep final decisions only in chat history.

## Delivery Rules

Before implementing a backend feature:

1. Check the matching frontend route and UI behavior.
2. Check the backend phase plan.
3. Check whether the database schema already supports the flow.
4. Decide which feature module owns the logic.
5. Define API contract before wiring frontend integration.

Before marking a feature done:

1. Migration exists if schema changed.
2. Tests exist for core behavior.
3. Permissions checked.
4. Async side effects handled.
5. Caching/index invalidation handled.
6. Docs updated if architecture or schema changed.

## Short Version

Build BoiMix backend as a disciplined modular monolith:

- feature-owned logic
- database-first correctness
- backend-controlled product rules
- private internal infra
- async work in Celery
- frontend contracts kept stable
- docs updated as decisions change
