# Hale Marchetti Reyes — Criminal Defense (Concept Demo)

This repository now contains the supplied single-file cinematic law-firm website.

**Concept only:** The firm, people, credentials, case outcomes, reviews, addresses, and numbers depicted in the website are fictional. The contact form validates locally but **does not submit or store information**. Do not use as a working law-firm intake system without verified firm details and an authorized, secure backend.

## Run locally

Open `index.html` directly in a browser, or run `npm run build` and serve `dist/`.

## Deployment

- GitHub Pages: use the repository root on `main` (static `index.html`).
- Vercel: `npm run build` outputs `dist/`. No framework or runtime environment variables required.

The site includes user-supplied HTML, CSS and JavaScript. Its Three.js and GSAP dependencies are loaded from cdnjs; remote images are loaded from Wikimedia and randomuser.me, so internet access is needed for the full experience. Test performance, accessibility, image usage rights, and legal advertising compliance before adapting it for a real firm.

## Previous version

The previous Law Your Way Vite/React site is preserved on branch `backup/pre-hmr-2026-10-19`.
