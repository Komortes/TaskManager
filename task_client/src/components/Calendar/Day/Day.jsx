import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import styles from './Day.module.css';

const Day = ({ date, tasks, onTaskSelect, toggleList }) => {
  const handleAddButtonClick = () => {
    console.log("Adding task for date:", date); 
    onTaskSelect(date); 
  };

  return (
    <div className={date ? styles.wrapper : `${styles.wrapper} ${styles.noDate}`}>
      {date && (
        <button className={styles.addButton} onClick={handleAddButtonClick}>
          &#43;
        </button>
      )}
      {date ? <span className={styles.display}>{Moment(date).format("D")}</span> : <span>&nbsp;</span>}
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
