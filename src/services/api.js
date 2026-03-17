import { mockAnalysisResults, mockHistory } from '../data/mockData';
import { analyzeInput } from '../utils/analyzer';

const API_BASE_URL = 'http://localhost:5000';

/**
 * Common handler for API responses
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = `API request failed: ${response.status} ${response.statusText}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error?.message || errorData.message || errorMessage;
    } catch (e) {
      // If response is not JSON
    }
    throw new Error(errorMessage);
  }
  return response.json();
};

/**
 * Simulates a delay to mimic network latency for local development/fallback
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  /**
   * Analyzes a URL for phishing threats
   */
  analyzeURL: async (url) => {
    try {
      const response = await fetch(`${API_BASE_URL}/analyze/url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      return await handleResponse(response);
    } catch (error) {
      console.warn('API: analyzeURL failed, using local fallback Engine.', error.message);
      await delay(800); 
      return analyzeInput(url, 'url');
    }
  },

  /**
   * Analyzes email content for phishing threats
   */
  analyzeEmail: async (content) => {
    try {
      const response = await fetch(`${API_BASE_URL}/analyze/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      return await handleResponse(response);
    } catch (error) {
      console.warn('API: analyzeEmail failed, using local fallback Engine.', error.message);
      await delay(1000);
      return analyzeInput(content, 'email');
    }
  },

  /**
   * Analyzes text messages for smishing threats
   */
  analyzeText: async (text) => {
    try {
      const response = await fetch(`${API_BASE_URL}/analyze/text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      return await handleResponse(response);
    } catch (error) {
      console.warn('API: analyzeText failed, using local fallback Engine.', error.message);
      await delay(800);
      return analyzeInput(text, 'text');
    }
  },

  /**
   * Retrieves scan history
   */
  getHistory: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/history`);
      const result = await handleResponse(response);
      return result.data || result; // Handle both paginated and flat responses
    } catch (error) {
      console.warn('API: getHistory failed, falling back to mock data.', error.message);
      await delay(500);
      return mockHistory;
    }
  },

  /**
   * Retrieves dashboard statistics
   */
  getStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`); // Use health check or real stats if implemented
      const health = await handleResponse(response);
      
      const { mockStats } = await import('../data/mockData');
      return mockStats; // Keep mock stats for now unless a /stats endpoint is fully built
    } catch (error) {
      console.warn('API: getStats failed, falling back to mock data.', error.message);
      const { mockStats } = await import('../data/mockData');
      return mockStats;
    }
  }
};
