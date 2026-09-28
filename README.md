# Vantage Legal website concept

A fast, responsive, reusable law firm website concept. Vantage is a demonstration identity; no real lawyer, results, reviews, or client relationship is represented.

## Run

```sh
npm install
npm run dev
npm run build
```

## Adapt for a firm

- Edit `src/content.js` for verified firm name, practice areas, process, FAQs, email, and phone.
- Replace the concept identity and meta title in `index.html` and the footer in `src/main.jsx`.
- Confirm attorney advertising rules, jurisdiction details, privacy and accessibility requirements before publishing for a real firm.
- If a verified email is set, the contact action opens an email draft. Without it, the site intentionally avoids collecting prospective clients' information.

## Design and component notes

The submitted React Bits catalog influenced the use of focus, border, reveal, transition, tab and step interactions. These interactions are rewritten with lightweight React and CSS to keep the landing page quick. The supplied review marquee is omitted because the sample quotes are fictional. WebGL components and cursor effects were not bundled in this version because rendering all of them on the landing page would compromise performance and accessibility. Two catalog entries are named `undefined` and cannot be integrated as identifiable components.

Architecture artwork was generated for this concept and is served locally as a compressed WebP file. No external font, analytics, or tracking requests are required.
