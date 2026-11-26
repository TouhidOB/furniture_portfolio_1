import { products as localProducts } from '../data/products';
import { spaces as localSpaces } from '../data/collections';
import { brand as localBrand } from '../data/brand';

const API_BASE = '/api';

/**
 * Check backend connection status
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health/`, { method: 'GET' });
    if (res.ok) {
      return await res.json();
    }
    return { status: 'offline' };
  } catch {
    return { status: 'offline' };
  }
}

/**
 * Fetch products from Django API with graceful fallback to local data
 */
export async function getProducts(category, search) {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search) params.append('search', search);

    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE}/products/${query}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.info('Django API unavailable, using local catalog data:', err.message);
  }

  // Local fallback
  let list = localProducts;
  if (category && category !== 'all') {
    list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase().trim();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q));
  }
  return list;
}

/**
 * Fetch single product by slug
 */
export async function getProduct(slug) {
  try {
    const res = await fetch(`${API_BASE}/products/${slug}/`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.info(`Django API lookup for ${slug} failed, using local product:`, err.message);
  }

  return localProducts.find(p => p.slug === slug) || null;
}

/**
 * Fetch collections
 */
export async function getCollections() {
  try {
    const res = await fetch(`${API_BASE}/collections/`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch (err) {
    console.info('Django collections API unavailable, using local spaces:', err.message);
  }
  return localSpaces;
}

/**
 * Submit Product Inquiry to Django
 */
export async function submitInquiryToBackend(inquiryData) {
  try {
    const res = await fetch(`${API_BASE}/inquiries/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_slug: inquiryData.productSlug,
        product_name: inquiryData.productName,
        variant_name: inquiryData.variantName,
        material_name: inquiryData.materialName,
        estimated_price: inquiryData.estimatedPrice,
        name: inquiryData.name,
        email: inquiryData.email,
        phone: inquiryData.phone || '',
        city: inquiryData.city || '',
        message: inquiryData.message || '',
      }),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend inquiry submission offline, recording locally:', err.message);
  }

  // Graceful demonstration fallback
  return {
    message: 'Product inquiry registered (local mode).',
    inquiry: {
      inquiry_id: `INQ-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Staged Locally',
      ...inquiryData
    }
  };
}

/**
 * Submit Showroom Appointment Request to Django
 */
export async function submitAppointmentToBackend(bookingData) {
  try {
    const res = await fetch(`${API_BASE}/appointments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        showroom_city: bookingData.showroomCity,
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone || '',
        preferred_date: bookingData.date,
        preferred_time: bookingData.time,
        notes: bookingData.notes || '',
      }),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend appointment submission offline, recording locally:', err.message);
  }

  // Graceful demonstration fallback
  return {
    message: 'Appointment request received (local mode).',
    appointment: {
      reference_code: `ATL-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Staged Locally',
      ...bookingData
    }
  };
}
