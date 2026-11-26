import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, Sparkles } from 'lucide-react';
import Button from './Button';
import { formatPrice } from '../../utils/product';
import { submitInquiryToBackend } from '../../utils/api';

export default function InquiryModal({ isOpen, onClose, product, selectedVariant, selectedMaterial }) {
  const dialogRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      setSubmittedInquiry(null);
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e) => {
      e.preventDefault();
      onClose();
    };

    const handleClickOutside = (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        onClose();
      }
    };

    dialog.addEventListener('cancel', handleCancel);
    dialog.addEventListener('click', handleClickOutside);
    return () => {
      dialog.removeEventListener('cancel', handleCancel);
      dialog.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  if (!product) return null;

  const currentPrice = (selectedVariant?.price || product.price) + (selectedMaterial?.priceDelta || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    try {
      const payload = {
        productSlug: product.slug,
        productName: product.name,
        variantName: selectedVariant?.name || 'Standard Specification',
        materialName: selectedMaterial?.name || 'Default Finish',
        estimatedPrice: formatPrice(currentPrice),
        ...formData,
      };

      const res = await submitInquiryToBackend(payload);
      const inquiryObj = res.inquiry || res;

      setSubmittedInquiry({
        name: formData.name,
        email: formData.email,
        productName: product.name,
        variantName: selectedVariant?.name || 'Standard Specification',
        materialName: selectedMaterial?.name || 'Default Finish',
        estimatedPrice: formatPrice(currentPrice),
        inquiryId: inquiryObj.inquiry_id || inquiryObj.inquiryId || `INQ-${Math.floor(100000 + Math.random() * 900000)}`,
        status: inquiryObj.status || 'Received'
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="inquiry-modal-title"
      className="w-full max-w-xl bg-[#F5F2EC] rounded-2xl shadow-2xl p-0 border border-[#E6E2D8] overflow-hidden"
    >
      <div className="p-6 border-b border-[#E6E2D8] flex items-center justify-between">
        <div>
          <span className="font-caption text-[#72503C]">Bespoke Order & Advisory</span>
          <h2 id="inquiry-modal-title" className="font-display font-medium text-2xl text-[#181818]">
            Product Inquiry
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full hover:bg-black/5 text-[#76726B] hover:text-[#181818] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 max-h-[75vh] overflow-y-auto overscroll-contain">
        {submittedInquiry ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display font-medium text-2xl text-[#181818]">
              Inquiry Dispatched to Atelier Backend
            </h3>
            <p className="text-sm text-[#76726B] max-w-md mx-auto">
              Thank you, {submittedInquiry.name}. Your inquiry regarding the {submittedInquiry.productName} has been recorded under reference #{submittedInquiry.inquiryId} ({submittedInquiry.status}). An ATELIER client advisor will reach out to {submittedInquiry.email} within 24 business hours.
            </p>
            <div className="p-4 bg-white rounded-xl border border-[#E6E2D8] max-w-sm mx-auto text-left space-y-2 text-xs">
              <div className="flex justify-between text-[#76726B]">
                <span>Piece:</span>
                <span className="font-medium text-[#181818]">{submittedInquiry.productName}</span>
              </div>
              <div className="flex justify-between text-[#76726B]">
                <span>Configuration:</span>
                <span className="font-medium text-[#181818]">{submittedInquiry.variantName}</span>
              </div>
              <div className="flex justify-between text-[#76726B]">
                <span>Material / Finish:</span>
                <span className="font-medium text-[#181818]">{submittedInquiry.materialName}</span>
              </div>
              <div className="flex justify-between text-[#76726B]">
                <span>Estimated Value:</span>
                <span className="font-medium text-[#181818]">{submittedInquiry.estimatedPrice}</span>
              </div>
              <div className="flex justify-between text-[#76726B]">
                <span>Database Status:</span>
                <span className="text-emerald-700 font-medium">{submittedInquiry.status}</span>
              </div>
            </div>
            <div className="pt-4">
              <Button variant="primary" onClick={onClose}>
                Back to Product
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selected Configuration Summary */}
            <div className="p-4 bg-white rounded-xl border border-[#E6E2D8] flex items-center gap-4">
              <img
                src={product.images.hero}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg bg-[#EAE4D9]"
              />
              <div className="flex-1 min-w-0">
                <p className="font-display font-medium text-sm text-[#181818] truncate">{product.name}</p>
                <p className="text-xs text-[#76726B] mt-0.5">
                  {selectedVariant?.name || 'Standard'} • {selectedMaterial?.name || 'Default Finish'}
                </p>
                <p className="text-xs font-semibold text-[#181818] mt-1">
                  {formatPrice(currentPrice)} <span className="font-normal text-[11px] text-[#76726B]">(Sample Demo Price)</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#76726B] mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Julian Rhys"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E6E2D8] text-sm text-[#181818] focus:border-[#181818] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#76726B] mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="julian@rhysdesign.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E6E2D8] text-sm text-[#181818] focus:border-[#181818] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#76726B] mb-1.5">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 0192"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E6E2D8] text-sm text-[#181818] focus:border-[#181818] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#76726B] mb-1.5">
                  Delivery City / Country
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="San Francisco, USA"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E6E2D8] text-sm text-[#181818] focus:border-[#181818] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#76726B] mb-1.5">
                Questions or Custom Dimension Requests
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Inquiring regarding white-glove residential delivery and leather swatch samples..."
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E6E2D8] text-sm text-[#181818] focus:border-[#181818] focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[#76726B]">
                Made to order with certificate of authenticity.
              </span>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting to Backend...' : 'Submit Inquiry'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
