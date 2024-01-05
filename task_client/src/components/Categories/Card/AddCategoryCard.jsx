import React from 'react';
import styles from './CategoryCard.module.css'; 

const AddCategoryCard = ({ onAddClick  }) => {
    const cardStyle = {
        backgroundImage: "linear-gradient(144deg,#af40ff,#5b42f3 50%,#00ddeb)",
    };

return (
    <div 
      className={styles.card}
      onClick={onAddClick}
      style={cardStyle} 
    >
      <p className={styles.text_title}>Create</p>
    </div>
  );
};

export default AddCategoryCard;
