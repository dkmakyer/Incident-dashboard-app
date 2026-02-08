import React, { useState, useMemo } from 'react';
import { useIncidents } from '../../hooks/useIncidents';
import type { Severity, Status, Service } from '../../types/common';
import { sortIncidents, filterIncidents } from '../../utils/incidentUtils';
import IncidentFilters from './components/IncidentFilters';
import IncidentList from './components/IncidentList';
import './IncidentListPage.css';

const IncidentListPage: React.FC = () => {
    const { incidents, loading, error, refreshIncidents } = useIncidents();

    const [filters, setFilters] = useState({
        status: '' as Status | '',
        severity: '' as Severity | '',
        service: '' as Service | '',
    });

    const handleFilterChange = (key: 'status' | 'severity' | 'service', value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleClearFilters = () => {
        setFilters({ status: '', severity: '', service: '' });
    };

    const processedIncidents = useMemo(() => {
        const filtered = filterIncidents(incidents, filters);
        return sortIncidents(filtered);
    }, [incidents, filters]);

    if (loading && incidents.length === 0) {
        return <div className="loading-screen">Loading incidents...</div>;
    }

    if (error) {
        return (
            <div className="error-screen">
                <h2>Error loading incidents</h2>
                <p>{error.message}</p>
                <button onClick={refreshIncidents}>Retry</button>
            </div>
        );
    }

    return (
        <div className="incident-list-page">
            <header className="page-header">
                <h1>Incident Dashboard</h1>
                <div className="live-indicator">
                    <span className="dot"></span> Live Updates
                </div>
            </header>

            <IncidentFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
            />

            <div className="results-count">
                Showing {processedIncidents.length} incidents
            </div>

            <IncidentList incidents={processedIncidents} />
        </div>
    );
};

export default IncidentListPage;