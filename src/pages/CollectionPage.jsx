import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { getAllProducts, getProductsByCategory, getSpaceBySlug } from '../utils/product';
import { updateMetaTags } from '../utils/seo';
import { Filter, SlidersHorizontal } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All Pieces', slug: 'all' },
  { id: 'living', name: 'Living Room', slug: 'living' },
  { id: 'dining', name: 'Dining Room', slug: 'dining' },
  { id: 'bedroom', name: 'Bedroom', slug: 'bedroom' },
  { id: 'workspace', name: 'Workspace', slug: 'workspace' },
];

export default function CollectionPage() {
  const { category = 'all' } = useParams();
  const [sortBy, setSortBy] = useState('featured');

  const activeCategory = category.toLowerCase();
  const currentSpace = getSpaceBySlug(activeCategory);

  useEffect(() => {
    const title = currentSpace
      ? `${currentSpace.name} Collection | ATELIER`
      : 'All Furniture Collections | ATELIER';
    const description = currentSpace
      ? currentSpace.description
      : 'Explore the complete ATELIER furniture catalog. Architectural sofas, sculptural dining tables, minimalist beds, and executive desks.';

    updateMetaTags({ title, description });
  }, [activeCategory, currentSpace]);

  const filteredProducts = useMemo(() => {
    let list = getProductsByCategory(activeCategory);

    if (sortBy === 'price-low') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-high') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'name') {
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [activeCategory, sortBy]);

  return (
    <div className="pt-32 pb-32 px-6 sm:px-8 max-w-7xl mx-auto w-full">
      {/* Editorial Header */}
      <div className="max-w-3xl mb-12">
        <span className="font-caption text-[#72503C] tracking-[0.2em] block mb-3">
          CATALOG ARCHIVE
        </span>
        <h1 className="font-display-section text-[#181818] font-medium leading-[1.05]">
          {currentSpace ? currentSpace.name : 'All Furniture Pieces'}
        </h1>
        <p className="text-base text-[#76726B] mt-4 leading-relaxed">
          {currentSpace
            ? currentSpace.description
            : 'A comprehensive archive of architectural furnishings designed to occupy domestic spaces with quiet permanence and sculptural integrity.'}
        </p>
      </div>

      {/* Filter and Sorting Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-10 border-b border-[#E6E2D8]">
        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none w-full sm:w-auto">
          {categories.map((cat) => {
            const isActive = (cat.slug === 'all' && (!category || category === 'all')) || category === cat.slug;
            return (
              <Link
                key={cat.id}
                to={cat.slug === 'all' ? '/collections' : `/collections/${cat.slug}`}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#181818] text-[#F5F2EC] shadow-sm'
                    : 'bg-white text-[#76726B] hover:text-[#181818] border border-[#E6E2D8] hover:border-[#181818]'
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span className="text-xs text-[#76726B] whitespace-nowrap">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Piece' : 'Pieces'}
          </span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-[#E6E2D8] text-xs font-medium text-[#181818] px-4 py-2 pr-8 rounded-full focus:outline-none focus:border-[#181818] cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#76726B] absolute right-3 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#E6E2D8]">
          <p className="font-display font-medium text-lg text-[#181818]">No pieces currently found.</p>
          <p className="text-xs text-[#76726B] mt-1">Please select another space or reset filters.</p>
          <div className="mt-6">
            <Link
              to="/collections"
              className="px-6 py-2.5 rounded-full bg-[#181818] text-white text-xs font-medium uppercase tracking-wider"
            >
              View All Furniture
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
