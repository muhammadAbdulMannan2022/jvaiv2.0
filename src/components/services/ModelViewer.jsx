import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Center, Environment } from "@react-three/drei";

const Model = ({ path }) => {
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
};

const ModelViewer = ({ modelPath }) => {
  return (
    <div className="w-full h-full min-h-[300px] bg-[#1a1a1a]">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <Center>
            <Model path={modelPath} />
          </Center>
          <OrbitControls autoRotate enableZoom={false} makeDefault />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewer;
