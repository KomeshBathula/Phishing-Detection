/**
 * URL Intelligence Engine
 * Handles domain parsing, pattern detection, homograph/spoofing checks, and entropy calculation.
 */

const TRUSTED_DOMAINS = [
  'google.com', 'paypal.com', 'amazon.com', 'microsoft.com', 'apple.com',
  'github.com', 'facebook.com', 'twitter.com', 'linkedin.com', 'netflix.com'
];

/**
 * Calculates the Shannon Entropy of a string to detect randomness/suspicious domains.
 */
const calculateEntropy = (str) => {
  const len = str.length;
  if (len === 0) return 0;
  const frequencies = {};
  for (const char of str) {
    frequencies[char] = (frequencies[char] || 0) + 1;
  }
  return Object.values(frequencies).reduce((sum, freq) => {
    const p = freq / len;
    return sum - p * Math.log2(p);
  }, 0);
};

/**
 * Detects homograph / fake domain substitution patterns.
 */
const detectHomograph = (hostname) => {
  const substitutions = {
    '0': 'o', '1': 'l', '3': 'e', '4': 'a', '5': 's', '7': 't', '8': 'b', '9': 'g'
  };
  
  let normalized = hostname;
  Object.entries(substitutions).forEach(([num, char]) => {
    normalized = normalized.replace(new RegExp(num, 'g'), char);
  });

  return TRUSTED_DOMAINS.some(trusted => {
    const brandName = trusted.split('.')[0];
    const hostBrand = hostname.split('.')[0];
    
    // Check if the normalized host contains the brand name, but the original host doesn't (or uses substitution)
    return hostname !== trusted && 
           !hostname.includes(trusted) && 
           (normalized.includes(brandName) || hostname.includes(brandName.replace('l', '1')));
  });
};

export const analyzeURLIntelligence = (url) => {
  const flags = [];
  let score = 0;

  try {
    const urlObj = new URL(url.startsWith('http') ? url : `http://${url}`);
    const hostname = urlObj.hostname.toLowerCase();
    const path = urlObj.pathname;

    // 1. IP-based URL
    const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipPattern.test(hostname)) {
      flags.push('IP_BASED_URL');
      score += 40;
    }

    // 2. Excessive Subdomains
    const subdomainCount = hostname.split('.').length - 2;
    if (subdomainCount > 3) {
      flags.push('EXCESSIVE_SUBDOMAINS');
      score += 20;
    }

    // 3. Long URL
    if (url.length > 75) {
      flags.push('LONG_URL');
      score += 15;
    }

    // 4. Special Characters
    if (/[@\-_%]/.test(hostname)) {
      flags.push('SUSPICIOUS_CHARACTERS');
      score += 15;
    }

    // 5. Homograph / Spooofing
    if (detectHomograph(hostname)) {
      flags.push('HOMOGRAPH_SPOOFING');
      score += 50;
    }

    // 6. Entropy Calculation
    const entropy = calculateEntropy(hostname);
    if (entropy > 4.2) { // High entropy threshold
      flags.push('HIGH_ENTROPY_DOMAIN');
      score += 30;
    }

    return {
      isSuspicious: score > 20,
      score: Math.min(score, 100),
      flags,
      details: {
        hostname,
        entropy: parseFloat(entropy.toFixed(2)),
        subdomainCount
      }
    };
  } catch (error) {
    return { isSuspicious: true, score: 50, flags: ['INVALID_URL_STRUCTURE'] };
  }
};
