import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const ZoomIn = ({ children, z, onClick }) => {
  return (
    <div
      className={styles.zoomIn}
      style={{ zIndex: z }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

ZoomIn.propTypes = {
  children: PropTypes.element.isRequired,
  z: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ZoomIn;
