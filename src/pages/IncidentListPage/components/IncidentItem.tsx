import React from 'react';
import { Link } from 'react-router-dom';
import type { Incident } from '../../../interfaces/Incident';
import { getSeverityColor, timeAgo } from '../../../utils/incidentUtils';

interface IncidentItemProps {
    incident: Incident;
}

const IncidentItem: React.FC<IncidentItemProps> = ({ incident }) => {

    return (
        <Link to={`/incidents/${incident.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div className="incident-item">
                <div className="incident-header">
                    <span
                        className="severity-badge"
                        style={{ backgroundColor: getSeverityColor(incident.severity) }}
                    >
                        {incident.severity}
                    </span>
                    <h3 className="incident-title">{incident.title}</h3>
                    <span className="incident-time">{timeAgo(incident.createdAt)}</span>
                </div>
                <div className="incident-details">
                    <span className="detail-tag">Service: {incident.service}</span>
                    <span className="detail-tag">Status: {incident.status}</span>
                </div>
                <p className="incident-description">{incident.description}</p>
            </div>
        </Link>
    );
};

export default IncidentItem;
