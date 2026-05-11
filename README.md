# American Dream | The Global Destination

An interactive, high-performance sales deck and presentation platform built to showcase the sheer scale, luxury, and commercial potential of the American Dream mega-mall. 

## 🚀 Live Demo
[View Live on Vercel](https://mall-screening-project.vercel.app/)

## 🎨 Design Decisions & UX Strategy
This project was designed with a "luxury-first" approach to appeal to high-net-worth brands, corporate sponsors, and event organizers. 
* **Dark Mode Aesthetic:** A deep black (`#030303`) background paired with a sophisticated metallic gold gradient (`#cba153` to `#e8d08c`) creates a premium, cinematic feel.
* **Typography:** Utilizes **Cinzel** for striking, elegant headers (evoking heritage luxury) and **Outfit** for clean, highly legible body copy.
* **Cinematic Video:** Uses looping YouTube iframe embeds with fallback AI-generated poster images (to bypass restrictive browser autoplay policies and ensure mobile/Vercel compatibility).
* **Scroll-Triggered Animations:** Statistics and text elements reveal smoothly on scroll using `IntersectionObserver`, creating an engaging narrative flow.

## 🛠 Tech Stack
* **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+). No heavy frameworks, ensuring lightning-fast load times and perfect Lighthouse performance scores.
* **Typography:** Google Fonts API.
* **Deployment:** Vercel (CD/CI connected to GitHub `main` branch).
* **Architecture:** Modular single-page application (SPA) design with expandable DOM overlays for deep-dive sections (Events & Sponsorship).

## 🤖 AI Integration & Asset Generation
This project heavily leveraged AI tools to accelerate development and enhance visual fidelity:
* **Generative AI (Gemini / Midjourney equivalents):** Used to generate high-resolution (8K), hyper-realistic fallback imagery for the Hero and Entertainment sections (`hero_fallback.png` and `ent_fallback.png`) to ensure a flawless visual experience even when video embeds are blocked by network policies.
* **Agentic Coding:** Used to rapid-prototype the DOM structure, optimize CSS animations, and debug cross-browser scroll-snap inconsistencies.

## ⚙️ Setup Instructions
To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Pratikdesai4/Mall-Screening-Project.git
   cd "Mall Screening Project"
   ```
2. Start a local web server (Python recommended):
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and navigate to:
   `http://localhost:8000`

## 📈 Phase 2 Expansion
The platform includes a modular architecture designed for scalability. The **Events & Activations** and **Sponsorship & Partnerships** modules are built as non-blocking CSS overlays that can be expanded dynamically without requiring a page reload or disrupting the primary narrative flow.
