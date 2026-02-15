export interface BlogPostData {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  category: BlogCategory;
  coverImage?: string;
  published: boolean;
  content: string; // Will be replaced by MDX later
}

export type BlogCategory = "web-dev" | "ai-llm" | "career" | "seo";

export const BLOG_CATEGORIES: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "web-dev", label: "Web Dev" },
  { value: "ai-llm", label: "AI & LLM" },
  { value: "career", label: "Career" },
  { value: "seo", label: "SEO" },
];

export const BLOG_POSTS: BlogPostData[] = [
  {
    slug: "how-i-built-smartcontext-dev",
    title: "How I Built SmartContext.dev: Technical Deep Dive",
    description:
      "A complete walkthrough of building a developer portfolio with Next.js 16, CSS Modules, AI chat assistant, and achieving perfect Lighthouse scores.",
    date: "2026-02-15",
    readingTime: "12 min",
    tags: ["Next.js", "TypeScript", "CSS Modules", "Vercel"],
    category: "web-dev",
    published: true,
    content: `
## Why Build a Custom Portfolio?

When I decided to create SmartContext.dev, I had a clear goal: build a portfolio that would serve as both a showcase of my technical skills and a client acquisition tool. Template-based portfolios are fine for starting out, but they don't demonstrate the depth of knowledge that serious clients are looking for.

The site needed to check several boxes: perfect Lighthouse scores, dark/light mode, a blog system for SEO content, multilingual support, and — the key differentiator — an AI chat assistant that could answer visitor questions about my services.

## The Tech Stack

After evaluating options, I settled on this stack:

- **Next.js 16** with App Router — server components by default, excellent SEO
- **TypeScript** — type safety across the entire codebase
- **CSS Modules** — scoped styles without the overhead of CSS-in-JS
- **Framer Motion** — smooth animations that feel native
- **Vercel** — zero-config deployment with edge delivery

### Why Not Tailwind?

This is a question I get often. Tailwind is great for rapid prototyping, but for a portfolio where every design detail matters, CSS Modules give me complete control without utility class clutter in JSX. The bundle is also smaller since I only ship the CSS I actually write.

## Design System Approach

I built the design system from scratch using CSS custom properties. This makes dark/light mode switching trivial — just swap variable values on the root element.

The color palette uses "Smart Blue" (#3b82f6) as the accent color, chosen for its association with technology and trust. All colors are defined once and referenced throughout the app.

Typography pairs Inter (body text) with JetBrains Mono (code elements). Both support Cyrillic characters, which is essential for the Russian language version.

## Performance Optimization

Achieving a 95+ Lighthouse performance score required attention to several areas:

**Image optimization** — All images use next/image with WebP format, responsive sizes, and lazy loading for below-fold content.

**Minimal JavaScript** — Server Components by default means most of the page ships zero client-side JS. Only interactive elements like the theme toggle and mobile menu are Client Components.

**Font loading** — Both fonts use next/font with display: swap, eliminating layout shift during font loading.

**Bundle analysis** — Regular audits with @next/bundle-analyzer ensure no unnecessary packages inflate the bundle.

## The AI Chat Assistant

The most technically interesting feature is the AI chat assistant. It uses a RAG (Retrieval-Augmented Generation) architecture:

1. Site content is chunked into ~300-500 token segments
2. Each chunk is embedded using OpenAI's text-embedding-3-small model
3. Embeddings are stored in a JSON file (no external database needed)
4. When a visitor asks a question, their query is embedded and compared against stored embeddings using cosine similarity
5. The top 5 most relevant chunks are sent as context to gpt-4o-mini
6. The response is streamed back in real-time

This approach costs approximately $1-2/month for a portfolio-level traffic, making it extremely cost-effective compared to database-backed solutions.

## SEO Implementation

Every page includes comprehensive SEO optimization:

- Dynamic metadata generation with generateMetadata
- Structured data (JSON-LD) on all pages
- Auto-generated sitemap.xml
- Proper heading hierarchy and semantic HTML
- Hreflang tags for multilingual support
- OpenGraph and Twitter Card tags

## Lessons Learned

1. **Start with the design system** — Having colors, spacing, and typography defined upfront saved hours of decision-making during development.

2. **Server Components are powerful** — Most of SmartContext.dev is server-rendered, which dramatically improves performance and SEO.

3. **JSON-based RAG is underrated** — For small datasets (under 200 chunks), you don't need a vector database. A JSON file with cosine similarity works perfectly.

4. **Dark mode should be default** — For a developer portfolio, dark mode feels native. 45% of SaaS products launch dark-first in 2026.

## What's Next

The site will continue to evolve. Planned additions include more blog posts for SEO traffic, interactive code demos embedded in articles, and potentially upgrading the AI assistant to support voice input.

If you're interested in the technical details of any specific feature, feel free to ask the AI chat assistant — it knows everything about how this site was built.
    `,
  },
  {
    slug: "how-much-does-a-website-cost-2026",
    title: "How Much Does a Website Cost in 2026?",
    description:
      "A complete breakdown of website pricing for business owners. What to expect at every budget level, from landing pages to full web applications.",
    date: "2026-02-14",
    readingTime: "8 min",
    tags: ["Business", "Pricing", "Web Development"],
    category: "seo",
    published: true,
    content: `
## The Short Answer

A professional website in 2026 costs between **$1,500 and $10,000+** depending on complexity. But that range is meaningless without context. Let me break it down by what you actually get at each price point.

## What Affects the Price?

Before looking at numbers, understand the factors that move the needle:

**Number of pages** — A 3-page landing site takes 1-2 weeks. An 8-page corporate site with a blog takes 3-4 weeks. More pages = more time = higher cost.

**Design complexity** — A clean, minimal design using established patterns costs less than a fully custom design with unique animations, illustrations, and interactive elements.

**Functionality** — A static informational site is simpler than one with a contact form, blog, e-commerce, user accounts, or AI features.

**Content** — Do you have all your text and images ready? If the developer needs to write content or source photography, that adds cost.

**SEO requirements** — Basic SEO (meta tags, sitemap) should be included in any professional site. Advanced SEO (structured data, content strategy, performance optimization) takes additional time.

**Multilingual support** — Supporting multiple languages roughly doubles the content work and adds technical complexity.

## Price Ranges Explained

### $500 — $1,500: Template-Based Sites

At this level, you're getting a WordPress theme or Wix/Squarespace site with your content plugged in. It works for a basic online presence, but has limitations:

- Limited customization options
- Often slow loading speeds
- Generic design (looks like thousands of other sites)
- Limited SEO optimization
- May require monthly subscription fees

**Best for:** Very small businesses or individuals who just need to exist online.

### $1,500 — $3,000: Custom Landing Pages

This is the sweet spot for businesses that need a strong first impression:

- Custom design (not a template)
- 1-3 pages
- Responsive (works on mobile)
- Basic SEO optimization
- Contact form
- Google Analytics setup

**Best for:** Service businesses, freelancers, startups launching an MVP.

### $3,000 — $5,000: Professional Business Sites

This is where most growing businesses should be looking:

- Custom design and development
- 5-8 pages
- Blog system for content marketing
- Advanced SEO (structured data, optimized performance)
- Animations and micro-interactions
- Multilingual support (if needed)
- Mobile-first approach

**Best for:** Established businesses wanting to attract clients online, companies with growth ambitions.

### $5,000 — $10,000: Full-Featured Web Applications

At this level, you're getting sophisticated functionality:

- Everything in the previous tier
- AI features (chatbots, smart search)
- Content management system
- Content strategy and first blog posts
- Advanced analytics
- Performance optimization (Lighthouse 95+)
- Ongoing support plan

**Best for:** Businesses wanting a competitive edge, companies ready to invest in their online presence.

### $10,000+: Enterprise & Complex Applications

Custom web applications with complex business logic, integrations, user authentication, payment processing, and team features.

**Best for:** SaaS products, large organizations, complex e-commerce.

## The Hidden Costs

Budget for these often-overlooked expenses:

- **Domain name:** $10-15/year
- **Hosting:** $0-20/month (Vercel hobby tier is free)
- **Email service:** $0-10/month
- **SSL certificate:** Free (included with modern hosting)
- **Ongoing maintenance:** $200-500/month
- **Content updates:** Your time or $50-100/hour

## How to Choose the Right Developer

1. **Look at their portfolio** — Have they built sites similar to what you need?
2. **Check Lighthouse scores** — Ask for real performance numbers, not promises
3. **Ask about their stack** — Modern frameworks (Next.js, React) vs. outdated tools
4. **Understand the timeline** — Quality takes 3-6 weeks, not 3 days
5. **Discuss ongoing support** — What happens after launch?

## My Recommendation

For most businesses, the **$3,000-$5,000 range** offers the best value. You get a custom, professional site with real SEO that will actually attract clients. Going cheaper often means redoing everything in 1-2 years.

If you're ready to invest in your online presence, I offer packages at every level — from landing pages to full AI-integrated web applications.
    `,
  },
  {
    slug: "building-multi-ai-assistant",
    title: "Building a Multi-AI Assistant: Lessons Learned",
    description:
      "Architecture decisions, LLM integration patterns, and real challenges from building a multi-provider AI chat application.",
    date: "2026-02-10",
    readingTime: "10 min",
    tags: ["AI", "Python", "Architecture", "OpenAI"],
    category: "ai-llm",
    published: true,
    content: `
## The Problem

I wanted a single chat interface that could work with multiple AI providers — OpenAI, Anthropic, and potentially others — while maintaining conversation context and streaming responses in real-time. The existing solutions were either locked to one provider or lacked the features I needed.

## Architecture Decisions

### Provider Abstraction Layer

The most important architectural decision was creating a provider abstraction layer. Instead of calling OpenAI or Anthropic APIs directly, all LLM interactions go through a unified interface:

Each provider implements the same interface, which means adding a new provider (like Google Gemini or Mistral) requires writing just one adapter class. The rest of the application doesn't need to change.

### Streaming Architecture

Real-time token streaming was essential for a good user experience. I used Server-Sent Events (SSE) rather than WebSockets because:

1. SSE is simpler — unidirectional data flow is all we need
2. Built-in reconnection — the browser handles dropped connections
3. HTTP/2 compatible — no additional protocol overhead
4. Easier to deploy — works with standard HTTP infrastructure

The backend streams tokens as they arrive from the LLM provider, and the frontend renders them incrementally. The result is a sub-200ms time to first token.

### Conversation Storage

For storing conversation history, I chose PostgreSQL with the pgvector extension:

- Conversations are stored as structured records (user, assistant, metadata)
- Message embeddings enable semantic search across past conversations
- pgvector provides efficient similarity search without a separate vector database

### Context Management

LLMs have finite context windows. My context manager handles:

- Token counting per message using tiktoken
- Automatic conversation truncation when approaching the limit
- Summary generation for long conversations
- Priority-based context selection (recent messages weighted higher)

## Key Challenges

### 1. Provider Response Differences

Each LLM provider formats responses differently. OpenAI uses delta objects for streaming, Anthropic uses content blocks. The abstraction layer normalizes these into a consistent stream format.

### 2. Error Handling Across Providers

Provider APIs fail in different ways — rate limits, content filters, network timeouts. Building robust error handling that gracefully falls back or retries required careful thought about failure modes.

### 3. Cost Management

Without controls, LLM API costs can spiral. I implemented:

- Per-conversation token budgets
- Rate limiting per user (10 messages/minute)
- Cost tracking with real-time dashboard
- Automatic model downgrade when budget is low (GPT-4 → GPT-3.5)

### 4. Streaming State Management

Managing UI state during streaming is tricky. The message is being built token-by-token while the user might want to scroll, switch conversations, or cancel the generation. React state updates need to be batched carefully to avoid performance issues.

## Lessons Learned

**Start with the abstraction** — Even if you only support one provider initially, building the abstraction layer from day one saves massive refactoring later.

**Stream everything** — Users perceive streamed responses as faster, even when total generation time is the same. Always stream.

**Token counting matters** — Accurate token counting prevents context overflow errors and helps with cost management. Use tiktoken, not character-based estimates.

**Test with real conversations** — Unit tests for LLM applications are necessary but insufficient. You need to test with realistic multi-turn conversations to catch context management bugs.

**Monitor costs from day one** — Add cost tracking before you launch, not after you get a surprising bill.

## Tech Stack Summary

- **Frontend:** React with TypeScript
- **Backend:** Python + FastAPI
- **Database:** PostgreSQL + pgvector (on Railway)
- **LLM Providers:** OpenAI (GPT-4, GPT-3.5), Anthropic (Claude)
- **Streaming:** Server-Sent Events
- **Deployment:** Railway (backend), Vercel (frontend)

## What I'd Do Differently

If starting over, I would use LangChain for the provider abstraction layer instead of building custom. When I started the project, LangChain was less mature, but in 2026 it handles multi-provider orchestration well.

I would also implement conversation branching — the ability to go back to a previous message and explore a different direction. This is technically complex but extremely useful for creative and research workflows.

## Conclusion

Building a multi-AI assistant taught me more about LLM application architecture than any course or tutorial. The challenges are not in calling APIs — they're in managing state, handling failures gracefully, and keeping costs under control at scale.

If you're building something similar, start simple, add providers incrementally, and always think about the user experience first. The streaming implementation alone will make your app feel 10x better.
    `,
  },
];

export function getPostBySlug(slug: string): BlogPostData | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug && p.published);
}

export function getAllPosts(): BlogPostData[] {
  return BLOG_POSTS
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostsByTag(tag: string): BlogPostData[] {
  return getAllPosts().filter((p) =>
    p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getPostsByCategory(category: BlogCategory): BlogPostData[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPostData[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];

  return getAllPosts()
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      const aMatch = a.tags.filter((t) => current.tags.includes(t)).length;
      const bMatch = b.tags.filter((t) => current.tags.includes(t)).length;
      return bMatch - aMatch;
    })
    .slice(0, limit);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}