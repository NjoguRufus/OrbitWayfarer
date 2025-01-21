import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const TanzaniaMap3D = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [mapTexture] = useTexture([
    'https://raw.githubusercontent.com/djaiss/mapsicon/master/africa/tz/1024.png'
  ]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[2, 2]} />
      <meshStandardMaterial
        map={mapTexture}
        transparent
        opacity={0.9}
        metalness={0.5}
        roughness={0.5}
      />
    </mesh>
  );
};

export default TanzaniaMap3D;