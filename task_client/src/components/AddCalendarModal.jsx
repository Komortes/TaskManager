import React, { useState, useEffect } from 'react';
import './AddCalendarModal.css';
import axios from 'axios';

const AddCalendarModal = ({ onClose, existingTitles }) => {
  const [title, setTitle] = useState('');
  const [closing, setClosing] = useState(false);
  const [error, setError] = useState('');

  const validateTitle = (newTitle) => {
    if (newTitle.length < 4 ) {
      return "Title must be longer than 3 characters";
    }
    if (newTitle.length > 30 ) {
      return "Title must be less than 30 characters";
    }
    if (/[^a-zA-Z0-9 ]/.test(newTitle)) {
      return "Title must not contain special characters";
    }
    if (existingTitles && existingTitles.includes(newTitle)) {
      return "Title must be unique";
    }
    return "";
  };

  const handleSubmit = async (e) => {
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
      await axios.post('http://localhost:8080/api/calendars', { name }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      onClose();
    } catch (error) {
      console.error('Error creating calendar:', error);
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
          <h2>Add New Calendar</h2>
        </div>
        <div className="modal-body">
          <input
            className={`input-field ${error ? 'input-error' : ''}`}
            type="text"
            value={title}
            onChange={handleInputChange}
            onFocus={() => setError('')} 
            placeholder="Enter calendar title"
          />
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="modal-footer">
          <button className="button close-button" onClick={handleClose}>Close</button>
          <button className="button add-button" type="submit" onClick={handleSubmit}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddCalendarModal;
