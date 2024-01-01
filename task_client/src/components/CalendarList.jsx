import React from 'react';
import CalendarCard from './CalendarCard';

const calendars = [
  { id: 1, title: "Work" },
  { id: 2, title: "Personal" },
];

const CalendarList = () => {
  return (
    <div className="calendar-list">
      {calendars.map(calendar => (
        <CalendarCard key={calendar.id} title={calendar.title} />
      ))}
      <div className="add-new-calendar">
        <p>Add New Calendar</p>
      </div>
    </div>
  );
};

export default CalendarList;
