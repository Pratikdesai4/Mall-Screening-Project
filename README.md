# American Dream — Interactive Sales Deck
### A cinematic, browser-based pitch experience for the largest mall in the Western Hemisphere

> Built to replace the fragmented "PDF + YouTube + spreadsheet" pitch motion with a single immersive destination that drives leasing inquiries, sponsorship conversations, and event bookings.

**Live:** https://mall-screening-project.vercel.app

---

## Overview

This is not a marketing website. It is a **purpose-built interactive sales deck** — a self-contained tool a salesperson can screen-share on a live call, send as a standalone link, or hand off to a decision-maker for self-guided exploration.

The experience is engineered to make a prospective tenant, sponsor, or producer feel *"I need to be here"* within the first ten seconds, then carry that emotional momentum through nine narrative chapters and into a contextual lead-capture flow.

---

## Key Features

### Cinematic storytelling
- Two-stage intro sequence: a Ken Burns cinematic intro that auto-clears into a deliberate splash gate, then opens the deck — total ~6s, paced for emotional setup without onboarding fatigue.
- Nine-chapter narrative arc designed around an emotional curve: **Awe → Credibility → Aspiration → Differentiation → Lifestyle → Action.**
- Every section's headline copy, supporting data, and CTA is tuned to where the viewer is emotionally — never generic "Contact us".

### Non-linear navigation
- Fixed sidebar chapter-dots with hover-revealed labels and a persistent active label below.
- Bottom status bar with chapter name, slide number, and animated progress bar.
- Full keyboard parity: `↑/↓`, `PageUp/PageDown`, `Space`, and `1–9` for direct chapter jump.
- Mouse-wheel and touch-swipe both bound to one-slide-per-gesture for predictable pacing.
- Cinematic transition overlay between slides — never a hard cut.

### Video-first implementation
- Five lazy-loaded YouTube backgrounds, each gated by IntersectionObserver and only swapped from `data-src` → `src` when the section enters the viewport.
- Per-slide `start=` offsets so the same source video reads as a different moment in each chapter (Hero, Luxury, Platform, Entertainment, Dining).
- Three-layer chrome suppression: `scale(1.12)` clip + `showinfo=0` parameter + `.video-ready` opacity gate that hides the iframe until autoplay confirms it is playing.
- High-quality AI-generated poster fallbacks that look intentional, not placeholder, when third-party video is blocked.

### Expandable module architecture
- Four contextual sub-decks: **Events**, **Sponsorship**, **General Leasing**, and a dedicated **Luxury Flagship Leasing** module for The Avenue prospects.
- Slide-in overlays preserve the primary narrative — the deck never resets or scrolls away.
- Per-module spec grids, AI-generated highlight imagery, sector-specific lead forms with context-aware success states (different copy for each pathway).
- Backdrop click + Escape key + close button — three independent dismissal paths.

### Production polish
- Per-form contextual success cards — no auto-close, no generic "Request Received". Real enterprise forms stay open with a confirmation.
- Skip-intro affordance, scroll indicator, keyboard hint that auto-fades after 5 seconds.
- Single source of truth for all colors, spacing, and easing curves via CSS custom properties.
- Zero inline `onclick` handlers — entirely modular trigger-class architecture.

---

## Performance Optimizations

| Optimization | Impact |
|---|---|
| Preload + `fetchpriority="high"` on the hero/intro/splash shared image | Faster LCP across all three intro states |
| IntersectionObserver-gated iframe lazy loading | Defers ~1MB+ of YouTube payload until needed |
| `decoding="async"` on every image | Non-blocking decode |
| Trimmed Google Fonts request (2 weights Cinzel + 3 weights Outfit) | Smaller font payload |
| `dns-prefetch` for YouTube thumbnail CDN | Saves one DNS round-trip per video |
| `font-display: swap` | No invisible text during font load |
| Native module script (auto-deferred) | Zero render-blocking JS |
| Single IntersectionObserver per concern (visibility, scroll position, counters, videos) | Constant-time observation regardless of section count |
| `passive` touch listeners | Smooth scroll on mobile |
| `prefers-reduced-motion` collapses all transitions to 0.01ms | Accessibility + perceived perf for opt-out users |
| `@media (max-height: 740px)` typography guard | Prevents reflow on 720p presentation screens |

---

## Accessibility

- Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`), heading hierarchy, and `aria-label` on every icon button.
- `:focus-visible` rules surface keyboard focus on every interactive element; `:focus` outline suppressed for mouse users only.
- `prefers-reduced-motion` honored across animations, transitions, and scroll behavior.
- `sr-only` text for sidebar nav dots so screen readers announce chapter names.
- Full keyboard operability for navigation, modal open/close, and form submission.

---

## Responsive Design

- Desktop-first cinematic layout, deliberately optimized for 1280×720 → 1920×1080 presentation contexts.
- `max-width: 1024px` breakpoint switches the side-by-side split sections to stacked, collapses the sidebar nav, and hides the bottom status bar.
- `max-width: 768px` tunes typography, padding, and module sizing for mobile.
- `max-height: 740px` shrinks split-section typography to prevent overflow on 720p projector setups.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Core | Vanilla JavaScript (ES Modules), HTML5, CSS3 |
| Animations | CSS keyframes + Intersection Observer + `requestAnimationFrame` |
| Video | YouTube IFrame embeds with lazy-load gate and chrome suppression |
| Maps | Static AI-composited asset with CSS overlay annotations |
| Fonts | Google Fonts — Cinzel (display) + Outfit (body) |
| Icons | Inline SVG + Unicode |
| Build | No bundler. Zero dependencies. Static deploy |
| Hosting | Vercel (auto-deploy from GitHub `main`) |
| Source | Git + GitHub |

---

## Project Structure

```
Mall-Screening-Project/
├── assets/                       # AI-generated and composited media
│   ├── hero_fallback.png         # Hero / intro / splash shared poster
│   ├── retail_fallback.png       # Retail section poster
│   ├── ent_fallback.png          # Entertainment & Platform poster
│   ├── expo_fallback.png         # Exposition Center poster
│   ├── luxury.png                # Luxury split-panel
│   ├── dining.png                # Dining split-panel
│   ├── map.png                   # Catchment map
│   ├── event_concert.png         # Events module — concert highlight
│   └── event_activation.png      # Events module — brand activation
├── index.html                    # Application shell + intro script
├── main.js                       # Deck engine (navigation, observers, modules, forms)
├── style.css                     # Full design system + responsive + a11y rules
├── README.md                     # This file
├── WRITEUP.md                    # Design rationale and process narrative
├── package.json                  # Project metadata
└── .gitignore
```

---

## Setup

No build step. Zero dependencies.

```bash
# Clone
git clone https://github.com/Pratikdesai4/Mall-Screening-Project.git
cd Mall-Screening-Project

# Open directly
start index.html      # Windows
open index.html       # macOS

# Or serve locally
npx serve .
# → http://localhost:3000
```

That is the entire setup. No `npm install`, no environment variables, no compile step.

---

## Deployment

Auto-deployed to Vercel on every push to `main`.

- **Production URL:** https://mall-screening-project.vercel.app
- **Platform:** Vercel (Hobby tier)
- **Build command:** none
- **Output directory:** `/`
- **Typical deploy time:** ~6 seconds

---

## Design Inspiration

Three reference points anchored every visual decision:

- **Apple product pages** for restraint — every pixel must earn its place. No decorative noise, gold reserved exclusively for CTAs and accents.
- **DigiDeck** (referenced in the brief) for non-linear deck structure and expandable sub-modules that deepen without breaking primary flow.
- **Disney / Universal flagship marketing** for emotional energy — full-bleed cinematics, headline copy that invites rather than describes.

Typography pairing — **Cinzel** (classical Roman inscription letterforms, used across luxury fashion and hospitality) for display, **Outfit** (geometric modern sans) for body. Tension between grandeur and clarity, matching the property itself.

---

## AI Tools Used

| Tool | Role |
|---|---|
| **Midjourney v6** | Hero cinematic renders, luxury retail interiors, entertainment atmospherics, dining lifestyle imagery |
| **Adobe Firefly** | AI-enhanced brand environment mockups and catchment map composition |
| **DALL·E 3** | Event crowd renders, sponsorship activation mockups, pop-up pavilion concepts |
| **ChatGPT-4o** | Headline pressure-testing, demographic narrative, CTA copy, brand voice |
| **Gamma.app** | Rapid layout mood-boarding before writing code |
| **Runway ML** | Motion-pacing reference frames for cinematic timing |
| **Remove.bg** | Brand logo treatments and asset cleanup |

The brief specifically invited AI-generated assets where real ones are unavailable. This project treated that as a creative directive, not a gap-fill — every asset was prompted, regenerated, and selected to match the premium aesthetic of the property.

---

## Challenges Solved

- **YouTube chrome bleed** — three-layer suppression (scale clip + param flags + opacity-gated `video-ready` class) to hide pre-play UI without losing autoplay.
- **Single source video, five slides** — staggered `start=` offsets make the same asset feel like distinct moments per chapter.
- **Footer scroll-snap dead code** — the footer was outside the scroll container due to `overflow:hidden` on the parent; relocated inside `<main>` to make snap actually fire.
- **Intro-splash-deck onboarding friction** — three sequential gates totaling ~10 s collapsed to ~6 s with tightened timers and an auto-progress splash that still registers as a deliberate moment.
- **Demo-feel forms** — replaced the generic "✓ Request Received" + auto-close with per-form contextual success cards (Events / Sponsorship / Luxury / Leasing) that match real enterprise inquiry UX.

---

## Key Engineering Decisions

- **Vanilla JS over React** — no framework overhead means instant first paint and zero hydration delay on a deck where the first ten seconds are everything.
- **IntersectionObserver for every scroll-triggered behavior** — counters, section reveals, video lazy-loading, current-slide detection — instead of scroll listeners, which fire per pixel.
- **CSS custom properties as the design system** — every color, transition, and easing curve lives in one block, so the visual language is single-source-of-truth.
- **Trigger-class architecture for modal opens** — `btn-events-trigger`, `btn-leasing-trigger`, `btn-luxury-leasing-trigger`, `btn-sponsorship-trigger` — no text-matching, no inline handlers, no fragility.

---

## Future Improvements

- **Self-hosted video via Cloudflare Stream** — guarantees autoplay across all browsers, eliminates the YouTube third-party dependency, gives frame-exact start control.
- **Real CRM endpoint** — forms are fully wired in vanilla JS; the swap is a single `fetch('https://formspree.io/f/YOUR_ID', { method:'POST', body: new FormData(form) })` call. The success-card UX is already in place.
- **WebP/AVIF asset conversion** — the AI-generated PNGs are ~1 MB each. Converting to WebP would cut total image weight by 60–80 % with no perceptible quality loss.
- **Performing Arts / Expo Center deep-dive module** — positioning American Dream's 300,000 sq. ft. event infrastructure as a true competitor to traditional mid-scale venues.
- **Tiered Sponsorship deck** — partnership packages with audience demographic visualizations and activation case studies.
- **Tablet-optimized breakpoint** — explicit 768–1024 px tuning between current desktop and mobile layouts.

---

## Credits

- **Property:** American Dream — East Rutherford, New Jersey.
- **Background videos:** Embedded from public YouTube sources, used for compositional reference.
- **All other imagery:** AI-generated with Midjourney v6, Adobe Firefly, and DALL·E 3, then composited and color-graded for visual consistency.
- **Fonts:** Cinzel and Outfit via Google Fonts.

---

*Built as a screening assignment for Liat AI — May 2026.*
*Pratik Desai — [GitHub](https://github.com/Pratikdesai4/Mall-Screening-Project)*
