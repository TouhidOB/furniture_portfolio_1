import React, { useState } from 'react';
import { ArrowRight, RotateCw, Check } from 'lucide-react';
import SceneCanvas from '../../components/three/SceneCanvas';
import ProductModel from '../../components/three/ProductModel';
import ProductControls from '../../components/three/ProductControls';
import Button from '../../components/ui/Button';
import { getProductBySlug, formatPrice } from '../../utils/product';
import { useCMS } from '../../context/CMSContext';

export default function LoungeChairSpotlight() {
  const { sections } = useCMS();
  const content = sections.lounge_spotlight || {};
  const product = getProductBySlug('arc-lounge-chair');
  const [selectedFinish, setSelectedFinish] = useState(product?.materials[0] || { color: '#181818', name: 'Raven Semi-Aniline Leather' });
  const [isRotating, setIsRotating] = useState(false);

  if (!product) return null;

  return (
    <section
      className="relative w-full min-h-[100svh] flex flex-col justify-between py-16 sm:py-24 px-6 sm:px-8 overflow-hidden border-t border-[#2A2A2A] transition-colors duration-500"
      style={{
        backgroundColor: content.background_color || '#181818',
        color: content.text_color || '#F5F2EC',
      }}
      aria-label="Arc Lounge Chair Spotlight"
    >
      {/* Studio Key Light Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_42%,_rgba(165,124,82,0.25)_0%,_rgba(60,45,35,0.14)_45%,_transparent_70%)] pointer-events-none z-0" />

      {/* 3D Dramatic Dark Studio Canvas */}
      <div className="absolute inset-0 z-0">
        <SceneCanvas
          darkTheme={true}
          alt="Arc Lounge Chair 3D Showcase"
          fallbackImage={content.image_url || product.images.hero}
          camera={{ position: [0.42, 1.05, 3.35], fov: 38 }}
        >
          <group position={[0.75, 0.04, 0]}>
            <ProductModel
              type={content.extra_data?.model_type || "chair"}
              color={selectedFinish.color}
              finish={content.extra_data?.model_finish || "leather"}
              scale={0.92}
              rotation={[0.08, 0.52, 0]}
              autoRotate={isRotating}
              autoRotateSpeed={0.25}
            />
          </group>
          <ProductControls enabled={true} />
        </SceneCanvas>
      </div>

      {/* Floating Top Header */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between pointer-events-none">
        <div>
          <span className="font-caption text-[#D7C5AF] tracking-[0.2em]">
            {content.eyebrow || 'SCULPTURAL SPOTLIGHT'}
          </span>
          <p className="font-display font-medium text-lg text-white">
            {content.title || 'Arc Lounge Chair'}
          </p>
        </div>

        {/* 3D Rotation Toggle Pill */}
        <button
          type="button"
          onClick={() => setIsRotating(!isRotating)}
          className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-white backdrop-blur-md transition-all"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin-slow' : ''}`} />
          <span>{isRotating ? 'Pause Orbit' : 'Resume Orbit'}</span>
        </button>
      </div>

      {/* Floating Bottom Editorial Panel */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-36 sm:pt-40 pointer-events-none">
        <div className="max-w-md lg:max-w-md bg-[#202020]/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl pointer-events-auto space-y-5">
          <div>
            <span className="font-caption text-[#D7C5AF]">
              {content.subtitle || 'Mid-Century Japanese Ergonomics'}
            </span>
            <h2 className="font-display font-medium text-3xl sm:text-5xl text-white mt-1">
              {content.title || 'Designed to make you stay.'}
            </h2>
            <p className="text-sm sm:text-base text-[#A7A39C] mt-3 leading-relaxed">
              {content.description || 'A sweeping continuous steam-bent American walnut shell cradling sculpted down-channel cushions. Features a silent 360-degree die-cast aluminum swivel mechanism with auto-center return.'}
            </p>
          </div>

          {/* Finish Selector */}
          <div className="space-y-2 pt-2">
            <span className="text-xs uppercase tracking-wider text-[#A7A39C] block">
              Finish: <strong className="text-white">{selectedFinish.name}</strong>
            </span>
            <div className="flex items-center gap-3">
              {product.materials.map((mat) => (
                <button
                  key={mat.id}
                  type="button"
                  onClick={() => setSelectedFinish(mat)}
                  className={`relative w-8 h-8 rounded-full border-2 transition-transform ${
                    selectedFinish.id === mat.id ? 'scale-110 border-white' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: mat.color }}
                  title={mat.name}
                >
                  {selectedFinish.id === mat.id && (
                    <Check className={`w-3 h-3 absolute inset-0 m-auto ${mat.color === '#F5F2EC' ? 'text-black' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#333]">
            <div>
              <p className="font-display font-medium text-2xl text-white">
                {formatPrice(product.price)}
              </p>
              <p className="text-[11px] text-[#A7A39C]">Sample Demo Pricing • In Stock</p>
            </div>

            <Button
              to={content.cta_primary_link || '/products/arc-lounge-chair'}
              variant="ivory"
              size="md"
              icon={ArrowRight}
            >
              {content.cta_primary_label || 'Discover Arc'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
