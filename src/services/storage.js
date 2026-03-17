/**
 * Storage service for Chrome Extension persistence
 */
export const storage = {
  /**
   * Add a new scan result to history and update stats
   */
  async saveScanResult(result) {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      return new Promise((resolve) => {
        chrome.storage.local.get(['scanHistory', 'securityStats'], (data) => {
          const history = data.scanHistory || [];
          const stats = data.securityStats || {
            totalScans: 0,
            threatsDetected: 0,
            safeContent: 0,
            accuracy: 98.2
          };

          const newEntry = { ...result, id: Date.now() };
          const updatedHistory = [newEntry, ...history].slice(0, 100);

          stats.totalScans += 1;
          if (result.classification === 'High Risk') stats.threatsDetected += 1;
          else if (result.classification === 'Low Risk') stats.safeContent += 1;

          chrome.storage.local.set({
            scanHistory: updatedHistory,
            securityStats: stats
          }, () => resolve(newEntry));
        });
      });
    } else {
      // localStorage fallback for Web
      const history = JSON.parse(localStorage.getItem('scanHistory') || '[]');
      const stats = JSON.parse(localStorage.getItem('securityStats') || JSON.stringify({
        totalScans: 0,
        threatsDetected: 0,
        safeContent: 0,
        accuracy: 98.2
      }));

      const newEntry = { ...result, id: Date.now() };
      const updatedHistory = [newEntry, ...history].slice(0, 100);

      stats.totalScans += 1;
      if (result.classification === 'High Risk') stats.threatsDetected += 1;
      else if (result.classification === 'Low Risk') stats.safeContent += 1;

      localStorage.setItem('scanHistory', JSON.stringify(updatedHistory));
      localStorage.setItem('securityStats', JSON.stringify(stats));
      return newEntry;
    }
  },

  /**
   * Get all scan history
   */
  async getHistory() {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      return new Promise((resolve) => {
        chrome.storage.local.get(['scanHistory'], (data) => {
          resolve(data.scanHistory || []);
        });
      });
    } else {
      return JSON.parse(localStorage.getItem('scanHistory') || '[]');
    }
  },

  /**
   * Get aggregate stats
   */
  async getStats() {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      return new Promise((resolve) => {
        chrome.storage.local.get(['securityStats'], (data) => {
          resolve(data.securityStats || {
            totalScans: 0,
            threatsDetected: 0,
            safeContent: 0,
            accuracy: 98.2
          });
        });
      });
    } else {
      return JSON.parse(localStorage.getItem('securityStats') || JSON.stringify({
        totalScans: 0,
        threatsDetected: 0,
        safeContent: 0,
        accuracy: 98.2
      }));
    }
  },

  /**
   * Clear all history
   */
  async clearHistory() {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      return new Promise((resolve) => {
        chrome.storage.local.set({ scanHistory: [], bypassedUrls: [] }, () => {
          resolve();
        });
      });
    } else {
      localStorage.setItem('scanHistory', '[]');
      localStorage.setItem('bypassedUrls', '[]');
    }
  }
};

export default storage;
