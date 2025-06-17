// src/components/visualizations/ProgressVisualizer.tsx
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LoadingSpinner } from '../common/LoadingSpinner.tsx';
import { formatDate, formatWeight } from '../../utils/formatters';
import type { MeetPerformance } from '../../types/meet';

interface ProgressVisualizerProps {
  athleteId?: string;
  className?: string;
}

export const ProgressVisualizer: React.FC<ProgressVisualizerProps> = ({
  athleteId,
  className = '',
}) => {
  const [data, setData] = useState<MeetPerformance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Mock data for demo - in real app, fetch from API
    const generateMockData = (): MeetPerformance[] => {
      const baseDate = new Date('2023-01-01');
      const mockData: MeetPerformance[] = [];
      
      for (let i = 0; i < 12; i++) {
        const date = new Date(baseDate);
        date.setMonth(date.getMonth() + i);
        
        const baseTotal = 400 + (i * 5) + (Math.random() * 20 - 10);
        const predicted = baseTotal + (Math.random() * 30 - 15);
        
        mockData.push({
          date: date.toISOString().split('T')[0],
          total: Math.round(baseTotal),
          predicted: Math.round(predicted),
          bodyweight: 75 + (Math.random() * 6 - 3),
          wilks: Math.round((baseTotal / 75) * 100),
          equipment: i % 3 === 0 ? 'Wraps' : 'Raw',
        });
      }
      
      return mockData;
    };

    const loadData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockData = generateMockData();
        setData(mockData);
      } catch (err) {
        setError('Failed to load progress data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [athleteId]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            {formatDate(label)}
          </p>
          <div className="space-y-1">
            <p className="text-sm text-blue-600">
              Actual: {formatWeight(data.total)}
            </p>
            <p className="text-sm text-green-600">
              Predicted: {formatWeight(data.predicted)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Bodyweight: {formatWeight(data.bodyweight)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Equipment: {data.equipment}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className={`flex justify-center items-center h-64 ${className}`}>
        <LoadingSpinner size="lg" message="Loading progress data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center text-red-600 dark:text-red-400 ${className}`}>
        {error}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={`text-center text-gray-500 dark:text-gray-400 ${className}`}>
        <p>No progress data available yet.</p>
        <p className="text-sm mt-1">Start logging your meets to track progress!</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickFormatter={(date) => formatDate(date).split(' ').slice(0, 2).join(' ')}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value}kg`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              name="Actual Total"
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="#10B981" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
              name="Predicted Total"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {data.length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Data Points
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatWeight(data[data.length - 1]?.total || 0)}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Latest Total
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            +{formatWeight((data[data.length - 1]?.total || 0) - (data[0]?.total || 0))}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total Progress
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {Math.round(((data[data.length - 1]?.total || 0) - (data[0]?.total || 0)) / data.length * 12)}kg/yr
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Rate of Progress
          </div>
        </div>
      </div>
    </div>
  );
};