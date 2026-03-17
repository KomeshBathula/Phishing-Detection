/**
 * Domain Intelligence Service (Simulated)
 * Handles domain age simulation, SSL verification, and reputation scoring.
 */

const REPUTATION_WHITELIST = [
  'google.com', 'microsoft.com', 'apple.com', 'amazon.com', 'paypal.com'
];

const REPUTATION_BLACKLIST = [
  'bit.ly', 'tinyurl.com', 't.co', // URL shorteners can be neutral but often used in phishing
  'free-login.xyz', 'secure-verify.tk'
];

export const analyzeDomainIntelligence = (url) => {
  let hostname = '';
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `http://${url}`);
    hostname = urlObj.hostname.toLowerCase();
  } catch (e) {
    hostname = url.toLowerCase();
  }

  // 1. SSL Check
  const hasSSL = url.startsWith('https://');

  // 2. Domain Age Simulation
  // Heuristic: If hostname has many digits or is very long/random symbols, assume "New/Risky"
  const isRandom = (hostname.match(/\d/g) || []).length > 3 || hostname.length > 25;
  const domainAge = isRandom ? 'New (< 3 months)' : 'Established (> 1 year)';
  const ageRisk = isRandom ? 40 : 0;

  // 3. Reputation Score
  let reputationScore = 50; // Neutral start
  if (REPUTATION_WHITELIST.some(d => hostname === d || hostname.endsWith(`.${d}`))) {
    reputationScore = 95;
  } else if (REPUTATION_BLACKLIST.some(d => hostname === d || hostname.endsWith(`.${d}`))) {
    reputationScore = 10;
  } else if (isRandom) {
    reputationScore = 30;
  }

  return {
    domainAge,
    hasSSL,
    reputationScore,
    riskFactor: (hasSSL ? 0 : 20) + ageRisk + (100 - reputationScore) / 2
  };
};
