import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function Form() {
  const group = useRef();
  useFrame(({ clock, pointer }, delta) => {
    group.current.rotation.y += (pointer.x * .22 - group.current.rotation.y) * Math.min(delta * 3, 1);
    group.current.rotation.z = Math.sin(clock.elapsedTime * .12) * .08;
  });
  return <Float speed={.8} rotationIntensity={.14} floatIntensity={.3}><group ref={group} rotation={[.35, .2, -.35]}>
    {[0, 1, 2].map(i => <mesh key={i} rotation={[i * .65, i * .8, i * .4]}><torusGeometry args={[1.55, .026 + i * .01, 12, 160]} /><meshStandardMaterial color={i === 1 ? '#edf1c9' : '#cfa665'} metalness={.8} roughness={.27} /></mesh>)}
    <mesh rotation={[.4, .4, .8]}><octahedronGeometry args={[.56, 0]} /><meshPhysicalMaterial color="#a5bb97" metalness={.55} roughness={.2} clearcoat={1} wireframe /></mesh>
  </group></Float>;
}

export default function GoldSculpture() {
  return <Canvas dpr={[1, 1.25]} camera={{ position: [0, 0, 5.8], fov: 43 }} gl={{ alpha: true, antialias: true }} aria-hidden="true">
    <ambientLight intensity={1.5} /><directionalLight position={[3, 4, 5]} intensity={4} color="#ffdea0" /><pointLight position={[-3, -2, 2]} intensity={20} color="#72bb95" /><Form />
  </Canvas>;
}
