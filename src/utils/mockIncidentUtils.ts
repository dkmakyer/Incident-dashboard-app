import type { Incident } from '../interfaces/Incident';
import { SEVERITIES, SERVICES } from '../constants/incidentConstants';

export const generateId = () => Math.random().toString(36).substr(2, 9);
export const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const generateMockIncident = (): Incident => {
    const id = generateId();
    const service = getRandomElement(SERVICES);
    const createdAt = Date.now();

    return {
        id,
        title: `Incident regarding ${service}`,
        description: 'Automated alert triggered due to high latency or error rates.',
        severity: getRandomElement(SEVERITIES),
        status: 'Open',
        service,
        createdAt,
        timeline: [
            {
                id: generateId(),
                incidentId: id,
                timestamp: createdAt,
                type: 'event',
                author: 'System',
                note: 'Incident created automatically by monitoring system.'
            }
        ]
    };
};

export const INITIAL_INCIDENTS: Incident[] = [
    {
        id: '1',
        title: 'API Latency Spike',
        description: 'Latency > 500ms',
        severity: 'High',
        status: 'Open',
        service: 'API',
        createdAt: Date.now() - 1000 * 60 * 5,
        timeline: [
            {
                id: 't1',
                incidentId: '1',
                timestamp: Date.now() - 1000 * 60 * 5,
                type: 'event',
                author: 'System',
                note: 'Incident created.'
            }
        ]
    },
    {
        id: '2',
        title: 'Database Connection Error',
        description: 'Connection pool exhausted',
        severity: 'Critical',
        status: 'In Progress',
        service: 'Database',
        createdAt: Date.now() - 1000 * 60 * 30,
        timeline: [
            {
                id: 't2-1',
                incidentId: '2',
                timestamp: Date.now() - 1000 * 60 * 30,
                type: 'event',
                author: 'System',
                note: 'Incident created.'
            },
            {
                id: 't2-2',
                incidentId: '2',
                timestamp: Date.now() - 1000 * 60 * 15,
                type: 'status_change',
                author: 'System',
                note: 'Status changed from Open to In Progress',
                previousStatus: 'Open',
                newStatus: 'In Progress'
            }
        ]
    },
    {
        id: '3',
        title: 'Payment Gateway Timeout',
        description: 'Gateway not responding',
        severity: 'Medium',
        status: 'Resolved',
        service: 'Payments',
        createdAt: Date.now() - 1000 * 60 * 60 * 2,
        timeline: [
            {
                id: 't3',
                incidentId: '3',
                timestamp: Date.now() - 1000 * 60 * 60 * 2,
                type: 'event',
                author: 'System',
                note: 'Incident created.'
            }
        ]
    },
];
