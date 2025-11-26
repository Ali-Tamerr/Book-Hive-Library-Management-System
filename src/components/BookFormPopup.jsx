import React from 'react';
import FormLayout from '../Layouts/FormLayout.jsx';

function BookFormPopup({ showPopup, editMode, formData, setFormData, handleAddBook, setShowPopup, setEditMode, categories, languages }) {
  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputs = [
    { name: 'book_id', label: 'Book ID', type: 'text', placeholder: 'Enter book ID (e.g., B-00123)', required: true },
    { name: 'name', label: 'Book Name', type: 'text', placeholder: 'Enter book name', required: true },
    {
      name: 'category_id',
      label: 'Category',
      type: 'select',
      options: [
        { value: '', label: 'Select Category' },
        ...(categories || []).map(cat => ({ value: cat.category_id, label: cat.category_name })),
      ],
    },
    {
      name: 'language_id',
      label: 'Language',
      type: 'select',
      options: [
        { value: '', label: 'Select Language' },
        ...(languages || []).map(lang => ({ value: lang.language_id, label: lang.name })),
      ],
    },
    { name: 'quantity', label: 'Quantity', type: 'number', placeholder: 'Enter quantity', required: true },
    { name: 'sale_price', label: 'Sale Price', type: 'number', placeholder: 'Enter sale price', step: '0.01' },
  ];

  return (
    <FormLayout
      show={showPopup}
      onClose={() => { setShowPopup(false); setEditMode(false); }}
      title={editMode ? 'Edit Book' : 'Add New Book'}
      onSubmit={handleAddBook}
      inputs={inputs}
      formData={formData}
      onFormChange={onFormChange}
      submitButtonText={editMode ? 'Update' : 'Add'}
      onCancel={() => { setShowPopup(false); setEditMode(false); }}
    />
  );
}

export default BookFormPopup;