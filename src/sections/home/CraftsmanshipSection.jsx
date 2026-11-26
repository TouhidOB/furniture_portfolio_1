import React, { useState, useRef } from 'react';
import { Sparkles, Trees, Scissors, ShieldAlert, Award, ZoomIn } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

const craftSteps = [
  {
    id: 'materials',
    title: 'Material Selection',
    subtitle: 'FSC-Certified French Oak & Alpine Bouclé',
    icon: Trees,
    image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=1600&q=85',
    description: 'We source only select-grade European timber aged through natural weather cycles to prevent post-joinery warping. Every log is grain-matched by hand to ensure symmetrical heartwood flow.',
    stats: '100% Sustainable Forestry'
  },
  {
    id: 'woodworking',
    title: 'Woodworking',
    subtitle: 'Reinforced Mortise-and-Tenon Joinery',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85',
    description: 'Master cabinetmakers shape our reverse chamfers and cylindrical pedestals using bespoke CNC tools followed by four passes of manual hand-scraping and fine sanding.',
    stats: '±0.5mm Precision Tolerance'
  },
  {
    id: 'upholstery',
    title: 'Upholstery',
    subtitle: 'Channel-Stitched Memory Down',
    icon: Scissors,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=85',
    description: 'Cushions combine multi-density cold-cure foam cores enveloped in baffled channels of hypoallergenic duck down. Double-stitched perimeter piping prevents seam elongation over decades.',
    stats: 'Hand-Tailored Piping'
  },
  {
    id: 'finishing',
    title: 'Finishing',
    subtitle: 'Food-Safe Organic Hardwax Oils',
    icon: Award,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
    description: 'Rather than sealing wood beneath synthetic plastic polyurethane, we treat our surfaces with botanical hardwax oils that penetrate deep into the pores, allowing the wood to breathe and patina gracefully.',
    stats: 'Zero Toxic VOCs'
  },
  {
    id: 'inspection',
    title: 'Quality Inspection',
    subtitle: 'Dual Inspection & Serial Authentication',
    icon: ShieldAlert,
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1600&q=85',
    description: 'Every completed piece undergoes rigorous structural load testing and textile surface inspection before receiving an engraved brass serial medallion and certificate of authenticity.',
    stats: '15-Year Structural Frame Guarantee'
  }
];

export default function CraftsmanshipSection() {
  const { sections } = useCMS();
  const content = sections.craftsmanship || {};
  const [activeStep, setActiveStep] = useState(craftSteps[0]);
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50, show: false });
  const imageContainerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLoupePos({ x, y, show: true });
  };

  const handleMouseLeave = () => {
    setLoupePos(prev => ({ ...prev, show: false }));
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
        <div className="max-w-3xl mb-16">
          <span className="font-caption text-[#72503C] tracking-[0.2em] block mb-3">
            {content.eyebrow || 'ARTISANAL STANDARDS'}
          </span>
          <h2 className="font-display-section font-medium leading-[1.05] whitespace-pre-line">
            {content.title || 'The beauty is in\nthe details.'}
          </h2>
          <p className="text-base opacity-80 mt-4 leading-relaxed">
            {content.description || 'Every curve, joint, and stitch is governed by rigorous engineering and quiet respect for organic materials. Explore the five pillars of ATELIER construction.'}
          </p>
        </div>

        {/* Interactive Craftsmanship Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Step Selector */}
          <div className="lg:col-span-5 space-y-3">
            {craftSteps.map((step) => {
              const isActive = activeStep.id === step.id;
              const Icon = step.icon;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStep(step)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                    isActive
                      ? 'bg-white border-[#181818] shadow-md ring-1 ring-[#181818]'
                      : 'bg-white/40 border-[#E6E2D8] hover:bg-white hover:border-[#A7A39C]'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${isActive ? 'bg-[#181818] text-white' : 'bg-[#EDE8E0] text-[#76726B]'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-medium text-base text-[#181818]">{step.title}</p>
                    <p className="text-xs text-[#76726B] mt-0.5 truncate">{step.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Macro Visual & In-Depth Story */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#E6E2D8] shadow-xl space-y-6">
            {/* Interactive Macro Loupe Inspection Container */}
            <div
              ref={imageContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#EDE8E0] cursor-crosshair group shadow-inner"
            >
              <img
                src={activeStep.image}
                alt={activeStep.title}
                key={activeStep.image}
                className="w-full h-full object-cover transition-opacity duration-500"
              />

              {/* Animated Magnifying Loupe Following Cursor */}
              {loupePos.show && (
                <div
                  className="absolute pointer-events-none w-36 h-36 rounded-full border-2 border-white shadow-2xl overflow-hidden -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
                  style={{
                    left: `${loupePos.x}%`,
                    top: `${loupePos.y}%`,
                    backgroundImage: `url(${activeStep.image})`,
                    backgroundPosition: `${loupePos.x}% ${loupePos.y}%`,
                    backgroundSize: '350%',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              )}

              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-mono">
                  {activeStep.stats}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#181818] text-[11px] font-medium shadow-sm">
                  <ZoomIn className="w-3.5 h-3.5 text-[#72503C]" />
                  <span>Hover to Magnify Macro Details</span>
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs font-mono text-[#72503C] uppercase tracking-widest">
                Pillar Inspection • {activeStep.title}
              </span>
              <h3 className="font-display font-medium text-2xl text-[#181818] mt-1">
                {activeStep.subtitle}
              </h3>
              <p className="text-sm sm:text-base text-[#76726B] mt-3 leading-relaxed">
                {activeStep.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
