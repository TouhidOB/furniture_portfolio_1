import React, { useRef, useState, useEffect } from 'react';
import { ArrowDown, ArrowRight, Eye, Box, Sparkles, CheckCircle2 } from 'lucide-react';
import SceneCanvas from '../../components/three/SceneCanvas';
import ProductModel from '../../components/three/ProductModel';
import CameraRig from '../../components/three/CameraRig';
import Button from '../../components/ui/Button';
import { gsap } from '../../utils/animation';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useCMS } from '../../context/CMSContext';

const HERO_HOTSPOTS = [
  {
    id: 'boucle',
    top: '56%',
    left: '48%',
    title: 'Alpine Bouclé Weave',
    description: 'High-loop Italian bouclé woven from virgin wool and linen in Piedmont.',
    badge: 'Tactile Comfort'
  },
  {
    id: 'frame',
    top: '72%',
    left: '32%',
    title: 'Solid Beech Framework',
    description: 'Kiln-dried European beech joined with reinforced mortise-and-tenon joints.',
    badge: '15-Yr Guarantee'
  },
  {
    id: 'cushion',
    top: '44%',
    left: '64%',
    title: 'Multi-Density Core',
    description: 'High-resilience memory foam enveloped in channeled hypoallergenic down.',
    badge: 'Ergonomic Support'
  }
];

export default function HeroSection({ onOpenBooking }) {
  const { sections } = useCMS();
  const heroContent = sections.hero || {};
  const [viewMode, setViewMode] = useState('3d'); // '3d' | 'photo'
  const [activeHotspot, setActiveHotspot] = useState(null);

  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const eyebrowRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const photoBgRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(
        headlineRef.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' },
        '-=0.3'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100svh] flex flex-col justify-between overflow-hidden pt-28 pb-12 px-6 sm:px-8 transition-colors duration-500"
      style={{
        backgroundColor: heroContent.background_color || '#F5F2EC',
        color: heroContent.text_color || '#181818',
      }}
      aria-label="ATELIER Hero Showcase"
    >
      {/* 3D Cinematic Canvas Background */}
      <div
        className={`absolute inset-0 z-0 pointer-events-auto transition-opacity duration-700 ${
          viewMode === '3d' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <SceneCanvas
          alt="ATELIER Forma Modular Sofa in studio"
          fallbackImage={heroContent.image_url || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80"}
          camera={{ position: [0.55, 1.15, 3.8], fov: 42 }}
        >
          <CameraRig
            targetPosition={[0.55, 1.15, 3.8]}
            lookAt={[0.55, 0.35, 0]}
            parallaxIntensity={0.2}
          />
          <group position={[0.65, -0.05, 0]}>
            <ProductModel
              type={heroContent.extra_data?.model_type || "sofa"}
              color={heroContent.extra_data?.model_color || "#F5F2EC"}
              finish={heroContent.extra_data?.model_finish || "boucle"}
              scale={0.88}
              rotation={[0, -0.32, 0]}
            />
          </group>
        </SceneCanvas>
      </div>

      {/* Real Architectural Photography Showcase Background */}
      <div
        ref={photoBgRef}
        className={`absolute inset-0 z-0 overflow-hidden transition-opacity duration-700 ${
          viewMode === 'photo' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <img
          src={heroContent.image_url || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=90"}
          alt="ATELIER Forma Modular Sofa architectural installation"
          className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.04] scale-105 transition-transform duration-1000 ease-out"
          loading="eager"
        />

        {/* Ambient Warm Architectural Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F2EC]/90 via-[#F5F2EC]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F2EC]/90 via-transparent to-black/10" />

        {/* Animated Interactive Hotspots on Real Photography */}
        {HERO_HOTSPOTS.map((hotspot) => {
          const isSelected = activeHotspot === hotspot.id;
          return (
            <div
              key={hotspot.id}
              className="absolute z-20 group"
              style={{ top: hotspot.top, left: hotspot.left }}
            >
              <button
                type="button"
                onClick={() => setActiveHotspot(isSelected ? null : hotspot.id)}
                className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/90 text-[#181818] shadow-lg border border-black/10 transition-transform hover:scale-125 focus:outline-none"
                aria-label={`Inspect ${hotspot.title}`}
              >
                <span className="absolute -inset-1 rounded-full bg-[#72503C]/30 animate-ping opacity-75" />
                <Sparkles className="w-3.5 h-3.5 text-[#72503C]" />
              </button>

              {/* Tooltip Card */}
              <div
                className={`absolute left-10 top-1/2 -translate-y-1/2 w-64 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-black/10 transition-all duration-300 pointer-events-auto ${
                  isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#72503C]">
                    {hotspot.badge}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <h4 className="font-display font-medium text-sm text-[#181818]">
                  {hotspot.title}
                </h4>
                <p className="text-xs text-[#76726B] mt-1 leading-relaxed">
                  {hotspot.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Vignette Overlay to ensure text readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />

      {/* Directional Soft Editorial Scrim for Pristine Contrast */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-[#F5F2EC] via-[#F5F2EC]/85 to-transparent z-[5] pointer-events-none" />

      {/* View Mode Switcher Pill in Top Right */}
      <div className="absolute top-28 right-6 sm:right-10 z-30 pointer-events-auto">
        <div className="flex items-center bg-white/80 backdrop-blur-md p-1 rounded-full border border-black/10 shadow-lg">
          <button
            type="button"
            onClick={() => setViewMode('3d')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
              viewMode === '3d'
                ? 'bg-[#181818] text-white shadow-sm'
                : 'text-[#76726B] hover:text-[#181818]'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D Interactive</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('photo')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
              viewMode === 'photo'
                ? 'bg-[#181818] text-white shadow-sm'
                : 'text-[#76726B] hover:text-[#181818]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Studio Photo Shoot</span>
          </button>
        </div>
      </div>

      {/* Foreground Editorial Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 sm:pt-16 pointer-events-none">
        <div className="max-w-2xl">
          <p
            ref={eyebrowRef}
            className="font-caption text-[#72503C] tracking-[0.2em] mb-4 pointer-events-auto font-medium"
          >
            {heroContent.eyebrow || 'THE NEW LANGUAGE OF LIVING'}
          </p>

          <h1
            ref={headlineRef}
            className="font-display-hero mb-6 pointer-events-auto font-medium text-[#181818] whitespace-pre-line tracking-tight"
          >
            {heroContent.title || 'Furniture that\nfeels like art.'}
          </h1>

          <p
            ref={descRef}
            className="font-body-lead max-w-lg mb-8 pointer-events-auto text-[#282522] font-normal leading-relaxed text-base sm:text-lg"
          >
            {heroContent.description || 'Thoughtfully designed pieces for spaces that deserve more than ordinary. Sculptural mass balanced with tactile calm.'}
          </p>

          <div
            ref={ctaRef}
            className="flex flex-wrap items-center gap-4 pointer-events-auto"
          >
            <Button
              to={heroContent.cta_primary_link || '/collections'}
              variant="primary"
              size="lg"
              icon={ArrowRight}
            >
              {heroContent.cta_primary_label || 'Explore Collection'}
            </Button>
            <Button
              to={heroContent.cta_secondary_link || '/about'}
              variant="ivory"
              size="lg"
              className="border border-[#181818]/15 bg-white/85 hover:bg-white text-[#181818] shadow-sm backdrop-blur-sm"
            >
              {heroContent.cta_secondary_label || 'Discover Our Story'}
            </Button>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between text-xs text-[#76726B] uppercase tracking-widest pt-8 border-t border-[#E6E2D8]/50"
      >
        <span className="hidden sm:inline-block">Copenhagen • Kyoto • New York</span>
        <a
          href="#manifesto"
          className="inline-flex items-center gap-2 hover:text-[#181818] transition-colors group cursor-pointer"
        >
          <span>Scroll to Discover</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </a>
        <span className="hidden sm:inline-block">2026 Architectural Collection</span>
      </div>
    </section>
  );
}
