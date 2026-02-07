import React from 'react';
import type { Incident } from '../../../interfaces/Incident';
import IncidentItem from './IncidentItem';

interface IncidentListProps {
    incidents: Incident[];
}

const IncidentList: React.FC<IncidentListProps> = ({ incidents }) => {
    if (incidents.length === 0) {
        return (
            <div className="empty-state">
                <p>No incidents found matching your filters.</p>
            </div>
        );
    }

    return (
        <div className="incident-list">
            {incidents.map((incident) => (
                <IncidentItem key={incident.id} incident={incident} />
            ))}
        </div>
    );
};

export default IncidentList;
