import React from 'react';
import { RotateCcw, Check, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import { formatPrice } from '../../utils/product';

export default function ProductConfiguratorUI({
  product,
  selectedVariant,
  onSelectVariant,
  selectedMaterial,
  onSelectMaterial,
  onReset,
  onOpenInquiry,
}) {
  if (!product) return null;

  const basePrice = selectedVariant?.price || product.price;
  const materialDelta = selectedMaterial?.priceDelta || 0;
  const totalPrice = basePrice + materialDelta;

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E6E2D8] shadow-sm space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-[#E6E2D8]">
        <div>
          <span className="font-caption text-[#72503C]">Customization Studio</span>
          <h3 className="font-display font-medium text-xl text-[#181818] mt-0.5">
            Personalize Your Piece
          </h3>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs text-[#76726B] hover:text-[#181818] transition-colors"
          title="Reset to default options"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Variant / Size Options */}
      {product.availableVariants && product.availableVariants.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#76726B]">
              1. Dimensions & Configuration
            </label>
            <span className="text-xs text-[#181818] font-medium">
              {selectedVariant?.dimensions}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {product.availableVariants.map((variant) => {
              const isSelected = selectedVariant?.id === variant.id;
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => onSelectVariant(variant)}
                  className={`p-3.5 text-left rounded-xl border transition-all ${
                    isSelected
                      ? 'border-[#181818] bg-[#F5F2EC] shadow-sm ring-1 ring-[#181818]'
                      : 'border-[#E6E2D8] hover:border-[#A7A39C] bg-white'
                  }`}
                >
                  <p className="font-display font-medium text-sm text-[#181818]">{variant.name}</p>
                  <p className="text-xs text-[#76726B] mt-0.5">{variant.dimensions}</p>
                  <p className="text-xs font-semibold text-[#181818] mt-2">
                    {formatPrice(variant.price)}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Material & Color Swatches */}
      {product.materials && product.materials.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#76726B]">
              2. Material & Finish
            </label>
            <span className="text-xs text-[#181818] font-medium">
              {selectedMaterial?.name}
              {selectedMaterial?.priceDelta > 0 && ` (+${formatPrice(selectedMaterial.priceDelta)})`}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {product.materials.map((mat) => {
              const isSelected = selectedMaterial?.id === mat.id;
              return (
                <button
                  key={mat.id}
                  type="button"
                  onClick={() => onSelectMaterial(mat)}
                  className={`group relative p-3 rounded-xl border flex flex-col items-center gap-2 transition-all text-center ${
                    isSelected
                      ? 'border-[#181818] bg-[#F5F2EC] ring-1 ring-[#181818]'
                      : 'border-[#E6E2D8] hover:border-[#A7A39C] bg-white'
                  }`}
                >
                  <div
                    className="w-9 h-9 rounded-full border border-black/10 shadow-inner flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: mat.color }}
                  >
                    {isSelected && (
                      <Check className={`w-4 h-4 ${mat.color === '#F5F2EC' || mat.color === '#FFFFFF' ? 'text-[#181818]' : 'text-white'}`} />
                    )}
                  </div>
                  <span className="text-xs font-medium text-[#181818] leading-tight line-clamp-1">
                    {mat.name}
                  </span>
                  <span className="text-[10px] text-[#76726B] capitalize">
                    {mat.type}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Pricing and Inquiry Actions */}
      <div className="pt-6 border-t border-[#E6E2D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-[#76726B] uppercase tracking-wider block">Estimated Investment</span>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-medium text-3xl text-[#181818]">
              {formatPrice(totalPrice)}
            </span>
            <span className="text-xs text-[#76726B]">(Sample Demo Price)</span>
          </div>
          <span className="text-xs text-emerald-700 block mt-0.5">
            ● {product.availability}
          </span>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={onOpenInquiry}
          icon={Sparkles}
        >
          Inquire About This Piece
        </Button>
      </div>
    </div>
  );
}
