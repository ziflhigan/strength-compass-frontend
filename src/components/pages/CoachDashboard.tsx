// src/components/pages/CoachDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { formatWeight, formatDate, formatDelta } from '../../utils/formatters';
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  AlertTriangle,
  Search, 
  Plus,
  MoreVertical,
  Eye,
  MessageCircle,
} from 'lucide-react';
import type { 
  CoachDashboardData, 
  AthleteWithMetrics, 
  TeamStatistics, 
  CoachAlert 
} from '../../types/coach';

const CoachDashboard: React.FC = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<CoachDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'needs_attention' | 'upcoming_meets'>('all');

  useEffect(() => {
    // Mock data for demo - in real app, fetch from API
    const generateMockData = (): CoachDashboardData => {
      const athletes: AthleteWithMetrics[] = [
        {
          id: '1',
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          sex: 'F',
          age: 28,
          bodyweight: 68.5,
          equipment: 'Raw',
          lastPrediction: {
            total_pred: 425,
            confidence: 0.87,
            percentile: 72,
            pi_low: 405,
            pi_high: 445,
          },
          recentProgress: 8.5,
          nextMeet: {
            id: 'meet1',
            athleteId: '1',
            meetName: 'State Championships',
            meetDate: '2024-07-15',
            federation: 'USAPL',
            weightClass: '69kg',
            bodyweight: 68.5,
            equipment: 'Raw',
            actualSquat: 0,
            actualBench: 0,
            actualDeadlift: 0,
            actualTotal: 0,
            createdAt: '2024-06-01T10:00:00Z',
            updatedAt: '2024-06-01T10:00:00Z',
          },
          riskFlags: [],
          predictionAccuracy: 12.3,
        },
        {
          id: '2',
          name: 'Marcus Chen',
          email: 'marcus@example.com',
          sex: 'M',
          age: 32,
          bodyweight: 82.1,
          equipment: 'Wraps',
          lastPrediction: {
            total_pred: 580,
            confidence: 0.82,
            percentile: 68,
            pi_low: 555,
            pi_high: 605,
          },
          recentProgress: -2.1,
          riskFlags: ['performance_drop'],
          predictionAccuracy: 18.7,
        },
        {
          id: '3',
          name: 'Elena Rodriguez',
          email: 'elena@example.com',
          sex: 'F',
          age: 45,
          bodyweight: 72.3,
          equipment: 'Raw',
          lastPrediction: {
            total_pred: 385,
            confidence: 0.89,
            percentile: 84,
            pi_low: 370,
            pi_high: 400,
          },
          recentProgress: 12.7,
          nextMeet: {
            id: 'meet2',
            athleteId: '3',
            meetName: 'Masters Nationals',
            meetDate: '2024-08-22',
            federation: 'USAPL',
            weightClass: '72kg',
            bodyweight: 72.3,
            equipment: 'Raw',
            actualSquat: 0,
            actualBench: 0,
            actualDeadlift: 0,
            actualTotal: 0,
            createdAt: '2024-06-01T10:00:00Z',
            updatedAt: '2024-06-01T10:00:00Z',
          },
          riskFlags: [],
          predictionAccuracy: 8.9,
        },
      ];

      const teamStats: TeamStatistics = {
        totalAthletes: athletes.length,
        averageProgress: athletes.reduce((sum, a) => sum + a.recentProgress, 0) / athletes.length,
        upcomingMeetsCount: athletes.filter(a => a.nextMeet).length,
        equipmentDistribution: {
          'Raw': 2,
          'Wraps': 1,
          'Single-ply': 0,
          'Multi-ply': 0,
          'Straps': 0,
          'Unlimited': 0,
        },
        ageDistribution: {
          '20-29': 1,
          '30-39': 1,
          '40+': 1,
        },
        sexDistribution: {
          'M': 1,
          'F': 2,
          'Mx': 0,
        },
      };

      const alerts: CoachAlert[] = [
        {
          id: '1',
          athleteId: '2',
          athleteName: 'Marcus Chen',
          type: 'performance_drop',
          severity: 'medium',
          message: 'Recent training data shows a 2.1% decrease in predicted performance. Consider reviewing training load.',
          actionRequired: true,
          createdAt: '2024-06-17T08:00:00Z',
        },
        {
          id: '2',
          athleteId: '1',
          athleteName: 'Sarah Johnson',
          type: 'meet_approaching',
          severity: 'low',
          message: 'State Championships in 4 weeks. Time to start competition preparation phase.',
          actionRequired: false,
          createdAt: '2024-06-17T07:30:00Z',
        },
      ];

      return {
        athletes,
        teamStats,
        upcomingMeets: athletes.filter(a => a.nextMeet).map(a => a.nextMeet!),
        alerts,
      };
    };

    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockData = generateMockData();
        setDashboardData(mockData);
      } catch (error) {
        console.error('Failed to load coach dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSpinner size="lg" message="Loading coach dashboard..." />
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Failed to load dashboard data
            </h2>
          </div>
        </div>
      </div>
    );
  }

  const filteredAthletes = dashboardData.athletes.filter(athlete => {
    const matchesSearch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         athlete.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' ||
                         (selectedFilter === 'needs_attention' && athlete.riskFlags.length > 0) ||
                         (selectedFilter === 'upcoming_meets' && athlete.nextMeet);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Coach Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Monitor your athletes' progress and upcoming competitions
            </p>
          </div>
          <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Athlete
          </button>
        </div>

        {/* Team Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardData.teamStats.totalAthletes}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Total Athletes
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardData.teamStats.averageProgress.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Avg Progress
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardData.teamStats.upcomingMeetsCount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Upcoming Meets
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardData.alerts.filter(a => a.actionRequired).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Action Required
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {dashboardData.alerts.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
              Alerts & Notifications
            </h2>
            <div className="space-y-3">
              {dashboardData.alerts.map(alert => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.severity === 'high' 
                      ? 'bg-red-50 border-red-400 dark:bg-red-900/20 dark:border-red-600'
                      : alert.severity === 'medium'
                      ? 'bg-yellow-50 border-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-600'
                      : 'bg-blue-50 border-blue-400 dark:bg-blue-900/20 dark:border-blue-600'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {alert.athleteName}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {alert.message}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        View
                      </button>
                      {alert.actionRequired && (
                        <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                          Take Action
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Athletes Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Athletes
              </h2>
              <div className="flex space-x-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search athletes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                </div>
                
                {/* Filter */}
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  <option value="all">All Athletes</option>
                  <option value="needs_attention">Needs Attention</option>
                  <option value="upcoming_meets">Upcoming Meets</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Athlete
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Latest Prediction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Next Meet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Accuracy
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAthletes.map((athlete) => {
                  const progressFormatted = formatDelta(athlete.recentProgress, '%');
                  return (
                    <tr key={athlete.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                              {athlete.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {athlete.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {athlete.sex}, {athlete.age}y, {formatWeight(athlete.bodyweight)}, {athlete.equipment}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {athlete.lastPrediction ? (
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {formatWeight(athlete.lastPrediction.total_pred)}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {((athlete.lastPrediction.confidence || 0) * 100).toFixed(0)}% confidence
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500 dark:text-gray-400">No prediction</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          progressFormatted.color === 'success' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                            : progressFormatted.color === 'danger'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {progressFormatted.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {athlete.nextMeet ? (
                          <div>
                            <div className="font-medium">{athlete.nextMeet.meetName}</div>
                            <div className="text-gray-500 dark:text-gray-400">
                              {formatDate(athlete.nextMeet.meetDate)}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400">None scheduled</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        ±{athlete.predictionAccuracy.toFixed(1)}kg
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {athlete.riskFlags.length > 0 ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                            Needs Attention
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                            On Track
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                            <MessageCircle className="h-4 w-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;