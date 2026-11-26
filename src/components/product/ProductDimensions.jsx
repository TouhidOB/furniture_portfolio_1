import React from 'react';
import { Maximize2 } from 'lucide-react';

export default function ProductDimensions({ dimensions }) {
  if (!dimensions) return null;

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E6E2D8] shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#E6E2D8]">
        <div>
          <span className="font-caption text-[#72503C]">Spatial Footprint</span>
          <h3 className="font-display font-medium text-xl text-[#181818] mt-0.5">
            Dimensions & Weight
          </h3>
        </div>
        <Maximize2 className="w-5 h-5 text-[#76726B]" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {dimensions.width && (
          <div className="p-4 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8]">
            <p className="text-xs uppercase tracking-wider text-[#76726B]">Width</p>
            <p className="font-display font-medium text-base text-[#181818] mt-1">{dimensions.width}</p>
          </div>
        )}
        {dimensions.depth && (
          <div className="p-4 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8]">
            <p className="text-xs uppercase tracking-wider text-[#76726B]">Depth</p>
            <p className="font-display font-medium text-base text-[#181818] mt-1">{dimensions.depth}</p>
          </div>
        )}
        {dimensions.height && (
          <div className="p-4 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8]">
            <p className="text-xs uppercase tracking-wider text-[#76726B]">Height</p>
            <p className="font-display font-medium text-base text-[#181818] mt-1">{dimensions.height}</p>
          </div>
        )}
        {dimensions.seatHeight && (
          <div className="p-4 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8]">
            <p className="text-xs uppercase tracking-wider text-[#76726B]">Seat Height</p>
            <p className="font-display font-medium text-base text-[#181818] mt-1">{dimensions.seatHeight}</p>
          </div>
        )}
        {dimensions.platformHeight && (
          <div className="p-4 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8]">
            <p className="text-xs uppercase tracking-wider text-[#76726B]">Platform Height</p>
            <p className="font-display font-medium text-base text-[#181818] mt-1">{dimensions.platformHeight}</p>
          </div>
        )}
        {dimensions.clearance && (
          <div className="p-4 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8]">
            <p className="text-xs uppercase tracking-wider text-[#76726B]">Under-Clearance</p>
            <p className="font-display font-medium text-base text-[#181818] mt-1">{dimensions.clearance}</p>
          </div>
        )}
        {dimensions.weight && (
          <div className="p-4 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8]">
            <p className="text-xs uppercase tracking-wider text-[#76726B]">Weight</p>
            <p className="font-display font-medium text-base text-[#181818] mt-1">{dimensions.weight}</p>
          </div>
        )}
      </div>

      <p className="text-xs text-[#76726B]">
        All dimensions are verified to ±5mm tolerance. CAD and 3D architectural models available for licensed interior designers upon request.
      </p>
    </div>
  );
}
