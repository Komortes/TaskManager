import React, { useState } from 'react';
import TagCard from './TagCard';
import AddTagCard from './AddTagCard';
//import AddCalendarModal from '../Modals/Add/AddCalendarModal';
import ContextMenu from '../ContextMenu';
//import ConfirmDeleteModal from '../Modals/Delete/ConfirmDeleteModal';
//import RenameModal from '../Modals/Rename/RenameModal';

const TagList = ({ calendars, gradients,  fetchCalendars }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [selectedCalendarId, setSelectedCalendarId] = useState(null);

  const handleCardClick = (name) => {
    console.log("Card clicked:", name);
  };

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
    <div className="tag-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '20px', padding: '20px' }}>
      {calendars.map((calendar, index) => (
        <TagCard
          key={calendar.calendarId}
          id={calendar.calendarId}
          title={calendar.name}
          gradient={gradients[index % gradients.length]}
          onCardClick={handleCardClick}
          onRightClick={handleRightClick}
        />
      ))}
      <AddTagCard onAddClick={handleAddNewClick} />
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onDelete={() => handleShowDeleteModal(contextMenu.id)}
          onRename={() => handleShowRenameModal(contextMenu.id)}
          onClose={closeContextMenu}
        />
      )}
      
    </div>
  );
};

export default TagList;