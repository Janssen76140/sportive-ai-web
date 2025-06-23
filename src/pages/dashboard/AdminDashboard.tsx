import React, { useState } from 'react';
import UserMenu from '../../components/UserMenu.tsx';
import {
  mockPlatformMetrics,
  mockUserActivity,
  mockSystemAlerts,
  mockRevenueData,
  mockUserManagement,
  mockProtocolAnalytics,
  mockSupportTickets,
  mockAdminNotifications,
  mockDatabaseHealth
} from '../../data/mockAdminData.ts';

const AdminDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'users' | 'analytics' | 'support' | 'system'>('overview');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [usersFilter, setUsersFilter] = useState('');

  const handleUserSelect = (userId: string, selected: boolean) => {
    if (selected) {
      setSelectedUsers(prev => [...prev, userId]);
    } else {
      setSelectedUsers(prev => prev.filter(id => id !== userId));
    }
  };

  const handleBulkUserAction = (action: string) => {
    alert(`Bulk action: ${action} for ${selectedUsers.length} users (Mock functionality)`);
  };

  const filteredUsers = mockUserManagement.filter(user => 
    user.firstName.toLowerCase().includes(usersFilter.toLowerCase()) ||
    user.lastName.toLowerCase().includes(usersFilter.toLowerCase()) ||
    user.email.toLowerCase().includes(usersFilter.toLowerCase()) ||
    user.userType.toLowerCase().includes(usersFilter.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-800';
      case 'error': return 'bg-red-50 border-red-200 text-red-700';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="backdrop-blur-xl bg-white/30 border-b border-white/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SportiveAI Admin</h1>
              <p className="text-sm text-gray-600">Platform Management Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button className="w-10 h-10 backdrop-blur-md bg-white/40 border border-white/30 rounded-xl flex items-center justify-center hover:bg-white/50 transition-all duration-300">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-3.5a8.38 8.38 0 010-3L20 7h-5M9 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-medium">
                  {mockAdminNotifications.filter(n => !n.read).length}
                </div>
              </button>
            </div>
            
            {/* Admin info */}
            <div className="flex items-center space-x-4">
              <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-xl px-4 py-2">
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-900">Super Admin</span>
                  <div className="text-xs text-gray-600">{mockPlatformMetrics.totalUsers.toLocaleString()} users</div>
                </div>
              </div>
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Platform Overview Section */}
        <section className="mb-8">
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Platform Overview</h2>
                <p className="text-gray-600">Real-time platform metrics and system health</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">${(mockPlatformMetrics.monthlyRevenue / 1000).toFixed(0)}k</div>
                  <div className="text-sm text-gray-600">Monthly Revenue</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${ 
                  mockDatabaseHealth.status === 'healthy' ? 'bg-green-100 text-green-800' :
                  mockDatabaseHealth.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {mockDatabaseHealth.status}
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="backdrop-blur-md bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-white/60 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                    <span className="text-sm font-medium text-green-600">+{mockPlatformMetrics.monthlyGrowth}%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-red-800 opacity-80">Total Users</h3>
                  <div className="text-3xl font-bold text-red-800">{mockPlatformMetrics.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-red-700 opacity-60">vs last month</p>
                </div>
              </div>

              <div className="backdrop-blur-md bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-white/60 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                    <span className="text-sm font-medium text-green-600">+{mockPlatformMetrics.totalAcademies}%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-orange-800 opacity-80">Academies</h3>
                  <div className="text-3xl font-bold text-orange-800">{mockPlatformMetrics.totalAcademies}</div>
                  <p className="text-xs text-orange-700 opacity-60">active institutions</p>
                </div>
              </div>

              <div className="backdrop-blur-md bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-white/60 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                    <span className="text-sm font-medium text-green-600">+15.2%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-yellow-800 opacity-80">Protocols</h3>
                  <div className="text-3xl font-bold text-yellow-800">{(mockPlatformMetrics.totalProtocols / 1000).toFixed(0)}k</div>
                  <p className="text-xs text-yellow-700 opacity-60">total protocols</p>
                </div>
              </div>

              <div className="backdrop-blur-md bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-white/60 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                    <span className="text-sm font-medium text-green-600">+{mockPlatformMetrics.monthlyGrowth}%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-green-800 opacity-80">Revenue</h3>
                  <div className="text-3xl font-bold text-green-800">${(mockPlatformMetrics.monthlyRevenue / 1000).toFixed(0)}k</div>
                  <p className="text-xs text-green-700 opacity-60">this month</p>
                </div>
              </div>
            </div>

            {/* System Alerts */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">System Alerts</h3>
              <div className="space-y-3">
                {mockSystemAlerts.slice(0, 3).map(alert => (
                  <div key={alert.id} className={`flex items-start space-x-3 p-4 border rounded-xl ${getAlertColor(alert.type)}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      alert.type === 'critical' || alert.type === 'error' ? 'bg-red-100 text-red-600' :
                      alert.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.19 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{alert.title}</h4>
                      <p className="text-sm opacity-80">{alert.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs opacity-60">{new Date(alert.timestamp).toLocaleString()}</span>
                        {!alert.resolved && (
                          <button className="px-3 py-1 bg-white/60 text-gray-700 rounded-lg text-sm hover:bg-white/80 transition-colors">
                            Resolve
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <nav className="mb-8">
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-2">
            <div className="flex space-x-2">
              {[
                { id: 'overview', label: 'Overview', icon: 'home' },
                { id: 'users', label: 'Users', icon: 'users' },
                { id: 'analytics', label: 'Analytics', icon: 'chart' },
                { id: 'support', label: 'Support', icon: 'support' },
                { id: 'system', label: 'System', icon: 'cog' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    selectedTab === tab.id
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-white/60'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div className="space-y-8">
            {/* Recent Activity */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
              <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
                <div className="space-y-4">
                  {mockUserActivity.map(activity => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-white/60 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.userType === 'parent' ? 'bg-green-100 text-green-600' :
                          activity.userType === 'academy' ? 'bg-blue-100 text-blue-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          <span className="text-sm font-bold">
                            {activity.userName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{activity.userName}</h4>
                          <p className="text-sm text-gray-600">{activity.action}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">{new Date(activity.timestamp).toLocaleString()}</div>
                        <div className="text-xs text-gray-400">{activity.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {selectedTab === 'users' && (
          <div className="space-y-6">
            {/* User Management Header */}
            <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">User Management</h3>
                <div className="flex items-center space-x-3">
                  {selectedUsers.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{selectedUsers.length} selected</span>
                      <button
                        onClick={() => handleBulkUserAction('suspend')}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
                      >
                        Suspend
                      </button>
                      <button
                        onClick={() => handleBulkUserAction('export')}
                        className="px-3 py-1 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600 transition-colors"
                      >
                        Export
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Search and Filters */}
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search users by name, email, or type..."
                    value={usersFilter}
                    onChange={(e) => setUsersFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-white/30 rounded-xl bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <select className="px-4 py-2 border border-white/30 rounded-xl bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                  <option>All Types</option>
                  <option>Parent</option>
                  <option>Academy</option>
                  <option>Admin</option>
                </select>
                <select className="px-4 py-2 border border-white/30 rounded-xl bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Suspended</option>
                </select>
              </div>
            </div>

            {/* Users Table */}
            <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-gray-600">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                        />
                      </th>
                      <th className="text-left py-3 text-gray-600">User</th>
                      <th className="text-left py-3 text-gray-600">Type</th>
                      <th className="text-left py-3 text-gray-600">Status</th>
                      <th className="text-left py-3 text-gray-600">Athletes</th>
                      <th className="text-left py-3 text-gray-600">Revenue</th>
                      <th className="text-left py-3 text-gray-600">Last Login</th>
                      <th className="text-left py-3 text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="border-b border-gray-100">
                        <td className="py-3">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={(e) => handleUserSelect(user.id, e.target.checked)}
                            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                          />
                        </td>
                        <td className="py-3">
                          <div>
                            <div className="font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.userType === 'parent' ? 'bg-green-100 text-green-800' :
                            user.userType === 'academy' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {user.userType}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 font-medium">{user.totalAthletes || 0}</td>
                        <td className="py-3 font-medium">${user.subscription?.amount.toLocaleString() || 0}</td>
                        <td className="py-3">{new Date(user.lastLogin).toLocaleDateString()}</td>
                        <td className="py-3">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                            <button className="text-red-600 hover:text-red-800 text-sm">Suspend</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'analytics' && (
          <div className="space-y-8">
            {/* Revenue Analytics */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Revenue Analytics</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Revenue Trend</h4>
                  <div className="h-48 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">${(mockPlatformMetrics.monthlyRevenue / 1000).toFixed(0)}k</div>
                      <div className="text-sm text-green-700">Monthly Revenue</div>
                      <div className="text-xs text-green-600 mt-2">
                        +{mockPlatformMetrics.monthlyGrowth}% this month
                      </div>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">User Growth</h4>
                  <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">{mockPlatformMetrics.totalUsers.toLocaleString()}</div>
                      <div className="text-sm text-blue-700">Total Users</div>
                      <div className="text-xs text-blue-600 mt-2">
                        +{mockPlatformMetrics.monthlyGrowth}% growth
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Protocol Analytics */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Protocol Performance</h3>
              <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{mockProtocolAnalytics.totalProtocols.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total Protocols</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{mockProtocolAnalytics.protocolsDelivered.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Delivered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{mockProtocolAnalytics.averageAdherence}%</div>
                    <div className="text-sm text-gray-600">Avg. Adherence</div>
                  </div>
                </div>

                <h4 className="font-semibold text-gray-900 mb-4">Top Performing Protocols</h4>
                <div className="space-y-3">
                  {mockProtocolAnalytics.topPerformingProtocols.map((protocol, index) => (
                    <div key={protocol.id} className="flex items-center justify-between p-4 bg-white/60 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{protocol.name}</div>
                          <div className="text-sm text-gray-600">{protocol.sport} • {protocol.usageCount} uses</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{protocol.successRate}%</div>
                        <div className="text-sm text-gray-600">Success Rate</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {selectedTab === 'support' && (
          <div className="space-y-8">
            {/* Support Overview */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Support Tickets</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6 text-center">
                  <div className="text-2xl font-bold text-gray-900">{mockSupportTickets.length}</div>
                  <div className="text-sm text-gray-600">Total Tickets</div>
                </div>
                <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6 text-center">
                  <div className="text-2xl font-bold text-yellow-600">{mockSupportTickets.filter(t => t.status === 'open').length}</div>
                  <div className="text-sm text-gray-600">Open</div>
                </div>
                <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6 text-center">
                  <div className="text-2xl font-bold text-blue-600">{mockSupportTickets.filter(t => t.status === 'in_progress').length}</div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
                <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6 text-center">
                  <div className="text-2xl font-bold text-green-600">{mockSupportTickets.filter(t => t.status === 'resolved').length}</div>
                  <div className="text-sm text-gray-600">Resolved</div>
                </div>
              </div>

              {/* Tickets List */}
              <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
                <div className="space-y-4">
                  {mockSupportTickets.map(ticket => (
                    <div key={ticket.id} className="flex items-start justify-between p-4 bg-white/60 rounded-xl">
                      <div className="flex items-start space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          ticket.userType === 'parent' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          <span className="text-sm font-bold">
                            {ticket.userName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{ticket.subject}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{ticket.userName} ({ticket.userType})</span>
                            <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                            {ticket.assignedTo && <span>Assigned to: {ticket.assignedTo}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ticket.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                          ticket.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {ticket.status.replace('_', ' ')}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {selectedTab === 'system' && (
          <div className="space-y-8">
            {/* Database Health */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-6">System Health</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Database Status</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Status</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        mockDatabaseHealth.status === 'healthy' ? 'bg-green-100 text-green-800' :
                        mockDatabaseHealth.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {mockDatabaseHealth.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Records</span>
                      <span className="font-medium">{mockDatabaseHealth.totalRecords.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Storage Used</span>
                      <span className="font-medium">{mockDatabaseHealth.storageUsed}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Storage Available</span>
                      <span className="font-medium">{mockDatabaseHealth.storageAvailable}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Last Backup</span>
                      <span className="font-medium">{new Date(mockDatabaseHealth.lastBackup).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Performance Metrics</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Avg Response Time</span>
                      <span className="font-medium">{mockDatabaseHealth.queryPerformance.averageResponseTime}ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Slow Queries</span>
                      <span className="font-medium text-yellow-600">{mockDatabaseHealth.queryPerformance.slowQueries}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Backup Status</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        mockDatabaseHealth.backupStatus === 'success' ? 'bg-green-100 text-green-800' :
                        mockDatabaseHealth.backupStatus === 'failed' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {mockDatabaseHealth.backupStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;