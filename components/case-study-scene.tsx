"use client";

import { Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Model({ accent, variant }: { accent: string; variant: number }) {
  const group = useRef<THREE.Group>(null);
  const points = useMemo<Array<[number, number, number]>>(
    () => Array.from({ length: 9 }, (_, index) => {
      const angle = (index / 9) * Math.PI * 2;
      return [Math.cos(angle) * (1.15 + variant * 0.12), Math.sin(angle) * 1.15, Math.sin(index * 2.1) * 0.36];
    }),
    [variant],
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.16;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.12;
  });

  return (
    <group ref={group}>
      <mesh>
        {variant === 0 ? <icosahedronGeometry args={[0.72, 2]} /> : null}
        {variant === 1 ? <dodecahedronGeometry args={[0.72, 1]} /> : null}
        {variant === 2 ? <octahedronGeometry args={[0.78, 1]} /> : null}
        {variant === 3 ? <torusKnotGeometry args={[0.55, 0.17, 100, 12]} /> : null}
        <meshStandardMaterial color="#151821" emissive={accent} emissiveIntensity={0.34} metalness={0.82} roughness={0.23} />
      </mesh>
      <mesh scale={1.04}>
        {variant === 0 ? <icosahedronGeometry args={[0.72, 1]} /> : null}
        {variant === 1 ? <dodecahedronGeometry args={[0.72, 0]} /> : null}
        {variant === 2 ? <octahedronGeometry args={[0.78, 0]} /> : null}
        {variant === 3 ? <torusKnotGeometry args={[0.55, 0.17, 64, 8]} /> : null}
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.5} />
      </mesh>
      <Line points={[...points, points[0]]} color={accent} lineWidth={1.2} transparent opacity={0.5} />
      {points.map((point, index) => (
        <mesh key={index} position={point}>
          <sphereGeometry args={[0.055 + (index % 3) * 0.018, 12, 12]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={2.4} />
        </mesh>
      ))}
      <pointLight color={accent} intensity={6} distance={6} />
    </group>
  );
}

export default function CaseStudyScene({ accent, variant }: { accent: string; variant: number }) {
  return (
    <div className="case-scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 42 }}
        dpr={[1, 1.35]}
        fallback={<div className="webgl-fallback"><span>System model unavailable</span></div>}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[-3, 4, 4]} intensity={2.2} />
        <Model accent={accent} variant={variant} />
      </Canvas>
    </div>
  );
}
