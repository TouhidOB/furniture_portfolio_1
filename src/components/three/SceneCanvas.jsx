import React, { Suspense, Component } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import ProductLighting from './ProductLighting';
import ModelFallback from './ModelFallback';
import { useDevicePerformance } from '../../hooks/useDevicePerformance';

class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('Three.js Canvas encountered an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ModelFallback
          imageUrl={this.props.fallbackImage}
          alt={this.props.alt}
          darkTheme={this.props.darkTheme}
        />
      );
    }
    return this.props.children;
  }
}

export default function SceneCanvas({
  children,
  darkTheme = false,
  fallbackImage,
  alt = 'Furniture preview',
  camera = { position: [0, 1.2, 3.8], fov: 45 },
  shadows = true,
  className = '',
}) {
  const { dpr, hasWebGL } = useDevicePerformance();

  if (!hasWebGL) {
    return (
      <ModelFallback
        imageUrl={fallbackImage}
        alt={alt}
        darkTheme={darkTheme}
      />
    );
  }

  return (
    <div
      className={`relative w-full h-full select-none overflow-hidden ${className}`}
      style={{ touchAction: 'pan-y' }}
    >
      <CanvasErrorBoundary fallbackImage={fallbackImage} alt={alt} darkTheme={darkTheme}>
        <Canvas
          shadows={shadows}
          dpr={dpr}
          camera={camera}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.15,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(darkTheme ? '#181818' : '#F5F2EC', 1);
          }}
          className="canvas-container"
        >
          <color attach="background" args={[darkTheme ? '#181818' : '#F5F2EC']} />

          <Suspense fallback={null}>
            <ProductLighting darkTheme={darkTheme} />

            {/* Main 3D Models and Camera Controls */}
            {children}

            {/* Soft Contact Shadows on Floor */}
            <ContactShadows
              position={[0, -0.4, 0]}
              opacity={darkTheme ? 0.8 : 0.45}
              scale={10}
              blur={2.4}
              far={4}
              resolution={512}
              color={darkTheme ? '#050505' : '#4A3E38'}
            />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
