import { Link } from 'react-router-dom';
import type { Incident } from '../../../interfaces/Incident';
import { AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

interface RecentActivityProps {
    incidents: Incident[];
}

const RecentActivity = ({ incidents }: RecentActivityProps) => {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Open':
                return <AlertCircle className="status-icon open" size={16} />;
            case 'In Progress':
                return <Clock className="status-icon in-progress" size={16} />;
            case 'Resolved':
                return <CheckCircle2 className="status-icon resolved" size={16} />;
            default:
                return <AlertCircle size={16} />;
        }
    };

    return (
        <div className="recent-activity-card">
            <div className="card-header">
                <h3>Recent Activity</h3>
                <Link to="/incidents" className="view-all-link">View All</Link>
            </div>
            <div className="activity-list">
                {incidents.length === 0 ? (
                    <div className="empty-state">No recent activity</div>
                ) : (
                    incidents.map((incident) => (
                        <Link to={`/incidents/${incident.id}`} key={incident.id} className="activity-item">
                            <div className="activity-icon">
                                {getStatusIcon(incident.status)}
                            </div>
                            <div className="activity-content">
                                <span className="activity-title">{incident.title}</span>
                                <span className="activity-time">
                                    {new Date(incident.updatedAt || incident.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div className={`severity-badge ${incident.severity.toLowerCase()}`}>
                                {incident.severity}
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default RecentActivity;
