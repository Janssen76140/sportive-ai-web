const Database = require('better-sqlite3');
const path = require('path');

class ProtocolService {
  constructor(dbPath = null) {
    // Allow custom path or auto-detect
    if (!dbPath) {
      if (process.versions.electron) {
        // In Electron main process, __dirname is the public folder
        dbPath = path.join(__dirname, '../src/database/protocols.db');
      } else {
        // In Node.js context (tests), __dirname is src/database/
        dbPath = path.join(__dirname, 'protocols.db');
      }
    }
    
    console.log('📊 Trying DB path:', dbPath);
    this.db = new Database(dbPath);
    console.log('✅ Database connected successfully');
  }

  /**
   * Find matching protocol based on user profile
   * @param {Object} profile - User profile from onboarding
   * @returns {Object|null} - Matching protocol or null
   */
  findMatchingProtocol(profile) {
    console.log('🔍 Searching for protocol with profile:', profile);

    // Normalize profile to match CSV format
    const normalizedProfile = this.normalizeProfile(profile);
    console.log('🔄 Normalized profile:', normalizedProfile);

    // Do exact match on all 16 columns
    const protocol = this.findExactMatch(normalizedProfile);

    if (!protocol) {
      console.log('❌ No matching protocol found');
      return { error: 'Protocol not found' };
    }

    console.log('✅ Found matching protocol:', protocol.recommended_stack);
    return protocol;
  }

  /**
   * Normalize profile according to business rules
   * @param {Object} profile - Raw user profile
   * @returns {Object} - Normalized profile for CSV matching
   */
  normalizeProfile(profile) {
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
      "Training Frequency.1": hasSecondarySport ? profile["Training Frequency.1"] : "1-2", // Minimum if empty
      "Training Intensity.1": hasSecondarySport ? profile["Training Intensity.1"] : "Low", // Minimum if empty
      "Coaching Sessions.1": hasSecondarySport ? profile["Coaching Sessions.1"] : "0", // Minimum if empty
      "Years of Practice.1": hasSecondarySport ? profile["Years of Practice.1"] : "<1", // Minimum if empty
      "Allergens": profile["Allergens"] || "None",
      "Medical History": profile["Medical History"] || "None",
      "Handedness": profile["Handedness"],
      "Target": profile["Target"]
    };
  }

  /**
   * Find exact match on all 16 columns
   */
  findExactMatch(normalizedProfile) {
    const query = `
      SELECT * FROM protocols 
      WHERE age_bracket = ? 
        AND gender = ? 
        AND primary_sport = ? 
        AND training_frequency = ? 
        AND training_intensity = ? 
        AND coaching_sessions = ? 
        AND years_of_practice = ? 
        AND secondary_sport = ? 
        AND training_frequency_secondary = ? 
        AND training_intensity_secondary = ? 
        AND coaching_sessions_secondary = ? 
        AND years_of_practice_secondary = ? 
        AND allergens = ? 
        AND medical_history = ? 
        AND handedness = ? 
        AND target = ?
      LIMIT 1
    `;

    const params = [
      normalizedProfile["Age Bracket"],
      normalizedProfile["Gender"],
      normalizedProfile["Primary Sport"],
      normalizedProfile["Training Frequency"],
      normalizedProfile["Training Intensity"],
      normalizedProfile["Coaching Sessions"],
      normalizedProfile["Years of Practice"],
      normalizedProfile["Secondary Sport"],
      normalizedProfile["Training Frequency.1"],
      normalizedProfile["Training Intensity.1"],
      normalizedProfile["Coaching Sessions.1"],
      normalizedProfile["Years of Practice.1"],
      normalizedProfile["Allergens"],
      normalizedProfile["Medical History"],
      normalizedProfile["Handedness"],
      normalizedProfile["Target"]
    ];

    console.log('🎯 Exact match on 16 columns:', params);
    
    const stmt = this.db.prepare(query);
    return stmt.get(...params);
  }


  /**
   * Get all available protocols (for debugging)
   */
  getAllProtocols() {
    const stmt = this.db.prepare('SELECT * FROM protocols');
    return stmt.all();
  }

  /**
   * Close database connection
   */
  close() {
    this.db.close();
  }
}

module.exports = ProtocolService;