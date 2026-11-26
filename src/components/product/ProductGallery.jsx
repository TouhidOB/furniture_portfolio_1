import React, { useState } from 'react';

export default function ProductGallery({ images, name }) {
  const imageList = [
    { label: 'Hero View', url: images.hero },
    { label: 'Architectural Angle', url: images.angle },
    { label: 'Material Detail', url: images.detail },
    { label: 'Spatial Setting', url: images.lifestyle },
  ].filter(img => Boolean(img.url));

  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main View */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#EDE8E0] border border-[#E6E2D8] shadow-sm">
        <img
          src={imageList[activeIdx]?.url}
          alt={`${name} — ${imageList[activeIdx]?.label}`}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium tracking-wider uppercase">
            {imageList[activeIdx]?.label}
          </span>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {imageList.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveIdx(idx)}
            className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
              activeIdx === idx
                ? 'border-[#181818] ring-2 ring-[#181818]/10'
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img
              src={img.url}
              alt={`${name} thumbnail ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
