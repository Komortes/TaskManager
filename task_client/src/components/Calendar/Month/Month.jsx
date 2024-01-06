import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Week from '../Week/Week';
import styles from './Month.module.css'; 

const Month = ({ month, year, tasks }) => {
  const getDaysInMonth = (month, year) => {
    let date = new Date(year, month, 1);
    let days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const getDaysOfWeek = (days, firstWeek, i) => 
    days.filter(
      day => moment(day).startOf('week').isoWeek() === firstWeek + i
    );

  const days = getDaysInMonth(month, year);
  let firstWeek = moment(days[0]).startOf('week').isoWeek();
  let weeksComponents = [];

  for (let i = 0; i < 6; i++) {
    const daysOfWeek = getDaysOfWeek(days, firstWeek, i);
    weeksComponents.push(
      <Week
        key={`week-${firstWeek + i}`}
        days={daysOfWeek}
        tasks={tasks} 
        month={month}
        year={year}
      />
    );
  }

  const daysOfWeekLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

  return (
    <div className={styles.wrapper}>
      <ul className={styles.header}>
        {daysOfWeekLabels.map(day => (
          <li className={styles.day} key={day}>{day}</li>
        ))}
      </ul>
      {weeksComponents}
    </div>
  );
};

Month.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string,
      text: PropTypes.string,
      color: PropTypes.string
    })
  ).isRequired
};

export default Month;
