import React from 'react';
import Stepper, { Step } from './components/reactbits/Stepper';

export default function ProcessStepper() {
  return <Stepper initialStep={1} backButtonText="Previous" nextButtonText="Next" onFinalStepCompleted={() => document.getElementById('prepare')?.scrollIntoView({ behavior: 'smooth' })}>
    <Step><span className="step-mini">01 / LISTEN</span><h3>Start with the facts.</h3><p>What happened, what matters most to you, and what needs attention now?</p></Step>
    <Step><span className="step-mini">02 / ASSESS</span><h3>Understand the options.</h3><p>Review possible paths and discuss their likely timing, costs, and tradeoffs.</p></Step>
    <Step><span className="step-mini">03 / ACT</span><h3>Choose a direction.</h3><p>Move with a plan you understand and communication you can count on.</p></Step>
  </Stepper>;
}
