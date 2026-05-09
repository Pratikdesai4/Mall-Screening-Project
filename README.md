# American Dream | Interactive Sales Deck

A fully interactive, browser-based sales deck designed for the American Dream mall in New Jersey. This tool replaces traditional static PDFs and fragmented video presentations with a single, seamless, high-end "Digideck" experience aimed at prospective retail tenants, corporate sponsors, and event promoters.

## 🚀 Live Demo
[https://mall-screening-project.vercel.app](https://mall-screening-project.vercel.app)

## 🛠️ Tech Stack
- **Core**: HTML5, Vanilla JavaScript (ES6+).
- **Styling**: Pure CSS (No Tailwind) using modern features like CSS Variables, Flexbox, CSS Grid, and custom animations.
- **Build Tool**: Vite (for lightning-fast HMR and optimized production bundling).
- **Assets**: Generative AI via Google Deepmind Gemini for high-fidelity architectural and experiential concept imagery.

## 🏃‍♂️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/american-dream-deck.git
   cd "american-dream-deck"
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   *The server will start on `http://localhost:5173/`.*

4. **Build for Production**
   ```bash
   npm run build
   ```

## 🎨 Design Decisions
- **Luxury Aesthetic**: We opted for a "dark mode" base (`#0a0a0a`) with muted gold (`#c5a059`) and silver (`#a8a8a8`) accents to mimic the premium feel of high-end brands (Hermès, Gucci) housed within the mall.
- **Typography**: Used Google Font **Outfit** to provide a clean, modern, and highly legible typographic hierarchy.
- **Non-Linear Navigation**: The side-dot navigation allows salespeople to jump seamlessly to relevant sections without forcing the client through a rigid slide progression.
- **Performance First**: Animations are handled via the native `IntersectionObserver` API rather than heavy third-party libraries (like GSAP), ensuring a 90+ Lighthouse score and zero scroll jank. Images are natively lazy-loaded.

## 🤖 AI Tools Used
- **Google Gemini Deepmind (Antigravity)**: Used as the primary agent for full-stack code generation, structural planning, and problem-solving.
- **Generative AI Imagery**: Used to create all cinematic visual assets including the hero twilight shot, the luxury retail wing, the dynamic water park/theme park collage, and the Events Module highlights.

---
*Built as a technical evaluation project.*
