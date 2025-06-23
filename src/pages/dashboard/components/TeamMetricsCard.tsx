import React from 'react';

interface TeamMetric {
  id: string;
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeLabel?: string;
  icon: string;
  color: 'green' | 'blue' | 'purple' | 'orange' | 'red' | 'yellow';
  trend: 'up' | 'down' | 'stable';
  clickable?: boolean;
}

interface TeamMetricsCardProps {
  metric: TeamMetric;
  onClick?: () => void;
}

const TeamMetricsCard: React.FC<TeamMetricsCardProps> = ({ metric, onClick }) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return 'from-green-50 to-green-100 border-green-200 text-green-800';
      case 'blue':
        return 'from-blue-50 to-blue-100 border-blue-200 text-blue-800';
      case 'purple':
        return 'from-purple-50 to-purple-100 border-purple-200 text-purple-800';
      case 'orange':
        return 'from-orange-50 to-orange-100 border-orange-200 text-orange-800';
      case 'red':
        return 'from-red-50 to-red-100 border-red-200 text-red-800';
      case 'yellow':
        return 'from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-800';
      default:
        return 'from-gray-50 to-gray-100 border-gray-200 text-gray-800';
    }
  };

  const getIconSvg = (icon: string) => {
    switch (icon) {
      case 'users':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        );
      case 'clipboard':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        );
      case 'trending':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        );
      case 'star':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        );
      case 'trophy':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        );
      case 'currency':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        );
      default:
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        );
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return (
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        );
      case 'down':
        return (
          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        );
    }
  };

  return (
    <div 
      className={`backdrop-blur-md bg-gradient-to-br ${getColorClasses(metric.color)} border rounded-2xl p-6 ${
        metric.clickable ? 'cursor-pointer hover:shadow-lg hover:scale-105' : ''
      } transition-all duration-300`}
      onClick={metric.clickable ? onClick : undefined}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 bg-white/60 rounded-xl flex items-center justify-center`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {getIconSvg(metric.icon)}
          </svg>
        </div>
        {metric.change !== undefined && (
          <div className="flex items-center space-x-1">
            {getTrendIcon(metric.trend)}
            <span className={`text-sm font-medium ${
              metric.trend === 'up' ? 'text-green-600' : 
              metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {metric.change > 0 ? '+' : ''}{metric.change}%
            </span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium opacity-80">{metric.title}</h3>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold">
            {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
          </span>
          {metric.unit && (
            <span className="text-sm opacity-70">{metric.unit}</span>
          )}
        </div>
        {metric.changeLabel && (
          <p className="text-xs opacity-60">{metric.changeLabel}</p>
        )}
      </div>
    </div>
  );
};

export default TeamMetricsCard;