import React from 'react';
import { Sparkles, Sun, Droplets } from 'lucide-react';

export default function ProductCare({ careInstructions }) {
  if (!careInstructions) return null;

  return (
    <div className="bg-[#EDE8E0] rounded-2xl p-6 sm:p-8 border border-[#E6E2D8] space-y-6">
      <div>
        <span className="font-caption text-[#72503C]">Longevity & Preservation</span>
        <h3 className="font-display font-medium text-xl text-[#181818] mt-0.5">
          Care & Maintenance
        </h3>
      </div>

      <p className="text-sm text-[#76726B] leading-relaxed">
        {careInstructions}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="flex items-start gap-3">
          <Sun className="w-4 h-4 text-[#72503C] shrink-0 mt-0.5" />
          <p className="text-xs text-[#76726B]">
            <strong className="text-[#181818] block">Light Exposure:</strong>
            Protect organic timbers and natural hides from direct, uninterrupted UV sun.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <Droplets className="w-4 h-4 text-[#72503C] shrink-0 mt-0.5" />
          <p className="text-xs text-[#76726B]">
            <strong className="text-[#181818] block">Immediate Blotting:</strong>
            Never rub accidental liquid spills. Press gently with an absorbent linen towel.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-[#72503C] shrink-0 mt-0.5" />
          <p className="text-xs text-[#76726B]">
            <strong className="text-[#181818] block">Annual Conditioning:</strong>
            Apply natural beeswax balm to leathers and vegetable oils to open-grain oak.
          </p>
        </div>
      </div>
    </div>
  );
}
