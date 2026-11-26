import React, { useState } from 'react';
import SceneCanvas from '../../components/three/SceneCanvas';
import ProductModel from '../../components/three/ProductModel';
import ProductControls from '../../components/three/ProductControls';
import ProductConfiguratorUI from '../../components/product/ProductConfiguratorUI';
import InquiryModal from '../../components/ui/InquiryModal';
import { getProductBySlug } from '../../utils/product';
import { useCMS } from '../../context/CMSContext';

export default function PersonalizationSection() {
  const { sections } = useCMS();
  const content = sections.personalization || {};
  const sofa = getProductBySlug('forma-modular-sofa');
  const [selectedVariant, setSelectedVariant] = useState(sofa?.availableVariants[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(sofa?.materials[0]);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  if (!sofa) return null;

  const handleReset = () => {
    setSelectedVariant(sofa.availableVariants[0]);
    setSelectedMaterial(sofa.materials[0]);
  };

  return (
    <section
      className="py-28 sm:py-36 px-6 sm:px-8 border-t border-[#E6E2D8] transition-colors duration-500"
      style={{
        backgroundColor: content.background_color || '#F5F2EC',
        color: content.text_color || '#181818',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-caption text-[#72503C] tracking-[0.2em]">
            {content.eyebrow || 'INTERACTIVE CONFIGURATOR'}
          </span>
          <h2 className="font-display-section font-medium mt-2 whitespace-pre-line">
            {content.title || 'Make it yours.'}
          </h2>
          <p className="text-base opacity-80 mt-4">
            {content.description || 'Experiment with bespoke modular dimensions, tactile fabrics, and vegetable-tanned leathers in real time.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 3D Real-time Rendered Product Preview */}
          <div className="lg:col-span-7 h-[460px] sm:h-[580px] rounded-3xl overflow-hidden bg-[#EDE8E0] border border-[#E6E2D8] shadow-lg relative group">
            <SceneCanvas
              alt={`${sofa.name} configured in ${selectedMaterial?.name}`}
              fallbackImage={sofa.images.hero}
              camera={{ position: [0, 1.2, 3.8], fov: 40 }}
            >
              <ProductModel
                type="sofa"
                color={selectedMaterial?.color || '#F5F2EC'}
                finish={selectedMaterial?.type || 'boucle'}
                scale={selectedVariant?.id === '4-piece' ? 1.1 : selectedVariant?.id === 'daybed' ? 0.9 : 1.0}
                rotation={[0, -0.3, 0]}
              />
              <ProductControls enabled={true} autoRotate={false} />
            </SceneCanvas>

            <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-black/5 text-[11px] text-[#181818] font-medium shadow-sm">
              Live Preview: {selectedMaterial?.name}
            </div>

            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-black/5 text-[11px] text-[#76726B] pointer-events-none">
              Orbit 360° to view all angles
            </div>
          </div>

          {/* Configuration Controls */}
          <div className="lg:col-span-5">
            <ProductConfiguratorUI
              product={sofa}
              selectedVariant={selectedVariant}
              onSelectVariant={setSelectedVariant}
              selectedMaterial={selectedMaterial}
              onSelectMaterial={setSelectedMaterial}
              onReset={handleReset}
              onOpenInquiry={() => setIsInquiryOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Inquiry Modal carrying the current configuration */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        product={sofa}
        selectedVariant={selectedVariant}
        selectedMaterial={selectedMaterial}
      />
    </section>
  );
}
