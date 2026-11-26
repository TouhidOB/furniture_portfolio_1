import React, { useEffect } from 'react';
import HeroSection from '../sections/home/HeroSection';
import ManifestoSection from '../sections/home/ManifestoSection';
import SignatureSofaSection from '../sections/home/SignatureSofaSection';
import ExploreSpaceSection from '../sections/home/ExploreSpaceSection';
import LoungeChairSpotlight from '../sections/home/LoungeChairSpotlight';
import DiningTableSpotlight from '../sections/home/DiningTableSpotlight';
import BedroomSection from '../sections/home/BedroomSection';
import CraftsmanshipSection from '../sections/home/CraftsmanshipSection';
import PersonalizationSection from '../sections/home/PersonalizationSection';
import ShowroomSection from '../sections/home/ShowroomSection';
import InspirationGallerySection from '../sections/home/InspirationGallerySection';
import FinalCtaSection from '../sections/home/FinalCtaSection';
import ArchitecturalFilmstrip from '../components/home/ArchitecturalFilmstrip';
import { updateMetaTags } from '../utils/seo';

export default function HomePage({ onOpenBooking, onOpenSearch }) {
  useEffect(() => {
    updateMetaTags({
      title: 'ATELIER — Furniture that feels like art',
      description: 'Discover ATELIER 3D cinematic furniture showroom. Sculptural, architectural furniture crafted for spaces that deserve more than ordinary.',
    });
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* 01. Cinematic Hero */}
      <HeroSection onOpenBooking={onOpenBooking} />

      {/* 02. Brand Manifesto */}
      <ManifestoSection />

      {/* 03. Signature Sofa Reveal (Forma Sofa) */}
      <SignatureSofaSection />

      {/* 04. Explore by Space */}
      <ExploreSpaceSection />

      {/* 05. Lounge Chair Product Spotlight (Arc Lounge Chair) */}
      <LoungeChairSpotlight />

      {/* 06. Dining Table Product Spotlight (Terra Dining Table) */}
      <DiningTableSpotlight />

      {/* 07. Bedroom Collection (Eos Platform Bed) */}
      <BedroomSection />

      {/* 08. Craftsmanship */}
      <CraftsmanshipSection />

      {/* 09. Personalization Studio */}
      <PersonalizationSection />

      {/* 10. Showroom Experience */}
      <ShowroomSection onOpenBooking={onOpenBooking} />

      {/* Real Architectural Lookbook Filmstrip (Animated Infinite Panorama) */}
      <ArchitecturalFilmstrip />

      {/* 11. Inspiration Gallery */}
      <InspirationGallerySection />

      {/* 12. Final Cinematic CTA */}
      <FinalCtaSection onOpenBooking={onOpenBooking} />
    </div>
  );
}
