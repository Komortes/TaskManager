import React from 'react';
import { useParams } from 'react-router-dom';
import CalendarComponent from '../components/Calendar/CalendarComponent';
import Navbar from "../components/Navbar";
import { motion } from 'framer-motion';

const CalendarPage = ({ setAuth }) => {
  const { calendarId } = useParams();

 
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="calendar-page"
    >
      <Navbar setAuth={setAuth} />
      <CalendarComponent selectedCalendarId={calendarId} />
    </motion.div>
  );
};

export default CalendarPage;
