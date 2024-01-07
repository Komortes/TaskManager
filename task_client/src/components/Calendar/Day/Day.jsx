import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import styles from './Day.module.css';
import TaskList from '../TaskList/TaskList';

const Day = ({ date, tasks, onTaskSelect, EditTask , fetchTasks ,toggleList }) => {
  const handleAddButtonClick = () => {
    console.log("Adding task for date:", date); 
    onTaskSelect(date); 
  };

  const tasksForDay = tasks.filter(task => 
    task.dueDate && Moment(task.dueDate).isSame(date, 'day')
  );

  return (
    <div className={date ? styles.wrapper : `${styles.wrapper} ${styles.noDate}`}>
      {date && (
        <button className={styles.addButton} onClick={handleAddButtonClick}>
          &#43;
        </button>
      )}
      {date ? <span className={styles.display}>{Moment(date).format("D")}</span> : <span>&nbsp;</span>}
      <div className={styles.tasks}>
        <TaskList
          tasks={tasksForDay}
          toggleList={toggleList}
          activeDate={date}
          EditTask = {EditTask}
          fetchTasks = {fetchTasks}
        />
      </div>
    </div>
  );
};

Day.propTypes = {
  date: PropTypes.string,
  tasks: PropTypes.array, 
  onTaskSelect: PropTypes.func.isRequired,
  toggleList: PropTypes.func.isRequired
};

export default Day;
