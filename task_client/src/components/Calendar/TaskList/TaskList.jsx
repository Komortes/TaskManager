
import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import Modal from '../Modal/Modal';  
import Task from '../Task/Task';    
import styles from './TasksList.module.css';
import moment from 'moment';

const TasksList = ({ tasks, toggleList, activeDate }) => {
  const formattedDate = moment(activeDate).format("MMM. D, YYYY");
  return (
      <ul className={styles.list} onClick={e => e.stopPropagation()}>
        {tasks.map(task => (
          <li className={styles.item} key={`task-${task.taskId}`}>
            <Task
              title={task.title}
              description={task.description}
              time={task.time}
              categoryColor={task.categoryColor}
            />
          </li>
        ))}
      </ul>
  );
};

TasksList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      taskId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      time: PropTypes.string,
      categoryColor: PropTypes.string,
    }).isRequired
  ).isRequired,
  toggleList: PropTypes.func.isRequired,
  activeDate: PropTypes.string.isRequired,
};

export default TasksList;
