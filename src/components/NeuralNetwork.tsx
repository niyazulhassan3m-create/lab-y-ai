"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function NeuralParticles({ count = 1200 }) {
  const meshRef = useRef<THREE.Points>(null!);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const t = Math.random();
      col[i * 3] = 0.5 + t * 0.3;
      col[i * 3 + 1] = 0.0 + t * 0.1;
      col[i * 3 + 2] = 0.0 + t * 0.05;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    meshRef.current.rotation.y = t * 0.03;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial size={0.06} vertexColors sizeAttenuation transparent opacity={0.8} />
    </points>
  );
}

function NeuralLines() {
  const lineRef = useRef<THREE.LineSegments>(null!);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < 80; i++) {
      const r = 3 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      nodes.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ));
    }
    const pairs: number[] = [];
    for (let i = 0; i < 200; i++) {
      const a = Math.floor(Math.random() * nodes.length);
      let b = Math.floor(Math.random() * nodes.length);
      while (b === a) b = Math.floor(Math.random() * nodes.length);
      pairs.push(nodes[a].x, nodes[a].y, nodes[a].z);
      pairs.push(nodes[b].x, nodes[b].y, nodes[b].z);
    }
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pairs), 3));
    return geo;
  }, []);

  useFrame((state) => {
    lineRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    lineRef.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#800000" opacity={0.15} transparent />
    </lineSegments>
  );
}

function CenterCore() {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    meshRef.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.05);
  });
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.8, 1]} />
      <meshBasicMaterial color="#800000" wireframe transparent opacity={0.4} />
    </mesh>
  );
}

function GlowSphere() {
  return (
    <mesh>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshBasicMaterial color="#800000" transparent opacity={0.04} />
    </mesh>
  );
}

export default function NeuralNetwork() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
        <CenterCore />
        <GlowSphere />
        <NeuralParticles />
        <NeuralLines />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  );
}
