import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import { getProductBySlug, formatPrice } from '../../utils/product';
import { useCMS } from '../../context/CMSContext';

export default function BedroomSection() {
  const { sections } = useCMS();
  const content = sections.bedroom || {};
  const bedProduct = getProductBySlug('eos-platform-bed');

  return (
    <section
      className="relative w-full min-h-[90vh] flex items-center justify-center py-24 sm:py-32 px-4 sm:px-8 overflow-hidden border-t border-[#E6E2D8] transition-colors duration-500"
      style={{
        backgroundColor: content.background_color || '#181818',
      }}
      aria-label="Bedroom Sanctuary"
    >
      {/* Full-bleed Architectural Interior Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={content.image_url || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2000&q=85"}
          alt="ATELIER Architectural Bedroom Interior"
          className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/70" />
      </div>

      {/* Centered Editorial Sanctuary Panel with Luxury Frosted Scrim */}
      <div className="relative z-10 max-w-3xl mx-auto w-full">
        <div className="p-8 sm:p-12 md:p-14 rounded-3xl bg-black/65 backdrop-blur-xl border border-white/20 shadow-2xl text-center space-y-6">
          <span className="font-caption text-[#D7C5AF] tracking-[0.25em] block uppercase text-xs sm:text-sm font-medium">
            {content.eyebrow || 'THE BEDROOM COLLECTION'}
          </span>

          <h2 className="font-display font-medium text-3xl sm:text-5xl text-white drop-shadow-md">
            {content.title || 'Rest, beautifully.'}
          </h2>

          <p className="font-editorial-quote text-[#F5F2EC] max-w-2xl mx-auto text-lg sm:text-2xl leading-relaxed font-light drop-shadow">
            &ldquo;{content.subtitle || 'Stillness begins where clutter ends.'} {content.description || 'A low floating platform bed crafted in raw ash timber and natural Belgian linen, designed to quiet the mind.'}&rdquo;
          </p>

          <p className="text-sm sm:text-base text-[#D5D0C7] max-w-lg mx-auto leading-relaxed">
            Featuring the Eos Platform Bed with recessed plinth levitation, pre-tensioned ergonomic beech slats, and an extended perimeter timber ledge.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button
              to={content.cta_primary_link || '/products/eos-platform-bed'}
              variant="ivory"
              size="lg"
              icon={ArrowRight}
            >
              {content.cta_primary_label || 'Explore Eos Bed'}
            </Button>
            <Button
              to="/collections/bedroom"
              variant="ghostWhite"
              size="lg"
            >
              View Bedroom Series
            </Button>
          </div>

          {bedProduct && (
            <p className="text-xs text-[#D7C5AF] pt-2 font-medium tracking-wide">
              Eos Platform Bed from {formatPrice(bedProduct.price)} (Sample Demo Price) • Made to Order
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
