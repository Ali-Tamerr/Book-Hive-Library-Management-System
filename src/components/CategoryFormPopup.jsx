import React from 'react';
import { Folder } from 'lucide-react';
import FormLayout from '../Layouts/FormLayout.jsx';

function CategoryFormPopup({ showPopup, editMode, formData, setFormData, handleAddCategory, setShowPopup, setEditMode }) {
  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cancelHoverClass = editMode
    ? "hover:bg-[#000035] hover:text-white dark:hover:bg-[#000035] dark:hover:text-white"
    : "";
  const updateHoverClass = editMode
    ? "hover:bg-white hover:text-[#000035] hover:border-[#000035] dark:hover:bg-white dark:hover:text-[#000035] dark:hover:border-[#000035]"
    : "";

  const inputs = [
    { name: 'name', type: 'text', placeholder: 'Name', required: true },
    { name: 'description', type: 'text', placeholder: 'Description' },
  ];

  return (
    <FormLayout
      show={showPopup}
      onClose={() => { setShowPopup(false); setEditMode(false); }}
      title={editMode ? 'Edit Category' : 'Add Category'}
      onSubmit={handleAddCategory}
      inputs={inputs}
      formData={formData}
      onFormChange={onFormChange}
      submitButtonText={editMode ? 'UPDATE' : 'ADD'}
      cancelButtonClassName={cancelHoverClass}
      submitButtonClassName={updateHoverClass}
      onCancel={() => { setShowPopup(false); setEditMode(false); }}
      icon={<Folder size={24} strokeWidth={2.3} />}
    />
  );
}

export default CategoryFormPopup;
