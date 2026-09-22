import { db } from '../data/db.js';
import { generateOrderNumber, generateId } from '../utils/orderNumber.js';

export const orderController = {
  // GET /api/orders
  getAllOrders(req, res) {
    try {
      const { email, phone } = req.query;
      let orders = db.getOrders();

      if (email) {
        orders = orders.filter(o => o.customerEmail?.toLowerCase() === email.toLowerCase());
      }
      if (phone) {
        orders = orders.filter(o => o.deliveryDetails?.phone?.includes(phone));
      }

      // Sort newest first
      orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      res.json({
        success: true,
        count: orders.length,
        data: orders
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // GET /api/orders/:orderNumber
  getOrderByNumber(req, res) {
    try {
      const { orderNumber } = req.params;
      const orders = db.getOrders();
      const order = orders.find(o => o.orderNumber.toUpperCase() === orderNumber.toUpperCase());

      if (!order) {
        return res.status(404).json({
          success: false,
          error: `Order '${orderNumber}' not found`
        });
      }

      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // POST /api/orders
  createOrder(req, res) {
    try {
      const { items, deliveryDetails, giftNote, promoCode, paymentMethod } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ success: false, error: 'Order must contain at least one item.' });
      }

      if (!deliveryDetails || !deliveryDetails.recipientName || !deliveryDetails.streetAddress) {
        return res.status(400).json({ success: false, error: 'Recipient name and street address are required.' });
      }

      // Calculate Subtotal
      const subtotal = items.reduce((sum, item) => {
        const itemPrice = Number(item.price) || 0;
        const itemQty = Number(item.quantity) || 1;
        return sum + (itemPrice * itemQty);
      }, 0);

      // Validate and compute promo discount
      let discountPercent = 0;
      let discountAmount = 0;

      if (promoCode) {
        const cleanPromo = promoCode.trim().toUpperCase();
        const promos = db.getPromos();
        const promo = promos.find(p => p.code.toUpperCase() === cleanPromo && p.isActive);
        if (promo && (!promo.minSpend || subtotal >= promo.minSpend)) {
          discountPercent = promo.discountPercent;
          discountAmount = Number((subtotal * discountPercent).toFixed(2));
        }
      }

      const shippingFee = (subtotal > 100 || subtotal === 0) ? 0 : 15;
      const taxableAmount = Math.max(0, subtotal - discountAmount);
      const estimatedTax = Number((taxableAmount * 0.08).toFixed(2));
      const total = Number((taxableAmount + shippingFee + estimatedTax).toFixed(2));

      const orderNumber = generateOrderNumber();
      const now = new Date();

      // Estimated delivery date (2 business days out)
      const estDelivery = new Date();
      estDelivery.setDate(estDelivery.getDate() + 2);

      const newOrder = {
        id: generateId('ord'),
        orderNumber,
        status: 'confirmed',
        statusHistory: [
          { status: 'confirmed', timestamp: now.toISOString(), note: 'Order placed & payment verified' },
          { status: 'atelier_queue', timestamp: now.toISOString(), note: 'Fresh stems allocated from greenhouse cold storage' }
        ],
        items: items.map(i => ({
          id: i.id,
          name: i.name,
          price: Number(i.price),
          quantity: Number(i.quantity) || 1,
          selectedOption: i.selectedOption || null,
          includeVase: Boolean(i.includeVase),
          isSubscription: Boolean(i.isSubscription),
          image: i.image || null
        })),
        pricing: {
          subtotal: Number(subtotal.toFixed(2)),
          discountPercent,
          discountAmount,
          promoCode: promoCode || null,
          shippingFee,
          estimatedTax,
          total
        },
        deliveryDetails: {
          recipientName: deliveryDetails.recipientName,
          streetAddress: deliveryDetails.streetAddress,
          apt: deliveryDetails.apt || '',
          city: deliveryDetails.city || 'San Francisco',
          state: deliveryDetails.state || 'CA',
          zip: deliveryDetails.zip || '94107',
          phone: deliveryDetails.phone || '',
          deliverySlot: deliveryDetails.deliverySlot || 'morning',
          instructions: deliveryDetails.instructions || '',
          estimatedDeliveryDate: estDelivery.toISOString().split('T')[0]
        },
        giftNote: giftNote ? {
          recipient: giftNote.recipient,
          message: giftNote.message,
          sender: giftNote.sender,
          templateId: giftNote.templateId || 'minimalist',
          waxSealId: giftNote.waxSealId || 'sky-bloom'
        } : null,
        payment: {
          method: paymentMethod || 'card',
          status: 'paid',
          transactionId: `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
        },
        createdAt: now.toISOString()
      };

      const orders = db.getOrders();
      orders.push(newOrder);
      db.saveOrders(orders);

      res.status(201).json({
        success: true,
        message: 'Order placed successfully',
        data: newOrder
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // PATCH /api/orders/:orderNumber/status
  updateOrderStatus(req, res) {
    try {
      const { orderNumber } = req.params;
      const { status, note } = req.body;

      if (!status) {
        return res.status(400).json({ success: false, error: 'Status is required' });
      }

      const orders = db.getOrders();
      const order = orders.find(o => o.orderNumber.toUpperCase() === orderNumber.toUpperCase());

      if (!order) {
        return res.status(404).json({ success: false, error: `Order '${orderNumber}' not found` });
      }

      order.status = status;
      order.statusHistory.push({
        status,
        timestamp: new Date().toISOString(),
        note: note || `Status updated to ${status}`
      });

      db.saveOrders(orders);
      res.json({ success: true, data: order });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};
