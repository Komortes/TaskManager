import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Day from '../Day/Day';
import styles from './Week.module.css';

const Week = ({ index, days, toggleForm, toggleList }) => {
  let daysList = [];
  let daysIdx = 0;

  for (let i = 0; i < 7; i++) {
    const dayObj = days[daysIdx];
    let isMatching = dayObj ? +moment(dayObj.date).format('e') === i : false;
    daysList.push(
      <Day
        key={`week${index}-day${i}`}
        date={isMatching ? dayObj.date : null}
        tasks={isMatching ? dayObj.items : null} 
        toggleForm={toggleForm}
        toggleList={toggleList}
      />
    );
    if (isMatching) daysIdx++;
  }

  return <div className={styles.wrapper}>{daysList}</div>;
};

Week.propTypes = {
  index: PropTypes.number.isRequired,
  days: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          time: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
          color: PropTypes.string.isRequired
        })
      ).isRequired
    })
  ).isRequired,
  toggleForm: PropTypes.func.isRequired,
  toggleList: PropTypes.func.isRequired
};

export default Week;
