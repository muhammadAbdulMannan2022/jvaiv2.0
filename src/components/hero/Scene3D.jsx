import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import GlassTorus from "./GlassEffect";

const Scene3D = () => {
  return (
    <Canvas
      shadows={false} // Disabled shadows for performance
      camera={{ position: [-2, 0, 5], fov: 40 }}
      dpr={1}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#0033FF" />

        <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.3}>
          <GlassTorus />
        </Float>

        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
};

export default Scene3D;
