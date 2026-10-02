"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Octahedron, Tetrahedron } from "@react-three/drei";
import * as THREE from "three";

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.05;
    if (groupRef.current) {
      groupRef.current.rotation.y = t;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
        <Icosahedron args={[0.8, 0]} position={[-4, 3, -6]}>
          <meshStandardMaterial color="#00F0FF" wireframe transparent opacity={0.15} />
        </Icosahedron>
      </Float>

      <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
        <Octahedron args={[1.2, 0]} position={[5, -2, -8]}>
          <meshStandardMaterial color="#A855F7" wireframe transparent opacity={0.18} />
        </Octahedron>
      </Float>

      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.6}>
        <Tetrahedron args={[1.0, 0]} position={[-6, -4, -7]}>
          <meshStandardMaterial color="#0A84FF" wireframe transparent opacity={0.12} />
        </Tetrahedron>
      </Float>

      <Float speed={2.2} rotationIntensity={0.9} floatIntensity={1.2}>
        <Icosahedron args={[0.7, 0]} position={[6, 4, -9]}>
          <meshStandardMaterial color="#22D3EE" wireframe transparent opacity={0.15} />
        </Icosahedron>
      </Float>
    </group>
  );
}

export const BackgroundMesh: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] opacity-40">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} color="#00F0FF" />
        <FloatingShapes />
      </Canvas>
    </div>
  );
};
