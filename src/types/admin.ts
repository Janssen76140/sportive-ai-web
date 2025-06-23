// Admin Dashboard Types for SportiveAI Platform Management

export interface PlatformMetrics {
  totalUsers: number;
  totalParents: number;
  totalAcademies: number;
  totalAthletes: number;
  totalProtocols: number;
  monthlyRevenue: number;
  monthlyGrowth: number;
  activeSubscriptions: number;
  churnRate: number;
}

export interface UserActivity {
  id: string;
  userId: string;
  userName: string;
  userType: 'parent' | 'academy' | 'admin';
  action: string;
  timestamp: string;
  ipAddress: string;
  location: string;
}

export interface SystemAlert {
  id: string;
  type: 'error' | 'warning' | 'info' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  resolved: boolean;
  affectedUsers?: number;
  component: string;
}

export interface RevenueData {
  month: string;
  parentRevenue: number;
  academyRevenue: number;
  totalRevenue: number;
  subscriptions: number;
  averageRevenuePerUser: number;
}

export interface UserManagement {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'parent' | 'academy' | 'admin';
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  createdAt: string;
  lastLogin: string;
  subscription?: {
    plan: string;
    status: 'active' | 'cancelled' | 'expired';
    nextBilling: string;
    amount: number;
  };
  location: string;
  totalAthletes?: number;
}

export interface ProtocolAnalytics {
  totalProtocols: number;
  protocolsDelivered: number;
  averageAdherence: number;
  topPerformingProtocols: {
    id: string;
    name: string;
    usageCount: number;
    successRate: number;
    sport: string;
  }[];
  protocolsByCategory: {
    category: string;
    count: number;
    percentage: number;
  }[];
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userType: 'parent' | 'academy';
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  responses: number;
}

export interface AdminNotification {
  id: string;
  type: 'system' | 'user' | 'revenue' | 'support';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  actionRequired: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface DatabaseHealth {
  status: 'healthy' | 'warning' | 'critical';
  totalRecords: number;
  storageUsed: string;
  storageAvailable: string;
  backupStatus: 'success' | 'failed' | 'in_progress';
  lastBackup: string;
  queryPerformance: {
    averageResponseTime: number;
    slowQueries: number;
  };
}