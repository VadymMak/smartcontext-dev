---
title: "How to Get Your Website Cited by ChatGPT and Perplexity in 2026?"
description: "What controlled studies show about AI citation: rank is the primary driver, concrete facts are secondary gatekeepers. A correction of the GEO industry's most repeated claim — based on 30 verified primary sources."
datePublished: "2026-03-28"
dateModified: "2026-08-12"
author: "Vadym Mak"
tags: ["GEO", "AI Search", "SEO", "ChatGPT", "Next.js"]
readingTime: 10
coverOg: "/og-image.jpg"
---

**Quick Answer:** Rank is the primary driver of AI citation — position 1 gets cited in roughly 43% of queries where the page appears; position 7 in about 5% (Fischman 2026). Within ranked pages, concrete facts in visible text — prices, dates, counts — act as secondary gatekeepers (SIGIR 2026, 252,000 controlled trials, six models). Schema markup has no measurable effect in controlled experiments. The mechanism: most AI retrieval pipelines strip HTML before the model reads the content. JSON-LD lives in `<script>` tags. Those tags are stripped. To get cited: rank first, then make your visible copy specific and fresh.

---

I spent months building "GEO-optimized" websites and citing a Princeton study that supposedly showed schema markup and structured content increased AI citations by 37%.

I was wrong about the mechanism — and so is most of the GEO industry.

This post is a correction, based on a systematic review of 120 records, 30 primary sources verified, with a blind second-reviewer pass (Cheung, 2026). If you read the original version of this article or anything similar in the GEO space, here is what the research actually says.

## What Do Controlled Studies Show About AI Citation?

### What Is the Fischman 2026 Finding?

The clearest result in the literature: across large-scale observational data, organic position predicts AI citation rate. Pages at position 1 get cited in roughly 43% of queries where they appear in the candidate set. By position 7, that rate falls to about 5%.

This is not a marginal difference. It is a 9× gap between position 1 and position 7.

This is the primary lever for AI citation. Everything else is secondary to it.

### What Did the Princeton KDD 2024 Study Actually Test?

The Princeton KDD 2024 paper (Aggarwal et al., "GEO: Generative Engine Optimization") tested visible-text editing techniques: adding statistics, adding authoritative citations, improving fluency. It did not test schema markup, structured data, or JSON-LD.

The paper found correlations between some editing techniques and citation rate in their specific dataset. It was not a controlled trial with randomized conditions. The results have not replicated consistently in follow-up controlled studies.

What spread through the SEO community was a mutated version of the claim: that schema markup, FAQPage schema, and structured data caused the +37% citation improvement. That specific attribution is wrong. The study tested visible text changes — not markup — and even those results are observational, not causal.

### What Did SIGIR 2026 Find?

SIGIR 2026 ran 252,000 controlled trials across six AI models. Key finding: visible prices and recency dates act as citation gatekeepers. Formatting-only changes — including schema markup — had no measurable effect on citation rates.

The mechanism is now understood. Most AI retrieval pipelines (including those behind ChatGPT and Perplexity) extract text from pages using tools like trafilatura. Trafilatura strips `<script>` tags before passing content to the model. JSON-LD lives in `<script>` tags. The model never reads your schema during citation generation.

What the model does read: visible text. Prices, dates, specific numbers in the body of the page.

## Why Rank Is the Primary Driver

ChatGPT sources from Microsoft Bing's index. Perplexity runs its own crawler. Google AI Overviews use Google's index. All three draw citation candidates from the same pool: pages that are already indexed and ranking for the query.

If your page is not in the top results for a query, it is unlikely to be in the candidate set for citation. If it is at position 1, it appears in the candidate set for nearly every relevant query — and then content quality determines whether it gets quoted.

The practical implication: work that drives AI citation is the same work that drives traditional organic ranking. Domain authority, relevant backlinks, content quality, technical performance, and search intent alignment. There is no shortcut that bypasses the ranking requirement.

## What Actually Works as a Secondary Factor?

Within pages that are already ranked, two secondary factors consistently emerge from the evidence:

**Concrete facts in visible text.** Specific prices, delivery timelines, client counts, project numbers — cited more than vague statements. "$1,200–$2,500 for a landing page, delivered in 1–2 weeks" is citable. "We offer competitive pricing with fast turnaround" is not. This is SIGIR 2026's core finding: visible specificity matters, not markup.

**Freshness signals.** `dateModified` in schema, visible publication dates in article headers, explicit year references in copy ("in 2026"). AI tools prioritize recency because outdated information creates risk for the tool. A page updated 3 weeks ago competes better than the same content with no date. This is one of the few schema values that actually transmits to some retrieval systems — because `dateModified` is read before trafilatura strips the markup.

Both improvements are content improvements — not technical tricks. They make the page better for human readers and AI readers simultaneously.

## Where Does Schema Markup Actually Help?

Schema markup has real, documented value. That value is just not "AI citation."

**Rich results in Google Search.** FAQPage schema enables expandable Q&A in the SERP. Article schema enables news/blog indexing. These improve click-through rate from organic search, which over time improves ranking, which through the Fischman mechanism does improve AI citation — but the path is: schema → ranking → citation, not schema → citation.

**Entity disambiguation.** Organization schema with `identifier`, `vatID`, and `sameAs` links helps knowledge graphs distinguish your business from other businesses with the same name. This matters for knowledge panel appearance and for AI systems that need to identify "which SmartContext.dev is this" when multiple entities share a name.

**E-E-A-T signals for Google.** Person schema with `sameAs` links to LinkedIn, GitHub, and portfolio sites helps Google verify author credibility. Google uses this for quality assessment. This affects ranking, which affects citation.

What schema does not do: it does not get read by the AI model during citation generation. The model sees text, not markup.

## How to Actually Improve Your AI Citation Rate

Given what the research shows, here is the honest implementation checklist:

**Foundation — rank first:**
- Technical performance: Lighthouse 90+ mobile, LCP under 2.5s
- Correct hreflang for multilingual sites (the Next.js MetadataRoute.Sitemap generator silently drops alternates — a confirmed bug in versions 14–16; use a manual XML Route Handler)
- Fresh content that satisfies search intent for your target queries
- Quality that earns backlinks naturally

**Content for citation — within ranked pages:**
- Specific prices, timelines, and counts in the first 150 words of visible body copy
- `dateModified` updated whenever content changes (one of the few schema values that reliably transmits)
- Author credentials in visible text: years of experience, project count, specific technologies, named clients
- Question-based H2/H3 headings that match how buyers phrase queries

**Schema for its actual purposes:**
- FAQPage for Google SERP rich results (not AI citation)
- Article with `dateModified` for news indexing and recency signals
- Organization with IČO/vatID for entity disambiguation
- Person with `sameAs` for author credibility in Google's quality assessment

## Why Publishing This Correction Matters

The GEO industry has a problem: claims mutate in transit. The Princeton study tested visible text edits → the claim became "Princeton showed schema markup causes AI citations." That mutation is now in hundreds of blog posts, agency pitches, and pricing pages including — until this correction — mine.

A developer who publishes which claims in their own specialty do not hold up is rare. Most people prefer to look confident. But wrong claims lead to wrong spending: clients paying for schema audits when what they need is ranking work.

The correct mental model: AI citation is a byproduct of organic ranking, with content specificity and freshness as secondary multipliers. Build for ranking. Write specific copy. Update dates. Schema is for Google, not for the AI model.

## FAQ

### Does FAQ schema help with AI citation?

Not directly. Most AI retrieval pipelines strip `<script>` tags (where JSON-LD lives) before content reaches the model. What FAQ schema does help: Google SERP rich results (expandable Q&A), which increases click-through rate, which improves ranking, which through the Fischman mechanism does improve AI citation. The path is indirect: schema → ranking → citation, not schema → citation directly.

### How long before first AI citations appear?

For established domains (6+ months old) already ranking in the top 5 for a query: 4–12 weeks after content updates adding specific facts and a current `dateModified`. For new domains not yet ranking: 6–18 months, because the ranking prerequisite has to be established first. There is no GEO technique that bypasses the ranking requirement.

### Is GEO actually different from traditional SEO?

Less different than the industry claims. Both require content quality, relevant backlinks, and technical performance. GEO adds specificity in visible copy (prices, dates, counts) and freshness signals. The foundation is identical ranking work. GEO-only tactics that promise citations without ranking have no controlled evidence behind them.

### What did the Princeton study actually show?

The Princeton KDD 2024 study tested visible-text editing techniques — adding statistics and authoritative citations to existing content — and found correlations with citation rate changes in their specific dataset. It did not test schema markup. It was observational, not a controlled experiment. The +37% figure that spread through the industry was attributed to schema markup, which is wrong. The study tested copy changes, not markup.

### What is the single most impactful change for AI citation?

Rank higher for queries your buyers use. After that: write specific prices, timelines, and counts into the visible body of your top pages, and keep `dateModified` current. Those changes are supported by controlled evidence. Everything else is secondary or unverified.
