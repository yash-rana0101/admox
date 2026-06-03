# Admox Media — Product Requirements Document (PRD)

## Landing Page v1.0

---

## 1. Overview

**Product:** Admox Media — Public Landing Page  
**Version:** 1.0  
**Goal:** Convert agency-aware visitors (startups, personal brands, SMBs, e-commerce brands) into leads/enquiries  
**Primary CTA:** "Start a Project" / "Book a Free Call"  
**Tech Stack:** HTML5 + CSS3 + Vanilla JS (single-file, no framework dependencies)

---

## 2. Goals & Success Metrics

| Goal                        | Metric                              |
|-----------------------------|-------------------------------------|
| Communicate brand identity  | Bounce rate < 50%                   |
| Generate qualified leads    | CTA click rate > 8%                 |
| Build credibility           | Time-on-page > 2 min                |
| Showcase services clearly   | Contact form submissions            |

---

## 3. Target Audience

Per brand strategy document:

1. **Startups** — Need affordable, scalable creative solutions
2. **Personal Brands** — Need content, visibility, authority
3. **Small Businesses** — Need consistent marketing content
4. **E-commerce Brands** — Need performance-driven creatives
5. **Agencies** — Need AI-powered production support
6. **Corporate Brands** — Need premium storytelling

**Primary visitor intent:** Understand what Admox offers → See proof of quality → Take action (contact)

---

## 4. Page Sections & Content Requirements

### Section 1: Navigation
- Logo (left aligned) with brand symbol + wordmark
- Nav links: Services, About, Work, Pricing, Contact
- CTA button: "Start a Project" (Ocean Teal)
- Sticky on scroll with subtle background blur
- Mobile: Hamburger menu

---

### Section 2: Hero
**Purpose:** Immediate brand impression + value communication

**Content:**
- Eyebrow label: `"AI-Powered Creative Agency"`
- Headline: `"Your Brand.\nOur Vision."` (tagline as hero — massive display type)
- Sub-headline: `"We combine human creativity with AI to build content that captures attention, builds trust, and drives growth."`
- Primary CTA: `"Start a Project →"`
- Secondary CTA: `"See Our Work"`
- Visual: Animated geometric element (the 'A' star logo motif as a large background element) + abstract teal grid/node pattern

**Design Notes:**
- Background: Classic Linen (#EEF7E8)
- Hero type in Onyx Black, massive scale (80-96px)
- Staggered fade-up animation on load
- Full viewport height

---

### Section 3: Brand Trust Bar
**Purpose:** Social proof / credibility signaling

**Content:**
- "Trusted by growing brands" label
- 5–6 placeholder brand logos (animated scroll marquee)
- Subtle horizontal scroll animation

---

### Section 4: What We Do — Services
**Purpose:** Communicate full service offering

**Layout:** 2-column split — Creative Services + AI-Powered Services

**Creative Services:**
- Promotional Shoots
- Brand Films
- Video Editing
- Reels Production
- YouTube Editing
- Graphic Design
- Social Media Creatives
- Brand Storytelling

**AI-Powered Services:**
- AI Video Editing
- AI Graphic Designing
- AI Content Creation
- AI Visual Concepts
- AI Mockups
- AI Media Planning
- AI Content Strategy

**Design Notes:**
- Section bg: White
- Cards with hover states
- Ocean Teal accent icons/numbers

---

### Section 5: Why Admox — Pillars
**Purpose:** Communicate brand differentiation (USP)

**Content (5 pillars from brand strategy):**
1. **Creativity** — Original concepts that help brands stand out
2. **Innovation** — Cutting-edge AI tools + modern creative processes
3. **Performance** — Content designed to deliver measurable results
4. **Storytelling** — Building emotional connections between brands and audiences
5. **Growth** — Everything aligned with business growth objectives

**USP Statement:**
`"Faster turnaround. Higher volume. Better efficiency. Cost-effective production. Trend-aware solutions."`

**Design Notes:**
- Large numbered list (01–05) in huge Sora type
- Teal numbers, Onyx text

---

### Section 6: Brand Manifesto / About
**Purpose:** Emotional connection, brand story

**Content (from brand manifesto):**
> "The future belongs to brands that move faster, think smarter, and create deeper connections.
> At Admox Media, we believe creativity is powerful. AI makes it limitless."

- Mission statement
- Vision statement
- Brief who-we-are paragraph

**Design Notes:**
- Full-width, Ocean Teal background
- White text
- Large centered editorial type
- Subtle animated sparkle/star motif (logo element)

---

### Section 7: Target Audience / Who We Serve
**Purpose:** Help visitors self-identify

**Content:** 6 audience segments as clean cards:
- Startups
- Personal Brands
- Small Businesses
- E-commerce Brands
- Agencies
- Corporate Brands

**Design Notes:**
- Classic Linen background
- Minimal icon + label + one-line description per card
- 3×2 grid on desktop, 2×3 on mobile

---

### Section 8: Content Themes / Social Proof
**Purpose:** Show range of content created

**Content (7 themes from brand strategy):**
1. Creativity Meets AI
2. Behind The Creative Process
3. Brand Growth Stories
4. AI Tools & Innovation
5. Content Marketing Insights
6. Visual Storytelling
7. Creative Case Studies

**Design Notes:**
- Horizontal scrolling card row
- White background
- Preview mockup images per theme

---

### Section 9: CTA Section
**Purpose:** Final conversion push

**Content:**
- Headline: `"Ready to Build Something Extraordinary?"`
- Sub: `"Let's combine creativity and AI to take your brand to the next level."`
- CTA: `"Start a Project"` + `"Or email us at hello@admoxmedia.com"`

**Design Notes:**
- Dark Onyx background
- White text
- Teal CTA button
- Subtle animated background grid

---

### Section 10: Footer
**Content:**
- Logo
- Tagline: *Your Brand. Our Vision.*
- Nav links
- Services quick list
- Social links (Instagram, LinkedIn, YouTube)
- Copyright: `© 2025 Admox Media. All rights reserved.`

---

## 5. Technical Requirements

| Requirement          | Spec                                                 |
|----------------------|------------------------------------------------------|
| File type            | Single HTML file                                     |
| CSS                  | Embedded `<style>` tag, CSS variables                |
| JS                   | Embedded `<script>` tag, vanilla only                |
| Fonts                | Google Fonts CDN (Sora, Space Grotesk, DM Sans)      |
| Performance          | No external JS libraries                             |
| Responsive           | Mobile-first, breakpoints at 768px and 1200px        |
| Animation            | CSS keyframes + IntersectionObserver                 |
| Accessibility        | Semantic HTML, alt tags, sufficient color contrast   |
| Browser support      | Chrome, Firefox, Safari, Edge (modern versions)      |

---

## 6. Brand Voice in Copy

Per brand strategy:

**Instead of:** "We make content."  
**Say:** "We create content engineered for attention and growth."

**Instead of:** "We edit videos."  
**Say:** "We transform ideas into compelling visual experiences."

**Tone:** Confident, Smart, Conversational, Modern, Inspirational, Strategic

---

## 7. Out of Scope (v1.0)

- Portfolio/case studies pages
- Blog
- Pricing page
- Client portal
- CMS integration
- Backend contact form processing

---

## 8. Deliverable

Single production-ready `index.html` file with embedded CSS and JS, fully responsive, matching the Admox Media brand system defined in Design.md.
