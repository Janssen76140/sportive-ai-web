import React, { useState } from 'react';
import UserMenu from '../../components/UserMenu.tsx';
import MetricCard from './components/MetricCard.tsx';
import ProductCard from './components/ProductCard.tsx';
import { 
  mockChildProfile, 
  mockProtocolRecommendation, 
  mockOrderStatus, 
  mockIoTDevices, 
  mockHealthMetrics, 
  mockPerformanceInsights, 
  mockMetricCards,
  mockEcommerceProducts
} from '../../data/mockDashboardData.ts';

const ParentDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'monitoring' | 'ecommerce'>('overview');

  const currentMetrics = mockHealthMetrics[0]; // Données du jour

  const handleProductAddToCart = (productId: string) => {
    alert(`Product ${productId} added to cart! (Mock e-commerce functionality)`);
  };

  const handleProductViewDetails = (productId: string) => {
    alert(`View product details ${productId} (Mock functionality)`);
  };

  const handleOrderAction = (action: string) => {
    alert(`Order action: ${action} (Mock functionality)`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="backdrop-blur-xl bg-white/30 border-b border-white/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SportiveAI</h1>
              <p className="text-sm text-gray-600">Parent Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-xl px-4 py-2">
              <span className="text-sm text-gray-700">Welcome back, Parent</span>
            </div>
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Child Profile Section */}
        <section className="mb-8">
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-50 to-primary-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <span className="text-2xl font-bold text-primary-600">
                  {mockChildProfile.firstName.charAt(0)}{mockChildProfile.lastName.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {mockChildProfile.firstName} {mockChildProfile.lastName}
                </h2>
                <p className="text-gray-600">
                  {mockChildProfile.age} years old • {mockChildProfile.ageGroup} • {mockChildProfile.gender}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                    🏅 {mockChildProfile.primarySport}
                  </span>
                  {mockChildProfile.secondarySport && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                      🎯 {mockChildProfile.secondarySport}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="backdrop-blur-md bg-white/60 border border-white/40 rounded-xl px-4 py-2">
                  <span className="text-sm text-gray-600">Child code</span>
                  <div className="text-xl font-bold text-primary-600">{mockChildProfile.childAccessCode}</div>
                </div>
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
                { id: 'monitoring', label: 'IoT Monitoring', icon: 'chart' },
                { id: 'ecommerce', label: 'Shop', icon: 'shopping' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    selectedTab === tab.id
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
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
            
            {/* Protocol & Order Status */}
            <section>
              <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Current Protocol</h3>
                    <p className="text-gray-600">Active personalized recommendation</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    mockOrderStatus.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {mockOrderStatus.status === 'active' ? 'Active' : 'Inactive'}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Protocol Info */}
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-white rounded-xl p-3">
                        <img src={mockProtocolRecommendation.image} alt="Protocol" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-primary-900 mb-1">{mockProtocolRecommendation.name}</h4>
                        <p className="text-sm text-primary-700 mb-2">{mockProtocolRecommendation.type}</p>
                        <p className="text-sm text-primary-600">{mockProtocolRecommendation.dosage}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-primary-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-primary-700">Monthly price</span>
                        <span className="text-lg font-bold text-primary-900">${mockProtocolRecommendation.priceMonthly}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Status */}
                  <div className="space-y-4">
                    <div className="bg-white/60 border border-white/40 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Next delivery</span>
                        <span className="font-semibold text-gray-900">{mockOrderStatus.nextDelivery}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${Math.max(10, (30 - mockOrderStatus.daysRemaining) / 30 * 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{mockOrderStatus.daysRemaining} days remaining</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleOrderAction('modify')}
                        className="py-2 px-4 bg-white/60 border border-white/40 rounded-xl text-sm font-medium text-gray-700 hover:bg-white/80 transition-all duration-300"
                      >
                        Modify
                      </button>
                      <button
                        onClick={() => handleOrderAction('reorder')}
                        className="py-2 px-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl text-sm font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-300"
                      >
                        Renew
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Metrics Cards */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Key Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockMetricCards.map(metric => (
                  <MetricCard 
                    key={metric.id} 
                    metric={metric}
                    onClick={() => alert(`View details ${metric.title}`)}
                  />
                ))}
              </div>
            </section>

            {/* Performance Insights */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Insights</h3>
              <div className="space-y-4">
                {mockPerformanceInsights.map(insight => (
                  <div key={insight.id} className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            insight.type === 'improvement' ? 'bg-green-100 text-green-600' :
                            insight.type === 'milestone' ? 'bg-blue-100 text-blue-600' :
                            insight.type === 'recommendation' ? 'bg-purple-100 text-purple-600' :
                            'bg-orange-100 text-orange-600'
                          }`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            insight.change > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {insight.change > 0 ? '+' : ''}{insight.change}%
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{insight.description}</p>
                        <span className="text-sm text-gray-500">{insight.period}</span>
                      </div>
                      {insight.actionable && (
                        <button className="ml-4 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl text-sm font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-300">
                          Action
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {selectedTab === 'monitoring' && (
          <div className="space-y-8">
            
            {/* IoT Devices Status */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Connected Devices</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockIoTDevices.map(device => (
                  <div key={device.id} className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${device.connected ? 'bg-green-500' : 'bg-red-500'}`} />
                        <h4 className="font-semibold text-gray-900">{device.name}</h4>
                      </div>
                      {device.batteryLevel && (
                        <span className="text-sm text-gray-600">{device.batteryLevel}%</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">Last sync: {new Date(device.lastSync).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Health Charts - Simple Mock */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Health Data (Last 7 days)</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sleep Chart */}
                <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Sleep Quality</h4>
                  <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">{currentMetrics.sleep.quality}%</div>
                      <div className="text-sm text-blue-700">Average quality</div>
                      <div className="text-xs text-blue-600 mt-2">
                        {currentMetrics.sleep.duration}h of sleep
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recovery Chart */}
                <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Recovery Score</h4>
                  <div className="h-48 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{currentMetrics.recovery.score}/100</div>
                      <div className="text-sm text-green-700">Excellent recovery</div>
                      <div className="text-xs text-green-600 mt-2">
                        Stress: {currentMetrics.recovery.stress}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Current Metrics */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Today's Metrics</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">{currentMetrics.heartRate.resting}</div>
                  <div className="text-sm text-gray-600">Resting HR (bpm)</div>
                </div>
                <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">{currentMetrics.activity.steps.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Steps</div>
                </div>
                <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">{currentMetrics.activity.calories}</div>
                  <div className="text-sm text-gray-600">Calories</div>
                </div>
                <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">{currentMetrics.activity.activeMinutes}</div>
                  <div className="text-sm text-gray-600">Active mins</div>
                </div>
              </div>
            </section>
          </div>
        )}

        {selectedTab === 'ecommerce' && (
          <div className="space-y-8">
            
            {/* Recommendations */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Recommendations for Alex</h3>
                <button className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl text-sm font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-300">
                  View cart (0)
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockEcommerceProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleProductAddToCart}
                    onViewDetails={handleProductViewDetails}
                  />
                ))}
              </div>
            </section>

            {/* Current Subscription */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Current Subscription</h3>
              <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900">{mockProtocolRecommendation.name}</h4>
                    <p className="text-gray-600">Auto-renewal active</p>
                    <p className="text-sm text-gray-500">Next delivery: {mockOrderStatus.nextDelivery}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">${mockProtocolRecommendation.priceMonthly}</div>
                    <div className="text-sm text-gray-600">per month</div>
                    <button
                      onClick={() => handleOrderAction('manage')}
                      className="mt-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-sm hover:border-primary-500 hover:text-primary-600 transition-all duration-300"
                    >
                      Manage
                    </button>
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

export default ParentDashboard;