import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Week from '../Week/Week';
import styles from './Month.module.css';

const Month = ({ month, year, tasks }) => {
  const generateMonthGrid = (month, year) => {
    const startOfMonth = moment([year, month]);
    const endOfMonth = moment(startOfMonth).endOf('month');
    let date = moment(startOfMonth).startOf('isoWeek');
    let days = [];

    // Предыдущий месяц
    while (date.isBefore(startOfMonth)) {
      days.push(null);
      date.add(1, 'days');
    }

    // Текущий месяц
    while (date.isSameOrBefore(endOfMonth)) {
      days.push(moment(date));
      date.add(1, 'days');
    }

    // Следующий месяц
    while (date.weekday() !== 0) {
      days.push(null);
      date.add(1, 'days');
    }

    return days;
  };

  const getWeeks = (days) => {
    let weeks = [];
    let week = [];

    days.forEach((day, index) => {
      week.push(day);
      if ((index + 1) % 7 === 0) {
        weeks.push(week);
        week = [];
      }
    });

    // Дополнение последней недели до полных 7 дней
    while (week.length > 0 && week.length < 7) {
      week.push(null);
    }
    if (week.length === 7 && week.some(day => day !== null)) {
      weeks.push(week);
    }

    return weeks;
  };

  const weeksOfMonth = getWeeks(generateMonthGrid(month, year));

  return (
    <div className={styles.wrapper}>
      <ul className={styles.header}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <li className={styles.day} key={day}>{day}</li>
        ))}
      </ul>
      {weeksOfMonth.map((week, index) => (
        <Week
          key={`week-${index}`}
          index={index}
          days={week}
          tasks={tasks}
          toggleForm={() => {}}  
          toggleList={() => {}} 
        />
      ))}
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
