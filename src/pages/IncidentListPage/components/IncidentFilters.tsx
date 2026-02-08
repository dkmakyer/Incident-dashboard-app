import React from 'react';
import type { IncidentFiltersProps } from '../../../interfaces/Incident';


const IncidentFilters: React.FC<IncidentFiltersProps> = ({ filters, onFilterChange, onClearFilters }) => {
    return (
        <div className="filters-container">
            <div className="filter-group">
                <label>Status:</label>
                <select
                    value={filters.status}
                    onChange={(e) => onFilterChange('status', e.target.value)}
                >
                    <option value="">All Statuses</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                </select>
            </div>

            <div className="filter-group">
                <label>Severity:</label>
                <select
                    value={filters.severity}
                    onChange={(e) => onFilterChange('severity', e.target.value)}
                >
                    <option value="">All Severities</option>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>

            <div className="filter-group">
                <label>Service:</label>
                <select
                    value={filters.service}
                    onChange={(e) => onFilterChange('service', e.target.value)}
                >
                    <option value="">All Services</option>
                    <option value="API">API</option>
                    <option value="Database">Database</option>
                    <option value="Auth">Auth</option>
                    <option value="Payments">Payments</option>
                    <option value="Frontend">Frontend</option>
                </select>
            </div>

            <button onClick={onClearFilters} className="clear-filters-btn">
                Clear Filters
            </button>
        </div>
    );
};

export default IncidentFilters;
