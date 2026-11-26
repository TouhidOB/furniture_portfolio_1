import React from 'react';

export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-[#EDE8E0] text-[#76726B] border border-[#E6E2D8]',
    dark: 'bg-[#2A2A2A] text-[#D7C5AF] border border-[#3A3A3A]',
    bronze: 'bg-[#72503C]/10 text-[#72503C] border border-[#72503C]/20',
    white: 'bg-white text-[#181818] shadow-sm',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
}
