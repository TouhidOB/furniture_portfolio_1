import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { searchCatalog, formatPrice } from '../../utils/product';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results = searchCatalog(query);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      if (dialog.open) {
        dialog.close();
      }
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC or backdrop click
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

  const handleSelectProduct = (slug) => {
    onClose();
    navigate(`/products/${slug}`);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="search-modal-title"
      className="w-full max-w-2xl bg-[#F5F2EC] rounded-2xl shadow-2xl p-0 border border-[#E6E2D8] overflow-hidden"
    >
      <div className="p-6 border-b border-[#E6E2D8] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Search className="w-5 h-5 text-[#76726B]" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sofas, chairs, tables, beds..."
            className="w-full bg-transparent border-none text-lg text-[#181818] placeholder-[#A7A39C] focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full hover:bg-black/5 text-[#76726B] hover:text-[#181818] transition-colors"
          aria-label="Close search"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="max-h-[60vh] overflow-y-auto p-6 overscroll-contain">
        <h2 id="search-modal-title" className="sr-only">Search Catalog</h2>
        
        {query.trim() === '' ? (
          <div>
            <p className="text-xs font-semibold tracking-wider uppercase text-[#76726B] mb-3">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {['Forma Modular Sofa', 'Arc Lounge Chair', 'Terra Dining Table', 'Eos Platform Bed', 'Bouclé', 'Walnut'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setQuery(tag)}
                  className="px-3.5 py-1.5 rounded-full bg-white border border-[#E6E2D8] text-xs font-medium text-[#181818] hover:border-[#181818] transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#76726B] mb-2">
              {results.length} {results.length === 1 ? 'Result' : 'Results'} Found
            </p>
            {results.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => handleSelectProduct(product.slug)}
                className="w-full text-left p-3.5 rounded-xl bg-white/70 hover:bg-white border border-transparent hover:border-[#E6E2D8] flex items-center justify-between gap-4 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.images.hero}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg bg-[#EAE4D9]"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="font-display font-medium text-[#181818] group-hover:text-[#72503C] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#76726B] line-clamp-1">{product.tagline}</p>
                    <span className="text-xs font-semibold text-[#181818] mt-1 inline-block">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#A7A39C] group-hover:text-[#181818] group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-base text-[#181818] font-medium">No pieces found matching &ldquo;{query}&rdquo;</p>
            <p className="text-sm text-[#76726B] mt-1">Try searching for materials like bouclé, walnut, or categories like sofas.</p>
          </div>
        )}
      </div>
    </dialog>
  );
}
