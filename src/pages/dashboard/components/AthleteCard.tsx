import React from 'react';
import { Athlete } from '../../../types/academy.ts';

interface AthleteCardProps {
  athlete: Athlete;
  onViewDetails?: (athleteId: string) => void;
  onEditProtocol?: (athleteId: string) => void;
  selected?: boolean;
  onSelect?: (athleteId: string, selected: boolean) => void;
}

const AthleteCard: React.FC<AthleteCardProps> = ({ 
  athlete, 
  onViewDetails, 
  onEditProtocol, 
  selected = false,
  onSelect 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'graduated':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAdherenceColor = (adherence: number) => {
    if (adherence >= 90) return 'text-green-600';
    if (adherence >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleCardClick = () => {
    onViewDetails?.(athlete.id);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onSelect?.(athlete.id, e.target.checked);
  };

  return (
    <div 
      className={`backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer relative ${
        selected ? 'ring-2 ring-primary-500 bg-primary-50/50' : ''
      }`}
      onClick={handleCardClick}
    >
      {/* Selection checkbox */}
      {onSelect && (
        <div className="absolute top-4 left-4">
          <input
            type="checkbox"
            checked={selected}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
          />
        </div>
      )}

      {/* Status badge */}
      <div className="absolute top-4 right-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(athlete.status)}`}>
          {athlete.status}
        </span>
      </div>

      {/* Athlete info */}
      <div className="mt-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
            <span className="text-lg font-bold text-primary-700">
              {athlete.firstName.charAt(0)}{athlete.lastName.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {athlete.firstName} {athlete.lastName}
            </h3>
            <p className="text-sm text-gray-600">
              {athlete.age} years • {athlete.gender}
            </p>
          </div>
        </div>

        {/* Sports */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
              🏅 {athlete.primarySport}
            </span>
            {athlete.secondarySport && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                🎯 {athlete.secondarySport}
              </span>
            )}
          </div>
        </div>

        {/* Current protocol */}
        {athlete.currentProtocol && (
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 mb-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-sm font-semibold text-gray-800">Current Protocol</h4>
              <span className={`text-sm font-bold ${getAdherenceColor(athlete.currentProtocol.adherence)}`}>
                {athlete.currentProtocol.adherence}%
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{athlete.currentProtocol.name}</p>
            <p className="text-xs text-gray-500">
              Next delivery: {new Date(athlete.currentProtocol.nextDelivery).toLocaleDateString()}
            </p>
          </div>
        )}

        {/* Health metrics preview */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/60 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-blue-600">{athlete.healthMetrics.averages.sleepQuality}</div>
            <div className="text-xs text-gray-600">Sleep Quality</div>
          </div>
          <div className="bg-white/60 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-green-600">{athlete.healthMetrics.averages.recoveryScore}</div>
            <div className="text-xs text-gray-600">Recovery</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails?.(athlete.id);
            }}
            className="flex-1 py-2 px-3 bg-white/60 border border-white/40 rounded-lg text-sm font-medium text-gray-700 hover:bg-white/80 transition-all duration-300"
          >
            View Details
          </button>
          {athlete.currentProtocol && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditProtocol?.(athlete.id);
              }}
              className="flex-1 py-2 px-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg text-sm font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-300"
            >
              Edit Protocol
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AthleteCard;