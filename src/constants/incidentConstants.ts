import type { Service, Severity, Status } from '../types/common';

export const SEVERITIES: Severity[] = ['Critical', 'High', 'Medium', 'Low'];
export const STATUSES: Status[] = ['Open', 'In Progress', 'Resolved'];
export const SERVICES: Service[] = ['API', 'Database', 'Auth', 'Payments', 'Frontend'];

export const SEVERITY_ORDER: Record<Severity, number> = {
    'Critical': 0,
    'High': 1,
    'Medium': 2,
    'Low': 3,
};

export const VALID_TRANSITIONS: Record<Status, Status[]> = {
    'Open': ['In Progress', 'Resolved'],
    'In Progress': ['Open', 'Resolved'],
    'Resolved': ['Open', 'In Progress'],
};
