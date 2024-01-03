import React from 'react';
import styles from './TagCard.module.css'; 


const TagCard = ({ id, title, gradient, onCardClick, onRightClick }) => {
  const cardStyle = {
    backgroundImage: gradient,
  };
  
  return (
    <div 
      className={styles.card}
      onClick={() => onCardClick(title)}  
      onContextMenu={(e) => {
        e.preventDefault(); 
        onRightClick(e, id); 
      }} 
      style={cardStyle}
    >
      <p className={styles.text_title}>{title}</p>
    </div>
  );
};

export default TagCard;
