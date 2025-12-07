"use client";

import dynamic from "next/dynamic";

// Dynamically import the 3D model component to avoid SSR issues
const Model3D = dynamic(
  () => import("@/components/ui/3dmodel").then((mod) => mod.Model3D),
  { ssr: false }
);

export function Scene3DExample() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted">
      <h1 className="text-4xl font-bold mb-2 font-pixelify">
        3D Model Showcase
      </h1>
      <p className="text-muted-foreground mb-8">
        Place your .glb or .gltf model in /public folder
      </p>

      {/* Example: Replace 'model.glb' with your actual model path in public folder */}
      <div className="w-full max-w-4xl h-96 bg-card rounded-lg shadow-lg overflow-hidden">
        <Model3D
          modelPath="/model.glb"
          scale={1}
          autoRotate={true}
          enableZoom={true}
          animationSpeed={2}
          className="w-full h-full"
        />
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Hover over the model to see the scale animation</p>
        <p>Drag to rotate, scroll to zoom</p>
      </div>
    </div>
  );
}
