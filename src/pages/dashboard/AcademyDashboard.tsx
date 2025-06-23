import React, { useState } from 'react';
import UserMenu from '../../components/UserMenu.tsx';
import AthleteCard from './components/AthleteCard.tsx';
import TeamMetricsCard from './components/TeamMetricsCard.tsx';
import {
  mockAcademy,
  mockAthletes,
  mockTeamMetrics,
  mockPerformanceAnalytics,
  mockBillingInfo,
  mockAcademyNotifications
} from '../../data/mockAcademyData.ts';

const AcademyDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'athletes' | 'analytics' | 'billing'>('overview');
  const [selectedAthletes, setSelectedAthletes] = useState<string[]>([]);
  const [athletesFilter, setAthletesFilter] = useState('');

  // Convert team metrics to TeamMetricsCard format
  const teamMetricsCards = [
    {
      id: 'total-athletes',
      title: 'Total Athletes',
      value: mockTeamMetrics.totalAthletes,
      change: mockTeamMetrics.monthlyGrowth,
      changeLabel: 'vs last month',
      icon: 'users',
      color: 'blue' as const,
      trend: 'up' as const,
      clickable: true
    },
    {
      id: 'active-protocols',
      title: 'Active Protocols',
      value: mockTeamMetrics.activeProtocols,
      change: 5.2,
      changeLabel: 'vs last month',
      icon: 'clipboard',
      color: 'green' as const,
      trend: 'up' as const,
      clickable: true
    },
    {
      id: 'adherence-rate',
      title: 'Average Adherence',
      value: mockTeamMetrics.averageAdherence,
      unit: '%',
      change: mockPerformanceAnalytics.metrics.adherenceRate.change,
      changeLabel: 'vs last quarter',
      icon: 'star',
      color: 'purple' as const,
      trend: mockPerformanceAnalytics.metrics.adherenceRate.trend,
      clickable: true
    },
    {
      id: 'performance-improvement',
      title: 'Avg. Performance',
      value: mockTeamMetrics.averagePerformanceImprovement,
      unit: '%',
      change: 2.1,
      changeLabel: 'improvement',
      icon: 'trending',
      color: 'orange' as const,
      trend: 'up' as const,
      clickable: true
    },
    {
      id: 'monthly-revenue',
      title: 'Monthly Revenue',
      value: `$${(mockTeamMetrics.revenueThisMonth / 1000).toFixed(0)}k`,
      change: 8.5,
      changeLabel: 'vs last month',
      icon: 'currency',
      color: 'green' as const,
      trend: 'up' as const,
      clickable: true
    },
    {
      id: 'top-sport',
      title: 'Top Performing Sport',
      value: mockTeamMetrics.topPerformingSport,
      change: 24.8,
      changeLabel: 'improvement rate',
      icon: 'trophy',
      color: 'yellow' as const,
      trend: 'up' as const,
      clickable: false
    }
  ];

  const handleAthleteSelect = (athleteId: string, selected: boolean) => {
    if (selected) {
      setSelectedAthletes(prev => [...prev, athleteId]);
    } else {
      setSelectedAthletes(prev => prev.filter(id => id !== athleteId));
    }
  };

  const handleBulkAction = (action: string) => {
    alert(`Bulk action: ${action} for ${selectedAthletes.length} athletes (Mock functionality)`);
  };

  const handleAthleteAction = (athleteId: string, action: string) => {
    alert(`${action} for athlete ${athleteId} (Mock functionality)`);
  };

  const filteredAthletes = mockAthletes.filter(athlete => 
    athlete.firstName.toLowerCase().includes(athletesFilter.toLowerCase()) ||
    athlete.lastName.toLowerCase().includes(athletesFilter.toLowerCase()) ||
    athlete.primarySport.toLowerCase().includes(athletesFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="backdrop-blur-xl bg-white/30 border-b border-white/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{mockAcademy.name}</h1>
              <p className="text-sm text-gray-600">Academy Dashboard • {mockAcademy.location}</p>
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
                  {mockAcademyNotifications.filter(n => !n.read).length}
                </div>
              </button>
            </div>
            
            {/* Academy info */}
            <div className="flex items-center space-x-4">
              <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-xl px-4 py-2">
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-900">{mockAcademy.subscription.plan}</span>
                  <div className="text-xs text-gray-600">{mockAcademy.totalAthletes} athletes</div>
                </div>
              </div>
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Academy Overview Section */}
        <section className="mb-8">
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Academy Overview</h2>
                <p className="text-gray-600">Performance metrics and key insights</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">${(mockTeamMetrics.revenueThisMonth / 1000).toFixed(0)}k</div>
                  <div className="text-sm text-gray-600">Monthly Revenue</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  mockAcademy.subscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {mockAcademy.subscription.status}
                </div>
              </div>
            </div>

            {/* Key insights */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Insights</h3>
              <div className="space-y-3">
                {mockPerformanceAnalytics.insights.slice(0, 2).map(insight => (
                  <div key={insight.id} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      insight.type === 'success' ? 'bg-green-100 text-green-600' :
                      insight.type === 'recommendation' ? 'bg-blue-100 text-blue-600' :
                      insight.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                      <p className="text-gray-600 text-sm">{insight.description}</p>
                    </div>
                    {insight.actionable && (
                      <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                        Action
                      </button>
                    )}
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
                { id: 'athletes', label: 'Athletes', icon: 'users' },
                { id: 'analytics', label: 'Analytics', icon: 'chart' },
                { id: 'billing', label: 'Billing', icon: 'currency' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    selectedTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
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
            {/* Team Metrics */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Team Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMetricsCards.map(metric => (
                  <TeamMetricsCard 
                    key={metric.id} 
                    metric={metric}
                    onClick={() => alert(`View details for ${metric.title}`)}
                  />
                ))}
              </div>
            </section>

            {/* Recent Athletes Activity */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Athletes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockAthletes.slice(0, 6).map(athlete => (
                  <AthleteCard
                    key={athlete.id}
                    athlete={athlete}
                    onViewDetails={(id) => alert(`View details for athlete ${id}`)}
                    onEditProtocol={(id) => alert(`Edit protocol for athlete ${id}`)}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {selectedTab === 'athletes' && (
          <div className="space-y-6">
            {/* Athletes Management Header */}
            <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Athletes Management</h3>
                <div className="flex items-center space-x-3">
                  {selectedAthletes.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{selectedAthletes.length} selected</span>
                      <button
                        onClick={() => handleBulkAction('assign_protocol')}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                      >
                        Assign Protocol
                      </button>
                      <button
                        onClick={() => handleBulkAction('export')}
                        className="px-3 py-1 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600 transition-colors"
                      >
                        Export
                      </button>
                    </div>
                  )}
                  <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300">
                    Add Athlete
                  </button>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search athletes by name or sport..."
                    value={athletesFilter}
                    onChange={(e) => setAthletesFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-white/30 rounded-xl bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select className="px-4 py-2 border border-white/30 rounded-xl bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Sports</option>
                  <option>Soccer</option>
                  <option>Basketball</option>
                  <option>Swimming</option>
                  <option>Tennis</option>
                </select>
                <select className="px-4 py-2 border border-white/30 rounded-xl bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            {/* Athletes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAthletes.map(athlete => (
                <AthleteCard
                  key={athlete.id}
                  athlete={athlete}
                  selected={selectedAthletes.includes(athlete.id)}
                  onSelect={handleAthleteSelect}
                  onViewDetails={(id) => handleAthleteAction(id, 'view_details')}
                  onEditProtocol={(id) => handleAthleteAction(id, 'edit_protocol')}
                />
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'analytics' && (
          <div className="space-y-8">
            {/* Performance Analytics */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Analytics</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Adherence Chart */}
                <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Adherence Rate Trend</h4>
                  <div className="h-48 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{mockPerformanceAnalytics.metrics.adherenceRate.current}%</div>
                      <div className="text-sm text-green-700">Current adherence rate</div>
                      <div className="text-xs text-green-600 mt-2">
                        +{mockPerformanceAnalytics.metrics.adherenceRate.change}% this quarter
                      </div>
                    </div>
                  </div>
                </div>

                {/* Athletes Growth Chart */}
                <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Athletes Growth</h4>
                  <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">{mockTeamMetrics.totalAthletes}</div>
                      <div className="text-sm text-blue-700">Total athletes</div>
                      <div className="text-xs text-blue-600 mt-2">
                        +{mockTeamMetrics.monthlyGrowth}% growth this month
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Protocol Effectiveness */}
              <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Protocol Effectiveness by Sport</h4>
                <div className="space-y-4">
                  {mockPerformanceAnalytics.metrics.protocolEffectiveness.map((sport, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/60 rounded-xl">
                      <div>
                        <span className="font-medium text-gray-900">{sport.sport}</span>
                        <span className="text-sm text-gray-600 ml-2">({sport.sampleSize} athletes)</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" 
                            style={{ width: `${(sport.improvement / 30) * 100}%` }}
                          />
                        </div>
                        <span className="font-bold text-green-600">{sport.improvement}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {selectedTab === 'billing' && (
          <div className="space-y-8">
            {/* Current Billing Period */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Billing Information</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Current Period */}
                <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Current Billing Period</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Period</span>
                      <span className="font-medium">
                        {new Date(mockBillingInfo.currentPeriod.startDate).toLocaleDateString()} - 
                        {new Date(mockBillingInfo.currentPeriod.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Athletes</span>
                      <span className="font-medium">{mockBillingInfo.currentPeriod.totalAthletes}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Cost per athlete</span>
                      <span className="font-medium">${mockBillingInfo.currentPeriod.costPerAthlete}</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total Amount</span>
                        <span className="text-2xl font-bold text-green-600">
                          ${mockBillingInfo.currentPeriod.totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Usage Stats */}
                <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Usage Statistics</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Protocols delivered</span>
                      <span className="font-medium">{mockBillingInfo.usageStats.protocolsDelivered}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Parent engagement</span>
                      <span className="font-medium">{mockBillingInfo.usageStats.parentEngagement}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Support tickets</span>
                      <span className="font-medium">{mockBillingInfo.usageStats.supportTickets}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Data exports</span>
                      <span className="font-medium">{mockBillingInfo.usageStats.dataExports}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoice History */}
              <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Invoice History</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 text-gray-600">Date</th>
                        <th className="text-left py-3 text-gray-600">Athletes</th>
                        <th className="text-left py-3 text-gray-600">Amount</th>
                        <th className="text-left py-3 text-gray-600">Status</th>
                        <th className="text-left py-3 text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockBillingInfo.invoiceHistory.map(invoice => (
                        <tr key={invoice.id} className="border-b border-gray-100">
                          <td className="py-3">{new Date(invoice.date).toLocaleDateString()}</td>
                          <td className="py-3">{invoice.athletes}</td>
                          <td className="py-3 font-medium">${invoice.amount.toLocaleString()}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {invoice.status}
                            </span>
                          </td>
                          <td className="py-3">
                            <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default AcademyDashboard;