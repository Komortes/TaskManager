import React, { useState, useEffect } from 'react';
import styles from './EditTaskModal.module.css';
import CustomSelect from '../CustomSelect';
import axios from 'axios';
import moment from 'moment';

const TaskFormModal = ({ onClose, fetchTasks, calendarId, selectedId }) => {
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [repeat, setRepeat] = useState(false);
  const [status, setStatus] = useState('none');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTagsAndCategories = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const tagsResponse = await axios.get('http://localhost:8080/api/tags', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const categoriesResponse = await axios.get('http://localhost:8080/api/categories', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setAllTags(tagsResponse.data);
        setAllCategories(categoriesResponse.data);
        fetchTaskDetails(tagsResponse.data);
      } catch (error) {
        console.error('Error fetching tags or categories:', error);
      }
    };

    fetchTagsAndCategories();
  }, [selectedId]);

  const fetchTaskDetails = async (allTags) => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await axios.get(`http://localhost:8080/api/tasks/${calendarId}/${selectedId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setTask(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setTime(response.data.time);
      setRepeat(response.data.repeat);
      setStatus(response.data.status);
      if (response.data.categoryId != null) {
        setCategory(response.data.categoryId);
      }
      if (response.data.tagIds != null) {
        setTags(response.data.tagIds);
        const updatedTags = allTags.map(tag => ({
          ...tag,
          isSelected: response.data.tagIds.includes(tag.tagId)
        }));
        setAllTags(updatedTags);
      }
    } catch (error) {
      console.error('Error fetching task details:', error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedTime = moment(time, "HH:mm:ss").format("HH:mm");

    const taskData = {
      title,
      description,
      time: formattedTime,
      repeat,
      status,
      categoryId: category,
      tagIds: tags,
      calendarId
    };

    const token = localStorage.getItem('accessToken');
    try {
      await axios.put(`http://localhost:8080/api/tasks/${selectedId}`, taskData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      fetchTasks();
      onClose();
    } catch (error) {
      setError('Failed to update the task');
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${selectedId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchTasks();
      onClose();
    } catch (error) {
      setError('Failed to delete the task');
      console.error('Error deleting task:', error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleTagSelect = (selectedTagId) => {
    const newTags = allTags.map(tag => ({
      ...tag,
      isSelected: tag.tagId === selectedTagId ? !tag.isSelected : tag.isSelected
    }));
    setAllTags(newTags);

    const selectedTags = newTags.filter(tag => tag.isSelected).map(tag => tag.tagId);
    setTags(selectedTags);
  };



  return (
    <div className={`${styles.modal_backdrop}`} onClick={handleClose}>
      <div className={styles.modal_content} onClick={e => e.stopPropagation()}>
        <div className={styles.modal_header}>
          <h2>Edit Task</h2>
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
            selectedValue={category}
            onSelect={(id) => setCategory(id)}
          />
          <div className={styles.tagSelection}>
            {allTags.map(tag => (
              <button
                key={tag.tagId}
                className={`${styles.tagButton} ${tags.includes(tag.tagId) ? styles.selected : ''}`}
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
          <button type="button" className={`${styles.button} ${styles.addButton}`} onClick={handleSubmit}>Save Changes</button>
          <button type="button" className={`${styles.button} ${styles.deleteButton}`} onClick={handleDelete}>Delete Task</button>
        </div>
      </div>
    </div>
  );
};

export default TaskFormModal;
