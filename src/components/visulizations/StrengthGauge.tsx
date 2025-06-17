// src/components/visualizations/StrengthGauge.tsx
import React from 'react';

interface StrengthGaugeProps {
  predicted: number;
  current?: number;
  max: number;
  className?: string;
}

export const StrengthGauge: React.FC<StrengthGaugeProps> = ({
  predicted,
  current,
  max,
  className = '',
}) => {
  const predictedPercentage = (predicted / max) * 100;
  const currentPercentage = current ? (current / max) * 100 : 0;
  
  const radius = 80;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  
  const predictedStrokeDasharray = `${(predictedPercentage / 100) * circumference} ${circumference}`;
  const currentStrokeDasharray = current 
    ? `${(currentPercentage / 100) * circumference} ${circumference}`
    : '0 0';

  return (
    <div className={`relative ${className}`}>
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          stroke="rgba(156, 163, 175, 0.3)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        
        {/* Current progress (if available) */}
        {current && (
          <circle
            stroke="#10B981"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={currentStrokeDasharray}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-1000 ease-out"
          />
        )}
        
        {/* Predicted progress */}
        <circle
          stroke="#3B82F6"
          fill="transparent"
          strokeWidth={strokeWidth * 0.6}
          strokeDasharray={predictedStrokeDasharray}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-1000 ease-out"
          strokeDashoffset={current ? (currentPercentage / 100) * circumference : 0}
        />
      </svg>
      
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">
            {predicted.toFixed(0)}
          </div>
          <div className="text-sm text-primary-100">
            kg total
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex justify-center space-x-4 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-white">Predicted</span>
        </div>
        {current && (
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-white">Current</span>
          </div>
        )}
      </div>
    </div>
  );
};