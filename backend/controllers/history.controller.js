import { 
  getHistoryService, 
  addHistoryService 
} from '../services/history.service.js';

export const getHistory = async (req, res, next) => {
  try {
    const result = await getHistoryService();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const addHistory = async (req, res, next) => {
  try {
    const { item } = req.body;
    if (!item) {
      return res.status(400).json({ success: false, message: 'History item is required' });
    }
    const result = await addHistoryService(item);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
