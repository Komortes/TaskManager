import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Day from '../Day/Day';
import styles from './Week.module.css';

const Week = ({ index, days, toggleForm, toggleList }) => {
  return (
    <div className={styles.wrapper}>
      {days.map((day, i) => (
        <Day
          key={`day-${index}-${i}`}
          date={day ? day.format('YYYY-MM-DD') : null} 
          tasks={[]} 
          toggleForm={toggleForm}
          toggleList={toggleList}
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
  toggleForm: PropTypes.func.isRequired,
  toggleList: PropTypes.func.isRequired
};

export default Week;
