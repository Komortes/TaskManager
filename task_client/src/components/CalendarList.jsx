import React, { useState } from 'react';
import CalendarCard from './CalendarCard';
import AddCalendarCard from './AddCalendarCard';
import AddCalendarModal from './AddCalendarModal';
import ContextMenu from './ContextMenu';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import RenameModal from './RenameModal';

const CalendarList = ({ calendars, gradients }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [selectedCalendarId, setSelectedCalendarId] = useState(null);

  const handleCardClick = (title) => {
    console.log("Card clicked:", title);
  };

  const handleAddNewClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleShowDeleteModal = (id) => {
    setSelectedCalendarId(id);
    setShowDeleteModal(true);
    closeContextMenu();
  };

  const handleShowRenameModal = (id) => {
    setSelectedCalendarId(id);
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
    <div className="calendar-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '20px', padding: '20px' }}>
      {calendars.map((calendar, index) => (
        <CalendarCard
          key={calendar.id}
          id={calendar.id}
          title={calendar.title}
          gradient={gradients[index % gradients.length]}
          onCardClick={handleCardClick}
          onRightClick={handleRightClick}
        />
      ))}
      <AddCalendarCard onAddClick={handleAddNewClick} />
      {isModalOpen && (
        <AddCalendarModal
          onClose={handleCloseModal}
          existingTitles={calendars.map(calendar => calendar.title)}
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
        />
      )}

      {showRenameModal && (
        <RenameModal
          onClose={handleCloseRenameModal}
          currentName={calendars.find(calendar => calendar.id === selectedCalendarId).title}
          existingTitles={calendars.map(calendar => calendar.title)}
          CardtoDRename={selectedCalendarId}
        />
      )}
    </div>
  );
};

export default CalendarList;