import { Scan } from '../models/index.js';

/**
 * Save a new scan result to history.
 * @param {Object} data - Scan data (type, input, riskScore, classification, reasons)
 * @returns {Promise<Object>} The saved scan document.
 */
export const addHistoryService = async (data) => {
  try {
    const newScan = new Scan(data);
    return await newScan.save();
  } catch (error) {
    console.error('Error saving scan:', error);
    throw error;
  }
};

/**
 * Fetch scan history with filters, pagination, and sorting.
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Paginated results: { data, total, page, totalPages }
 */
export const getHistoryService = async ({
  filters = {},
  page = 1,
  limit = 10,
  sort = { createdAt: -1 }
} = {}) => {
  try {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      Scan.find(filters)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Scan.countDocuments(filters)
    ]);

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error;
  }
};
