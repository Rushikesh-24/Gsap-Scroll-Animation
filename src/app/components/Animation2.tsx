"use client";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

const Scene = () => {
  let texture = useTexture("./club.png");
  let tex = useRef(null);
  useFrame((_, delta) => {
    if (tex.current) (tex.current as THREE.Mesh).rotation.y += delta;
  });
  return (
    <group rotation={[0, 1.4, 0.5]}>
      <mesh ref={tex}>
        <cylinderGeometry args={[1, 1, 1, 60, 60, true]} />
        <meshStandardMaterial
          side={THREE.DoubleSide}
          map={texture}
          transparent
        />
      </mesh>
    </group>
  );
};

const Animation2 = () => {
  return (
    <div className="w-full h-screen bg-black flex justify-center items-center sticky top-1/2 left-1/2 -translate-y-1/2 transform">
      <Canvas camera={{ fov: 25 }} flat fallback>
        <OrbitControls enableZoom={false} />
        <ambientLight />
        <Scene />
      </Canvas>
    </div>
  );
};

export default Animation2;
