// React/JavaScript interface for protocol service - Web version for Vercel

class ProtocolService {
  constructor() {
    // URL de base de l'API (sera différente en production)
    this.baseUrl = process.env.NODE_ENV === 'production' 
      ? window.location.origin 
      : 'http://localhost:3000';
  }

  /**
   * Find matching protocol via HTTP API (remplace Electron IPC)
   * @param {Object} profile - User profile from onboarding
   * @returns {Promise<Object>} Protocol result
   */
  async findMatchingProtocol(profile) {
    try {
      console.log('🔍 Requesting protocol via HTTP API...');
      
      // Check if we're in Electron environment first
      if (this.isElectron()) {
        const result = await window.electronAPI.findProtocol(profile);
        console.log('✅ Protocol result (Electron):', result);
        return result;
      }
      
      // Web environment - use HTTP API
      const response = await fetch(`${this.baseUrl}/api/protocols`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile)
      });

      if (!response.ok) {
        if (response.status === 404) {
          console.log('⚠️  Protocol not found, using fallback');
          return this.getMockProtocol(profile);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Protocol result (HTTP):', result);
      return result;

    } catch (error) {
      console.error('❌ Error finding protocol:', error);
      console.log('🔄 Using fallback mock data');
      return this.getMockProtocol(profile);
    }
  }

  /**
   * Test if we're in Electron environment
   * @returns {boolean}
   */
  isElectron() {
    return typeof window !== 'undefined' && window.electronAPI?.findProtocol;
  }

  /**
   * Mock protocol for development in browser
   */
  getMockProtocol(profile) {
    const target = profile["Target"];
    
    const mockProtocols = {
      "Basic": {
        recommended_stack: "Basic Wellness Stack",
        protocol: "Vitamin D3 (400 IU), Multivitamin, Probiotic",
        timing: "Morning with breakfast",
        dosage: "1x/day each",
        nutrition_advice: "Balanced diet with vegetables, fruits, lean proteins; maintain hydration."
      },
      "Recovery": {
        recommended_stack: "Recovery Stack",
        protocol: "Magnesium (200mg), Omega-3 (400mg EPA/DHA), Zinc (10mg), Iron (10mg), Vitamin B6 (2mg)",
        timing: "Magnesium before bed, Omega-3 and Zinc after meals",
        dosage: "1x/day each",
        nutrition_advice: "Include leafy greens, nuts, and fish. Iron-rich meals are essential post-menarche."
      },
      "Endurance": {
        recommended_stack: "Endurance Stack",
        protocol: "Electrolytes (Na, K, Mg), Vitamin C (500mg), B-Complex",
        timing: "Electrolytes before and during training, vitamins in the morning",
        dosage: "Electrolytes during activity, vitamins 1x/day",
        nutrition_advice: "Ensure high-carb intake and consistent hydration for endurance support."
      },
      "Performance": {
        recommended_stack: "Performance Stack",
        protocol: "Creatine (1g), Beta-Alanine (500mg), Multivitamin",
        timing: "Creatine and Beta-Alanine post-training, vitamins in the morning",
        dosage: "1x/day each",
        nutrition_advice: "Balanced meals, consistent sleep, and hydration improve performance."
      }
    };

    return mockProtocols[target] || mockProtocols["Basic"];
  }
}

// Global service instance
export const protocolService = new ProtocolService();

// Note: window.electronAPI is defined by preload.js in Electron environment