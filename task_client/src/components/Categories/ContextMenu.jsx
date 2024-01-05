import React, { useEffect } from 'react';
import styles from './ContextMenu.module.css'; 

const ContextMenu = ({ x, y, onDelete, onRename, onClose }) => {

  useEffect(() => {
    const closeMenu = (e) => {
      onClose();
    };

    document.addEventListener('click', closeMenu);

    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, [onClose]);

  return (
    <div style={{ top: `${y}px`, left: `${x}px` }} className={styles.context_menu}>
      <div className={styles.menu_item} onClick={onDelete}>Delete</div>
      <div className={styles.menu_item} onClick={onRename}>Rename</div>
    </div>
  );
};

export default ContextMenu;
