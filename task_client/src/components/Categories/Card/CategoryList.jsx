import React, { useState } from 'react';
import CategoryCard from './CategoryCard';
import AddCategoryCard from './AddCategoryCard';
import AddCategoryModal from '../Modals/Add/AddCategoryModal';
import ContextMenu from '../ContextMenu';
import ConfirmDeleteCategoryModal from '../Modals/Delete/ConfirmDeleteCategoryModal';
import RenameCategoryModal from '../Modals/Edit/RenameCategoryModal';
import styles from './CategoryList.module.css';

const CategoryList = ({ categories, gradients, fetchCategories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleCardClick = (name) => {
    console.log("Card clicked:", name);
  };

  const handleAddNewClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleShowDeleteModal = (id) => {
    setSelectedCategoryId(id);
    setShowDeleteModal(true);
    closeContextMenu();
  };

  const handleShowRenameModal = (id) => {
    setSelectedCategoryId(id);
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
    <div className={styles.category_list} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '20px', padding: '20px' }}>
      {categories && categories.map((category, index) => (
        <CategoryCard
          key={category.id}
          id={category.id}
          title={category.name}
          color={category.color}
          symbol={category.symbol}
          onCardClick={handleCardClick}
          onRightClick={(e) => handleRightClick(e, category.id, category.isSystem)}
        />
      ))}
      <AddCategoryCard onAddClick={handleAddNewClick} />
      {isModalOpen && (
        <AddCategoryModal
          onClose={handleCloseModal}
          existingTitles={categories.map(category => category.name)}
          fetchCategories={fetchCategories}
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
        <ConfirmDeleteCategoryModal
          onClose={handleCloseDeleteModal}
          CardtoDel={selectedCategoryId}
          fetchCategories={fetchCategories}
        />
      )}

      {showRenameModal && (
        <RenameCategoryModal
          onClose={handleCloseRenameModal}
          currentCategory={categories.find(category => category.id === selectedCategoryId)}
          fetchCategories={fetchCategories}
        />
      )}
    </div>
  );
};

export default CategoryList;