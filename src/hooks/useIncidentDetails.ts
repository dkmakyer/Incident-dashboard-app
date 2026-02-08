import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useIncidents } from './useIncidents';
import type { Incident } from '../interfaces/Incident';
import type { Status } from '../types/common';
import { VALID_TRANSITIONS } from '../constants/incidentConstants';

export const useIncidentDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { incidents, loading, error, updateIncident } = useIncidents();
    const [incident, setIncident] = useState<Incident | null>(null);

    useEffect(() => {
        if (id && incidents.length > 0) {
            const found = incidents.find(inc => inc.id === id);
            setIncident(found || null);
        }
    }, [id, incidents]);

    const handleStatusChange = (newStatus: Status) => {
        if (!incident) return;

        if (VALID_TRANSITIONS[incident.status].includes(newStatus)) {
            updateIncident(incident.id, { status: newStatus });
        } else {
            console.warn(`Invalid transition from ${incident.status} to ${newStatus}`);
        }
    };

    const goBack = () => navigate('/');

    return {
        incident,
        loading,
        error,
        handleStatusChange,
        goBack,
        id
    };
};
