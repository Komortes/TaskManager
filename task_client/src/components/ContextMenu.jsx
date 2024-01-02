import React, { useEffect } from 'react';

const ContextMenu = ({ x, y, onDelete, onRename, onClose }) => {
  const menuStyle = {
    position: 'absolute',
    top: `${y}px`,
    left: `${x}px`,
    zIndex: 1000,
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    borderRadius: '8px',
    color: 'white',
    padding: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
  };

  const itemStyle = {
    margin: '5px 0',
    userSelect: 'none',
  };

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
    <div style={menuStyle} className="context-menu">
      <div style={itemStyle} className="menu-item" onClick={onDelete}>Удалить</div>
      <div style={itemStyle} className="menu-item" onClick={onRename}>Переименовать</div>
    </div>
  );
};

export default ContextMenu;
