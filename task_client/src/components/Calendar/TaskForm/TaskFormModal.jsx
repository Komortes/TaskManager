import React, { useState, useEffect } from 'react';
import styles from './AddTaskModal.module.css';
import CustomSelect from '../CustomSelect';
import axios from 'axios';
import moment from 'moment';

const TaskFormModal = ({ onClose, fetchTasks, calendarId, selectedDate }) => {
  const [title, setTitle] = useState('');
  const [closing, setClosing] = useState(false);
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [repeat, setRepeat] = useState(false);
  const [status, setStatus] = useState('none');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [error, setError] = useState('');


  const dueDateISO = selectedDate ? moment(selectedDate.date).toISOString() : moment().toISOString();

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
    return "";
  };

  const taskData = {
    title: title,
    description: description,
    time: time,
    repeat: repeat,
    status: status,
    categoryId: category, 
    tagIds: allTags.filter(tag => tag.isSelected === true).map(tag => tag.tagId),
    calendarId: calendarId, 
    dueDate: dueDateISO , 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleError = validateTitle(title);
    if (titleError) {
      setError(titleError);
      return;
    }

    if (!time) {
      setError("Please enter a valid time.");
      return;
    }
  
    try {
      const token = localStorage.getItem('accessToken');
      console.log("Token being sent:", token);
      await axios.post('http://localhost:8080/api/tasks', taskData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      await fetchTasks();
      onClose();
    } catch (error) {
      console.error('Error creating task:', error);
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

  const handleTagSelect = (selectedTagId) => {
    const newTags = allTags.map(tag => ({
      ...tag,
      isSelected: tag.tagId === selectedTagId ? !tag.isSelected : tag.isSelected
    }));
    console.log("New tags:", newTags);
    setAllTags(newTags);
  };

  const handleCategoryChange = (id) => {
    console.log("Category changed:", id);
    setCategory(id);
  };

  useEffect(() => {
    const fetchTagsAndCategories = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const tagsResponse = await axios.get('http://localhost:8080/api/tags', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setAllTags(tagsResponse.data);
        const categoriesResponse = await axios.get('http://localhost:8080/api/categories', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setAllCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching tags or categories:', error);
      }
    };

    fetchTagsAndCategories();
  }, []);

  return (
    <div className={`${styles.modal_backdrop} ${closing ? styles.closing : ''}`} onClick={handleClose}>
      <div className={styles.modal_content} onClick={e => e.stopPropagation()}>
        <div className={styles.modal_header}>
          <h2>Add New Task</h2>
        </div>
        <div className={styles.modal_body}>
          <input
            className={styles.inputField}
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className={styles.textArea}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="time"
            className={styles.inputField}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={repeat}
              onChange={() => setRepeat(!repeat)}
            />
            Repeat
          </label>
          <div className={styles.statusToggle}>
            <select
              id="statusSelect"
              className={styles.selectField}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="none">Select status</option>
              <option value="completed">Done</option>
              <option value="not_completed">No</option>
            </select>
          </div>
          <CustomSelect
            options={allCategories.map(category => ({
              value: category.id,
              label: category.name,
              color: category.color
            }))}
            onSelect={handleCategoryChange}
          />
          <div className={styles.tagSelection}>
            {allTags.map(tag => (
              <button
                key={tag.tagId}
                className={`${styles.tagButton} ${tag.isSelected ? styles.selected : ''}`}
                onClick={() => handleTagSelect(tag.tagId)}
              >
                {tag.name}
              </button>
            ))}
          </div>


          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
        <div className={styles.modal_footer}>
          <button type="button" className={`${styles.button} ${styles.closeButton}`} onClick={handleClose}>Close</button>
          <button type="submit" className={`${styles.button} ${styles.addButton}`} onClick={handleSubmit}>Add</button>

        </div>
      </div>
    </div>
  );
};

export default TaskFormModal;
