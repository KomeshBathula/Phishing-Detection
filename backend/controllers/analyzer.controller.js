import { 
  analyzeUrlService, 
  analyzeEmailService, 
  analyzeTextService 
} from '../services/analyzer.service.js';

export const analyzeUrl = async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ success: false, message: 'URL is required' });
    }
    const result = await analyzeUrlService(url);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const analyzeEmail = async (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ success: false, message: 'Email content is required' });
    }
    const result = await analyzeEmailService(content);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const analyzeText = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, message: 'Text content is required' });
    }
    const result = await analyzeTextService(text);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
