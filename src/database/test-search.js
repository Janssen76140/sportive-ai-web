const ProtocolService = require('./protocolService');

// Test 1: Profile avec sport secondaire
const testProfile1 = {
  "Age Bracket": "6–9",
  "Gender": "Male", 
  "Primary Sport": "Tennis", // Sera converti en Soccer
  "Training Frequency": "1-2",
  "Training Intensity": "Low",
  "Coaching Sessions": "0",
  "Years of Practice": "<1",
  "Secondary Sport": "Basketball",
  "Training Frequency.1": "1-2",
  "Training Intensity.1": "Low", 
  "Coaching Sessions.1": "0",
  "Years of Practice.1": "<1",
  "Allergens": "None",
  "Medical History": "None",
  "Handedness": "Left-handed",
  "Target": "Basic"
};

// Test 2: Profile SANS sport secondaire
const testProfile2 = {
  "Age Bracket": "6–9",
  "Gender": "Male", 
  "Primary Sport": "Swimming", // Sera converti en Soccer
  "Training Frequency": "1-2",
  "Training Intensity": "Low",
  "Coaching Sessions": "0",
  "Years of Practice": "<1",
  "Secondary Sport": "", // Vide
  "Training Frequency.1": "",
  "Training Intensity.1": "", 
  "Coaching Sessions.1": "",
  "Years of Practice.1": "",
  "Allergens": "None",
  "Medical History": "None",
  "Handedness": "Right-handed",
  "Target": "Basic"
};

console.log('🧪 Testing New Protocol Service Algorithm...');

const service = new ProtocolService();

function testProfile(profile, testName) {
  console.log(`\n=== ${testName} ===`);
  console.log('👤 Input Profile:', profile);
  
  const result = service.findMatchingProtocol(profile);
  
  if (result.error) {
    console.log('❌ Result:', result.error);
  } else {
    console.log('🎉 MATCH FOUND!');
    console.log('📦 Stack:', result.recommended_stack);
    console.log('💊 Protocol:', result.protocol);
    console.log('⏰ Timing:', result.timing);
    console.log('🥄 Dosage:', result.dosage);
    console.log('🥗 Nutrition:', result.nutrition_advice);
  }
}

// Test 1: Avec sport secondaire
testProfile(testProfile1, "TEST 1: Avec sport secondaire");

// Test 2: Sans sport secondaire
testProfile(testProfile2, "TEST 2: Sans sport secondaire");

service.close();
console.log('\n✨ Tests complete!');