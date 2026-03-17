/**
 * Explainability Engine
 * Translates complex technical flags into human-readable explanations.
 */

const FLAG_DESCRIPTIONS = {
  'IP_BASED_URL': 'The link uses a raw IP address instead of a standard domain name, a common tactic in untrusted sites.',
  'EXCESSIVE_SUBDOMAINS': 'This URL contains an unusually high number of subdomains, which can be used to hide the true destination.',
  'LONG_URL': 'The web address is exceptionally long, often used in phishing to obscure the malicious part of the link.',
  'SUSPICIOUS_CHARACTERS': 'The URL contains symbols (@, -, %) used to spoof or redirect users to unintended pages.',
  'HOMOGRAPH_SPOOFING': 'The domain name uses visual tricks (like paypa1 instead of paypal) to impersonate a trusted brand.',
  'HIGH_ENTROPY_DOMAIN': 'The domain name appears randomly generated, which is characteristic of temporary malicious servers.',
  'NO_SSL': 'This site does not use an encrypted (HTTPS) connection, exposing your data to interception.',
  'NEW_DOMAIN': 'This domain was registered very recently, which is a common trait of short-lived phishing sites.',
  'LOW_REPUTATION': 'This domain has a poor or unknown security reputation.'
};

export const generateExplanations = (signals) => {
  const reasons = [];
  
  // URL Intelligence Reasons
  if (signals.urlContext) {
    signals.urlContext.flags.forEach(flag => {
      if (FLAG_DESCRIPTIONS[flag]) reasons.push(FLAG_DESCRIPTIONS[flag]);
    });
  }

  // Domain Intelligence Reasons
  if (signals.domainContext) {
    if (!signals.domainContext.hasSSL) reasons.push(FLAG_DESCRIPTIONS['NO_SSL']);
    if (signals.domainContext.domainAge.includes('New')) reasons.push(FLAG_DESCRIPTIONS['NEW_DOMAIN']);
    if (signals.domainContext.reputationScore < 40) reasons.push(FLAG_DESCRIPTIONS['LOW_REPUTATION']);
  }

  // Content Analysis Reasons
  if (signals.contentContext) {
    if (signals.contentContext.urgencyScore > 50) {
      reasons.push('The message uses high-pressure language to force an immediate action.');
    }
    if (signals.contentContext.detectedPhrases?.length > 0) {
      reasons.push(`Detected common phishing phrases: ${signals.contentContext.detectedPhrases.slice(0, 2).join(', ')}`);
    }
  }

  return reasons.length > 0 ? reasons : ['No significant threat indicators were detected by our intelligence layer.'];
};

export const buildBreakdown = (signals) => {
  return {
    urlAnalysis: {
      hostname: signals.urlContext?.details?.hostname || 'Unknown',
      entropy: signals.urlContext?.details?.entropy || 0,
      subdomains: signals.urlContext?.details?.subdomainCount || 0,
      flags: signals.urlContext?.flags || []
    },
    domainAnalysis: {
      age: signals.domainContext?.domainAge || 'Unknown',
      secure: signals.domainContext?.hasSSL || false,
      reputation: signals.domainContext?.reputationScore || 0
    },
    contentAnalysis: {
      wordComplexity: signals.contentContext?.complexity || 'Normal',
      urgencyLevel: signals.contentContext?.urgencyScore > 70 ? 'High' : 'Normal',
      phrasesFound: signals.contentContext?.detectedPhrases?.length || 0
    },
    scoringFactors: signals.weights || {}
  };
};
