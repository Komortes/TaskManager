import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import styles from './Task.module.css';

class Task extends Component {
  render() {
    const { color, time, text, padding, fontSize, toggleForm } = this.props;

    const customStyle = {
      backgroundColor: color,
      padding: padding ? `${padding}rem` : '0.5rem', 
      fontSize: fontSize ? `${fontSize}rem` : '1.1rem', 
    };

    return (
      <div className={styles.wrapper} onClick={toggleForm} style={customStyle}>
        <Moment parse="HH:mm" format="h:mma" className={styles.time}>
          {time}
        </Moment>

        <span className={styles.text}>{text}</span>
      </div>
    );
  }
}

Task.propTypes = {
  time: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  toggleForm: PropTypes.func.isRequired,
  padding: PropTypes.number,
  fontSize: PropTypes.number
};

export default Task;
