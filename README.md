# Vantage Legal — adaptable law firm website concept

An immersive, responsive law firm site concept with a GhostFibers hero, an interactive practice explorer, a guided process, editorial perspective, FAQ, and a final lens. Vantage is a demonstration identity, not an actual law firm. No results, reviews, lawyers, or contact destination are fabricated.

## Local development

```sh
npm ci
npm run dev
npm run build
```

## Components and provenance

The supplied React Bits source is in `src/components/reactbits/` (27 distinct components; the two `undefined` entries in the attachment both referred to ThoughtLine). Its license is included in `REACT-BITS-LICENSE.md`. We adapted colors, keyboard access, images, and the 3D model for this website. The supplied Magic UI review marquee was reimplemented as a principle strip with no fictitious testimonials.

The components are placed by purpose:

- Hero: GhostFibers, TrueFocus, MagicRings, SpecularButton, StarBorder, SplitFlapText, optional SplashCursor.
- Expertise: LogoLoop, RubberSegment, LineSidebar, MorphSlider, FlexCarousel, PixelTransition.
- Method: CountUp, Counter, Stepper, BorderGlow, ThoughtLine, SpringCheck.
- Perspective: ScrollVelocity, TechText, DitherVeil, MaskedHeading, CurvedLoop.
- Questions and close: ParticleText, ElectricBorder, FluidGlass, marquee.

GPU components use dynamic imports and mount in view or on demand. Browsers without WebGL2 get a non-photographic fiber fallback and functional alternative controls. Reduced-motion users get still effects. The 3D lens uses a local model and local abstract imagery. The site does not fetch external images, fonts, analytics, or tracking.

## Tailor for a real firm

Update `src/content.js`, the Vantage identity in `src/Experience.jsx`, and metadata in `index.html`. Verify practice areas, attorneys, jurisdictions, intake channel, privacy policy, and applicable advertising rules before presenting a variant as a real firm. The concept intentionally does not collect confidential client information or imply representation.
