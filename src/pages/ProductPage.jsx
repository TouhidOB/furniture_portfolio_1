import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Check, Share2, ShieldCheck, Heart } from 'lucide-react';
import SceneCanvas from '../components/three/SceneCanvas';
import ProductModel from '../components/three/ProductModel';
import ProductControls from '../components/three/ProductControls';
import ProductGallery from '../components/product/ProductGallery';
import ProductConfiguratorUI from '../components/product/ProductConfiguratorUI';
import ProductSpecs from '../components/product/ProductSpecs';
import ProductDimensions from '../components/product/ProductDimensions';
import ProductCare from '../components/product/ProductCare';
import StorytellingSection from '../components/product/StorytellingSection';
import ProductCard from '../components/product/ProductCard';
import InquiryModal from '../components/ui/InquiryModal';
import Button from '../components/ui/Button';
import { getProductBySlug, getRelatedProducts, formatPrice } from '../utils/product';
import { updateMetaTags } from '../utils/seo';

export default function ProductPage({ onOpenBooking }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug);

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!product) return;

    setSelectedVariant(product.availableVariants?.[0] || null);
    setSelectedMaterial(product.materials?.[0] || null);

    updateMetaTags({
      title: product.seo?.title || `${product.name} | ATELIER`,
      description: product.seo?.description || product.shortDescription,
      image: product.images.hero,
      url: window.location.href,
    });
  }, [product, slug]);

  if (!product) {
    return (
      <div className="pt-40 pb-32 px-6 text-center max-w-xl mx-auto">
        <h1 className="font-display font-medium text-3xl text-[#181818]">Product Not Found</h1>
        <p className="text-sm text-[#76726B] mt-2">
          The requested piece could not be located in the current ATELIER catalog archive.
        </p>
        <div className="mt-6">
          <Button to="/collections" variant="primary">
            Browse All Collections
          </Button>
        </div>
      </div>
    );
  }

  const relatedList = getRelatedProducts(product.slug);
  const basePrice = selectedVariant?.price || product.price;
  const materialDelta = selectedMaterial?.priceDelta || 0;
  const totalPrice = basePrice + materialDelta;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleResetConfig = () => {
    setSelectedVariant(product.availableVariants?.[0] || null);
    setSelectedMaterial(product.materials?.[0] || null);
  };

  return (
    <div className="pt-24 pb-32">
      {/* Breadcrumb & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between text-xs text-[#76726B]">
        <Link
          to={`/collections/${product.category}`}
          className="inline-flex items-center gap-2 hover:text-[#181818] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to {product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
        </Link>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 hover:text-[#181818] transition-colors"
            title="Print or export architectural product specification tearsheet"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#72503C]" />
            <span>Architectural Spec Sheet</span>
          </button>
          <span className="text-[#D7C5AF]">|</span>
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 hover:text-[#181818] transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
          </button>
          <span className="font-mono text-[#A7A39C]">ID: {product.id}</span>
        </div>
      </div>

      {/* 1. Cinematic 3D Hero & Product Overview */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Interactive 3D Canvas Showcase */}
          <div className="lg:col-span-7 h-[480px] sm:h-[620px] rounded-3xl overflow-hidden bg-[#EDE8E0] border border-[#E6E2D8] shadow-md relative group">
            <SceneCanvas
              alt={`${product.name} 3D interactive view`}
              fallbackImage={product.images.hero}
              camera={{ position: product.cameraPresets?.hero?.position || [0, 1.2, 3.8], fov: 40 }}
            >
              <ProductModel
                type={product.model3d?.type || 'sofa'}
                glbUrl={product.model3d?.glbUrl || null}
                color={selectedMaterial?.color || product.model3d?.defaultColor || '#F5F2EC'}
                finish={selectedMaterial?.type || product.model3d?.defaultFinish || 'boucle'}
                scale={selectedVariant?.id === '4-piece' ? 1.08 : 1.0}
                rotation={[0, -0.25, 0]}
              />
              <ProductControls enabled={true} autoRotate={false} />
            </SceneCanvas>

            <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-black/5 text-[11px] font-medium text-[#181818] shadow-sm">
              Current Finish: {selectedMaterial?.name || 'Default'}
            </div>

            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-black/5 text-[11px] text-[#76726B] pointer-events-none">
              Drag to inspect 360° • Pinch to zoom
            </div>
          </div>

          {/* Product Header & Introduction */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-caption text-[#72503C] tracking-[0.2em] block mb-2">
                {product.collection} • {product.category.toUpperCase()}
              </span>
              <h1 className="font-display-product text-[#181818] font-medium leading-[1.05]">
                {product.name}
              </h1>
              <p className="font-editorial-quote text-[#72503C] mt-2">
                &ldquo;{product.tagline}&rdquo;
              </p>
            </div>

            <p className="text-base text-[#76726B] leading-relaxed">
              {product.longDescription}
            </p>

            {/* Key Features Bullet List */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-3 pt-2">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#72503C] mt-2 shrink-0" />
                    <div>
                      <strong className="text-xs font-semibold uppercase tracking-wider text-[#181818] block">
                        {feature.title}
                      </strong>
                      <span className="text-xs text-[#76726B] leading-normal block">
                        {feature.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Price and Immediate CTA */}
            <div className="pt-6 border-t border-[#E6E2D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#76726B] uppercase tracking-wider block">Total Configuration</span>
                <span className="font-display font-medium text-3xl text-[#181818]">
                  {formatPrice(totalPrice)}
                </span>
                <span className="text-[11px] text-[#76726B] block">Sample Demo Price • {product.availability}</span>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={() => setIsInquiryOpen(true)}
                icon={Sparkles}
              >
                Inquire About Piece
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category-Specific Narrative Storytelling */}
      <StorytellingSection product={product} />

      {/* 3. Product Gallery & Material Details */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <span className="font-caption text-[#72503C] mb-2 block">Visual Archive</span>
            <h2 className="font-display font-medium text-2xl sm:text-3xl text-[#181818] mb-6">
              Studio Photography & Material Angles
            </h2>
            <ProductGallery images={product.images} name={product.name} />
          </div>

          <div className="lg:col-span-5 space-y-8">
            <ProductDimensions dimensions={product.dimensions} />
            <ProductCare careInstructions={product.care} />
          </div>
        </div>
      </section>

      {/* 4. Interactive Configuration Studio */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <ProductConfiguratorUI
            product={product}
            selectedVariant={selectedVariant}
            onSelectVariant={setSelectedVariant}
            selectedMaterial={selectedMaterial}
            onSelectMaterial={setSelectedMaterial}
            onReset={handleResetConfig}
            onOpenInquiry={() => setIsInquiryOpen(true)}
          />
        </div>
      </section>

      {/* 5. Technical Specifications (Accessible without WebGL) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-16 border-t border-[#E6E2D8]">
        <ProductSpecs product={product} />
      </section>

      {/* 6. Related Products */}
      {relatedList.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 sm:px-8 py-20 border-t border-[#E6E2D8]">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="font-caption text-[#72503C]">Harmonious Pairings</span>
              <h2 className="font-display font-medium text-2xl sm:text-3xl text-[#181818] mt-1">
                Companions for {product.name}
              </h2>
            </div>
            <Link
              to={`/collections/${product.category}`}
              className="text-xs font-medium uppercase tracking-wider text-[#72503C] hover:text-[#181818] transition-colors"
            >
              View All {product.category} →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedList.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        product={product}
        selectedVariant={selectedVariant}
        selectedMaterial={selectedMaterial}
      />
    </div>
  );
}
