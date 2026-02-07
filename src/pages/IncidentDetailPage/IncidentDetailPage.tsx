import React from 'react';
import { useIncidentDetails } from '../../hooks/useIncidentDetails';
import { VALID_TRANSITIONS } from '../../constants/incidentConstants';
import type { Status } from '../../types/common';
import './IncidentDetailPage.css';

const IncidentDetailPage: React.FC = () => {
    const { incident, loading, error, handleStatusChange, goBack } = useIncidentDetails();

    if (loading) return <div className="loading-screen">Loading incident details...</div>;
    if (error) return <div className="error-screen">{error.message}</div>;
    if (!incident) return <div className="empty-state">Incident not found</div>;

    const validTransitions = VALID_TRANSITIONS[incident.status];

    return (
        <div className="incident-detail-page">
            <button onClick={goBack} className="back-btn">← Back to Dashboard</button>

            <div className="incident-header-detail">
                <div className="header-top">
                    <span className={`severity-badge severity-${incident.severity.toLowerCase()}`}>
                        {incident.severity}
                    </span>
                    <span className={`status-badge status-${incident.status.toLowerCase().replace(' ', '-')}`}>
                        {incident.status}
                    </span>
                </div>
                <h1 className="detail-title">{incident.title}</h1>
                <div className="meta-info">
                    <span>Service: <strong>{incident.service}</strong></span>
                    <span>Created: {new Date(incident.createdAt).toLocaleString()}</span>
                    {incident.updatedAt && (
                        <span>Last Updated: {new Date(incident.updatedAt).toLocaleString()}</span>
                    )}
                </div>
            </div>

            <div className="incident-body">
                <h3>Description</h3>
                <p>{incident.description}</p>
            </div>

            <div className="action-bar">
                <h3>Update Status</h3>
                <div className="status-actions">
                    {(['Open', 'In Progress', 'Resolved'] as Status[]).map((status) => {
                        const isValid = validTransitions.includes(status);
                        const isCurrent = incident.status === status;

                        if (isCurrent) return null; // Don't show button for current status

                        return (
                            <button
                                key={status}
                                className={`status-btn status-btn-${status.toLowerCase().replace(' ', '-')} ${!isValid ? 'disabled' : ''}`}
                                onClick={() => handleStatusChange(status)}
                                disabled={!isValid}
                                title={!isValid ? `Cannot transition from ${incident.status} to ${status}` : ''}
                            >
                                Mark as {status}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default IncidentDetailPage;
