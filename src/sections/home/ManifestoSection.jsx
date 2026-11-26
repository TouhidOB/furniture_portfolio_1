import React, { useRef, useEffect } from 'react';
import { gsap } from '../../utils/animation';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useCMS } from '../../context/CMSContext';

export default function ManifestoSection() {
  const { sections } = useCMS();
  const content = sections.manifesto || {};
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const bodyRef = useRef(null);
  const statsRef = useRef(null);
  const imageMainRef = useRef(null);
  const imageDetailRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        bodyRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Parallax scroll animation on editorial imagery
      if (imageMainRef.current) {
        gsap.fromTo(
          imageMainRef.current,
          { y: 30, scale: 1.06 },
          {
            y: -30,
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: imageMainRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      if (imageDetailRef.current) {
        gsap.fromTo(
          imageDetailRef.current,
          { y: 60 },
          {
            y: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: imageDetailRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="py-28 sm:py-40 px-6 sm:px-8 border-t border-[#E6E2D8] transition-colors duration-500"
      style={{
        backgroundColor: content.background_color || '#F5F2EC',
        color: content.text_color || '#181818',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline */}
          <div className="lg:col-span-6" ref={headlineRef}>
            <span className="font-caption text-[#72503C] tracking-[0.2em] block mb-4">
              {content.eyebrow || 'OUR PHILOSOPHY'}
            </span>
            <h2 className="font-display-section font-medium leading-[1.05] whitespace-pre-line">
              {content.title || 'Not just made.\nConsidered.'}
            </h2>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 space-y-8" ref={bodyRef}>
            <p className="font-editorial-quote leading-relaxed">
              &ldquo;{content.description || 'We believe remarkable spaces begin with thoughtful objects. Every curve, texture, and proportion is designed to bring architectural serenity into everyday life.'}&rdquo;
            </p>

            <div className="space-y-4 text-base opacity-80 leading-relaxed">
              <p>
                In a world crowded with disposable trends, ATELIER pursues radical reduction and tactile permanence. We partner with multi-generational master cabinetmakers and textile weavers across Scandinavia and Japan to produce furniture that breathes with genuine weight and spatial balance.
              </p>
              <p>
                From solid French timber aged through natural seasons to vegetable-tanned hides that record memories in their patina, our pieces are conceived not merely as utilities, but as quiet sculptures that anchor the architecture of home.
              </p>
            </div>

            {/* Micro Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-6 pt-8 border-t border-[#E6E2D8]/60">
              <div>
                <span className="font-display font-medium text-3xl sm:text-4xl">
                  {content.extra_data?.stat1_val || '15+'}
                </span>
                <p className="text-xs uppercase tracking-wider mt-1 opacity-75">
                  {content.extra_data?.stat1_lbl || 'Year Frame Guarantee'}
                </p>
              </div>
              <div>
                <span className="font-display font-medium text-3xl sm:text-4xl">
                  {content.extra_data?.stat2_val || '100%'}
                </span>
                <p className="text-xs uppercase tracking-wider mt-1 opacity-75">
                  {content.extra_data?.stat2_lbl || 'FSC Certified Timber'}
                </p>
              </div>
              <div>
                <span className="font-display font-medium text-3xl sm:text-4xl">
                  {content.extra_data?.stat3_val || 'Zero'}
                </span>
                <p className="text-xs uppercase tracking-wider mt-1 opacity-75">
                  {content.extra_data?.stat3_lbl || 'Synthetic VOC Seals'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Real Architectural & Artisanal Editorial Photography Showcase */}
        <div className="mt-20 sm:mt-28 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Main Architectural Interior Photo */}
          <div className="md:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl bg-[#EDE8E0] group">
            <div ref={imageMainRef} className="w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85"
                alt="ATELIER Minimalist Architectural Interior Residence"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 text-white">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#D7C5AF] block mb-1">
                Plate 01 • Living Architecture
              </span>
              <p className="font-display text-lg sm:text-xl text-white font-medium">
                The Copenhagen Coastal Residence
              </p>
            </div>
          </div>

          {/* Overlapping Detail Macro Photo */}
          <div className="md:col-span-4 relative">
            <div
              ref={imageDetailRef}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-[#EDE8E0] border-4 border-white/80 group"
            >
              <img
                src="https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=900&q=85"
                alt="Master Artisan Hand-Scraping Natural Timber Grain"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D7C5AF] block mb-0.5">
                  Artisanal Standard
                </span>
                <p className="font-display text-base text-white font-medium">
                  Natural Hardwax Finishing
                </p>
                <p className="text-xs text-[#A7A39C] mt-1">
                  100% Organic Botanical Seal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
