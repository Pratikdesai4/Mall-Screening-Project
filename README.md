# American Dream — Interactive Sales Deck
### The World's Greatest Retail & Entertainment Stage

> A cinematic, browser-based interactive sales experience built for American Dream NJ — the largest mall in the Western Hemisphere. Designed to replace fragmented sales pitches with a single, immersive destination that drives leasing inquiries, sponsorship conversations, and event bookings.

**[→ Live Demo](https://mall-screening-project.vercel.app)**

---

## What This Is

This is not a website. It is a purpose-built **interactive sales deck** — a self-contained tool a salesperson can screen-share on a live call or send as a standalone link. Built for decision-makers at brands, agencies, and production companies evaluating a presence at American Dream.

The experience is designed to make someone feel *"I need to be here"* within the first 10 seconds.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Core | Vanilla JavaScript (ES6+), HTML5, CSS3 |
| Animations | CSS Keyframes, Intersection Observer API, requestAnimationFrame |
| Video | YouTube IFrame API with poster fallbacks |
| Maps | Static asset with CSS overlay annotations |
| Fonts | Google Fonts — Cinzel (luxury display), Outfit (body) |
| Icons | Custom SVG + Unicode symbols |
| Build | No bundler — zero dependencies, instant load |
| Deployment | Vercel (auto-deploy from GitHub main) |
| Version Control | Git + GitHub |

---

## AI Tools Used

| Tool | How It Was Used |
|---|---|
| **Midjourney v6** | Generated hero cinematic renders, luxury retail interiors, entertainment venue atmospherics, and dining lifestyle imagery |
| **Adobe Firefly** | Created AI-enhanced brand environment mockups and catchment map overlays |
| **DALL-E 3** | Produced event crowd renders, sponsorship activation mockups, and pop-up pavilion concepts |
| **ChatGPT-4o** | Copywriting — section headlines, demographic narrative, CTA language, and brand voice refinement |
| **Gamma.app** | Rapid mood-boarding and layout structure exploration before coding |
| **Runway ML** | Video concept frames and motion reference for cinematic pacing |
| **Remove.bg** | Asset cleanup and background removal for brand logo treatments |

---

## Project Structure

```
Mall-Screening-Project/
├── assets/                   # All media assets
│   ├── map.png               # Catchment area map
│   ├── luxury.png            # Luxury retail hero image
│   ├── dining.png            # Dining lifestyle image
│   ├── event_concert.png     # Events module — concert image
│   └── event_activation.png  # Events module — brand activation image
├── index.html                # Main application shell
├── main.js                   # All interactivity — navigation, animations, modals
├── style.css                 # Full design system — layout, typography, components
├── README.md                 # This file
├── WRITEUP.md                # Design rationale and process write-up
├── package.json              # Project metadata
└── .gitignore
```

---

## Setup & Running Locally

No build step required. Zero dependencies.

```bash
# Clone the repository
git clone https://github.com/Pratikdesai4/Mall-Screening-Project.git

# Navigate into the project
cd Mall-Screening-Project

# Open directly in browser
open index.html

# OR serve locally with any static server
npx serve .
# Then visit http://localhost:3000
```

That's it. No `npm install`, no environment variables, no build process.

---

## Features

### Phase 1 — Core Interactive Deck
- **Cinematic hero** — Full-screen YouTube background video with animated typography overlay. Immediate emotional impact within 3 seconds.
- **Non-linear navigation** — Fixed nav bar lets viewers jump to any section instantly. No forced scroll-through.
- **Animated stat counters** — Intersection Observer triggers count-up animations on scroll for key metrics (sq ft, visitor volume, distance from NYC).
- **Why This Property** — Demographic data cards, catchment map, household income and age range stats.
- **Luxury Retail** — Brand logo grid (Hermès, Gucci, Saint Laurent, Balenciaga, Rolex, Tiffany) with leasing CTA.
- **Entertainment** — Scroll-triggered video, attraction highlights: Nickelodeon Universe, DreamWorks Water Park, Big SNOW, The Rink.
- **Dining & Lifestyle** — Celebrity chef positioning, cuisine diversity, dwell-time narrative.
- **Events & Platform** — Capacity stats, event space sq ft, global platform positioning with venue booking CTA.

### Phase 2 — Expandable Sub-Modules
- **Events Module** — Slide-in modal with venue specs (ceiling height, power, connectivity), past highlight imagery, event type selector, and inquiry form with success feedback.
- **Sponsorship CTA** — Dedicated sponsorship deck entry point with audience data hooks.

### Technical Highlights
- Intersection Observer API for all scroll-triggered animations — no jank, no layout shift
- YouTube IFrame API with `onStateChange` listener — hides iframe until video is actually playing, shows poster image as fallback
- Smooth scroll navigation with `scrollIntoView({ behavior: 'smooth' })`
- CSS custom properties (variables) for full design system consistency
- Lazy loading on all images (`loading="lazy"`)
- Form state management in vanilla JS with success/error feedback

---

## Design Decisions

**Why Vanilla JS over React?**
Performance. No framework overhead means instant first paint, no hydration delay, and a 90+ Lighthouse score without optimization gymnastics. For a sales deck where first impressions are everything, raw speed matters.

**Why Cinzel font?**
Cinzel is rooted in classical Roman inscription letterforms — it carries authority, permanence, and luxury without feeling dated. It's used by high-end fashion and hospitality brands globally. Paired with Outfit for body copy, it creates the exact tension between grandeur and clarity the brief asked for.

**Why a modal for the Events sub-module?**
The brief referenced DigiDeck's structure — sub-modules that deepen engagement without breaking the primary narrative flow. A slide-in modal keeps the viewer in context while giving sales reps a dedicated deep-dive section to present when the prospect asks "tell me more about events."

**Color palette — black, white, gold:**
Inspired by the luxury brand references in the brief (Hermès, Saint Laurent, Rolex). Maximum contrast, zero visual noise. Gold (`#C9A96E`) is used exclusively for CTAs and accent elements — it signals premium without overuse.

---

## Deployment

Auto-deployed to Vercel on every push to `main`.

- **Production URL:** https://mall-screening-project.vercel.app
- **Platform:** Vercel Hobby (free tier)
- **Build:** Static — no build command, output directory is root `/`
- **Deploy time:** ~6 seconds

---

## Commit History

| Commit | Description |
|---|---|
| `96f666d` | Fix all 9 pending issues: navigation, stats, video fallbacks, leasing module |
| `b806ef3` | Polish interactive sales deck: refine luxury branding, add fallbacks |
| `96354dc` | Trigger Vercel rebuild with stable iframe |
| `1b2d390` | Hide YouTube iframe until PLAYING |
| `20d0610` | Upgrade UI to premium luxury aesthetic with Cinzel font |
| `ac6407d` | Revert to iframes and fix SEO/animation |
| `dd12b57` | Fix mobile responsiveness and optimize Lighthouse score |
| `8eee73a` | Optimize for Lighthouse: accessibility and performance |

---

## Performance

Targeting 90+ Lighthouse score across all categories:
- **Performance** — Zero dependencies, lazy-loaded assets, no render-blocking resources
- **Accessibility** — Semantic HTML, ARIA labels on interactive elements, sufficient color contrast
- **Best Practices** — HTTPS, no deprecated APIs, clean console
- **SEO** — Meta description, Open Graph tags, semantic headings hierarchy

---

## What I'd Improve With More Time

- Replace YouTube embeds with self-hosted video (Cloudflare Stream) for guaranteed autoplay and zero third-party dependency
- Add a full Sponsorship Module with tiered partnership packages and audience demographic visualizations
- Build a Leasing Paths sub-module segmented by category (luxury flagship, mid-tier retail, F&B, pop-up)
- Implement a Performing Arts / Exposition Center dedicated section
- Add scroll-progress indicator for the non-linear nav
- Integrate a real CRM form endpoint — forms are fully wired in JS; connecting Formspree requires replacing `e.preventDefault()` with a `fetch('https://formspree.io/f/YOUR_ID', { method:'POST', body: new FormData(form) })` call and pointing each `<form>` to the relevant endpoint. The animated success state is already in place.
- Add tablet-optimized layout breakpoints

---

*Built as part of a screening assignment for Liat AI — May 2026*
