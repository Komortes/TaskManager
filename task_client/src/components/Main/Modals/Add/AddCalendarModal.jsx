import React, { useState, useEffect } from 'react';
import styles from './AddCalendarModal.module.css';
import axios from 'axios';

const AddCalendarModal = ({ onClose, existingTitles, fetchCalendars }) => {
  const [title, setTitle] = useState('');
  const [closing, setClosing] = useState(false);
  const [error, setError] = useState('');

  const validateTitle = (newTitle) => {
    if (newTitle.length < 3 ) {
      return "Title must be longer than 2 characters";
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
      await fetchCalendars();
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
    <div className={`${styles.modal_backdrop} ${closing ? styles.closing : ''}`}>
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <h2>Add New Calendar</h2>
        </div>
        <div className={styles.modal_body}>
          <input
            className={`${styles.input_field} ${error ? styles.input_error : ''}`}
            type="text"
            value={title}
            onChange={handleInputChange}
            onFocus={() => setError('')} 
            placeholder="Enter calendar title"
          />
          {error && <p className={styles.error_message}>{error}</p>}
        </div>
        <div className={styles.modal_footer}>
          <button className={`${styles.button} ${styles.close_button}`} onClick={handleClose}>Close</button>
          <button className={`${styles.button} ${styles.add_button}`} type="submit" onClick={handleSubmit}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddCalendarModal;
