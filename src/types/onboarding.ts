export interface OnboardingData {
  // Step 1: Identity & Primary Sport
  firstName: string;
  lastName: string;
  ageGroup: '6–9' | '10–13' | '14–18' | '';
  gender: 'Male' | 'Female' | 'Other' | '';
  primarySport: string;
  secondarySport: string;

  // Step 2: Health & Medical Information
  height: string;
  heightUnit: 'cm' | 'ft';
  weight: string;
  weightUnit: 'kg' | 'lbs';
  allergies: string[];
  medicalHistory: string[];
  handedness: 'Right-handed' | 'Left-handed' | 'Ambidextrous' | '';

  // Step 3: Training & Habits - Primary Sport
  trainingFrequency: '1-2' | '3-4' | '5-7' | '';
  trainingIntensity: 'Low' | 'Moderate' | 'High' | '';
  coachingSessions: '0' | '1-2' | '3' | '';
  experienceYears: '<1' | '1-3' | '4-6' | '7' | '';
  academicLevel: 'primary' | 'middle' | 'high' | 'other' | '';
  sportsAcademy: string;
  
  // Step 3: Training & Habits - Secondary Sport (if exists)
  secondaryTrainingFrequency: '1-2' | '3-4' | '5-7' | '';
  secondaryTrainingIntensity: 'Low' | 'Moderate' | 'High' | '';
  secondaryCoachingSessions: '0' | '1-2' | '3' | '';
  secondaryExperienceYears: '<1' | '1-3' | '4-6' | '7' | '';

  // Step 4: Parent Account & Security
  parentEmail: string;
  password: string;
  confirmPassword: string;

  // Step 5: AI Questionnaire
  fatigueLevel: number;
  goals: string[];
  dietType: 'none' | 'vegetarian' | 'vegan' | 'gluten-free' | 'other' | '';
  dietTypeOther: string;
  injuryHistory: string;
  tastePreferences: string[];

  // Step 6: Summary (computed)
  recommendations?: any[];
  childAccessCode?: string;
}

export const SPORTS_LIST = [
  'Soccer', 'Basketball', 'Tennis', 'Swimming', 'Baseball', 'Volleyball',
  'Track & Field', 'Gymnastics', 'Wrestling', 'Golf', 'Cycling', 'Rugby',
  'Hockey', 'Boxing', 'Martial Arts', 'Other'
];

export const ALLERGIES_LIST = [
  'None', 'Peanuts', 'Lactose', 'Gluten', 'Other'
];

export const TASTE_PREFERENCES = [
  'Berry', 'Vanilla', 'Chocolate', 'Citrus', 'Tropical', 'Mint', 'Neutral'
];

export const GOALS_LIST = [
  'Basic', 'Endurance', 'Performance', 'Recovery'
];