// src/components/visualizations/PercentileChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';

interface PercentileChartProps {
  userValue: number;
  percentile: number;
  demographic: string;
  className?: string;
}

export const PercentileChart: React.FC<PercentileChartProps> = ({
  userValue,
  percentile,
  demographic,
  className = '',
}) => {
  // Generate mock distribution data
  const generateDistributionData = () => {
    const data = [];
    const baseValue = userValue / (percentile / 100);
    
    for (let i = 10; i <= 90; i += 10) {
      const value = baseValue * (i / 100);
      data.push({
        percentile: `${i}th`,
        value: Math.round(value),
        isUser: Math.abs(i - percentile) < 5,
      });
    }
    
    return data;
  };

  const data = generateDistributionData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {label} percentile
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Total: {payload[0].value} kg
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={className}>
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Distribution for: <span className="font-medium">{demographic}</span>
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          You're in the <span className="font-semibold text-primary-600 dark:text-primary-400">
            {percentile.toFixed(0)}th percentile
          </span>
        </p>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="percentile" 
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine 
              x={`${Math.round(percentile / 10) * 10}th`}
              stroke="#EF4444" 
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            <Bar 
              dataKey="value" 
              fill="#E5E7EB"
              fillOpacity={1}
              stroke="none"
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.isUser ? '#3B82F6' : '#E5E7EB'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-2 flex items-center justify-center space-x-4 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
          <span className="text-gray-600 dark:text-gray-300">Your Range</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-300 rounded mr-2"></div>
          <span className="text-gray-600 dark:text-gray-300">Peer Data</span>
        </div>
      </div>
    </div>
  );
};