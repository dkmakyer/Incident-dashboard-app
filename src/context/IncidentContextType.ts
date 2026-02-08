import type { Incident } from '../interfaces/Incident';

export interface IncidentContextType {
    incidents: Incident[];
    loading: boolean;
    error: Error | null;
    refreshIncidents: () => void;
    updateIncident: (id: string, updates: Partial<Incident>) => void;
    changeIncidentStatus: (id: string, newStatus: string, note: string) => void;
    addComment: (id: string, comment: string) => void;
}
