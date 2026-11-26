import React, { useEffect } from 'react';
import { brand } from '../data/brand';
import { updateMetaTags } from '../utils/seo';
import Button from '../components/ui/Button';
import { ArrowRight, Trees, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';

export default function AboutPage({ onOpenBooking }) {
  useEffect(() => {
    updateMetaTags({
      title: 'Our Story & Philosophy | ATELIER',
      description: 'Learn the architectural philosophy, Danish-Japanese heritage, and artisanal timber traditions behind ATELIER furniture.',
    });
  }, []);

  return (
    <div className="pt-32 pb-32">
      {/* Hero Narrative */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-24">
        <div className="max-w-3xl">
          <span className="font-caption text-[#72503C] tracking-[0.2em] block mb-3">
            OUR GENESIS & ETHOS
          </span>
          <h1 className="font-display-hero text-[#181818] font-medium leading-[1.0]">
            The poetry of<br />
            measured form.
          </h1>
          <p className="font-editorial-quote text-[#72503C] mt-6 leading-relaxed">
            &ldquo;Furniture should not scream for attention. It should occupy space with quiet certainty, welcoming the human touch and aging with dignity.&rdquo;
          </p>
        </div>
      </section>

      {/* Two-Column Origin Story */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-16 border-t border-[#E6E2D8]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6 space-y-6 text-base text-[#76726B] leading-relaxed">
            <h2 className="font-display-section text-[#181818] font-medium leading-[1.1]">
              Born between Copenhagen and Kyoto.
            </h2>
            <p>
              Founded in 2021, ATELIER emerged from a shared dialogue between Scandinavian functionalism and Japanese wabi-sabi aesthetics. We asked a foundational question: What would furniture look like if every piece were designed with the permanence of a civic sculpture?
            </p>
            <p>
              Rather than rushing seasonal collections, we design slowly. A single prototype might undergo twelve iterations of joinery adjustments and millimeter-level radius sculpting before entering production.
            </p>
            <p>
              Every piece in our catalog is engineered to be repairable, modular, and structurally sound for decades—rejecting planned obsolescence in favor of generational guardianship.
            </p>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#EDE8E0] border border-[#E6E2D8] shadow-md">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="ATELIER Design Studio Prototype Process"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="bg-[#EDE8E0] py-24 sm:py-32 px-6 sm:px-8 border-y border-[#E6E2D8] my-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-caption text-[#72503C]">Core Foundations</span>
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-[#181818] mt-2">
              Principles of Permanence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-[#E6E2D8] space-y-4">
              <Trees className="w-6 h-6 text-[#72503C]" />
              <h3 className="font-display font-medium text-xl text-[#181818]">Living Materials</h3>
              <p className="text-sm text-[#76726B] leading-relaxed">
                We work strictly with solid FSC-certified hardwoods, vegetable-tanned full-grain leathers, natural linens, and unsealed marbles that patina beautifully over time.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#E6E2D8] space-y-4">
              <ShieldCheck className="w-6 h-6 text-[#72503C]" />
              <h3 className="font-display font-medium text-xl text-[#181818]">15-Year Guarantee</h3>
              <p className="text-sm text-[#76726B] leading-relaxed">
                Our solid timber skeletons and precision steel subframes are engineered to withstand rigorous daily life. We back every structural frame with a 15-year warranty.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#E6E2D8] space-y-4">
              <HeartHandshake className="w-6 h-6 text-[#72503C]" />
              <h3 className="font-display font-medium text-xl text-[#181818]">Artisan Guilds</h3>
              <p className="text-sm text-[#76726B] leading-relaxed">
                We partner with dedicated multi-generational woodworking ateliers in Denmark and Kyoto, preserving traditional woodworking techniques while embracing modern CNC tolerances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Press Quotations */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="font-caption text-[#72503C]">Critical Acclaim</span>
          <h2 className="font-display font-medium text-2xl text-[#181818] mt-1">
            In the Words of Design Critics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brand.pressQuotes.map((press, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-white border border-[#E6E2D8] flex flex-col justify-between">
              <p className="font-editorial-quote text-lg text-[#181818] mb-6">
                &ldquo;{press.quote}&rdquo;
              </p>
              <span className="font-caption text-[#72503C]">{press.publication}</span>
            </div>
          ))}
        </div>

        <div className="text-center pt-16">
          <Button variant="primary" size="lg" onClick={onOpenBooking} icon={Compass}>
            Visit a Flagship Studio
          </Button>
        </div>
      </section>
    </div>
  );
}
