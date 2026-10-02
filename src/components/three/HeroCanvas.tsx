"use client";

import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Image as DreiImage, Sphere } from "@react-three/drei";
import * as THREE from "three";

function FilmGrain() {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.04 + Math.sin(clock.getElapsedTime() * 30) * 0.01;
    }
  });
  return (
    <mesh ref={meshRef} position={[0, 0, 1]}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.04} />
    </mesh>
  );
}

function Particles({ count = 2800 }: { count?: number }) {
  const points = useRef<THREE.Points>(null!);
  const mouse = useRef({ x: 0, y: 0 });

  const [positions, originalPositions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const szs = new Float32Array(count);

    const color1 = new THREE.Color("#00F0FF");
    const color2 = new THREE.Color("#0A84FF");
    const color3 = new THREE.Color("#A855F7");
    const color4 = new THREE.Color("#22D3EE");

    for (let i = 0; i < count; i++) {
      const radius = 8 + Math.random() * 28;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi) - 8;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;

      const rnd = Math.random();
      const mixedColor = rnd > 0.7 ? color1 : rnd > 0.45 ? color2 : rnd > 0.2 ? color4 : color3;
      cols[i * 3] = mixedColor.r;
      cols[i * 3 + 1] = mixedColor.g;
      cols[i * 3 + 2] = mixedColor.b;
      szs[i] = 0.04 + Math.random() * 0.1;
    }

    return [pos, orig, cols, szs];
  }, [count]);

  useFrame(({ clock, pointer }) => {
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, pointer.x * 14, 0.04);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, pointer.y * 14, 0.04);

    const time = clock.getElapsedTime() * 0.25;
    const posAttr = points.current.geometry.attributes.position;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const ox = originalPositions[i3];
      const oy = originalPositions[i3 + 1];
      const oz = originalPositions[i3 + 2];

      let targetX = ox + Math.sin(time + oy * 0.15) * 0.5;
      let targetY = oy + Math.cos(time + ox * 0.15) * 0.5;
      const targetZ = oz + Math.sin(time * 0.7 + oz * 0.08) * 0.4;

      // Mouse repel
      const dx = targetX - mouse.current.x;
      const dy = targetY - mouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 5.5) {
        const force = (5.5 - dist) / 5.5;
        targetX += (dx / dist) * force * 3;
        targetY += (dy / dist) * force * 3;
      }

      array[i3] = THREE.MathUtils.lerp(array[i3], targetX, 0.08);
      array[i3 + 1] = THREE.MathUtils.lerp(array[i3 + 1], targetY, 0.08);
      array[i3 + 2] = THREE.MathUtils.lerp(array[i3 + 2], targetZ, 0.08);
    }

    posAttr.needsUpdate = true;
    points.current.rotation.y = time * 0.04;
    points.current.rotation.x = time * 0.015;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function CyberCore() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.22;
      meshRef.current.rotation.y = t * 0.33;
      meshRef.current.rotation.z = t * 0.08;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.0}>
      <mesh ref={meshRef} position={[3.5, 0.5, -2.5]}>
        <torusKnotGeometry args={[1.6, 0.48, 140, 32, 2, 3]} />
        <MeshDistortMaterial
          color="#0A84FF"
          emissive="#00F0FF"
          emissiveIntensity={0.55}
          roughness={0.05}
          metalness={0.9}
          distort={0.45}
          speed={2.0}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function HologramOrbs() {
  const orb1 = useRef<THREE.Mesh>(null!);
  const orb2 = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (orb1.current) orb1.current.rotation.y = -t * 0.18;
    if (orb2.current) orb2.current.rotation.x = t * 0.15;
  });

  return (
    <>
      <Sphere ref={orb1} args={[2.4, 32, 32]} position={[-3.8, 1.5, -5]}>
        <meshStandardMaterial
          color="#22D3EE"
          emissive="#0A84FF"
          emissiveIntensity={0.35}
          wireframe
          transparent
          opacity={0.25}
        />
      </Sphere>
      <Sphere ref={orb2} args={[1.2, 24, 24]} position={[4.5, -2.5, -4]}>
        <meshStandardMaterial
          color="#A855F7"
          emissive="#A855F7"
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>
    </>
  );
}

function ProfileCard3D() {
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame(({ pointer, clock }) => {
    if (groupRef.current) {
      const targetRotX = -pointer.y * 0.3;
      const targetRotY = pointer.x * 0.4;
      const targetPosZ = hovered ? 1.0 : 0;
      const t = clock.getElapsedTime();

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        0.07
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        0.07
      );
      groupRef.current.position.z = THREE.MathUtils.lerp(
        groupRef.current.position.z,
        targetPosZ,
        0.07
      );

      // Pulsing glow halo
      if (glowRef.current) {
        const mat = glowRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.25 + Math.sin(t * 2.5) * 0.12;
      }
    }
  });

  return (
    <Float speed={2.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group
        ref={groupRef}
        position={[0, -0.2, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Outer Rim Glow Halo */}
        <mesh ref={glowRef} position={[0, 0, -0.25]}>
          <planeGeometry args={[3.4, 4.2]} />
          <meshBasicMaterial
            color="#00F0FF"
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Secondary Glow Blue */}
        <mesh position={[0, 0, -0.18]}>
          <planeGeometry args={[3.0, 3.8]} />
          <meshBasicMaterial
            color="#0A84FF"
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Refractive Glass Card Backing */}
        <mesh position={[0, 0, -0.08]}>
          <planeGeometry args={[2.7, 3.5]} />
          <meshPhysicalMaterial
            color="#050914"
            roughness={0.05}
            metalness={0.95}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Portrait Image */}
        <DreiImage
          url="/profile.png"
          scale={[2.5, 3.3]}
          position={[0, 0, 0.02]}
          transparent
          opacity={0.98}
        />

        {/* Holographic Frame Lines */}
        <lineSegments position={[0, 0, 0.06]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(2.7, 3.5)]} />
          <lineBasicMaterial color="#22D3EE" linewidth={2} />
        </lineSegments>

        {/* Corner accent lines */}
        {[[-1.35, 1.75], [1.35, 1.75], [-1.35, -1.75], [1.35, -1.75]].map(([cx, cy], i) => (
          <mesh key={i} position={[cx, cy, 0.08]}>
            <planeGeometry args={[0.3, 0.04]} />
            <meshBasicMaterial color="#00F0FF" transparent opacity={0.9} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function ScrollCamera() {
  const { camera } = useThree();
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    const targetY = scrollY.current * -0.003;
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 7.5 + scrollY.current * 0.002, 0.05);
  });

  return null;
}

export const HeroCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 44 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        {/* Cyberpunk Lighting Rig */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} color="#FFFFFF" />
        <pointLight position={[-7, 5, 3]} intensity={5} color="#00F0FF" distance={22} decay={1.5} />
        <pointLight position={[7, -5, 2]} intensity={4} color="#A855F7" distance={22} decay={1.5} />
        <pointLight position={[0, 6, -3]} intensity={2.5} color="#0A84FF" />
        <pointLight position={[0, -4, 5]} intensity={1.5} color="#22D3EE" />

        {/* Scroll-driven camera dolly */}
        <ScrollCamera />

        {/* 3D Core Scene Elements - render immediately */}
        <Particles count={2800} />
        <CyberCore />
        <HologramOrbs />

        {/* 3D Portrait Standee with texture load fallback */}
        <Suspense fallback={null}>
          <ProfileCard3D />
        </Suspense>
      </Canvas>
    </div>
  );
};
