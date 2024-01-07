import React from 'react';
import styles from './Option.module.css'; 

const Option = ({ icon, label, color, onSelect }) => (
  <div className={styles.option} onClick={onSelect}>
    <span role="img" aria-label={label}>{icon}</span>
    {label}
    <span className={styles.colorIndicator} style={{ backgroundColor: color }}></span>
  </div>
);

export default Option;
