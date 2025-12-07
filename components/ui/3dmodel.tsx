"use client";

import { Canvas, useFrame } from "@react-three/fiber";

import {
  useGLTF,
  PerspectiveCamera,
  OrbitControls,
  Float,
} from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

interface Model3DProps {
  modelPath: string;
  scale?: number;
  autoRotate?: boolean;
  enableZoom?: boolean;
  animationSpeed?: number;
  className?: string;
}

function AnimatedModel({
  modelPath,
  scale = 1,
  autoRotate = true,
  animationSpeed = 2,
}: Omit<Model3DProps, "className">) {
  const groupRef = useRef<THREE.Group>(null);

  // Load the 3D model
  const { scene } = useGLTF(modelPath);

  useFrame((state, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * (animationSpeed / 10);
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

export function Model3D({
  scale = 1,
  autoRotate = true,
  animationSpeed = 2,
  className = "",
}: Model3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, 5]} intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />

        {/* Model */}
        <AnimatedModel
          modelPath={"/model/logo.glb"}
          scale={scale}
          autoRotate={autoRotate}
          animationSpeed={animationSpeed}
        />
        <Float />

        {/* Camera and Controls */}
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      </Canvas>
    </div>
  );
}
