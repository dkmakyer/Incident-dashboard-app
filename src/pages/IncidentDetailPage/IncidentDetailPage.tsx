import React, { useState } from 'react';
import { useIncidentDetails } from '../../hooks/useIncidentDetails';
import { useIncidents } from '../../hooks/useIncidents';
import StatusChangeDialog from './components/StatusChangeDialog';
import IncidentTimeline from './components/IncidentTimeline';
import type { Status } from '../../types/common';
import { VALID_TRANSITIONS } from '../../constants/incidentConstants';
import './IncidentDetailPage.css';

const IncidentDetailPage: React.FC = () => {
    const { incident, loading, error, goBack } = useIncidentDetails();
    const { changeIncidentStatus, addComment } = useIncidents();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [pendingStatus, setPendingStatus] = useState<Status | null>(null);

    const handleStatusClick = (newStatus: Status) => {
        setPendingStatus(newStatus);
        setIsDialogOpen(true);
    };

    const handleConfirmStatusChange = (note: string) => {
        if (incident && pendingStatus) {
            changeIncidentStatus(incident.id, pendingStatus, note);
            setIsDialogOpen(false);
            setPendingStatus(null);
        }
    };

    const handleAddComment = (comment: string) => {
        if (incident) {
            addComment(incident.id, comment);
        }
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setPendingStatus(null);
    };

    if (loading) return <div className="loading-screen">Loading incident details...</div>;
    if (error) return <div className="error-screen">{error.message} <button onClick={goBack}>Go Back</button></div>;
    if (!incident) return <div className="not-found-screen">Incident not found. <button onClick={goBack}>Go Back</button></div>;

    const availableTransitions = VALID_TRANSITIONS[incident.status] || [];

    return (
        <div className="incident-detail-page">
            <button onClick={goBack} className="back-button">← Back to List</button>

            <div className="incident-header">
                <h1>{incident.title}</h1>
                <span className={`status-badge status-${incident.status.toLowerCase()}`}>
                    {incident.status}
                </span>
            </div>

            <div className="incident-meta">
                <div className="meta-item">
                    <label>Severity:</label>
                    <span className={`severity-badge severity-${incident.severity.toLowerCase()}`}>
                        {incident.severity}
                    </span>
                </div>
                <div className="meta-item">
                    <label>Service:</label>
                    <span>{incident.service}</span>
                </div>
                <div className="meta-item">
                    <label>Created:</label>
                    <span>{new Date(incident.createdAt).toLocaleString()}</span>
                </div>
                {incident.updatedAt && (
                    <div className="meta-item">
                        <label>Last Updated:</label>
                        <span>{new Date(incident.updatedAt).toLocaleString()}</span>
                    </div>
                )}
            </div>

            <div className="incident-description">
                <h3>Description</h3>
                <p>{incident.description}</p>
            </div>

            <div className="incident-actions">
                <h3>Actions</h3>
                <div className="action-buttons">
                    {availableTransitions.map(status => (
                        <button
                            key={status}
                            onClick={() => handleStatusClick(status)}
                            className="btn-transition"
                        >
                            Mark as {status}
                        </button>
                    ))}
                    {availableTransitions.length === 0 && (
                        <p className="no-actions">No further status actions available.</p>
                    )}
                </div>
            </div>

            <IncidentTimeline
                entries={incident.timeline}
                onAddComment={handleAddComment}
            />

            <StatusChangeDialog
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                onConfirm={handleConfirmStatusChange}
                newStatus={pendingStatus || incident.status}
                currentStatus={incident.status}
            />
        </div>
    );
};

export default IncidentDetailPage;
