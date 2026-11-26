import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useCMS } from '../../context/CMSContext';

export default function FinalCtaSection({ onOpenBooking }) {
  const { sections } = useCMS();
  const content = sections.final_cta || {};

  return (
    <section
      className="relative w-full py-32 sm:py-44 px-6 sm:px-8 overflow-hidden border-t border-[#2A2A2A] transition-colors duration-500"
      style={{
        backgroundColor: content.background_color || '#181818',
        color: content.text_color || '#F5F2EC',
      }}
    >
      {/* Background Lighting & Architectural Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src={content.image_url || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85"}
          alt="ATELIER Architectural Interior Architecture"
          className="w-full h-full object-cover filter brightness-[0.4] contrast-125"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/60 to-[#181818]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <span className="font-caption text-[#D7C5AF] tracking-[0.25em] block">
          {content.eyebrow || 'THE ATELIER VISION'}
        </span>

        <h2 className="font-display-hero text-white font-medium whitespace-pre-line">
          {content.title || 'Your space.\nReimagined.'}
        </h2>

        <p className="font-body-lead text-[#A7A39C] max-w-xl mx-auto">
          {content.description || 'Explore a collection created for the moments that make a place your own. From monolithic oak dining tables to modular bouclé seating.'}
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Button
            to={content.cta_primary_link || '/collections'}
            variant="ivory"
            size="lg"
            icon={ArrowRight}
          >
            {content.cta_primary_label || 'Explore All Furniture'}
          </Button>
          <Button
            variant="ghostWhite"
            size="lg"
            onClick={onOpenBooking}
            icon={Compass}
          >
            Book Private Viewing
          </Button>
        </div>
      </div>
    </section>
  );
}
