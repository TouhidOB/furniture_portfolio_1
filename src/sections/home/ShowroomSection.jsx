import React, { useState } from 'react';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import { brand } from '../../data/brand';
import { useCMS } from '../../context/CMSContext';

export default function ShowroomSection({ onOpenBooking }) {
  const { sections } = useCMS();
  const content = sections.showroom || {};
  const [activeCity, setActiveCity] = useState(brand.showrooms[0].city);
  const activeShowroom = brand.showrooms.find(s => s.city === activeCity) || brand.showrooms[0];

  return (
    <section
      className="py-28 sm:py-36 px-6 sm:px-8 border-t border-[#2A2A2A] transition-colors duration-500"
      style={{
        backgroundColor: content.background_color || '#181818',
        color: content.text_color || '#F5F2EC',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial & Showroom Selection */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="font-caption text-[#D7C5AF] tracking-[0.2em] block mb-3">
                {content.eyebrow || 'FLAGSHIP SPACES'}
              </span>
              <h2 className="font-display-section text-white font-medium leading-[1.05] whitespace-pre-line">
                {content.title || 'Experience the\ncollection in person.'}
              </h2>
              <p className="text-base text-[#A7A39C] mt-6 leading-relaxed">
                {content.description || 'Step into a space where every detail is designed to inspire. Touch full-grain leathers, feel the weight of solid French oak, and consult privately with our architectural spatial advisors.'}
              </p>
            </div>

            {/* City Selector Tabs */}
            <div className="flex items-center gap-2 border-b border-[#2A2A2A] pb-4">
              {brand.showrooms.map((showroom) => (
                <button
                  key={showroom.city}
                  type="button"
                  onClick={() => setActiveCity(showroom.city)}
                  className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
                    activeCity === showroom.city
                      ? 'bg-white text-[#181818]'
                      : 'text-[#A7A39C] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {showroom.city}
                </button>
              ))}
            </div>

            {/* Showroom Details Box */}
            <div className="p-6 rounded-2xl bg-[#202020] border border-[#333] space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D7C5AF] shrink-0 mt-0.5" />
                <div>
                  <p className="font-display font-medium text-white text-base">
                    {activeShowroom.neighborhood}, {activeShowroom.city}
                  </p>
                  <p className="text-sm text-[#A7A39C] mt-0.5">{activeShowroom.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 text-xs text-[#A7A39C] border-t border-[#2A2A2A]">
                <Clock className="w-4 h-4 text-[#D7C5AF]" />
                <span>{activeShowroom.hours}</span>
              </div>
            </div>

            <div>
              <Button
                variant="ivory"
                size="lg"
                onClick={onOpenBooking}
                icon={Calendar}
              >
                {content.cta_primary_label || 'Book a Showroom Visit'}
              </Button>
            </div>
          </div>

          {/* Right Column: Architectural Photography */}
          <div className="lg:col-span-7 relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#202020] border border-[#333] shadow-2xl">
            <img
              src={activeShowroom.image}
              alt={`ATELIER ${activeShowroom.city} Flagship Showroom Interior`}
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white text-xs">
              <span className="font-mono uppercase tracking-widest text-[#D7C5AF]">
                {activeShowroom.city} Flagship Studio
              </span>
              <span>Private Walkthroughs Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
