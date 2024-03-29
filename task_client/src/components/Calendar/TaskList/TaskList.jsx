import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task/Task'; 
import styles from './TasksList.module.css'; 

const TasksList = ({ tasks, fetchTasks, EditTask }) => {
  return (
      <ul className={styles.list} onClick={e => e.stopPropagation()}>
        {tasks.map(task => (
          <li className={styles.item} key={`task-${task.taskId}`}>
            <Task
              taskid={task.taskId}
              title={task.title}
              time={task.time}
              categoryColor={task.categoryColor}
              categorySymbol={task.categorySymbol} 
              EditTask={EditTask}
              fetchTasks={fetchTasks}
            />
          </li>
        ))}
      </ul>
  );
};


TasksList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      taskId: PropTypes.number,
      title: PropTypes.string,
      time: PropTypes.string,
      categoryColor: PropTypes.string,
      categorySymbol: PropTypes.string,
    }).isRequired
  ).isRequired,
  toggleList: PropTypes.func,
  activeDate: PropTypes.string,
};

export default TasksList;
