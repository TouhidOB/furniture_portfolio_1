import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';
import SceneCanvas from '../../components/three/SceneCanvas';
import ProductModel from '../../components/three/ProductModel';
import CameraRig from '../../components/three/CameraRig';
import Button from '../../components/ui/Button';
import { gsap, ScrollTrigger } from '../../utils/animation';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useCMS } from '../../context/CMSContext';

const stages = [
  {
    range: '0% – 20%',
    eyebrow: 'STAGE 01',
    headline: 'Designed around comfort.',
    copy: 'Low-profile architectural massing that gently anchors your living space with continuous perimeter curves.',
    cameraPos: [0, 1.2, 4.0],
    rotation: [0, -0.3, 0],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
    tag: 'Architectural Massing'
  },
  {
    range: '20% – 40%',
    eyebrow: 'STAGE 02',
    headline: 'Crafted with intention.',
    copy: 'Solid FSC-certified beech wood frames joined with precision mortise-and-tenon craftsmanship.',
    cameraPos: [-0.8, 0.9, 2.6],
    rotation: [0, -0.1, 0],
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
    tag: 'Joinery & Frame'
  },
  {
    range: '40% – 60%',
    eyebrow: 'STAGE 03',
    headline: 'Tactile Italian bouclé.',
    copy: 'High-loop natural wool fibers woven for nuanced light reflection and durable multi-generational softness.',
    cameraPos: [0.7, 0.7, 1.9],
    rotation: [0, 0.35, 0],
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
    tag: 'Macro Fiber Detail'
  },
  {
    range: '60% – 80%',
    eyebrow: 'STAGE 04',
    headline: 'Made to adapt.',
    copy: 'Concealed interlocking brackets permit seamless transformation between deep daybed, chaise, and sectional layouts.',
    cameraPos: [0, 1.8, 3.2],
    rotation: [0.1, -0.4, 0],
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=85',
    tag: 'Modular Arrangements'
  },
  {
    range: '80% – 100%',
    eyebrow: 'STAGE 05',
    headline: 'Meet the Forma Sofa.',
    copy: 'The ultimate expression of sculptural calm. Tailored to order in Copenhagen.',
    cameraPos: [0, 1.2, 3.8],
    rotation: [0, -0.2, 0],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    tag: 'Penthouse Residence'
  },
];

export default function SignatureSofaSection() {
  const { sections } = useCMS();
  const content = sections.signature_sofa || {};
  const pinContainerRef = useRef(null);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const element = pinContainerRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress; // 0 to 1
          const idx = Math.min(
            stages.length - 1,
            Math.floor(progress * stages.length)
          );
          setCurrentStageIdx(idx);
        },
      });
    }, element);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const activeStage = stages[currentStageIdx];

  return (
    <section
      ref={pinContainerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between py-12 px-6 sm:px-8 border-t border-[#E6E2D8] transition-colors duration-500"
      style={{
        backgroundColor: content.background_color || '#EDE8E0',
        color: content.text_color || '#181818',
      }}
      aria-label="Forma Sofa Cinematic Reveal"
    >
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <SceneCanvas
          alt="Forma Modular Sofa Cinematic Reveal"
          fallbackImage="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80"
          camera={{ position: activeStage.cameraPos, fov: 40 }}
        >
          <CameraRig
            targetPosition={activeStage.cameraPos}
            lookAt={[0, 0.4, 0]}
            lerpSpeed={0.06}
          />
          <ProductModel
            type="sofa"
            color="#F5F2EC"
            finish="boucle"
            scale={1.0}
            rotation={activeStage.rotation}
          />
        </SceneCanvas>
      </div>

      {/* Floating Header */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between">
        <div>
          <span className="font-caption text-[#72503C]">
            {content.eyebrow || 'SIGNATURE SPOTLIGHT'}
          </span>
          <h2 className="font-display font-medium text-lg">
            {content.title || 'Forma Modular System'}
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          {stages.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentStageIdx === i ? 'w-8 bg-[#181818]' : 'w-2 bg-[#181818]/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Dynamic Scroll Stage Editorial Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pb-8 pointer-events-none flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-xl bg-white/85 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/60 shadow-xl pointer-events-auto transition-all duration-500">
          <div className="flex items-center justify-between mb-2">
            <span className="font-caption text-[#72503C] tracking-widest">
              {activeStage.eyebrow} • {activeStage.range}
            </span>
            <span className="text-xs font-mono text-[#76726B]">
              Stage 0{currentStageIdx + 1} / 05
            </span>
          </div>

          <h3 className="font-display font-medium text-2xl sm:text-3xl text-[#181818] mb-3">
            {activeStage.headline}
          </h3>

          <p className="text-sm sm:text-base text-[#76726B] leading-relaxed mb-6">
            {activeStage.copy}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-[#E6E2D8]">
            <Button
              to={content.cta_primary_link || '/products/forma-modular-sofa'}
              variant="primary"
              size="md"
              icon={ArrowRight}
            >
              {content.cta_primary_label || 'Explore Forma'}
            </Button>
            <span className="text-xs font-medium text-[#76726B] hidden sm:inline">
              Scroll down to advance sequence ↓
            </span>
          </div>
        </div>

        {/* Real High-Resolution Studio Shoot Insight Card */}
        <div className="hidden lg:flex items-center gap-4 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/80 shadow-xl pointer-events-auto max-w-sm transition-all duration-500">
          <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-[#EDE8E0] relative group">
            <img
              src={activeStage.image}
              alt={activeStage.tag}
              key={activeStage.image}
              className="w-full h-full object-cover transition-all duration-500 transform group-hover:scale-110"
              loading="lazy"
            />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#72503C] block mb-0.5">
              Studio Photography
            </span>
            <h4 className="font-display font-medium text-sm text-[#181818]">
              {activeStage.tag}
            </h4>
            <p className="text-xs text-[#76726B] mt-1 line-clamp-2">
              Captured during the 2026 Copenhagen Architectural Studio presentation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
