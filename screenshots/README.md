# Submission Screenshots

Drop all 8 images in **this folder** so they get included when you zip the project.
Keep the file names below — the README references them and reviewers expect clear names.

| # | Required item | File name | Source | Status |
|---|---------------|-----------|--------|--------|
| 1 | Architecture of the site | `architecture.png` | Generated | ✅ done |
| 2 | Pipeline infrastructure | `pipeline.png` | Generated | ✅ done |
| 3 | RDS Database | `rds-database.png` | AWS Console | ⬜ capture |
| 4 | S3 Bucket | `s3-bucket.png` | AWS Console | ⬜ capture |
| 5 | Elastic Beanstalk instance | `elastic-beanstalk.png` | AWS Console | ⬜ capture |
| 6 | CircleCI account | `circleci-account.png` | CircleCI | ⬜ capture |
| 7 | CircleCI environment variables | `circleci-env-vars.png` | CircleCI | ⬜ capture |
| 8 | Last build of pipeline | `circleci-last-build.png` | CircleCI | ⬜ capture |

> `.svg` source files for the two diagrams are kept here too, in case you want to edit them.

---

## Capture steps for the 6 console screenshots

### 3. RDS Database — `rds-database.png`
AWS Console → **RDS** → **Databases** → click your instance.
Show: **Status = Available**, engine **PostgreSQL**, and the **Endpoint** (region us-east-1).

### 4. S3 Bucket — `s3-bucket.png`
AWS Console → **S3** → open your frontend bucket → **Properties** tab.
Show: **Static website hosting = Enabled** and the bucket website endpoint URL.
(Optionally a second shot of the **Objects** tab showing `index.html`.)

### 5. Elastic Beanstalk instance — `elastic-beanstalk.png`
AWS Console → **Elastic Beanstalk** → **Environments** → open your env.
Show: **Health = Ok** (green), the platform (Node.js 14), and the environment URL.

### 6. CircleCI account — `circleci-account.png`
app.circleci.com → **Projects**.
Show: your `udagram` project listed and connected to your GitHub org.

### 7. CircleCI environment variables — `circleci-env-vars.png`
Project → **Project Settings** → **Environment Variables**.
Show: the variable **names** (POSTGRES_*, AWS_*, JWT_SECRET, URL). Values stay masked — that's expected.

### 8. Last build of pipeline — `circleci-last-build.png`
Project pipelines → open the most recent run on **master**.
Show: the workflow with **build → hold → deploy** all green/approved (a passing run).

---

## Tips
- Windows: **Win + Shift + S** to snip a region → paste into Paint → save as PNG here.
- Include the browser address bar / AWS breadcrumb so the reviewer can see it's your real console.
- You do **not** need to expose any secret values — masked env vars and endpoints are fine.
