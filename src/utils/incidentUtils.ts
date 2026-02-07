import type { Incident } from '../interfaces/Incident';
import type { Severity, Status, Service } from '../types/common';
import { SEVERITY_ORDER } from '../constants/incidentConstants';


export const sortIncidents = (incidents: Incident[]): Incident[] => {
    return [...incidents].sort((a, b) => {
        // 1. Sort by Severity (Ascending order of importance: Critical -> Low)
        const severityDiff = SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity];
        if (severityDiff !== 0) return severityDiff;

        // 2. Sort by Recency (Newest first)
        return b.createdAt - a.createdAt;
    });
};

export const filterIncidents = (
    incidents: Incident[],
    filters: {
        status?: Status | '';
        severity?: Severity | '';
        service?: Service | '';
    }
): Incident[] => {
    return incidents.filter(incident => {
        if (filters.status && incident.status !== filters.status) return false;
        if (filters.severity && incident.severity !== filters.severity) return false;
        if (filters.service && incident.service !== filters.service) return false;
        return true;
    });
};
