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
}
