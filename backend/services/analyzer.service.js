const SUSPICIOUS_KEYWORDS = ['urgent', 'verify', 'suspended', 'login', 'alert', 'update', 'banking', 'secure', 'account', 'password'];
const SUSPICIOUS_TLDS = ['.tk', '.ml', '.ga', '.cf', '.gq', '.buzz', '.top', '.xyz'];

const TRUSTED_DOMAINS = [
  'google.com',
  'paypal.com',
  'amazon.com',
  'apple.com',
  'microsoft.com',
  'github.com',
  'facebook.com',
  'twitter.com'
];

const FAKE_DOMAIN_PATTERNS = [
  { pattern: 'paypa1', target: 'paypal' },
  { pattern: 'goog1e', target: 'google' },
  { pattern: 'amaz0n', target: 'amazon' },
  { pattern: 'micros0ft', target: 'microsoft' }
];

/**
 * Core analysis engine logic
 */
const performAnalysis = (input, type) => {
  let riskScore = 0;
  const reasons = [];
  const breakdown = {
    keywords: 0,
    tld: 0,
    fakeDomain: 0
  };

  const lowerInput = input.toLowerCase();

  // 1. Domain Checks (for URL)
  if (type === 'url') {
    try {
      const urlObj = new URL(input.startsWith('http') ? input : `http://${input}`);
      const hostname = urlObj.hostname;

      // Whitelist check
      const isTrusted = TRUSTED_DOMAINS.some(domain => 
        hostname === domain || hostname.endsWith(`.${domain}`)
      );

      if (isTrusted) {
        return {
          riskScore: 5,
          classification: 'Low',
          reasons: ['Verified trusted domain'],
          breakdown: { trusted: true },
          confidence: 0.95
        };
      }

      // Suspicious TLD (+30)
      if (SUSPICIOUS_TLDS.some(tld => hostname.endsWith(tld))) {
        riskScore += 30;
        breakdown.tld = 30;
        reasons.push('Uses a suspicious top-level domain frequently associated with phishing.');
      }

      // Fake Domains (+40)
      for (const { pattern } of FAKE_DOMAIN_PATTERNS) {
        if (hostname.includes(pattern)) {
          riskScore += 40;
          breakdown.fakeDomain = 40;
          reasons.push(`Domain name spoofing detected (resembles ${pattern})`);
          break;
        }
      }
    } catch (e) {
      reasons.push('Invalid URL structure detected');
      riskScore += 20;
    }
  }

  // 2. Keyword Detection (+10 each)
  let keywordScore = 0;
  SUSPICIOUS_KEYWORDS.forEach(word => {
    if (lowerInput.includes(word)) {
      keywordScore += 10;
    }
  });
  
  if (keywordScore > 0) {
    riskScore += Math.min(keywordScore, 40); // Cap keyword impact
    breakdown.keywords = Math.min(keywordScore, 40);
    reasons.push('Multiple high-pressure or security-themed keywords found.');
  }

  // Normalize and Classify
  riskScore = Math.min(riskScore, 100);
  const classification = riskScore >= 70 ? 'High' : riskScore >= 30 ? 'Medium' : 'Low';
  const confidence = Math.max(0.6, 1 - (reasons.length * 0.1));

  return {
    riskScore,
    classification,
    reasons: reasons.length > 0 ? reasons : ['No major threat indicators found.'],
    breakdown,
    confidence: parseFloat(confidence.toFixed(2))
  };
};

export const analyzeUrlService = async (url) => performAnalysis(url, 'url');
export const analyzeEmailService = async (content) => performAnalysis(content, 'email');
export const analyzeTextService = async (content) => performAnalysis(content, 'text');
