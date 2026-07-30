# BoiMix Backend Implementation Instructions

This document defines the working rules for implementing the BoiMix backend.

It is not the feature plan itself. It is the instruction layer for how backend work should be done so the architecture stays consistent.

## Core Rules

Do:

- Follow modular monolith architecture.
- Build feature-based Django apps.
- Keep PostgreSQL as the source of truth.
- Write database-aware code with performance in mind from the start.
- Use Redis only for cache, queue, websocket layer, and temporary state.
- Keep search and map services outside the app process.
- Route all frontend data through backend APIs.
- Match backend contracts to real frontend routes and UI flows.
- Build backend configuration so plans, passes, CMS content, and policy-driven data can change without code deploy.
- Write code in small, testable layers: API, service, selector, task, integration.
- Keep domain rules inside the owning feature module.
- Finish work fully. Do not leave critical flows half-done.
- Keep files reasonably scoped so one file does not become the dumping ground for a whole feature.
- Write comments only when they add real context.

Do not:

- Do not turn this into microservices at the start.
- Do not put business logic inside serializers, views, or model save hooks unless the logic is truly tiny.
- Do not let frontend constants become backend truth when the data should be admin-controlled.
- Do not call Photon, Nominatim, Google Books, Cloudinary, or Firebase directly from the browser for protected workflows.
- Do not use Redis as durable storage.
- Do not expose Elasticsearch, Photon, or Nominatim publicly.
- Do not create generic utility dumping grounds that hide feature ownership.
- Do not leave TODO-shaped gaps in core business flows and call the feature done.
- Do not write giant files when the code clearly belongs in separate services, selectors, serializers, or modules.
- Do not add generic comments like "set variable", "save data", or "handle request".

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
- Optimize queries deliberately with `select_related`, `prefetch_related`, proper indexes, and constrained query shapes where appropriate.
- Use pagination, limits, and filtered querysets for large lists.
- Review transaction boundaries for checkout, borrow, exchange, wallet, and membership flows.
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
- Do not ship obviously inefficient query patterns if the endpoint is central to dashboard, search, checkout, borrow, or messaging flows.
- Do not hide missing indexes behind cache as a permanent workaround.

## API Rules

Do:

- Keep API versioned, starting with `/api/v1/`.
- Keep response shape stable once frontend integration begins.
- Use cursor or page-based pagination consistently.
- Return backend-driven enums, labels, and policy data where UI depends on product rules.
- Add filters and search params intentionally, not ad hoc.
- Keep write APIs idempotent where retry is likely.
- Document every public and internal integration-facing endpoint in the OpenAPI schema.
- Include endpoint summaries, descriptions, auth requirements, params, request bodies, response bodies, error cases, and realistic examples.

Do not:

- Do not make the frontend stitch multiple endpoints just to render one primary dashboard card if a summary endpoint is appropriate.
- Do not return raw provider payloads directly to the frontend.
- Do not mix admin and user API surfaces together.
- Do not leave undocumented endpoints for other developers to reverse-engineer from code.

## API Documentation Rules

Use an OpenAPI-first documentation workflow.

Recommended stack:

- `drf-spectacular` for OpenAPI schema generation. Django REST Framework documentation lists it as the recommended way for generating and presenting OpenAPI schemas.
- `Swagger UI` for internal interactive testing and quick inspection.
- `Redoc` or `Redocly` style documentation for polished, professional API reference output.

Documentation standard:

- Every endpoint must appear in the schema.
- Every serializer exposed to API consumers must have clear field descriptions where needed.
- Authentication methods, permissions, and role restrictions must be documented.
- Request and response examples must be included for important flows.
- Error responses must be documented, especially validation, auth, permission, payment, borrow, exchange, and moderation failures.
- Webhook or async callback behavior must be documented if introduced later.
- WebSocket event contracts should be documented alongside HTTP APIs, even if they live in a separate document.

Best-practice goal:

- A new developer should be able to understand the API from the docs without tracing the entire codebase.
- A frontend developer should be able to integrate from the docs with minimal clarification.
- An external maintainer should be able to understand auth, error behavior, and data shapes quickly.

Do not:

- Do not rely on Postman collections alone as the canonical API documentation.
- Do not keep important request/response rules only in serializer code.
- Do not publish vague endpoint descriptions with missing examples.

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
- Write tests for every backend module that is implemented. No feature should be considered complete without tests.
- Add fixture/factory support early.
- Test permission boundaries.
- Test race-prone flows like checkout, borrow approval, and pass-credit deduction.
- Add regression tests when fixing bugs.

Do not:

- Do not rely only on manual Postman checks.
- Do not skip tests on modules that change money, inventory, membership, or user identity.
- Do not leave "tests later" as a habit for finished backend work.

## Commenting Rules

Do:

- Write small, high-signal comments only where the code would otherwise be hard to understand.
- Use comments to explain why something exists, why a rule is unusual, or why a query/transaction is written a specific way.
- Keep comments close to the code they clarify.

Do not:

- Do not add generic narration comments.
- Do not restate what the code already says clearly.
- Do not use comments to hide unclear naming or poor structure.

## File Size And Organization Rules

Do:

- Split large features into focused modules before files become difficult to navigate.
- Keep services cohesive by workflow, not by dumping every action into one file.
- Break serializers, selectors, and API handlers apart when a module starts carrying too many unrelated responsibilities.

Do not:

- Do not keep hundreds of unrelated lines in a single service file just because they belong to the same broad feature.
- Do not let one `views.py` or `services.py` become the entire feature architecture.
- Do not choose convenience over maintainability when the codebase is clearly growing.

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
