import React, { useState, useEffect } from 'react';
import { CirclePicker } from 'react-color';
import Picker from 'emoji-picker-react';
import styles from './AddCategoryModal.module.css';
import axios from 'axios';

const AddCategoryModal = ({ onClose, existingTitles, fetchCategories }) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#fff'); 
  const [symbol, setSymbol] = useState(''); 
  const [closing, setClosing] = useState(false);
  const [error, setError] = useState('');

  const validateInputs = () => {
    let errors = [];
    if (title.length < 3) {
      errors.push("Title must be longer than 2 characters");
    }
    if (title.length > 30) {
      errors.push("Title must be less than 30 characters");
    }
    if (/[^a-zA-Z0-9 ]/.test(title)) {
      errors.push("Title must not contain special characters");
    }
    if (existingTitles && existingTitles.includes(title)) {
      errors.push("Title must be unique");
    }
    if (color === '#fff') { 
      errors.push("Please select a color for the category");
    }
    if (!symbol) {
      errors.push("Please select an emoji for the category");
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateInputs();
    if (errors.length > 0) {
      setError(errors.join(", ")); 
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      await axios.post('http://localhost:8080/api/categories', { name: title, color, symbol }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      await fetchCategories();
      onClose();
    } catch (error) {
      console.error('Error creating category:', error);
      setError('Failed to create category');
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    if (emojiObject) {
      setSymbol(event.emoji);
    }
  };

  return (
    <div className={`${styles.modal_backdrop}`}>
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <h2>Add New Category</h2>
        </div>
        <div className={styles.modal_body}>
          <input
            className={`${styles.input_field} ${error ? styles.input_error : ''}`}
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter category title"
          />
          <CirclePicker color={color} onChangeComplete={color => setColor(color.hex)} />
          <br/>
          <div>
            Selected Emoji: {symbol || "None"}
          </div>
          <Picker onEmojiClick={onEmojiClick} />

          {error && <p className={styles.error_message}>{error}</p>}
        </div>
        <div className={styles.modal_footer}>
          <button className={`${styles.button} ${styles.close_button}`} onClick={() => onClose()}>Close</button>
          <button className={`${styles.button} ${styles.add_button}`} onClick={handleSubmit}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
