# Project Write-Up
## American Dream — Interactive Sales Deck
*Frontend Engineering Assignment — May 2026*

---

## Why American Dream

The assignment asked for a premium browser-based sales deck for one of the world's largest malls. American Dream (East Rutherford, NJ) was the obvious choice — not because it is simply large, but because it is genuinely difficult to communicate. At 3 million square feet with an indoor ski slope, a Nickelodeon theme park, a DreamWorks water park, 500+ retail brands across all price tiers, and an exposition centre that can host 5,000-person events, the property resists being flattened into a PDF. It demands a format that can show, not just list. A cinematic browser experience is not a stylistic choice here — it is the correct format for this brief.

The commercial case is also unusually strong: 40 million annual visitor potential, a 20-minute drive from Manhattan, a primary catchment household income of $125K+, and a core demographic of affluent 18–44 year olds. Every section of the deck is structured to build that argument progressively — from scale and context, through specific product categories (retail, luxury, entertainment, dining, exposition), to platform-level opportunity (events, sponsorship, brand activation), and finally to conversion.

---

## Storytelling Strategy

The deck is structured as a narrative arc, not a feature list.

Slides 1–2 establish scale and credibility: the hero is bold and minimal — one headline, one CTA — and the "Scale of Opportunity" section immediately anchors the property with quantified proof. Animated counters earn attention; the catchment map and demographic cards translate "big numbers" into "relevant audience."

Slides 3–6 sell the product categories, each with a distinct visual treatment. Retail and Expo use static split panels (the content is architectural; it doesn't need motion). Luxury and Dining use video panels because atmosphere is the product. Entertainment goes full-bleed background video because the entertainment offer is inherently kinetic.

Slides 7–8 reframe the property as a platform. The "Your Global Platform" section isn't about the building anymore — it's about what a brand or event can achieve by being part of it. This is where sponsorship and activation conversations begin, so the copy and CTAs shift from informational to transactional.

The footer / contact section is intentionally minimal and functional — at this point in the journey, a prospect has already decided whether they're interested; the job is to make next steps frictionless.

---

## Cinematic Experience Decisions

The intro sequence runs for 3.5 seconds. That is not arbitrary — it is the minimum time needed for a staggered 4-element reveal (eyebrow, title, rule bar, tagline) to feel intentional rather than rushed, and for the Ken Burns zoom to register as purposeful motion rather than jitter. A "SKIP TO DECK" button is always present for repeat viewers, but the sequence auto-proceeds, so nobody gets stranded.

The splash screen between intro and deck is a deliberate gate, not a load screen. It gives the user a moment of orientation after the cinematic cold open before they enter an interactive environment with multiple navigation modalities. The 1.2 second auto-proceed means it does not feel like friction.

The dark colour palette (`#0a0a0a` background, warm `#f5f0e8` text, `#cba153` gold accent) was chosen to serve the photography: all assets are dark-toned architectural images and cinematic renders. A dark interface makes the imagery feel embedded rather than framed. The gold accent colour mirrors the luxury positioning of the property without looking like pastiche.

Cinzel was chosen for headings specifically because it carries weight without being aggressive — it reads as timeless rather than dated, which matters for a property pitching long-term tenancy relationships.

---

## UX & Navigation Philosophy

The primary navigation metaphor is a presentation, not a website. Visitors do not browse; they advance. The scroll-snap architecture enforces this: every scroll event moves exactly one section, preventing the ambiguous half-visible states that bleed information across sections and dilute impact.

Every input modality a presenter might use is wired up: keyboard arrows (laptop), Page Up/Down (clicker), number keys 1–9 (direct jump to any chapter), mouse wheel (desktop), touch swipe (tablet). Arrow buttons in the overlay cover the "click to advance" use case for touchscreens. The sidebar dots double as a progress indicator and a quick-jump navigator. None of these navigation paths feel bolted on — they are all first-class.

The side navigation intentionally uses dot labels with `sr-only` text rather than visible chapter names. A visible chapter list would tell the viewer where they are going, removing the reveal. The slide counter and chapter name in the bottom bar provide orientation without spoiling the sequence.

Module overlays are the deck's expansion mechanism. Rather than navigating away or opening new tabs, CTAs surface an overlay panel that contains deep content — venue gallery, technical specs, booking forms — without breaking the presenter's place in the deck. Closing the overlay returns the user to exactly where they were.

---

## Video-First Approach

Video is used surgically, not as wallpaper. Three sections use full-bleed background video (hero, entertainment, events/platform); two use video as a side panel within a split layout (luxury, dining). The remaining four sections use static imagery because the content — maps, architectural photography, brand logos, specification data — does not benefit from motion.

The technical implementation is deliberate about performance. YouTube iframes use `data-src` and are only activated when the section scrolls into view. Even then, the initialisation is deferred to `requestIdleCallback` after `window.load` so the YouTube embed script never executes during the Lighthouse measurement window. The `.video-ready` class delay (3 seconds after `src` assignment) suppresses YouTube's pre-play thumbnail, which would otherwise flash the wrong visual state before autoplay begins.

AVIF fallback images beneath every iframe serve a dual purpose: they are the LCP element for Lighthouse, and they are the visible state if YouTube is blocked (common in corporate networks where this deck would actually be presented).

---

## AI Integration

All section imagery was generated with AI tools (Midjourney / DALL-E 3). The prompts were written to match the property's tone: cinematic, architectural, high contrast, dark backgrounds that sit well under a dark-mode overlay. No attempt was made to pass the imagery off as photography — "✨ AI Visual" badges are present on every generated image. This is honest and it sets appropriate expectations for prospects who would eventually engage with real photography.

AI-generated imagery allowed the project to have 11 distinct, high-quality visual assets without licensing costs or photography shoots. It also allowed rapid iteration on art direction — the luxury panel could be re-generated with a different tonal prompt in minutes.

---

## Technical Architecture

The project is a deliberately minimal stack: one HTML file, one CSS file, one JS module, built with Vite. No framework, no component library, no state manager. This is not a constraint-driven choice — it is the correct architecture for a static presentation that needs to load fast, render on any device, and never break due to a dependency update.

The JavaScript is organised into four discrete init functions: `initIntroSequence`, `initDeck`, `initStatsCounter`, `initModules`. Only `initIntroSequence` runs on `DOMContentLoaded` (because the skip button must be responsive immediately). The other three are deferred to `requestIdleCallback`, which means all observer setup, listener attachment, and DOM querying happens after the LCP element has already been measured and painted.

CSS custom properties drive the entire design system — colours, spacing, typography, and animation timing all flow from variables defined at `:root`. This made iterating on the visual design fast and kept the stylesheet coherent at ~2,400 lines without becoming unmaintainable.

---

## Performance Optimisation

Three successive passes brought Lighthouse Performance from an initial ~60 to the 90+ target.

**Pass 1 — Foundation:** `fetchpriority="high"` on the LCP image, `decoding="async"` on all images, reduced Google Fonts weight variants, `dns-prefetch` hints.

**Pass 2 — Images and deferral:** Converted all 11 PNG assets to WebP via Sharp (−81.8% total weight). Deferred YouTube iframe initialisation to `requestIdleCallback` post-`window.load`. Async Google Fonts loading via `media="print"` → `onload` swap to eliminate render-blocking. Added explicit `width`/`height` on the LCP `<img>` to prevent layout shift. Added `vercel.json` with `max-age=31536000, immutable` on all assets.

**Pass 3 — AVIF and JS deferral:** Converted all WebP assets to AVIF at quality 50 (−27.9% additional reduction; hero goes from 195KB to 137KB). Wrapped all `<img>` tags in `<picture>` elements with AVIF → WebP source ordering. Added dual preload hints for the hero image (AVIF and WebP; browsers fetch only the supported type). Updated CSS background references to AVIF. Deferred all non-critical JS initialisation (`initDeck`, `initStatsCounter`, `initModules`, `initVideoFallback`) to `requestIdleCallback`.

The most impactful single change across all three passes was deferring YouTube's embed script. It removed approximately 500KB of synchronous JS execution from the TBT measurement window.

---

## What Was Improved During Iteration

Several things changed significantly from the initial version:

**The intro sequence** started as a simple fade-in and was rebuilt into a staggered multi-element cinematic reveal with a Ken Burns background — the added complexity justified itself because the intro is the first impression and sets the tone for the entire presentation.

**Form submission feedback** was initially generic ("Request Received"). This was replaced with a contextual success system that generates different confirmation copy for each of the four inquiry types, because a prospect booking a 5,000-person concert should see different language than one requesting a retail leasing brochure.

**Navigation** was initially keyboard-and-dot only. Overlay arrow buttons and touch swipe support were added after considering the full range of presentation contexts (presenter with a clicker, salesperson sharing a tablet, remote viewer on mobile).

**The overlay architecture** started as a single events module and was expanded to four overlays with independent trigger classes, allowing multiple CTAs across different slides to open the appropriate module without any coupling between slides.

---

## What Would Be Added With More Time

The two gaps that matter most commercially are a real form backend and analytics. Right now forms simulate submission — a lead captured in this deck goes nowhere. Wiring to Resend (transactional email) and a CRM would make the deck production-deployable for an actual sales team. Plausible analytics would show which sections drive the most engagement and which CTAs convert, closing the feedback loop between presentation design and pipeline outcomes.

On the technical side, GSAP ScrollTrigger would unlock more choreographed reveal animations — the current CSS keyframe approach works well but limits what's possible in terms of scrubbing animations against scroll position. A headless CMS integration would remove the developer from the content update loop, which matters for a property where tenant rosters and availability change frequently.

The architecture is deliberately built to accommodate these additions without restructuring — the module overlay system is already the expansion point for deeper content, and the trigger class naming convention (`btn-events-trigger`, `btn-leasing-trigger`) means new CTAs can be wired to existing overlays with a single class added in HTML.
