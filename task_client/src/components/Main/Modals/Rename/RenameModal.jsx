import React, { useState, useEffect } from 'react';
import './RenameModal.css';
import axios from 'axios';


const RenameModal = ({ onClose, currentName, existingTitles, CardtoDRename, fetchCalendars }) => {
    const [title, setTitle] = useState(currentName);
    const [closing, setClosing] = useState(false);
    const [error, setError] = useState('');

    const validateTitle = (newTitle) => {
        if (newTitle.length < 3) {
            return "Title must be longer than 2 characters";
        }
        if (newTitle.length > 30) {
            return "Title must be less than 30 characters";
        }
        if (/[^a-zA-Z0-9 ]/.test(newTitle)) {
            return "Title must not contain special characters";
        }
        if (existingTitles && existingTitles.includes(newTitle) && newTitle !== currentName) {
            return "Title must be unique";
        }
        return "";
    };

    const handleRename = async (e) => {
        e.preventDefault();
        const validationError = validateTitle(title);
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const token = localStorage.getItem('accessToken');
            const name = title;
            console.log("Token being sent:", token);
            await axios.put(`http://localhost:8080/api/calendars/${CardtoDRename}`, { name }, { 
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Calendar renamed successfully');
            await fetchCalendars();
            onClose();
        } catch (error) {
            console.error('Error renaming calendar:', error);
        }
    };



    const handleInputChange = (e) => {
        setTitle(e.target.value);
        setError('');
    };

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
                    <h2>Rename calendar</h2>
                </div>
                <div className="modal-body">
                    <input
                        className={`input-field ${error ? 'input-error' : ''}`}
                        type="text"
                        value={title}
                        onChange={handleInputChange}
                        onFocus={() => setError('')}
                        placeholder="Enter new calendar title"
                    />
                    {error && <p className="error-message">{error}</p>}
                </div>
                <div className="modal-footer">
                    <button className="button close-button" onClick={handleClose}>Close</button>
                    <button className="button add-button" type="submit" onClick={handleRename}>Confirm</button>
                </div>
            </div>
        </div>
    );
};


export default RenameModal;
