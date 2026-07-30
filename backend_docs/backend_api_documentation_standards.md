# BoiMix Backend API Documentation Standards

This document defines how API documentation should be written and maintained for the BoiMix backend.

The goal is simple:

- any developer can understand the API quickly
- frontend developers can integrate without guesswork
- backend developers can maintain consistency as the codebase grows

## Documentation Stack

Recommended documentation stack:

- `drf-spectacular` for OpenAPI schema generation
- `Swagger UI` for internal interactive exploration and testing
- `Redoc` or `Redocly` style rendering for polished reference documentation

Standards source:

- Django REST Framework documentation recommends `drf-spectacular` for generating and presenting OpenAPI schemas.
- OpenAPI is the contract source of truth for HTTP APIs.

## Documentation Rule

Every implemented API must be documented.

That includes:

- public user APIs
- authenticated user APIs
- dashboard APIs
- admin APIs
- moderator APIs
- internal integration-facing APIs if they are part of the runtime contract

No production endpoint should require another developer to read the source code just to understand:

- what it does
- what auth it needs
- what request body it expects
- what response it returns
- what errors it can produce

## Required Per-Endpoint Documentation

Each endpoint should document all of the following:

- endpoint path
- HTTP method
- short summary
- detailed description
- authentication requirement
- permission/role requirement
- path parameters
- query parameters
- request body schema
- success response schema
- error response schema
- example request
- example success response
- example failure response
- notes about side effects if any

## Required Per-Field Documentation

Document fields clearly when:

- the field name is not fully self-explanatory
- the field is enum-driven
- the field has business rules
- the field is nullable only under certain conditions
- the field depends on user role or workflow state
- the field is money-, time-, membership-, borrow-, exchange-, or moderation-related

Do not leave important fields unexplained just because the serializer exists.

## Required Error Documentation

Every meaningful API should document likely error cases.

At minimum document:

- `400 Bad Request`
- `401 Unauthorized`
- `403 Forbidden`
- `404 Not Found`
- `409 Conflict` where workflow conflict exists
- `422` style validation detail if used
- `429 Too Many Requests` for rate-limited endpoints

For business-critical flows also document:

- payment failure cases
- insufficient membership/pass credit cases
- borrow approval/rejection cases
- exchange conflict cases
- duplicate submission or idempotency cases
- verification rejection cases
- moderation lock/ban cases

## Example Quality Standard

Examples should be realistic.

Do:

- use believable IDs
- use realistic Bengali/Bangladesh context where appropriate
- show actual enum values
- show money fields in realistic values
- show pagination examples
- show validation errors in the same shape the frontend will receive

Do not:

- use empty or fake placeholder examples everywhere
- omit examples for important request bodies
- publish examples that do not match the real serializer shape

## Authentication Documentation Standard

Every protected endpoint must clearly state:

- whether auth is required
- what token type is expected
- whether Firebase-derived login is involved
- whether user, moderator, or admin role is required
- whether object ownership is required

If an endpoint behaves differently by role, the docs should say so explicitly.

## Pagination And Filtering Standard

If an endpoint returns a list, the docs should state:

- pagination style
- default page size or cursor behavior
- supported filters
- search params
- sorting params
- nullable or optional filter behavior

If the frontend depends on a specific sort or filter behavior, document that too.

## State And Workflow Documentation Standard

For stateful modules like:

- orders
- borrow requests
- exchange offers
- memberships
- borrow passes
- verification
- reports

the docs must explain:

- available statuses
- allowed transitions
- who can trigger each transition
- what side effects happen on transition

If a transition triggers async processing, notification, refund, index update, or reputation update, mention that.

## Dashboard API Documentation Standard

Dashboard APIs should document:

- whether the endpoint is summary-only or full-detail
- whether data is aggregated from multiple modules
- whether values may be cached briefly
- what counts, badges, or action cards mean
- which fields are suitable for polling

This matters because dashboard endpoints are often integration-heavy and easy to misunderstand.

## Search And Map API Documentation Standard

Document separately for:

- book search
- location search
- reverse geocoding
- nearby discovery

For each of these, explain:

- input params
- location format
- coordinate format
- result ranking behavior if important
- caching behavior if relevant
- fallback behavior if external provider fails

Do not hide provider-dependent behavior when it affects product UX.

## WebSocket Documentation Standard

WebSocket contracts should be documented even if they are not part of OpenAPI itself.

Document:

- connection URL
- auth method
- event names
- payload format
- server-to-client events
- client-to-server events
- typing/seen/presence behavior
- reconnect expectations
- error event shape

Recommended:

- keep a separate websocket contract document
- link it from the main backend docs

## File Upload Documentation Standard

For upload endpoints document:

- accepted file types
- size rules
- image count limits
- ownership rules
- processing behavior
- async processing expectations
- generated variant behavior if relevant

If frontend upload UI and backend upload policy differ, documentation must clarify the backend truth.

## Admin And Moderator API Standard

Document admin and moderator endpoints with extra clarity:

- required role
- audit implications
- destructive action rules
- archive vs delete behavior
- visibility restrictions

Do not mix user-facing examples and admin-only examples without labeling them clearly.

## OpenAPI Authoring Standard

Use schema generation, but do not rely on defaults alone.

Add explicit metadata for:

- operation summary
- operation description
- tags
- request examples
- response examples
- enum descriptions where needed
- custom error examples

The auto-generated schema should be reviewed, not blindly accepted.

## Documentation Review Checklist

Before marking an endpoint documented, check:

1. Is the endpoint in the OpenAPI schema?
2. Does it have a useful summary and description?
3. Are auth and permission rules documented?
4. Are request and response examples included?
5. Are business-rule-driven fields explained?
6. Are likely error cases documented?
7. Does the example match real response shape?
8. If list endpoint, are pagination/filter/sort rules included?
9. If workflow endpoint, are status transitions explained?
10. Can a frontend developer integrate without reading backend code?

## What Not To Do

Do not:

- rely only on serializer auto-output with no descriptions
- leave undocumented admin endpoints
- use one-line descriptions for complex flows
- skip examples on important endpoints
- document outdated request or response shapes
- keep Postman as the only integration reference
- let docs drift after endpoint changes

## Suggested Output Structure

When publishing endpoint docs, keep this structure:

1. Summary
2. Authentication
3. Request
4. Parameters
5. Request example
6. Success response
7. Error responses
8. Notes

## Short Version

Professional API documentation for BoiMix means:

- schema-complete
- example-rich
- role-aware
- workflow-aware
- integration-friendly
- maintained alongside code
