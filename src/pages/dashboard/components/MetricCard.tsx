import React from 'react';
import { MetricCard as MetricCardType } from '../../../types/dashboard.ts';

interface MetricCardProps {
  metric: MetricCardType;
  onClick?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric, onClick }) => {
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
      default:
        return 'from-gray-50 to-gray-100 border-gray-200 text-gray-800';
    }
  };

  const getIconSvg = (icon: string) => {
    switch (icon) {
      case 'moon':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        );
      case 'heart':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        );
      case 'footsteps':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        );
      case 'check':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
          <span className="text-2xl font-bold">
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

export default MetricCard;