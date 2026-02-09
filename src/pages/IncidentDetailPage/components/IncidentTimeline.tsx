import React, { useMemo } from 'react';
import type { TimelineEntry } from '../../../interfaces/Incident';
import './IncidentTimeline.css';

interface IncidentTimelineProps {
    entries: TimelineEntry[];
}

const IncidentTimeline: React.FC<IncidentTimelineProps> = ({ entries }) => {
    const sortedEntries = useMemo(
        () => [...entries].sort((a, b) => b.timestamp - a.timestamp),
        [entries]
    );

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleString();
    };

    const getIcon = (type: TimelineEntry['type']) => {
        switch (type) {
            case 'status_change': return '🔄';
            case 'comment': return '💬';
            case 'event': return '🤖';
            default: return '•';
        }
    };

    return (
        <div className="incident-timeline">
            <div className="timeline-list">
                {entries.length === 0 ? (
                    <div className="timeline-empty">No activity recorded yet.</div>
                ) : (
                    sortedEntries.map(entry => (
                        <div key={entry.id} className={`timeline-item type-${entry.type}`}>
                            <div className="timeline-icon">{getIcon(entry.type)}</div>
                            <div className="timeline-content">
                                <div className="timeline-header">
                                    <span className="timeline-author">{entry.author}</span>
                                    <span className="timeline-date">{formatDate(entry.timestamp)}</span>
                                </div>
                                <div className="timeline-body">
                                    {entry.type === 'status_change' && (
                                        <div className="status-change-badge">
                                            {entry.previousStatus} ➔ {entry.newStatus}
                                        </div>
                                    )}
                                    <p className="timeline-note">{entry.note}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default IncidentTimeline;
