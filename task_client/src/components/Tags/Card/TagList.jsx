import React, { useState } from 'react';
import TagCard from './TagCard';
import AddTagCard from './AddTagCard';
import AddTagModal from '../Modals/Add/AddTagModal';
import ContextMenu from '../ContextMenu';
import ConfirmDeleteTagModal from '../Modals/Delete/ConfirmDeleteTagModal';
import RenameTagModal from '../Modals/Edit/RenameTagModal';
import styles from './TagList.module.css';

const TagList = ({ tags, gradients, fetchTags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [selectedTagId, setSelectedTagId] = useState(null);

  const handleCardClick = (name) => {
    console.log("Card clicked:", name);
  };

  const handleAddNewClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleShowDeleteModal = (tagId) => {
    setSelectedTagId(tagId);
    setShowDeleteModal(true);
    closeContextMenu();
  };

  const handleShowRenameModal = (tagId) => {
    setSelectedTagId(tagId);
    setShowRenameModal(true);
    closeContextMenu();
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleCloseRenameModal = () => {
    setShowRenameModal(false);
  };


  const handleRightClick = (event, id, isSystem) => {
    if (isSystem) {
      return;
    }
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
    <div className={styles.tag_list} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '20px', padding: '20px' }}>
      {tags.map((tag, index) => (
        <TagCard
          key={tag.tagId}
          id={tag.tagId}
          title={tag.name}
          gradient={gradients[index % gradients.length]}
          onCardClick={handleCardClick}
          onRightClick={(e) => handleRightClick(e, tag.tagId, tag.isSystem)}
        />
      ))}
      <AddTagCard onAddClick={handleAddNewClick} />
      {isModalOpen && (
        <AddTagModal
          onClose={handleCloseModal}
          existingTitles={tags.map(tag => tag.name)}
          fetchTags={fetchTags}
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
        <ConfirmDeleteTagModal
          onClose={handleCloseDeleteModal}
          CardtoDel={selectedTagId}
          fetchTags={fetchTags}
        />
      )}

      {showRenameModal && (
        <RenameTagModal
          onClose={handleCloseRenameModal}
          currentName={tags.find(tag => tag.tagId === selectedTagId).name}
          existingTitles={tags.map(tag => tag.name)}
          CardtoDRename={selectedTagId}
          fetchTags={fetchTags}
        />
      )}

    </div>
  );
};

export default TagList;