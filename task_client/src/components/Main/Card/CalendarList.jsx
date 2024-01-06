import React, { useState } from 'react';
import CalendarCard from './CalendarCard';
import AddCalendarCard from '../Card/AddCalendarCard';
import AddCalendarModal from '../Modals/Add/AddCalendarModal';
import ContextMenu from '../ContextMenu';
import ConfirmDeleteModal from '../Modals/Delete/ConfirmDeleteModal';
import RenameModal from '../Modals/Rename/RenameModal';
import styles from './CalendarList.module.css'

const CalendarList = ({ calendars, gradients,  fetchCalendars }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [selectedCalendarId, setSelectedCalendarId] = useState(null);

  const handleAddNewClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleShowDeleteModal = (calendarId) => {
    setSelectedCalendarId(calendarId);
    setShowDeleteModal(true);
    closeContextMenu();
  };

  const handleShowRenameModal = (calendarId) => {
    setSelectedCalendarId(calendarId);
    setShowRenameModal(true);
    closeContextMenu();
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleCloseRenameModal = () => {
    setShowRenameModal(false);
  };

  const handleRightClick = (event, id) => {
    event.preventDefault();
    setContextMenu({
      x: event.pageX,
      y: event.pageY,
      id: id,
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  return (
    
    <div className={styles.calendar_list} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '20px', padding: '20px' }}>
      {calendars.map((calendar, index) => (
        <CalendarCard
          key={calendar.calendarId}
          id={calendar.calendarId}
          title={calendar.name}
          gradient={gradients[index % gradients.length]}
          onRightClick={handleRightClick}  
        />
      ))}
      <AddCalendarCard onAddClick={handleAddNewClick} />
      {isModalOpen && (
        <AddCalendarModal
          onClose={handleCloseModal}
          existingTitles={calendars.map(calendar => calendar.name)}
          fetchCalendars={fetchCalendars}
        />
      )}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onDelete={() => handleShowDeleteModal(contextMenu.id)}
          onRename={() => handleShowRenameModal(contextMenu.id)}
          onClose={closeContextMenu}
        />
      )}
      {showDeleteModal && (
        <ConfirmDeleteModal
          onClose={handleCloseDeleteModal}
          CardtoDel={selectedCalendarId}
          fetchCalendars={fetchCalendars}
        />
      )}

      {showRenameModal && (
        <RenameModal
          onClose={handleCloseRenameModal}
          currentName={calendars.find(calendar => calendar.calendarId === selectedCalendarId).name}
          existingTitles={calendars.map(calendar => calendar.name)}
          CardtoDRename={selectedCalendarId}
          fetchCalendars={fetchCalendars}
        />
      )}
    </div>
  );
};

export default CalendarList;