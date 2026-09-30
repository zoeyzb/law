# Continuous GhostFibers redesign

## Objective and assumptions
Improve the existing reusable Vantage law-firm concept. Keep all supplied React Bits components available and integrated; unify the full page with emerald fibers and champagne gold. Real firm identity/contact details are still unconfigured; never invent credentials, results, reviews or submission success.

## Acceptance
- One fixed GhostFibers renderer persists behind every section and footer; no opaque full-width color cuts.
- Hierarchy: hero, expertise, process, approach, questions, preparation. Clear mobile practice selection.
- Restrained GSAP ScrollTrigger depth/zoom, R3F + Drei sculpture, Motion controls; reduced motion and pause controls.
- No hover-only information or inaccessible practice controls. Layout fits 320–1440px and browser zoom.
- Preserve source components, license notices and existing interactions; meaningful no-WebGL fallback.
- Production build and deployed interactions verified; report GPU limits honestly.

## Architecture / commands
Vite + React 19. `src/Experience.jsx` composes the page, `src/experience.css` layout, `src/continuous.css` cohesive theme; new stage/background modules isolate effects. `npm run build`; `npm run dev -- --port 5173`.

## Implementation sequence
1. Audit source and live transitions.
2. Move background to application root; unify surfaces, typography, spacing and content.
3. Add scroll direction/depth and sculpture; fix mobile/keyboard/state retention.
4. Build, publish preview, test browser flows, commit and push.

## Boundaries / style
Use focused React functions (`function Scene() { return <Canvas />; }`), hooks with cleanup, semantic buttons. Always cap rendering cost and preserve no-motion access. Ask only for real firm details when enabling intake. Never collect or transmit client information through an unconfigured demo.

## Verification
Check page-wide background, practice switching both views, process navigation, checklist, FAQ, keyboard navigation, menu, responsive layout and console errors. Check source/bundle for lazy heavy dependencies. No fake performance or trust scores.
