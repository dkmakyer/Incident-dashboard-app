import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Incident } from '../interfaces/Incident';
import { SEVERITIES, SERVICES } from '../constants/incidentConstants';
// import type { Service, Severity, Status } from '../types/common';

interface IncidentContextType {
    incidents: Incident[];
    loading: boolean;
    error: Error | null;
    refreshIncidents: () => void;
    updateIncident: (id: string, updates: Partial<Incident>) => void;
}

// --- Context ---
const IncidentContext = createContext<IncidentContextType | undefined>(undefined);

export const useIncidents = () => {
    const context = useContext(IncidentContext);
    if (!context) {
        throw new Error('useIncidents must be used within an IncidentProvider');
    }
    return context;
};

// --- Mock Data Helpers ---
const generateId = () => Math.random().toString(36).substr(2, 9);

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateMockIncident = (): Incident => ({
    id: generateId(),
    title: `Incident regarding ${getRandomElement(SERVICES)}`,
    description: 'Automated alert triggered due to high latency or error rates.',
    severity: getRandomElement(SEVERITIES),
    status: 'Open', // New incidents usually start as Open
    service: getRandomElement(SERVICES),
    createdAt: Date.now(),
});

const INITIAL_INCIDENTS: Incident[] = [
    { id: '1', title: 'API Latency Spike', description: 'Latency > 500ms', severity: 'High', status: 'Open', service: 'API', createdAt: Date.now() - 1000 * 60 * 5 },
    { id: '2', title: 'Database Connection Error', description: 'Connection pool exhausted', severity: 'Critical', status: 'In Progress', service: 'Database', createdAt: Date.now() - 1000 * 60 * 30 },
    { id: '3', title: 'Payment Gateway Timeout', description: 'Gateway not responding', severity: 'Medium', status: 'Resolved', service: 'Payments', createdAt: Date.now() - 1000 * 60 * 60 * 2 },
];

// --- Provider ---
export const IncidentProvider = ({ children }: { children: ReactNode }) => {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Initial Load Simulation
    useEffect(() => {
        const timer = setTimeout(() => {
            try {
                setIncidents(INITIAL_INCIDENTS);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to load incidents'));
                setLoading(false);
            }
        }, 1500); // 1.5s loading delay

        return () => clearTimeout(timer);
    }, []);

    // Live Update Simulation (New incident every 10-20 seconds)
    useEffect(() => {
        if (loading) return;

        const interval = setInterval(() => {
            // 30% chance to add a new incident
            if (Math.random() > 0.7) {
                const newIncident = generateMockIncident();
                setIncidents(prev => [newIncident, ...prev]);
            }
        }, 5000); // Check every 5 seconds

        return () => clearInterval(interval);
    }, [loading]);

    const refreshIncidents = () => {
        setLoading(true);
        setError(null);
        setIncidents([]); // Clear current list
        // Re-run initial load logic
        setTimeout(() => {
            setIncidents(INITIAL_INCIDENTS);
            setLoading(false);
        }, 1000);
    };

    const updateIncident = (id: string, updates: Partial<Incident>) => {
        setIncidents(prevIncidents => prevIncidents.map(incident => {
            if (incident.id === id) {
                return {
                    ...incident,
                    ...updates,
                    updatedAt: Date.now(),
                };
            }
            return incident;
        }));
    };

    return (
        <IncidentContext.Provider value={{ incidents, loading, error, refreshIncidents, updateIncident }}>
            {children}
        </IncidentContext.Provider>
    );
};
