import React, { Component, Suspense, lazy } from 'react';
const GhostFibers = lazy(() => import('./components/reactbits/GhostFibers'));

export class EffectBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

export function FiberFallback() {
  return <div className="fiber-fallback"><svg viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="fiber-gold"><stop stopColor="#42454a" stopOpacity=".05" /><stop offset=".48" stopColor="#a9aeb7" stopOpacity=".6" /><stop offset=".7" stopColor="#edf0f4" stopOpacity=".8" /><stop offset="1" stopColor="#4b4e55" stopOpacity=".03" /></linearGradient></defs><g fill="none" stroke="url(#fiber-gold)" strokeWidth="1">{Array.from({ length: 44 }, (_, i) => <path key={i} d={`M ${-200 + i * 16} -100 C ${1250 + i * 8} ${110 + i * 8}, ${-250 + i * 22} ${540 - i * 5}, ${850 + i * 20} 1100`} />)}</g></svg></div>;
}

export default function WorldBackground({ paused, supported }) {
  const fallback = <FiberFallback />;
  return <div className="world-background" aria-hidden="true"><div className="world-scene">
    <EffectBoundary fallback={fallback}><Suspense fallback={fallback}>{supported ? <GhostFibers lineColor="#5d6065" glowColor="#ced2da" brightness={.9} blueBoost={.6} glowIntensity={.35} speed={.12} scale={1.65} rotation={-25} layers={4} twist={.22} lineFrequency={8} lineSpacing={3} lineSharpness={26} vignette={.5} grain={.018} dpr={1} fps={30} paused={paused} /> : fallback}</Suspense></EffectBoundary>
    </div><div className="world-shade" /></div>;
}
