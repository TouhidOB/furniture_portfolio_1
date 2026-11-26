import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Tag, Maximize2, X, Compass } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { gsap } from '../../utils/animation';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const galleryItems = [
  {
    id: 'tribeca',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
    title: 'The Tribeca Loft Residence',
    location: 'New York, USA',
    architecture: 'Studio MDA Architecture',
    featuredProduct: { name: 'Terra Dining Table', slug: 'terra-dining-table' },
    colSpan: 'md:col-span-8',
    aspect: 'aspect-[16/10]',
    quote: 'Monolithic French oak paired with exposed historic brickwork and natural northern light.'
  },
  {
    id: 'tokyo',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
    title: 'Minami-Aoyama Penthouse',
    location: 'Tokyo, Japan',
    architecture: 'Kengo Associates',
    featuredProduct: { name: 'Arc Lounge Chair', slug: 'arc-lounge-chair' },
    colSpan: 'md:col-span-4',
    aspect: 'aspect-[4/3] md:aspect-[16/13]',
    quote: 'Minimalist Japanese joinery and steam-bent walnut bathed in tatami-filtered sunlight.'
  },
  {
    id: 'copenhagen',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85',
    title: 'Copenhagen Coastal Villa',
    location: 'Charlottenlund, Denmark',
    architecture: 'Norm Architectural Studio',
    featuredProduct: { name: 'Forma Modular Sofa', slug: 'forma-modular-sofa' },
    colSpan: 'md:col-span-4',
    aspect: 'aspect-[4/3] md:aspect-[16/13]',
    quote: 'Low-profile bouclé seating mirroring the calm horizontal horizon of the Øresund coast.'
  },
  {
    id: 'mayfair',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
    title: 'The Mayfair Design Studio',
    location: 'London, UK',
    architecture: 'Foster Heritage Interiors',
    featuredProduct: { name: 'Alto Executive Desk', slug: 'alto-executive-desk' },
    colSpan: 'md:col-span-8',
    aspect: 'aspect-[16/10]',
    quote: 'Cantilevered black oak and saddle leather grounding a Georgian townhouse workspace.'
  },
];

export default function InspirationGallerySection() {
  const { sections } = useCMS();
  const content = sections.inspiration_gallery || {};
  const [activeLightbox, setActiveLightbox] = useState(null);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveLightbox(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const img = el.querySelector('img');
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -6, scale: 1.08 },
            {
              yPercent: 6,
              scale: 1.0,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        }
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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-caption text-[#72503C] tracking-[0.2em] block mb-3">
              {content.eyebrow || 'LIFESTYLE ARCHITECTURE'}
            </span>
            <h2 className="font-display-section font-medium leading-[1.05] whitespace-pre-line">
              {content.title || 'Spaces worth\nliving in.'}
            </h2>
          </div>
          <p className="text-base opacity-80 max-w-md">
            {content.description || 'Architectural projects from around the globe realized with ATELIER furnishings. Curated by leading interior architects and discerning homeowners.'}
          </p>
        </div>

        {/* Asymmetric Gallery Grid with Parallax Animation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`${item.colSpan} group`}
            >
              <div
                className={`relative ${item.aspect} rounded-3xl overflow-hidden bg-[#EDE8E0] border border-[#E6E2D8] shadow-sm transition-all duration-500 group-hover:shadow-2xl cursor-pointer`}
                onClick={() => setActiveLightbox(item)}
              >
                <div className="w-full h-[116%] -mt-[8%] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Floating Expand Icon */}
                <div className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
                  <span className="text-xs text-[#D7C5AF] font-mono tracking-wider uppercase mb-1">
                    {item.location} • {item.architecture}
                  </span>
                  <h3 className="font-display font-medium text-xl sm:text-2xl text-white">
                    {item.title}
                  </h3>

                  {/* Interactive Product Tag */}
                  {item.featuredProduct && (
                    <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
                      <Link
                        to={`/products/${item.featuredProduct.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#181818] backdrop-blur-md text-xs font-medium transition-colors"
                      >
                        <Tag className="w-3.5 h-3.5" />
                        <span>Featured: {item.featuredProduct.name}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                      <span className="text-[11px] text-[#D7C5AF] font-mono hidden sm:inline">
                        Click image to expand
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl animate-fadeIn"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-[#181818] text-white rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* High-Resolution Photo Display */}
            <div className="md:w-2/3 h-64 sm:h-96 md:h-auto relative overflow-hidden bg-black">
              <img
                src={activeLightbox.image}
                alt={activeLightbox.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Editorial Information Side Panel */}
            <div className="md:w-1/3 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-mono text-[#D7C5AF] uppercase tracking-widest block mb-1">
                  {activeLightbox.location}
                </span>
                <h3 className="font-display font-medium text-2xl text-white">
                  {activeLightbox.title}
                </h3>
                <p className="text-xs font-mono text-[#A7A39C] mt-1">
                  Architecture by {activeLightbox.architecture}
                </p>

                <p className="font-editorial-quote text-sm text-[#E6E2D8] mt-6 leading-relaxed">
                  &ldquo;{activeLightbox.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#D7C5AF] block">
                  Furnished With
                </span>
                <Link
                  to={`/products/${activeLightbox.featuredProduct.slug}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white text-xs font-medium"
                >
                  <span>{activeLightbox.featuredProduct.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#D7C5AF]" />
                </Link>
                <button
                  type="button"
                  onClick={() => setActiveLightbox(null)}
                  className="w-full text-center text-xs text-[#A7A39C] hover:text-white pt-2 transition-colors"
                >
                  Press Esc or Click Outside to Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
