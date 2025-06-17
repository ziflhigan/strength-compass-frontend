// src/services/meetLog.ts - New Mock Service for Meet Data
import type { MeetEntry, MeetPerformance } from '@/types';
import { logger } from '../utils/logger';

export class MeetLogService {
  private mockMeets: Record<string, MeetEntry[]> = {
    'athlete-1': [
      {
        id: '1',
        athleteId: 'athlete-1',
        meetName: 'State Championships 2024',
        meetDate: '2024-05-15',
        federation: 'USAPL',
        weightClass: '69kg',
        bodyweight: 68.2,
        equipment: 'Raw',
        actualSquat: 160,
        actualBench: 105,
        actualDeadlift: 185,
        actualTotal: 450,
        wilksScore: 298.5,
        predictedTotal: 445,
        delta: 5,
        placement: 2,
        notes: 'Great meet! Hit all my openers and got a PR total.',
        createdAt: '2024-05-16T10:00:00Z',
        updatedAt: '2024-05-16T10:00:00Z',
      },
      {
        id: '2',
        athleteId: 'athlete-1',
        meetName: 'Local Spring Classic',
        meetDate: '2024-03-10',
        federation: 'Local',
        weightClass: '69kg',
        bodyweight: 69.1,
        equipment: 'Raw',
        actualSquat: 155,
        actualBench: 102.5,
        actualDeadlift: 180,
        actualTotal: 437.5,
        wilksScore: 289.2,
        predictedTotal: 440,
        delta: -2.5,
        placement: 1,
        notes: 'First meet of the year, felt rusty but got the win.',
        createdAt: '2024-03-11T14:30:00Z',
        updatedAt: '2024-03-11T14:30:00Z',
      },
    ],
    'athlete-2': [
      {
        id: '3',
        athleteId: 'athlete-2',
        meetName: 'Regional Championships',
        meetDate: '2024-04-20',
        federation: 'USAPL',
        weightClass: '83kg',
        bodyweight: 82.1,
        equipment: 'Wraps',
        actualSquat: 220,
        actualBench: 155,
        actualDeadlift: 240,
        actualTotal: 615,
        wilksScore: 378.2,
        predictedTotal: 590,
        delta: 25,
        placement: 1,
        notes: 'Exceeded expectations! New competition PR.',
        createdAt: '2024-04-21T09:15:00Z',
        updatedAt: '2024-04-21T09:15:00Z',
      },
    ],
  };

  async getMeets(athleteId: string): Promise<MeetEntry[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const meets = this.mockMeets[athleteId] || [];
    logger.debug('Retrieved meets for athlete', { athleteId, count: meets.length });
    
    return meets.sort((a, b) => new Date(b.meetDate).getTime() - new Date(a.meetDate).getTime());
  }

  async addMeet(meet: Omit<MeetEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<MeetEntry> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newMeet: MeetEntry = {
      ...meet,
      id: `meet-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    if (!this.mockMeets[meet.athleteId]) {
      this.mockMeets[meet.athleteId] = [];
    }
    
    this.mockMeets[meet.athleteId].push(newMeet);
    
    logger.info('Meet added successfully', { meetId: newMeet.id, athleteId: meet.athleteId });
    return newMeet;
  }

  async updateMeet(meetId: string, updates: Partial<MeetEntry>): Promise<MeetEntry> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Find and update meet across all athletes
    for (const athleteId in this.mockMeets) {
      const meetIndex = this.mockMeets[athleteId].findIndex(m => m.id === meetId);
      if (meetIndex !== -1) {
        this.mockMeets[athleteId][meetIndex] = {
          ...this.mockMeets[athleteId][meetIndex],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        
        logger.info('Meet updated successfully', { meetId });
        return this.mockMeets[athleteId][meetIndex];
      }
    }
    
    throw new Error('Meet not found');
  }

  async deleteMeet(meetId: string): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Find and delete meet across all athletes
    for (const athleteId in this.mockMeets) {
      const meetIndex = this.mockMeets[athleteId].findIndex(m => m.id === meetId);
      if (meetIndex !== -1) {
        this.mockMeets[athleteId].splice(meetIndex, 1);
        logger.info('Meet deleted successfully', { meetId });
        return;
      }
    }
    
    throw new Error('Meet not found');
  }

  async getProgressData(athleteId: string): Promise<MeetPerformance[]> {
    const meets = await this.getMeets(athleteId);
    
    return meets.map(meet => ({
      date: meet.meetDate,
      total: meet.actualTotal,
      predicted: meet.predictedTotal || meet.actualTotal - (meet.delta || 0),
      bodyweight: meet.bodyweight,
      wilks: meet.wilksScore || 0,
      equipment: meet.equipment,
    }));
  }
}

export const meetLogService = new MeetLogService();