import React from 'react';
import './CalendarCard.css'; 


const CalendarCard = ({ title }) => {
  return (

    <div class="card">
    <div class="card-img"></div>
      <div class="card-info">
        <div class="card-text">
          <p class="text-title">{title}</p>
        </div>
        <div class="card-icon">
          <svg class="icon" viewBox="0 0 28 25">
            <path d="M13.145 2.13l1.94-1.867 12.178 12-12.178 12-1.94-1.867 8.931-8.8H.737V10.93h21.339z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CalendarCard;
