import type { Severity, Status, Service } from '../types/common';

export interface Incident {
    id: string;
    title: string;
    description: string;
    severity: Severity;
    status: Status;
    service: Service;
    createdAt: number;
    updatedAt?: number;
    timeline: TimelineEntry[];
}

export interface IncidentFiltersProps {
    filters: {
        status: Status | '';
        severity: Severity | '';
        service: Service | '';
    };
    onFilterChange: (key: 'status' | 'severity' | 'service', value: string) => void;
    onClearFilters: () => void;
}

export interface TimelineEntry {
    id: string;
    incidentId: string;
    timestamp: number;
    type: 'status_change' | 'comment' | 'event';
    author: string;
    note: string;
    // For status changes
    previousStatus?: string;
    newStatus?: string;
}
