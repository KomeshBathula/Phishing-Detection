/**
 * PhishGuard AI Background Service Worker (V3)
 */

// Handle extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('PhishGuard AI Extension Installed');
});

// Listener for message from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyzePage') {
    // Perform analysis logic (could call backend)
    handlePageAnalysis(request.data, sender.tab.id);
  }
  return true;
});

async function handlePageAnalysis(data, tabId) {
  try {
    const response = await fetch('http://localhost:5000/analyze/url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: data.url })
    });
    
    const result = await response.json();
    
    if (result.riskScore > 70) {
      chrome.action.setBadgeText({ text: '!', tabId });
      chrome.action.setBadgeBackgroundColor({ color: '#ef4444', tabId });
    }
  } catch (error) {
    console.error('Background analysis failed:', error);
  }
}
