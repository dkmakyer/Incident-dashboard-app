import React from 'react';
import { Link } from 'react-router-dom';
import type { Incident } from '../../../interfaces/Incident';

interface IncidentItemProps {
    incident: Incident;
}

const IncidentItem: React.FC<IncidentItemProps> = ({ incident }) => {
    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'Critical': return '#dc3545'; // Red
            case 'High': return '#fd7e14';     // Orange
            case 'Medium': return '#ffc107';   // Yellow
            case 'Low': return '#28a745';      // Green
            default: return '#6c757d';         // Grey
        }
    };

    const timeAgo = (timestamp: number) => {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    };

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
