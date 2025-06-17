// src/services/coach.ts - New Mock Service for Coach Data
import type { CoachDashboardData } from '../types/coach';
import { logger } from '../utils/logger';

export class CoachService {
  private mockCoachData: Record<string, CoachDashboardData> = {
    'coach-1': {
      athletes: [
        {
          id: 'athlete-1',
          name: 'Sarah Johnson',
          email: 'demo@athlete.com',
          sex: 'F',
          age: 28,
          bodyweight: 68.5,
          equipment: 'Raw',
          lastPrediction: {
            total_pred: 450,
            confidence: 0.87,
            percentile: 72,
            pi_low: 430,
            pi_high: 470,
          },
          recentProgress: 8.5,
          nextMeet: {
            id: 'meet-upcoming-1',
            athleteId: 'athlete-1',
            meetName: 'National Championships',
            meetDate: '2024-08-15',
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
          id: 'athlete-2',
          name: 'Marcus Chen',
          email: 'athlete2@demo.com',
          sex: 'M',
          age: 32,
          bodyweight: 82.1,
          equipment: 'Wraps',
          lastPrediction: {
            total_pred: 590,
            confidence: 0.82,
            percentile: 68,
            pi_low: 570,
            pi_high: 610,
          },
          recentProgress: -2.1,
          riskFlags: ['performance_drop'],
          predictionAccuracy: 18.7,
        },
        {
          id: 'athlete-3',
          name: 'Alex Rivera',
          email: 'alex@demo.com',
          sex: 'Mx',
          age: 25,
          bodyweight: 75.2,
          equipment: 'Raw',
          lastPrediction: {
            total_pred: 420,
            confidence: 0.89,
            percentile: 78,
            pi_low: 405,
            pi_high: 435,
          },
          recentProgress: 15.2,
          riskFlags: [],
          predictionAccuracy: 9.8,
        },
      ],
      teamStats: {
        totalAthletes: 3,
        averageProgress: 7.2,
        upcomingMeetsCount: 1,
        equipmentDistribution: {
          'Raw': 2,
          'Wraps': 1,
          'Single-ply': 0,
          'Multi-ply': 0,
          'Straps': 0,
          'Unlimited': 0,
        },
        ageDistribution: {
          '20-29': 2,
          '30-39': 1,
          '40+': 0,
        },
        sexDistribution: {
          'M': 1,
          'F': 1,
          'Mx': 1,
        },
      },
      upcomingMeets: [
        {
          id: 'meet-upcoming-1',
          athleteId: 'athlete-1',
          meetName: 'National Championships',
          meetDate: '2024-08-15',
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
      ],
      alerts: [
        {
          id: 'alert-1',
          athleteId: 'athlete-2',
          athleteName: 'Marcus Chen',
          type: 'performance_drop',
          severity: 'medium',
          message: 'Recent training data shows a 2.1% decrease in predicted performance. Consider reviewing training load and recovery.',
          actionRequired: true,
          createdAt: '2024-06-17T08:00:00Z',
        },
        {
          id: 'alert-2',
          athleteId: 'athlete-1',
          athleteName: 'Sarah Johnson',
          type: 'meet_approaching',
          severity: 'low',
          message: 'National Championships in 8 weeks. Time to finalize competition strategy and peak.',
          actionRequired: false,
          createdAt: '2024-06-17T07:30:00Z',
        },
      ],
    },
  };

  async getCoachDashboard(coachId: string): Promise<CoachDashboardData> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const data = this.mockCoachData[coachId];
    if (!data) {
      throw new Error('Coach dashboard data not found');
    }
    
    logger.debug('Retrieved coach dashboard data', { coachId, athleteCount: data.athletes.length });
    return data;
  }

  async addAthlete(coachId: string, athleteId: string): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    logger.info('Athlete added to coach', { coachId, athleteId });
    // In a real app, this would update the database relationship
  }

  async removeAthlete(coachId: string, athleteId: string): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const data = this.mockCoachData[coachId];
    if (data) {
      data.athletes = data.athletes.filter(a => a.id !== athleteId);
      data.teamStats.totalAthletes = data.athletes.length;
    }
    
    logger.info('Athlete removed from coach', { coachId, athleteId });
  }

  async dismissAlert(alertId: string): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Remove alert from all coaches
    for (const coachId in this.mockCoachData) {
      const data = this.mockCoachData[coachId];
      data.alerts = data.alerts.filter(a => a.id !== alertId);
    }
    
    logger.info('Alert dismissed', { alertId });
  }
}

export const coachService = new CoachService();
