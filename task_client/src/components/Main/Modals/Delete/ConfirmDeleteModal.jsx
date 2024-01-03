import React, { useState, useEffect } from 'react';
import styles from './ConfirmDeleteModal.module.css';
import axios from 'axios';

const ConfirmDeleteModal = ({ onClose, CardtoDel , fetchCalendars}) => {
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
            await fetchCalendars();
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
        <div className={`${styles.modal_backdrop} ${closing ? styles.closing : ''}`}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <h2>Delete calendar</h2>
                </div>
                <div className={styles.modal_body}>
                    <p>Are you sure you want to delete this calendar? This action cannot be undone.</p>
                </div>
                <div className={styles.modal_footer}>
                    <button className={`${styles.button} ${styles.close_button}`} onClick={handleClose}>Cancel</button>
                    <button className={`${styles.button} ${styles.add_button}`} type="submit" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};


export default ConfirmDeleteModal;
