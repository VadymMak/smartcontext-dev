---
title: "How I Built a Barbershop Website With AI Booking and 96 Mobile Lighthouse Score in 2026?"
description: "Full technical breakdown: Next.js 15, Prisma, AI assistant with RAG, slot-based booking, Sharp WebP pipeline. 3 weeks build, 96 mobile Lighthouse, zero plugins."
datePublished: "2026-06-23"
author: "Vadym Mak"
coverImage: "/blog/kate-barber-nextjs-ai-2026/cover.jpg"
coverOg: "/blog/kate-barber-nextjs-ai-2026/cover.jpg"
coverAlt: "Three mobile screenshots of Kate Barber barbershop website showing hero section, services with prices, and AI-assisted booking slot grid"
tags: ["Web Development", "Next.js", "AI Integration", "Case Study"]
locale: "en"
slug: "kate-barber-nextjs-ai-2026"
readingTime: 8
---

Most barbershop websites are 2019 WordPress themes with broken booking forms, 2MB JPEGs, and Mobile Lighthouse scores in the 40s — so I built Kate Barber as a production template that solves all three at once.

---

### Quick Answer: Kate Barber Tech Stack in 2026

Framework: Next.js 15 App Router with TypeScript and BEM CSS — no Tailwind, no plugins.
Database: Prisma v7 plus Neon PostgreSQL with pgvector for AI knowledge embeddings.
Performance: 96 Mobile Lighthouse, 100 Desktop, LCP 1.1s, CLS 0.00.
Build timeline: 3 weeks from zero to deployed admin panel with AI assistant.

---

## What is the Kate Barber template and what does it solve?

Kate Barber is a production-ready barbershop website template built on Next.js 15 with a full admin panel, AI booking assistant, and slot-based reservation system. It solves the three structural problems that plague service business websites in 2026: poor mobile performance, plugin-based booking that breaks, and admin systems that require a developer to update working hours.

The first deployment scored 96 on Mobile Lighthouse and 100 on Desktop in production — not localhost. A comparable WordPress setup with the Amelia booking plugin, WPML multilingual, and a premium theme typically scores 45-65 on the same audit. The architectural gap is not cosmetic.

| Platform              | Mobile Lighthouse | Booking cost         | Owner can edit  |
| --------------------- | ----------------- | -------------------- | --------------- |
| WordPress + plugins   | 35–55             | $80–200/year         | Sort of         |
| Squarespace / Wix     | 45–65             | Built-in (limited)   | Yes             |
| Kate Barber (Next.js) | 92–99             | Custom, no recurring | Yes, full admin |

## Why is WordPress wrong for a barbershop website in 2026?

WordPress is the default recommendation for small business sites, and for barbershops it is almost always the wrong choice. The reasons are architectural. A typical WordPress barbershop site stacks WooCommerce or Bookly for booking, a gallery plugin, a contact form plugin, a caching plugin, and a page builder. Each plugin adds database queries, client-side JavaScript on every page, and a maintenance surface.

The result is a site that scores 35-55 on Mobile Lighthouse before any custom design is added. Performance penalties compound — for context on how this affects business outcomes, [see the 5 signs your website needs a redesign](/blog/5-signs-website-needs-redesign-2026). The plugin model also means a 3-year-old WordPress site has 4-6 outdated dependencies, each a potential security issue.

Kate Barber has zero plugins. Every feature — booking, gallery, AI assistant, admin — ships as part of the codebase. There are no recurring license fees, no plugin compatibility breaks on WordPress core updates, and no separate caching layer to misconfigure.

## What is the full technology stack?

The stack was chosen for measurable performance outcomes, not for hype. Every layer is the cheapest tool that hits the performance target. Total monthly cost for a single barbershop deployment is about $25 ($20 Vercel Pro + $5 for AI usage at typical volume).

| Layer            | Technology                    | Why this choice                                           |
| ---------------- | ----------------------------- | --------------------------------------------------------- |
| Framework        | Next.js 15 App Router         | Server Components eliminate client-side hydration penalty |
| Language         | TypeScript strict             | Catches booking conflict bugs at compile time             |
| Styling          | BEM CSS + custom properties   | Smaller bundle than Tailwind, explicit design tokens      |
| Database         | Prisma v7 + Neon PostgreSQL   | Serverless autoscaling, 200ms cold start                  |
| Vector DB        | pgvector extension            | Same database as relational data, no separate service     |
| Image processing | Sharp via API routes          | Server-side WebP conversion, blur placeholders            |
| Storage          | Vercel Blob                   | Integrated with deployment, fast CDN                      |
| AI routing       | GPT-4o-mini                   | $0.15/1M input tokens — admin sessions under $0.01        |
| Embeddings       | OpenAI text-embedding-3-small | $0.0001 per query, 1536 dimensions                        |
| Notifications    | WhatsApp via wa.me links      | No SaaS subscription required                             |

## Why was Next.js 15 chosen over a static site generator?

Server Components in Next.js 15 changed how data fetching works for service business sites. The booking page, gallery, testimonials, and working hours all render as React Server Components — they read from Prisma directly with zero client-side fetch and zero hydration penalty. The result is LCP under 1.2 seconds on mobile even before edge caching kicks in.

App Router enables per-route revalidation. When the admin updates Saturday hours from 10:00-18:00 to 10:00-14:00, `revalidatePath('/contact')` fires immediately and the public page reflects the change within seconds. A static site generator would require a full rebuild, and WordPress would wait for the next cron cycle to clear caches.

| Approach                           | Update propagation               | Build complexity | Cold start |
| ---------------------------------- | -------------------------------- | ---------------- | ---------- |
| Static (Astro, 11ty)               | Requires rebuild, 30-60s         | Simple           | Instant    |
| WordPress                          | Cron cycle or manual cache clear | High (plugins)   | 2-5s       |
| Next.js 15 ISR + Server Components | Seconds via revalidatePath       | Medium           | 200ms      |

## How does the AI booking assistant work under the hood?

The AI assistant uses a two-pass architecture with OpenAI function calling. This pattern — small fast model for routing, RAG for grounded answers — is the same approach behind the [custom AI Content Studio I built for FormaInk](/blog/how-i-built-ai-content-studio-2026), adapted for booking and admin tasks instead of content generation.

**Pass 1 (intent classification).** The user message goes to GPT-4o-mini with a system prompt describing the store and 7 available tools: `update_working_hours`, `update_store_info`, `get_pending_reviews`, `reply_to_review`, `improve_text`, `get_new_reviews`, `get_available_slots`. GPT-4o-mini decides which tool to call. At $0.15 per million input tokens, a typical admin session costs under one cent.

**Pass 2 (RAG context injection).** Before the model sees the user query, the system embeds the query with text-embedding-3-small and runs cosine similarity against the KnowledgeEntry table (pgvector). The top 3 chunks are injected into the system prompt. This lets the assistant answer "what is your cancellation policy?" or "do you do beard trims?" without hardcoded responses.

| Stage              | Operation                         | Cost      | Latency   |
| ------------------ | --------------------------------- | --------- | --------- |
| Embed query        | text-embedding-3-small            | $0.0001   | 80-120ms  |
| Vector search      | pgvector cosine similarity        | Free (DB) | 20-40ms   |
| Tool routing       | GPT-4o-mini with function calling | $0.001    | 400-800ms |
| Tool execution     | Prisma write or read              | Free (DB) | 30-100ms  |
| Response synthesis | GPT-4o-mini second call           | $0.001    | 400-800ms |

## How does the slot-based booking system prevent double bookings?

The appointment model is slot-based with database-level conflict detection. Each master has predefined working hours and 30-minute slots. When a client opens the booking section, the frontend fetches `/api/appointments?mode=slots&date=2026-06-25&masterId=...` which returns the full slot grid with booked slots marked unavailable.

On submission, the API performs a check-then-write inside a single Prisma query before creating the appointment. If a conflict exists (any non-cancelled appointment for the same master, date, and time), the API returns HTTP 409 Conflict. Double-booking at the database level is impossible. The admin receives a WhatsApp notification via wa.me link for each new booking, and the appointments page shows status chips: Pending, Confirmed, Completed, Cancelled.

## How does the image pipeline achieve 96 mobile Lighthouse?

Every image upload — gallery photos, master portraits, hero image, logo — passes through a server-side Sharp pipeline before reaching storage. The flow is: FormData upload to API route, Sharp resize to per-image dimensions, WebP conversion at quality 80, Vercel Blob storage, URL saved to Prisma.

A 4MB iPhone photo of a haircut becomes a 180-240KB WebP that loads in under 300ms on mobile. The gallery uses blur placeholders (`blurDataURL` precomputed by Sharp during upload) so the layout is stable before images load — Cumulative Layout Shift stays at 0.00. This same WebP pipeline is part of the broader performance approach covered in [how to build a fast Next.js website](/blog/how-to-build-fast-nextjs-website-2026).

| Image type      | Source size | Output                   | Output size |
| --------------- | ----------- | ------------------------ | ----------- |
| Hero            | 4-8MB JPG   | 1920×1080 WebP q80       | 280-340KB   |
| Gallery         | 3-6MB JPG   | 1200×900 WebP q80        | 180-240KB   |
| Master portrait | 2-4MB JPG   | 400×400 WebP q80         | 40-60KB     |
| Logo            | 200KB PNG   | 400×120 WebP transparent | 8-12KB      |

## What does the admin panel include?

The admin panel is a Next.js route group at `/admin` with server-side session checking. It covers everything a non-technical barbershop owner needs without ever touching code, including AI-controlled natural language updates for any of the 7 sections below.

| Section       | What the owner controls                               |
| ------------- | ----------------------------------------------------- |
| Store info    | Name, phone, address, description                     |
| Gallery       | Upload photos, reorder, delete — auto-WebP conversion |
| Masters       | Add and edit masters with photo upload                |
| Working hours | Per-day open/close toggle plus time picker            |
| Logo          | Upload, preview, auto-resized transparent WebP        |
| Bookings      | View appointments, confirm, complete, cancel          |
| Testimonials  | Approve or reject, add admin reply                    |
| AI Assistant  | Natural language control of all the above             |

There is no "publish" step. When the admin changes Saturday hours, `revalidatePath('/contact')` fires and the public site updates within seconds. There is no cache to clear manually, no support ticket to send, and no developer needed.

## What are the actual production Lighthouse scores?

These scores are from the deployed production build with real images and content, not a localhost demo with placeholder data.

| Category       | Mobile | Desktop |
| -------------- | ------ | ------- |
| Performance    | 96     | 100     |
| Accessibility  | 100    | 100     |
| Best Practices | 100    | 100     |
| SEO            | 100    | 100     |

Key mobile metrics: LCP 1.1 seconds, FID 0ms (Server Components mean minimal client JS), CLS 0.00 (blur placeholders eliminate shift), TBT 12ms. The scores are achievable specifically because there are no third-party plugins — every byte of JavaScript on the page is intentional.

## How long does a build like this take and what does it cost?

The full system — admin panel, booking, AI assistant, gallery, testimonials, multilingual support, working hours — took 3 weeks from first commit to deployed admin. A landing-only version takes 5-7 days. For full pricing context across project types, [see how much a Next.js website costs in 2026](/blog/how-much-does-nextjs-website-cost-2026).

| Scope                  | Timeline   | What's included                                    |
| ---------------------- | ---------- | -------------------------------------------------- |
| Landing only           | 5–7 days   | Hero, services, gallery, contact, Lighthouse 95+   |
| Landing + booking      | 10–14 days | Plus slot system, master selector, WhatsApp notify |
| Full template          | 3 weeks    | Plus admin, AI assistant, RAG, testimonials        |
| Custom domain + deploy | +1 day     | DNS, Vercel, SSL, final Lighthouse audit           |

A comparable WordPress setup with Amelia, WPML, WPRocket, and a premium theme costs $600-900 per year in plugin licenses, takes 4-6 weeks to configure correctly, and still scores 45-65 on Mobile Lighthouse. Kate Barber has no recurring plugin costs and scores 96 on mobile.

## Is this reusable for other service businesses?

Yes. The codebase uses a `STORE_SLUG` environment variable to switch between stores. Adding a new barbershop means running a seed script with that store's data and setting a Vercel environment variable. The admin panel, booking system, AI assistant, and gallery are all included by default. Feature flags via `NEXT_PUBLIC_ENABLE_*` env vars toggle individual features — a salon that doesn't need booking can disable it without modifying code.

The template handles barbershops, nail salons, beauty studios, dental clinics, and any service business where appointments are the primary transaction. Multilingual support via next-intl is included from day one (Slovak, English, Ukrainian, Czech, German).

If your current barbershop or salon site scores below 70 on Mobile Lighthouse — or has no online booking at all — the gap is architectural, not cosmetic. A theme update will not fix it. [See the services template details](/services) or [book a free 30-minute audit](/contact) and I will send you a written performance report with concrete recommendations within 48 hours.
