import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { spaces } from '../../data/collections';
import { useCMS } from '../../context/CMSContext';
import { gsap } from '../../utils/animation';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const REAL_SPACE_IMAGES = [
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=85',
];

export default function ExploreSpaceSection() {
  const { sections } = useCMS();
  const content = sections.explore_spaces || {};
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Parallax image scrolling on each space card
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        const img = card.querySelector('img');
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -8, scale: 1.1 },
            {
              yPercent: 8,
              scale: 1.02,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.0,
              },
            }
          );
        }

        // Staggered reveal animation
        gsap.fromTo(
          card,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: idx * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="py-28 sm:py-36 px-6 sm:px-8 border-t border-[#E6E2D8] transition-colors duration-500 overflow-hidden"
      style={{
        backgroundColor: content.background_color || '#F5F2EC',
        color: content.text_color || '#181818',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-caption text-[#72503C] tracking-[0.2em] block mb-3">
              {content.eyebrow || 'CURATED BY ROOM'}
            </span>
            <h2 className="font-display-section font-medium whitespace-pre-line">
              {content.title || 'A collection for every\nway of living.'}
            </h2>
          </div>
          <p className="text-base opacity-80 max-w-md">
            {content.description || 'Architectural pieces designed in concert. Harmonious timber species, quiet stone textures, and tactile natural textiles that transition effortlessly across domestic spaces.'}
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Living Room - Large Feature (Col 7) */}
          <div
            ref={(el) => (cardRefs.current[0] = el)}
            className="md:col-span-7 group"
          >
            <Link
              to="/collections/living"
              className="block relative aspect-[16/10] rounded-3xl overflow-hidden bg-[#EDE8E0] border border-[#E6E2D8] shadow-sm transition-all duration-500 group-hover:shadow-2xl"
            >
              <div className="w-full h-[120%] -mt-[10%] overflow-hidden">
                <img
                  src={REAL_SPACE_IMAGES[0]}
                  alt={spaces[0].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-8 sm:p-10 flex flex-col justify-end text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-[#D7C5AF] uppercase tracking-widest">
                    01 • Living Room Collection
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono text-white">
                    Signature
                  </span>
                </div>
                <h3 className="font-display font-medium text-3xl sm:text-4xl text-white">
                  {spaces[0].name}
                </h3>
                <p className="text-sm text-[#D7C5AF] max-w-md mt-2 line-clamp-2">
                  {spaces[0].description}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white">
                  <span>Explore Living ({spaces[0].itemCount} Pieces)</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </Link>
          </div>

          {/* Dining Room - (Col 5) */}
          <div
            ref={(el) => (cardRefs.current[1] = el)}
            className="md:col-span-5 group"
          >
            <Link
              to="/collections/dining"
              className="block relative aspect-[4/3] md:aspect-[16/14] rounded-3xl overflow-hidden bg-[#EDE8E0] border border-[#E6E2D8] shadow-sm transition-all duration-500 group-hover:shadow-2xl"
            >
              <div className="w-full h-[120%] -mt-[10%] overflow-hidden">
                <img
                  src={REAL_SPACE_IMAGES[1]}
                  alt={spaces[1].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-8 flex flex-col justify-end text-white">
                <span className="text-xs font-mono text-[#D7C5AF] uppercase tracking-widest mb-2">
                  02 • Dining Room Collection
                </span>
                <h3 className="font-display font-medium text-2xl sm:text-3xl text-white">
                  {spaces[1].name}
                </h3>
                <p className="text-xs text-[#D7C5AF] max-w-xs mt-2 line-clamp-2">
                  {spaces[1].description}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white">
                  <span>Explore Dining</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </Link>
          </div>

          {/* Bedroom - (Col 5) */}
          <div
            ref={(el) => (cardRefs.current[2] = el)}
            className="md:col-span-5 group"
          >
            <Link
              to="/collections/bedroom"
              className="block relative aspect-[4/3] md:aspect-[16/14] rounded-3xl overflow-hidden bg-[#EDE8E0] border border-[#E6E2D8] shadow-sm transition-all duration-500 group-hover:shadow-2xl"
            >
              <div className="w-full h-[120%] -mt-[10%] overflow-hidden">
                <img
                  src={REAL_SPACE_IMAGES[2]}
                  alt={spaces[2].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-8 flex flex-col justify-end text-white">
                <span className="text-xs font-mono text-[#D7C5AF] uppercase tracking-widest mb-2">
                  03 • Bedroom Collection
                </span>
                <h3 className="font-display font-medium text-2xl sm:text-3xl text-white">
                  {spaces[2].name}
                </h3>
                <p className="text-xs text-[#D7C5AF] max-w-xs mt-2 line-clamp-2">
                  {spaces[2].description}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white">
                  <span>Explore Bedroom</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </Link>
          </div>

          {/* Workspace - (Col 7) */}
          <div
            ref={(el) => (cardRefs.current[3] = el)}
            className="md:col-span-7 group"
          >
            <Link
              to="/collections/workspace"
              className="block relative aspect-[16/10] rounded-3xl overflow-hidden bg-[#EDE8E0] border border-[#E6E2D8] shadow-sm transition-all duration-500 group-hover:shadow-2xl"
            >
              <div className="w-full h-[120%] -mt-[10%] overflow-hidden">
                <img
                  src={REAL_SPACE_IMAGES[3]}
                  alt={spaces[3].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-8 sm:p-10 flex flex-col justify-end text-white">
                <span className="text-xs font-mono text-[#D7C5AF] uppercase tracking-widest mb-2">
                  04 • Workspace Collection
                </span>
                <h3 className="font-display font-medium text-3xl sm:text-4xl text-white">
                  {spaces[3].name}
                </h3>
                <p className="text-sm text-[#D7C5AF] max-w-md mt-2 line-clamp-2">
                  {spaces[3].description}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white">
                  <span>Explore Workspace ({spaces[3].itemCount} Pieces)</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
