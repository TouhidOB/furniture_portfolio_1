import React from 'react';
import { OrbitControls } from '@react-three/drei';

export default function ProductControls({
  enabled = true,
  autoRotate = false,
  autoRotateSpeed = 0.6,
  minDistance = 2.0,
  maxDistance = 6.0,
  minPolarAngle = Math.PI / 6,
  maxPolarAngle = Math.PI / 2.05, // don't go under floor
  enableZoom = false, // DISABLED by default so webpage scrolling is never hijacked
}) {
  if (!enabled) return null;

  return (
    <OrbitControls
      makeDefault={false}
      enablePan={false}
      enableZoom={enableZoom}
      autoRotate={autoRotate}
      autoRotateSpeed={autoRotateSpeed}
      minDistance={minDistance}
      maxDistance={maxDistance}
      minPolarAngle={minPolarAngle}
      maxPolarAngle={maxPolarAngle}
      dampingFactor={0.08}
      enableDamping
      rotateSpeed={0.7}
      touchAction="pan-y"
    />
  );
}
