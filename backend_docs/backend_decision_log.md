# BoiMix Backend Decision Log

This document records major backend decisions so they do not stay buried in chat history.

## Decision Format

Each decision should record:

- date
- topic
- decision
- reason
- impact

## Logged Decisions

### 2026-07-30 - Backend Architecture Style

Decision:

- Use a modular monolith backend.
- Use feature-based module boundaries.

Reason:

- The product has many related workflows and shared data.
- Early microservices would add operational complexity without enough benefit.

Impact:

- Backend code should stay in one deployable app stack.
- Feature ownership must remain clear so the monolith does not turn chaotic.

### 2026-07-30 - Backend Stack

Decision:

- Django + Django REST Framework
- Django Channels
- PostgreSQL + PostGIS
- Redis
- Celery

Reason:

- The product needs strong relational workflows, realtime messaging, background jobs, and mature ecosystem support.

Impact:

- Architecture and implementation docs are written around this stack.

### 2026-07-30 - Search And Map Stack

Decision:

- Use Elasticsearch for search.
- Use Photon for location search.
- Use Nominatim for reverse geocoding.

Reason:

- The product requires book search, location search, and reverse location search as first-class features.

Impact:

- Search and map endpoints must be proxied through backend APIs.

### 2026-07-30 - Infra Split

Decision:

- Use 2 VPS servers.

Reason:

- Search/map infrastructure should be isolated from the main app stack for operational safety and performance.

Impact:

- VPS 1 hosts the public app stack.
- VPS 2 hosts internal search and map services.

### 2026-07-30 - Network Exposure Policy

Decision:

- Search/map services must not be exposed publicly.
- Communication uses private network only.

Reason:

- It is safer and cleaner to keep Elasticsearch, Photon, and Nominatim off the public internet.

Impact:

- Firewall and nginx setup must enforce private-only access.

### 2026-07-30 - Membership Product Rule

Decision:

- The valid backend membership model is the 4-year deposit-based plan model.
- Monthly `Basic/Premium/Elite` copy is stale frontend content and must not drive backend schema.

Reason:

- Frontend copy had conflicting product definitions and needed a single backend truth.

Impact:

- Membership tables, APIs, and logic follow the deposit-based model.

### 2026-07-30 - Backend-Controlled Plan Data

Decision:

- Membership plans and borrow pass packages are backend-controlled records.

Reason:

- Product rules need to be editable without code deployment.

Impact:

- Admin/backoffice APIs and plan history support are required.

### 2026-07-30 - Documentation Rule

Decision:

- API documentation and implementation instructions are first-class project artifacts.

Reason:

- The backend will involve many connected workflows, and onboarding/integration quality matters.

Impact:

- Docs must be updated when major contract, schema, or infra changes happen.

## Short Version

If a backend decision changes architecture, schema direction, infra, or core product rule, log it here with the date and impact.
