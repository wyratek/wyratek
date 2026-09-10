# wyratek.com — AI-Built Static Site (Learning Project)

A complete multi-page static website for **Wyratek**, a fictional sheet metal
fabrication machinery brand targeting the European & North American B2B market.
Built as an AI-assisted web development learning project.

## Stack

- **Pure static HTML/CSS/JS** — no build step, no framework
- Hosts anywhere static files work: GitHub Pages, Netlify, Vercel, nginx

## Site Map

| Page | Path | Purpose |
|---|---|---|
| Home | `index.html` | Hero, product overview, selection guide, cases, FAQ, quote form |
| Products | `pages/products.html` | 7 machine families with spec tables |
| Applications | `pages/applications.html` | 6 industries + automation |
| Resources | `pages/resources.html` | Buying guides, blog, FAQ |
| About | `pages/about.html` | Story, milestones, values |
| Contact | `pages/contact.html` | Quote / inquiry form |

## Structure

```
wyratek/
├── index.html              # Home
├── pages/                  # Inner pages
│   ├── products.html
│   ├── applications.html
│   ├── resources.html
│   ├── about.html
│   └── contact.html
├── assets/
│   ├── css/style.css       # Shared design system (all pages)
│   ├── js/main.js          # Nav, FAQ, form, selection guide
│   └── images/             # AI-generated demo product imagery
├── sitemap.xml
├── robots.txt
└── README.md
```

## Run Locally

Open `index.html` directly in a browser, or serve the folder:

```bash
# Python 3
cd wyratek
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a repo, e.g. `wyratek` (public).
2. Push this folder to the repo.
3. Repo Settings → Pages → Source: `main` branch, `/ (root)`.
4. Site will be live at `https://<your-username>.github.io/wyratek/`.

Update the sitemap URL (`https://<your-username>.github.io/wyratek/...`)
if your deployment path differs.

## SEO Notes (already applied)

- Per-page unique `<title>` + meta description + keywords
- Semantic HTML (`header`, `nav`, `section`, `article`, `footer`)
- `sitemap.xml` + `robots.txt`
- Open Graph tags on the home page
- Image `alt` text everywhere

## Learning Notes

This project demonstrates a complete AI-assisted build workflow:

1. **Strategy** — brand positioning, info architecture, keyword research
2. **Design system** — one shared CSS with design tokens (colors, type, spacing)
3. **Content** — AI-drafted English copy for the EU/US B2B audience
4. **Assets** — AI-generated product imagery (no real photos needed)
5. **Build** — multi-page static site, mobile responsive
6. **Verification** — local server preview + link checks
7. **Delivery** — GitHub Pages sharing

All company data (years, stats, case studies, specs) is **placeholder
demo content** for learning purposes only.
