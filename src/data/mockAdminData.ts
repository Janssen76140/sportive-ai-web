import {
  PlatformMetrics,
  UserActivity,
  SystemAlert,
  RevenueData,
  UserManagement,
  ProtocolAnalytics,
  SupportTicket,
  AdminNotification,
  DatabaseHealth
} from '../types/admin.ts';

// Platform Overview Metrics
export const mockPlatformMetrics: PlatformMetrics = {
  totalUsers: 1847,
  totalParents: 1394,
  totalAcademies: 42,
  totalAthletes: 3521,
  totalProtocols: 58320,
  monthlyRevenue: 287540,
  monthlyGrowth: 12.4,
  activeSubscriptions: 1436,
  churnRate: 3.2
};

// Recent User Activity
export const mockUserActivity: UserActivity[] = [
  {
    id: 'activity-001',
    userId: 'parent-234',
    userName: 'Sarah Johnson',
    userType: 'parent',
    action: 'Completed athlete onboarding',
    timestamp: '2025-06-16T14:30:00Z',
    ipAddress: '192.168.1.100',
    location: 'Los Angeles, CA'
  },
  {
    id: 'activity-002',
    userId: 'academy-005',
    userName: 'Elite Sports Academy',
    userType: 'academy',
    action: 'Added 5 new athletes',
    timestamp: '2025-06-16T13:45:00Z',
    ipAddress: '203.45.67.89',
    location: 'New York, NY'
  },
  {
    id: 'activity-003',
    userId: 'parent-567',
    userName: 'Michael Chen',
    userType: 'parent',
    action: 'Purchased protocol supplement',
    timestamp: '2025-06-16T12:15:00Z',
    ipAddress: '10.0.0.55',
    location: 'San Francisco, CA'
  },
  {
    id: 'activity-004',
    userId: 'academy-012',
    userName: 'Champions Training Center',
    userType: 'academy',
    action: 'Generated analytics report',
    timestamp: '2025-06-16T11:30:00Z',
    ipAddress: '172.16.0.25',
    location: 'Chicago, IL'
  },
  {
    id: 'activity-005',
    userId: 'parent-891',
    userName: 'Jessica Rodriguez',
    userType: 'parent',
    action: 'Updated child health metrics',
    timestamp: '2025-06-16T10:45:00Z',
    ipAddress: '192.168.0.45',
    location: 'Miami, FL'
  }
];

// System Alerts
export const mockSystemAlerts: SystemAlert[] = [
  {
    id: 'alert-001',
    type: 'warning',
    title: 'Database Storage Warning',
    description: 'Database storage is at 85% capacity. Consider cleanup or expansion.',
    timestamp: '2025-06-16T08:00:00Z',
    resolved: false,
    component: 'Database',
    affectedUsers: 0
  },
  {
    id: 'alert-002',
    type: 'info',
    title: 'Scheduled Maintenance',
    description: 'System maintenance scheduled for June 18th at 2:00 AM EST.',
    timestamp: '2025-06-15T16:00:00Z',
    resolved: false,
    component: 'System',
    affectedUsers: 1847
  },
  {
    id: 'alert-003',
    type: 'error',
    title: 'Payment Gateway Timeout',
    description: 'Intermittent timeouts detected on payment processing.',
    timestamp: '2025-06-16T06:30:00Z',
    resolved: true,
    component: 'Payment',
    affectedUsers: 12
  }
];

// Revenue Data (Last 6 months)
export const mockRevenueData: RevenueData[] = [
  {
    month: '2025-01',
    parentRevenue: 168540,
    academyRevenue: 89200,
    totalRevenue: 257740,
    subscriptions: 1285,
    averageRevenuePerUser: 200.58
  },
  {
    month: '2025-02',
    parentRevenue: 175320,
    academyRevenue: 94680,
    totalRevenue: 270000,
    subscriptions: 1312,
    averageRevenuePerUser: 205.79
  },
  {
    month: '2025-03',
    parentRevenue: 182450,
    academyRevenue: 98750,
    totalRevenue: 281200,
    subscriptions: 1356,
    averageRevenuePerUser: 207.37
  },
  {
    month: '2025-04',
    parentRevenue: 189200,
    academyRevenue: 102300,
    totalRevenue: 291500,
    subscriptions: 1389,
    averageRevenuePerUser: 209.86
  },
  {
    month: '2025-05',
    parentRevenue: 196800,
    academyRevenue: 106840,
    totalRevenue: 303640,
    subscriptions: 1421,
    averageRevenuePerUser: 213.80
  },
  {
    month: '2025-06',
    parentRevenue: 203450,
    academyRevenue: 84090,
    totalRevenue: 287540,
    subscriptions: 1436,
    averageRevenuePerUser: 200.24
  }
];

// User Management Data
export const mockUserManagement: UserManagement[] = [
  {
    id: 'user-001',
    email: 'sarah.johnson@email.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    userType: 'parent',
    status: 'active',
    createdAt: '2024-12-15T10:30:00Z',
    lastLogin: '2025-06-16T14:25:00Z',
    location: 'Los Angeles, CA',
    totalAthletes: 2,
    subscription: {
      plan: 'Premium',
      status: 'active',
      nextBilling: '2025-07-15T00:00:00Z',
      amount: 49.99
    }
  },
  {
    id: 'user-002',
    email: 'admin@elitesportsacademy.com',
    firstName: 'Elite Sports',
    lastName: 'Academy',
    userType: 'academy',
    status: 'active',
    createdAt: '2024-08-20T09:00:00Z',
    lastLogin: '2025-06-16T13:40:00Z',
    location: 'New York, NY',
    totalAthletes: 247,
    subscription: {
      plan: 'Professional',
      status: 'active',
      nextBilling: '2025-07-20T00:00:00Z',
      amount: 29640.00
    }
  },
  {
    id: 'user-003',
    email: 'michael.chen@gmail.com',
    firstName: 'Michael',
    lastName: 'Chen',
    userType: 'parent',
    status: 'active',
    createdAt: '2025-01-10T14:20:00Z',
    lastLogin: '2025-06-16T12:10:00Z',
    location: 'San Francisco, CA',
    totalAthletes: 1,
    subscription: {
      plan: 'Basic',
      status: 'active',
      nextBilling: '2025-07-10T00:00:00Z',
      amount: 29.99
    }
  },
  {
    id: 'user-004',
    email: 'info@championstraining.com',
    firstName: 'Champions Training',
    lastName: 'Center',
    userType: 'academy',
    status: 'active',
    createdAt: '2024-11-05T11:15:00Z',
    lastLogin: '2025-06-16T11:25:00Z',
    location: 'Chicago, IL',
    totalAthletes: 89,
    subscription: {
      plan: 'Professional',
      status: 'active',
      nextBilling: '2025-07-05T00:00:00Z',
      amount: 10680.00
    }
  },
  {
    id: 'user-005',
    email: 'jessica.rodriguez@hotmail.com',
    firstName: 'Jessica',
    lastName: 'Rodriguez',
    userType: 'parent',
    status: 'inactive',
    createdAt: '2024-09-22T16:45:00Z',
    lastLogin: '2025-05-28T09:30:00Z',
    location: 'Miami, FL',
    totalAthletes: 1,
    subscription: {
      plan: 'Premium',
      status: 'cancelled',
      nextBilling: '2025-06-22T00:00:00Z',
      amount: 49.99
    }
  }
];

// Protocol Analytics
export const mockProtocolAnalytics: ProtocolAnalytics = {
  totalProtocols: 58320,
  protocolsDelivered: 47895,
  averageAdherence: 87.4,
  topPerformingProtocols: [
    {
      id: 'protocol-001',
      name: 'Basic Wellness Stack',
      usageCount: 1247,
      successRate: 94.2,
      sport: 'Soccer'
    },
    {
      id: 'protocol-002',
      name: 'Endurance Performance',
      usageCount: 985,
      successRate: 91.8,
      sport: 'Running'
    },
    {
      id: 'protocol-003',
      name: 'Recovery Enhancement',
      usageCount: 756,
      successRate: 89.5,
      sport: 'Basketball'
    },
    {
      id: 'protocol-004',
      name: 'Strength Building',
      usageCount: 623,
      successRate: 88.1,
      sport: 'Swimming'
    }
  ],
  protocolsByCategory: [
    { category: 'Basic Wellness', count: 15647, percentage: 26.8 },
    { category: 'Recovery', count: 12458, percentage: 21.4 },
    { category: 'Endurance', count: 11236, percentage: 19.3 },
    { category: 'Performance', count: 10457, percentage: 17.9 },
    { category: 'Strength', count: 8522, percentage: 14.6 }
  ]
};

// Support Tickets
export const mockSupportTickets: SupportTicket[] = [
  {
    id: 'ticket-001',
    userId: 'parent-234',
    userName: 'Sarah Johnson',
    userType: 'parent',
    subject: 'Unable to access child dashboard',
    description: 'Getting error 404 when trying to view my child Emma\'s progress dashboard.',
    priority: 'high',
    status: 'in_progress',
    assignedTo: 'Support Agent Lisa',
    createdAt: '2025-06-16T09:15:00Z',
    updatedAt: '2025-06-16T10:30:00Z',
    responses: 3
  },
  {
    id: 'ticket-002',
    userId: 'academy-005',
    userName: 'Elite Sports Academy',
    userType: 'academy',
    subject: 'Billing discrepancy',
    description: 'Charged for 250 athletes but our active count shows 247.',
    priority: 'medium',
    status: 'open',
    createdAt: '2025-06-16T08:45:00Z',
    updatedAt: '2025-06-16T08:45:00Z',
    responses: 0
  },
  {
    id: 'ticket-003',
    userId: 'parent-567',
    userName: 'Michael Chen',
    userType: 'parent',
    subject: 'Protocol recommendation incorrect',
    description: 'My son is allergic to lactose but received dairy-based supplements.',
    priority: 'critical',
    status: 'resolved',
    assignedTo: 'Support Agent Mark',
    createdAt: '2025-06-15T16:20:00Z',
    updatedAt: '2025-06-16T11:45:00Z',
    responses: 5
  }
];

// Admin Notifications
export const mockAdminNotifications: AdminNotification[] = [
  {
    id: 'notif-001',
    type: 'system',
    title: 'High CPU Usage Detected',
    description: 'Server CPU usage has been above 85% for the last 30 minutes.',
    timestamp: '2025-06-16T14:45:00Z',
    read: false,
    actionRequired: true,
    priority: 'high'
  },
  {
    id: 'notif-002',
    type: 'revenue',
    title: 'Monthly Revenue Target Achieved',
    description: 'June revenue target of $280k reached 2 weeks early.',
    timestamp: '2025-06-16T12:00:00Z',
    read: false,
    actionRequired: false,
    priority: 'medium'
  },
  {
    id: 'notif-003',
    type: 'user',
    title: 'New Academy Registration',
    description: 'Victory Sports Academy registered with 156 athletes.',
    timestamp: '2025-06-16T10:30:00Z',
    read: true,
    actionRequired: false,
    priority: 'low'
  },
  {
    id: 'notif-004',
    type: 'support',
    title: 'Critical Support Ticket',
    description: 'New critical ticket #ticket-003 requires immediate attention.',
    timestamp: '2025-06-15T16:25:00Z',
    read: true,
    actionRequired: false,
    priority: 'high'
  }
];

// Database Health
export const mockDatabaseHealth: DatabaseHealth = {
  status: 'warning',
  totalRecords: 547832,
  storageUsed: '12.4 GB',
  storageAvailable: '2.1 GB',
  backupStatus: 'success',
  lastBackup: '2025-06-16T02:00:00Z',
  queryPerformance: {
    averageResponseTime: 145,
    slowQueries: 7
  }
};