import React from 'react';

export default function ModelFallback({ imageUrl, alt = 'Furniture showcase', darkTheme = false }) {
  return (
    <div className={`w-full h-full flex items-center justify-center p-8 ${darkTheme ? 'bg-[#181818]' : 'bg-[#F5F2EC]'}`}>
      <div className="relative max-w-2xl w-full aspect-[4/3] flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={alt}
            className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full rounded-2xl bg-[#EDE8E0] flex flex-col items-center justify-center text-[#76726B] border border-[#E6E2D8]">
            <p className="font-display font-medium text-sm">ATELIER Studio Preview</p>
            <p className="text-xs text-[#A7A39C] mt-1">High-fidelity photographic capture</p>
          </div>
        )}
      </div>
    </div>
  );
}
