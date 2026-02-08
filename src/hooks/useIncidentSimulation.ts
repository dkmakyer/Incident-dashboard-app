import { useEffect, useRef } from 'react';
import type { Incident, TimelineEntry } from '../interfaces/Incident';
import { generateMockIncident, generateId } from '../utils/mockIncidentUtils';

export const useIncidentSimulation = (
    incidents: Incident[],
    setIncidents: (incidents: Incident[] | ((prev: Incident[]) => Incident[])) => void,
    isLoaded: boolean
) => {
    const incidentsRef = useRef(incidents);

    useEffect(() => {
        incidentsRef.current = incidents;
    }, [incidents]);

    useEffect(() => {
        if (!isLoaded) return;

        const interval = setInterval(() => {
            const currentIncidents = incidentsRef.current;

            // Probabilities for adding incidents. 5 for adding new incident, 30 for adding event
            const shouldAddIncident = Math.random() > 0.95;
            const shouldAddEvent = Math.random() > 0.7;

            // 1. New Incident
            if (shouldAddIncident) {
                const newIncident = generateMockIncident();
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
                return;
            }

            // 2. Random Event (Comment or Status Change) on existing incident
            if (shouldAddEvent && currentIncidents.length > 0) {
                const activeIncidents = currentIncidents.filter(i => i.status !== 'Resolved');

                const targetPool = activeIncidents.length > 0 ? activeIncidents : currentIncidents;
                const randomIndex = Math.floor(Math.random() * targetPool.length);
                const targetIncident = targetPool[randomIndex];


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

        }, 5000);

        return () => clearInterval(interval);
    }, [isLoaded, setIncidents]);
};
