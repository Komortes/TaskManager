import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Day from '../Day/Day';
import styles from './Week.module.css';

const Week = ({ index, days, onTaskSelect, toggleList, tasks , EditTask }) => {
  return (
    <div className={styles.wrapper}>
      {days.map((day, i) => (
        <Day
          key={`day-${index}-${i}`}
          date={day ? day.format('YYYY-MM-DD') : null}
          tasks={tasks} 
          onTaskSelect={onTaskSelect}
          toggleList={toggleList}
          EditTask = {EditTask}
        />
      ))}
    </div>
  );
};

Week.propTypes = {
  index: PropTypes.number.isRequired,
  days: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.instanceOf(moment), 
    PropTypes.oneOf([null])      
  ])).isRequired,
  toggleList: PropTypes.func
};

export default Week;