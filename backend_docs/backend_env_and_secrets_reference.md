# BoiMix Backend Environment And Secrets Reference

This document lists the expected environment and secret categories for the BoiMix backend.

It is a reference guide, not a place to store real secret values.

## Core Principle

Never commit real secrets to the repository.

Use:

- local `.env` files for development
- secure secret storage for VPS/CI
- environment-specific values for local, staging, and production

## App And Django

Examples:

- `DJANGO_SETTINGS_MODULE`
- `DJANGO_SECRET_KEY`
- `DJANGO_DEBUG`
- `DJANGO_ALLOWED_HOSTS`
- `DJANGO_CORS_ALLOWED_ORIGINS`
- `DJANGO_CSRF_TRUSTED_ORIGINS`
- `API_BASE_URL`

## Database

Examples:

- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_HOST`
- `POSTGRES_PORT`
- `DATABASE_URL`

## Redis

Examples:

- `REDIS_URL`
- `CELERY_BROKER_URL`
- `CELERY_RESULT_BACKEND`
- `CHANNELS_REDIS_URL`

## Search And Map

Examples:

- `ELASTICSEARCH_URL`
- `ELASTICSEARCH_USERNAME` if used
- `ELASTICSEARCH_PASSWORD` if used
- `PHOTON_URL`
- `NOMINATIM_URL`
- `SEARCH_INTERNAL_GATEWAY_URL` if nginx is used as single entry

## Firebase

Examples:

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_WEB_API_KEY` if needed for frontend coordination

## Cloudinary

Examples:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Google Books

Examples:

- `GOOGLE_BOOKS_API_KEY`
- `GOOGLE_BOOKS_BASE_URL`

## Notifications

Examples:

- `FCM_PROJECT_ID`
- `FCM_CLIENT_EMAIL`
- `FCM_PRIVATE_KEY`

## Payments

Use names based on the final gateway choice.

Examples:

- `PAYMENT_PROVIDER`
- `PAYMENT_API_KEY`
- `PAYMENT_SECRET`
- `PAYMENT_WEBHOOK_SECRET`

## Storage And Media Processing

Examples:

- `MEDIA_MAX_UPLOAD_MB`
- `MEDIA_TARGET_FORMAT`
- `MEDIA_OPTIMIZATION_ENABLED`
- `MEDIA_VARIANT_CONFIG_VERSION`

## Security And Rate Limits

Examples:

- `JWT_ACCESS_TTL_MINUTES`
- `JWT_REFRESH_TTL_DAYS`
- `LOGIN_RATE_LIMIT`
- `OTP_RATE_LIMIT`
- `UPLOAD_RATE_LIMIT`
- `MESSAGE_RATE_LIMIT`

## Deployment And Operations

Examples:

- `SENTRY_DSN` if used later
- `LOG_LEVEL`
- `DEFAULT_TIMEZONE`
- `BACKUP_PATH`
- `DEPLOY_ENV`

## Rules

Do:

- keep a `.env.example` updated with placeholder values
- separate local/dev/prod values clearly
- rotate sensitive secrets when needed
- document new env vars when a new integration is added

Do not:

- commit production secrets
- hardcode credentials in source files
- leave undocumented env dependencies

## Short Version

If backend code depends on a secret or env var, it must be documented here and represented in `.env.example`.
