# Infrastructure Description

## Overview

Udagram is hosted on AWS using three managed services: RDS (database), Elastic Beanstalk (API), and S3 (frontend). All services communicate over HTTPS.

---

## AWS Services

### 1. Amazon RDS — PostgreSQL Database

| Property | Value |
|----------|-------|
| Engine | PostgreSQL 18.x |
| Instance | db.t3.micro (free tier eligible) |
| Port | 5432 |
| Accessibility | Publicly accessible (for EB connectivity) |

**Purpose:** Stores user accounts, authentication data, and feed items (posts with image references).

**Environment variables consumed by the API:**
- `POSTGRES_HOST` — RDS endpoint URL
- `POSTGRES_DB` — database name
- `POSTGRES_USERNAME` — master username
- `POSTGRES_PASSWORD` — master password

---

### 2. AWS Elastic Beanstalk — Backend API

| Property | Value |
|----------|-------|
| Platform | Node.js 24 on Amazon Linux 2023 |
| Environment type | Single instance (free tier) |
| Port | 8080 |
| Entry point | `npm start` → `node ./www/server.js` |

**Purpose:** Hosts the RESTful Node/Express/TypeScript API. Handles user registration, login (JWT), feed CRUD, and generates pre-signed S3 URLs for image uploads.

**Deployment artifact:** `Archive.zip` built by `npm run build` in `udagram-api`, uploaded via the EB CLI.

**Environment variables set in EB console:**
- `POSTGRES_*`, `AWS_BUCKET`, `AWS_REGION`, `JWT_SECRET`, `URL`

---

### 3. AWS S3 — Frontend Hosting & Media Storage

Two buckets are used:

| Bucket | Purpose |
|--------|---------|
| `<your-website-bucket>` | Hosts the compiled Angular/Ionic app as a static website |
| (same or separate) | Stores user-uploaded images; EB API generates pre-signed PUT/GET URLs |

**Frontend bucket configuration:**
- Static website hosting enabled
- `index.html` as both index and error document
- Bucket policy allows public `s3:GetObject`
- Cache-control headers on `index.html` set to `no-cache` (via `deploy.sh`)

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                        Internet                         │
└────────────┬────────────────────────┬───────────────────┘
             │                        │
             ▼                        ▼
  ┌─────────────────┐      ┌──────────────────────┐
  │   AWS S3        │      │  Elastic Beanstalk   │
  │  (Frontend)     │      │  (Node.js API)       │
  │                 │      │                      │
  │  Angular/Ionic  │─────▶│  Express REST API    │
  │  Static Files   │      │  Port 8080           │
  └─────────────────┘      └──────────┬───────────┘
                                      │
                           ┌──────────┴───────────┐
                           │                      │
                           ▼                      ▼
                  ┌─────────────────┐   ┌──────────────────┐
                  │   Amazon RDS    │   │    AWS S3        │
                  │  (PostgreSQL)   │   │  (Media/Images)  │
                  │                 │   │                  │
                  │  Users & Feed   │   │  User Uploads    │
                  │  Data           │   │  (signed URLs)   │
                  └─────────────────┘   └──────────────────┘
```

---

## Communication Flow

1. User opens the frontend URL (S3 static website).
2. Angular app calls the API on Elastic Beanstalk (`apiHost` in `environment.prod.ts`).
3. API validates JWT, queries RDS for feed data, and returns pre-signed S3 URLs for images.
4. Browser uploads images directly to S3 via the pre-signed PUT URL.
5. Browser fetches images from S3 via the pre-signed GET URL.
