import React from 'react';
import FormLayout from '../Layouts/FormLayout.jsx';

function CategoryFormPopup({ showPopup, editMode, formData, setFormData, handleAddCategory, setShowPopup, setEditMode }) {
  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputs = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter name', required: true },
    { name: 'description', label: 'Description', type: 'text', placeholder: 'Enter description' },
  ];

  return (
    <FormLayout
      show={showPopup}
      onClose={() => { setShowPopup(false); setEditMode(false); }}
      title={editMode ? 'Edit Category' : 'Add New Category'}
      onSubmit={handleAddCategory}
      inputs={inputs}
      formData={formData}
      onFormChange={onFormChange}
      submitButtonText={editMode ? 'Update' : 'Add'}
      onCancel={() => { setShowPopup(false); setEditMode(false); }}
    />
  );
}

export default CategoryFormPopup;