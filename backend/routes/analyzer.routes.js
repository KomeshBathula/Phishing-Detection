import express from 'express';
import { 
  analyzeUrl, 
  analyzeEmail, 
  analyzeText 
} from '../controllers/analyzer.controller.js';

const router = express.Router();

// POST /analyze/url
router.post('/url', analyzeUrl);

// POST /analyze/email
router.post('/email', analyzeEmail);

// POST /analyze/text
router.post('/text', analyzeText);

export default router;
