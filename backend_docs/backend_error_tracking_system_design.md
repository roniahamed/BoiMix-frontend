# BoiMix Lightweight Internal Error Tracking System

This document defines the lightweight self-hosted error tracking system for BoiMix.

Goal:

- capture backend and frontend errors in one place
- avoid third-party error tracking services
- keep the system simple enough to run with the rest of BoiMix
- provide the minimum useful features of a basic Sentry-like workflow
- restrict visibility to system admin only

## Scope

This system should cover:

- Django backend errors
- DRF request errors
- Next.js frontend runtime errors
- container/runtime logs
- production error notifications

It should not try to become a full observability platform on day one.

## Backend

### Logging

Use Django logging with:

- console output
- file output

Log at least:

- request exceptions
- unhandled server exceptions
- integration failures
- Celery task failures
- auth and permission failures that matter operationally
- webhook failures

Logging should be structured enough to support filtering and debugging later.

### Global DRF Exception Handler

Add a global DRF exception handler that:

- formats API errors consistently
- captures unexpected exceptions
- writes important failures to the error tracking table
- preserves user-facing validation behavior

The handler should store:

- message
- traceback
- endpoint
- method
- status code
- user
- IP
- timestamp

### ErrorLog Model

Store backend errors in a dedicated `ErrorLog` model.

Recommended fields:

- `id`
- `fingerprint`
- `message`
- `traceback`
- `endpoint`
- `method`
- `status_code`
- `user`
- `ip_address`
- `first_seen_at`
- `last_seen_at`
- `occurrence_count`
- `status`
- `created_at`
- `updated_at`

Recommended status values:

- `unresolved`
- `resolved`
- `ignored`

### Duplicate Grouping

Duplicate errors should be grouped by a stable fingerprint.

Fingerprint inputs should usually include:

- exception type
- normalized message
- endpoint or view name
- stack trace signature

When the same error happens again:

- do not create a brand new group unless it is meaningfully different
- increment occurrence count
- update last seen timestamp

### Capture Rules

Capture:

- uncaught server exceptions
- repeated backend exceptions
- API failures that break request handling
- background task failures that matter operationally

Do not treat ordinary validation errors as incidents unless they reveal a real product or integration issue.

## Frontend

### Global Error Hooks

Add browser-side capture for:

- `window.onerror`
- `window.unhandledrejection`

Frontend error events should be normalized and sent to a backend API.

### Frontend Payload

Store at least:

- browser
- OS
- URL
- stack trace
- message
- user agent
- timestamp
- route

If available, also capture:

- release version
- build ID
- session ID

### Frontend Submission Rule

Frontend errors should be sent to a backend API endpoint designed for error intake.

The frontend should not send error data to a third-party tracker.

## Access Control

This system is visible only to system admin users.

Rules:

- only system admin can view the error dashboard
- only system admin can search, filter, resolve, ignore, or inspect errors
- frontend error intake endpoints may accept reports from the browser, but browsing the stored errors is admin-only
- regular users, moderators, and other staff roles must not see error details

## Dashboard

The error tracking dashboard should include:

- error list
- search and filter
- error detail view
- error count and occurrences
- first seen
- last seen
- resolved/unresolved status
- ignored status

### Useful Filters

At minimum support filtering by:

- status
- endpoint
- method
- severity
- user
- date range
- browser
- OS
- occurrence count

### Error Detail View

Each error detail view should show:

- message
- traceback
- fingerprint
- first seen
- last seen
- total occurrences
- endpoint
- method
- user
- IP
- browser
- OS
- raw context if safe to show

## Notifications

Production errors may optionally notify external channels.

Supported channels:

- Telegram webhook
- Discord webhook

Notification rules should be configurable so only production-worthy errors alert the team.

Suggested alert triggers:

- critical backend error
- repeated occurrences of the same error
- payment or auth failure spike
- background job failure spike
- frontend release-related error spike

Do not send notifications for routine validation noise.

## Docker

Integrate Dozzle for live container log viewing.

Purpose:

- quickly inspect backend container logs
- quickly inspect worker logs
- quickly inspect nginx logs
- avoid SSH-only log hunting during incidents

Dozzle should complement error tracking, not replace it.

## Recommended Backend Flow

1. A request hits Django or DRF.
2. The global exception handler formats the API response.
3. The error payload is normalized.
4. The error is grouped using a fingerprint.
5. The error is stored or updated in `ErrorLog`.
6. The UI dashboard reads the grouped error list.
7. Optional notifications are sent for production-level incidents.

## Recommended Frontend Flow

1. A runtime error happens in Next.js.
2. Global browser handlers capture it.
3. The frontend sends a normalized payload to backend error intake.
4. Backend groups the error and updates counts.
5. Dashboard reflects the new occurrence.

## Recommended Minimal API Surface

Suggested endpoints:

- `POST /api/errors/frontend`
- `GET /api/admin/errors`
- `GET /api/admin/errors/{id}`
- `PATCH /api/admin/errors/{id}`

Possible patch actions:

- mark resolved
- mark unresolved
- mark ignored
- add note if notes are supported later

## Data Retention

Keep the system lightweight.

Recommended behavior:

- keep grouped errors
- keep recent occurrences
- prune raw entries if you later split occurrences into a separate table
- keep resolved/ignored history long enough for debugging and trend analysis

## What Not To Do

Do not:

- rely on a third-party SaaS tracker
- store only plain text logs with no grouping
- lose traceback context
- mix frontend and backend errors without labels
- send all validation errors to notification channels
- make the dashboard depend on manual log parsing
- build a heavy observability stack when the product only needs lightweight error tracking

## Short Version

BoiMix error tracking should be:

- self-hosted
- lightweight
- grouped by fingerprint
- visible in dashboard form
- integrated with frontend and backend
- optionally alerting to Telegram or Discord
- supported by Dozzle for live container logs
