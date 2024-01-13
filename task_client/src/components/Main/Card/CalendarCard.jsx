import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CalendarCard.module.css';

const CalendarCard = ({ id, title, gradient, onRightClick }) => {
  const navigate = useNavigate(); 

  const handleCardClick = () => {
    navigate(`/calendar/${id}`);
  };

  const cardStyle = {
    backgroundImage: gradient,
  };

  return (
    
    <div
      className={styles.card}
      onClick={handleCardClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick(e, id);
      }}
      style={cardStyle}
    >
      <div className={styles.card_img}></div>
      <div className={styles.card_info}>
        <div className={styles.card_text}>
          <p className={styles.text_title}>{title}</p>
        </div>
        <div className={styles.card_icon}>
          <svg className={styles.icon} viewBox="0 0 28 25">
            <path d="M13.145 2.13l1.94-1.867 12.178 12-12.178 12-1.94-1.867 8.931-8.8H.737V10.93h21.339z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CalendarCard;
