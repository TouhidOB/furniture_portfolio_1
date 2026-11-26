import React, { useState } from 'react';
import { Html } from '@react-three/drei';

export default function ProductHotspots({ hotspots = [] }) {
  const [activeHotspot, setActiveHotspot] = useState(null);

  if (!hotspots || hotspots.length === 0) return null;

  return (
    <group>
      {hotspots.map((item, index) => (
        <group key={index} position={item.position}>
          <Html center distanceFactor={8} zIndexRange={[100, 0]}>
            <div className="relative group">
              <button
                type="button"
                onClick={() => setActiveHotspot(activeHotspot === index ? null : index)}
                onMouseEnter={() => setActiveHotspot(index)}
                onMouseLeave={() => setActiveHotspot(null)}
                className="w-6 h-6 rounded-full bg-white/90 text-[#181818] shadow-lg flex items-center justify-center border border-[#181818]/20 hover:scale-125 transition-transform"
                aria-label={`Hotspot: ${item.title}`}
              >
                <span className="w-2 h-2 rounded-full bg-[#72503C] animate-ping absolute" />
                <span className="w-2 h-2 rounded-full bg-[#72503C] relative" />
              </button>

              {activeHotspot === index && (
                <div className="absolute left-8 top-1/2 -translate-y-1/2 w-48 p-3 rounded-xl bg-[#181818]/90 text-white backdrop-blur-md shadow-2xl text-left pointer-events-none animate-in fade-in duration-200 z-50">
                  <p className="font-display font-medium text-xs text-[#D7C5AF]">{item.title}</p>
                  <p className="text-[11px] text-[#A7A39C] mt-0.5 leading-snug">{item.description}</p>
                </div>
              )}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}
