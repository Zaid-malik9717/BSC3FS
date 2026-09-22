import { db } from '../data/db.js';
import { generateId } from '../utils/orderNumber.js';

export const builderController = {
  // GET /api/builder/options
  getOptions(req, res) {
    try {
      const options = db.getBuilderOptions();
      res.json({ success: true, data: options });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // POST /api/builder/calculate-price
  calculatePrice(req, res) {
    try {
      const { selectedFlowers, sizeId, wrapId, ribbonId } = req.body;
      const options = db.getBuilderOptions();

      // Find size multiplier
      const sizeObj = options.sizes.find(s => s.id === sizeId) || options.sizes[0];
      const multiplier = sizeObj ? sizeObj.multiplier : 1.0;

      // Base flower sum
      let flowerTotal = 0;
      if (Array.isArray(selectedFlowers) && selectedFlowers.length > 0) {
        selectedFlowers.forEach(item => {
          const flower = options.flowerTypes.find(f => f.id === (item.id || item));
          const qty = item.count || 1;
          if (flower) {
            flowerTotal += flower.price * qty;
          }
        });
      } else {
        flowerTotal = 45; // default base arrangement
      }

      // Wraps and Ribbons extra
      const wrapObj = options.wraps.find(w => w.id === wrapId);
      const wrapExtra = wrapObj ? wrapObj.extraPrice : 0;

      const ribbonObj = options.ribbons.find(r => r.id === ribbonId);
      const ribbonExtra = ribbonObj ? ribbonObj.extraPrice : 0;

      const subtotal = Math.round((flowerTotal * multiplier) + wrapExtra + ribbonExtra);

      res.json({
        success: true,
        data: {
          subtotal,
          baseFlowerPrice: flowerTotal,
          sizeMultiplier: multiplier,
          wrapExtra,
          ribbonExtra,
          currency: 'USD'
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // POST /api/builder/save-design
  saveDesign(req, res) {
    try {
      const { name, flowers, color, size, wrap, ribbon, price, notes } = req.body;
      const savedBouquets = db.getSavedBouquets();

      const newDesign = {
        id: generateId('bouquet'),
        name: name || 'Custom Botanical Creation',
        flowers: flowers || [],
        color: color || 'sky-blue',
        size: size || 'signature',
        wrap: wrap || 'linen-sky',
        ribbon: ribbon || 'silk-sky',
        price: Number(price) || 85,
        notes: notes || '',
        createdAt: new Date().toISOString()
      };

      savedBouquets.push(newDesign);
      db.saveSavedBouquets(savedBouquets);

      res.status(201).json({ success: true, data: newDesign });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};
