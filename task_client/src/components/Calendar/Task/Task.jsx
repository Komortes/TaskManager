import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './Task.module.css'; 

const Task = ({ title, time, categoryColor, categorySymbol, EditTask, taskid }) => {
    const defaultColor = '#3498db';  
    const backgroundColor = categoryColor || defaultColor;

    const handleAddButtonClick = () => {
        console.log("Edit task for date:", taskid); 
        EditTask(taskid); 
    };

    const formattedTime = time ? moment(time, "HH:mm:ss").format("HH:mm") : "Invalid time"; 

    const customStyle = {
        backgroundColor,
        padding: '0.4rem', 
        fontSize: '1rem', 
        borderRadius: '5px', 
        height: '50px', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
    };

    return (
        <div className={styles.wrapper} onClick={handleAddButtonClick} style={customStyle}>
            <span className={styles.time}>{categorySymbol} {formattedTime}</span>
            <span className={styles.title}>{title}</span>
        </div>
    );
};

Task.propTypes = {
    title: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    categoryColor: PropTypes.string,
    categorySymbol: PropTypes.string,
    EditTask: PropTypes.func.isRequired,
    taskid: PropTypes.number.isRequired
};

export default Task;
