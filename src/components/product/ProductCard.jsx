import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { formatPrice } from '../../utils/product';

export default function ProductCard({ product, className = '' }) {
  if (!product) return null;

  return (
    <article className={`group flex flex-col justify-between ${className}`}>
      <Link
        to={`/products/${product.slug}`}
        className="block relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#EDE8E0] border border-[#E6E2D8] transition-all duration-500 group-hover:border-[#D7C5AF] group-hover:shadow-lg"
      >
        <img
          src={product.images.hero}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Floating Quick Action Badge */}
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#181818] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-sm">
          <ArrowUpRight className="w-4 h-4" />
        </div>

        {/* Category Pill */}
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 rounded-full bg-[#181818]/70 backdrop-blur-md text-[10px] font-medium tracking-wider uppercase text-white">
            {product.category}
          </span>
        </div>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display font-medium text-lg text-[#181818] group-hover:text-[#72503C] transition-colors">
            <Link to={`/products/${product.slug}`}>
              {product.name}
            </Link>
          </h3>
          <p className="text-xs text-[#76726B] line-clamp-1 mt-0.5">{product.tagline}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-display font-medium text-sm text-[#181818]">
            {formatPrice(product.price)}
          </p>
          <p className="text-[10px] text-[#A7A39C]">Sample Price</p>
        </div>
      </div>
    </article>
  );
}
