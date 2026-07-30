# BoiMix Backend Deployment Runbook

This document defines the expected deployment and rollback flow for the BoiMix backend.

It is a runbook, not the architecture source of truth.

## Deployment Shape

Final deployment decision:

- `VPS 1` hosts public app services
- `VPS 2` hosts internal search and map services
- communication between them uses private network only

### VPS 1

- `nginx`
- `frontend`
- `backend`
- `postgres`
- `redis`
- `celery-worker`
- `celery-beat`
- `channels-worker`

### VPS 2

- `nginx`
- `elasticsearch`
- `photon`
- `nominatim`
- optional local `redis`

## Before Deployment

Check:

- environment variables are present
- Docker images build successfully
- tests pass
- migrations are reviewed
- search/map private network connectivity is healthy
- backup path is available

## Standard Deploy Flow

1. Pull latest code/image.
2. Confirm secrets/env are present.
3. Build or pull updated containers.
4. Run database migrations.
5. Restart backend services.
6. Restart workers if required.
7. Run health checks.
8. Confirm logs are clean.
9. Confirm critical user flows quickly.

## Post-Deploy Checks

Minimum checks:

- API health endpoint works
- auth works
- dashboard summary endpoint works
- DB connection works
- Redis connection works
- Celery worker is alive
- WebSocket handshake works
- Elasticsearch reachable from VPS 1
- Photon reachable from VPS 1
- Nominatim reachable from VPS 1

## Migration Rules

Before running migrations:

- know whether the migration is additive, destructive, or backfill-heavy
- confirm whether downtime risk exists
- confirm rollback approach

For risky migrations:

- prefer multi-step rollout
- separate schema change from data backfill when possible
- avoid long blocking migrations during peak traffic

## Rollback Rules

If deploy fails:

1. stop further rollout
2. identify whether issue is code, migration, env, or service connectivity
3. if needed, roll application containers back to previous known-good image
4. if migration is backward-incompatible, use the prepared rollback plan rather than improvising
5. verify health again after rollback

Do not:

- run ad hoc destructive DB fixes in panic
- assume rollback is safe without checking migration direction

## Backup Rules

Must exist:

- PostgreSQL backups
- configuration/secrets storage outside the repo
- Cloudinary asset retention by public ID

Before risky deploys:

- confirm a recent database backup exists
- confirm restore procedure is known

## Logs And Monitoring

Watch:

- backend container logs
- nginx logs
- celery worker logs
- channels worker logs
- postgres health
- redis health
- elasticsearch health
- photon/nominatim availability

Track errors in:

- auth
- payment
- borrow/exchange flows
- media processing
- search/map integration

## Search/Map Service Rules

VPS 2 ports must not be public.

Allow only:

- VPS 1 private IP to internal search/map gateway

Check after deploy:

- firewall rules still correct
- nginx internal proxy still routing
- Elasticsearch cluster healthy
- Photon search returns results
- Nominatim reverse geocode returns results

## Incident Notes

Common failure groups:

- bad environment variable
- migration problem
- private network/firewall issue
- Celery worker not consuming
- search index drift
- external provider auth failure

When documenting incidents later, add:

- timestamp
- impact
- cause
- mitigation
- permanent fix

## Short Version

Deploy safely, verify quickly, keep rollback real, and treat search/map connectivity and migrations as first-class deployment risks.
