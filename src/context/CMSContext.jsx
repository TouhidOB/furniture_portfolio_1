import React, { createContext, useContext, useState, useEffect } from 'react';

const CMSContext = createContext(null);

const DEFAULT_THEME = {
  primary_ivory: '#F5F2EC',
  deep_charcoal: '#181818',
  warm_sand: '#D7C5AF',
  walnut_brown: '#72503C',
  stone_gray: '#A7A39C',
  muted_bronze: '#A57C52',
  body_bg_color: '#F5F2EC',
  body_text_color: '#181818',
};

const DEFAULT_SECTIONS = {
  hero: {
    section_id: 'hero',
    name: '01. Cinematic Hero',
    eyebrow: 'THE NEW LANGUAGE OF LIVING',
    title: 'Furniture that\nfeels like art.',
    subtitle: 'Sculptural mass balanced with tactile calm.',
    description: 'Thoughtfully designed pieces for spaces that deserve more than ordinary. Sculptural mass balanced with tactile calm.',
    cta_primary_label: 'Explore Collection',
    cta_primary_link: '/collections',
    cta_secondary_label: 'Discover Our Story',
    cta_secondary_link: '/about',
    background_color: '#F5F2EC',
    text_color: '#181818',
    extra_data: { model_type: 'sofa', model_color: '#F5F2EC', model_finish: 'boucle' }
  },
  manifesto: {
    section_id: 'manifesto',
    name: '02. Brand Manifesto',
    eyebrow: 'OUR PHILOSOPHY',
    title: 'Not just made.\nConsidered.',
    subtitle: 'The poetry of measured form.',
    description: 'We believe remarkable spaces begin with thoughtful objects. Every curve, texture, and proportion is designed to bring architectural serenity into everyday life.',
    background_color: '#F5F2EC',
    text_color: '#181818',
    extra_data: { stat1_val: '15+', stat1_lbl: 'Year Frame Guarantee', stat2_val: '100%', stat2_lbl: 'FSC Certified Timber', stat3_val: 'Zero', stat3_lbl: 'Synthetic VOC Seals' }
  },
  signature_sofa: {
    section_id: 'signature_sofa',
    name: '03. Signature Sofa Reveal',
    eyebrow: 'SIGNATURE SPOTLIGHT',
    title: 'Forma Modular System',
    subtitle: 'Designed around comfort. Crafted with intention.',
    description: 'An expansive, low-profile modular seating landscape engineered with high-resilience memory down and tactile Italian bouclé.',
    cta_primary_label: 'Explore Forma',
    cta_primary_link: '/products/forma-modular-sofa',
    background_color: '#EDE8E0',
    text_color: '#181818',
    extra_data: {}
  },
  explore_spaces: {
    section_id: 'explore_spaces',
    name: '04. Explore by Space',
    eyebrow: 'CURATED BY ROOM',
    title: 'A collection for every\nway of living.',
    subtitle: 'Four dedicated spatial realms.',
    description: 'Architectural pieces designed in concert. Harmonious timber species, quiet stone textures, and tactile natural textiles.',
    background_color: '#F5F2EC',
    text_color: '#181818',
    extra_data: {}
  },
  lounge_spotlight: {
    section_id: 'lounge_spotlight',
    name: '05. Lounge Chair Spotlight',
    eyebrow: 'SCULPTURAL SPOTLIGHT',
    title: 'Designed to make you stay.',
    subtitle: 'Mid-Century Japanese Ergonomics.',
    description: 'A sweeping continuous steam-bent American walnut shell cradling sculpted down-channel cushions.',
    cta_primary_label: 'Discover Arc',
    cta_primary_link: '/products/arc-lounge-chair',
    background_color: '#181818',
    text_color: '#F5F2EC',
    extra_data: { model_type: 'chair', model_color: '#181818', model_finish: 'leather' }
  },
  dining_spotlight: {
    section_id: 'dining_spotlight',
    name: '06. Dining Table Spotlight',
    eyebrow: 'ARCHITECTURAL DINING',
    title: 'Where moments\ngather.',
    subtitle: 'Monolithic solid French oak with fluted pillars.',
    description: 'The Terra Dining Table pairs monolithic solid French oak with sculptural fluted pillar pedestals.',
    cta_primary_label: 'Explore Terra Table',
    cta_primary_link: '/products/terra-dining-table',
    background_color: '#F5F2EC',
    text_color: '#181818',
    extra_data: {}
  },
  bedroom: {
    section_id: 'bedroom',
    name: '07. Bedroom Sanctuary',
    eyebrow: 'THE BEDROOM COLLECTION',
    title: 'Rest, beautifully.',
    subtitle: 'Stillness begins where clutter ends.',
    description: 'A low floating platform bed crafted in raw ash timber and natural Belgian linen, designed to quiet the mind.',
    cta_primary_label: 'Explore Eos Bed',
    cta_primary_link: '/products/eos-platform-bed',
    background_color: '#181818',
    text_color: '#FFFFFF',
    image_url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2000&q=85',
    extra_data: {}
  },
  craftsmanship: {
    section_id: 'craftsmanship',
    name: '08. Artisanal Craftsmanship',
    eyebrow: 'ARTISANAL STANDARDS',
    title: 'The beauty is in\nthe details.',
    subtitle: 'Five pillars of European & Japanese joinery.',
    description: 'Every curve, joint, and stitch is governed by rigorous engineering and quiet respect for organic materials.',
    background_color: '#F5F2EC',
    text_color: '#181818',
    extra_data: {}
  },
  personalization: {
    section_id: 'personalization',
    name: '09. Personalization Studio',
    eyebrow: 'INTERACTIVE CONFIGURATOR',
    title: 'Make it yours.',
    subtitle: 'Real-time 3D tailoring.',
    description: 'Experiment with bespoke modular dimensions, tactile fabrics, and vegetable-tanned leathers in real time.',
    background_color: '#F5F2EC',
    text_color: '#181818',
    extra_data: {}
  },
  showroom: {
    section_id: 'showroom',
    name: '10. Flagship Studios',
    eyebrow: 'FLAGSHIP SPACES',
    title: 'Experience the\ncollection in person.',
    subtitle: 'Tribeca • Mayfair • Minami-Aoyama',
    description: 'Step into a space where every detail is designed to inspire. Touch full-grain leathers and feel the weight of solid French oak.',
    cta_primary_label: 'Book a Showroom Visit',
    background_color: '#181818',
    text_color: '#F5F2EC',
    extra_data: {}
  },
  inspiration_gallery: {
    section_id: 'inspiration_gallery',
    name: '11. Inspiration Gallery',
    eyebrow: 'LIFESTYLE ARCHITECTURE',
    title: 'Spaces worth\nliving in.',
    subtitle: 'Curated global residences.',
    description: 'Architectural projects from around the globe realized with ATELIER furnishings.',
    background_color: '#F5F2EC',
    text_color: '#181818',
    extra_data: {}
  },
  final_cta: {
    section_id: 'final_cta',
    name: '12. Final Cinematic CTA',
    eyebrow: 'THE ATELIER VISION',
    title: 'Your space.\nReimagined.',
    subtitle: 'Timeless architectural pieces.',
    description: 'Explore a collection created for the moments that make a place your own. From monolithic oak dining tables to modular bouclé seating.',
    cta_primary_label: 'Explore All Furniture',
    cta_primary_link: '/collections',
    background_color: '#181818',
    text_color: '#F5F2EC',
    image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85',
    extra_data: {}
  }
};

export function CMSProvider({ children }) {
  const [sections, setSections] = useState(DEFAULT_SECTIONS);
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Apply body background & text colors dynamically to document body
  useEffect(() => {
    if (theme.body_bg_color) {
      document.body.style.backgroundColor = theme.body_bg_color;
    }
    if (theme.body_text_color) {
      document.body.style.color = theme.body_text_color;
    }
  }, [theme]);

  // Load initial CMS data from Django backend
  useEffect(() => {
    async function loadCMS() {
      try {
        // Fetch Sections
        const secRes = await fetch('/api/cms/sections/');
        if (secRes.ok) {
          const secList = await secRes.json();
          if (Array.isArray(secList) && secList.length > 0) {
            const secMap = { ...DEFAULT_SECTIONS };
            secList.forEach(s => {
              if (s.section_id) secMap[s.section_id] = s;
            });
            setSections(secMap);
          }
        }

        // Fetch Theme
        const themeRes = await fetch('/api/cms/theme/');
        if (themeRes.ok) {
          const themeData = await themeRes.json();
          if (themeData && themeData.primary_ivory) {
            setTheme(prev => ({ ...prev, ...themeData }));
          }
        }

        // Fetch Dashboard Stats
        const statsRes = await fetch('/api/cms/stats/');
        if (statsRes.ok) {
          setStats(await statsRes.json());
        }
      } catch (err) {
        console.info('Using local CMS defaults:', err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCMS();
  }, []);

  // Update a single section
  const updateSection = async (sectionId, updatedData) => {
    const updated = {
      ...sections[sectionId],
      ...updatedData
    };

    setSections(prev => ({
      ...prev,
      [sectionId]: updated
    }));

    try {
      await fetch(`/api/cms/sections/${sectionId}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
    } catch (err) {
      console.warn('Backend update failed, kept in local state:', err);
    }
  };

  // Update theme & body colors
  const updateTheme = async (newTheme) => {
    const merged = { ...theme, ...newTheme };
    setTheme(merged);

    try {
      await fetch('/api/cms/theme/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(merged),
      });
    } catch (err) {
      console.warn('Backend theme save failed, kept in local state:', err);
    }
  };

  return (
    <CMSContext.Provider
      value={{
        sections,
        theme,
        stats,
        loading,
        updateSection,
        updateTheme,
        refreshStats: async () => {
          try {
            const res = await fetch('/api/cms/stats/');
            if (res.ok) setStats(await res.json());
          } catch {}
        }
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    return {
      sections: DEFAULT_SECTIONS,
      theme: DEFAULT_THEME,
      updateSection: () => {},
      updateTheme: () => {},
      loading: false,
    };
  }
  return context;
}
