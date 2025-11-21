import React from 'react';
import FormLayout from '../Layouts/FormLayout.jsx';

function BoughtBookFormPopup({ showPopup, editMode, formData, setFormData, handleAddBookSale, setShowPopup, setEditMode }) {
  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputs = [
    { name: 'book_id', label: 'Book ID', type: 'text', placeholder: 'Enter book ID', required: true },
    { name: 'user_id', label: 'User ID', type: 'text', placeholder: 'Enter user ID', required: true },
    { name: 'sale_date', label: 'Sale Date', type: 'date', required: true },
    { name: 'price', label: 'Price', type: 'number', placeholder: 'Enter price', required: true },
  ];

  return (
    <FormLayout
      show={showPopup}
      onClose={() => { setShowPopup(false); setEditMode(false); }}
      title={editMode ? 'Edit Book Sale' : 'Add New Book Sale'}
      onSubmit={handleAddBookSale}
      inputs={inputs}
      formData={formData}
      onFormChange={onFormChange}
      submitButtonText={editMode ? 'Update' : 'Add'}
      onCancel={() => { setShowPopup(false); setEditMode(false); }}
    />
  );
}

export default BoughtBookFormPopup;