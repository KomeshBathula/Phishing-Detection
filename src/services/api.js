import { performAnalysis } from '../utils/analyzer';
import { mockHistory, mockStats, simulationScenarios } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Helper to handle API calls with automatic mock fallback
 */
async function fetchWithFallback(endpoint, options, fallbackFn, mockData) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn(`API call to ${endpoint} failed, falling back to mock data.`, error);
    if (fallbackFn) {
      return await fallbackFn();
    }
    return mockData;
  }
}

export const api = {
  /**
   * Analyze a URL for phishing threats
   */
  async analyzeURL(url) {
    return fetchWithFallback(
      '/analyze/url',
      {
        method: 'POST',
        body: JSON.stringify({ url }),
      },
      () => performAnalysis(url, 'url')
    );
  },

  /**
   * Analyze email content for phishing threats
   */
  async analyzeEmail(content) {
    return fetchWithFallback(
      '/analyze/email',
      {
        method: 'POST',
        body: JSON.stringify({ content }),
      },
      () => performAnalysis(content, 'email')
    );
  },

  /**
   * Analyze text message content for phishing threats
   */
  async analyzeText(content) {
    return fetchWithFallback(
      '/analyze/text',
      {
        method: 'POST',
        body: JSON.stringify({ content }),
      },
      () => performAnalysis(content, 'text')
    );
  },

  /**
   * Fetch scan history
   */
  async getHistory() {
    return fetchWithFallback(
      '/history',
      { method: 'GET' },
      null,
      mockHistory
    );
  },

  /**
   * Fetch aggregate security stats
   */
  async getStats() {
    return fetchWithFallback(
      '/stats',
      { method: 'GET' },
      null,
      mockStats
    );
  },

  /**
   * Fetch simulation scenarios
   */
  async getSimulationScenarios() {
    return fetchWithFallback(
      '/simulations',
      { method: 'GET' },
      null,
      simulationScenarios
    );
  },
};

export default api;
