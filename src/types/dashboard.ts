// Types pour le Dashboard Parent

export interface ChildProfile {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  ageGroup: '6–9' | '10–13' | '14–18';
  gender: 'Male' | 'Female' | 'Other';
  primarySport: string;
  secondarySport?: string;
  avatar?: string;
  childAccessCode: string;
}

export interface ProtocolRecommendation {
  id: string;
  name: string;
  type: string;
  description: string;
  dosage: string;
  timing: string;
  price: number;
  priceMonthly: number;
  benefits: string[];
  image: string;
  stackType: 'Basic' | 'Recovery' | 'Endurance' | 'Performance';
}

export interface OrderStatus {
  id: string;
  protocolId: string;
  status: 'active' | 'pending' | 'shipped' | 'delivered' | 'cancelled';
  nextDelivery: string;
  daysRemaining: number;
  autoRenewal: boolean;
  quantity: number;
  totalPrice: number;
  orderDate: string;
}

export interface IoTDevice {
  id: string;
  name: string;
  type: 'smartwatch' | 'fitness_tracker' | 'smart_ring' | 'sleep_tracker';
  brand: 'Apple Watch' | 'Fitbit' | 'Garmin' | 'Oura Ring' | 'Whoop';
  connected: boolean;
  lastSync: string;
  batteryLevel?: number;
}

export interface HealthMetrics {
  date: string;
  sleep: {
    duration: number; // heures
    quality: number; // 0-100
    deepSleep: number; // heures
    remSleep: number; // heures
    sleepScore: number; // 0-100
  };
  heartRate: {
    resting: number; // bpm
    average: number; // bpm
    maximum: number; // bpm
    hrv: number; // ms
  };
  recovery: {
    score: number; // 0-100
    stress: number; // 0-100
    readiness: number; // 0-100
    fatigue: number; // 0-10 (self-reported)
  };
  activity: {
    steps: number;
    calories: number;
    activeMinutes: number;
    exerciseMinutes: number;
    distance: number; // km
  };
}

export interface PerformanceInsight {
  id: string;
  type: 'improvement' | 'concern' | 'milestone' | 'recommendation';
  title: string;
  description: string;
  metric: string;
  change: number; // pourcentage
  period: string; // "last 7 days", "since protocol started"
  actionable: boolean;
  suggestion?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface MetricCard {
  id: string;
  title: string;
  value: string | number;
  unit?: string;
  change?: number; // pourcentage
  changeLabel?: string;
  icon: string;
  color: 'green' | 'blue' | 'purple' | 'orange' | 'red';
  trend: 'up' | 'down' | 'stable';
  clickable?: boolean;
}

export interface EcommerceProduct {
  id: string;
  name: string;
  type: 'supplement' | 'accessory' | 'upgrade';
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
  popular?: boolean;
  recommended?: boolean;
  badge?: string;
  benefits: string[];
}

export type ChartPeriod = '7d' | '1m' | '3m' | '1y';

export interface ChartData {
  period: ChartPeriod;
  data: Array<{
    date: string;
    value: number;
    label?: string;
  }>;
  metric: string;
  unit: string;
  average: number;
  trend: 'improving' | 'declining' | 'stable';
}