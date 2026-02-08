import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Incident, TimelineEntry } from '../interfaces/Incident';
import { IncidentContext } from './IncidentContext';
import { INITIAL_INCIDENTS, generateId } from '../utils/mockIncidentUtils';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useIncidentSimulation } from '../hooks/useIncidentSimulation';

export const IncidentProvider = ({ children }: { children: ReactNode }) => {
    // Persistence: Use local storage for incidents
    const [incidents, setIncidents] = useLocalStorage<Incident[]>('incident-dashboard-data', []);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Initial Load Logic
    useEffect(() => {
        // Check if we already have data in storage
        if (incidents.length > 0) {
            setLoading(false);
            return;
        }

        // Simulate API fetch if storage is empty
        const timer = setTimeout(() => {
            try {
                setIncidents(INITIAL_INCIDENTS);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to load incidents'));
                setLoading(false);
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, []); // Only run once on mount

    // Decoupled Simulation Logic
    useIncidentSimulation(incidents, setIncidents, !loading);

    const refreshIncidents = () => {
        setLoading(true);
        setError(null);
        // We might want to keep current data while "refreshing" or clear it.
        // For a refresh, let's clear and re-fetch (re-initialize)
        setIncidents([]);

        // Re-run initial load logic simulation
        setTimeout(() => {
            setIncidents(INITIAL_INCIDENTS);
            setLoading(false);
        }, 1000);
    };

    const updateIncident = (id: string, updates: Partial<Incident>) => {
        setIncidents((prevIncidents: Incident[]) => prevIncidents.map((incident: Incident) => {
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
        setIncidents((prevIncidents: Incident[]) => prevIncidents.map((incident: Incident) => {
            if (incident.id === id) {
                const timestamp = Date.now();
                const newEntry: TimelineEntry = {
                    id: generateId(),
                    incidentId: id,
                    timestamp,
                    type: 'status_change',
                    author: 'User', // Hardcoded for now
                    note,
                    previousStatus: incident.status,
                    newStatus
                };

                return {
                    ...incident,
                    status: newStatus as any,
                    updatedAt: timestamp,
                    timeline: [...incident.timeline, newEntry]
                };
            }
            return incident;
        }));
    };

    const addComment = (id: string, comment: string) => {
        setIncidents((prevIncidents: Incident[]) => prevIncidents.map((incident: Incident) => {
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
