import React, { useState } from 'react';
import './IncidentTimeline.css'; // Reusing existing styles for consistency

interface IncidentCommentFormProps {
    onSubmit: (comment: string) => void;
}

const IncidentCommentForm: React.FC<IncidentCommentFormProps> = ({ onSubmit }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        if (comment.trim()) {
            onSubmit(comment);
            setComment('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="comment-form">
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
    );
};

export default IncidentCommentForm;
