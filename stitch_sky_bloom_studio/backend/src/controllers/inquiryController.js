import { db } from '../data/db.js';
import { generateId } from '../utils/orderNumber.js';

export const inquiryController = {
  // POST /api/inquiries (Custom arrangement inquiries & Contact)
  createInquiry(req, res) {
    try {
      const { name, email, phone, eventType, date, budget, message, guestCount } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
      }

      const inquiries = db.getInquiries();
      const newInquiry = {
        id: generateId('inq'),
        name,
        email,
        phone: phone || '',
        eventType: eventType || 'Custom Atelier Request',
        date: date || '',
        budget: budget || '',
        guestCount: guestCount || null,
        message,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      inquiries.push(newInquiry);
      db.saveInquiries(inquiries);

      res.status(201).json({
        success: true,
        message: 'Your inquiry has been received. Our master florist will contact you within 24 hours.',
        data: newInquiry
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // POST /api/newsletter/subscribe
  subscribeNewsletter(req, res) {
    try {
      const { email } = req.body;

      if (!email || !email.includes('@')) {
        return res.status(400).json({ success: false, error: 'Valid email address is required.' });
      }

      const subscribers = db.getSubscribers();
      const normalizedEmail = email.trim().toLowerCase();

      if (subscribers.some(s => s.email === normalizedEmail)) {
        return res.json({
          success: true,
          message: 'You are already subscribed to the Flora Sky Bloom Studio journal!',
          promoCode: 'FLORA10'
        });
      }

      const subscriber = {
        id: generateId('sub'),
        email: normalizedEmail,
        subscribedAt: new Date().toISOString(),
        welcomePromoGiven: 'FLORA10'
      };

      subscribers.push(subscriber);
      db.saveSubscribers(subscribers);

      res.status(201).json({
        success: true,
        message: 'Thank you for subscribing. Use code FLORA10 for 10% off your first order.',
        promoCode: 'FLORA10'
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};
