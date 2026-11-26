import React, { useState } from 'react';

export default function StorytellingSection({ product }) {
  if (!product || !product.storytellingScenes || product.storytellingScenes.length === 0) return null;

  const [activeStage, setActiveStage] = useState(0);
  const currentScene = product.storytellingScenes[activeStage] || product.storytellingScenes[0];

  return (
    <section className="bg-[#181818] text-[#F5F2EC] py-20 sm:py-28 px-6 sm:px-8 rounded-3xl my-16 border border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-caption text-[#D7C5AF]">Design Narrative</span>
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-white mt-2">
            The Making of {product.name}
          </h2>
          <p className="text-sm text-[#A7A39C] mt-4">
            An exploration into the ergonomic principles, material selections, and architectural geometry that define this piece.
          </p>
        </div>

        {/* Narrative Stage Timeline Buttons */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {product.storytellingScenes.map((scene, idx) => {
            const isActive = activeStage === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStage(idx)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-[#181818] shadow-md'
                    : 'bg-[#2A2A2A] text-[#A7A39C] hover:text-white hover:bg-[#333]'
                }`}
              >
                <span>{scene.stage} — {scene.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#202020] rounded-2xl p-8 sm:p-12 border border-[#333]">
          <div className="space-y-6">
            <span className="text-xs font-mono text-[#D7C5AF] tracking-widest uppercase">
              Phase {currentScene.stage} • {currentScene.progress}
            </span>
            <h3 className="font-display font-medium text-3xl sm:text-4xl text-white">
              {currentScene.title}
            </h3>
            <p className="text-base sm:text-lg text-[#A7A39C] leading-relaxed">
              {currentScene.description}
            </p>
            <div className="pt-4 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#D7C5AF]" />
              <span className="text-xs text-[#D7C5AF] uppercase tracking-wider">
                Crafted for permanent architectural spaces
              </span>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#181818] border border-[#2A2A2A]">
            <img
              src={
                activeStage === 0 ? product.images.hero :
                activeStage === 1 ? product.images.angle :
                activeStage === 2 ? product.images.detail :
                product.images.lifestyle
              }
              alt={`${product.name} - ${currentScene.title}`}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
