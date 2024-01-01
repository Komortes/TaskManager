import React, { useState } from 'react';
import CalendarCard from './CalendarCard';
import AddCalendarCard from './AddCalendarCard';
import AddCalendarModal from './AddCalendarModal';

const CalendarList = ({ calendars, gradients }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (title) => {
    console.log("Card clicked:", title);
  };

  const handleAddNewClick = () => {
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <div className="calendar-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '20px', padding: '20px' }}>
      {calendars.map((calendar, index) => (
        <CalendarCard
          key={calendar.id}
          title={calendar.title}
          gradient={gradients[index % gradients.length]}
          onCardClick={handleCardClick}
        />
      ))}
      <AddCalendarCard onAddClick={handleAddNewClick} /> 
      {isModalOpen && (
        <AddCalendarModal
          onClose={handleCloseModal}
          existingTitles={calendars.map(calendar => calendar.title)}
        />
      )}
    </div>
  );
};

export default CalendarList;
