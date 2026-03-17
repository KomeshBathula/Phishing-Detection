import express from 'express';
import { 
  getHistory, 
  addHistory 
} from '../controllers/history.controller.js';

const router = express.Router();

// GET /history
router.get('/', getHistory);

// POST /history
router.post('/', addHistory);

export default router;
