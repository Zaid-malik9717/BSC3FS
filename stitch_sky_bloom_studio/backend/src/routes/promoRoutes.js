import express from 'express';
import { promoController } from '../controllers/promoController.js';

const router = express.Router();

router.get('/', promoController.getAllPromos);
router.post('/validate', promoController.validatePromo);
router.post('/', promoController.createPromo);

export default router;
