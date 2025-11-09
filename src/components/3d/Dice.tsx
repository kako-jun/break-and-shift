import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface DiceProps {
  position: [number, number, number];
  value?: number;
  onRest?: (value: number) => void;
}

const getDotPositions = (face: number): [number, number, number][] => {
  const offset = 0.51;
  const spacing = 0.15;

  switch (face) {
    case 1:
      return [[0, offset, 0]];
    case 2:
      return [
        [-spacing, offset, -spacing],
        [spacing, offset, spacing],
      ];
    case 3:
      return [
        [-spacing, offset, -spacing],
        [0, offset, 0],
        [spacing, offset, spacing],
      ];
    case 4:
      return [
        [-spacing, offset, -spacing],
        [spacing, offset, -spacing],
        [-spacing, offset, spacing],
        [spacing, offset, spacing],
      ];
    case 5:
      return [
        [-spacing, offset, -spacing],
        [spacing, offset, -spacing],
        [0, offset, 0],
        [-spacing, offset, spacing],
        [spacing, offset, spacing],
      ];
    case 6:
      return [
        [-spacing, offset, -spacing],
        [spacing, offset, -spacing],
        [-spacing, offset, 0],
        [spacing, offset, 0],
        [-spacing, offset, spacing],
        [spacing, offset, spacing],
      ];
    default:
      return [];
  }
};

export default function Dice({ position, value }: DiceProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const velocityRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const angularVelocityRef = useRef<THREE.Euler>(new THREE.Euler());

  useFrame(() => {
    if (meshRef.current) {
      // 重力
      velocityRef.current.y -= 0.001;

      // 位置更新
      meshRef.current.position.add(velocityRef.current);

      // 回転更新
      meshRef.current.rotation.x += angularVelocityRef.current.x;
      meshRef.current.rotation.y += angularVelocityRef.current.y;
      meshRef.current.rotation.z += angularVelocityRef.current.z;

      // 床との衝突判定
      if (meshRef.current.position.y < 0.5) {
        meshRef.current.position.y = 0.5;
        velocityRef.current.y *= -0.5; // 反発係数
        velocityRef.current.multiplyScalar(0.98); // 摩擦
        angularVelocityRef.current.x *= 0.95;
        angularVelocityRef.current.y *= 0.95;
        angularVelocityRef.current.z *= 0.95;
      }

      // 静止判定
      if (
        Math.abs(velocityRef.current.length()) < 0.001 &&
        Math.abs(angularVelocityRef.current.x) < 0.01
      ) {
        velocityRef.current.set(0, 0, 0);
        angularVelocityRef.current.set(0, 0, 0);
      }
    }
  });

  const rollDice = () => {
    if (meshRef.current) {
      // ランダムな初速度
      velocityRef.current.set(
        (Math.random() - 0.5) * 0.3,
        Math.random() * 0.5 + 0.3,
        (Math.random() - 0.5) * 0.3
      );

      // ランダムな角速度
      angularVelocityRef.current.set(
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3
      );

      // 初期位置
      meshRef.current.position.set(...position);
    }
  };

  // 初期化時に振る
  useRef(() => {
    rollDice();
  });

  return (
    <group>
      <RoundedBox
        ref={meshRef}
        args={[1, 1, 1]}
        radius={0.1}
        smoothness={4}
        position={position}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#f0f0f0" roughness={0.3} metalness={0.1} />
      </RoundedBox>

      {/* サイコロの目（簡易版） */}
      {value &&
        getDotPositions(value).map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        ))}
    </group>
  );
}
