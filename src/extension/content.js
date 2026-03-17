/**
 * PhishGuard AI Content Script
 */

console.log('PhishGuard AI: Content Script Active');

// Function to scan the current page
function scanPage() {
  const pageData = {
    url: window.location.href,
    title: document.title,
    content: document.body.innerText.substring(0, 1000) // First 1000 chars for context
  };

  chrome.runtime.sendMessage({
    action: 'analyzePage',
    data: pageData
  });
}

// Run initial scan
scanPage();

// Listen for updates from the background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'showWarning') {
    displayWarningUI(message.details);
  }
});

function displayWarningUI(details) {
  // Logic to inject a warning banner if needed
  console.warn('PhishGuard ALERT:', details.reasons[0]);
}
