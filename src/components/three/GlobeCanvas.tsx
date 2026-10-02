"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleGlobe({ count = 1400 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const radius = 2.4;

    const cyan = new THREE.Color("#00F0FF");
    const blue = new THREE.Color("#0A84FF");
    const purple = new THREE.Color("#A855F7");

    for (let i = 0; i < count; i++) {
      // Spherical distribution with density along latitudes
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = Math.random() > 0.6 ? cyan : Math.random() > 0.3 ? blue : purple;
      cols[i * 3] = chosenColor.r;
      cols[i * 3 + 1] = chosenColor.g;
      cols[i * 3 + 2] = chosenColor.b;
    }

    return [pos, cols];
  }, [count]);

  useFrame(({ clock, pointer }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.15 + pointer.x * 0.5;
      pointsRef.current.rotation.x = pointer.y * 0.3;
    }
  });

  return (
    <group>
      {/* Outer Glow Halo */}
      <mesh>
        <sphereGeometry args={[2.35, 32, 32]} />
        <meshBasicMaterial
          color="#00F0FF"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Equatorial & Orbital Energy Rings */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[2.7, 2.75, 64]} />
        <meshBasicMaterial color="#00F0FF" side={THREE.DoubleSide} transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <ringGeometry args={[2.85, 2.9, 64]} />
        <meshBasicMaterial color="#A855F7" side={THREE.DoubleSide} transparent opacity={0.25} />
      </mesh>

      {/* Point Cloud */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export const GlobeCanvas: React.FC = () => {
  return (
    <div className="h-[360px] sm:h-[450px] w-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[4, 4, 4]} intensity={2.5} color="#00F0FF" />
        <pointLight position={[-4, -4, -4]} intensity={1.8} color="#A855F7" />
        <ParticleGlobe count={1600} />
      </Canvas>
    </div>
  );
};
