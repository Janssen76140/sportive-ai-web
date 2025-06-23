// Types pour le Dashboard Academy (institutions sportives)

export interface Academy {
  id: string;
  name: string;
  type: 'school' | 'club' | 'federation' | 'training_center';
  location: string;
  establishedYear: number;
  totalAthletes: number;
  activeProtocols: number;
  monthlyRevenue: number;
  contactEmail: string;
  logo?: string;
  subscription: AcademySubscription;
}

export interface AcademySubscription {
  plan: 'starter' | 'professional' | 'enterprise';
  pricePerAthlete: number;
  features: string[];
  billingCycle: 'monthly' | 'yearly';
  nextBilling: string;
  status: 'active' | 'trial' | 'suspended' | 'cancelled';
}

export interface Athlete {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  ageGroup: '6–9' | '10–13' | '14–18';
  gender: 'Male' | 'Female' | 'Other';
  primarySport: string;
  secondarySport?: string;
  academyId: string;
  coachId?: string;
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'graduated';
  currentProtocol?: {
    id: string;
    name: string;
    startDate: string;
    adherence: number; // 0-100%
    lastDelivery: string;
    nextDelivery: string;
  };
  healthMetrics: {
    lastSync: string;
    devices: string[];
    averages: {
      sleepQuality: number;
      recoveryScore: number;
      activeMinutes: number;
      stepsDaily: number;
    };
  };
  parentContact: {
    email: string;
    phone: string;
    name: string;
  };
}

export interface Coach {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  specialization: string[];
  experienceYears: number;
  athletesCount: number;
  certifications: string[];
  joinDate: string;
}

export interface TeamMetrics {
  totalAthletes: number;
  activeProtocols: number;
  averageAdherence: number;
  monthlyGrowth: number;
  averagePerformanceImprovement: number;
  topPerformingSport: string;
  revenueThisMonth: number;
  costPerAthlete: number;
}

export interface PerformanceAnalytics {
  period: '7d' | '1m' | '3m' | '1y';
  metrics: {
    adherenceRate: {
      current: number;
      trend: 'up' | 'down' | 'stable';
      change: number;
    };
    healthImprovement: {
      sleepQuality: number;
      recoveryScore: number;
      physicalActivity: number;
    };
    protocolEffectiveness: {
      sport: string;
      improvement: number;
      sampleSize: number;
    }[];
    satisfaction: {
      parentsRating: number;
      athletesCompliance: number;
      coachFeedback: number;
    };
  };
  insights: {
    id: string;
    type: 'success' | 'warning' | 'info' | 'recommendation';
    title: string;
    description: string;
    actionable: boolean;
    priority: 'high' | 'medium' | 'low';
  }[];
}

export interface BillingInfo {
  currentPeriod: {
    startDate: string;
    endDate: string;
    totalAthletes: number;
    costPerAthlete: number;
    totalAmount: number;
    status: 'paid' | 'pending' | 'overdue';
  };
  usageStats: {
    protocolsDelivered: number;
    parentEngagement: number;
    supportTickets: number;
    dataExports: number;
  };
  invoiceHistory: {
    id: string;
    date: string;
    amount: number;
    athletes: number;
    status: 'paid' | 'pending' | 'overdue';
    downloadUrl?: string;
  }[];
  nextBilling: {
    date: string;
    estimatedAmount: number;
    estimatedAthletes: number;
  };
}

export interface AthletesFilter {
  search: string;
  sport: string;
  ageGroup: string;
  status: string;
  coach: string;
  adherence: 'all' | 'high' | 'medium' | 'low';
  sortBy: 'name' | 'age' | 'adherence' | 'performance' | 'enrollment';
  sortOrder: 'asc' | 'desc';
}

export interface BulkAction {
  type: 'assign_protocol' | 'change_coach' | 'update_status' | 'export_data' | 'send_message';
  athleteIds: string[];
  parameters?: {
    protocolId?: string;
    coachId?: string;
    status?: string;
    message?: string;
  };
}

export interface AcademyNotification {
  id: string;
  type: 'system' | 'billing' | 'performance' | 'athlete' | 'coach';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  actionUrl?: string;
}

export interface ExportOptions {
  type: 'athletes' | 'performance' | 'billing' | 'analytics';
  format: 'csv' | 'excel' | 'pdf';
  dateRange: {
    start: string;
    end: string;
  };
  filters?: AthletesFilter;
  includeFields: string[];
}