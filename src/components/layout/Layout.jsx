import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SearchModal from '../ui/SearchModal';
import ShowroomModal from '../ui/ShowroomModal';
import MobileDrawer from '../ui/MobileDrawer';
import ScrollToTop from './ScrollToTop';

export default function Layout({ children }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EC] text-[#181818]">
      <ScrollToTop />
      
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      <main className="flex-1">
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              onOpenBooking: () => setIsBookingOpen(true),
              onOpenSearch: () => setIsSearchOpen(true),
            });
          }
          return child;
        })}
      </main>

      <Footer onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Global Modals & Drawers */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <ShowroomModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
      />
    </div>
  );
}
