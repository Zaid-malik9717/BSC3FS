import { db } from '../data/db.js';

export const promoController = {
  // GET /api/promos
  getAllPromos(req, res) {
    try {
      const promos = db.getPromos().filter(p => p.isActive);
      res.json({ success: true, data: promos });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // POST /api/promos/validate
  validatePromo(req, res) {
    try {
      const { code, subtotal = 0 } = req.body;

      if (!code || typeof code !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Please provide a promo code.'
        });
      }

      const cleanCode = code.trim().toUpperCase();
      const promos = db.getPromos();
      const promo = promos.find(p => p.code.toUpperCase() === cleanCode && p.isActive);

      if (!promo) {
        return res.status(404).json({
          success: false,
          error: `Invalid promo code "${code}"`
        });
      }

      const parsedSubtotal = Number(subtotal) || 0;
      if (promo.minSpend && parsedSubtotal < promo.minSpend) {
        return res.status(400).json({
          success: false,
          error: `Code ${cleanCode} requires a minimum order of $${promo.minSpend}.`
        });
      }

      const discountAmount = Number((parsedSubtotal * promo.discountPercent).toFixed(2));
      const newSubtotal = Math.max(0, parsedSubtotal - discountAmount);

      res.json({
        success: true,
        message: `${promo.discountPercent * 100}% discount applied!`,
        data: {
          code: promo.code,
          discountPercent: promo.discountPercent,
          discountAmount,
          newSubtotal,
          description: promo.description
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // POST /api/promos (Admin)
  createPromo(req, res) {
    try {
      const { code, discountPercent, minSpend, description } = req.body;

      if (!code || discountPercent === undefined) {
        return res.status(400).json({ success: false, error: 'Code and discountPercent are required.' });
      }

      const promos = db.getPromos();
      const cleanCode = code.trim().toUpperCase();

      if (promos.some(p => p.code.toUpperCase() === cleanCode)) {
        return res.status(400).json({ success: false, error: `Promo code ${cleanCode} already exists.` });
      }

      const newPromo = {
        code: cleanCode,
        discountPercent: Number(discountPercent),
        minSpend: Number(minSpend) || 0,
        description: description || `${discountPercent * 100}% discount`,
        isActive: true
      };

      promos.push(newPromo);
      db.savePromos(promos);

      res.status(201).json({ success: true, data: newPromo });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};
