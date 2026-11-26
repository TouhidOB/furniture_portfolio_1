import * as THREE from 'three';

// Texture cache to prevent redundant canvas allocations
const textureCache = new Map();

/**
 * Procedural Bouclé Fabric Texture Generator
 * Creates realistic looping wool fibers with organic micro-depth and bump mapping.
 */
export function getBoucleTexture(baseColor = '#F5F2EC') {
  const cacheKey = `boucle_${baseColor}`;
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey);

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Base background fill
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);

  // Parse base color components for subtle tonal shifts
  const c = new THREE.Color(baseColor);
  const darkVariant = c.clone().multiplyScalar(0.92).getStyle();
  const lightVariant = c.clone().lerp(new THREE.Color('#FFFFFF'), 0.18).getStyle();

  // Draw intertwined looped wool threads
  const step = 8;
  for (let x = 0; x < size; x += step) {
    for (let y = 0; y < size; y += step) {
      const radius = 3 + Math.random() * 3.5;
      const angle = Math.random() * Math.PI * 2;
      const offsetX = Math.cos(angle) * 2;
      const offsetY = Math.sin(angle) * 2;

      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, radius, 0, Math.PI * 2);
      ctx.fillStyle = Math.random() > 0.5 ? darkVariant : lightVariant;
      ctx.globalAlpha = 0.28 + Math.random() * 0.25;
      ctx.fill();

      // Micro curly loop accent
      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, radius * 0.65, 0, Math.PI);
      ctx.strokeStyle = darkVariant;
      ctx.lineWidth = 1.2;
      ctx.globalAlpha = 0.35;
      ctx.stroke();
    }
  }

  // Create normal / bump canvas
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bCtx = bumpCanvas.getContext('2d');
  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, size, size);

  for (let x = 0; x < size; x += step) {
    for (let y = 0; y < size; y += step) {
      const radius = 3 + Math.random() * 3;
      const val = Math.floor(Math.random() * 110);
      bCtx.beginPath();
      bCtx.arc(x, y, radius, 0, Math.PI * 2);
      bCtx.fillStyle = `rgb(${val}, ${val}, ${val})`;
      bCtx.globalAlpha = 0.45;
      bCtx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(4, 4);

  const bundle = { map: texture, bumpMap, bumpScale: 0.045 };
  textureCache.set(cacheKey, bundle);
  return bundle;
}

/**
 * Procedural Natural Wood Grain Texture Generator
 * Creates realistic annular ring flow, grain rays, and fine pores.
 */
export function getWoodTexture(species = 'oak') {
  const cacheKey = `wood_${species}`;
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey);

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const baseHex = species === 'walnut' ? '#4A2E1B' : species === 'noir' ? '#1E1C1A' : '#72503C';
  const c = new THREE.Color(baseHex);
  const grainDark = c.clone().multiplyScalar(0.78).getStyle();
  const grainLight = c.clone().multiplyScalar(1.15).getStyle();

  ctx.fillStyle = c.getStyle();
  ctx.fillRect(0, 0, width, height);

  // Draw natural grain wave lines
  const numLines = 90;
  for (let i = 0; i < numLines; i++) {
    const yBase = (height / numLines) * i;
    ctx.beginPath();
    ctx.moveTo(0, yBase);

    for (let x = 0; x < width; x += 30) {
      const wave = Math.sin((x / width) * Math.PI * 3 + i * 0.4) * 8 + Math.cos(x * 0.02) * 4;
      ctx.lineTo(x, yBase + wave);
    }

    ctx.strokeStyle = i % 2 === 0 ? grainDark : grainLight;
    ctx.lineWidth = 1.2 + Math.random() * 2.2;
    ctx.globalAlpha = 0.28 + Math.random() * 0.22;
    ctx.stroke();
  }

  // Draw fine pores
  ctx.fillStyle = grainDark;
  ctx.globalAlpha = 0.18;
  for (let p = 0; p < 800; p++) {
    const px = Math.random() * width;
    const py = Math.random() * height;
    ctx.fillRect(px, py, 4 + Math.random() * 8, 1.2);
  }

  // Bump Map for Wood Pores
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bCtx = bumpCanvas.getContext('2d');
  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, width, height);

  bCtx.fillStyle = '#404040';
  bCtx.globalAlpha = 0.35;
  for (let p = 0; p < 1200; p++) {
    const px = Math.random() * width;
    const py = Math.random() * height;
    bCtx.fillRect(px, py, 6 + Math.random() * 12, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(2, 2);

  const bundle = { map: texture, bumpMap, bumpScale: 0.022 };
  textureCache.set(cacheKey, bundle);
  return bundle;
}

/**
 * Procedural Pebble Leather Texture Generator
 * Generates organic cellular grain and soft satin specular highlight.
 */
export function getLeatherTexture(color = '#181818') {
  const cacheKey = `leather_${color}`;
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey);

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, size, size);

  const c = new THREE.Color(color);
  const crevice = c.clone().multiplyScalar(0.7).getStyle();
  const highlight = c.clone().lerp(new THREE.Color('#FFFFFF'), 0.12).getStyle();

  // Organic pebble cells
  const cellSize = 10;
  for (let x = 0; x < size; x += cellSize) {
    for (let y = 0; y < size; y += cellSize) {
      const cx = x + (Math.random() - 0.5) * 3;
      const cy = y + (Math.random() - 0.5) * 3;
      const r = (cellSize / 2) * (0.8 + Math.random() * 0.4);

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = Math.random() > 0.4 ? crevice : highlight;
      ctx.globalAlpha = 0.22;
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 6);

  const bundle = { map: texture, bumpMap: texture, bumpScale: 0.018 };
  textureCache.set(cacheKey, bundle);
  return bundle;
}

/**
 * Procedural Honed Natural Marble Texture Generator
 */
export function getMarbleTexture() {
  const cacheKey = 'marble_honed';
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey);

  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#EAE6DF';
  ctx.fillRect(0, 0, size, size);

  // Soft veining streaks
  ctx.strokeStyle = '#B8B2A8';
  ctx.lineWidth = 3;
  ctx.globalAlpha = 0.25;

  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    let cx = Math.random() * size;
    let cy = 0;
    ctx.moveTo(cx, cy);

    while (cy < size) {
      cx += (Math.random() - 0.45) * 45;
      cy += 25 + Math.random() * 30;
      ctx.lineTo(cx, cy);
    }
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.5, 1.5);

  const bundle = { map: texture, roughness: 0.26, metalness: 0.04 };
  textureCache.set(cacheKey, bundle);
  return bundle;
}
