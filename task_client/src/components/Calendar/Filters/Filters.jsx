import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Filters.module.css';

const Filters = ({ onApplyFilters }) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    const fetchTagsAndCategories = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const tagsResponse = await axios.get('http://localhost:8080/api/tags', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const categoriesResponse = await axios.get('http://localhost:8080/api/categories', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setTags(tagsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching tags or categories:', error);
      }
    };

    fetchTagsAndCategories();
  }, []);

  const handleApplyFilters = () => {
    onApplyFilters({
      category: selectedCategory,
      tag: selectedTag
    });
  };

  return (
    <div className={styles.filtersContainer}>
      <div>
        <label className={styles.filterLabel}>Categories:</label>
        <select className={styles.filterSelect} value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          <option value=''>All</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div>
        <label className={styles.filterLabel}>Tags:</label>
        <select className={styles.filterSelect} value={selectedTag} onChange={e => setSelectedTag(e.target.value)}>
          <option value=''>All</option>
          {tags.map(t => <option key={t.tagId} value={t.tagId}>{t.name}</option>)}
        </select>
      </div>

      <button onClick={handleApplyFilters} className={styles.applyButton}>Apply Filters</button>
    </div>
  );
};

export default Filters;
