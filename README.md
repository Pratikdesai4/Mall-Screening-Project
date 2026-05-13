# American Dream — Interactive Sales Deck

> A cinematic, browser-based interactive sales experience for American Dream NJ — the world's largest retail and entertainment destination.

**Live:** [mall-screening-project.vercel.app](https://mall-screening-project.vercel.app)

---

## Overview

This project is a premium interactive sales deck built for American Dream (East Rutherford, NJ) — a 3-million-square-foot retail and entertainment destination 20 minutes from Manhattan. The experience is designed to function as a self-running presentation tool for leasing prospects, brand partners, event bookers, and sponsorship teams. It replaces the static PDF deck with a cinematic, scroll-driven narrative that communicates the property's scale, ambition, and commercial opportunity.

The deck runs entirely in-browser with no framework, no backend, and no runtime dependencies beyond a single CSS file and a single JavaScript module.

---

## Features

### Cinematic Intro Sequence
- Full-screen overlay with a Ken Burns zoom effect on the hero image
- Staggered text reveal: eyebrow → title → gold rule bar → tagline, each timed to land sequentially
- Multi-layer vignette (dark top/bottom, open centre) keeps the logo readable over any background
- Auto-proceeds after 3.5 seconds; "SKIP TO DECK" button available immediately
- Inline script executes before `DOMContentLoaded` — zero delay on skip/auto-timer even on slow connections

### Scroll-Snap Deck Architecture
- 9 sections snapped with `scroll-snap-type: y mandatory` — one section per viewport at all times
- Navigation via keyboard (↑ ↓, PageUp/Down, Space, number keys 1–9), mouse wheel, touch swipe, sidebar dots, and overlay arrow buttons
- `IntersectionObserver`-based scroll tracking keeps the sidebar, progress bar, slide counter, and chapter name in sync without scroll-event polling
- Section transition overlay fires on dot/number-key navigation for a cinematic cut effect

### Video-First Sections
- YouTube iframes use `data-src` lazy loading — no embed script executes until the section scrolls into view
- `requestIdleCallback` defers the `IntersectionObserver` wiring for iframes until after `window.load` and browser idle, removing ~500KB of YouTube JS from the LCP/TBT measurement window
- `.video-ready` class added 3 seconds after `src` assignment prevents YouTube's pre-play thumbnail from flashing
- AVIF/WebP `<picture>` fallback images sit beneath every iframe — always visible if YouTube is blocked or loading

### Expandable Module Overlays
Four full-screen module overlays, each opening over the deck without navigating away:

| Trigger | Module | Purpose |
|---|---|---|
| `.btn-events-trigger` | Events & Activations | Venue specs, gallery, booking form |
| `.btn-sponsorship-trigger` | Sponsorship & Partnerships | Media kit request form |
| `.btn-luxury-leasing-trigger` | Flagship & Luxury Leasing | Private consultation request |
| `.btn-leasing-trigger` | General Leasing | Brochure / advisor contact |

Each overlay closes via its × button, backdrop click, or Escape key. Keyboard navigation is suspended while a module is open. Form submissions replace the booking card with a contextual success state — different heading and body copy per inquiry type, no page reload.

### Stats Counter Animation
- Animated count-up for key property metrics (3,000,000 sq ft · 40M+ visitors · 20 min from NYC)
- Triggered by `IntersectionObserver` on first entry, fires once per session
- 2,200ms eased animation with `requestAnimationFrame`

### Performance Architecture
- **AVIF images** — all 11 assets converted from PNG → WebP → AVIF via Sharp; hero image reduced from 1,062KB (PNG) to 137KB (AVIF), an 87% reduction
- **`<picture>` elements** — every `<img>` offers AVIF → WebP fallback; Lighthouse (Chrome) always picks the smaller AVIF
- **Dual preload hints** — `<link rel="preload" type="image/avif">` and `type="image/webp">` for the LCP hero; each browser fetches only the format it supports, no double-download
- **`fetchpriority="high"`** on the LCP `<img>` — signals the browser to prioritise the hero over competing in-flight requests
- **Async Google Fonts** — `media="print"` → `onload` swap eliminates render-blocking font CSS
- **Deferred JS init** — only `initIntroSequence()` runs on `DOMContentLoaded`; the deck engine, stat counters, module overlays, and video fallback are all deferred to `requestIdleCallback({ timeout: 2000 })`, keeping the main thread free during LCP measurement
- **Immutable cache headers** — `vercel.json` sets `Cache-Control: public, max-age=31536000, immutable` on all assets, JS, and CSS
- **Minimal preconnects** — only `fonts.googleapis.com` and `fonts.gstatic.com` preconnected; YouTube excluded because iframes are deferred

### Accessibility
- `aria-label` on all icon-only buttons (nav arrows, close buttons)
- `<span class="sr-only">` for sidebar dot labels
- `prefers-reduced-motion: reduce` collapses all CSS animations and transitions to 0.01ms
- Full keyboard navigation: arrow keys, Page Up/Down, Space bar, number keys 1–9, Escape to close overlays
- Semantic HTML throughout: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`

### Responsive Design
- Fluid layout using CSS custom properties, `clamp()`, and viewport units
- `@media (max-height: 740px)` guard reduces padding and font sizes for 720p presentation displays
- Split sections reflow to single-column on narrow viewports
- Module overlays fully scrollable on mobile with `overflow-y: auto`
- Touch swipe navigation for tablet and mobile

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic) |
| Styling | Vanilla CSS (custom properties, `clamp()`, scroll-snap) |
| Scripting | Vanilla ES2020 (modules, `IntersectionObserver`, `requestIdleCallback`) |
| Build | Vite 6 (content-hashed asset fingerprinting) |
| Image processing | Sharp 0.34.5 (PNG → WebP → AVIF batch conversion) |
| Fonts | Google Fonts — Cinzel (headings), Outfit (body) |
| Video | YouTube iframe embed (lazy-loaded, muted autoplay) |
| Deployment | Vercel (zero-config static + immutable cache via `vercel.json`) |

**Runtime dependencies: zero.** All interactivity is vanilla JS. No React, no Vue, no jQuery, no CSS framework.

---

## Project Structure

```
american-dream-sales-deck/
├── assets/
│   ├── hero_fallback.avif     # LCP hero — 137KB (was 1,062KB PNG)
│   ├── hero_fallback.webp     # WebP fallback — 195KB
│   ├── luxury.avif            # Luxury section panel
│   ├── retail_fallback.avif   # Retail split panel
│   ├── dining.avif            # Dining split panel
│   ├── ent_fallback.avif      # Entertainment / Events background
│   ├── expo_fallback.avif     # Exposition Center panel
│   ├── map.avif               # Catchment area map
│   ├── event_concert.avif     # Events module gallery
│   ├── event_activation.avif  # Events module gallery
│   └── *.webp                 # WebP copies of all assets
├── scripts/
│   └── convert-webp.mjs       # Sharp-based PNG → WebP batch converter
├── index.html                 # Application shell — 9 sections + 4 overlays
├── style.css                  # Full design system (~2,400 lines)
├── main.js                    # Deck engine — scroll, nav, stats, modules (~445 lines)
├── package.json               # Vite + Sharp dev dependencies
├── vercel.json                # Immutable cache header configuration
├── README.md
└── WRITEUP.md
```

---

## Setup & Development

### Prerequisites
- Node.js 18+
- npm

### Install

```bash
npm install
```

### Development server

```bash
npm run dev
# → http://localhost:5173
```

### Production build

```bash
npm run build
# Output: dist/ with content-hashed filenames
```

### Preview production build locally

```bash
npm run preview
```

### Regenerate image assets (if updating source PNGs)

```bash
# Step 1: PNG → WebP
node scripts/convert-webp.mjs

# Step 2: WebP → AVIF (Sharp, quality 50)
node -e "
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const files = fs.readdirSync('./assets').filter(f => f.endsWith('.webp'));
Promise.all(files.map(f =>
  sharp(path.join('./assets', f))
    .avif({ quality: 50, effort: 6 })
    .toFile(path.join('./assets', path.parse(f).name + '.avif'))
)).then(() => console.log('Done'));
"
```

---

## Deployment

Deploys to Vercel as a zero-config static site.

```bash
vercel --prod
```

Or connect the GitHub repository to Vercel for automatic deploys on push to `main`. The `vercel.json` cache configuration is picked up automatically — no additional Vercel settings required.

---

## Design System

### Typography
- **Cinzel** (weights 400/500) — headings, eyebrows, brand names. Evokes Roman monumental lettering — authoritative and timeless for a flagship property.
- **Outfit** (weights 300/400/500) — body copy, captions, UI labels. Clean geometric sans that complements Cinzel without competing.

### Colour Palette
```css
--accent-gold:    #cba153;   /* Primary accent — CTAs, rules, highlights */
--bg-primary:     #0a0a0a;   /* Near-black background */
--bg-secondary:   #111111;   /* Alternating section backgrounds */
--text-primary:   #f5f0e8;   /* Warm off-white */
--text-secondary: #a09070;   /* Muted gold-grey for secondary labels */
```

### Motion
- Staggered child entry via `IntersectionObserver` + `data-animate` attributes (80ms stagger between siblings)
- Ken Burns scale drift on intro background
- All animations respect `prefers-reduced-motion`

---

## AI Tools Used

- **Midjourney / DALL-E 3** — all hero imagery and section panel visuals; prompts crafted for cinematic luxury aesthetics (dramatic lighting, architectural scale, dark backgrounds). Labelled with "✨ AI Visual" badges in-deck.
- **Claude (Anthropic)** — documentation, copywriting assistance, and engineering pair programming

---

## Challenges & Key Engineering Decisions

**LCP on a video-first page**
Video iframes start blank, which means the LCP element defaults to whatever is underneath. Solution: a high-priority AVIF image with `fetchpriority="high"` and `loading="eager"` sits behind every iframe. LCP is measured against the image; the video loads over it asynchronously.

**YouTube JS blocking TBT**
YouTube's embed script (~500KB) is synchronous and dominates Total Blocking Time when loaded eagerly. Solution: `data-src` lazy loading + `requestIdleCallback` after `window.load` defers all iframe initialisation. The 3.5s intro overlay means users never perceive the delay.

**Scroll snap vs. programmatic navigation**
`scroll-snap-type: y mandatory` conflicts with custom `scrollIntoView()` calls. Resolution: `behavior: 'auto'` for transition-overlay navigation (snap handles the rest) and `behavior: 'smooth'` for direct user input only. An `isTransitioning` flag prevents input races.

**Contextual form success states**
Generic confirmations feel like placeholder copy and erode confidence at the point of conversion. Solution: `getFormContext()` discriminates between 4 form types by class name and parent overlay ID, replacing the entire `.booking-card` with tailored success messaging per inquiry type.

---

## Future Improvements

- **Analytics** — Plausible or Mixpanel events on slide views, CTA clicks, and form submissions
- **Real form backend** — Resend or Formspree with CRM sync and email confirmation
- **CMS-backed content** — Headless CMS (Sanity / Contentful) so leasing teams update availability without a deploy
- **GSAP ScrollTrigger** — Replace CSS keyframe animations with timeline-based choreography
- **OG / social meta** — Open Graph and Twitter Card tags for shareable link previews
- **PWA manifest** — Make the deck installable as a standalone offline presentation app
- **Localization** — Spanish, Mandarin, Korean given the international tenant base

---

## Credits

- **Property:** American Dream, East Rutherford, NJ — [americandream.com](https://americandream.com)
- **Fonts:** Google Fonts (Cinzel, Outfit)
- **Images:** AI-generated (Midjourney / DALL-E 3) — illustrative purposes only
- **Video:** YouTube / American Dream official channel
- **Tooling:** Vite, Sharp, Vercel
- **Engineering assistance:** Claude (Anthropic)

---

*Built as a frontend engineering assignment. All brand names, tenant references, and contact details are used for illustrative purposes only.*
