import React, { Suspense, lazy, useEffect, useRef, useState, createContext, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { firm, practiceAreas, faqs } from './content';
import './experience.css';
import './continuous.css';
import WorldBackground, { EffectBoundary } from './WorldBackground';
import SceneMotion from './SceneMotion';
import { MotionConfig } from 'motion/react';
const QuietContext = createContext(false);
const GoldSculpture = lazy(() => import('./GoldSculpture'));

const bits = {
  GhostFibers: lazy(() => import('./components/reactbits/GhostFibers')),
  TrueFocus: lazy(() => import('./components/reactbits/TrueFocus')),
  MagicRings: lazy(() => import('./components/reactbits/MagicRings')),
  SplashCursor: lazy(() => import('./components/reactbits/SplashCursor')),
  StarBorder: lazy(() => import('./components/reactbits/StarBorder')),
  SpecularButton: lazy(() => import('./components/reactbits/SpecularButton')),
  SplitFlapText: lazy(() => import('./components/reactbits/SplitFlapText')),
  LogoLoop: lazy(() => import('./components/reactbits/LogoLoop')),
  ScrollVelocity: lazy(() => import('./components/reactbits/ScrollVelocity')),
  LineSidebar: lazy(() => import('./components/reactbits/LineSidebar')),
  RubberSegment: lazy(() => import('./components/reactbits/RubberSegment')),
  MorphSlider: lazy(() => import('./components/reactbits/MorphSlider')),
  FlexCarousel: lazy(() => import('./components/reactbits/FlexCarousel')),
  PixelTransition: lazy(() => import('./components/reactbits/PixelTransition')),
  ElectricBorder: lazy(() => import('./components/reactbits/ElectricBorder')),
  BorderGlow: lazy(() => import('./components/reactbits/BorderGlow')),
  CountUp: lazy(() => import('./components/reactbits/CountUp')),
  Counter: lazy(() => import('./components/reactbits/Counter')),
  Stepper: lazy(() => import('./ProcessStepper')),
  SpringCheck: lazy(() => import('./components/reactbits/SpringCheck')),
  ThoughtLine: lazy(() => import('./components/reactbits/ThoughtLine')),
  TechText: lazy(() => import('./components/reactbits/TechText')),
  ParticleText: lazy(() => import('./components/reactbits/ParticleText')),
  MaskedHeading: lazy(() => import('./components/reactbits/MaskedHeading')),
  DitherVeil: lazy(() => import('./components/reactbits/DitherVeil')),
  CurvedLoop: lazy(() => import('./components/reactbits/CurvedLoop')),
  FluidGlass: lazy(() => import('./components/reactbits/FluidGlass')),
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => { const query = matchMedia('(prefers-reduced-motion: reduce)'); const update = () => setReduced(query.matches); query.addEventListener('change', update); return () => query.removeEventListener('change', update); }, []);
  return reduced;
}

function Viewport({ children, className = '', fallback = null, rootMargin = '200px', keep = false }) {
  const ref = useRef(null); const [visible, setVisible] = useState(false);
  useEffect(() => { const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin }); observer.observe(ref.current); return () => observer.disconnect(); }, [rootMargin]);
  return <div ref={ref} className={className}><Suspense fallback={fallback}>{visible || keep ? children : fallback}</Suspense></div>;
}

function Bit({ name, fallback = null, ...props }) {
  const quiet = useContext(QuietContext);
  if (quiet) {
    if (name === 'TrueFocus') return <span className="static-focus">{props.sentence}</span>;
    if (name === 'SplitFlapText') return <span>LISTEN FIRST</span>;
    if (name === 'LogoLoop') return <div className="static-practices">{practiceAreas.map(p => <span key={p.id}>{p.title}</span>)}</div>;
    if (name === 'ScrollVelocity' || name === 'CurvedLoop') return <div className="static-band">LISTEN · UNDERSTAND · ACT</div>;
    if (name === 'TechText') return <h2>A broader perspective.</h2>;
    if (name === 'ParticleText') return <span>ASK WHAT MATTERS.</span>;
    if (name === 'MaskedHeading') return <h2>{props.text}</h2>;
    if (name === 'CountUp') return <span className={props.className}>{props.to}</span>;
    if (name === 'Counter') return <span className="static-count">{props.value}</span>;
    if (name === 'ElectricBorder' || name === 'StarBorder' || name === 'BorderGlow') return <div>{props.children}</div>;
  }
  const Component = bits[name]; return <Suspense fallback={fallback}><Component {...props} /></Suspense>;
}
const webGLAvailable = (() => { try { const canvas = document.createElement('canvas'); return Boolean(canvas.getContext('webgl2')); } catch { return false; } })();
function WebGLBit({ name, fallback = null, ...props }) { const quiet = useContext(QuietContext); return webGLAvailable && !quiet ? <EffectBoundary fallback={fallback}><Bit name={name} fallback={fallback} {...props} /></EffectBoundary> : fallback; }
function Go({ href, children, className = '' }) { return <a href={href} className={className}>{children}<span aria-hidden="true">↗</span></a>; }

function Marquee({ children }) { return <div className="trust-marquee" aria-label="Our approach"><div className="marquee-track">{[0, 1].map(i => <div className="marquee-copy" aria-hidden={i === 1} key={i}>{children}</div>)}</div></div>; }

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="exp-header"><a className="exp-logo" href="#top" aria-label="Vantage Legal home"><strong>V<span>.</span></strong><span>VANTAGE<small>LEGAL</small></span></a><button className="exp-menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'} <span aria-hidden="true">{open ? '×' : '+'}</span></button><nav className={open ? 'exp-nav open' : 'exp-nav'} aria-label="Main navigation" onClick={() => setOpen(false)}><a href="#expertise">Expertise</a><a href="#method">The method</a><a href="#perspective">Perspective</a><a href="#questions">Questions</a><Go href="#next" className="nav-pill">Explore next steps</Go></nav></header>;
}

function Hero() {
  const reduced = useContext(QuietContext); const [ink, setInk] = useState(false);
  return <section className="exp-hero" id="top"><div className="hero-vignette" />
    <div className="hero-grid exp-wrap"><div className="hero-meta"><span className="eyebrow"><span className="lit-dot" /> PERSPECTIVE. STRATEGY. RESOLVE.</span><span>VANTAGE LEGAL / A DIFFERENT PERSPECTIVE</span></div><div className="hero-copy"><div className="focus-line"><Bit name="TrueFocus" sentence="CLARITY CHANGES EVERYTHING" manualMode={false} blurAmount={2} borderColor="#d6ad78" glowColor="rgba(214,173,120,.2)" animationDuration={0.55} pauseBetweenAnimations={1.5} /></div><h1>A clear perspective.<br /><em>A stronger position.</em></h1><p>For the matters that change your business, your family, your future. Start with a clearer view of your options.</p><div className="hero-actions"><WebGLBit name="SpecularButton" fallback={<a className="hero-fallback-cta" href="#expertise">Explore expertise ↗</a>} size="lg" radius={2} tint="#d2ad7d" tintOpacity={0.08} textColor="#0d1518" lineColor="#dbb989" baseColor="#d1ad7c" autoAnimate={false} onClick={() => document.getElementById('expertise')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' })}>Explore expertise ↗</WebGLBit><a href="#method" className="underlink">Our method <span>↓</span></a></div></div><div className="hero-art" aria-hidden="true"><div className="sculpture"><Viewport>{webGLAvailable && !reduced ? <EffectBoundary fallback={<div className="sculpture-fallback" />}><Suspense fallback={<div className="sculpture-fallback" />}><GoldSculpture /></Suspense></EffectBoundary> : <div className="sculpture-fallback"><i /><i /><i /><span>V.</span></div>}</Viewport></div><Viewport className="rings" fallback={<div className="ring-fallback" />}><WebGLBit name="MagicRings" fallback={<div className="ring-fallback" />} color="#a4aaa4" colorTwo="#bc9569" ringCount={4} speed={0.18} opacity={0.16} lineThickness={1} followMouse={false} /></Viewport><span className="orbit-caption">A MORE CONSIDERED PERSPECTIVE</span></div><div className="hero-bottom"><div className="issue"><span>THE VANTAGE / 001</span><Bit name="SplitFlapText" words={['LISTEN FIRST', 'THINK CLEARLY', 'MOVE FORWARD']} fontSize={13} loop cycleDelay={3100} flipsPerChar={3} tileColor="#1d2b2f" textColor="#d9d4ca" gap={1} /></div><div className="hero-bottom-actions"><button className="ink-toggle" aria-pressed={ink} disabled={!webGLAvailable || reduced} title={!webGLAvailable ? 'Interactive ink requires WebGL' : undefined} onClick={() => setInk(v => !v)}>{ink ? 'Disable' : 'Enable'} interactive ink <span aria-hidden="true">✳</span></button><Bit name="StarBorder" as="div" color="#c7a173" speed="8s"><a href="#expertise">DISCOVER THE PRACTICE ↓</a></Bit></div></div></div>{ink && !reduced && webGLAvailable && <Bit name="SplashCursor" />}
  </section>;
}

const fields = [1, 2, 3, 4, 5].map(i => `/abstract/field-${i}.svg`);
const imageCards = practiceAreas.map((area, i) => ({ src: fields[i], alt: `Abstract line composition for ${area.title}`, title: area.title, subtitle: area.summary }));
const slideItems = practiceAreas.map((area, i) => ({ image: fields[i], caption: area.title }));

function Expertise() {
  const [mode, setMode] = useState('Explore'); const [active, setActive] = useState(0);
  return <section className="exp-expertise section-space" id="expertise"><div className="exp-wrap"><div className="kicker"><span>01 / WHAT WE DO</span><span className="hairline" /></div><div className="exp-heading-row"><h2>Every matter has<br /><em>its own shape.</em></h2><p>Different circumstances. The same care. Find the area closest to your situation and explore the questions that matter.</p></div><div className="discipline-loop"><Viewport fallback={<div className="loop-fallback">BUSINESS & COMMERCIAL · FAMILY & PERSONAL · DISPUTES & LITIGATION · DEFENSE & ADVOCACY ·</div>}><Bit name="LogoLoop" ariaLabel="Practice areas" logos={practiceAreas.map(p => ({ node: <span className="logo-word">{p.title.toUpperCase()}</span>, title: p.title }))} speed={35} logoHeight={22} gap={70} fadeOut={false} pauseOnHover /></Viewport></div>
    <div className="experience-controls"><span>CHOOSE HOW TO EXPLORE</span><Bit name="RubberSegment" items={['Explore', 'Compare']} value={mode} defaultValue="Explore" onChange={value => setMode(value)} trackColor="#18282c" thumbColor="#d0aa7b" textColor="#c3cdca" activeTextColor="#101b1e" size="sm" radius={3} /></div>
    {mode === 'Explore' ? <div className="explore-layout"><label className="mobile-practice">Choose a practice area<select value={active} onChange={e => setActive(Number(e.target.value))}>{practiceAreas.map((p, i) => <option key={p.id} value={i}>{p.title}</option>)}</select></label><div className="explore-nav"><Viewport><Bit name="LineSidebar" items={practiceAreas.map(p => p.title)} defaultActive={active} showIndex accentColor="#ccac82" textColor="#879a99" markerColor="#b99567" fontSize={0.95} itemGap={32} onItemClick={index => setActive(index)} /></Viewport></div><div className="explore-stage"><Viewport className="slider-frame" fallback={<img className="slider-still" src={fields[active]} alt="Abstract line composition" />}><WebGLBit name="MorphSlider" key={active} fallback={<img className="slider-still" src={fields[active]} alt="Abstract line composition" />} items={slideItems} startIndex={active} showControls={false} showIndicators={false} transition="shear" autoplay={false} intensity={0.4} aberration={0.08} /></Viewport><div className="stage-caption"><span>0{active + 1} / 04</span><div><h3>{practiceAreas[active].title}</h3><p>{practiceAreas[active].summary}</p><div className="practice-tags">{practiceAreas[active].tags.map(tag => <span key={tag}>{tag}</span>)}</div><a className="detail-link" href="#prepare">Prepare for a conversation ↗</a></div></div></div></div> : <div className="compare-layout"><Viewport className="flex-frame" fallback={<div className="abstract-fallback" />}><WebGLBit name="FlexCarousel" fallback={<div className="compare-fallback">{imageCards.map(card => <div key={card.title}><img src={card.src} alt={card.alt} /><span>{card.title}</span></div>)}</div>} items={imageCards} preset="arch" intro="fade" cardHeight={0.6} gap={10} focusOnClick captions /></Viewport><p>Move between the areas to compare how different kinds of matters call for different questions.</p></div>}
    <div className="practice-cards">{practiceAreas.map((area, i) => <div className="practice-card" key={area.id}><Bit name="PixelTransition" firstContent={<div className="card-face"><span>0{i + 1}</span><h3>{area.title}</h3><span>EXPLORE ↗</span></div>} secondContent={<div className="card-back"><p>{area.detail}</p><span>0{i + 1} / THE PRACTICE</span></div>} gridSize={8} pixelColor="#b99468" animationStepDuration={0.35} /></div>)}</div>
  </div></section>;
}

function Between() { return <div className="velocity-band" aria-hidden="true"><Viewport><Bit name="ScrollVelocity" texts={['PERSPECTIVE IN MOTION ✳', 'A CLEARER WAY FORWARD ✳']} velocity={24} /></Viewport></div>; }

function Method() {
  const [checked, setChecked] = useState([false, false, false]);
  return <section className="exp-method section-space" id="method"><div className="exp-wrap"><div className="kicker"><span>02 / THE METHOD</span><span className="hairline" /></div><div className="exp-heading-row"><h2>Start with the facts.<br /><em>Find the right move.</em></h2><p>A process should give you a clearer view of choices, time, and risk. Explore the three stages below.</p></div><div className="method-grid"><div className="method-guide"><div className="guide-head"><span>THE PATH / THREE STAGES</span><div className="guide-counter"><Bit name="CountUp" from={0} to={3} duration={1.8} className="countup" /> <span>STAGES</span></div></div><Bit name="Stepper" /></div><div className="method-side"><Bit name="BorderGlow" glowColor="188 151 101" backgroundColor="#17282c" borderRadius={4} glowRadius={35} glowIntensity={0.5} animated={false}><div className="principle-card"><span>THE PRINCIPLE / 01</span><h3>Clarity before action.</h3><p>Understand what is known, what is uncertain, and what each next step would mean.</p><div className="count-index"><Bit name="Counter" value={3} places={[1]} fontSize={48} padding={0} gap={0} textColor="#d8b88e" /><span>STAGES, ONE CLEAR PATH</span></div></div></Bit><div className="thought-wrap"><Bit name="ThoughtLine" working={false} label="Considering the matter" doneLabel="A considered process" steps={['Listen to the facts', 'Map the options', 'Choose a direction']} showTimer={false} glyph="dot" collapsible color="#b6c4b2" fontSize={15} /></div></div></div>
    <div className="prepare" id="prepare"><div><span className="kicker-text">BEFORE THE FIRST CONVERSATION</span><h3>Come prepared.<br /><em>Leave with direction.</em></h3></div><div className="prep-list">{['A brief timeline of events', 'Relevant documents and deadlines', 'The questions you most want answered'].map((label, i) => <Bit key={label} name="SpringCheck" label={label} checked={checked[i]} onChange={value => setChecked(prev => prev.map((p, j) => j === i ? value : p))} color="#e3e9e5" fillColor="#cda979" checkColor="#0d1b1f" boxSize={25} fontSize={16} />)}</div></div>
  </div></section>;
}

function Perspective() {
  return <section className="exp-perspective" id="perspective"><div className="perspective-top exp-wrap"><span className="kicker-text">03 / A DIFFERENT POINT OF VIEW</span><div className="tech-word"><Viewport fallback={<h2>A broader perspective.</h2>}><Bit name="TechText" text="PERSPECTIVE" fontSize={82} fontWeight={600} reveal="letter" dashLength={4} dashGap={2} specks={8} /></Viewport></div><p>A legal decision is also a personal or business decision. Good counsel connects the details to the bigger picture: what you want to protect, and where you want to go.</p></div><div className="dither-panel"><Viewport className="dither-effect" fallback={<div className="abstract-fallback" />}><WebGLBit name="DitherVeil" fallback={<div className="abstract-fallback" />} src={fields[4]} pattern="floyd" pixelSize={2} inkColor="#09251a" paperColor="#bdab72" revealRadius={220} softness={0.6} linger={1} /></Viewport><div className="dither-copy exp-wrap"><span>UNDERSTAND THE DETAILS. KEEP THE BIGGER PICTURE.</span><h2>Look closer.<br /><em>See further.</em></h2></div></div><div className="approach-notes exp-wrap">{[{title:"Your priorities, first.",text:"A useful strategy starts with what matters to you, not a predetermined answer."},{title:"Options made clear.",text:"Ask about the likely costs, timing and tradeoffs before deciding how to proceed."},{title:"A plan you understand.",text:"Know the next step, who is responsible and when to expect an update."}].map((item,i)=><article key={item.title}><span>0{i+1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div><div className="masked-block exp-wrap"><div className="kicker"><span>A CHANGE IN PERSPECTIVE</span><span className="hairline" /></div><Viewport fallback={<h2>Designed in the details.</h2>}><Bit name="MaskedHeading" text="Designed in the details" src={fields[1]} reveal="wipe" trigger="view" /></Viewport></div><div className="curved-wrap"><Viewport><Bit name="CurvedLoop" marqueeText="LISTEN ✦ UNDERSTAND ✦ ACT ✦" speed={1} curveAmount={140} direction="left" interactive={false} /></Viewport></div></section>;
}

function Questions() {
  const [open, setOpen] = useState(null);
  return <section className="exp-questions section-space" id="questions"><div className="exp-wrap"><div className="kicker"><span>04 / QUESTIONS WORTH ASKING</span><span className="hairline" /></div><div className="questions-grid"><div><h2>Good questions<br /><em>come first.</em></h2><p>Before you choose a path, get a clearer understanding of the ground beneath it.</p><div className="particle-frame"><Viewport fallback={<span>ASK WHAT MATTERS.</span>}><Bit name="ParticleText" text="ASK MORE" density={5} particleSize={1.6} color="#e6dccb" highlightColor="#b99368" scatter={100} gatherDuration={1400} trigger="hover" fontSize="clamp(2.4rem, 5vw, 5rem)" fontWeight={600} /></Viewport></div></div><div className="faq-list">{faqs.map((item, i) => <div className="faq" key={item.q}><button aria-controls={`faq-answer-${i}`} id={`faq-question-${i}`} aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}><span>0{i + 1} / {item.q}</span><span aria-hidden="true">{open === i ? '−' : '+'}</span></button>{open === i && <p id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`}>{item.a}</p>}</div>)}</div></div></div></section>;
}

function Next() {
  const [lens, setLens] = useState(false); const reduced = useContext(QuietContext);
  return <section className="exp-next" id="next"><div className="exp-wrap next-layout"><div><span className="kicker-text">05 / WHAT COMES NEXT</span><h2>The next move<br />starts with <em>clarity.</em></h2><p>A short timeline. The key documents. The questions you want answered. Make your first conversation a more useful one.</p><div className="next-actions"><Bit name="ElectricBorder" color="#caa675" speed={0.8} chaos={0.08} thickness={1} style={{borderRadius:3}}><a href="#prepare" className="electric-link">Prepare your next step <span>↗</span></a></Bit><button className="lens-button" disabled={!webGLAvailable || reduced} aria-expanded={lens} title={!webGLAvailable ? 'Interactive lens requires WebGL' : undefined} onClick={() => setLens(v => !v)}>{lens ? 'Close the lens' : 'Explore the lens'} <span aria-hidden="true">✳</span></button></div></div><div className="lens-holder"><div className="lens-frame">{lens && !reduced && webGLAvailable ? <Viewport keep fallback={<div className="lens-fallback" />}><Bit name="FluidGlass" mode="cube" backgroundColor="#14262a" textColor="#e9dfce" cubeProps={{scale:0.5,ior:1.15,thickness:3}} /></Viewport> : <div className="lens-still"><span>V<span>.</span></span><p>ANOTHER WAY OF SEEING</p></div>}</div><span className="lens-caption">{lens ? 'MOVE YOUR POINTER TO SHIFT THE VIEW' : 'A NEW PERSPECTIVE / INTERACTIVE LENS'}</span></div></div></section>;
}

function Footer() { return <footer className="exp-footer"><Marquee>{['LISTEN', 'UNDERSTAND', 'PLAN', 'ACT'].map(word => <span key={word}>{word} <i>✳</i></span>)}</Marquee><div className="exp-wrap footer-content"><div className="footer-large">VANTAGE<span>.</span></div><div className="footer-line"><span>LEGAL / A CONCEPT FOR CONSIDERED COUNSEL</span><a href="#top">BACK TO TOP ↑</a></div><p>This is a website concept, not a real law firm. No attorney–client relationship or legal advice is provided. Practice descriptions must be verified for each firm.</p></div></footer>; }

function App() {
  const reduced = useReducedMotion();
  const [quiet, setQuiet] = useState(false);
  const paused = reduced || quiet;
  useEffect(() => { document.documentElement.dataset.motion = paused ? 'paused' : 'active'; }, [paused]);
  return <QuietContext.Provider value={paused}><MotionConfig reducedMotion={paused ? "always" : "user"}><WorldBackground paused={paused} supported={webGLAvailable} /><SceneMotion paused={paused} /><div className="reading-progress" /><button className="motion-control" onClick={() => setQuiet(v => !v)} aria-pressed={paused} disabled={reduced}>{paused ? 'Motion paused' : 'Pause motion'} <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span></button><a href="#expertise" className="skip-link">Skip to content</a><Header /><main><Hero /><Expertise /><Between /><Method /><Perspective /><Questions /><Next /></main><Footer /></MotionConfig></QuietContext.Provider>; }

createRoot(document.getElementById('root')).render(<App />);
