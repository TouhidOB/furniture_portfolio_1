import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import {
  getBoucleTexture,
  getWoodTexture,
  getLeatherTexture,
  getMarbleTexture
} from './materials';

/**
 * Forma Modular Sofa
 * Architectural low-profile modular seating landscape with soft organic fillets and tactile bouclé weave.
 */
export function SofaMesh({ color = '#F5F2EC', finish = 'boucle' }) {
  const group = useRef();

  // Generate or retrieve cached PBR materials
  const upholsteryProps = useMemo(() => {
    if (finish === 'leather') {
      const l = getLeatherTexture(color);
      return {
        color,
        map: l.map,
        bumpMap: l.bumpMap,
        bumpScale: l.bumpScale,
        roughness: 0.38,
        metalness: 0.05
      };
    }
    const b = getBoucleTexture(color);
    return {
      color,
      map: b.map,
      bumpMap: b.bumpMap,
      bumpScale: b.bumpScale,
      roughness: 0.88,
      metalness: 0.0
    };
  }, [color, finish]);

  const woodBase = useMemo(() => {
    const w = getWoodTexture('walnut');
    return {
      map: w.map,
      bumpMap: w.bumpMap,
      bumpScale: w.bumpScale,
      roughness: 0.65,
      metalness: 0.04
    };
  }, []);

  return (
    <group ref={group} position={[0, -0.4, 0]}>
      {/* Hand-Finished Walnut Sub-Plinth Base */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.14, 1.3]} />
        <meshStandardMaterial {...woodBase} color="#342016" />
      </mesh>

      {/* Main Base Cushions - Module 1 (Left) with Soft Rounded Fillets */}
      <RoundedBox
        args={[1.5, 0.42, 1.2]}
        radius={0.08}
        smoothness={4}
        position={[-0.8, 0.35, 0.05]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...upholsteryProps} />
      </RoundedBox>

      {/* Main Base Cushions - Module 2 (Right Extended Chaise) */}
      <RoundedBox
        args={[1.5, 0.42, 1.5]}
        radius={0.08}
        smoothness={4}
        position={[0.8, 0.35, 0.2]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...upholsteryProps} />
      </RoundedBox>

      {/* Sculptural Ergonomic Backrest - Left */}
      <RoundedBox
        args={[1.5, 0.45, 0.34]}
        radius={0.07}
        smoothness={4}
        position={[-0.8, 0.72, -0.42]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...upholsteryProps} />
      </RoundedBox>

      {/* Sculptural Ergonomic Backrest - Right */}
      <RoundedBox
        args={[1.5, 0.45, 0.34]}
        radius={0.07}
        smoothness={4}
        position={[0.8, 0.72, -0.42]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...upholsteryProps} />
      </RoundedBox>

      {/* Left Sculptural Armrest Pillow Block */}
      <RoundedBox
        args={[0.3, 0.38, 1.2]}
        radius={0.07}
        smoothness={4}
        position={[-1.6, 0.52, 0.05]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...upholsteryProps} />
      </RoundedBox>

      {/* Tactile Accent Throw Cushion in Natural Sand Linen */}
      <RoundedBox
        args={[0.55, 0.4, 0.22]}
        radius={0.06}
        smoothness={4}
        position={[-0.9, 0.62, 0.1]}
        rotation={[0.1, 0.25, 0]}
        castShadow
      >
        <meshStandardMaterial color="#D7C5AF" roughness={0.92} />
      </RoundedBox>
    </group>
  );
}

/**
 * Arc Lounge Chair
 * Molded steam-bent American walnut outer shell with 360-degree aluminum swivel base.
 */
export function ChairMesh({ color = '#181818', finish = 'leather' }) {
  const group = useRef();

  const cushionProps = useMemo(() => {
    // Elevate pure black to deep charcoal graphite (#242424) so specular highlights and texture pop in dark studio scenes
    const effectiveColor = color === '#181818' ? '#262626' : color;
    if (finish === 'boucle') {
      const b = getBoucleTexture(effectiveColor);
      return {
        color: effectiveColor,
        map: b.map,
        bumpMap: b.bumpMap,
        bumpScale: b.bumpScale,
        roughness: 0.88
      };
    }
    const l = getLeatherTexture(effectiveColor);
    return {
      color: effectiveColor,
      map: l.map,
      bumpMap: l.bumpMap,
      bumpScale: l.bumpScale,
      roughness: 0.38,
      metalness: 0.12
    };
  }, [color, finish]);

  const woodShellProps = useMemo(() => {
    const w = getWoodTexture('walnut');
    return {
      color: '#633B22',
      map: w.map,
      bumpMap: w.bumpMap,
      bumpScale: w.bumpScale,
      roughness: 0.42,
      metalness: 0.08
    };
  }, []);

  return (
    <group ref={group} position={[0, -0.3, 0]}>
      {/* 4-Star Die-Cast Satin Aluminum Swivel Base */}
      <group position={[0, 0.05, 0]}>
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.3, 24]} />
          <meshStandardMaterial color="#6E6E6E" metalness={0.85} roughness={0.25} />
        </mesh>
        {[-0.35, 0.35].map((x, i) => (
          <RoundedBox key={`leg-x-${i}`} args={[0.7, 0.03, 0.06]} radius={0.01} position={[x / 2, 0.02, 0]} castShadow>
            <meshStandardMaterial color="#555555" metalness={0.85} roughness={0.3} />
          </RoundedBox>
        ))}
        {[-0.35, 0.35].map((z, i) => (
          <RoundedBox key={`leg-z-${i}`} args={[0.06, 0.03, 0.7]} radius={0.01} position={[0, 0.02, z / 2]} castShadow>
            <meshStandardMaterial color="#555555" metalness={0.85} roughness={0.3} />
          </RoundedBox>
        ))}
      </group>

      {/* Steam-Bent American Walnut Sculptural Outer Shell Components */}
      {/* 1. Base Shell Tray */}
      <RoundedBox
        args={[1.04, 0.08, 0.92]}
        radius={0.03}
        smoothness={4}
        position={[0, 0.23, 0.02]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...woodShellProps} />
      </RoundedBox>

      {/* 2. Angled Ergonomic Back Shell */}
      <RoundedBox
        args={[0.96, 0.68, 0.07]}
        radius={0.03}
        smoothness={4}
        position={[0, 0.68, -0.36]}
        rotation={[-0.24, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...woodShellProps} />
      </RoundedBox>

      {/* 3. Sculptural Headrest Timber Shell */}
      <RoundedBox
        args={[0.76, 0.28, 0.06]}
        radius={0.03}
        smoothness={4}
        position={[0, 1.02, -0.44]}
        rotation={[-0.24, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...woodShellProps} />
      </RoundedBox>

      {/* 4. Left & Right Steam-Bent Arm Flanks */}
      <RoundedBox
        args={[0.07, 0.24, 0.72]}
        radius={0.025}
        position={[-0.48, 0.38, 0.02]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...woodShellProps} />
      </RoundedBox>
      <RoundedBox
        args={[0.07, 0.24, 0.72]}
        radius={0.025}
        position={[0.48, 0.38, 0.02]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...woodShellProps} />
      </RoundedBox>

      {/* Handcrafted Leather Upholstery Cushions */}
      {/* 1. Deep Sculpted Seat Cushion */}
      <RoundedBox
        args={[0.86, 0.18, 0.76]}
        radius={0.06}
        smoothness={4}
        position={[0, 0.33, 0.06]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...cushionProps} />
      </RoundedBox>

      {/* 2. Contoured Ergonomic Back Cushion */}
      <RoundedBox
        args={[0.82, 0.54, 0.16]}
        radius={0.06}
        smoothness={4}
        position={[0, 0.66, -0.28]}
        rotation={[-0.24, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...cushionProps} />
      </RoundedBox>

      {/* 3. Lumbar Support Bolster Pillow */}
      <mesh position={[0, 0.46, -0.16]} rotation={[-0.1, 0, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.74, 24]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial {...cushionProps} />
      </mesh>

      {/* 4. Contoured Padded Armrest Pillows */}
      <RoundedBox
        args={[0.13, 0.06, 0.66]}
        radius={0.02}
        position={[-0.48, 0.52, 0.02]}
        castShadow
      >
        <meshStandardMaterial {...cushionProps} />
      </RoundedBox>
      <RoundedBox
        args={[0.13, 0.06, 0.66]}
        radius={0.02}
        position={[0.48, 0.52, 0.02]}
        castShadow
      >
        <meshStandardMaterial {...cushionProps} />
      </RoundedBox>

      {/* 5. Sculptural Headrest Cushion */}
      <RoundedBox
        args={[0.72, 0.24, 0.14]}
        radius={0.05}
        position={[0, 1.02, -0.38]}
        rotation={[-0.24, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...cushionProps} />
      </RoundedBox>
    </group>
  );
}

/**
 * Terra Dining Table
 * Monolithic solid French oak with fluted cylindrical pedestals and reverse chamfer edges.
 */
export function TableMesh({ color = '#72503C', finish = 'wood' }) {
  const group = useRef();
  const isStone = finish === 'stone';

  const surfaceProps = useMemo(() => {
    if (isStone) {
      const m = getMarbleTexture();
      return {
        color: '#EAE6DF',
        map: m.map,
        roughness: m.roughness,
        metalness: m.metalness
      };
    }
    const w = getWoodTexture('oak');
    return {
      color,
      map: w.map,
      bumpMap: w.bumpMap,
      bumpScale: w.bumpScale,
      roughness: 0.56,
      metalness: 0.04
    };
  }, [color, isStone]);

  return (
    <group ref={group} position={[0, -0.4, 0]}>
      {/* Twin Fluted Architectural Pedestal Cylinders */}
      {[-0.9, 0.9].map((pos, index) => (
        <group key={index} position={[pos, 0.38, 0]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.3, 0.34, 0.72, 36]} />
            <meshStandardMaterial {...surfaceProps} />
          </mesh>
        </group>
      ))}

      {/* Monolithic 45mm Tabletop Slab with Soft Reverse Chamfer */}
      <RoundedBox
        args={[3.2, 0.08, 1.3]}
        radius={0.03}
        smoothness={3}
        position={[0, 0.76, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...surfaceProps} />
      </RoundedBox>

      {/* Underside Structural Bevel Sub-Frame */}
      <mesh position={[0, 0.71, 0]}>
        <boxGeometry args={[2.9, 0.04, 1.1]} />
        <meshStandardMaterial color="#2E1C14" roughness={0.8} />
      </mesh>
    </group>
  );
}

/**
 * Eos Platform Bed
 * Recessed plinth levitation base with upholstered natural linen headboard.
 */
export function BedMesh({ color = '#D7C5AF' }) {
  const group = useRef();

  const woodProps = useMemo(() => {
    const w = getWoodTexture('walnut');
    return {
      color: '#4A2E1B',
      map: w.map,
      bumpMap: w.bumpMap,
      bumpScale: w.bumpScale,
      roughness: 0.52
    };
  }, []);

  const fabricProps = useMemo(() => {
    const b = getBoucleTexture(color);
    return {
      color,
      map: b.map,
      bumpMap: b.bumpMap,
      bumpScale: b.bumpScale,
      roughness: 0.88
    };
  }, [color]);

  return (
    <group ref={group} position={[0, -0.4, 0]}>
      {/* Recessed Floating Shadow Base */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[2.1, 0.18, 2.3]} />
        <meshStandardMaterial color="#161616" roughness={0.9} />
      </mesh>

      {/* Extended Solid Ash / Oak Timber Platform Surround */}
      <RoundedBox
        args={[2.6, 0.08, 2.7]}
        radius={0.02}
        smoothness={3}
        position={[0, 0.22, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...woodProps} />
      </RoundedBox>

      {/* Mattress in Belgian Off-White Wool Weave */}
      <RoundedBox
        args={[2.1, 0.26, 2.2]}
        radius={0.05}
        smoothness={3}
        position={[0, 0.38, 0.05]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#F5F2EC" roughness={0.85} />
      </RoundedBox>

      {/* Solid Timber Headboard Backing */}
      <RoundedBox
        args={[2.6, 0.9, 0.12]}
        radius={0.02}
        smoothness={3}
        position={[0, 0.72, -1.25]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...woodProps} />
      </RoundedBox>

      {/* Twin Upholstered Cushioned Headboard Bolsters */}
      {[-0.6, 0.6].map((x, i) => (
        <RoundedBox
          key={i}
          args={[1.05, 0.65, 0.14]}
          radius={0.05}
          smoothness={4}
          position={[x, 0.72, -1.16]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial {...fabricProps} />
        </RoundedBox>
      ))}

      {/* Folded Natural Linen Duvet Runner */}
      <RoundedBox
        args={[2.14, 0.05, 1.1]}
        radius={0.02}
        position={[0, 0.52, 0.5]}
        castShadow
      >
        <meshStandardMaterial {...fabricProps} />
      </RoundedBox>
    </group>
  );
}

/**
 * Linear Credenza
 * Fluted solid timber doors with honed Italian marble crown.
 */
export function CabinetMesh({ color = '#72503C' }) {
  const group = useRef();

  const woodProps = useMemo(() => {
    const w = getWoodTexture('oak');
    return {
      color,
      map: w.map,
      bumpMap: w.bumpMap,
      bumpScale: w.bumpScale,
      roughness: 0.58
    };
  }, [color]);

  const marbleProps = useMemo(() => {
    const m = getMarbleTexture();
    return {
      map: m.map,
      roughness: m.roughness,
      metalness: m.metalness
    };
  }, []);

  return (
    <group ref={group} position={[0, -0.3, 0]}>
      {/* Slender Architectural Metal Base Frame */}
      <group position={[0, 0.1, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2.4, 0.04, 0.6]} />
          <meshStandardMaterial color="#1A1816" metalness={0.9} roughness={0.25} />
        </mesh>
        {[-1.1, 1.1].map((x, i) => (
          <mesh key={i} position={[x, -0.08, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.16, 16]} />
            <meshStandardMaterial color="#1A1816" metalness={0.9} roughness={0.25} />
          </mesh>
        ))}
      </group>

      {/* Fluted Timber Carcass with Rounded Corners */}
      <RoundedBox
        args={[2.5, 0.68, 0.65]}
        radius={0.03}
        smoothness={3}
        position={[0, 0.46, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...woodProps} />
      </RoundedBox>

      {/* Honed Natural Marble Top Crown */}
      <RoundedBox
        args={[2.54, 0.04, 0.68]}
        radius={0.015}
        position={[0, 0.82, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...marbleProps} />
      </RoundedBox>
    </group>
  );
}

/**
 * Alto Executive Desk
 * Solid cantilevered noir oak with inlaid Tuscan saddle leather writing surface.
 */
export function DeskMesh({ color = '#181818' }) {
  const group = useRef();

  const woodProps = useMemo(() => {
    const w = getWoodTexture('noir');
    return {
      color,
      map: w.map,
      bumpMap: w.bumpMap,
      bumpScale: w.bumpScale,
      roughness: 0.56
    };
  }, [color]);

  const leatherProps = useMemo(() => {
    const l = getLeatherTexture('#5C3D28');
    return {
      color: '#5C3D28',
      map: l.map,
      bumpMap: l.bumpMap,
      bumpScale: l.bumpScale,
      roughness: 0.36,
      metalness: 0.04
    };
  }, []);

  return (
    <group ref={group} position={[0, -0.35, 0]}>
      {/* Solid Vertical Pedestal Slab (Left) */}
      <RoundedBox
        args={[0.45, 0.76, 0.85]}
        radius={0.02}
        position={[-1.0, 0.4, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...woodProps} />
      </RoundedBox>

      {/* Cantilevered Floating Desk Top */}
      <RoundedBox
        args={[2.6, 0.08, 0.95]}
        radius={0.02}
        position={[0.2, 0.78, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...woodProps} />
      </RoundedBox>

      {/* Inlaid Saddle Leather Writing Pad with Pebble Grain Texture */}
      <RoundedBox
        args={[1.5, 0.01, 0.65]}
        radius={0.01}
        position={[0.2, 0.825, 0.02]}
        receiveShadow
      >
        <meshStandardMaterial {...leatherProps} />
      </RoundedBox>

      {/* Slender Structural Right Steel Blade Leg */}
      <mesh position={[1.35, 0.38, 0]} castShadow>
        <boxGeometry args={[0.04, 0.74, 0.8]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}
