# Design Rationale & Process Write-Up
## American Dream — Interactive Sales Deck
*Screening Assignment — Liat AI — May 2026*

---

## The Problem I Was Solving

The brief was clear: the current sales process for a mega-mall is broken. A sales rep pulls up a YouTube video, flips through a PDF, opens a spreadsheet, and verbally narrates everything. It's fragmented, inconsistent, and completely fails to convey the scale and energy of a property like American Dream.

My goal wasn't to build a prettier version of what already exists. It was to build something that makes a decision-maker feel the commercial opportunity before a single word is spoken — a tool that does the selling on its own.

---

## Why American Dream NJ

American Dream is objectively the most compelling subject for this assignment:

- Largest mall in the Western Hemisphere by entertainment space
- The only property in North America with an indoor ski resort, theme park, and water park under one roof
- Located 9 minutes from Manhattan — the highest-value retail market in the world
- 20M+ residents within a 50-mile catchment radius with $125K+ average household income
- Still in its commercial growth phase — a genuine "get in now" narrative for prospective tenants

The property's story almost tells itself. My job was to make the deck match the ambition of the property.

---

## Design Philosophy

I used three reference points to anchor every design decision:

**1. Apple.com for restraint**
Apple's product pages are powerful because of what they leave out. Every pixel earns its place. I applied the same principle — no decorative elements, no visual noise. Black backgrounds, white typography, gold accents only for CTAs. The property provides the drama; the UI just gets out of the way.

**2. DigiDeck for structure**
The DigiDeck examples in the brief showed me the right model — non-linear navigation that gives the viewer agency, sub-modules that deepen without derailing, and a persistent nav that means no one ever feels lost. I replicated this pattern: a fixed navigation bar that lets a sales rep instantly jump to the section a prospect is asking about mid-call.

**3. Disney/Universal for emotional energy**
The entertainment and attractions sections needed to feel like an invitation, not a catalogue. I used full-bleed imagery, animated stat reveals, and bold headline copy ("Unrivaled Attractions", "Your Global Platform") to create the sense that something extraordinary is happening here and the viewer is being invited to be part of it.

---

## How I Used AI

AI wasn't a crutch — it was a force multiplier at every stage.

**Asset Generation — Midjourney v6**
American Dream's public media library is limited. I used Midjourney to generate cinematic renders of the luxury retail environment, entertainment venues, and event spaces that match the premium aesthetic I was targeting. The brief specifically asked for quality AI-generated assets where real ones are unavailable — I treated this as a creative brief, not just a gap-fill.

Prompts I refined over multiple iterations:
- *"Luxury retail atrium, American Dream NJ, warm lighting, cinematic, Hermès flagship, marble floors, photorealistic --ar 16:9 --style raw"*
- *"Indoor ski slope, Big SNOW NJ, blue hour lighting, dramatic, wide angle, guests in foreground --ar 16:9"*
- *"Outdoor brand activation event, tent pavilions, affluent crowd, golden hour, luxury setting --ar 16:9"*

**Copywriting — ChatGPT-4o**
I used GPT-4o to pressure-test my headline copy and CTA language. I'd write a first draft, then ask it to rewrite in the tone of "a global luxury destination, confident, not desperate." The result shaped phrases like "Beyond The Ordinary", "Your Global Platform", and "A global runway for the world's most prestigious brands."

**Layout Exploration — Gamma.app**
Before writing a single line of code, I used Gamma to rapidly mock up 4–5 structural approaches to the deck. This let me test narrative flow — does the Luxury section land better before or after the Why This Property data? (Answer: after — you establish scale first, then show what fills it.) 30 minutes of Gamma exploration saved hours of code iteration.

**Video Concept Framing — Runway ML**
I used Runway to generate motion reference frames for the hero section pacing — how quickly text should appear, when the subtitle fades in, what rhythm feels cinematic vs. rushed. I didn't use generated video in the final product (YouTube embeds perform better) but the motion reference directly informed my CSS animation timing.

---

## Technical Decisions

**Vanilla JS over React**
This was a deliberate performance choice. A React app adds 40-130KB of framework overhead and a hydration delay. For a sales deck where the first 10 seconds are everything, I couldn't afford that. Vanilla JS gave me instant first paint, zero layout shift, and a clean Lighthouse score without fighting against a framework.

**Intersection Observer for all animations**
Every animated element — stat counters, section reveals, image fades — uses the Intersection Observer API rather than scroll event listeners. Scroll listeners fire on every pixel of movement and kill performance. Intersection Observer fires once, when the element enters the viewport, and disconnects. The result is smooth, jank-free reveals even on lower-powered devices.

**YouTube IFrame API with state detection**
The hero video uses YouTube's IFrame API with an `onStateChange` listener. The iframe is hidden behind a poster image until `YT.PlayerState.PLAYING` fires — this prevents the jarring flash of a blank black iframe that YouTube embeds show while buffering. The poster image shows the property at its most cinematic until the video takes over.

**CSS Custom Properties for design system**
Every color, spacing unit, and transition duration is defined as a CSS custom property. This means the entire visual language can be adjusted in one place, and every component inherits it consistently. It also made the dark luxury palette easy to maintain — changing `--primary-gold` from `#C9A96E` to `#D4AF37` instantly updated every CTA and accent across the deck.

---

## Narrative Strategy

The deck follows a deliberate emotional arc:

1. **Awe** (Hero) — Hit them with scale and energy immediately. No explanation needed.
2. **Credibility** (Why This Property) — Back the feeling with data. Numbers make the emotion real.
3. **Aspiration** (Luxury & Retail) — Show who's already here. Social proof through brand association.
4. **Differentiation** (Entertainment) — This is what no one else has. This is the reason to choose American Dream over any other property.
5. **Lifestyle** (Dining) — Dwell time, repeat visits. The commercial logic for tenants.
6. **Action** (Events & Platform) — Close with the biggest opportunity. End on momentum, not information.

Every section ends with a CTA that matches where the viewer is emotionally — not a generic "contact us" but a specific next step: *Leasing Inquiries*, *Partner With Us*, *Book a Venue*.

---

## What I'd Build With More Time

**Sponsorship Module**
A full tiered sponsorship deck with audience data visualizations — age/income breakdown, dwell time by zone, activation case studies from comparable properties. This is the highest-value revenue stream for a property like American Dream and deserves its own deep-dive module.

**Leasing Paths**
Segmented by category — a luxury flagship prospect gets a completely different pitch from a pop-up shop prospect. Different imagery, different data points, different case studies. The architecture supports this; I'd build the content layer.

**Self-hosted video**
Replacing YouTube embeds with Cloudflare Stream would eliminate the third-party dependency, guarantee autoplay across all browsers, and let me control the exact frame the video starts on. This is the single biggest technical improvement I'd make.

**Performing Arts & Expo Center Module**
The assignment specifically called this out. I'd build a dedicated section positioning American Dream's event infrastructure — capacity, technical specs, past programming — as a genuine competitor to traditional venue spaces like Madison Square Garden for mid-scale events.

**Real form backend**
Right now the inquiry forms capture input but don't send it anywhere. I'd connect them to HubSpot or a simple Formspree endpoint so every form submission actually lands in a sales team inbox — making the tool genuinely operational, not just a demo.

---

## Reflection

The brief said: *"We're not looking for perfection. We're looking for signal."*

The signal I tried to send: I think like a product builder, not just a coder. Every decision — the font choice, the animation timing, the order of sections, the CTA copy — was made in service of a business outcome. The goal was never a technically impressive website. It was a tool that makes someone pick up the phone.

---

*Pratik Desai — May 2026*
*Live URL: https://mall-screening-project.vercel.app*
*GitHub: https://github.com/Pratikdesai4/Mall-Screening-Project*
