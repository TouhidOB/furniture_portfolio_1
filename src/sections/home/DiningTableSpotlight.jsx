import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SceneCanvas from '../../components/three/SceneCanvas';
import ProductModel from '../../components/three/ProductModel';
import ProductControls from '../../components/three/ProductControls';
import Button from '../../components/ui/Button';
import { getProductBySlug, formatPrice } from '../../utils/product';
import { useCMS } from '../../context/CMSContext';

export default function DiningTableSpotlight() {
  const { sections } = useCMS();
  const content = sections.dining_spotlight || {};
  const product = getProductBySlug('terra-dining-table');

  if (!product) return null;

  return (
    <section
      className="py-28 sm:py-36 px-6 sm:px-8 border-t border-[#E6E2D8] transition-colors duration-500"
      style={{
        backgroundColor: content.background_color || '#F5F2EC',
        color: content.text_color || '#181818',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial & Technical Specifications */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="font-caption text-[#72503C] tracking-[0.2em] block mb-3">
                {content.eyebrow || 'ARCHITECTURAL DINING'}
              </span>
              <h2 className="font-display-section font-medium leading-[1.05] whitespace-pre-line">
                {content.title || 'Where moments\ngather.'}
              </h2>
              <p className="text-base opacity-80 mt-6 leading-relaxed">
                {content.description || 'The Terra Dining Table pairs monolithic solid French oak with sculptural fluted pillar pedestals. Its 45mm tabletop features a soft reverse chamfer that lends an imposing slab surprising visual lightness.'}
              </p>
            </div>

            {/* Concise Product Specifications Grid */}
            <div className="p-6 rounded-2xl bg-white border border-[#E6E2D8] space-y-4">
              <h3 className="font-display font-medium text-sm text-[#181818] uppercase tracking-wider">
                Specifications Summary
              </h3>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#76726B] block">Primary Material:</span>
                  <span className="font-medium text-[#181818]">Solid French Select Oak</span>
                </div>
                <div>
                  <span className="text-[#76726B] block">Seating Capacity:</span>
                  <span className="font-medium text-[#181818]">8 to 12 Guests</span>
                </div>
                <div>
                  <span className="text-[#76726B] block">Available Finishes:</span>
                  <span className="font-medium text-[#181818]">Smoked Oak, Ash, Noir</span>
                </div>
                <div>
                  <span className="text-[#76726B] block">Dimensions:</span>
                  <span className="font-medium text-[#181818]">240 × 105 × 75 cm</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E6E2D8] flex items-center gap-2 text-xs text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero VOC Natural Hardwax Oil Finish</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                to={content.cta_primary_link || '/products/terra-dining-table'}
                variant="primary"
                size="lg"
                icon={ArrowRight}
              >
                {content.cta_primary_label || 'Explore Terra Table'}
              </Button>
              <div className="text-xs text-[#76726B]">
                <strong className="text-sm font-medium text-[#181818] block">{formatPrice(product.price)}</strong>
                <span>Sample Demo Price</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Table Model View */}
          <div className="lg:col-span-7 h-[500px] sm:h-[600px] rounded-3xl overflow-hidden bg-[#EDE8E0] border border-[#E6E2D8] shadow-md relative group">
            <SceneCanvas
              alt="Terra Dining Table 3D View"
              fallbackImage={product.images.hero}
              camera={{ position: [0, 1.4, 3.2], fov: 42 }}
            >
              <ProductModel
                type="table"
                color="#72503C"
                finish="wood"
                scale={0.9}
                rotation={[0, 0.4, 0]}
              />
              <ProductControls enabled={true} autoRotate={true} autoRotateSpeed={0.4} />
            </SceneCanvas>

            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-black/5 text-[11px] text-[#76726B] pointer-events-none">
              Interactive 3D • Drag to rotate
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
