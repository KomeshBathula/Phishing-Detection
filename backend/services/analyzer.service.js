import { analyzeURLIntelligence } from './urlIntelligence.service.js';
import { analyzeDomainIntelligence } from './domainIntel.service.js';
import { calculateUnifiedScore } from './scoring.service.js';
import { generateExplanations, buildBreakdown } from './explainability.service.js';

// Cache for repeated domain checks to keep response < 300ms
const domainCache = new Map();

const PHISHING_PHRASES = [
  'account suspended', 'click below', 'limited time', 'act now',
  'verify immediately', 'secure your account', 'unusual activity',
  'urgent action required', 'confirm your identity'
];

const URGENCY_KEYWORDS = [
  { word: 'immediately', score: 30 },
  { word: 'urgent', score: 25 },
  { word: 'within', score: 10 },
  { word: 'suspended', score: 20 },
  { word: 'warning', score: 15 }
];

/**
 * Advanced Content Analysis logic
 */
const analyzeContentContext = (text) => {
  const lowerText = text.toLowerCase();
  let urgencyScore = 0;
  let patternScore = 0;
  const detectedPhrases = [];

  // 1. Phrase Detection
  PHISHING_PHRASES.forEach(phrase => {
    if (lowerText.includes(phrase)) {
      patternScore += 30;
      detectedPhrases.push(phrase);
    }
  });

  // 2. Context-Based Keyword Scoring
  URGENCY_KEYWORDS.forEach(({ word, score }) => {
    if (lowerText.includes(word)) {
      urgencyScore += score;
    }
  });

  // 3. Complexity Heuristic
  const words = text.split(/\s+/).length;
  const complexity = words < 5 || words > 200 ? 'Low' : 'Normal';

  return {
    urgencyScore: Math.min(urgencyScore, 100),
    patternScore: Math.min(patternScore, 100),
    detectedPhrases,
    complexity
  };
};

/**
 * Orchestrates multiple intelligence layers to perform a deep scan.
 */
const deepAnalyze = async (input, type) => {
  const startTime = Date.now();
  
  // URL context
  const urlToAnalyze = type === 'url' ? input : '';
  const urlIntelligence = analyzeURLIntelligence(urlToAnalyze);
  
  // Domain Intelligence (check cache first)
  let domainContext;
  const hostname = urlIntelligence.details?.hostname || 'generic';
  
  if (domainCache.has(hostname)) {
    domainContext = domainCache.get(hostname);
  } else {
    domainContext = analyzeDomainIntelligence(urlToAnalyze || input);
    domainCache.set(hostname, domainContext);
  }

  // Content Context
  const contentContext = analyzeContentContext(input);

  // Unified Scoring
  const scoring = calculateUnifiedScore({
    urlContext: urlIntelligence,
    domainContext,
    contentContext,
    isTrusted: domainContext.reputationScore > 90
  });

  // Explainability
  const reasons = generateExplanations({
    urlContext: urlIntelligence,
    domainContext,
    contentContext
  });

  const breakdown = buildBreakdown({
    urlContext: urlIntelligence,
    domainContext,
    contentContext,
    weights: scoring.breakdown
  });

  // Calculate Confidence
  const signalCount = urlIntelligence.flags.length + (contentContext.detectedPhrases.length > 0 ? 1 : 0) + (domainContext.riskFactor > 40 ? 1 : 0);
  const confidence = Math.min(0.95, 0.6 + (signalCount * 0.1));

  console.log(`Scan completed in ${Date.now() - startTime}ms`);

  return {
    riskScore: scoring.score,
    classification: scoring.classification,
    reasons,
    breakdown,
    confidence
  };
};

export const analyzeUrlService = async (url) => deepAnalyze(url, 'url');
export const analyzeEmailService = async (content) => deepAnalyze(content, 'email');
export const analyzeTextService = async (content) => deepAnalyze(content, 'text');
