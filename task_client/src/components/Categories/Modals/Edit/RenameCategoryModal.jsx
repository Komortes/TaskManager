import React, { useState, useEffect } from 'react';
import { CirclePicker } from 'react-color';
import Picker from 'emoji-picker-react';
import styles from './RenameCategoryModal.module.css';
import axios from 'axios';

const EditCategoryModal = ({ onClose, currentCategory, fetchCategories }) => {
    const [title, setTitle] = useState(currentCategory.name);
    const [color, setColor] = useState(currentCategory.color);
    const [symbol, setSymbol] = useState(currentCategory.symbol);
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
        return errors;
    };

    const handleSubmit = async (e) => {
        if (title === currentCategory.name && color === currentCategory.color && symbol === currentCategory.symbol) {
            onClose();
            return;
        }
        e.preventDefault();
        const errors = validateInputs();
        if (errors.length > 0) {
            setError(errors.join(", "));
            return;
        }

        try {
            const token = localStorage.getItem('accessToken');
            await axios.put(`http://localhost:8080/api/categories/${currentCategory.id}`, { name: title, color, symbol }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            await fetchCategories();
            onClose();
        } catch (error) {
            console.error('Error updating category:', error);
            setError('Failed to update category');
        }
    };

    const onEmojiClick = (event, emojiObject) => {
        setSymbol(event.emoji);
    };

    useEffect(() => {
        if (!closing) {
            setClosing(false);
        }
    }, [closing]);

    return (
        <div className={`${styles.modal_backdrop}`}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <h2>Edit Category</h2>
                </div>
                <div className={styles.modal_body}>
                    <input
                        className={`${styles.input_field} ${error ? styles.input_error : ''}`}
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Enter new category title"
                    />
                    <CirclePicker color={color} onChangeComplete={color => setColor(color.hex)} />
                    <Picker onEmojiClick={onEmojiClick} />
                    <div>
                        Selected Emoji: {symbol}
                    </div>
                    {error && <p className={styles.error_message}>{error}</p>}
                </div>
                <div className={styles.modal_footer}>
                    <button className={`${styles.button} ${styles.close_button}`} onClick={() => onClose()}>Close</button>
                    <button className={`${styles.button} ${styles.edit_button}`} onClick={handleSubmit}>Update</button>
                </div>
            </div>
        </div>
    );
};

export default EditCategoryModal;
