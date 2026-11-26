import React from 'react';
import { ShieldCheck, Award, Sparkles, Compass } from 'lucide-react';

export default function ProductSpecs({ product }) {
  if (!product || !product.specifications) return null;

  const specList = [
    { label: 'Structural Frame', value: product.specifications.frame || product.specifications.structure || product.specifications.body },
    { label: 'Cushioning / Core', value: product.specifications.cushioning || product.specifications.top || product.specifications.writingPad },
    { label: 'Base / Hardware', value: product.specifications.base || product.specifications.feet || product.specifications.pedestals || product.specifications.legs },
    { label: 'Upholstery / Finish', value: product.specifications.upholstery || product.specifications.finish || product.specifications.seal },
    { label: 'Joinery & Assembly', value: product.specifications.joinery || product.specifications.slats || product.specifications.drawers || 'Delivered assembled via White-Glove service' },
    { label: 'Manufacturer Guarantee', value: product.specifications.warranty || '10-Year Comprehensive Warranty' },
  ].filter(item => Boolean(item.value));

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E6E2D8] pb-4">
        <span className="font-caption text-[#72503C]">Technical Precision</span>
        <h3 className="font-display font-medium text-2xl text-[#181818] mt-1">
          Specifications & Engineering
        </h3>
      </div>

      <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        {specList.map((item, index) => (
          <div key={index} className="border-b border-[#E6E2D8] pb-4">
            <dt className="text-xs font-semibold uppercase tracking-wider text-[#76726B] mb-1">
              {item.label}
            </dt>
            <dd className="text-sm text-[#181818] leading-relaxed">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
        <div className="p-4 rounded-xl bg-white border border-[#E6E2D8] flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#72503C]" />
          <div>
            <p className="text-xs font-semibold text-[#181818]">FSC Certified</p>
            <p className="text-[11px] text-[#76726B]">Sustainable Timber</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#E6E2D8] flex items-center gap-3">
          <Award className="w-5 h-5 text-[#72503C]" />
          <div>
            <p className="text-xs font-semibold text-[#181818]">15-Yr Warranty</p>
            <p className="text-[11px] text-[#76726B]">Structural Integrity</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#E6E2D8] flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-[#72503C]" />
          <div>
            <p className="text-xs font-semibold text-[#181818]">Hand Finished</p>
            <p className="text-[11px] text-[#76726B]">Artisan Tailored</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#E6E2D8] flex items-center gap-3">
          <Compass className="w-5 h-5 text-[#72503C]" />
          <div>
            <p className="text-xs font-semibold text-[#181818]">White Glove</p>
            <p className="text-[11px] text-[#76726B]">In-Home Setup</p>
          </div>
        </div>
      </div>
    </div>
  );
}
