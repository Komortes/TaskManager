import React, { useState, useEffect } from 'react';
import './ConfirmDeleteModal.css';
import axios from 'axios';

const ConfirmDeleteModal = ({ onClose, CardtoDel }) => {
    const [closing, setClosing] = useState(false);


    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            console.log("Token being sent:", token);
            await axios.delete(`http://localhost:8080/api/calendars/${CardtoDel}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Calendar deleted successfully');
            onClose();
        } catch (error) {
            console.error('Error deleting calendar:', error);
        }
    }

    const handleClose = () => {
        setClosing(true);
        onClose();
    };

    useEffect(() => {
        if (!closing) {
            setClosing(false);
        }
    }, [closing]);

    return (
        <div className={`modal-backdrop ${closing ? 'closing' : ''}`}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Delete calendar</h2>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to delete this calendar? This action cannot be undone.</p>
                </div>
                <div className="modal-footer">
                    <button className="button close-button" onClick={handleClose}>Cancel</button>
                    <button className="button add-button" type="submit" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};


export default ConfirmDeleteModal;
