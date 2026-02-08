import React, { useState } from 'react';
import type { TimelineEntry } from '../../../interfaces/Incident';
import './IncidentTimeline.css';

interface IncidentTimelineProps {
    entries: TimelineEntry[];
    onAddComment?: (comment: string) => void;
}

const IncidentTimeline: React.FC<IncidentTimelineProps> = ({ entries, onAddComment }) => {
    const [comment, setComment] = useState('');

    // Sort entries by timestamp descending (newest first)
    const sortedEntries = [...entries].sort((a, b) => b.timestamp - a.timestamp);

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

    const handleSubmitComment = (e: React.SubmitEvent) => {
        e.preventDefault();
        if (comment.trim() && onAddComment) {
            onAddComment(comment);
            setComment('');
        }
    };

    return (
        <div className="incident-timeline">
            <div className="timeline-header-section">
                <h3>Activity Timeline</h3>
            </div>

            {onAddComment && (
                <form onSubmit={handleSubmitComment} className="comment-form">
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="comment-input"
                    />
                    <button type="submit" disabled={!comment.trim()} className="comment-btn">
                        Post
                    </button>
                </form>
            )}

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
