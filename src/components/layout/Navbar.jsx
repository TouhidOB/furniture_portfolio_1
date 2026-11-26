import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Calendar, Menu, Settings } from 'lucide-react';
import Button from '../ui/Button';

export default function Navbar({ onOpenSearch, onOpenBooking, onOpenMobileMenu }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isDarkHero = location.pathname.startsWith('/products/arc-lounge-chair') || 
                     location.pathname.startsWith('/products/alto-executive-desk');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = scrolled
    ? 'bg-[#F5F2EC]/90 backdrop-blur-md shadow-sm border-b border-[#E6E2D8]/70 text-[#181818]'
    : isDarkHero
      ? 'bg-transparent text-white'
      : 'bg-transparent text-[#181818]';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ease-in-out ${navClasses}`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        {/* Left: Wordmark */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="font-display font-semibold tracking-[0.22em] text-xl text-inherit transition-opacity hover:opacity-80 focus:outline-none"
            aria-label="ATELIER Home"
          >
            ATELIER
          </Link>
          <Link
            to="/dashboard"
            className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/5 hover:bg-black/10 text-[10px] font-mono tracking-wider uppercase text-inherit transition-colors"
            title="Open ATELIER CMS Studio Dashboard"
          >
            <Settings className="w-3 h-3 text-[#72503C]" />
            <span>CMS Studio</span>
          </Link>
        </div>

        {/* Center: Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium uppercase tracking-[0.12em]" aria-label="Main Navigation">
          <Link
            to="/collections"
            className="text-inherit opacity-75 hover:opacity-100 transition-opacity py-2"
          >
            Collections
          </Link>
          <Link
            to="/collections/living"
            className="text-inherit opacity-75 hover:opacity-100 transition-opacity py-2"
          >
            Living
          </Link>
          <Link
            to="/collections/dining"
            className="text-inherit opacity-75 hover:opacity-100 transition-opacity py-2"
          >
            Dining
          </Link>
          <Link
            to="/collections/bedroom"
            className="text-inherit opacity-75 hover:opacity-100 transition-opacity py-2"
          >
            Bedroom
          </Link>
          <Link
            to="/collections/workspace"
            className="text-inherit opacity-75 hover:opacity-100 transition-opacity py-2"
          >
            Workspace
          </Link>
          <Link
            to="/about"
            className="text-inherit opacity-75 hover:opacity-100 transition-opacity py-2"
          >
            Our Story
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onOpenSearch}
            className="p-2.5 rounded-full hover:bg-black/5 text-inherit transition-colors"
            aria-label="Open search dialog"
          >
            <Search className="w-4 h-4" />
          </button>

          <div className="hidden sm:block">
            <Button
              variant={scrolled ? 'primary' : isDarkHero ? 'ivory' : 'primary'}
              size="sm"
              onClick={onOpenBooking}
              icon={Calendar}
            >
              Book a Visit
            </Button>
          </div>

          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="p-2.5 rounded-full hover:bg-black/5 text-inherit lg:hidden"
            aria-label="Open mobile navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
