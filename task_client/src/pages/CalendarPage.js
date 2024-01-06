import React from 'react';
import { useParams } from 'react-router-dom';
import CalendarComponent from '../components/Calendar/CalendarComponent';
import Navbar from "../components/Navbar";

const CalendarPage = ({ setAuth }) => {
  const { calendarId } = useParams();

  return (
    <div className="calendar-page">
      <Navbar setAuth={setAuth} />
      <CalendarComponent selectedCalendarId={calendarId} />
    </div>
  );
};

export default CalendarPage;
