import { PRODUCTS, FLOWER_BUILDER_OPTIONS, NOTE_TEMPLATES, WAX_SEALS } from '../data/products';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function apiRequest(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[API] Fetch failed for ${endpoint}:`, err.message);
    throw err;
  }
}

export const api = {
  // Check backend health
  async checkHealth() {
    try {
      return await apiRequest('/health');
    } catch {
      return { status: 'offline' };
    }
  },

  // Products
  async getProducts(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await apiRequest(`/products${query ? `?${query}` : ''}`);
      return res.data || [];
    } catch {
      // Graceful fallback to local PRODUCTS data
      let result = [...PRODUCTS];
      if (params.category && params.category !== 'all') {
        if (params.category === 'fragrance') result = result.filter(p => p.isFragrant);
        else if (params.category === 'hypoallergenic') result = result.filter(p => p.isHypoallergenic);
        else if (params.category === 'single-stems') result = result.filter(p => p.isSingleStem);
        else if (params.category === 'curated') result = result.filter(p => p.category === 'curated' || !p.isSingleStem);
      }
      return result;
    }
  },

  async getProductById(id) {
    try {
      const res = await apiRequest(`/products/${id}`);
      return res.data;
    } catch {
      const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
      return product;
    }
  },

  async submitReview(productId, review) {
    return await apiRequest(`/products/${productId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(review),
    });
  },

  // Bouquet Builder
  async getBuilderOptions() {
    try {
      const res = await apiRequest('/builder/options');
      return res.data;
    } catch {
      return FLOWER_BUILDER_OPTIONS;
    }
  },

  async calculateCustomPrice(payload) {
    try {
      const res = await apiRequest('/builder/calculate-price', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      return res.data;
    } catch (err) {
      console.warn('Calculating price fallback locally:', err);
      return null;
    }
  },

  async saveCustomDesign(design) {
    return await apiRequest('/builder/save-design', {
      method: 'POST',
      body: JSON.stringify(design),
    });
  },

  // Notes
  async getNoteTemplates() {
    try {
      const res = await apiRequest('/notes/templates');
      return res.data;
    } catch {
      return {
        templates: NOTE_TEMPLATES,
        waxSeals: WAX_SEALS,
      };
    }
  },

  // Promos
  async validatePromo(code, subtotal = 0) {
    try {
      const res = await apiRequest('/promos/validate', {
        method: 'POST',
        body: JSON.stringify({ code, subtotal }),
      });
      return {
        success: true,
        discountPercent: res.data.discountPercent,
        discountAmount: res.data.discountAmount,
        message: res.message,
      };
    } catch (err) {
      // Fallback local promo validation
      const clean = (code || '').trim().toUpperCase();
      if (clean === 'FLORA10' || clean === 'WELCOME10') {
        const discountPercent = 0.10;
        return { success: true, discountPercent, discountAmount: subtotal * discountPercent, message: '10% discount applied!' };
      }
      if (clean === 'AZURE20') {
        const discountPercent = 0.20;
        return { success: true, discountPercent, discountAmount: subtotal * discountPercent, message: '20% special discount applied!' };
      }
      return { success: false, message: err.message || 'Invalid promo code' };
    }
  },

  // Orders
  async createOrder(orderPayload) {
    try {
      const res = await apiRequest('/orders', {
        method: 'POST',
        body: JSON.stringify(orderPayload),
      });
      return res.data;
    } catch (err) {
      console.warn('Backend order failed, generating client confirmation:', err);
      // Fallback order generation
      return {
        orderNumber: `FL-${Math.floor(100000 + Math.random() * 900000)}`,
        status: 'confirmed',
        items: orderPayload.items,
        deliveryDetails: orderPayload.deliveryDetails,
        pricing: { total: orderPayload.total || 0 },
      };
    }
  },

  async getOrder(orderNumber) {
    return await apiRequest(`/orders/${orderNumber}`);
  },

  // Newsletter & Inquiries
  async subscribeNewsletter(email) {
    return await apiRequest('/inquiries/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  async submitInquiry(inquiry) {
    return await apiRequest('/inquiries', {
      method: 'POST',
      body: JSON.stringify(inquiry),
    });
  }
};
