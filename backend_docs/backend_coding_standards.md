# BoiMix Backend Coding Standards

This document defines the coding standards for the BoiMix backend.

It exists to keep the modular monolith clean, predictable, and maintainable as more backend work starts.

## Core Principles

- Prefer clarity over cleverness.
- Keep feature ownership obvious.
- Keep write logic out of views and serializers.
- Keep read logic organized and reusable.
- Keep files small enough to navigate comfortably.
- Prefer boring, standard code over surprising abstractions.

## Project Structure Rules

Use the agreed backend shape:

- `config/` for framework wiring
- `apps/` for feature modules
- `integrations/` for external service clients
- `common/` for cross-project helpers
- `tests/` for shared test tooling
- `scripts/` for operational commands

Feature modules should typically contain:

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

## Naming Rules

Use clear, explicit names.

Good:

- `create_borrow_request`
- `approve_exchange_offer`
- `get_user_dashboard_summary`
- `recalculate_reputation_score`

Avoid:

- `handle_data`
- `process`
- `do_action`
- `common_helper`
- `utils2`

Service names should sound like business actions.

Selector names should sound like read/query intent.

Serializer names should reflect the use case, not just the model.

Examples:

- `BookListingCreateSerializer`
- `BookListingSummarySerializer`
- `BorrowOrderDetailSerializer`
- `MembershipPlanAdminUpdateSerializer`

## Views And Serializers

Views should:

- authenticate
- authorize
- parse request
- call service/selector
- return response

Serializers should:

- validate request/response shape
- perform small field-level validation
- avoid owning full business workflows

Do not:

- put multi-step state transitions in serializers
- perform hidden writes in `to_representation`
- put major branching logic in views

## Service Rules

Services should own:

- business workflow execution
- state transitions
- transaction boundaries
- orchestration across models
- calls to async tasks or integrations

Services should not:

- format HTTP responses
- depend on request objects
- contain presentation-layer concerns

Prefer splitting large services by workflow if needed.

Examples:

- `borrow_request_service.py`
- `borrow_return_service.py`
- `membership_purchase_service.py`

## Selector Rules

Selectors should own:

- query building
- filtering
- list/detail retrieval
- dashboard aggregates
- prefetch/select-related strategy

Selectors should not:

- mutate state
- enqueue tasks
- call external integrations unless there is a very strong read-only reason

If the same query pattern appears in more than one place, move it to a selector.

## Model Rules

Models should stay focused on:

- fields
- relationships
- simple invariants
- very small helper properties

Avoid:

- large workflow methods
- network calls
- hidden side effects in `save()`
- cross-feature business orchestration

Model methods are fine for tiny, local behavior. Larger flows belong in services.

## File Size Rules

Keep files reasonably sized and cohesive.

Guideline:

- if a file becomes hard to scan, split it
- if a service file starts handling many unrelated workflows, split it
- if one serializer file handles many very different endpoints, split it
- if one views file becomes the whole feature, break it up

Do not keep growing files just because the module name is broad.

## Import Rules

Prefer stable dependency direction:

- `api` can call `services` and `selectors`
- `services` can call models, selectors, tasks, integrations
- `selectors` can call models
- `tasks` can call services/selectors/integrations carefully
- feature modules can use `common`

Avoid circular imports by keeping dependencies intentional.

Do not create deep cross-feature imports unless the owning module truly exposes that behavior.

## Exception Rules

Use explicit exceptions for business-rule failures.

Examples:

- `InsufficientPassCreditError`
- `MembershipInactiveError`
- `BorrowRequestConflictError`

Do not:

- raise vague `Exception`
- leak raw provider errors directly to API consumers
- mix validation, permission, and business-rule failures together without clear handling

## Commenting Rules

Comments should be small and useful.

Use comments for:

- unusual transaction behavior
- non-obvious query optimization
- important business rule edge cases
- external-provider caveats

Avoid comments like:

- "set variable"
- "save model"
- "return response"
- "loop through items"

If the code needs too much explanation, improve structure or naming first.

## Database And Query Rules

Write query-aware code.

Do:

- use `select_related`
- use `prefetch_related`
- use indexes intentionally
- paginate large lists
- avoid N+1 query patterns
- keep dashboard aggregates efficient

Do not:

- fetch large datasets blindly
- rely on cache to hide bad query design
- join unrelated data in one oversized endpoint without reason

## API Response Rules

Keep response shapes:

- consistent
- documented
- versioned
- safe for frontend integration

Do not rename fields casually after frontend integration starts.

If a shape must change, update docs and versioning strategy carefully.

## Migrations Rules

For schema changes:

- create explicit migration
- review index impact
- review data backfill need
- review rollback risk
- keep migration intent easy to understand

Prefer multiple small safe migrations over one giant risky migration.

## Logging Rules

Log meaningful operational events:

- payment failures
- external integration failures
- async job failures
- suspicious auth/security events

Do not log:

- secrets
- tokens
- passwords
- private document contents

## Short Version

Write backend code so another developer can open the file and quickly understand:

- which feature owns it
- whether it reads or writes
- where the business rule lives
- how it is tested
