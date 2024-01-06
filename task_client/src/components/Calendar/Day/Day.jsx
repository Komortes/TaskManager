import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import Task from '../Task/Task';
import styles from './Day.module.css';

const Day = ({ date, reminders, toggleForm, toggleList }) => {
  const sortedReminders = reminders && !!reminders.length ? reminders : null;

  return (
    <div className={date ? styles.wrapper : `${styles.wrapper} ${styles.noDate}`}>
      {date && (
        <button className={styles.addButton} onClick={() => toggleForm(date, {})}>
          &#43;
        </button>
      )}
      {date ? <Moment format="D" className={styles.display}>{date}</Moment> : <span>&nbsp;</span>}
      <div className={styles.reminders}>
        {sortedReminders
          ? sortedReminders
              .map(r => (
                <Task
                  key={r.id}
                  {...r}
                  toggleForm={() => toggleForm(date, r)}
                />
              ))
              .slice(0, 2)
          : null}
        {sortedReminders && sortedReminders.length > 2 && (
          <button
            className={styles.moreReminders}
            onClick={() => toggleList(date)}
          >{`+${sortedReminders.length - 2} more`}</button>
        )}
      </div>
    </div>
  );
};

Day.propTypes = {
  date: PropTypes.string,
  reminders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      time: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    })
  ),
  toggleForm: PropTypes.func.isRequired,
  toggleList: PropTypes.func.isRequired
};

export default Day;
