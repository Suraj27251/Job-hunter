# FreelanceRadar Requirements Document

> **Version:** 1.0  
> **Date:** June 2026  
> **Status:** Draft  
> **Author:** Product Team

## 1. Executive Summary

**FreelanceRadar** is a multi-user SaaS platform that intelligently aggregates freelance and remote job listings from top platforms (Toptal, Upwork, Gun.io, Arc.dev, Contra, YunoJuno, Braintrust, We Work Remotely, Wellfound, Fiverr Pro, etc.), matches them against a user's resume, skills, and professional experience using AI, and provides a smart dashboard with follow-up tracking, personalized suggestions, and AI-generated proposals/cover letters.

The goal is to eliminate the time a freelancer wastes manually browsing 10+ platforms — FreelanceRadar does the hunting, scoring, and nudging for them.

## 2. Goals & Objectives

| Goal | Description |
|---|---|
| Centralized Job Feed | Aggregate jobs from 10+ platforms in one place |
| Smart Matching | AI scores each job against user profile (0–100%) |
| Proposal Automation | Generate tailored cover letters and proposals |
| Follow-Up System | Track application status with reminders |
| Actionable Insights | Suggest skills to learn, niches to target |
| Multi-User SaaS | Support hundreds of users with isolated data |

## 3. Target Users

- **Primary:** Freelancers actively seeking remote contracts (developers, designers, writers, marketers, etc.)
- **Secondary:** Part-time freelancers exploring opportunities alongside full-time jobs
- **Tertiary:** Agencies managing job pipelines for their team of freelancers

### User Personas

**Persona A — "The Busy Developer"**  
Full-stack developer with 5+ years experience. Has profiles on Upwork, Toptal, and Arc.dev but can't check all of them daily. Wants curated, high-match jobs delivered to a single dashboard.

**Persona B — "The Career Switcher"**  
Designer transitioning into UX. Unsure which platforms to focus on. Needs platform-level insights and skill gap analysis to position themselves better.

**Persona C — "The Power Freelancer"**  
Applies to 20+ jobs a week. Needs automation for cover letters and a CRM-like follow-up tracker to stay organized.

## 4. Functional Requirements

### 4.1 Authentication & User Management

- FR-AUTH-01: Users can register with email/password or OAuth (Google, GitHub, LinkedIn)
- FR-AUTH-02: Email verification on sign-up
- FR-AUTH-03: Multi-factor authentication (TOTP) support
- FR-AUTH-04: Role-based access: `Free`, `Pro`, `Agency`
- FR-AUTH-05: Agency accounts can manage sub-users (freelancers under them)
- FR-AUTH-06: Secure password reset via email link
- FR-AUTH-07: Session management with JWT + refresh tokens

### 4.2 Resume & Profile Management

- FR-PROF-01: Users upload resume in PDF or DOCX format
- FR-PROF-02: AI parses resume to extract:
  - Name, contact info
  - Skills (technical + soft)
  - Years of experience per skill
  - Education & certifications
  - Previous job titles and industries
  - Portfolio links (GitHub, Behance, Dribbble, etc.)
- FR-PROF-03: Users can review, edit, and enrich parsed data manually
- FR-PROF-04: Users can add skills not in resume (e.g., ongoing learning)
- FR-PROF-05: Users set preferred job types: hourly, fixed-price, part-time, full-time
- FR-PROF-06: Users set minimum rate (hourly/monthly)
- FR-PROF-07: Users set preferred platforms to monitor
- FR-PROF-08: Users set availability (immediately, 2 weeks, 1 month, etc.)
- FR-PROF-09: Support multiple resume versions per user (e.g., "Dev Resume", "PM Resume")

### 4.3 Job Aggregation Engine

- FR-AGG-01: System fetches jobs from supported platforms using official APIs where available, falling back to ethical web scraping
- FR-AGG-02: Supported platforms (Phase 1):
  - Upwork (API)
  - We Work Remotely (RSS Feed)
  - Wellfound / AngelList (API)
  - Remote OK (API)
  - Fiverr Pro (scraping)
  - Contra (scraping)
  - Gun.io (scraping)
  - Arc.dev (scraping)
  - YunoJuno (scraping)
  - Braintrust (scraping)
  - Toptal (scraping — public listings only)
- FR-AGG-03: Platforms to add in Phase 2: LinkedIn Remote, Freelancer.com, PeoplePerHour, Codeable, Hubstaff Talent
- FR-AGG-04: Jobs are deduped by title + company + posting date
- FR-AGG-05: Each job record stores:
  - Title, description, required skills
  - Budget/rate range
  - Posting date & deadline
  - Platform source + original URL
  - Location requirements (remote/timezone)
  - Experience level required
  - Contract type (hourly/fixed/full-time)
- FR-AGG-06: Scraping intervals configurable per platform (default: every 30–60 minutes)
- FR-AGG-07: Scraping uses rotating proxies and user-agent headers to avoid blocks
- FR-AGG-08: Respect `robots.txt` and platform ToS to the extent possible; flag legally ambiguous platforms clearly
- FR-AGG-09: Jobs older than 7 days are archived (not shown in main feed unless searched)
- FR-AGG-10: Real-time push notifications for new high-match jobs (match score ≥ 80%)

### 4.4 AI Matching & Scoring Engine

- FR-MATCH-01: Each job is scored (0–100%) against the user's profile
- FR-MATCH-02: Matching algorithm weighs:
  - Skill overlap (required skills vs. user skills) — 40%
  - Experience level match — 20%
  - Rate compatibility (job budget vs. user minimum rate) — 15%
  - Job type preference — 10%
  - Platform preference — 5%
  - Location/timezone compatibility — 10%
- FR-MATCH-03: Scores are color-coded: 🟢 80–100%, 🟡 50–79%, 🔴 < 50%
- FR-MATCH-04: Users can adjust weight of each scoring factor in settings
- FR-MATCH-05: Match score breakdown is shown per job (tooltip/modal)
- FR-MATCH-06: AI highlights which required skills the user is missing ("You're missing: GraphQL, Docker")
- FR-MATCH-07: Jobs can be manually bookmarked regardless of score
- FR-MATCH-08: System learns from user behavior: if user frequently opens low-score jobs, it recalibrates
- FR-MATCH-09: AI explains in natural language why a job is or isn't a good fit (1–2 sentences)

### 4.5 Dashboard

- FR-DASH-01: Main feed showing matched jobs, sorted by match score (default)
- FR-DASH-02: Filter jobs by: platform, score range, rate, job type, posted date, required skills
- FR-DASH-03: Search bar with full-text and skill-based search
- FR-DASH-04: Quick stats widget:
  - Total new jobs today
  - Jobs applied to this week
  - Average match score this week
  - Top platform by job count
- FR-DASH-05: Skill gap panel: "These skills would unlock 47 more jobs" → shows top missing skills
- FR-DASH-06: Job cards show: title, platform badge, match %, rate, required skills, posted time, quick-apply button
- FR-DASH-07: Job detail page with full description, match breakdown, and action buttons (Save, Apply, Generate Proposal)
- FR-DASH-08: Dark mode support
- FR-DASH-09: Mobile-responsive design
- FR-DASH-10: Notification center (in-app) for new high-match jobs, follow-up reminders, and system alerts
- FR-DASH-11: Platform health status panel showing which scrapers are active/failing

### 4.6 AI Cover Letter & Proposal Generator

- FR-PROP-01: One-click proposal generation from any job detail page
- FR-PROP-02: Generator uses:
  - Full job description
  - User's resume, skills, and experience
  - User's past successful proposals (if uploaded)
  - Tone preference: professional, conversational, technical
- FR-PROP-03: Output is editable in a rich text editor before copying/sending
- FR-PROP-04: AI highlights which parts of the job description it addressed
- FR-PROP-05: Users can regenerate with different tone or length (short: 150w / medium: 300w / detailed: 500w)
- FR-PROP-06: Users can save proposal templates for reuse
- FR-PROP-07: "Winning Proposal Tips" shown alongside generation (based on job platform best practices)
- FR-PROP-08: Rate suggestion: AI recommends a bid amount based on job budget, user's rate, and platform norms
- FR-PROP-09: Proposal history is saved per job

### 4.7 Application Tracker (CRM-Style Follow-Up System)

- FR-TRACK-01: Kanban-style board with columns: Saved → Applied → Interview → Offer → Rejected → Withdrawn
- FR-TRACK-02: Users manually move jobs between columns (drag & drop)
- FR-TRACK-03: Each job card in tracker stores:
  - Notes (freeform)
  - Applied date
  - Last contacted date
  - Contact name/email (if available)
  - Proposed rate
  - Generated proposal used
- FR-TRACK-04: Follow-up reminders: system prompts user if no update after X days (configurable, default 5 days)
- FR-TRACK-05: Reminder channels: in-app notification, email digest, optional Slack webhook
- FR-TRACK-06: Weekly summary email: jobs applied, follow-ups due, new high-match jobs
- FR-TRACK-07: Analytics view:
  - Application success rate (offers / applied)
  - Average time from apply to response
  - Win rate by platform
  - Win rate by skill set
- FR-TRACK-08: Export tracker data to CSV / PDF
- FR-TRACK-09: Calendar view of follow-up deadlines and interview schedules

### 4.8 AI Suggestions & Insights Engine

- FR-INSIGHT-01: Weekly "Career Insights" report generated per user:
  - Hottest skills in demand this week
  - Platforms with highest job volume in user's niche
  - Budget trends (are rates going up or down?)
  - Suggested profile improvements
- FR-INSIGHT-02: Skill gap recommendations: "Freelancers with Docker earn 32% more in your niche"
- FR-INSIGHT-03: Platform-level recommendations: "85% of React jobs matching your profile are on Arc.dev this week"
- FR-INSIGHT-04: Optimal posting time: "Most jobs in your category are posted Monday–Wednesday; check then"
- FR-INSIGHT-05: AI profile audit: scores user's profile completeness and suggests improvements
- FR-INSIGHT-06: Niche detection: identifies user's most competitive niche based on skill density and market demand

### 4.9 Notifications & Alerts

- FR-NOTIF-01: In-app notification center
- FR-NOTIF-02: Email notifications (transactional via SendGrid or Resend)
- FR-NOTIF-03: Browser push notifications (opt-in)
- FR-NOTIF-04: Slack webhook integration (Pro plan)
- FR-NOTIF-05: Notification preferences configurable per type (new job match, follow-up reminder, weekly digest, system alerts)
- FR-NOTIF-06: Digest mode: batch notifications into one daily email instead of real-time

## 5. Non-Functional Requirements

### 5.1 Performance

- NFR-PERF-01: Dashboard loads in < 2 seconds (P95)
- NFR-PERF-02: Job feed refreshes within 5 minutes of a new job being posted on source platform
- NFR-PERF-03: AI proposal generation completes within 10 seconds
- NFR-PERF-04: Resume parsing completes within 15 seconds
- NFR-PERF-05: System handles 10,000 concurrent users without degradation

### 5.2 Scalability

- NFR-SCALE-01: Scraping jobs run as isolated async workers (horizontally scalable)
- NFR-SCALE-02: Job matching runs in background queues (BullMQ / Celery) — not blocking UI
- NFR-SCALE-03: Database designed for multi-tenancy (row-level user isolation)
- NFR-SCALE-04: Caching layer (Redis) for frequently accessed job feeds

### 5.3 Security

- NFR-SEC-01: All data encrypted at rest (AES-256) and in transit (TLS 1.3)
- NFR-SEC-02: API keys and secrets managed via environment variables + secrets manager (AWS Secrets Manager / Doppler)
- NFR-SEC-03: Rate limiting on all API endpoints (per user + per IP)
- NFR-SEC-04: OWASP Top 10 compliance
- NFR-SEC-05: GDPR compliance: users can export and delete all their data
- NFR-SEC-06: Audit logs for admin actions
- NFR-SEC-07: Resume data never shared across users or used for training without explicit consent

### 5.4 Reliability

- NFR-REL-01: 99.5% uptime SLA
- NFR-REL-02: Scraper failures are isolated — one platform failing doesn't affect others
- NFR-REL-03: Automated scraper health checks every 15 minutes with alerting
- NFR-REL-04: Graceful degradation: if AI service is down, core job feed still works

### 5.5 Accessibility

- NFR-A11Y-01: WCAG 2.1 AA compliance
- NFR-A11Y-02: Keyboard navigable dashboard
- NFR-A11Y-03: Screen reader compatible

## 6. Recommended Tech Stack

### Frontend

| Layer | Technology | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR, SEO, API routes in one |
| UI Library | shadcn/ui + Tailwind CSS | Beautiful, accessible components |
| State Management | Zustand | Lightweight, simple |
| Data Fetching | TanStack Query | Caching, background refetch |
| Real-time | Socket.io / Pusher | Live job feed updates |

### Backend

| Layer | Technology | Reason |
|---|---|---|
| Runtime | Node.js (Fastify) or Python (FastAPI) | High performance, async-native |
| Job Queue | BullMQ (Node) / Celery (Python) | Async scraping + AI jobs |
| ORM | Prisma (Node) / SQLAlchemy (Python) | Type-safe DB access |
| Auth | NextAuth.js / Auth.js | OAuth + session management |

### AI / ML

| Layer | Technology | Reason |
|---|---|---|
| LLM | Claude API (Anthropic) | Resume parsing, proposal gen, insights |
| Embeddings | OpenAI `text-embedding-3-small` | Semantic job-to-profile matching |
| Vector DB | Pgvector (Postgres extension) | Semantic search, no extra infra |
| Resume Parsing | Claude + PDF.js / PyMuPDF | Extract structured data from PDFs |

### Data & Infrastructure

| Layer | Technology | Reason |
|---|---|---|
| Primary DB | PostgreSQL (Supabase or RDS) | Relational + pgvector |
| Cache | Redis (Upstash) | Job feed caching, rate limiting |
| Object Storage | AWS S3 / Cloudflare R2 | Resume file storage |
| Scraping | Playwright + Cheerio | Headless browser + HTML parsing |
| Proxy Rotation | Brightdata / Oxylabs | Avoid scraping blocks |
| Email | Resend | Transactional emails |
| Monitoring | Sentry + Datadog / Grafana | Error tracking + metrics |
| Deployment | Vercel (frontend) + Railway / Fly.io (backend) | Easy, scalable deployment |

## 7. Data Models (High-Level)

### User

```text
id, email, name, avatar, plan (free/pro/agency), created_at
```

### UserProfile

```text
user_id, skills[], experience_years, min_rate, rate_type (hourly/monthly),
availability, preferred_platforms[], preferred_job_types[], resume_url
```

### Resume

```text
id, user_id, filename, parsed_skills[], parsed_experience[], parsed_education[],
raw_text, version_name, is_active, created_at
```

### Job

```text
id, platform, external_id, title, description, required_skills[],
budget_min, budget_max, rate_type, experience_level, posted_at,
expires_at, location_type, timezone_requirements, source_url, is_archived
```

### JobMatch

```text
id, user_id, job_id, match_score, skill_overlap[], missing_skills[],
match_breakdown (JSON), created_at
```

### Application

```text
id, user_id, job_id, status (saved/applied/interview/offer/rejected/withdrawn),
applied_at, proposed_rate, notes, last_followup_at, next_followup_at
```

### Proposal

```text
id, user_id, job_id, application_id, content, tone, word_count,
generated_at, is_edited, version
```

## 8. Subscription Plans

| Feature | Free | Pro ($19/mo) | Agency ($49/mo) |
|---|---|---|---|
| Platforms monitored | 3 | All (11+) | All (11+) |
| Job matches/day | 20 | Unlimited | Unlimited |
| AI proposals/month | 5 | 100 | Unlimited |
| Resume versions | 1 | 5 | Unlimited |
| Follow-up tracker | Basic (list) | Full Kanban | Full Kanban |
| Email digests | Weekly | Daily | Daily |
| Slack integration | ❌ | ✅ | ✅ |
| Team members | 1 | 1 | Up to 10 |
| Analytics | Basic | Full | Full + Team view |
| Export (CSV/PDF) | ❌ | ✅ | ✅ |

## 9. System Architecture (High-Level)

```text
┌─────────────────────────────────────────────────────┐
│                  USER BROWSER / APP                  │
│          Next.js Frontend (Vercel)                   │
└────────────────────┬────────────────────────────────┘
                     │ HTTPS / WebSocket
┌────────────────────▼────────────────────────────────┐
│              API GATEWAY / BACKEND                   │
│         Fastify / FastAPI (Railway / Fly.io)         │
│  Auth │ Job Feed │ Match API │ Proposal API │ CRM    │
└───┬───────────┬──────────────────┬───────────────────┘
    │           │                  │
    ▼           ▼                  ▼
┌───────┐  ┌────────┐       ┌──────────────┐
│  DB   │  │ Redis  │       │  Job Queue   │
│Postgres│  │ Cache  │       │  (BullMQ)    │
│+pgvec │  └────────┘       └──────┬───────┘
└───────┘                          │
                    ┌──────────────▼───────────────┐
                    │       WORKER POOL             │
                    │  ┌──────────┐ ┌──────────┐   │
                    │  │ Scraper  │ │ AI Match │   │
                    │  │ Workers  │ │ Workers  │   │
                    │  └────┬─────┘ └────┬─────┘   │
                    └───────┼────────────┼──────────┘
                            │            │
                    ┌───────▼──┐  ┌──────▼──────┐
                    │ Platform │  │ Claude API  │
                    │  Sites   │  │ OpenAI API  │
                    └──────────┘  └─────────────┘
```

## 10. Scraping Strategy

### Legal & Ethical Approach

- Use official APIs first (Upwork, Wellfound, Remote OK)
- RSS feeds where available (We Work Remotely)
- Public job listing scraping only (no auth-required pages)
- Respect `robots.txt` and crawl-delay directives
- Include `User-Agent` identifying the bot
- Store only job data, not personal recruiter data beyond what's on the public listing
- Review each platform's ToS; disable scraping for platforms that explicitly prohibit it

### Technical Approach

- Playwright for JavaScript-heavy SPAs (Contra, Arc.dev)
- Cheerio + Axios for static pages
- Rotating residential proxies (Brightdata) to avoid IP blocks
- Rate limiting: 1 request per 3–10 seconds per platform
- Exponential backoff on failures
- Fingerprint randomization (viewport, timezone, language headers)

## 11. AI Integration Details

### Resume Parsing (Claude API)

- Input: PDF/DOCX converted to text
- Prompt: Structured extraction with JSON output schema
- Output: Validated skill list, experience records, education, links

### Job Matching (Embeddings + Scoring)

- Embed job description using OpenAI text-embedding-3-small
- Embed user skill profile as text
- Cosine similarity gives semantic match score
- Combined with rule-based scoring (rate, experience level, platform) for final score

### Proposal Generation (Claude API)

- System prompt: Instructions on proposal best practices per platform
- User context: Resume summary, top skills, tone preference
- Job context: Full description + required skills
- Output: Ready-to-send proposal with highlighted key matches

### Insights Engine (Claude API)

- Batch analysis of job trends weekly per user niche
- Output: Natural language insights + structured data for charts

## 12. Milestones & Phased Delivery

### Phase 1 — MVP (Months 1–3)

- User auth + profile + resume upload + parsing
- Job aggregation from 5 platforms (Upwork, We Work Remotely, Remote OK, Wellfound, Arc.dev)
- Basic AI matching & scoring
- Simple job feed dashboard with filters
- Basic application tracker (list view)
- AI proposal generator (v1)

### Phase 2 — Growth (Months 4–6)

- Add remaining platforms (Contra, Gun.io, Braintrust, YunoJuno, Toptal, Fiverr Pro)
- Kanban follow-up tracker + reminders
- Weekly insight reports
- Email digests + Slack integration
- Pro subscription billing (Stripe)

### Phase 3 — Scale (Months 7–9)

- Agency plan + team management
- Advanced analytics
- Mobile app (React Native or PWA)
- Browser extension: detect job listings on any platform and auto-score them
- API access for power users

## 13. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Platform blocks scraping | High | High | Use proxies, rotate UA, API-first strategy, fallback to manual imports |
| Platform changes HTML structure | High | Medium | Scraper health monitoring + alerting; modular scraper design |
| AI API costs exceed revenue | Medium | High | Cache AI results; batch processing; usage caps per plan |
| GDPR / data privacy issues | Low | High | Privacy-by-design; data minimization; user data export/delete |
| AI generates low-quality proposals | Medium | Medium | Prompt engineering; user feedback loop; human-in-the-loop editing |
| Low user retention | Medium | High | Follow-up nudges, weekly insights, gamification (streaks, win rate) |

## 14. Success Metrics

| Metric | Target (6 months) |
|---|---|
| Registered users | 5,000 |
| Paid (Pro+) users | 500 |
| Daily active users | 1,500 |
| Jobs aggregated / day | 10,000+ |
| Average match score satisfaction | ≥ 4.2 / 5 |
| Proposals generated / month | 20,000 |
| Reported job wins attributed | 200+ |
| Scraper uptime | ≥ 98% |

## 15. Out of Scope (v1)

- Applying to jobs automatically on behalf of users (auto-apply)
- Negotiation assistance or AI chatbot for client conversations
- Payment processing between freelancers and clients
- Video interview prep
- Freelancer community / forum features

## 16. Glossary

| Term | Definition |
|---|---|
| Match Score | AI-generated percentage indicating how well a job fits a user's profile |
| Proposal | Cover letter or pitch written to a potential client for a job |
| Aggregation | Process of fetching and combining job listings from multiple platforms |
| Scraping | Automated extraction of data from websites via HTTP requests or headless browsers |
| Skill Gap | Skills required by jobs but not present in user's profile |
| Follow-up | A reminder or action to check on the status of a submitted application |
| Digest | Batched summary notification sent at a scheduled time |

---

*FreelanceRadar — Find smarter, apply faster, win more.*
