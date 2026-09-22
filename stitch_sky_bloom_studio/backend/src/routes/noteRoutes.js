import express from 'express';
import { noteController } from '../controllers/noteController.js';

const router = express.Router();

router.get('/templates', noteController.getTemplates);
router.post('/preview', noteController.previewNote);

export default router;
