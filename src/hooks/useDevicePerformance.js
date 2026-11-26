import { useState, useEffect } from 'react';

export function useDevicePerformance() {
  const [tier, setTier] = useState({
    isMobile: false,
    dpr: 1.5,
    hasWebGL: true,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isMobile = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
    const rawDpr = window.devicePixelRatio || 1;
    // Clamp DPR to avoid GPU overload on ultra-high DPI phones
    const dpr = isMobile ? Math.min(rawDpr, 1.5) : Math.min(rawDpr, 2.0);

    let hasWebGL = true;
    try {
      const canvas = document.createElement('canvas');
      hasWebGL = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
      hasWebGL = false;
    }

    setTier({
      isMobile,
      dpr,
      hasWebGL,
    });
  }, []);

  return tier;
}
