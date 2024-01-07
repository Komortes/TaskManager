import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './Task.module.css';

const Task = ({ title, time, categoryColor, toggleForm }) => {
    const defaultColor = '#3498db'; 
    const backgroundColor = categoryColor || defaultColor;

    const formattedTime = moment(time, "HH:mm:ss").format("HH:mm");

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
        <div className={styles.wrapper} onClick={toggleForm} style={customStyle}>
            <span className={styles.time}>{formattedTime}</span>
            <span className={styles.title}>{title}</span>
        </div>
    );
};

Task.propTypes = {
    title: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    categoryColor: PropTypes.string,
    toggleForm: PropTypes.func.isRequired,
};

export default Task;
