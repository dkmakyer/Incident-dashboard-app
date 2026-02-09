import { useContext, useMemo } from 'react';
import { IncidentContext } from '../../context/IncidentContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import './AnalyticsPage.css';

const AnalyticsPage = () => {
    const context = useContext(IncidentContext);

    if (!context) {
        return <div className="analytics-container">Loading...</div>;
    }

    const { incidents } = context;

    const analytics = useMemo(() => {
        const total = incidents.length;
        const byStatus = {
            open: incidents.filter(i => i.status === 'Open').length,
            inProgress: incidents.filter(i => i.status === 'In Progress').length,
            resolved: incidents.filter(i => i.status === 'Resolved').length,
        };

        const bySeverity = {
            critical: incidents.filter(i => i.severity === 'Critical').length,
            high: incidents.filter(i => i.severity === 'High').length,
            medium: incidents.filter(i => i.severity === 'Medium').length,
            low: incidents.filter(i => i.severity === 'Low').length,
        };

        const byService = incidents.reduce<Record<string, number>>((acc, curr) => {
            acc[curr.service] = (acc[curr.service] || 0) + 1;
            return acc;
        }, {});

        const resolvedIncidents = incidents.filter(i => i.status === 'Resolved' && i.updatedAt);
        const avgResolutionTime = resolvedIncidents.length > 0
            ? resolvedIncidents.reduce((sum, inc) => sum + (inc.updatedAt! - inc.createdAt), 0) / resolvedIncidents.length
            : 0;

        return {
            total,
            byStatus,
            bySeverity,
            byService,
            avgResolutionTime: Math.round(avgResolutionTime / (1000 * 60 * 60)), // Convert to hours
            resolutionRate: total > 0 ? Math.round((byStatus.resolved / total) * 100) : 0,
        };
    }, [incidents]);

    const statusData = [
        { name: 'Open', value: analytics.byStatus.open, color: '#ef4444' },
        { name: 'In Progress', value: analytics.byStatus.inProgress, color: '#f59e0b' },
        { name: 'Resolved', value: analytics.byStatus.resolved, color: '#10b981' },
    ];

    const severityData = Object.entries(analytics.bySeverity).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
    }));

    const serviceData = Object.entries(analytics.byService).map(([name, value]) => ({
        name,
        incidents: value,
    }));

    return (
        <div className="analytics-container">
            <div className="analytics-header">
                <h1>Analytics Dashboard</h1>
                <p>Comprehensive incident analytics and insights</p>
            </div>

            <div className="metrics-grid">
                <div className="metric-card">
                    <div className="metric-icon">
                        <Activity size={24} />
                    </div>
                    <div className="metric-content">
                        <span className="metric-label">Total Incidents</span>
                        <span className="metric-value">{analytics.total}</span>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon success">
                        <CheckCircle2 size={24} />
                    </div>
                    <div className="metric-content">
                        <span className="metric-label">Resolution Rate</span>
                        <span className="metric-value">{analytics.resolutionRate}%</span>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon warning">
                        <Clock size={24} />
                    </div>
                    <div className="metric-content">
                        <span className="metric-label">Avg Resolution Time</span>
                        <span className="metric-value">{analytics.avgResolutionTime}h</span>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon danger">
                        <AlertCircle size={24} />
                    </div>
                    <div className="metric-content">
                        <span className="metric-label">Active Incidents</span>
                        <span className="metric-value">{analytics.byStatus.open + analytics.byStatus.inProgress}</span>
                    </div>
                </div>
            </div>

            <div className="charts-section">
                <div className="chart-card">
                    <h3>Status Distribution</h3>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="chart-card">
                    <h3>Severity Breakdown</h3>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={severityData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#8884d8" name="Incidents" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="chart-card full-width">
                    <h3>Incidents by Service</h3>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={serviceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="incidents" fill="#3b82f6" name="Incidents" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
