# Sudalai Rajan — AI Engineer & GenAI Developer Portfolio

A premium, responsive personal portfolio with **five dashboards**, built with plain **HTML, CSS and JavaScript**. No build tools, no backend — it runs directly on GitHub Pages.

## Dashboards

| Page | File | Features |
|------|------|----------|
| Home | `index.html` | Hero, typing animation, quick facts, skill badges, featured projects, GitHub/LinkedIn links |
| About Me | `about.html` | Career objective, education, grouped skills, learning roadmap, interests, timeline |
| Projects | `projects.html` | Search bar, category filters (Python, Web Development, AI/ML, Other), project cards, empty state |
| AI Lab | `ai-lab.html` | AI concept explorer + 3 browser demos: rule-based chatbot, text analyser, idea generator |
| Contact | `contact.html` | Social cards, validated contact form (mailto), copyable email field |

Shared: sidebar navigation with active page indicator, mobile menu, light/dark theme saved in `localStorage`, scroll animations, footer.

## Technologies
HTML5, CSS3 (glassmorphism, CSS variables, responsive grid), vanilla JavaScript, Google Fonts (Space Grotesk, JetBrains Mono).

## Folder structure
```
sudalai-rajan-portfolio/
├── index.html
├── about.html
├── projects.html
├── ai-lab.html
├── contact.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js        (sidebar, theme, footer, animations, social links)
│   ├── js/projects.js    (project list + search/filter)
│   ├── js/ai-lab.js      (concept explorer + demos)
│   └── images/hero-ai.jpg
├── README.md
├── DEPLOYMENT.md
├── LICENSE
└── .gitignore
```

## Run locally
1. Extract the ZIP and open the folder in VS Code.
2. Double-click `index.html` to open it in your browser, **or** install the "Live Server" extension, right-click `index.html` → *Open with Live Server*.
3. Alternative: `python -m http.server 8000` then visit http://localhost:8000

## Editing
- **Profile text:** edit the text directly in each `.html` file.
- **Social links:** change `PROFILE` at the top of `assets/js/main.js` (sidebar & footer) and the links in `index.html` / `contact.html`.
- **Email address:** set `CONTACT_EMAIL` near the bottom of `contact.html`.
- **Add a project:** open `assets/js/projects.js`, copy one `{ ... }` block in `PROJECTS`, and edit `title`, `repo`, `demo` (only if a live demo really works), `category`, `tech`, `description`. Set `featured: true` to show it on the Home page.
- **Project descriptions:** the starter descriptions are neutral placeholders — replace them with accurate summaries from each repository.

## Contact form
GitHub Pages has no server, so the form opens the visitor's email app (`mailto:`). To receive messages directly, sign up for a free form service such as Formspree, then change the form to `<form action="https://formspree.io/f/YOUR_ID" method="POST">` and remove the mailto script. Never put passwords or secret keys in this code.

## Deploy
See [DEPLOYMENT.md](DEPLOYMENT.md). Expected URL: `https://sudalairajan100-max.github.io/sudalai-rajan-portfolio/`

## Push future updates
```bash
git add .
git commit -m "Update portfolio"
git push
```
GitHub Pages redeploys automatically within a minute or two.
