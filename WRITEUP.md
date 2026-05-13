# Design Rationale & Process Write-Up
## American Dream — Interactive Sales Deck
*Screening Assignment — Liat AI — May 2026*

---

## The Problem

A salesperson pitching a mega-property currently bounces between a PDF deck, a YouTube tab, a spreadsheet, and a verbal narration. The story comes through fragmented and inconsistent. For a property whose entire commercial case rests on *scale* and *energy*, that fragmentation is not a minor inconvenience — it is the loss.

My goal was not to design a prettier version of what already exists. It was to build a tool that does the selling on its own — something a salesperson can screen-share on a live call or send as a standalone link, with the same emotional payload either way.

---

## Why American Dream NJ

American Dream is the most defensible subject for this assignment. The property's own story makes the case:

- Largest mall in the Western Hemisphere by entertainment square footage.
- The only property in North America with an indoor ski resort, theme park, and water park under one roof.
- Nine minutes from Manhattan — the highest-value retail market on Earth.
- 20 M+ residents within a 50-mile catchment radius, $125 K+ average household income.
- Still in its commercial growth phase — a genuine *"get in now"* narrative for prospective tenants.

My job was to make the deck match the ambition of the property.

---

## Design Philosophy

Three reference points anchored every decision.

**Apple.com for restraint.** Apple product pages are powerful because of what they omit. Every pixel earns its place. Black backgrounds, white typography, gold reserved exclusively for CTAs and accents (`#C9A96E`). The property provides the drama; the UI gets out of the way.

**DigiDeck for structure.** The brief referenced DigiDeck's pattern — non-linear navigation, sub-modules that deepen without derailing primary flow, a persistent nav so no one ever feels lost. I replicated this: a fixed sidebar lets a sales rep jump instantly to the section a prospect is asking about mid-call.

**Disney / Universal for emotional energy.** Entertainment and attractions sections needed to feel like an invitation, not a catalogue. Full-bleed imagery, animated stat reveals, bold headlines — *"Beyond Imagination"*, *"Unrivaled Attractions"*, *"Your Global Platform"* — to convey that something extraordinary is happening here and the viewer is being invited in.

---

## Storytelling Strategy

The deck is structured as a deliberate emotional arc, not an information dump:

1. **Awe** — Hero. Hit them with scale before a single number is mentioned.
2. **Credibility** — Why This Property. Back the feeling with data: income, catchment, dwell time.
3. **Revolution** — Retail. Show what's new and what is being reinvented.
4. **Aspiration** — Luxury. Hermès, Gucci, Rolex. Social proof through brand association.
5. **Differentiation** — Entertainment. The thing no one else has.
6. **Lifestyle** — Dining. Dwell time, repeat visits — the commercial logic for tenants.
7. **Expansion** — Exposition Center. 300,000 sq. ft. of event infrastructure.
8. **Action** — Platform. Close with the biggest opportunity. End on momentum, not information.

Every section terminates in a CTA that matches where the viewer is emotionally — *Begin Partnership Dialogue* (luxury), *Book a Private Event* (entertainment), *Partner With Us* (dining) — never a generic "Contact us".

---

## Cinematic & UX Decisions

**The intro is a gate, not a destination.** A 3.5-second Ken Burns sequence reveals the property name and tagline, then auto-clears into a deliberate splash gate, which auto-progresses after 1.2 s. The user can skip at any point. Total onboarding is ~6 s — enough to feel cinematic, not enough to feel slow.

**Navigation gives the viewer agency.** A sidebar of nine chapter-dots, hover-revealed labels, a persistent active label, and a bottom progress bar tied to slide position. Keyboard, wheel, and touch all bound to one-slide-per-gesture. A subtle transition overlay between slides — never a hard cut.

**Modules deepen without derailing.** Events, Sponsorship, General Leasing, and a dedicated Luxury Flagship Leasing module open as slide-in overlays. The deck never resets or scrolls away. Escape, backdrop click, and an explicit close button all dismiss.

---

## Video-First Approach

Video is the single most important element on a deck about scale. I committed to it deliberately:

- Five lazy-loaded YouTube backgrounds, each gated by an IntersectionObserver and only initialized when their section enters the viewport.
- Per-slide `start=` offsets so the same source video reads as a different moment in each chapter — the Hero opens cold, the Luxury slide enters at the 55-second beat, Platform enters at 30 s, Dining at 42 s.
- Three-layer chrome suppression — `scale(1.12)` clip, `showinfo=0` parameter, and a JS-applied `.video-ready` opacity gate that hides the iframe until autoplay is confirmed playing.
- High-quality AI-generated poster fallbacks behind every iframe. When YouTube is blocked (corporate networks, ad-blockers), the experience degrades to *intentional* stills, not broken embeds.

---

## AI Integration Approach

The brief specifically asked for high-quality AI-generated assets where real ones are unavailable. I treated this as a creative brief, not a gap-fill.

- **Midjourney v6** for cinematic property renders — luxury retail atria, indoor ski slopes, brand activation tents. Multi-iteration prompts refined for `--ar 16:9 --style raw`.
- **DALL·E 3** for event crowds and pop-up activations.
- **Adobe Firefly** for environmental mockups and catchment map composition.
- **ChatGPT-4o** to pressure-test headline copy in the tone of *"a global luxury destination, confident, not desperate"*. Shaped phrases like *"Beyond Imagination"*, *"Your Global Platform"*, *"A global runway for the world's most prestigious brands"*.
- **Gamma.app** for rapid layout mood-boarding *before* writing code — testing whether Luxury reads better before or after the Why-This-Property data (answer: after; establish scale first, then show what fills it).
- **Runway ML** for motion-pacing reference frames that informed CSS animation timing.

Every asset was prompted, regenerated, and selected to match the premium aesthetic of the property. No filler.

---

## Technical Architecture

**Vanilla JavaScript, no framework.** A React app adds 40–130 KB of framework overhead and a hydration delay. For a deck where the first ten seconds are everything, I could not afford that. Vanilla JS gave me instant first paint, zero layout shift, and a clean Lighthouse score without fighting an abstraction.

**IntersectionObserver for every scroll-triggered behavior.** Stat counters, section reveals, video lazy-loading, and current-slide detection — all observation, no scroll listeners. Scroll listeners fire on every pixel of movement and kill perf. Observers fire once when an element crosses the threshold, then unobserve where appropriate.

**CSS custom properties as the design system.** Every color (`--accent-gold`, `--bg-dark`, `--glass-bg`), spacing unit, and transition curve lives in one block. Changing the entire palette is a one-line edit.

**Trigger-class modal architecture.** No text-matching, no inline handlers. `btn-events-trigger`, `btn-leasing-trigger`, `btn-luxury-leasing-trigger`, `btn-sponsorship-trigger` — each module has a single class-based opener wired in one place.

**Modular module-overlay system.** All four sub-decks share a single open/close/dismiss handler. Adding a fifth module is a five-line HTML insertion plus a class registration — no new JS.

---

## Performance Decisions

- Single preload + `fetchpriority="high"` on the hero image, which is reused by intro overlay, splash, and the hero section — three uses of one cached asset.
- `decoding="async"` on every image so decode never blocks the main thread.
- Trimmed Google Fonts payload — only the weights actually referenced in CSS are requested.
- `dns-prefetch` for the YouTube thumbnail CDN.
- Native ES module script for `main.js` — auto-deferred, never render-blocking.
- `prefers-reduced-motion` collapses every animation and transition to 0.01 ms for users who opt out.
- `@media (max-height: 740px)` typography guard prevents reflow on 720p projector/screen-share setups.

---

## Expandability Thinking

The architecture is built for the modules I did not have time to build.

- **Adding a new chapter:** drop a `<section class="full-page">` into `<main>`, add a `<a class="nav-dot">` to the sidebar, push a chapter name into the `chapterNames` array in `main.js`. Done.
- **Adding a new lead-capture module:** copy the existing `.module-overlay` block, give it an ID, add a trigger class on the launching button. The shared open/close handler picks it up automatically.
- **Adding a new contextual form success message:** add a key to the `formSuccessMessages` map and one line to `getFormContext()`.
- **Swapping simulated forms for real submissions:** one `fetch()` call inside the existing submit handler. Everything else — loading state, success card, error handling — is already in place.

---

## Biggest Challenges Solved

- **YouTube pre-play chrome flashing through.** A three-layer fix — `transform: scale(1.12)` to clip edge UI outside `overflow:hidden`, `&showinfo=0&modestbranding=1` params, and a JS-applied `.video-ready` opacity gate triggered 3 s after `src` is set — eliminated the jarring black-iframe-with-play-button moment that YouTube embeds show during buffer.
- **One video, five contexts.** Rather than source five separate videos, I used `start=` offsets to make a single asset feel like distinct moments per chapter.
- **Onboarding friction.** The first iteration's intro→splash→deck flow totalled ~10 s. Tightening intro timer, fade transitions, splash CSS transitions, and auto-proceed delay brought this to ~6 s without losing cinematic intent.
- **Demo-feel forms.** First iteration showed a generic *"✓ Request Received"* button flash and auto-closed the modal. Real enterprise inquiry forms stay open with a confirmation card — so I replaced the auto-close with a per-form contextual success state (Events / Sponsorship / Luxury / Leasing) that matches that expectation.

---

## What Was Refined During Iteration

The first version was visually correct but felt like a polished demo. Iteration replaced the demo tells one by one:

- Footer was outside the scroll container — moved inside, snap now fires.
- Inline `onclick` on the header CTA — converted to modular class-listener architecture.
- Generic form success — replaced with per-context cards.
- Splash showed for 2.5 s before auto-progressing — felt like a gate the user had to wait through; tightened to 1.2 s.
- Two-card "Why" panel with a redundant *"65% high-earning professionals"* card — collapsed to two high-signal facts.
- Dining slide had an inline stats-grid duplicating the eyebrow data — removed.
- Sponsorship trigger was bound by `innerText` matching — replaced with a `btn-sponsorship-trigger` class.

Each individual fix was small. Collectively they moved the project from *prototype* to *production-grade*.

---

## With More Time

- **Self-hosted video via Cloudflare Stream.** Eliminates the YouTube dependency, guarantees autoplay across all browsers, gives frame-exact control of start times.
- **Real CRM endpoint** — the forms are wired; only the `fetch()` call to Formspree or a HubSpot endpoint is missing.
- **WebP/AVIF conversion** — the AI-generated PNGs are ~1 MB each. Converting to WebP would cut total image weight by 60–80 %.
- **Full Sponsorship deep-dive module** with tiered partnership packages and audience-demographic data visualizations.
- **Performing Arts / Exposition Center deep-dive** positioning American Dream's 300,000 sq. ft. event infrastructure against mid-scale traditional venues.
- **Tablet-optimized breakpoint** between current desktop and mobile layouts.

---

## Reflection

The brief said *"We're not looking for perfection. We're looking for signal."*

The signal I tried to send: I think like a product builder, not just a coder. Every decision — the font pairing, the animation timing, the order of sections, the CTA copy, the choice to *not* use a framework — was made in service of a business outcome.

The goal was never a technically impressive website. It was a tool that makes someone pick up the phone.

---

*Pratik Desai — May 2026*
*Live: https://mall-screening-project.vercel.app*
*Source: https://github.com/Pratikdesai4/Mall-Screening-Project*
