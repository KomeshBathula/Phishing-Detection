const SUSPICIOUS_KEYWORDS = ['urgent', 'verify', 'suspended', 'login', 'alert', 'update'];
const SUSPICIOUS_TLDS = ['.tk', '.ml', '.ga', '.cf', '.gq', '.buzz', '.top', '.xyz'];

const TRUSTED_DOMAINS = [
  'google.com',
  'paypal.com',
  'amazon.com',
  'apple.com',
  'microsoft.com',
  'github.com'
];

const FAKE_DOMAIN_PATTERNS = [
  'paypa1',
  'goog1e'
];

/**
 * Analyzes a given URL and optional text content to detect phishing attempts.
 *
 * @param {string} url - The URL to analyze.
 * @param {string} [content=''] - Optional webpage or email content to check for keywords.
 * @returns {Object} The analysis result matching the STRICT output format.
 */
const analyze = (url, content = '') => {
  let riskScore = 0;
  const reasons = [];
  const breakdown = {
    keywords: 0,
    tld: 0,
    fakeDomain: 0
  };

  let hostname = '';
  let fullPath = '';

  try {
    const parsedUrl = new URL(url);
    hostname = parsedUrl.hostname.toLowerCase();
    fullPath = (parsedUrl.pathname + parsedUrl.search).toLowerCase();
  } catch (error) {
    // If it's not a valid URL (e.g., just a domain string), we can try to parse it manually
    // or wrap it with http:// for parsing purposes.
    try {
      const parsedUrl = new URL(url.startsWith('http') ? url : `http://${url}`);
      hostname = parsedUrl.hostname.toLowerCase();
      fullPath = (parsedUrl.pathname + parsedUrl.search).toLowerCase();
    } catch (e) {
      hostname = url.toLowerCase();
    }
  }

  const textContent = content.toLowerCase();

  // 1. Whitelist trusted domains check
  const isTrusted = TRUSTED_DOMAINS.some(
    (trusted) => hostname === trusted || hostname.endsWith(`.${trusted}`)
  );

  if (isTrusted) {
    return {
      riskScore: 0,
      classification: 'SAFE',
      reasons: ['Domain is explicitly whitelisted as trusted.'],
      breakdown,
      confidence: 'HIGH'
    };
  }

  // 2. Suspicious TLD detection (+30)
  for (const tld of SUSPICIOUS_TLDS) {
    if (hostname.endsWith(tld)) {
      riskScore += 30;
      breakdown.tld += 30;
      reasons.push(`Suspicious Top-Level Domain (TLD) detected: ${tld}`);
      break; // count once
    }
  }

  // 3. Detect fake domains (+40)
  for (const fakeDomain of FAKE_DOMAIN_PATTERNS) {
    if (hostname.includes(fakeDomain)) {
      riskScore += 40;
      breakdown.fakeDomain += 40;
      reasons.push(`Fake domain detected: ${fakeDomain}`);
      break; // count once
    }
  }

  // 4. Keyword detection (+10 each)
  let foundKeywordsCount = 0;
  const foundKeywords = [];
  
  // Search in both url path and explicit text content
  const searchableText = `${fullPath} ${textContent}`;

  for (const keyword of SUSPICIOUS_KEYWORDS) {
    if (searchableText.includes(keyword)) {
      foundKeywordsCount++;
      foundKeywords.push(keyword);
    }
  }

  if (foundKeywordsCount > 0) {
    const keywordScore = foundKeywordsCount * 10;
    riskScore += keywordScore;
    breakdown.keywords += keywordScore;
    reasons.push(`Suspicious keywords found: ${foundKeywords.join(', ')}`);
  }

  // Normalize riskScore to max 100
  riskScore = Math.min(riskScore, 100);

  // Classification Logic
  let classification = 'SAFE';
  if (riskScore >= 70) {
    classification = 'PHISHING';
  } else if (riskScore > 0) {
    classification = 'SUSPICIOUS';
  }

  // Confidence Logic
  let confidence = 'LOW';
  if (riskScore >= 80 || riskScore === 0) {
    confidence = 'HIGH';
  } else if (riskScore >= 40) {
    confidence = 'MEDIUM';
  }

  return {
    riskScore,
    classification,
    reasons,
    breakdown,
    confidence
  };
};

module.exports = {
  analyze
};
