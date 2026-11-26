import React from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../../data/brand';

export default function Footer({ onOpenBooking }) {
  return (
    <footer className="bg-[#181818] text-[#F5F2EC] pt-20 pb-12 border-t border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[#2A2A2A]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="font-display font-semibold tracking-[0.25em] text-2xl text-white inline-block">
              ATELIER
            </Link>
            <p className="text-sm text-[#A7A39C] max-w-sm leading-relaxed">
              Furniture that feels like art. Architectural pieces crafted in Denmark and Kyoto for spaces that embrace permanence, calm, and sculptural presence.
            </p>
            <div className="pt-2 text-xs text-[#D7C5AF]">
              <span>Copenhagen</span> • <span>Kyoto</span> • <span>New York</span>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-caption text-[#D7C5AF] mb-4">Collections</h4>
            <ul className="space-y-2.5 text-sm text-[#A7A39C]">
              <li>
                <Link to="/collections/living" className="hover:text-white transition-colors">
                  Living Room
                </Link>
              </li>
              <li>
                <Link to="/collections/dining" className="hover:text-white transition-colors">
                  Dining Room
                </Link>
              </li>
              <li>
                <Link to="/collections/bedroom" className="hover:text-white transition-colors">
                  Bedroom
                </Link>
              </li>
              <li>
                <Link to="/collections/workspace" className="hover:text-white transition-colors">
                  Workspace
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-white transition-colors">
                  All Pieces
                </Link>
              </li>
            </ul>
          </div>

          {/* Studios & Showrooms */}
          <div>
            <h4 className="font-caption text-[#D7C5AF] mb-4">Studios</h4>
            <ul className="space-y-2.5 text-sm text-[#A7A39C]">
              <li>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="hover:text-white transition-colors text-left"
                >
                  Tribeca, New York
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="hover:text-white transition-colors text-left"
                >
                  Mayfair, London
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="hover:text-white transition-colors text-left"
                >
                  Aoyama, Tokyo
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="text-[#D7C5AF] hover:underline transition-all text-xs pt-1 block"
                >
                  Request Private Visit →
                </button>
              </li>
            </ul>
          </div>

          {/* About & Legal */}
          <div>
            <h4 className="font-caption text-[#D7C5AF] mb-4">About</h4>
            <ul className="space-y-2.5 text-sm text-[#A7A39C]">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact & Press
                </Link>
              </li>
              <li>
                <span className="text-[#65635F] cursor-not-allowed">Sustainability Report</span>
              </li>
              <li>
                <span className="text-[#65635F] cursor-not-allowed">Trade & Contract</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#76726B]">
          <p>© {new Date().getFullYear()} ATELIER Design Studio Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#A7A39C] transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#A7A39C] transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#A7A39C] transition-colors cursor-pointer">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
