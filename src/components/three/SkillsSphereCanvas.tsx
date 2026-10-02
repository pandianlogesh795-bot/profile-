"use client";

import React, { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Billboard, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { SKILLS, SkillItem } from "@/data/content";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface SkillNodeProps {
  skill: SkillItem;
  position: [number, number, number];
  onSelect: (skill: SkillItem) => void;
  isSelected: boolean;
}

function SkillNode({ skill, position, onSelect, isSelected }: SkillNodeProps) {
  const meshRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const { playHover } = useSoundEffects();

  useFrame(() => {
    if (meshRef.current) {
      const targetScale = hovered || isSelected ? 1.35 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <Billboard follow lockX={false} lockY={false} lockZ={false}>
        {/* Holographic glowing ring */}
        <mesh
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            playHover();
          }}
          onPointerOut={() => setHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(skill);
          }}
        >
          <ringGeometry args={[0.42, 0.48, 32]} />
          <meshBasicMaterial
            color={hovered || isSelected ? "#00F0FF" : skill.color}
            side={THREE.DoubleSide}
            transparent
            opacity={hovered || isSelected ? 0.95 : 0.6}
          />
        </mesh>

        {/* Inner Node Sphere */}
        <mesh position={[0, 0, 0.05]}>
          <circleGeometry args={[0.38, 32]} />
          <meshBasicMaterial
            color="#070B19"
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Skill Label */}
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.22}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          {skill.name}
        </Text>

        {/* Proficiency Badge below */}
        <Text
          position={[0, -0.28, 0.1]}
          fontSize={0.13}
          color={skill.color}
          anchorX="center"
          anchorY="middle"
        >
          {`${skill.level}%`}
        </Text>

        {/* Interactive Hover Card Popup */}
        {(hovered || isSelected) && (
          <Html position={[0, 0.75, 0.2]} center distanceFactor={8}>
            <div className="w-48 rounded-xl border border-cyber-cyan/50 bg-cyber-dark/95 p-3 text-center shadow-[0_0_25px_rgba(0,240,255,0.4)] backdrop-blur-md pointer-events-none transition-all">
              <div className="text-xs font-mono font-bold text-cyber-neon">{skill.name}</div>
              <div className="text-[10px] text-gray-300 mt-1 leading-snug">{skill.description}</div>
              <div className="mt-2 flex items-center justify-between text-[9px] font-mono text-cyan-300">
                <span>{skill.category}</span>
                <span>{skill.level}% MASTERED</span>
              </div>
            </div>
          </Html>
        )}
      </Billboard>
    </group>
  );
}

function OrbitingCluster({
  skills,
  onSelectSkill,
  selectedSkill,
}: {
  skills: SkillItem[];
  onSelectSkill: (skill: SkillItem) => void;
  selectedSkill: SkillItem | null;
}) {
  const groupRef = useRef<THREE.Group>(null!);

  // Distribute skills evenly on a 3D sphere surface using Fibonacci spiral algorithm
  const nodes = useMemo(() => {
    const radius = 3.6;
    const count = skills.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    return skills.map((skill, i) => {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      return {
        skill,
        position: [x, y, z] as [number, number, number],
      };
    });
  }, [skills]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Holographic Core */}
      <mesh>
        <sphereGeometry args={[1.2, 24, 24]} />
        <meshBasicMaterial
          color="#0A84FF"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Orbital Ring Grid */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <ringGeometry args={[3.55, 3.62, 64]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
        <ringGeometry args={[3.55, 3.62, 64]} />
        <meshBasicMaterial color="#A855F7" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      {/* Skill Nodes */}
      {nodes.map(({ skill, position }) => (
        <SkillNode
          key={skill.name}
          skill={skill}
          position={position}
          onSelect={onSelectSkill}
          isSelected={selectedSkill?.name === skill.name}
        />
      ))}
    </group>
  );
}

interface SkillsSphereCanvasProps {
  onSelectSkill: (skill: SkillItem) => void;
  selectedSkill: SkillItem | null;
}

export const SkillsSphereCanvas: React.FC<SkillsSphereCanvasProps> = ({
  onSelectSkill,
  selectedSkill,
}) => {
  return (
    <div className="relative h-[480px] sm:h-[580px] w-full rounded-3xl overflow-hidden border border-cyber-border bg-gradient-to-b from-[#060814]/80 to-[#03040A]/95 shadow-[0_0_50px_rgba(10,132,255,0.15)]">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 48 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={2.5} color="#00F0FF" />
        <pointLight position={[-5, -5, -5]} intensity={2.0} color="#A855F7" />

        <OrbitClusterHelper />

        <Suspense fallback={null}>
          <OrbitingCluster
            skills={SKILLS}
            onSelectSkill={onSelectSkill}
            selectedSkill={selectedSkill}
          />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.65}
          dampingFactor={0.05}
        />
      </Canvas>

      {/* Hint Badge */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/60 px-4 py-1.5 text-xs font-mono text-gray-300 backdrop-blur-md">
        ⚡ Click & Drag to Rotate 3D Skill Constellation
      </div>
    </div>
  );
};

function OrbitClusterHelper() {
  return null;
}
