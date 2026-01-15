"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";

function LoadingFallback() {
  return null;
}

function ACUnitPlaceholder() {
  const groupRef = useRef<THREE.Group>(null);

  // Subtle rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, -1.5, 0]} scale={1.2}>
        {/* Main AC body */}
        <RoundedBox
          args={[4, 0.9, 0.7]}
          radius={0.15}
          smoothness={4}
          position={[0, 0, 0]}
        >
          <meshStandardMaterial
            color="#f5f5f5"
            metalness={0.3}
            roughness={0.4}
          />
        </RoundedBox>

        {/* Top panel with slight inset */}
        <RoundedBox
          args={[3.8, 0.1, 0.65]}
          radius={0.03}
          smoothness={4}
          position={[0, 0.42, 0.01]}
        >
          <meshStandardMaterial
            color="#e8e8e8"
            metalness={0.4}
            roughness={0.3}
          />
        </RoundedBox>

        {/* Front panel / air outlet grille */}
        <RoundedBox
          args={[3.6, 0.4, 0.05]}
          radius={0.02}
          smoothness={4}
          position={[0, -0.2, 0.35]}
        >
          <meshStandardMaterial
            color="#e0e0e0"
            metalness={0.2}
            roughness={0.5}
          />
        </RoundedBox>

        {/* Display panel area */}
        <RoundedBox
          args={[0.6, 0.15, 0.02]}
          radius={0.02}
          smoothness={4}
          position={[-1.4, 0.15, 0.36]}
        >
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.8}
            roughness={0.2}
          />
        </RoundedBox>

        {/* Optimist branding text */}
        <Text
          position={[-1.2, 0.28, 0.36]}
          fontSize={0.08}
          color="#888888"
          anchorX="left"
          anchorY="middle"
        >
          ✱ optimist
        </Text>

        {/* Subtle LED indicator */}
        <mesh position={[-1.55, 0.15, 0.37]}>
          <circleGeometry args={[0.02, 16]} />
          <meshStandardMaterial
            color="#0ea5e9"
            emissive="#0ea5e9"
            emissiveIntensity={2}
          />
        </mesh>

        {/* Air flow lines (decorative) */}
        {[-1.2, -0.4, 0.4, 1.2].map((x, i) => (
          <mesh key={i} position={[x, -0.2, 0.37]}>
            <planeGeometry args={[0.02, 0.3]} />
            <meshStandardMaterial
              color="#d0d0d0"
              transparent
              opacity={0.5}
            />
          </mesh>
        ))}

        {/* Bottom shadow catcher */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.5, 0]}
          receiveShadow
        >
          <planeGeometry args={[5, 2]} />
          <shadowMaterial transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      {/* Ambient fill light */}
      <ambientLight intensity={0.5} />
      
      {/* Key light - main illumination from top right */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      
      {/* Fill light - softer from left */}
      <directionalLight
        position={[-5, 3, 3]}
        intensity={0.4}
        color="#e0f0ff"
      />
      
      {/* Rim light - back lighting for depth */}
      <directionalLight
        position={[0, 2, -5]}
        intensity={0.3}
        color="#ffffff"
      />
      
      {/* Blue accent light to match the gradient */}
      <pointLight
        position={[3, 0, 2]}
        intensity={0.5}
        color="#0ea5e9"
        distance={10}
      />

      <ACUnitPlaceholder />

      <Environment preset="city" environmentIntensity={0.3} />
    </>
  );
}

export function ViewCanvas() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "transparent" }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        <Suspense fallback={<LoadingFallback />}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ViewCanvas;
