import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function Dice({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#f0f0f0" />
    </mesh>
  );
}

export default function DiceScene() {
  const diceCount = 3;

  return (
    <div className="w-full h-96 bg-boundary-indigo rounded-lg overflow-hidden">
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 5, 8]} />
          <OrbitControls
            enablePan={false}
            minDistance={5}
            maxDistance={15}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
          />

          {/* ライト */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, 10, -5]} intensity={0.5} />

          {/* 床 */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="#2d3e5f" />
          </mesh>

          {/* 壁（サイコロを囲む） */}
          <mesh position={[0, 1, -3]}>
            <boxGeometry args={[6, 2, 0.2]} />
            <meshStandardMaterial color="#1a2332" />
          </mesh>
          <mesh position={[-3, 1, 0]}>
            <boxGeometry args={[0.2, 2, 6]} />
            <meshStandardMaterial color="#1a2332" />
          </mesh>
          <mesh position={[3, 1, 0]}>
            <boxGeometry args={[0.2, 2, 6]} />
            <meshStandardMaterial color="#1a2332" />
          </mesh>

          {/* サイコロ */}
          {Array.from({ length: diceCount }).map((_, i) => (
            <Dice key={i} position={[(i - 1) * 1.2, 2, 0]} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
