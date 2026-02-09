import { useContext } from 'react';
import { IncidentContext } from '../../context/IncidentContext';
import StatCard from './components/StatCard';
import RecentActivity from './components/RecentActivity';
import StatusChart from './components/StatusChart';
import SeverityChart from './components/SeverityChart';
import { LayoutDashboard, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const context = useContext(IncidentContext);

    if (!context) {
        return <div className="dashboard-container">Loading...</div>;
    }

    const { incidents } = context;

    // Calculate Analytics
    const totalIncidents = incidents.length;
    const openIncidents = incidents.filter(i => i.status === 'Open').length;
    const inProgressIncidents = incidents.filter(i => i.status === 'In Progress').length;
    const resolvedIncidents = incidents.filter(i => i.status === 'Resolved').length;

    // Chart Data
    const statusData = [
        { name: 'Open', value: openIncidents },
        { name: 'In Progress', value: inProgressIncidents },
        { name: 'Resolved', value: resolvedIncidents },
    ].filter(d => d.value > 0);

    const severityCounts = incidents.reduce<Record<string, number>>((acc, curr) => {
        acc[curr.severity] = (acc[curr.severity] || 0) + 1;
        return acc;
    }, {});

    const severityData = Object.entries(severityCounts).map(([name, value]) => ({
        name,
        value,
    }));

    // Recent Activity (Sort by updated or created desc)
    const recentIncidents = [...incidents]
        .sort((a, b) => (b.updatedAt || b.createdAt) - (a.updatedAt || a.createdAt))
        .slice(0, 5);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Overview</h1>
                <p>Welcome back! Here's what's happening today.</p>
            </div>

            <div className="stats-grid">
                <StatCard
                    title="Total Incidents"
                    value={totalIncidents}
                    icon={<LayoutDashboard size={24} />}
                />
                <StatCard
                    title="Open Incidents"
                    value={openIncidents}
                    icon={<AlertCircle size={24} color="#ef4444" />}
                />
                <StatCard
                    title="In Progress"
                    value={inProgressIncidents}
                    icon={<Clock size={24} color="#f59e0b" />}
                />
                <StatCard
                    title="Resolved"
                    value={resolvedIncidents}
                    icon={<CheckCircle2 size={24} color="#10b981" />}
                />
            </div>

            <div className="dashboard-content">
                <div className="charts-grid">
                    <StatusChart data={statusData} />
                    <SeverityChart data={severityData} />
                </div>

                <RecentActivity incidents={recentIncidents} />
            </div>
        </div>
    );
};

export default Dashboard;
