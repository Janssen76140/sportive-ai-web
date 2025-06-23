import React from 'react';
import { useOnboarding } from '../../context/OnboardingContext.tsx';
import { protocolService } from '../../services/protocolService.js';

const Step6Summary: React.FC = () => {
  const { data, prevStep } = useOnboarding();
  
  // Ajout de l'état pour la recommandation issue de la base
  const [dbRecommendation, setDbRecommendation] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadProtocol = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Mapper les données onboarding vers le format CSV exact
        const csvProfile = {
          'Age Bracket': data.ageGroup,
          'Gender': data.gender,
          'Primary Sport': data.primarySport,
          'Training Frequency': data.trainingFrequency,
          'Training Intensity': data.trainingIntensity,
          'Coaching Sessions': data.coachingSessions?.toString() || '0',
          'Years of Practice': data.experienceYears,
          'Secondary Sport': data.secondarySport || '',
          'Training Frequency.1': data.secondaryTrainingFrequency || '',
          'Training Intensity.1': data.secondaryTrainingIntensity || '',
          'Coaching Sessions.1': data.secondaryCoachingSessions?.toString() || '',
          'Years of Practice.1': data.secondaryExperienceYears || '',
          'Allergens': data.allergies?.length > 0 ? data.allergies[0] : 'None',
          'Medical History': data.medicalHistory || 'None',
          'Handedness': data.handedness,
          'Target': data.goals?.length > 0 ? data.goals[0] : 'Basic'
        };

        console.log('📊 Profil utilisateur complet:', data);
        console.log('🔄 Mapping CSV utilisé pour la recherche:', csvProfile);

        const result = await protocolService.findMatchingProtocol(csvProfile);
        console.log('📦 Protocole trouvé:', result);

        if (result.error) {
          setError(result.error);
        } else {
          setDbRecommendation(result);
        }
      } catch (err: any) {
        console.error('❌ Erreur lors de la recherche de protocole:', err);
        setError(err.message || 'Erreur lors de la recherche');
      }
      
      setLoading(false);
    };

    loadProtocol();
  }, [data]);

  // Generate access code for child
  const childAccessCode = React.useMemo(() => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }, []);
  
  // Generate single personalized supplement recommendation
  const recommendation = React.useMemo(() => {
    if (dbRecommendation && !dbRecommendation.error) {
      // Utiliser la nouvelle structure SQLite (colonnes directes)
      return {
        name: dbRecommendation.protocol || 'SportiveAI Complete',
        type: dbRecommendation.recommended_stack || 'All-in-One Formula',
        description: dbRecommendation.nutrition_advice || 'Personalized supplement blend.',
        dosage: dbRecommendation.dosage || '1 scoop daily',
        timing: dbRecommendation.timing || 'Daily',
        image: '/assets/complement.png',
        features: [
          'Age-appropriate nutrient profile',
          'Sport-specific formula optimization',
          'Natural ingredients only',
          'Third-party tested for purity'
        ]
      };
    }
    // fallback mock
    const primaryGoal = data.goals[0] || 'general_health';
    const goalDescriptions = {
      'strength': 'muscle strength and power development',
      'endurance': 'endurance performance and stamina',
      'recovery': 'faster recovery and muscle repair',
      'energy': 'sustained energy and focus',
      'general_health': 'overall health and athletic performance'
    };
    
    const ageGroupDosage = {
      '6-9': '1/2 scoop (12.5g) daily',
      '10-13': '3/4 scoop (18.75g) daily', 
      '14-18': '1 scoop (25g) daily'
    };
    
    return {
      name: "SportiveAI Complete",
      type: "All-in-One Formula",
      description: `Personalized supplement blend specifically formulated for ${data.firstName}'s ${goalDescriptions[primaryGoal] || goalDescriptions['general_health']} based on their ${data.primarySport} training profile.`,
      dosage: ageGroupDosage[data.ageGroup] || ageGroupDosage['14-18'],
      image: "/assets/complement.png",
      features: [
        "Age-appropriate nutrient profile",
        "Sport-specific formula optimization",
        "Natural ingredients only",
        "Third-party tested for purity"
      ]
    };
  }, [dbRecommendation, data]);

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit all onboarding data to backend
    console.log('Complete onboarding data:', data);
    console.log('Child access code:', childAccessCode);
    // Navigate to dashboard
    window.location.href = '/dashboard';
  };

  const getDietTypeDisplay = () => {
    if (data.dietType === 'other' && data.dietTypeOther) {
      return data.dietTypeOther;
    }
    const dietLabels: { [key: string]: string } = {
      'none': 'No specific diet',
      'vegetarian': 'Vegetarian',
      'vegan': 'Vegan',
      'gluten-free': 'Gluten-Free'
    };
    return dietLabels[data.dietType] || data.dietType;
  };

  const getFatigueDescription = () => {
    if (data.fatigueLevel <= 2) return 'Minimal fatigue';
    if (data.fatigueLevel <= 5) return 'Moderate fatigue';
    if (data.fatigueLevel <= 8) return 'High fatigue';
    return 'Extreme fatigue';
  };

  return (
    <div className="relative">
      {/* Glassmorphism container */}
      <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
        {/* Header with glassmorphism effect */}
        <div className="mb-10 text-center">
          <div className="inline-block backdrop-blur-md bg-primary-500/10 border border-primary-500/20 rounded-2xl px-6 py-3 mb-6">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Step 6 of 6</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Summary & Confirmation
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Please review all the information below to ensure accuracy. This data will be used to create 
            personalized supplement recommendations for your child.
          </p>
        </div>

        <form onSubmit={handleFinish} className="space-y-8">
          {/* Profile Summary */}
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              Profile Summary
            </h3>
            
            {/* Athlete Info */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-primary-800">Athlete</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white/60 rounded-lg p-4">
                    <span className="text-sm text-gray-600 block mb-1">Full Name</span>
                    <p className="font-semibold text-gray-800 text-lg">{data.firstName} {data.lastName}</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-4">
                    <span className="text-sm text-gray-600 block mb-1">Age Group</span>
                    <p className="font-semibold text-gray-800 text-lg">{data.ageGroup} years old</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-4">
                    <span className="text-sm text-gray-600 block mb-1">Gender</span>
                    <p className="font-semibold text-gray-800 text-lg">{data.gender || 'Not specified'}</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-4">
                    <span className="text-sm text-gray-600 block mb-1">Academic Level</span>
                    <p className="font-semibold text-gray-800 text-lg">{data.academicLevel || 'Not specified'}</p>
                  </div>
                </div>
                {data.sportsAcademy && (
                  <div className="mt-4">
                    <div className="bg-white/60 rounded-lg p-4 inline-block">
                      <span className="text-sm text-gray-600 block mb-1">Sports Academy</span>
                      <p className="font-semibold text-gray-800">{data.sportsAcademy}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sports & Training */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-green-800">Sports & Training</h4>
                </div>
                
                {/* Primary Sport */}
                <div className="mb-6">
                  <h5 className="text-sm font-semibold text-green-700 mb-3">Primary Sport</h5>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white/60 rounded-lg p-4">
                      <span className="text-sm text-gray-600 block mb-1">Sport</span>
                      <p className="font-semibold text-gray-800">{data.primarySport}</p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4">
                      <span className="text-sm text-gray-600 block mb-1">Training Frequency</span>
                      <p className="font-semibold text-gray-800">{data.trainingFrequency}x/week</p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4">
                      <span className="text-sm text-gray-600 block mb-1">Training Intensity</span>
                      <p className="font-semibold text-gray-800">{data.trainingIntensity}</p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4">
                      <span className="text-sm text-gray-600 block mb-1">Experience</span>
                      <p className="font-semibold text-gray-800">{data.experienceYears} years</p>
                    </div>
                  </div>
                  {data.coachingSessions && (
                    <div className="mt-3">
                      <div className="bg-white/60 rounded-lg p-4 inline-block">
                        <span className="text-sm text-gray-600 block mb-1">Personal Coaching</span>
                        <p className="font-semibold text-gray-800">{data.coachingSessions} sessions/week</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Secondary Sport */}
                {data.secondarySport && (
                  <div>
                    <h5 className="text-sm font-semibold text-green-700 mb-3">Secondary Sport</h5>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-white/60 rounded-lg p-4">
                        <span className="text-sm text-gray-600 block mb-1">Sport</span>
                        <p className="font-semibold text-gray-800">{data.secondarySport}</p>
                      </div>
                      {data.secondaryTrainingFrequency && (
                        <div className="bg-white/60 rounded-lg p-4">
                          <span className="text-sm text-gray-600 block mb-1">Training Frequency</span>
                          <p className="font-semibold text-gray-800">{data.secondaryTrainingFrequency}x/week</p>
                        </div>
                      )}
                      {data.secondaryTrainingIntensity && (
                        <div className="bg-white/60 rounded-lg p-4">
                          <span className="text-sm text-gray-600 block mb-1">Training Intensity</span>
                          <p className="font-semibold text-gray-800">{data.secondaryTrainingIntensity}</p>
                        </div>
                      )}
                      {data.secondaryExperienceYears && (
                        <div className="bg-white/60 rounded-lg p-4">
                          <span className="text-sm text-gray-600 block mb-1">Experience</span>
                          <p className="font-semibold text-gray-800">{data.secondaryExperienceYears} years</p>
                        </div>
                      )}
                    </div>
                    {data.secondaryCoachingSessions && (
                      <div className="mt-3">
                        <div className="bg-white/60 rounded-lg p-4 inline-block">
                          <span className="text-sm text-gray-600 block mb-1">Personal Coaching</span>
                          <p className="font-semibold text-gray-800">{data.secondaryCoachingSessions} sessions/week</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Physical & Health */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-blue-800">Physical & Health</h4>
                </div>
                
                {/* Physical Measurements */}
                <div className="mb-6">
                  <h5 className="text-sm font-semibold text-blue-700 mb-3">Physical Measurements</h5>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white/60 rounded-lg p-4">
                      <span className="text-sm text-gray-600 block mb-1">Height</span>
                      <p className="font-semibold text-gray-800">{data.height} {data.heightUnit}</p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4">
                      <span className="text-sm text-gray-600 block mb-1">Weight</span>
                      <p className="font-semibold text-gray-800">{data.weight} {data.weightUnit}</p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4">
                      <span className="text-sm text-gray-600 block mb-1">Handedness</span>
                      <p className="font-semibold text-gray-800">{data.handedness || 'Not specified'}</p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4">
                      <span className="text-sm text-gray-600 block mb-1">Fatigue Level</span>
                      <p className="font-semibold text-gray-800">{data.fatigueLevel}/10 • {getFatigueDescription()}</p>
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                <div className="mb-6">
                  <h5 className="text-sm font-semibold text-blue-700 mb-3">Medical Information</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/60 rounded-lg p-4">
                      <span className="text-sm text-gray-600 block mb-1">Medical History</span>
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(data.medicalHistory) && data.medicalHistory.length > 0 ? (
                          data.medicalHistory.map((condition, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                              {condition}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500 text-sm">None reported</span>
                        )}
                      </div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4">
                      <span className="text-sm text-gray-600 block mb-1">Injury History</span>
                      <p className="font-semibold text-gray-800">{data.injuryHistory || 'None reported'}</p>
                    </div>
                  </div>
                </div>

                {/* Diet & Allergies */}
                <div>
                  <h5 className="text-sm font-semibold text-blue-700 mb-3">Diet & Allergies</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/60 rounded-lg p-4">
                      <span className="text-sm text-gray-600 block mb-1">Diet Type</span>
                      <p className="font-semibold text-gray-800">{getDietTypeDisplay()}</p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4">
                      <span className="text-sm text-gray-600 block mb-1">Food Allergies</span>
                      <div className="flex flex-wrap gap-1">
                        {data.allergies.length > 0 ? (
                          data.allergies.map((allergy, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                              {allergy}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500 text-sm">None</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {data.tastePreferences && data.tastePreferences.length > 0 && (
                    <div className="mt-4">
                      <div className="bg-white/60 rounded-lg p-4">
                        <span className="text-sm text-gray-600 block mb-1">Taste Preferences</span>
                        <div className="flex flex-wrap gap-1">
                          {data.tastePreferences.map((preference, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                              {preference}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Goals */}
            <div>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-purple-800">Goals</h4>
                </div>
                <div className="bg-white/60 rounded-lg p-4">
                  <div className="flex flex-wrap gap-2">
                    {data.goals.map((goal, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200">
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personalized Recommendation */}
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              Personalized Recommendation
            </h3>
            {loading ? (
              <div className="text-primary-600">Chargement de la recommandation...</div>
            ) : error ? (
              <div className="text-red-600">{error}</div>
            ) : (
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 rounded-xl p-6">
              <div className="flex items-start space-x-6">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-white rounded-xl p-4 shadow-sm">
                    <img 
                      src={recommendation.image} 
                      alt={recommendation.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                {/* Product Details */}
                <div className="flex-1">
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-primary-800 mb-1">{recommendation.name}</h4>
                    <span className="inline-block bg-primary-200 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                      {recommendation.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">{recommendation.description}</p>
                  
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-800 mb-2">Key Features:</h5>
                    <ul className="space-y-1">
                      {recommendation.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 text-primary-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white/60 rounded-lg p-3 border border-primary-200/50">
                    <span className="text-sm font-semibold text-gray-700">Recommended Dosage:</span>
                    <p className="text-primary-700 font-medium">{recommendation.dosage}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-primary-100/50 rounded-lg border border-primary-200">
                <p className="text-sm text-primary-700">
                  <strong>Personalized for {data.firstName}:</strong> This recommendation is based on their {data.primarySport} training profile, 
                  {data.ageGroup} age group, and specific goals. The formula can be adjusted in your dashboard.
                </p>
              </div>
            </div>
            )}
          </div>


          {/* Child Access Code */}
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              {data.firstName}'s Access Code
            </h3>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
              <div className="text-center">
                <div className="inline-block bg-white border-2 border-green-300 rounded-xl px-8 py-4 mb-4">
                  <div className="text-3xl font-bold text-green-700 tracking-widest">{childAccessCode}</div>
                </div>
                <h4 className="font-bold text-green-800 mb-2">{data.firstName}'s Personal Access Code</h4>
                <p className="text-sm text-green-700 mb-4">
                  Please write down this code! {data.firstName} will need it to access their personal dashboard 
                  and track their supplement recommendations.
                </p>
                <div className="bg-green-100/50 border border-green-200 rounded-lg p-3">
                  <p className="text-xs text-green-600">
                    <strong>Important:</strong> This code is unique and secure. Keep it in a safe place.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Final Confirmation */}
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Everything is Ready!</h4>
              <p className="text-gray-600 mb-6">
                {data.firstName}'s profile is now complete with personalized recommendations 
                and a secure access code.
              </p>
              <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
                <p className="text-sm text-primary-800">
                  <strong>Next step:</strong> Access your personalized dashboard to manage 
                  tracking, orders, and recommendation adjustments.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8">
            <button
              type="button"
              onClick={prevStep}
              className="group relative px-8 py-4 backdrop-blur-sm bg-white/70 border-2 border-gray-300/80 text-gray-700 font-bold rounded-2xl hover:border-gray-400/80 hover:bg-white/80 transition-all duration-300 transform hover:scale-105 shadow-sm"
            >
              <span className="flex items-center">
                <svg className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </span>
            </button>
            
            <button
              type="submit"
              className="group relative px-12 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <span className="flex items-center">
                Create Account & Access Dashboard
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step6Summary;