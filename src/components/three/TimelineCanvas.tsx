"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TIMELINE } from "@/data/content";

function TimelineLaserPath() {
  const curve = useMemo(() => {
    const points = [
      new THREE.Vector3(-3.5, 3.5, -4),
      new THREE.Vector3(-1.0, 1.2, -1.5),
      new THREE.Vector3(1.2, -1.0, 0.5),
      new THREE.Vector3(3.5, -3.5, 2.5),
    ];
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const lineGeometry = useMemo(() => {
    const pts = curve.getPoints(100);
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [curve]);

  return (
    <group>
      <primitive object={new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: "#00F0FF", linewidth: 2, transparent: true, opacity: 0.8 }))} />
    </group>
  );
}

function FloatingMilestoneNodes() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.1;
      groupRef.current.position.y = Math.cos(t * 0.3) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {TIMELINE.map((item, idx) => {
        const x = (idx - 1) * 2.8;
        const y = -(idx - 1) * 1.8;
        const z = (idx - 1) * 1.5;

        return (
          <group key={idx} position={[x, y, z]}>
            {/* Glowing Orb */}
            <mesh>
              <sphereGeometry args={[0.35, 32, 32]} />
              <meshStandardMaterial
                color={item.color}
                emissive={item.color}
                emissiveIntensity={0.8}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>

            {/* Orbiting Pulsing Ring */}
            <mesh rotation={[Math.PI / 3, 0, 0]}>
              <ringGeometry args={[0.55, 0.65, 32]} />
              <meshBasicMaterial
                color={item.color}
                side={THREE.DoubleSide}
                transparent
                opacity={0.6}
              />
            </mesh>

            <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
              <ringGeometry args={[0.85, 0.92, 32]} />
              <meshBasicMaterial
                color="#00F0FF"
                side={THREE.DoubleSide}
                transparent
                opacity={0.3}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export const TimelineCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-60">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 4, 3]} intensity={3} color="#00F0FF" />
        <pointLight position={[3, -3, 2]} intensity={2} color="#A855F7" />

        <TimelineLaserPath />
        <FloatingMilestoneNodes />
      </Canvas>
    </div>
  );
};
