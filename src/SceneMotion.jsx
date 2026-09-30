import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

export default function SceneMotion({ paused }) {
  useEffect(() => {
    if (paused) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false, anchors: { offset: -100 } });
    const tick = time => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    const context = gsap.context(() => {
      gsap.to('.world-scene', { scale: 1.18, rotation: 5, ease: 'none', scrollTrigger: { trigger: 'main', start: 'top top', end: 'bottom bottom', scrub: 1.5 } });
      gsap.to('.hero-copy', { y: -45, ease: 'none', scrollTrigger: { trigger: '.exp-hero', start: 'top top', end: 'bottom top', scrub: 1 } });
      gsap.to('.hero-art', { scale: 1.25, y: 60, rotation: -12, ease: 'none', scrollTrigger: { trigger: '.exp-hero', start: 'top top', end: 'bottom top', scrub: 1.2 } });
      gsap.fromTo('.dither-panel', { scale: .92, borderRadius: 80 }, { scale: 1, borderRadius: 4, ease: 'none', scrollTrigger: { trigger: '.dither-panel', start: 'top 95%', end: 'center center', scrub: 1 } });
      gsap.utils.toArray('.exp-heading-row, .questions-grid, .prepare, .next-layout').forEach(el => {
        gsap.from(el, { y: 32, duration: .9, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 94%', once: true } });
      });
      gsap.to('.reading-progress', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: 'main', start: 'top top', end: 'bottom bottom', scrub: true } });
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    return () => { window.removeEventListener('load', refresh); context.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
  }, [paused]);
  return null;
}
