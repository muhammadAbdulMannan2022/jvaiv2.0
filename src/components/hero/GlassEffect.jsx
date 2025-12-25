import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Torus } from "@react-three/drei";
import * as THREE from "three";

const GlassTorus = () => {
  const meshRef = useRef(null);
  const materialRef = useRef(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.12;
      meshRef.current.rotation.x = Math.sin(time * 0.09);
      //   meshRef.current.rotation.x = Math.sin(time * 0.9) * 0.5;
    }

    if (materialRef.current) {
      materialRef.current.distortion = 0.3 + Math.sin(time * 0.9) * 0.9;
    }
  });

  return (
    <group>
      {/* Reduced segments for faster rendering */}
      {/* Control Size here: args={[Radius, Tube_Thickness, Radial_Segments, Tubular_Segments]} */}
      <Torus
        ref={meshRef}
        args={[0.9, 0.4, 35, 35]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          ref={materialRef}
          color="#0033FF"
          roughness={0}
          metalness={0.6}
        />
      </Torus>

      {/* Soft inner glow */}
      <mesh scale={[0.6, 0.6, 0.6]}>
        {/* <sphereGeometry args={[0.6, 0.5, 40, 40]} /> */}
        {/* <meshStandardMaterial
          emissive="#0033FF"
          emissiveIntensity={10}
          color="#0033FF"
          transparent
          opacity={0.8}
        /> */}
      </mesh>

      {/* Minimal background particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Particle key={i} index={i} />
      ))}
    </group>
  );
};

const Particle = ({ index }) => {
  const ref = useRef(null);
  const [pos] = React.useState(
    () =>
      new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      )
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = pos.y + Math.sin(time * 0.2 + index) * 0.15;
    }
  });

  return (
    <mesh ref={ref} position={pos}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial color="#0033FF" transparent opacity={0.2} />
    </mesh>
  );
};

export default GlassTorus;
