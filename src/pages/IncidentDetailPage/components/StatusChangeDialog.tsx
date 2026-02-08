import React, { useState } from 'react';
import type { Status } from '../../../types/common';
import './StatusChangeDialog.css';

interface StatusChangeDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (note: string) => void;
    newStatus: Status;
    currentStatus: Status;
}

const StatusChangeDialog: React.FC<StatusChangeDialogProps> = ({ isOpen, onClose, onConfirm, newStatus, currentStatus }) => {
    const [note, setNote] = useState('');

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (note.trim()) {
            onConfirm(note);
            setNote('');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Change Status</h3>
                <p>Are you sure you want to change status from <strong>{currentStatus}</strong> to <strong>{newStatus}</strong>?</p>

                <div className="form-group">
                    <label htmlFor="status-note">Note (Required):</label>
                    <textarea
                        id="status-note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Please explain why the status is changing..."
                        rows={3}
                        style={{ width: "30rem" }}
                    />
                </div>

                <div className="modal-actions">
                    <button onClick={onClose} className="btn-secondary">Cancel</button>
                    <button
                        onClick={handleConfirm}
                        disabled={!note.trim()}
                        className="btn-primary"
                    >
                        Confirm Change
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StatusChangeDialog;
