Infrastructure and Architecture

backend/
│
├── app/
│   │
│   ├── core/                      # Global infrastructure
│   │   ├── config.py
│   │   ├── security.py
│   │   ├── database.py
│   │   ├── dependencies.py
│   │   ├── middleware.py
│   │   ├── exceptions.py
│   │   ├── permissions.py
│   │   ├── logging.py
│   │   └── constants.py
│   │
│   ├── modules/                   # Business domains
│   │
│   │   ├── auth/
│   │   │   ├── api.py
│   │   │   ├── service.py
│   │   │   ├── repository.py
│   │   │   ├── model.py
│   │   │   ├── schema.py
│   │   │   ├── dependencies.py
│   │   │   ├── permissions.py
│   │   │   └── exceptions.py
│   │   │
│   │   ├── users/
│   │   │   ├── api.py
│   │   │   ├── service.py
│   │   │   ├── repository.py
│   │   │   ├── model.py
│   │   │   ├── schema.py
│   │   │   └── tasks.py
│   │   │
│   │   ├── books/
│   │   │   ├── api.py
│   │   │   ├── service.py
│   │   │   ├── repository.py
│   │   │   ├── model.py
│   │   │   ├── schema.py
│   │   │   ├── filters.py
│   │   │   └── tasks.py
│   │   │
│   │   ├── borrowing/
│   │   │
│   │   ├── swap/
│   │   │
│   │   ├── notification/
|   |   |
│   │   ├── Admin
|   |   ├── search/
|   |   |
│   │   └── chat/
│   │
│   │
│   ├── shared/
│   │   ├── email/
│   │   ├── sms/
│   │   ├── storage/
│   │   ├── cache/
│   │   ├── pagination/
│   │   ├── websocket/
|   |   ├── Firebase
│   │   └── validators/
│   │
│   │
│   ├── background/
│   │   ├── celery_app.py
│   │   ├── schedules.py
│   │   └── workers.py
│   │
│   │
│   ├── tests/
│   │   ├── auth/
│   │   ├── users/
│   │   └── books/
│   │
│   │
│   ├── main.py
│   └── router.py
│
│
├── migrations/
│
├── scripts/
│   ├── seed.py
│   └── create_admin.py
│
├── docker/
│
├── .env
├── docker-compose.yml
├── pyproject.toml
└── README.md