// src/components/pages/MeetLog.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LoadingSpinner } from '../common/LoadingSpinner.tsx';
import { formatDate, formatWeight, formatDelta } from '../../utils/formatters';
import { 
  Plus, 
  Calendar, 
  Trophy, 
  TrendingUp, 
  TrendingDown,
  MoreVertical,
} from 'lucide-react';
import type { MeetEntry } from '../../types/meet';

const MeetLog: React.FC = () => {
  const { user } = useAuth();
  const [meets, setMeets] = useState<MeetEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    // Mock data for demo - in real app, fetch from API
    const generateMockMeets = (): MeetEntry[] => {
      const mockMeets: MeetEntry[] = [
        {
          id: '1',
          athleteId: user?.id || '',
          meetName: 'State Championships 2024',
          meetDate: '2024-05-15',
          federation: 'USAPL',
          weightClass: '75kg',
          bodyweight: 74.2,
          equipment: 'Raw',
          actualSquat: 185,
          actualBench: 125,
          actualDeadlift: 210,
          actualTotal: 520,
          wilksScore: 342.5,
          predictedTotal: 510,
          delta: 10,
          placement: 2,
          notes: 'PR total! Felt great on platform.',
          createdAt: '2024-05-16T10:00:00Z',
          updatedAt: '2024-05-16T10:00:00Z',
        },
        {
          id: '2',
          athleteId: user?.id || '',
          meetName: 'Local Gym Meet',
          meetDate: '2024-03-22',
          federation: 'Local',
          weightClass: '75kg',
          bodyweight: 75.8,
          equipment: 'Raw',
          actualSquat: 180,
          actualBench: 120,
          actualDeadlift: 205,
          actualTotal: 505,
          wilksScore: 331.2,
          predictedTotal: 495,
          delta: 10,
          placement: 1,
          notes: 'Good opener meet to prepare for states.',
          createdAt: '2024-03-23T14:30:00Z',
          updatedAt: '2024-03-23T14:30:00Z',
        },
        {
          id: '3',
          athleteId: user?.id || '',
          meetName: 'Winter Classic 2024',
          meetDate: '2024-01-20',
          federation: 'USAPL',
          weightClass: '75kg',
          bodyweight: 76.1,
          equipment: 'Raw',
          actualSquat: 175,
          actualBench: 115,
          actualDeadlift: 200,
          actualTotal: 490,
          wilksScore: 320.1,
          predictedTotal: 485,
          delta: 5,
          placement: 3,
          notes: 'Missed second bench attempt, but still a solid meet.',
          createdAt: '2024-01-21T09:15:00Z',
          updatedAt: '2024-01-21T09:15:00Z',
        },
      ];
      return mockMeets;
    };

    const loadMeets = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        const mockData = generateMockMeets();
        setMeets(mockData);
      } catch (error) {
        console.error('Failed to load meets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMeets();
  }, [user]);

  const stats = {
    totalMeets: meets.length,
    avgTotal: meets.length > 0 ? Math.round(meets.reduce((sum, meet) => sum + meet.actualTotal, 0) / meets.length) : 0,
    bestTotal: meets.length > 0 ? Math.max(...meets.map(meet => meet.actualTotal)) : 0,
    avgAccuracy: meets.length > 0 ? Math.round(meets.reduce((sum, meet) => sum + Math.abs(meet.delta || 0), 0) / meets.length) : 0,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSpinner size="lg" message="Loading your meet history..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Meet Log
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Track your competition history and performance
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Meet
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalMeets}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Total Meets
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Trophy className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatWeight(stats.bestTotal)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Best Total
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatWeight(stats.avgTotal)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Avg Total
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ±{stats.avgAccuracy}kg
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Avg Accuracy
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Meets Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Competition History
            </h2>
          </div>
          
          {meets.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No meets logged yet
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Start tracking your competition history by adding your first meet.
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Add Your First Meet
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Meet
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      vs Predicted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Placement
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Wilks
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {meets.map((meet) => {
                    const delta = formatDelta(meet.delta || 0);
                    return (
                      <tr key={meet.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {meet.meetName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {meet.federation} • {meet.equipment}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {formatDate(meet.meetDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatWeight(meet.actualTotal)}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            S: {formatWeight(meet.actualSquat)} B: {formatWeight(meet.actualBench)} D: {formatWeight(meet.actualDeadlift)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            delta.color === 'success' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                              : delta.color === 'danger'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {delta.text}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {meet.placement ? `${meet.placement}${getOrdinalSuffix(meet.placement)}` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {meet.wilksScore?.toFixed(1) || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function getOrdinalSuffix(n: number): string {
  const lastDigit = n % 10;
  const lastTwoDigits = n % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return 'th';
  }
  
  switch (lastDigit) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

export default MeetLog;