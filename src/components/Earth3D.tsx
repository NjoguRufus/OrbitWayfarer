import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function Earth3D() {
  const earthRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  const [dayMap] = useTexture([
    'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
  ]);

  dayMap.colorSpace = THREE.SRGBColorSpace;

  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.05;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={dayMap}
          metalness={0.1}
          roughness={0.5} // Reduced roughness for better light reflection
        />
      </mesh>
      <mesh ref={atmosphereRef} scale={[1.015, 1.015, 1.015]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          transparent
          opacity={0.15} // Reduced opacity of atmosphere
          color="#4db2ff"
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}