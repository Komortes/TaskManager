import React from 'react';
import './CalendarCard.css'; 


const CalendarCard = ({ id, title, gradient, onCardClick, onRightClick }) => {
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
      <div className="card-img"></div>
      <div className="card-info">
        <div className="card-text">
          <p className="text-title">{title}</p>
        </div>
        <div className="card-icon">
          <svg className="icon" viewBox="0 0 28 25">
            <path d="M13.145 2.13l1.94-1.867 12.178 12-12.178 12-1.94-1.867 8.931-8.8H.737V10.93h21.339z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CalendarCard;
