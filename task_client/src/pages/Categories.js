import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import CategoryList from '../components/Categories/Card/CategoryList';
import '../components/Loader/Loader.css';
import { motion } from 'framer-motion';

const Categories = ({ setAuth }) => {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const gradients = [
    'linear-gradient(144deg, #af40ff, #5b42f3, #00ddeb)',
    'linear-gradient(144deg, #6dd5ed, #2193b0, #a1c4fd)',
    'linear-gradient(144deg, #89f7fe, #66a6ff, #c2e9fb)',
    'linear-gradient(144deg, #5f2c82, #49a09d, #8fd3f4)',
    'linear-gradient(144deg, #4facfe, #00f2fe, #a6c0fe)',
    'linear-gradient(144deg, #43e97b, #38f9d7, #f68084)',
    'linear-gradient(144deg, #fa709a, #fee140, #fccb90)',
    'linear-gradient(144deg, #a1c4fd, #c2e9fb, #d4fc79)',
    'linear-gradient(144deg, #d4fc79, #96e6a1, #84fab0)',
    'linear-gradient(144deg, #84fab0, #8fd3f4, #a6c0fe)',
    'linear-gradient(144deg, #a6c0fe, #f68084, #fa709a)',
    'linear-gradient(144deg, #fccb90, #d57eeb, #e0c3fc)',
    'linear-gradient(144deg, #e0c3fc, #8ec5fc, #4facfe)',
    'linear-gradient(144deg, #f093fb, #f5576c, #43e97b)',
    'linear-gradient(144deg, #4facfe, #00f2fe, #43e97b)'
  ];


  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:8080/api/categories', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tags:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="home-page" style={{ minHeight: '100vh' }}>
      <Navbar setAuth={setAuth} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="content"
      >
        {loading ? (
          <div className="loading-container">
            <div className="loading">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        ) : (
          <CategoryList categories={categories} gradients={gradients} fetchCategories={fetchCategories} />
        )}
      </motion.div>
    </div>
  );
};

export default Categories;
