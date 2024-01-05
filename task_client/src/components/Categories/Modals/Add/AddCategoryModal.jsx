import React, { useState, useEffect } from 'react';
import { CirclePicker } from 'react-color';
import { Picker } from 'emoji-mart';
import styles from './AddCategoryModal.module.css';
import axios from 'axios';
import 'emoji-mart';

const AddCategoryModal = ({ onClose, existingTitles, fetchCategories }) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#fff');
  const [symbol, setSymbol] = useState('');
  const [closing, setClosing] = useState(false);
  const [error, setError] = useState('');

  const validateTitle = (newTitle) => {
    if (newTitle.length < 3) return "Title must be longer than 2 characters";
    if (newTitle.length > 30) return "Title must be less than 30 characters";
    if (/[^a-zA-Z0-9 ]/.test(newTitle)) return "Title must not contain special characters";
    if (existingTitles && existingTitles.includes(newTitle)) return "Title must be unique";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateTitle(title);
    if (validationError) {
      setError(validationError);
      return;
    }
    const symbolStr = symbol.native ? symbol.native : symbol;

    try {
      const token = localStorage.getItem('accessToken');
      await axios.post('http://localhost:8080/api/categories', { name: title, color, symbol: symbolStr }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      await fetchCategories();
      onClose();
    } catch (error) {
      console.error('Error creating category:', error);
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
          <h2>Add New Category</h2>
        </div>
        <div className={styles.modal_body}>
          <input
            className={`${styles.input_field} ${error ? styles.input_error : ''}`}
            type="text"
            value={title}
            onChange={handleInputChange}
            placeholder="Enter category title"
          />
          <CirclePicker color={color} onChangeComplete={(color) => setColor(color.hex)} />
          <Picker set='apple' onSelect={setSymbol} title='Pick your emoji…' emoji='point_up' />
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

export default AddCategoryModal;