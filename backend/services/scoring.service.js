/**
 * Unified Risk Scoring Engine
 * Combines signals from URL, Domain, and Content analysis using weight-based logic.
 */

const WEIGHTS = {
  KEYWORDS: 20,
  URL_INTEL: 25,
  DOMAIN_INTEL: 20,
  CONTENT_PATTERNS: 20,
  HEURISTICS: 15
};

export const calculateUnifiedScore = (signals) => {
  let finalScore = 0;

  // 1. URL Intel impact (0-25)
  const urlImpact = (signals.urlContext.score / 100) * WEIGHTS.URL_INTEL;
  
  // 2. Domain Intel impact (0-20)
  const domainImpact = (signals.domainContext.riskFactor / 100) * WEIGHTS.DOMAIN_INTEL;

  // 3. Content impact (0-40 combined)
  const urgencyWeight = (signals.contentContext.urgencyScore / 100) * WEIGHTS.KEYWORDS;
  const patternWeight = (signals.contentContext.patternScore / 100) * WEIGHTS.CONTENT_PATTERNS;

  // 4. Heuristics / Confidence base (0-15)
  const heuristicImpact = signals.isTrusted ? 0 : WEIGHTS.HEURISTICS;

  finalScore = urlImpact + domainImpact + urgencyWeight + patternWeight + heuristicImpact;

  // Normalize to 0-100 and clamp
  finalScore = Math.max(0, Math.min(100, Math.round(finalScore)));

  return {
    score: finalScore,
    breakdown: {
      urlWeight: Math.round(urlImpact),
      domainWeight: Math.round(domainImpact),
      contentWeight: Math.round(urgencyWeight + patternWeight),
      heuristicWeight: Math.round(heuristicImpact)
    },
    classification: finalScore >= 70 ? 'High' : finalScore >= 30 ? 'Medium' : 'Low'
  };
};
