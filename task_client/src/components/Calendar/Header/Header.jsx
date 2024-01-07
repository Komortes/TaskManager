import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion'; 
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

class Header extends React.Component {
  handleClick = (direction) => {
    this.props.onMonthChange(direction);
  };

  render() {
    const { month, year } = this.props;
    return (
      <div className={styles.wrapper}>
        {/* Оборачиваем стрелки в motion.span */}
        <motion.span 
          className={styles.arrow} 
          onClick={() => this.handleClick('prev')}
          whileHover={{ scale: 1.1 }} // Анимация при наведении
          whileTap={{ scale: 0.9 }}  // Анимация при нажатии
        >
          &lt;
        </motion.span>
        <h1 className={styles.heading}>
          {months[month]} {year}
        </h1>
        <motion.span 
          className={styles.arrow} 
          onClick={() => this.handleClick('next')}
          whileHover={{ scale: 1.1 }} // Анимация при наведении
          whileTap={{ scale: 0.9 }}  // Анимация при нажатии
        >
          &gt;
        </motion.span>
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