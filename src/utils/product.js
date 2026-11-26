import { products } from '../data/products';
import { spaces } from '../data/collections';

export function getAllProducts() {
  return products;
}

export function getProductBySlug(slug) {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category) {
  if (!category || category === 'all') return products;
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

export function getRelatedProducts(productSlug) {
  const current = getProductBySlug(productSlug);
  if (!current) return [];
  if (current.relatedProducts && current.relatedProducts.length > 0) {
    return current.relatedProducts
      .map(slug => getProductBySlug(slug))
      .filter(Boolean);
  }
  return products.filter(p => p.slug !== productSlug && p.category === current.category).slice(0, 3);
}

export function formatPrice(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function searchCatalog(query) {
  if (!query || query.trim() === '') return [];
  const q = query.toLowerCase().trim();
  return products.filter(p => {
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.collection.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q)
    );
  });
}

export function getSpaceBySlug(slug) {
  return spaces.find(s => s.slug === slug);
}
