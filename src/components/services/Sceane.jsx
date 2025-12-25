import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sphere,
  PerspectiveCamera,
  Environment,
  Points,
  PointMaterial,
} from "@react-three/drei";
import * as THREE from "three";

const ParticleField = () => {
  const points = useMemo(() => {
    const p = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = (Math.random() - 0.5) * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return p;
  }, []);

  const ref = useRef(null);
  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  );
};

const AnimatedSphere = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere args={[1, 100, 100]} position={[2, 0, -2]}>
        <MeshDistortMaterial
          color="#1a1a1a"
          attach="material"
          distort={0.4}
          speed={4}
          roughness={0.1}
          metalness={1}
        />
      </Sphere>
    </Float>
  );
};

const Scene = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <ParticleField />
        <AnimatedSphere />

        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default Scene;
