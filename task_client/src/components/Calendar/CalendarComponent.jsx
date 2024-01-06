import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

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
          <Month
            month={currentDate.month()}
            year={currentDate.year()}
            tasks={tasks}
            onTaskSelect={(task) => {
              setSelectedTask(task);
              setTaskFormVisible(true);
            }}
          />
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
