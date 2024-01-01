import React, { useState } from 'react';
import CalendarCard from './CalendarCard';
import AddCalendarCard from './AddCalendarCard';
import AddCalendarModal from './AddCalendarModal';

const CalendarList = ({ calendars, gradients }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (title) => {
    console.log("Card clicked:", title);
    // Implement navigation or other actions when a calendar card is clicked
  };

  const handleAddNewClick = () => {
    setIsModalOpen(true); // Open the modal when the add new card is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
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
