import type { Incident } from '../interfaces/Incident';
import type { Severity, Status, Service } from '../types/common';
import { SEVERITY_ORDER } from '../constants/incidentConstants';


export const sortIncidents = (incidents: Incident[]): Incident[] => {
    return [...incidents].sort((a, b) => {
        const severityDiff = SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity];
        if (severityDiff !== 0) return severityDiff;

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

export const getSeverityColor = (severity: string) => {
    switch (severity) {
        case 'Critical': return '#dc3545';
        case 'High': return '#fd7e14';
        case 'Medium': return '#ffc107';
        case 'Low': return '#28a745';
        default: return '#6c757d';
    }
};

export const timeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
};
