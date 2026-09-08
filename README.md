# Yoon Shwe Yee — Portfolio

A responsive, scroll-driven portfolio that presents Yoon Shwe Yee's profile, education, experience, projects, and technical skills as a modern galaxy signal map.

Live site: [https://yoonshweyee.pages.dev](https://yoonshweyee.pages.dev)

## Experience

- A static rocket on the opening screen, with no pilot or journey animation.
- A glowing profile signal is visible before scrolling.
- Constellation nodes grow continuously as their sections approach the viewport.
- Animated scan rings, light trails, icons, and stars identify each portfolio section.
- Every section previews the next destination signal in the opposite corner.
- Interactive technical-skill tabs reveal the languages and tools for each category.
- Project case studies show portal responsibilities, workflows, and clearly labeled GitHub links.
- Alternating left/right compositions keep the journey easy to follow.
- Reduced-motion support and a simplified responsive mobile layout.

## Portfolio map

1. Professional Profile
2. Education
3. Professional Experience
4. Project
5. Technical Skills
6. Contact and Interests

## Technology

- HTML5
- JavaScript
- Tailwind CSS
- Lucide icons
- Cloudflare Pages

## Project structure

```text
portfolio/
├── public/
│   ├── index.html
│   ├── script.js
│   ├── styles.css
│   ├── logo.jpeg
│   ├── favicon.jpeg
│   └── CV.pdf
├── src/
│   └── input.css
├── package.json
└── wrangler.toml
```

## Run locally

```bash
npm install
npm run build
npm run dev
```

The local development site is served at `http://127.0.0.1:8788`.

## Deploy

```bash
npm run deploy
```

The Cloudflare Pages project name is `yoonshweyee`.

## Content updates

- Edit portfolio content and section order in `public/index.html`.
- Edit motion behavior in `public/script.js`.
- Edit visual styling and responsive behavior in `src/input.css`, then run `npm run build`.

## Assets

The Yoon logo, favicon, and CV are project-provided assets. They should not be redistributed outside this portfolio without permission.
