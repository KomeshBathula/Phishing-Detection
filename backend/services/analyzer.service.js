// TODO: Implement actual detection logic (Waiting for Sudi)
// For now, this returns a mock shape conforming to the required API RESPONSE FORMAT.

export const analyzeUrlService = async (url) => {
  // Mock logic placeholder
  return {
    riskScore: Math.floor(Math.random() * 100),
    classification: 'Medium',
    reasons: ['Domain age is recent', 'Uses unexpected TLD'],
    breakdown: { urlAge: 0.8, domainTrust: 0.4 },
    confidence: 0.85
  };
};

export const analyzeEmailService = async (content) => {
  return {
    riskScore: Math.floor(Math.random() * 100),
    classification: 'High',
    reasons: ['Urgent language detected', 'Suspicious sender domain'],
    breakdown: { spamWords: 0.9, senderSpoof: 0.7 },
    confidence: 0.92
  };
};

export const analyzeTextService = async (text) => {
  return {
    riskScore: Math.floor(Math.random() * 100),
    classification: 'Low',
    reasons: ['No suspicious patterns found'],
    breakdown: { nlpScore: 0.1 },
    confidence: 0.99
  };
};
