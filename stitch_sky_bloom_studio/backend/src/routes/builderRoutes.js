import express from 'express';
import { builderController } from '../controllers/builderController.js';

const router = express.Router();

router.get('/options', builderController.getOptions);
router.post('/calculate-price', builderController.calculatePrice);
router.post('/save-design', builderController.saveDesign);

export default router;
