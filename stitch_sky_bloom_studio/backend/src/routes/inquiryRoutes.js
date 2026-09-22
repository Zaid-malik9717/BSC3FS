import express from 'express';
import { inquiryController } from '../controllers/inquiryController.js';

const router = express.Router();

router.post('/', inquiryController.createInquiry);
router.post('/newsletter', inquiryController.subscribeNewsletter);

export default router;
