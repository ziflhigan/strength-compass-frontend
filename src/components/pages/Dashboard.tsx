// src/components/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePrediction } from '../../context/PredictionContext';
import { AthleteProfileForm } from '../../components/forms/AthleteProfileForm';
import { PredictionDashboard } from '../../components/dashboard/PredictionDashboard';
import { WhatIfSimulator } from '../../components/forms/WhatIfSimulator';
import { ProgressVisualizer } from '../visulizations/ProgressVisualizer';
import { Activity, TrendingUp, Target, Users } from 'lucide-react';
import type { AthleteProfile } from '../../types/athlete';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { 
    currentProfile, 
    currentPrediction, 
    updateProfile, 
    getPrediction, 
    isLoading, 
    error 
  } = usePrediction();
  
  const [activeTab, setActiveTab] = useState<'profile' | 'prediction' | 'whatif' | 'progress'>('profile');
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    // Check if user has a complete profile
    if (user?.profile) {
      updateProfile(user.profile);
      setHasProfile(true);
      setActiveTab('prediction');
    }
  }, [user, updateProfile]);

  const handleProfileSubmit = async (profile: AthleteProfile) => {
    try {
      updateProfile(profile);
      await getPrediction(profile);
      setHasProfile(true);
      setActiveTab('prediction');
    } catch (error) {
      console.error('Failed to get prediction:', error);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: Users, disabled: false },
    { id: 'prediction', label: 'Prediction', icon: Activity, disabled: !hasProfile },
    { id: 'whatif', label: 'What-If', icon: Target, disabled: !currentPrediction },
    { id: 'progress', label: 'Progress', icon: TrendingUp, disabled: !hasProfile },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Track your strength journey with data-driven insights
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-8">
          <nav className="flex space-x-0" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isDisabled = tab.disabled;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => !isDisabled && setActiveTab(tab.id as any)}
                  disabled={isDisabled}
                  className={`
                    flex-1 flex items-center justify-center px-4 py-4 text-sm font-medium border-b-2 transition-colors
                    ${isActive 
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
                      : 'border-transparent'
                    }
                    ${isDisabled 
                      ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Something went wrong
                </h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Athlete Profile
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {hasProfile ? 'Update your profile information' : 'Complete your profile to get personalized predictions'}
                </p>
              </div>
              <AthleteProfileForm 
                initialData={currentProfile || undefined}
                onSubmit={handleProfileSubmit}
                isLoading={isLoading}
              />
            </div>
          )}

          {/* Prediction Tab */}
          {activeTab === 'prediction' && currentProfile && (
            <PredictionDashboard 
              profile={currentProfile}
              prediction={currentPrediction}
              isLoading={isLoading}
            />
          )}

          {/* What-If Tab */}
          {activeTab === 'whatif' && currentProfile && currentPrediction && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    What-If Scenarios
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Explore how changes might affect your predicted performance
                  </p>
                </div>
                <WhatIfSimulator 
                  baseProfile={currentProfile}
                  basePrediction={currentPrediction}
                />
              </div>
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Progress Tracking
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Visualize your strength journey over time
                </p>
              </div>
              <ProgressVisualizer athleteId={user?.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
