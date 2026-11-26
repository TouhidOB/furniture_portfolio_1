import React, { useRef, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const FILMSTRIP_ITEMS = [
  {
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    title: 'Forma Modular Living Landscape',
    space: 'Copenhagen Residence',
    slug: 'forma-modular-sofa'
  },
  {
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85',
    title: 'Arc Lounge Chair in Raven Leather',
    space: 'Kyoto Pavilion',
    slug: 'arc-lounge-chair'
  },
  {
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85',
    title: 'Terra Monolithic Oak Dining Table',
    space: 'Tribeca Penthouse',
    slug: 'terra-dining-table'
  },
  {
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85',
    title: 'Eos Low Platform Sanctuary Bed',
    space: 'Mayfair Suite',
    slug: 'eos-platform-bed'
  },
  {
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85',
    title: 'Linear Fluted Timber & Marble Credenza',
    space: 'Stockholm Studio',
    slug: 'linear-credenza'
  },
  {
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85',
    title: 'Alto Cantilever Executive Desk',
    space: 'Zürich Residence',
    slug: 'alto-executive-desk'
  }
];

export default function ArchitecturalFilmstrip() {
  const scrollContainerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Gentle auto-scrolling filmstrip loop
  useEffect(() => {
    if (prefersReducedMotion) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    let animId;
    let scrollPos = 0;
    const speed = 0.65; // pixels per frame

    const step = () => {
      scrollPos += speed;
      if (scrollPos >= container.scrollWidth / 2) {
        scrollPos = 0;
      }
      container.scrollLeft = scrollPos;
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    const onMouseEnter = () => cancelAnimationFrame(animId);
    const onMouseLeave = () => {
      animId = requestAnimationFrame(step);
    };

    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [prefersReducedMotion]);

  // Duplicate items for continuous infinite loop effect
  const displayItems = [...FILMSTRIP_ITEMS, ...FILMSTRIP_ITEMS];

  return (
    <div className="py-20 sm:py-28 bg-[#181818] text-[#F5F2EC] overflow-hidden border-t border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-caption text-[#D7C5AF] tracking-[0.25em] block mb-2">
            ARCHITECTURAL LOOKBOOK
          </span>
          <h2 className="font-display font-medium text-2xl sm:text-4xl text-white">
            Moments in light and space.
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#A7A39C] max-w-sm">
          A continuous visual study of ATELIER pieces placed in genuine contemporary residences.
        </p>
      </div>

      {/* Infinite Animated Horizontal Filmstrip */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-hidden scrollbar-none py-4 px-6 cursor-grab active:cursor-grabbing"
        style={{ scrollBehavior: 'auto' }}
      >
        {displayItems.map((item, index) => (
          <Link
            key={`${item.slug}-${index}`}
            to={`/products/${item.slug}`}
            className="flex-shrink-0 w-72 sm:w-88 group block relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#242424] border border-white/10 shadow-2xl transition-all duration-500 hover:scale-[1.03]"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D7C5AF] mb-1">
                {item.space}
              </span>
              <h3 className="font-display font-medium text-base text-white group-hover:text-[#D7C5AF] transition-colors line-clamp-2">
                {item.title}
              </h3>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-white/80 group-hover:text-white transition-colors">
                <span>View Piece</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}