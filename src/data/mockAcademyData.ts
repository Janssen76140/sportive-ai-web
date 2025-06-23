import {
  Academy,
  Athlete,
  Coach,
  TeamMetrics,
  PerformanceAnalytics,
  BillingInfo,
  AcademyNotification
} from '../types/academy.ts';

// Académie exemple - Elite Sports Academy
export const mockAcademy: Academy = {
  id: 'academy-001',
  name: 'Elite Sports Academy',
  type: 'training_center',
  location: 'Los Angeles, CA',
  establishedYear: 2018,
  totalAthletes: 247,
  activeProtocols: 189,
  monthlyRevenue: 29640, // 247 athletes * $120/month
  contactEmail: 'admin@elitesportsacademy.com',
  logo: '/assets/academy-logo.png',
  subscription: {
    plan: 'professional',
    pricePerAthlete: 120,
    features: [
      'Advanced analytics',
      'Custom protocols',
      'Parent portal access',
      'Coach management',
      'Bulk operations',
      'Priority support'
    ],
    billingCycle: 'monthly',
    nextBilling: '2025-07-15',
    status: 'active'
  }
};

// Coaches de l'académie
export const mockCoaches: Coach[] = [
  {
    id: 'coach-001',
    firstName: 'Michael',
    lastName: 'Rodriguez',
    email: 'mrodriguez@elitesports.com',
    specialization: ['Soccer', 'Basketball', 'Athletic Performance'],
    experienceYears: 12,
    athletesCount: 45,
    certifications: ['NASM-CPT', 'USSF National License', 'Youth Development'],
    joinDate: '2019-03-15'
  },
  {
    id: 'coach-002',
    firstName: 'Sarah',
    lastName: 'Thompson',
    email: 'sthompson@elitesports.com',
    specialization: ['Swimming', 'Track & Field', 'Recovery'],
    experienceYears: 8,
    athletesCount: 38,
    certifications: ['ACSM-CPT', 'USA Swimming Coach', 'Sports Nutrition'],
    joinDate: '2020-01-10'
  },
  {
    id: 'coach-003',
    firstName: 'David',
    lastName: 'Chen',
    email: 'dchen@elitesports.com',
    specialization: ['Tennis', 'Baseball', 'Mental Performance'],
    experienceYears: 15,
    athletesCount: 42,
    certifications: ['USTA Professional', 'Mental Performance Coach', 'Biomechanics'],
    joinDate: '2018-08-20'
  },
  {
    id: 'coach-004',
    firstName: 'Emma',
    lastName: 'Johnson',
    email: 'ejohnson@elitesports.com',
    specialization: ['Gymnastics', 'Dance', 'Flexibility'],
    experienceYears: 10,
    athletesCount: 35,
    certifications: ['USA Gymnastics Professional', 'Pilates Instructor'],
    joinDate: '2021-02-05'
  }
];

// Athlètes de l'académie (échantillon de 20)
export const mockAthletes: Athlete[] = [
  {
    id: 'athlete-001',
    firstName: 'Emma',
    lastName: 'Davis',
    age: 14,
    ageGroup: '14–18',
    gender: 'Female',
    primarySport: 'Soccer',
    secondarySport: 'Track & Field',
    academyId: 'academy-001',
    coachId: 'coach-001',
    enrollmentDate: '2024-09-01',
    status: 'active',
    currentProtocol: {
      id: 'protocol-endurance-001',
      name: 'Elite Endurance Pro',
      startDate: '2024-10-01',
      adherence: 94,
      lastDelivery: '2025-06-01',
      nextDelivery: '2025-07-01'
    },
    healthMetrics: {
      lastSync: '2025-06-16T08:30:00Z',
      devices: ['Apple Watch Series 9'],
      averages: {
        sleepQuality: 87,
        recoveryScore: 82,
        activeMinutes: 75,
        stepsDaily: 11500
      }
    },
    parentContact: {
      email: 'john.davis@email.com',
      phone: '+1-555-0123',
      name: 'John Davis'
    }
  },
  {
    id: 'athlete-002',
    firstName: 'Marcus',
    lastName: 'Johnson',
    age: 16,
    ageGroup: '14–18',
    gender: 'Male',
    primarySport: 'Basketball',
    academyId: 'academy-001',
    coachId: 'coach-001',
    enrollmentDate: '2024-08-15',
    status: 'active',
    currentProtocol: {
      id: 'protocol-performance-001',
      name: 'Performance Stack Pro',
      startDate: '2024-09-01',
      adherence: 88,
      lastDelivery: '2025-05-15',
      nextDelivery: '2025-06-15'
    },
    healthMetrics: {
      lastSync: '2025-06-16T07:45:00Z',
      devices: ['Garmin Forerunner 945', 'Oura Ring Gen3'],
      averages: {
        sleepQuality: 84,
        recoveryScore: 79,
        activeMinutes: 95,
        stepsDaily: 13200
      }
    },
    parentContact: {
      email: 'maria.johnson@email.com',
      phone: '+1-555-0124',
      name: 'Maria Johnson'
    }
  },
  {
    id: 'athlete-003',
    firstName: 'Sofia',
    lastName: 'Martinez',
    age: 12,
    ageGroup: '10–13',
    gender: 'Female',
    primarySport: 'Swimming',
    secondarySport: 'Track & Field',
    academyId: 'academy-001',
    coachId: 'coach-002',
    enrollmentDate: '2024-06-01',
    status: 'active',
    currentProtocol: {
      id: 'protocol-recovery-001',
      name: 'Recovery Boost Stack',
      startDate: '2024-07-01',
      adherence: 96,
      lastDelivery: '2025-06-10',
      nextDelivery: '2025-07-10'
    },
    healthMetrics: {
      lastSync: '2025-06-16T09:15:00Z',
      devices: ['Fitbit Versa 4'],
      averages: {
        sleepQuality: 91,
        recoveryScore: 88,
        activeMinutes: 68,
        stepsDaily: 9800
      }
    },
    parentContact: {
      email: 'carlos.martinez@email.com',
      phone: '+1-555-0125',
      name: 'Carlos Martinez'
    }
  },
  {
    id: 'athlete-004',
    firstName: 'Ryan',
    lastName: 'Taylor',
    age: 15,
    ageGroup: '14–18',
    gender: 'Male',
    primarySport: 'Tennis',
    academyId: 'academy-001',
    coachId: 'coach-003',
    enrollmentDate: '2024-02-01',
    status: 'active',
    currentProtocol: {
      id: 'protocol-focus-001',
      name: 'Mental Focus Pro',
      startDate: '2024-03-01',
      adherence: 91,
      lastDelivery: '2025-05-28',
      nextDelivery: '2025-06-28'
    },
    healthMetrics: {
      lastSync: '2025-06-16T06:20:00Z',
      devices: ['Apple Watch SE'],
      averages: {
        sleepQuality: 85,
        recoveryScore: 83,
        activeMinutes: 72,
        stepsDaily: 10200
      }
    },
    parentContact: {
      email: 'lisa.taylor@email.com',
      phone: '+1-555-0126',
      name: 'Lisa Taylor'
    }
  },
  {
    id: 'athlete-005',
    firstName: 'Zoe',
    lastName: 'Wilson',
    age: 13,
    ageGroup: '10–13',
    gender: 'Female',
    primarySport: 'Gymnastics',
    academyId: 'academy-001',
    coachId: 'coach-004',
    enrollmentDate: '2024-01-15',
    status: 'active',
    currentProtocol: {
      id: 'protocol-flexibility-001',
      name: 'Flexibility & Balance Pro',
      startDate: '2024-02-15',
      adherence: 89,
      lastDelivery: '2025-06-05',
      nextDelivery: '2025-07-05'
    },
    healthMetrics: {
      lastSync: '2025-06-16T10:00:00Z',
      devices: ['Garmin Vivofit Jr 3'],
      averages: {
        sleepQuality: 89,
        recoveryScore: 86,
        activeMinutes: 85,
        stepsDaily: 8900
      }
    },
    parentContact: {
      email: 'tom.wilson@email.com',
      phone: '+1-555-0127',
      name: 'Tom Wilson'
    }
  }
];

// Métriques équipe globales
export const mockTeamMetrics: TeamMetrics = {
  totalAthletes: 247,
  activeProtocols: 189,
  averageAdherence: 91.2,
  monthlyGrowth: 8.5, // %
  averagePerformanceImprovement: 15.3, // %
  topPerformingSport: 'Swimming',
  revenueThisMonth: 29640,
  costPerAthlete: 89.50
};

// Analytics de performance
export const mockPerformanceAnalytics: PerformanceAnalytics = {
  period: '3m',
  metrics: {
    adherenceRate: {
      current: 91.2,
      trend: 'up',
      change: 3.8
    },
    healthImprovement: {
      sleepQuality: 12.5,
      recoveryScore: 18.3,
      physicalActivity: 22.1
    },
    protocolEffectiveness: [
      { sport: 'Swimming', improvement: 24.8, sampleSize: 45 },
      { sport: 'Soccer', improvement: 19.2, sampleSize: 62 },
      { sport: 'Basketball', improvement: 16.7, sampleSize: 38 },
      { sport: 'Tennis', improvement: 21.3, sampleSize: 29 },
      { sport: 'Gymnastics', improvement: 18.9, sampleSize: 25 }
    ],
    satisfaction: {
      parentsRating: 4.7,
      athletesCompliance: 91.2,
      coachFeedback: 4.5
    }
  },
  insights: [
    {
      id: 'insight-001',
      type: 'success',
      title: 'Outstanding adherence rate',
      description: 'Your academy achieved 91.2% adherence rate, 15% above industry average.',
      actionable: false,
      priority: 'medium'
    },
    {
      id: 'insight-002',
      type: 'recommendation',
      title: 'Expand swimming program',
      description: 'Swimming athletes show highest performance improvement (24.8%). Consider expanding this program.',
      actionable: true,
      priority: 'high'
    },
    {
      id: 'insight-003',
      type: 'warning',
      title: 'Basketball adherence declining',
      description: 'Basketball athletes show 5% lower adherence this month. Coach intervention recommended.',
      actionable: true,
      priority: 'medium'
    }
  ]
};

// Informations de facturation
export const mockBillingInfo: BillingInfo = {
  currentPeriod: {
    startDate: '2025-06-01',
    endDate: '2025-06-30',
    totalAthletes: 247,
    costPerAthlete: 120,
    totalAmount: 29640,
    status: 'paid'
  },
  usageStats: {
    protocolsDelivered: 189,
    parentEngagement: 94.2, // %
    supportTickets: 3,
    dataExports: 12
  },
  invoiceHistory: [
    {
      id: 'inv-2025-06',
      date: '2025-06-01',
      amount: 29640,
      athletes: 247,
      status: 'paid'
    },
    {
      id: 'inv-2025-05',
      date: '2025-05-01',
      amount: 28440,
      athletes: 237,
      status: 'paid'
    },
    {
      id: 'inv-2025-04',
      date: '2025-04-01',
      amount: 27360,
      athletes: 228,
      status: 'paid'
    }
  ],
  nextBilling: {
    date: '2025-07-01',
    estimatedAmount: 30240,
    estimatedAthletes: 252
  }
};

// Notifications de l'académie
export const mockAcademyNotifications: AcademyNotification[] = [
  {
    id: 'notif-001',
    type: 'performance',
    title: 'Monthly performance report available',
    message: 'Your June 2025 performance analytics report is ready for download.',
    timestamp: '2025-06-16T09:00:00Z',
    read: false,
    priority: 'medium',
    actionUrl: '/academy/analytics'
  },
  {
    id: 'notif-002',
    type: 'athlete',
    title: 'New athlete enrollment',
    message: 'Alex Thompson has been enrolled in the Soccer program.',
    timestamp: '2025-06-15T14:30:00Z',
    read: false,
    priority: 'low'
  },
  {
    id: 'notif-003',
    type: 'billing',
    title: 'Invoice payment received',
    message: 'Payment of $29,640 for June 2025 has been successfully processed.',
    timestamp: '2025-06-01T10:15:00Z',
    read: true,
    priority: 'low'
  },
  {
    id: 'notif-004',
    type: 'system',
    title: 'Platform update scheduled',
    message: 'SportiveAI platform will be updated on June 20th from 2-4 AM PST.',
    timestamp: '2025-06-14T08:00:00Z',
    read: true,
    priority: 'medium'
  }
];

// Données pour les graphiques (exemple simple)
export const mockAcademyChartData = {
  athleteGrowth: {
    period: '6m',
    data: [
      { month: 'Jan', athletes: 198 },
      { month: 'Feb', athletes: 215 },
      { month: 'Mar', athletes: 228 },
      { month: 'Apr', athletes: 237 },
      { month: 'May', athletes: 247 },
      { month: 'Jun', athletes: 252 }
    ]
  },
  adherenceByMonth: {
    period: '6m',
    data: [
      { month: 'Jan', adherence: 87.5 },
      { month: 'Feb', adherence: 89.1 },
      { month: 'Mar', adherence: 88.9 },
      { month: 'Apr', adherence: 90.2 },
      { month: 'May', adherence: 91.8 },
      { month: 'Jun', adherence: 91.2 }
    ]
  },
  revenueTrend: {
    period: '6m',
    data: [
      { month: 'Jan', revenue: 23760 },
      { month: 'Feb', revenue: 25800 },
      { month: 'Mar', revenue: 27360 },
      { month: 'Apr', revenue: 28440 },
      { month: 'May', revenue: 29640 },
      { month: 'Jun', revenue: 30240 }
    ]
  }
};