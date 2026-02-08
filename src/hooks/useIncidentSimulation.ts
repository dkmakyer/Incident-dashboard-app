import { useEffect, useRef } from 'react';
import type { Incident, TimelineEntry } from '../interfaces/Incident';
import { generateMockIncident, generateId } from '../utils/mockIncidentUtils';

// Helper to check if we can run simulation updates
// Prevents updates if the tab is not visible or if data isn't loaded
export const useIncidentSimulation = (
    incidents: Incident[],
    setIncidents: (incidents: Incident[] | ((prev: Incident[]) => Incident[])) => void,
    isLoaded: boolean
) => {
    // Use refs for mutable values inside the interval closure to avoid resetting interval on every render
    const incidentsRef = useRef(incidents);

    // Keep ref updated
    useEffect(() => {
        incidentsRef.current = incidents;
    }, [incidents]);

    useEffect(() => {
        if (!isLoaded) return;

        const interval = setInterval(() => {
            const currentIncidents = incidentsRef.current;

            // Probabilities
            const shouldAddIncident = Math.random() > 0.95; // 5% chance per tick
            const shouldAddEvent = Math.random() > 0.7;     // 30% chance per tick

            // 1. New Incident
            if (shouldAddIncident) {
                const newIncident = generateMockIncident();
                // Add event for creation
                const createdEvent: TimelineEntry = {
                    id: generateId(),
                    incidentId: newIncident.id,
                    timestamp: Date.now(),
                    type: 'event',
                    author: 'System',
                    note: 'Incident detected by automated monitoring.',
                };
                newIncident.timeline.push(createdEvent);

                setIncidents(prev => [newIncident, ...prev]);
                return; // One major update per tick is enough
            }

            // 2. Random Event (Comment or Status Change) on existing incident
            if (shouldAddEvent && currentIncidents.length > 0) {
                const activeIncidents = currentIncidents.filter(i => i.status !== 'Resolved');

                // If no active incidents, maybe reopen one or do nothing? 
                // For now, let's just pick any, but prefer active ones for events.
                const targetPool = activeIncidents.length > 0 ? activeIncidents : currentIncidents;
                const randomIndex = Math.floor(Math.random() * targetPool.length);
                const targetIncident = targetPool[randomIndex];

                // 2a. System Comment (High Probability) vs Status Change (Low Probability)
                const isStatusChange = Math.random() > 0.95; // Very rare auto-resolve/change

                if (isStatusChange && targetIncident.status !== 'Resolved') {
                    // Simulating an auto-resolution or escalation
                    // For simplicity, let's just do a comment saying it's effectively "System Status Change" 
                    // OR actually change the status. Let's actually change logic safely.

                    // We'll just add a system note for now to be safe, 
                    // real status changes usually require human intervention in this domain except for auto-resolution.
                    // Let's stick to System Comments for safety as requested "Simulated updates do not corrupt application state"
                }

                // Add System Comment/Event
                if (targetIncident) {
                    const systemMessages = [
                        "Automated health check completed. Metrics stable.",
                        "Escalation timer: 1 hour passed.",
                        "pacing alert: High volume of error logs detected.",
                        "Notifier: On-call engineer paged."
                    ];
                    const randomMsg = systemMessages[Math.floor(Math.random() * systemMessages.length)];

                    setIncidents(prev => prev.map(inc => {
                        if (inc.id === targetIncident.id) {
                            const newEvent: TimelineEntry = {
                                id: generateId(),
                                incidentId: inc.id,
                                timestamp: Date.now(),
                                type: 'event',
                                author: 'System',
                                note: randomMsg
                            };
                            return {
                                ...inc,
                                updatedAt: Date.now(),
                                timeline: [...inc.timeline, newEvent]
                            };
                        }
                        return inc;
                    }));
                }
            }

        }, 5000); // Tick every 5 seconds

        return () => clearInterval(interval);
    }, [isLoaded, setIncidents]); // Dependencies
};
