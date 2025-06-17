// src/components/forms/WhatIfSimulator.tsx
import React, { useState } from 'react';
import { usePrediction } from '../../context/PredictionContext';
import { LoadingSpinner } from '../common/LoadingSpinner.tsx';
import { formatWeight, formatDelta } from '../../utils/formatters';
import { EQUIPMENT_OPTIONS } from '../../utils/constants';
import { RefreshCw, Plus, Minus } from 'lucide-react';
import type { PredictionResponse, WhatIfScenario } from '../../types/prediction';
import type { AthleteProfile } from '../../types/athlete';

interface WhatIfSimulatorProps {
  baseProfile: AthleteProfile;
  basePrediction: PredictionResponse;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({
  baseProfile,
  basePrediction,
}) => {
  const { getWhatIfPrediction, whatIfScenarios, isLoading } = usePrediction();
  
  const [scenario, setScenario] = useState<WhatIfScenario>({
    ageAdjustment: 0,
    bodyweightAdjustment: 0,
    equipmentChange: undefined,
    scenario_name: '',
  });

  const handleRunScenario = async () => {
    if (scenario.ageAdjustment === 0 && 
        scenario.bodyweightAdjustment === 0 && 
        !scenario.equipmentChange) {
      return;
    }

    try {
      await getWhatIfPrediction(scenario);
      // Reset scenario after successful run
      setScenario({
        ageAdjustment: 0,
        bodyweightAdjustment: 0,
        equipmentChange: undefined,
        scenario_name: '',
      });
    } catch (error) {
      console.error('Failed to run what-if scenario:', error);
    }
  };

  const adjustAge = (delta: number) => {
    setScenario(prev => ({
      ...prev,
      ageAdjustment: Math.max(-20, Math.min(20, prev.ageAdjustment + delta))
    }));
  };

  const adjustBodyweight = (delta: number) => {
    setScenario(prev => ({
      ...prev,
      bodyweightAdjustment: Math.max(-30, Math.min(30, prev.bodyweightAdjustment + delta))
    }));
  };

  const currentAge = baseProfile.age + scenario.ageAdjustment;
  const currentBodyweight = baseProfile.bodyweight + scenario.bodyweightAdjustment;
  const currentEquipment = scenario.equipmentChange || baseProfile.equipment;

  const hasChanges = scenario.ageAdjustment !== 0 || 
                    scenario.bodyweightAdjustment !== 0 || 
                    scenario.equipmentChange;

  return (
    <div className="space-y-6">
      {/* Current Scenario */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Scenario Builder
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Age Adjustment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Age Adjustment
            </label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => adjustAge(-1)}
                className="p-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="flex-1 text-center">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {currentAge} years
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {scenario.ageAdjustment !== 0 && (
                    <span className={scenario.ageAdjustment > 0 ? 'text-red-600' : 'text-green-600'}>
                      {scenario.ageAdjustment > 0 ? '+' : ''}{scenario.ageAdjustment}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => adjustAge(1)}
                className="p-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Bodyweight Adjustment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bodyweight Adjustment
            </label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => adjustBodyweight(-2.5)}
                className="p-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="flex-1 text-center">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatWeight(currentBodyweight)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {scenario.bodyweightAdjustment !== 0 && (
                    <span className={scenario.bodyweightAdjustment > 0 ? 'text-red-600' : 'text-green-600'}>
                      {scenario.bodyweightAdjustment > 0 ? '+' : ''}{formatWeight(scenario.bodyweightAdjustment)}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => adjustBodyweight(2.5)}
                className="p-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Equipment Change */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Equipment
            </label>
            <select
              value={scenario.equipmentChange || baseProfile.equipment}
              onChange={(e) => setScenario(prev => ({
                ...prev,
                equipmentChange: e.target.value === baseProfile.equipment ? undefined : e.target.value as any
              }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {EQUIPMENT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {scenario.equipmentChange && (
              <p className="mt-1 text-sm text-primary-600 dark:text-primary-400">
                Changed from {baseProfile.equipment}
              </p>
            )}
          </div>
        </div>

        {/* Run Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleRunScenario}
            disabled={!hasChanges || isLoading}
            className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Running Scenario...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Run Scenario
              </>
            )}
          </button>
        </div>
      </div>

      {/* Scenario Results */}
      {whatIfScenarios.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Scenario Results
          </h3>
          <div className="space-y-4">
            {whatIfScenarios.map((scenarioResult, index) => {
              const delta = scenarioResult.prediction.total_pred - basePrediction.total_pred;
              const deltaFormatted = formatDelta(delta);
              
              return (
                <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Scenario {index + 1}
                      </h4>
                      <div className="text-sm text-gray-500 dark:text-gray-400 space-x-4">
                        {scenarioResult.scenario.ageAdjustment !== 0 && (
                          <span>
                            Age: {scenarioResult.scenario.ageAdjustment > 0 ? '+' : ''}
                            {scenarioResult.scenario.ageAdjustment} years
                          </span>
                        )}
                        {scenarioResult.scenario.bodyweightAdjustment !== 0 && (
                          <span>
                            Weight: {scenarioResult.scenario.bodyweightAdjustment > 0 ? '+' : ''}
                            {formatWeight(scenarioResult.scenario.bodyweightAdjustment)}
                          </span>
                        )}
                        {scenarioResult.scenario.equipmentChange && (
                          <span>Equipment: {scenarioResult.scenario.equipmentChange}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        {formatWeight(scenarioResult.prediction.total_pred)}
                      </div>
                      <div className={`text-sm font-medium ${deltaFormatted.color === 'success' ? 'text-green-600' : deltaFormatted.color === 'danger' ? 'text-red-600' : 'text-gray-500'}`}>
                        {deltaFormatted.text}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};