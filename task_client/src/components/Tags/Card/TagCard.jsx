import React from 'react';
import './TagCard.css'; 


const TagCard = ({ id, title, gradient, onCardClick, onRightClick }) => {
  const cardStyle = {
    backgroundImage: gradient,
  };
  
  return (
    <div 
      className="card" 
      onClick={() => onCardClick(title)}  
      onContextMenu={(e) => {
        e.preventDefault(); 
        onRightClick(e, id); 
      }} 
      style={cardStyle}
    >
      <p className="text-title">{title}</p>
    </div>
  );
};

export default TagCard;
