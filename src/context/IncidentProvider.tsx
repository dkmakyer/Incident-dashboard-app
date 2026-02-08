import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Incident, TimelineEntry } from '../interfaces/Incident';
import { IncidentContext } from './IncidentContext';
import { generateMockIncident, INITIAL_INCIDENTS, generateId } from '../utils/mockIncidentUtils';

export const IncidentProvider = ({ children }: { children: ReactNode }) => {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Initial Load Simulation
    useEffect(() => {
        const timer = setTimeout(() => {
            try {
                // --- MANUAL ERROR TRIGGER ---
                // Comment out the next line to return to normal behavior
                // throw new Error("Simulated API Error: Failed to fetch incidents.");
                // -----------------------------

                setIncidents(INITIAL_INCIDENTS);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to load incidents'));
                setLoading(false);
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // Live Update Simulation (New incident every 10-20 seconds)
    useEffect(() => {
        if (loading) return;

        const interval = setInterval(() => {
            setIncidents(prev => {
                const shouldAddIncident = Math.random() > 0.8;
                const shouldAddEvent = Math.random() > 0.6;

                let newIncidents = [...prev];

                // 1. New Incident
                if (shouldAddIncident) {
                    newIncidents = [generateMockIncident(), ...newIncidents];
                }

                // 2. Random Event on existing incident
                if (shouldAddEvent && newIncidents.length > 0) {
                    const randomIndex = Math.floor(Math.random() * newIncidents.length);
                    const incident = newIncidents[randomIndex];
                    // Only add event if not resolved (optional rule)
                    if (incident.status !== 'Resolved') {
                        const newEvent: TimelineEntry = {
                            id: generateId(),
                            incidentId: incident.id,
                            timestamp: Date.now(),
                            type: 'event',
                            author: 'System',
                            note: 'Automated health check completed. Metrics stable.'
                        };

                        newIncidents[randomIndex] = {
                            ...incident,
                            timeline: [...incident.timeline, newEvent]
                        };
                    }
                }

                return newIncidents;
            });
        }, 5000);

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

    const changeIncidentStatus = (id: string, newStatus: string, note: string) => {
        setIncidents(prevIncidents => prevIncidents.map(incident => {
            if (incident.id === id) {
                const timestamp = Date.now();
                const newEntry: TimelineEntry = {
                    id: generateId(),
                    incidentId: id,
                    timestamp,
                    type: 'status_change',
                    author: 'User', // Hardcoded for now, would come from auth context
                    note,
                    previousStatus: incident.status,
                    newStatus
                };

                return {
                    ...incident,
                    status: newStatus as any, // Cast to any to avoid strict union issues if string passed
                    updatedAt: timestamp,
                    timeline: [...incident.timeline, newEntry]
                };
            }
            return incident;
        }));
    };

    const addComment = (id: string, comment: string) => {
        setIncidents(prevIncidents => prevIncidents.map(incident => {
            if (incident.id === id) {
                const newEntry: TimelineEntry = {
                    id: generateId(),
                    incidentId: id,
                    timestamp: Date.now(),
                    type: 'comment',
                    author: 'User',
                    note: comment
                };

                return {
                    ...incident,
                    updatedAt: Date.now(), // Comments update the incident 'last activity'
                    timeline: [...incident.timeline, newEntry]
                };
            }
            return incident;
        }));
    };

    return (
        <IncidentContext.Provider value={{
            incidents,
            loading,
            error,
            refreshIncidents,
            updateIncident,
            changeIncidentStatus,
            addComment
        }}>
            {children}
        </IncidentContext.Provider>
    );
};
