import React from 'react';
import FormLayout from '../Layouts/FormLayout.jsx';

function BorrowedBookFormPopup({ showPopup, editMode, formData, setFormData, handleAddBorrowedBook, setShowPopup, setEditMode }) {
  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputs = [
    { name: 'book_id', label: 'Book ID', type: 'text', placeholder: 'Enter book ID', required: true },
    { name: 'user_id', label: 'User ID', type: 'text', placeholder: 'Enter user ID', required: true },
    { name: 'borrow_date', label: 'Borrow Date', type: 'date', required: true },
    { name: 'due_date', label: 'Due Date', type: 'date', required: true },
    { name: 'return_date', label: 'Return Date', type: 'date' },
  ];

  return (
    <FormLayout
      show={showPopup}
      onClose={() => { setShowPopup(false); setEditMode(false); }}
      title={editMode ? 'Edit Borrowed Book' : 'Add New Borrowed Book'}
      onSubmit={handleAddBorrowedBook}
      inputs={inputs}
      formData={formData}
      onFormChange={onFormChange}
      submitButtonText={editMode ? 'Update' : 'Add'}
      onCancel={() => { setShowPopup(false); setEditMode(false); }}
    />
  );
}

export default BorrowedBookFormPopup;