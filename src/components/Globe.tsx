import { useRef, useEffect } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

export function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scene } = useThree();

  // Load textures
  const [dayTexture, nightTexture, bumpRoughnessTexture] = useLoader(TextureLoader, [
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png',
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.png'
  ]);

  useEffect(() => {
    if (!dayTexture || !nightTexture || !bumpRoughnessTexture) return;

    // Configure textures
    dayTexture.colorSpace = THREE.SRGBColorSpace;
    nightTexture.colorSpace = THREE.SRGBColorSpace;
    
    dayTexture.anisotropy = 8;
    nightTexture.anisotropy = 8;
    bumpRoughnessTexture.anisotropy = 8;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    // Add directional light (sun)
    const sunLight = new THREE.DirectionalLight(0xffffff, 2);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

  }, [dayTexture, nightTexture, bumpRoughnessTexture, scene]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotate the globe
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhongMaterial
        map={dayTexture}
        normalMap={bumpRoughnessTexture}
        emissiveMap={nightTexture}
        emissive={new THREE.Color(0x444444)}
        shininess={5}
      />
    </mesh>
  );
}