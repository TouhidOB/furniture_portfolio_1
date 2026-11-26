import React, { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import {
  SofaMesh,
  ChairMesh,
  TableMesh,
  BedMesh,
  CabinetMesh,
  DeskMesh,
} from './FurnitureModels';

function CustomGLBModel({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene.clone()} castShadow receiveShadow />;
}

export default function ProductModel({
  type = 'sofa',
  color = '#F5F2EC',
  finish = 'boucle',
  glbUrl = null,
  scale = 1,
  rotation = [0, 0, 0],
  autoRotate = false,
  autoRotateSpeed = 0.3,
}) {
  const modelRef = useRef();

  useFrame((state, delta) => {
    if (autoRotate && modelRef.current) {
      modelRef.current.rotation.y += delta * autoRotateSpeed;
    }
  });

  const renderMesh = () => {
    switch (type.toLowerCase()) {
      case 'chair':
      case 'lounge chair':
      case 'armchair':
        return <ChairMesh color={color} finish={finish} />;
      case 'table':
      case 'dining table':
        return <TableMesh color={color} finish={finish} />;
      case 'bed':
      case 'platform bed':
        return <BedMesh color={color} finish={finish} />;
      case 'cabinet':
      case 'credenza':
      case 'storage':
        return <CabinetMesh color={color} finish={finish} />;
      case 'desk':
      case 'executive desk':
        return <DeskMesh color={color} finish={finish} />;
      case 'sofa':
      default:
        return <SofaMesh color={color} finish={finish} />;
    }
  };

  const scaleArray = Array.isArray(scale) ? scale : [scale, scale, scale];

  if (glbUrl) {
    return (
      <group ref={modelRef} scale={scaleArray} rotation={rotation}>
        <Suspense fallback={renderMesh()}>
          <CustomGLBModel url={glbUrl} />
        </Suspense>
      </group>
    );
  }

  return (
    <group ref={modelRef} scale={scaleArray} rotation={rotation}>
      {renderMesh()}
    </group>
  );
}
