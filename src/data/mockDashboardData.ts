import { 
  ChildProfile, 
  ProtocolRecommendation, 
  OrderStatus, 
  IoTDevice, 
  HealthMetrics, 
  PerformanceInsight, 
  MetricCard,
  EcommerceProduct,
  ChartData
} from '../types/dashboard';

// Données enfant (exemple basé sur onboarding)
export const mockChildProfile: ChildProfile = {
  id: 'child-001',
  firstName: 'Alex',
  lastName: 'Martin',
  age: 12,
  ageGroup: '10–13',
  gender: 'Male',
  primarySport: 'Soccer',
  secondarySport: 'Basketball',
  avatar: '/assets/avatar-boy.png',
  childAccessCode: 'AX7K9P'
};

// Current recommended protocol
export const mockProtocolRecommendation: ProtocolRecommendation = {
  id: 'protocol-001',
  name: 'SportiveAI Endurance Pro',
  type: 'Endurance Stack',
  description: 'Personalized formula optimized for endurance sports and recovery. Contains electrolytes, B vitamins, magnesium and natural adaptogens.',
  dosage: '3/4 scoop (18.75g) daily',
  timing: 'Morning with breakfast',
  price: 89.99,
  priceMonthly: 89.99,
  benefits: [
    'Endurance improvement +15%',
    'Accelerated recovery',
    'Reduced muscle fatigue',
    'Optimized hydration',
    'Immune system support'
  ],
  image: '/assets/complement.png',
  stackType: 'Endurance'
};

// Status commande active
export const mockOrderStatus: OrderStatus = {
  id: 'order-001',
  protocolId: 'protocol-001',
  status: 'active',
  nextDelivery: '2025-07-15',
  daysRemaining: 18,
  autoRenewal: true,
  quantity: 1,
  totalPrice: 89.99,
  orderDate: '2025-06-01'
};

// Appareils IoT connectés
export const mockIoTDevices: IoTDevice[] = [
  {
    id: 'device-001',
    name: 'Apple Watch Series 9',
    type: 'smartwatch',
    brand: 'Apple Watch',
    connected: true,
    lastSync: '2025-06-16T08:30:00Z',
    batteryLevel: 73
  },
  {
    id: 'device-002',
    name: 'Oura Ring Gen3',
    type: 'smart_ring',
    brand: 'Oura Ring',
    connected: true,
    lastSync: '2025-06-16T07:45:00Z',
    batteryLevel: 45
  }
];

// Métriques de santé des 7 derniers jours
export const mockHealthMetrics: HealthMetrics[] = [
  {
    date: '2025-06-16',
    sleep: { duration: 8.2, quality: 87, deepSleep: 1.8, remSleep: 1.4, sleepScore: 85 },
    heartRate: { resting: 58, average: 75, maximum: 195, hrv: 45 },
    recovery: { score: 82, stress: 23, readiness: 78, fatigue: 3 },
    activity: { steps: 12450, calories: 2340, activeMinutes: 67, exerciseMinutes: 45, distance: 8.2 }
  },
  {
    date: '2025-06-15',
    sleep: { duration: 7.8, quality: 82, deepSleep: 1.6, remSleep: 1.2, sleepScore: 80 },
    heartRate: { resting: 60, average: 78, maximum: 198, hrv: 42 },
    recovery: { score: 79, stress: 28, readiness: 75, fatigue: 4 },
    activity: { steps: 11200, calories: 2180, activeMinutes: 58, exerciseMinutes: 40, distance: 7.3 }
  },
  {
    date: '2025-06-14',
    sleep: { duration: 8.5, quality: 91, deepSleep: 2.1, remSleep: 1.6, sleepScore: 92 },
    heartRate: { resting: 56, average: 72, maximum: 190, hrv: 48 },
    recovery: { score: 88, stress: 18, readiness: 85, fatigue: 2 },
    activity: { steps: 9800, calories: 1980, activeMinutes: 45, exerciseMinutes: 30, distance: 6.1 }
  },
  {
    date: '2025-06-13',
    sleep: { duration: 7.9, quality: 85, deepSleep: 1.7, remSleep: 1.3, sleepScore: 83 },
    heartRate: { resting: 59, average: 76, maximum: 192, hrv: 44 },
    recovery: { score: 81, stress: 25, readiness: 77, fatigue: 3 },
    activity: { steps: 13100, calories: 2520, activeMinutes: 72, exerciseMinutes: 55, distance: 9.1 }
  },
  {
    date: '2025-06-12',
    sleep: { duration: 8.0, quality: 88, deepSleep: 1.9, remSleep: 1.5, sleepScore: 87 },
    heartRate: { resting: 57, average: 74, maximum: 188, hrv: 46 },
    recovery: { score: 84, stress: 21, readiness: 80, fatigue: 2 },
    activity: { steps: 10950, calories: 2260, activeMinutes: 61, exerciseMinutes: 42, distance: 7.8 }
  },
  {
    date: '2025-06-11',
    sleep: { duration: 7.6, quality: 79, deepSleep: 1.5, remSleep: 1.1, sleepScore: 78 },
    heartRate: { resting: 61, average: 79, maximum: 196, hrv: 41 },
    recovery: { score: 76, stress: 31, readiness: 72, fatigue: 5 },
    activity: { steps: 14200, calories: 2680, activeMinutes: 78, exerciseMinutes: 60, distance: 10.2 }
  },
  {
    date: '2025-06-10',
    sleep: { duration: 8.3, quality: 86, deepSleep: 1.8, remSleep: 1.4, sleepScore: 84 },
    heartRate: { resting: 58, average: 73, maximum: 191, hrv: 45 },
    recovery: { score: 83, stress: 22, readiness: 79, fatigue: 3 },
    activity: { steps: 11800, calories: 2380, activeMinutes: 64, exerciseMinutes: 48, distance: 8.7 }
  }
];

// Performance insights
export const mockPerformanceInsights: PerformanceInsight[] = [
  {
    id: 'insight-001',
    type: 'improvement',
    title: 'Recovery improvement',
    description: 'Your recovery score has improved by 12% since starting the Endurance protocol.',
    metric: 'Recovery Score',
    change: 12,
    period: 'last 30 days',
    actionable: false,
    priority: 'medium'
  },
  {
    id: 'insight-002',
    type: 'milestone',
    title: 'Sleep goal achieved',
    description: 'Alex now maintains 8h+ of sleep 6 nights out of 7.',
    metric: 'Sleep Duration',
    change: 8,
    period: 'last 7 days',
    actionable: false,
    priority: 'low'
  },
  {
    id: 'insight-003',
    type: 'recommendation',
    title: 'Protocol optimization suggested',
    description: 'Data shows excellent response. Consider upgrading to Performance Stack.',
    metric: 'Overall Performance',
    change: 15,
    period: 'since protocol started',
    actionable: true,
    suggestion: 'Upgrade to SportiveAI Performance Pro',
    priority: 'high'
  }
];

// Cards métriques pour overview
export const mockMetricCards: MetricCard[] = [
  {
    id: 'metric-001',
    title: 'Sleep Quality',
    value: 87,
    unit: '%',
    change: 5,
    changeLabel: 'vs last week',
    icon: 'moon',
    color: 'blue',
    trend: 'up',
    clickable: true
  },
  {
    id: 'metric-002',
    title: 'Recovery Score',
    value: 82,
    unit: '/100',
    change: 12,
    changeLabel: 'since protocol',
    icon: 'heart',
    color: 'green',
    trend: 'up',
    clickable: true
  },
  {
    id: 'metric-003',
    title: 'Daily Steps',
    value: 12450,
    change: -3,
    changeLabel: 'vs yesterday',
    icon: 'footsteps',
    color: 'purple',
    trend: 'down',
    clickable: true
  },
  {
    id: 'metric-004',
    title: 'Adherence',
    value: 94,
    unit: '%',
    change: 2,
    changeLabel: 'this month',
    icon: 'check',
    color: 'green',
    trend: 'up'
  }
];

// E-commerce products
export const mockEcommerceProducts: EcommerceProduct[] = [
  {
    id: 'product-upgrade-001',
    name: 'SportiveAI Performance Pro',
    type: 'upgrade',
    description: 'Recommended upgrade based on your excellent results',
    price: 129.99,
    originalPrice: 149.99,
    image: '/assets/supplement-performance.png',
    inStock: true,
    popular: true,
    recommended: true,
    badge: 'Recommended Upgrade',
    benefits: ['Performance +25%', 'Mental focus', 'Advanced recovery']
  },
  {
    id: 'product-accessory-001',
    name: 'SportiveAI Premium Shaker',
    type: 'accessory',
    description: 'Shaker with dosage compartments and premium mixer',
    price: 24.99,
    image: '/assets/shaker-premium.png',
    inStock: true,
    benefits: ['Optimal mixing', 'Dose compartments', 'BPA-free']
  },
  {
    id: 'product-supplement-001',
    name: 'Recovery Booster Add-on',
    type: 'supplement',
    description: 'Recovery supplement for intense training days',
    price: 39.99,
    image: '/assets/recovery-booster.png',
    inStock: true,
    benefits: ['Express recovery', 'Natural anti-inflammatory', 'Muscle repair']
  }
];

// Données graphiques
export const mockSleepChartData: ChartData = {
  period: '7d',
  data: mockHealthMetrics.map(m => ({
    date: m.date,
    value: m.sleep.duration,
    label: `${m.sleep.duration}h`
  })).reverse(),
  metric: 'Sleep Duration',
  unit: 'hours',
  average: 8.0,
  trend: 'stable'
};

export const mockRecoveryChartData: ChartData = {
  period: '7d',
  data: mockHealthMetrics.map(m => ({
    date: m.date,
    value: m.recovery.score,
    label: `${m.recovery.score}/100`
  })).reverse(),
  metric: 'Recovery Score',
  unit: 'score',
  average: 82,
  trend: 'improving'
};

export const mockHeartRateChartData: ChartData = {
  period: '7d',
  data: mockHealthMetrics.map(m => ({
    date: m.date,
    value: m.heartRate.resting,
    label: `${m.heartRate.resting} bpm`
  })).reverse(),
  metric: 'Resting Heart Rate',
  unit: 'bpm',
  average: 58,
  trend: 'stable'
};