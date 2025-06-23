import { User } from '../types/auth.ts';

// Mock Users Database for Authentication Demo
export const mockUsers: User[] = [
  // Parent Users
  {
    id: 'parent-001',
    email: 'sarah.johnson@email.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    userType: 'parent',
    status: 'active',
    createdAt: '2024-12-15T10:30:00Z',
    lastLogin: '2025-06-16T14:25:00Z',
    children: [
      {
        id: 'child-001',
        firstName: 'Emma',
        lastName: 'Johnson',
        age: 12,
        primarySport: 'Soccer'
      },
      {
        id: 'child-002',
        firstName: 'Lucas',
        lastName: 'Johnson',
        age: 8,
        primarySport: 'Swimming'
      }
    ]
  },
  {
    id: 'parent-002',
    email: 'michael.chen@gmail.com',
    firstName: 'Michael',
    lastName: 'Chen',
    userType: 'parent',
    status: 'active',
    createdAt: '2025-01-10T14:20:00Z',
    lastLogin: '2025-06-16T12:10:00Z',
    children: [
      {
        id: 'child-003',
        firstName: 'Alex',
        lastName: 'Chen',
        age: 15,
        primarySport: 'Basketball'
      }
    ]
  },
  {
    id: 'parent-003',
    email: 'jessica.rodriguez@hotmail.com',
    firstName: 'Jessica',
    lastName: 'Rodriguez',
    userType: 'parent',
    status: 'inactive',
    createdAt: '2024-09-22T16:45:00Z',
    lastLogin: '2025-05-28T09:30:00Z',
    children: [
      {
        id: 'child-004',
        firstName: 'Sofia',
        lastName: 'Rodriguez',
        age: 10,
        primarySport: 'Tennis'
      }
    ]
  },

  // Academy Users
  {
    id: 'academy-001',
    email: 'admin@elitesportsacademy.com',
    firstName: 'Elite Sports',
    lastName: 'Academy',
    userType: 'academy',
    status: 'active',
    createdAt: '2024-08-20T09:00:00Z',
    lastLogin: '2025-06-16T13:40:00Z',
    academyName: 'Elite Sports Academy',
    academyLocation: 'Los Angeles, CA',
    totalAthletes: 247,
    subscription: {
      plan: 'Professional',
      status: 'active',
      nextBilling: '2025-07-20T00:00:00Z',
      amount: 29640.00
    }
  },
  {
    id: 'academy-002',
    email: 'info@championstraining.com',
    firstName: 'Champions Training',
    lastName: 'Center',
    userType: 'academy',
    status: 'active',
    createdAt: '2024-11-05T11:15:00Z',
    lastLogin: '2025-06-16T11:25:00Z',
    academyName: 'Champions Training Center',
    academyLocation: 'Chicago, IL',
    totalAthletes: 89,
    subscription: {
      plan: 'Professional',
      status: 'active',
      nextBilling: '2025-07-05T00:00:00Z',
      amount: 10680.00
    }
  },
  {
    id: 'academy-003',
    email: 'contact@victoryacademy.com',
    firstName: 'Victory Sports',
    lastName: 'Academy',
    userType: 'academy',
    status: 'active',
    createdAt: '2024-06-12T08:30:00Z',
    lastLogin: '2025-06-15T16:20:00Z',
    academyName: 'Victory Sports Academy',
    academyLocation: 'Miami, FL',
    totalAthletes: 156,
    subscription: {
      plan: 'Professional',
      status: 'active',
      nextBilling: '2025-06-25T00:00:00Z',
      amount: 18720.00
    }
  },

  // Admin Users
  {
    id: 'admin-001',
    email: 'admin@sportiveai.com',
    firstName: 'Admin',
    lastName: 'SportiveAI',
    userType: 'admin',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2025-06-16T15:00:00Z',
    role: 'super_admin',
    permissions: ['user_management', 'system_admin', 'platform_analytics', 'billing_management', 'support_access']
  },
  {
    id: 'admin-002',
    email: 'support@sportiveai.com',
    firstName: 'Support',
    lastName: 'Manager',
    userType: 'admin',
    status: 'active',
    createdAt: '2024-03-15T10:00:00Z',
    lastLogin: '2025-06-16T14:30:00Z',
    role: 'admin',
    permissions: ['support_access', 'user_management', 'basic_analytics']
  }
];

// Mock Passwords (In real app, these would be hashed)
export const mockPasswords: Record<string, string> = {
  'sarah.johnson@email.com': 'Parent123!',
  'michael.chen@gmail.com': 'Parent456!',
  'jessica.rodriguez@hotmail.com': 'Parent789!',
  'admin@elitesportsacademy.com': 'Academy123!',
  'info@championstraining.com': 'Academy456!',
  'contact@victoryacademy.com': 'Academy789!',
  'admin@sportiveai.com': 'Admin123!',
  'support@sportiveai.com': 'Admin456!'
};

// Demo accounts for easy testing
export const demoAccounts = {
  parent: {
    email: 'sarah.johnson@email.com',
    password: 'Parent123!',
    description: 'Parent with 2 children (Emma & Lucas)'
  },
  academy: {
    email: 'admin@elitesportsacademy.com',
    password: 'Academy123!',
    description: 'Elite Sports Academy (247 athletes)'
  },
  admin: {
    email: 'admin@sportiveai.com',
    password: 'Admin123!',
    description: 'Super Admin (full platform access)'
  }
};