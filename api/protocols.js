// API serverless Vercel pour les protocoles SportiveAI
import protocols from '../src/data/protocolsData.json';

/**
 * Normalize profile according to business rules
 */
function normalizeProfile(profile) {
  // Get secondary sport defaults if not filled
  const hasSecondarySport = profile["Secondary Sport"] && profile["Secondary Sport"].trim();
  
  return {
    "Age Bracket": profile["Age Bracket"],
    "Gender": profile["Gender"],
    "Primary Sport": "Soccer", // Always Soccer regardless of user choice
    "Training Frequency": profile["Training Frequency"],
    "Training Intensity": profile["Training Intensity"],
    "Coaching Sessions": profile["Coaching Sessions"],
    "Years of Practice": profile["Years of Practice"],
    "Secondary Sport": "Basketball", // Always Basketball regardless of user choice
    "Training Frequency.1": hasSecondarySport ? profile["Training Frequency.1"] : "1-2",
    "Training Intensity.1": hasSecondarySport ? profile["Training Intensity.1"] : "Low",
    "Coaching Sessions.1": hasSecondarySport ? profile["Coaching Sessions.1"] : "0",
    "Years of Practice.1": hasSecondarySport ? profile["Years of Practice.1"] : "<1",
    "Allergens": profile["Allergens"] || "None",
    "Medical History": profile["Medical History"] || "None",
    "Handedness": profile["Handedness"],
    "Target": profile["Target"]
  };
}

/**
 * Find exact match on all 16 columns
 */
function findExactMatch(normalizedProfile) {
  return protocols.find(protocol => 
    protocol.age_bracket === normalizedProfile["Age Bracket"] &&
    protocol.gender === normalizedProfile["Gender"] &&
    protocol.primary_sport === normalizedProfile["Primary Sport"] &&
    protocol.training_frequency === normalizedProfile["Training Frequency"] &&
    protocol.training_intensity === normalizedProfile["Training Intensity"] &&
    protocol.coaching_sessions === normalizedProfile["Coaching Sessions"] &&
    protocol.years_of_practice === normalizedProfile["Years of Practice"] &&
    protocol.secondary_sport === normalizedProfile["Secondary Sport"] &&
    protocol.training_frequency_secondary === normalizedProfile["Training Frequency.1"] &&
    protocol.training_intensity_secondary === normalizedProfile["Training Intensity.1"] &&
    protocol.coaching_sessions_secondary === normalizedProfile["Coaching Sessions.1"] &&
    protocol.years_of_practice_secondary === normalizedProfile["Years of Practice.1"] &&
    protocol.allergens === normalizedProfile["Allergens"] &&
    protocol.medical_history === normalizedProfile["Medical History"] &&
    protocol.handedness === normalizedProfile["Handedness"] &&
    protocol.target === normalizedProfile["Target"]
  );
}

export default function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const profile = req.body;
      console.log('🔍 Searching for protocol with profile:', profile);

      // Normalize profile to match CSV format
      const normalizedProfile = normalizeProfile(profile);
      console.log('🔄 Normalized profile:', normalizedProfile);

      // Do exact match on all 16 columns
      const protocol = findExactMatch(normalizedProfile);

      if (!protocol) {
        console.log('❌ No matching protocol found');
        return res.status(404).json({ error: 'Protocol not found' });
      }

      console.log('✅ Found matching protocol:', protocol.recommended_stack);
      return res.status(200).json(protocol);
    } catch (error) {
      console.error('❌ Error finding protocol:', error);
      return res.status(500).json({ error: 'Failed to find protocol: ' + error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 