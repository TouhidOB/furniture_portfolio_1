import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ArrowRight, Search, Calendar } from 'lucide-react';
import Button from './Button';

export default function MobileDrawer({ isOpen, onClose, onOpenSearch, onOpenBooking }) {
  const location = useLocation();

  useEffect(() => {
    onClose();
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#181818]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-label="Navigation Menu"
        aria-modal="true"
        className="relative w-full max-w-sm bg-[#F5F2EC] h-full shadow-2xl flex flex-col justify-between p-6 z-10 overscroll-contain animate-in slide-in-from-right duration-300"
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[#E6E2D8]">
            <Link to="/" className="font-display font-semibold tracking-widest text-lg text-[#181818]">
              ATELIER
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 text-[#76726B] hover:text-[#181818]"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="mt-8 space-y-4">
            <Link
              to="/collections"
              className="flex items-center justify-between text-2xl font-display font-medium text-[#181818] hover:text-[#72503C] transition-colors py-1"
            >
              <span>All Collections</span>
              <ArrowRight className="w-4 h-4 text-[#A7A39C]" />
            </Link>
            <div className="pl-3 space-y-2.5 border-l border-[#E6E2D8] my-3">
              <Link to="/collections/living" className="block text-sm text-[#76726B] hover:text-[#181818] transition-colors">
                Living Room
              </Link>
              <Link to="/collections/dining" className="block text-sm text-[#76726B] hover:text-[#181818] transition-colors">
                Dining Room
              </Link>
              <Link to="/collections/bedroom" className="block text-sm text-[#76726B] hover:text-[#181818] transition-colors">
                Bedroom
              </Link>
              <Link to="/collections/workspace" className="block text-sm text-[#76726B] hover:text-[#181818] transition-colors">
                Workspace
              </Link>
            </div>
            <Link
              to="/about"
              className="flex items-center justify-between text-2xl font-display font-medium text-[#181818] hover:text-[#72503C] transition-colors py-1"
            >
              <span>Our Story</span>
              <ArrowRight className="w-4 h-4 text-[#A7A39C]" />
            </Link>
            <Link
              to="/contact"
              className="flex items-center justify-between text-2xl font-display font-medium text-[#181818] hover:text-[#72503C] transition-colors py-1"
            >
              <span>Showrooms & Contact</span>
              <ArrowRight className="w-4 h-4 text-[#A7A39C]" />
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-[#E6E2D8] space-y-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-[#D7C5AF] text-sm font-medium text-[#181818] hover:bg-black/5"
          >
            <Search className="w-4 h-4" />
            <span>Search Catalog</span>
          </button>
          <Button
            variant="primary"
            className="w-full"
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            icon={Calendar}
          >
            Book a Visit
          </Button>
          <p className="text-[11px] text-center text-[#76726B] pt-2">
            Tribeca • Mayfair • Minami-Aoyama
          </p>
        </div>
      </div>
    </div>
  );
}
