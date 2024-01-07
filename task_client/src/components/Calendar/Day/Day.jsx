import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import Task from '../Task/Task';
import styles from './Day.module.css';

const Day = ({ date, tasks, toggleForm, toggleList }) => {
  const momentDate = Moment(date);

  return (
    <div className={date ? styles.wrapper : `${styles.wrapper} ${styles.noDate}`}>
      {date && (
        <button className={styles.addButton} onClick={() => toggleForm(date, {})}>
          &#43;
        </button>
      )}
      {date ? <span className={styles.display}>{momentDate.format("D")}</span> : <span>&nbsp;</span>}
      <div className={styles.tasks}>
      </div>
    </div>
  );
};

Day.propTypes = {
  date: PropTypes.string,
  tasks: PropTypes.array, 
  toggleForm: PropTypes.func.isRequired,
  toggleList: PropTypes.func.isRequired
};

export default Day;
