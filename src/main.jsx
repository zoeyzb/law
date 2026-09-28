import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { firm, practiceAreas, steps, faqs } from './content';
import './style.css';

function Arrow({ diagonal = false }) { return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span>; }

function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }, { threshold: .12 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="header" id="top">
    <a className="brand" href="#top" aria-label="Vantage Legal, back to top"><span className="brand-symbol" aria-hidden="true">V<span>.</span></span><span className="brand-type">{firm.name}<small>{firm.descriptor}</small></span></a>
    <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'CLOSE' : 'MENU'}<span aria-hidden="true">{open ? '×' : '+'}</span></button>
    <nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation" onClick={() => setOpen(false)}>
      <a href="#expertise">Expertise</a><a href="#approach">Our approach</a><a href="#questions">Questions</a><a className="nav-contact" href="#contact">Get in touch <Arrow diagonal /></a>
    </nav>
  </header>;
}

function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-image" role="img" aria-label="Architectural stone columns in warm evening light" />
    <div className="hero-shade" />
    <div className="hero-content wrap">
      <div className="hero-topline"><span className="eyebrow"><span className="rule" /> COUNSEL WITH PERSPECTIVE</span><span className="hero-index">01 / A DIFFERENT VIEW</span></div>
      <h1 id="hero-title">When it matters,<br /><em>move with clarity.</em></h1>
      <div className="hero-bottom"><p>Thoughtful legal counsel begins with listening, asks better questions, and finds a path forward.</p><a className="round-link" href="#expertise" aria-label="Explore our expertise"><Arrow diagonal /></a></div>
      <div className="hero-foot"><span>LEGAL COUNSEL, CONSIDERED.</span><a href="#intro">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a></div>
    </div>
  </section>;
}

function Intro() { return <section className="intro section-pad" id="intro"><div className="wrap intro-grid"><Reveal><div className="section-label"><span>01 / THE PERSPECTIVE</span><span className="label-line" /></div></Reveal><Reveal><p className="intro-statement">The right legal partner does more than explain the law. <em>They help you see what’s possible.</em></p><div className="intro-aside"><span className="ornament" aria-hidden="true">✳</span><p>Every matter is different. The best place to begin is with the details that make yours unique.</p></div></Reveal></div></section>; }

function Practice() {
  const [active, setActive] = useState(0);
  return <section className="practice section-pad" id="expertise" aria-labelledby="practice-title"><div className="wrap">
    <Reveal><div className="section-label"><span>02 / WHERE WE FOCUS</span><span className="label-line" /></div><div className="section-head"><h2 id="practice-title">The counsel you need.<br /><em>The attention you deserve.</em></h2><p>Explore the types of matters this adaptable template can present. Each firm should tailor these areas to its actual services.</p></div></Reveal>
    <div className="practice-grid"><div className="practice-list" role="tablist" aria-label="Practice areas">{practiceAreas.map((item, i) => <button key={item.id} role="tab" id={`tab-${i}`} aria-controls="practice-panel" aria-selected={active === i} className={`practice-item ${active === i ? 'active' : ''}`} onClick={() => setActive(i)}><span className="number">{item.id}</span><span>{item.title}</span><Arrow diagonal /></button>)}</div>
      <div className="practice-detail" id="practice-panel" role="tabpanel" aria-labelledby={`tab-${active}`} key={active}><div className="detail-mark" aria-hidden="true">{practiceAreas[active].id}</div><span className="detail-kicker">PRACTICE AREA / {practiceAreas[active].id}</span><h3>{practiceAreas[active].summary}</h3><p>{practiceAreas[active].detail}</p><div className="tags">{practiceAreas[active].tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
    </div>
  </div></section>;
}

function Statement() { return <section className="statement" aria-label="Our point of view"><div className="wrap statement-inner"><span className="statement-label">OUR POINT OF VIEW</span><p>Good advice changes<br />the <em>whole picture.</em></p><span className="statement-flourish" aria-hidden="true">✳</span></div></section>; }

function Approach() {
  const [active, setActive] = useState(0);
  return <section className="approach section-pad" id="approach"><div className="wrap"><Reveal><div className="section-label"><span>03 / THE WAY FORWARD</span><span className="label-line" /></div><div className="approach-title"><h2>A clear path starts<br /><em>with a conversation.</em></h2><p>We believe the process should make a difficult moment feel more understandable, one decision at a time.</p></div></Reveal>
    <div className="stepper" role="tablist" aria-label="Our process">{steps.map((step, i) => <button key={step.number} className={`step ${active === i ? 'active' : ''}`} role="tab" aria-selected={active === i} aria-controls="step-panel" id={`step-tab-${i}`} onClick={() => setActive(i)}><span className="step-number">{step.number}</span><span className="step-name">{step.title}</span><span className="step-plus" aria-hidden="true">{active === i ? '−' : '+'}</span></button>)}</div>
    <div className="step-panel" id="step-panel" role="tabpanel" aria-labelledby={`step-tab-${active}`}><span className="panel-number">/{steps[active].number}</span><p>{steps[active].text}</p></div>
  </div></section>;
}

function Questions() { const [active, setActive] = useState(null); return <section className="questions section-pad" id="questions"><div className="wrap question-grid"><Reveal><div className="section-label"><span>04 / GOOD TO KNOW</span><span className="label-line" /></div><h2>Before we<br /><em>begin.</em></h2><p>Some useful answers before starting a conversation.</p></Reveal><div className="faq-list">{faqs.map((item, i) => <div className="faq" key={item.q}><h3><button aria-expanded={active === i} aria-controls={`faq-${i}`} onClick={() => setActive(active === i ? null : i)}><span>{item.q}</span><span className="faq-icon" aria-hidden="true">{active === i ? '−' : '+'}</span></button></h3>{active === i && <p id={`faq-${i}`}>{item.a}</p>}</div>)}</div></div></section>; }

function Contact() { return <section className="contact" id="contact"><div className="wrap contact-inner"><div><span className="eyebrow">05 / THE NEXT STEP</span><h2>Let’s begin with<br /><em>your story.</em></h2></div><div className="contact-right"><p>When this template is adapted for a firm, its verified contact information and intake process belong here.</p>{firm.email ? <a className="contact-action" href={`mailto:${firm.email}`}>Start a conversation <Arrow diagonal /></a> : <a className="contact-action" href="#top">Explore the site <Arrow diagonal /></a>}</div></div></section>; }

function Footer() { return <footer className="footer"><div className="wrap"><div className="footer-top"><a className="footer-brand" href="#top">V<span>.</span></a><span>COUNSEL FOR WHAT COMES NEXT.</span><a href="#top">BACK TO TOP ↑</a></div><div className="footer-bottom"><span>VANTAGE LEGAL / WEBSITE CONCEPT</span><span>General information only. No attorney–client relationship is created by this site.</span><span>© {new Date().getFullYear()} VANTAGE</span></div></div></footer>; }

function App() { return <><a className="skip" href="#intro">Skip to content</a><Header /><main><Hero /><Intro /><Practice /><Statement /><Approach /><Questions /><Contact /></main><Footer /></>; }

createRoot(document.getElementById('root')).render(<App />);
