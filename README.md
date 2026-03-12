# Next.js Studio Boilerplate

> Fast, multilingual websites for studios and B2B. Built with Next.js 15, TypeScript, CSS Modules.

**Live references:** [formaink.com](https://formaink.com) · [akillustrator.com](https://akillustrator.com) · [ub-market.com](https://ub-market.com)

---

## Stack

| Tool        | Version | Purpose                                 |
| ----------- | ------- | --------------------------------------- |
| Next.js     | 15+     | Framework (App Router)                  |
| TypeScript  | 5+      | Type safety                             |
| CSS Modules | —       | Styling — NO Tailwind, NO Framer Motion |
| next-intl   | 4+      | i18n routing + translations             |
| next-themes | latest  | Hydration-safe theme management         |
| pnpm        | 9+      | Package manager                         |
| Vercel      | —       | Deployment target                       |
| Resend      | 4+      | Email delivery                          |
| gray-matter | 4+      | Blog Markdown frontmatter               |
| openai      | 4+      | AI Chat + RAG embeddings                |

---

## Getting Started

```bash
# 1. Use this template on GitHub
# GitHub → nextjs-studio-template → "Use this template" → "Create a new repository"
# This creates a clean repo with all files but NO commit history (not a fork)
# Each new client project gets its own independent repository

# 2. Clone your new repo
git clone https://github.com/YOUR_USERNAME/your-project.git
cd your-project

# 3. Install dependencies
pnpm install

# 4. Set up environment variables
cp .env.example .env.local
# Fill in .env.local with your values

# 5. Start development
pnpm dev
```

---

## Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # ESLint check
pnpm embeddings   # Generate RAG embeddings (run after content changes)
```

> ⚠️ `pnpm embeddings` requires `OPENAI_API_KEY` in `.env.local`.
> Regenerate after: new blog posts, pricing changes, content updates.

---

## Project Structure

```
src/
├── styles/           # CSS tokens, themes, animations
├── app/
│   ├── layout.tsx    # Root layout — fonts + metadataBase
│   ├── robots.ts
│   ├── sitemap.ts
│   └── [locale]/     # i18n pages
│       ├── layout.tsx
│       ├── page.tsx
│       ├── services/[service]/
│       ├── blog/
│       └── contact/
├── components/
│   ├── Providers.tsx
│   ├── layout/       # Header, Footer, MobileMenu, LanguageSwitcher
│   ├── ui/           # ThemeToggle, FAQ, ContactForm, CookieBanner...
│   └── home/         # Hero, ServicesPreview, FeaturedProjects, LatestPosts
├── i18n/             # routing, navigation, request
├── messages/         # en.json, sk.json
├── lib/              # blog.ts, extractFAQs.ts, rag.ts, spamFilter.ts
└── data/             # serviceFaqs.ts
content/
└── blog/
    ├── en/           # English blog posts (.md)
    └── sk/           # Slovak blog posts (.md)
```

---

## Features

### Enabled by Default

- ✅ Multilingual (EN + SK) via next-intl
- ✅ Light / Dark theme via next-themes
- ✅ Email notifications via Resend
- ✅ Cookie Banner (GDPR)
- ✅ Blog with Markdown + frontmatter
- ✅ FAQ with FAQPage JSON-LD
- ✅ Contact form with honeypot + rate limit
- ✅ 3-layer spam protection (honeypot + reCAPTCHA v3 + scoring)
- ✅ robots.ts + sitemap.ts with hreflang
- ✅ WebSite + Person JSON-LD (E-E-A-T)
- ✅ CSS-only animations (NO Framer Motion)

### Optional (configure in .env.local)

- 🔧 AI Chat Widget (`NEXT_PUBLIC_ENABLE_AI_CHAT=y`)
- 🔧 AI Chat + RAG backend (`OPENAI_API_KEY=...`)
- 🔧 reCAPTCHA v3 (`RECAPTCHA_SECRET_KEY=...`)
- 🔧 Telegram notifications (`TELEGRAM_BOT_TOKEN=...`)
- 🔧 WhatsApp button (`NEXT_PUBLIC_WHATSAPP_NUMBER=...`)
- 🔧 Gallery + Lightbox (`NEXT_PUBLIC_ENABLE_GALLERY=y`)
- 🔧 Protected Images (`NEXT_PUBLIC_ENABLE_PROTECTED_IMAGE=y`)
- 🔧 Announcement Bar (`NEXT_PUBLIC_ENABLE_ANNOUNCEMENT_BAR=y`)

---

## Environment Variables

```bash
# Site
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=Studio
NEXT_PUBLIC_AUTHOR_NAME=Your Name

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx
FROM_EMAIL=noreply@yourdomain.com
OWNER_EMAIL=you@yourdomain.com

# Telegram (optional)
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

# AI Chat + RAG (optional)
OPENAI_API_KEY=
NEXT_PUBLIC_ENABLE_AI_CHAT=y

# reCAPTCHA v3 (optional — Layer 2 spam protection)
# Get keys: https://www.google.com/recaptcha/admin → Score based (v3)
RECAPTCHA_SECRET_KEY=
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=

# WhatsApp (optional)
NEXT_PUBLIC_WHATSAPP_NUMBER=   # format: 421900000000 (no +)
```

---

## Spam Protection

3 independent layers in `src/lib/spamFilter.ts`. Used by `/api/chat` and `/api/contact`.

| Layer            | Method                                                       | Cost |
| ---------------- | ------------------------------------------------------------ | ---- |
| 1 — Honeypot     | Hidden field — bots fill it, humans never see it             | Free |
| 2 — reCAPTCHA v3 | Silent trust score 0.0–1.0, blocks below 0.5                 | Free |
| 3 — Spam scoring | Gibberish detection + fake name + disposable email blacklist | Free |

**Result: spam rate 0%, real users never notice anything.**

Layer 2 is optional — skipped automatically if `RECAPTCHA_SECRET_KEY` is not set.
Layers 1 and 3 work out of the box with no configuration.

---

## AI Chat + RAG

All files are included in the repo by default. The feature activates only when `OPENAI_API_KEY` is set.

```
data/
├── chunks.ts                        # Your site content as text chunks — edit this
└── scripts/
    └── generate-embeddings.ts       # Run once to generate embeddings

src/
├── app/api/chat/route.ts            # Chat API endpoint + 3-layer spam protection
├── lib/rag.ts                       # Cosine similarity search
└── lib/spamFilter.ts                # Honeypot + reCAPTCHA + scoring
```

**Setup:**

1. Fill in `data/chunks.ts` with your real content (services, pricing, process)
2. Add `OPENAI_API_KEY` to `.env.local`
3. Run `pnpm embeddings` to generate `data/embeddings.json`
4. Add `data/embeddings.json` to `.gitignore` (can exceed 1MB)

---

## Removing Optional Features

When starting a new project, delete what you don't need **before writing any code**.

### AnnouncementBar

```bash
rm -rf src/components/ui/AnnouncementBar
# Remove from src/components/ui/index.ts:
# export { AnnouncementBar } from './AnnouncementBar/AnnouncementBar'
# Remove from [locale]/layout.tsx: <AnnouncementBar />
```

### WhatsApp Button

```bash
rm -rf src/components/ui/WhatsAppButton
# Remove from src/components/ui/index.ts:
# export { WhatsAppButton } from './WhatsAppButton/WhatsAppButton'
# Remove from [locale]/layout.tsx: <WhatsAppButton />
# Remove from .env.local: NEXT_PUBLIC_WHATSAPP_NUMBER
```

### Protected Image

```bash
rm -rf src/components/ui/ProtectedImage
# Remove from src/components/ui/index.ts:
# export { ProtectedImage } from './ProtectedImage/ProtectedImage'
```

### Gallery + Lightbox

```bash
rm -rf src/components/ui/Gallery
# Remove from src/components/ui/index.ts:
# export { Gallery } from './Gallery/Gallery'
```

### AI Chat Widget

```bash
rm -rf src/components/ui/ChatWidget
# Remove from src/components/ui/index.ts:
# export { ChatWidget } from './ChatWidget/ChatWidget'
# Remove from [locale]/layout.tsx: <ChatWidget />
```

### AI Chat + RAG

```bash
rm -rf src/app/api/chat
rm -rf src/lib/rag.ts
rm -rf src/lib/spamFilter.ts
rm -rf data/chunks.ts data/scripts data/embeddings.json
# Remove from package.json scripts: "embeddings": "..."
# Remove from .env.local: OPENAI_API_KEY, RECAPTCHA_SECRET_KEY, NEXT_PUBLIC_RECAPTCHA_SITE_KEY
```

### Telegram Notifications

```bash
# Remove from src/app/api/contact/route.ts: sendTelegram() call
# Remove from .env.local: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
```

### Cookie Banner + GA4

```bash
rm -rf src/components/ui/CookieBanner
rm -rf src/components/ui/GoogleAnalytics
# Remove from src/components/ui/index.ts both exports
# Remove from [locale]/layout.tsx: <CookieBanner /> <GoogleAnalytics />
# Remove from .env.local: NEXT_PUBLIC_GA_ID
```

> ⚠️ Always remove the export from `ui/index.ts` alongside the folder —
> otherwise TypeScript will throw a module not found error.

---

## Locales

1. Add locale to `src/i18n/routing.ts`
2. Copy `src/messages/_template.json` → `src/messages/[locale].json`
3. Fill in translations
4. Add blog posts to `content/blog/[locale]/`

---

## Lighthouse Targets

| Metric         | Target |
| -------------- | ------ |
| Performance    | ≥ 85   |
| SEO            | 100    |
| Accessibility  | ≥ 90   |
| Best Practices | 100    |

---

## Critical Rules

- **NO Framer Motion** — all animations use pure CSS `@keyframes`
- **NO Tailwind** — CSS Modules only
- **NO icon libraries** — inline SVG only
- **Barrel exports** via `index.ts` are required in all component folders
- **`useSyncExternalStore`** for ThemeToggle — not `useState + useEffect`
- **`trailingSlash: false`** — prevents GSC double-redirect errors
- **OG images: JPG 1200×630px** — Facebook rejects WebP
- **`dev` script without `--turbopack`** — react-markdown v10 bug

---

## Post-Launch Checklist

- [ ] GSC → Add property → Submit sitemap.xml
- [ ] Rich Results Test → FAQPage on home + service pages
- [ ] Facebook Debugger → OG image (must be JPG)
- [ ] Cookie Decline → GA4 does NOT load (DevTools Network)
- [ ] Contact form → email + Telegram notification arrive
- [ ] Lighthouse mobile → all targets met
- [ ] hreflang tags in page source for each locale

---

_Next.js Studio Boilerplate · March 2026 · SmartContext.dev_
