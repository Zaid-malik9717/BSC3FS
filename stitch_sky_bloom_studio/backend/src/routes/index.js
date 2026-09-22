import express from 'express';
import productRoutes from './productRoutes.js';
import builderRoutes from './builderRoutes.js';
import noteRoutes from './noteRoutes.js';
import promoRoutes from './promoRoutes.js';
import orderRoutes from './orderRoutes.js';
import inquiryRoutes from './inquiryRoutes.js';
import healthRoutes from './healthRoutes.js';

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/products', productRoutes);
router.use('/builder', builderRoutes);
router.use('/notes', noteRoutes);
router.use('/promos', promoRoutes);
router.use('/orders', orderRoutes);
router.use('/inquiries', inquiryRoutes);

// Root info
router.get('/', (req, res) => {
  res.json({
    name: 'Flora Sky Bloom Studio API',
    version: '1.0.0',
    documentation: {
      health: 'GET /api/health',
      products: 'GET /api/products, GET /api/products/:id, POST /api/products, PUT /api/products/:id, DELETE /api/products/:id, POST /api/products/:id/reviews',
      builder: 'GET /api/builder/options, POST /api/builder/calculate-price, POST /api/builder/save-design',
      notes: 'GET /api/notes/templates, POST /api/notes/preview',
      promos: 'GET /api/promos, POST /api/promos/validate, POST /api/promos',
      orders: 'GET /api/orders, GET /api/orders/:orderNumber, POST /api/orders, PATCH /api/orders/:orderNumber/status',
      inquiries: 'POST /api/inquiries, POST /api/inquiries/newsletter'
    }
  });
});

export default router;
