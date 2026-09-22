import express from 'express';
import { orderController } from '../controllers/orderController.js';

const router = express.Router();

router.get('/', orderController.getAllOrders);
router.get('/:orderNumber', orderController.getOrderByNumber);
router.post('/', orderController.createOrder);
router.patch('/:orderNumber/status', orderController.updateOrderStatus);

export default router;
