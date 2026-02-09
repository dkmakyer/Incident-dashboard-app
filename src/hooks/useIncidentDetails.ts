import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useIncidents } from './useIncidents';
import type { Incident } from '../interfaces/Incident';

export const useIncidentDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {
        incidents,
        loading,
        error,
        changeIncidentStatus,
        addComment
    } = useIncidents();

    const [incident, setIncident] = useState<Incident | null>(null);

    useEffect(() => {
        if (id && incidents.length > 0) {
            const found = incidents.find(inc => inc.id === id);
            setIncident(found || null);
        }
    }, [id, incidents]);

    const goBack = () => navigate('/incidents');

    return {
        incident,
        loading,
        error,
        changeIncidentStatus,
        addComment,
        goBack,
        id
    };
};
