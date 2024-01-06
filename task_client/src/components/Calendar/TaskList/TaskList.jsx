import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import Modal from '../Modal/Modal';
import Task from '../Task/Task';
import styles from './TasksList.module.css';

const TasksList = ({ tasks, toggleForm, toggleList, activeDate }) => {
  return (
    <Modal z={100} onClick={toggleList}>
      <ul className={styles.list} onClick={e => e.stopPropagation()}>
        <h2 className={styles.heading}>
          <Moment format="MMM. D, YYYY">{activeDate}</Moment>

        </h2>
        <button className={styles.closeButton} onClick={toggleList}>&times;</button>
        {tasks.map(task => (
          <li className={styles.item} key={`listitem-${task.id}`}>
            <Task
              {...task}
              toggleForm={() => toggleForm(activeDate, task)}
              padding={1.25}
              fontSize={1.3}
            />
          </li>
        ))}
      </ul>
    </Modal>
  );
};

TasksList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      time: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  toggleForm: PropTypes.func.isRequired,
  toggleList: PropTypes.func.isRequired,
  activeDate: PropTypes.string.isRequired,
};

export default TasksList;
