import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  

class Header extends Component {
  handleClick = (direction) => {
    this.props.onMonthChange(direction);
  };

  render() {
    const { month, year } = this.props;
    return (
      <div className={styles.wrapper}>
        <span className={styles.arrow} onClick={() => this.handleClick('left')}>
          &lt;
        </span>
        <h1 className={styles.heading}>
          {months[month]} {year}
        </h1>
        <span className={styles.arrow} onClick={() => this.handleClick('right')}>
          &gt;
        </span>
      </div>
    );
  }
}

Header.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  onMonthChange: PropTypes.func.isRequired
};

export default Header;
