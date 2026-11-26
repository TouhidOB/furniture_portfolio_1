import React from 'react';

export default function ProductLighting({ darkTheme = false }) {
  if (darkTheme) {
    return (
      <group>
        {/* Warm Ambient Fill to prevent pitch-black shadow collapse */}
        <ambientLight intensity={0.75} color="#D7C5AF" />

        {/* Primary Key Spotlight focused on the front-right of the piece */}
        <spotLight
          position={[3.2, 4.0, 3.5]}
          angle={0.7}
          penumbra={0.75}
          intensity={6.0}
          color="#FFF8EE"
          castShadow
          shadow-bias={-0.0001}
          shadow-mapSize={[1024, 1024]}
        />

        {/* Front-Center Fill Light for clear cushion and texture visibility */}
        <directionalLight
          position={[0.5, 2.2, 3.8]}
          intensity={2.8}
          color="#FFF5E8"
        />

        {/* Warm Golden Silhouette Rim Backlight to trace piece contours against dark backdrop */}
        <directionalLight
          position={[-3.5, 3.5, -2.5]}
          intensity={4.5}
          color="#E6C8A0"
        />

        {/* Secondary Cool Edge Rim Light */}
        <directionalLight
          position={[3.5, 2.5, -3.0]}
          intensity={2.2}
          color="#C8D4E0"
        />

        {/* Soft Under-Plinth Uplight to illuminate wood underside and base */}
        <pointLight
          position={[0.6, -0.1, 1.2]}
          intensity={1.5}
          color="#D7C5AF"
        />
      </group>
    );
  }

  return (
    <group>
      {/* Warm Ambient Studio */}
      <ambientLight intensity={0.8} color="#F7F4EE" />

      {/* Main Studio Key Light */}
      <directionalLight
        position={[-3.5, 4.5, 3]}
        intensity={1.8}
        color="#FFF9F0"
        castShadow
        shadow-bias={-0.0001}
        shadow-mapSize={[1024, 1024]}
      />

      {/* Warm Side Fill */}
      <directionalLight
        position={[3.5, 2.5, 2]}
        intensity={0.8}
        color="#F0E2D0"
      />

      {/* Silhouette Rim Backlight */}
      <directionalLight
        position={[0, 3, -4]}
        intensity={0.85}
        color="#E6EEF5"
      />
    </group>
  );
}
