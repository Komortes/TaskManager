import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { AnimatePresence, motion } from 'framer-motion';

import Header from './Header/Header';
import Month from './Month/Month';
import TaskForm from './TaskForm/TaskForm';
import TaskList from './TaskList/TaskList';

const CalendarComponent = ({ selectedCalendarId }) => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskFormVisible, setTaskFormVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:8080/api/calendars/${selectedCalendarId}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            month: currentDate.month() + 1,
            year: currentDate.year(),
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [selectedCalendarId, currentDate]);

  const handleMonthChange = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = moment(prevDate);
      if (direction === 'prev') {
        newDate.subtract(1, 'month');
      } else if (direction === 'next') {
        newDate.add(1, 'month');
      }
      return newDate;
    });
  };

  const handleAddTask = async (task) => {

  };

  const handleUpdateTask = async (taskId, updatedTask) => {

  };

  const handleDeleteTask = async (taskId) => {

  };

  const monthVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <div>
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <>
          <Header
            month={currentDate.month()}
            year={currentDate.year()}
            onMonthChange={handleMonthChange}
          />
          <AnimatePresence mode='wait'>
            <motion.div
              key={`${currentDate.month()}-${currentDate.year()}`}
              variants={monthVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Month
                month={currentDate.month()}
                year={currentDate.year()}
                tasks={tasks}
                onTaskSelect={(task) => {
                  setSelectedTask(task);
                  setTaskFormVisible(true);
                }}
              />
            </motion.div>
          </AnimatePresence>

          {taskFormVisible && (
            <TaskForm
              task={selectedTask}
              onSave={handleUpdateTask}
              onAdd={handleAddTask}
              onCancel={() => setTaskFormVisible(false)}
            />
          )}

        </>
      )}
    </div>
  );
};

export default CalendarComponent;
