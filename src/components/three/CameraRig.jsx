import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function CameraRig({
  targetPosition = [0, 1.2, 3.8],
  lookAt = [0, 0.4, 0],
  enableParallax = true,
  parallaxIntensity = 0.25,
  lerpSpeed = 0.05,
}) {
  const { camera } = useThree();
  const mousePos = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (enableParallax) {
      // Clamp mouse coordinates to [-1, 1] to avoid extreme jumps at viewport edges
      const targetMouseX = Math.max(-1, Math.min(1, state.mouse.x)) * parallaxIntensity;
      const targetMouseY = Math.max(-1, Math.min(1, state.mouse.y)) * (parallaxIntensity * 0.5);
      mousePos.current.x = THREE.MathUtils.lerp(mousePos.current.x, targetMouseX, 0.06);
      mousePos.current.y = THREE.MathUtils.lerp(mousePos.current.y, targetMouseY, 0.06);
    } else {
      mousePos.current.x = THREE.MathUtils.lerp(mousePos.current.x, 0, 0.06);
      mousePos.current.y = THREE.MathUtils.lerp(mousePos.current.y, 0, 0.06);
    }

    const desiredX = targetPosition[0] + mousePos.current.x;
    const desiredY = targetPosition[1] + mousePos.current.y;
    const desiredZ = targetPosition[2];

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, desiredX, lerpSpeed);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, desiredY, lerpSpeed);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, desiredZ, lerpSpeed);

    const targetVector = new THREE.Vector3(...lookAt);
    camera.lookAt(targetVector);
  });

  return null;
}
