import React from 'react';
import { Folder } from 'lucide-react';
import FormLayout from '../Layouts/FormLayout.jsx';

function CategoryFormPopup({ showPopup, editMode, formData, setFormData, handleAddCategory, setShowPopup, setEditMode }) {
  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputs = [
    { name: 'name', type: 'text', placeholder: 'Name', required: true },
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
      submitButtonText={editMode ? 'UPDATE' : 'ADD'}
      onCancel={() => { setShowPopup(false); setEditMode(false); }}
      icon={<Folder size={24} strokeWidth={2.3} />}
    />
  );
}

export default CategoryFormPopup;