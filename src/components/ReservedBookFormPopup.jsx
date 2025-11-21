import React from 'react';
import FormLayout from '../Layouts/FormLayout.jsx';

function ReservedBookFormPopup({ showPopup, editMode, formData, setFormData, handleAddReservation, setShowPopup, setEditMode }) {
  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputs = [
    { name: 'book_id', label: 'Book ID', type: 'text', placeholder: 'Enter book ID', required: true },
    { name: 'user_id', label: 'User ID', type: 'text', placeholder: 'Enter user ID', required: true },
    { name: 'reservation_date', label: 'Reservation Date', type: 'date', required: true },
  ];

  return (
    <FormLayout
      show={showPopup}
      onClose={() => { setShowPopup(false); setEditMode(false); }}
      title={editMode ? 'Edit Reservation' : 'Add New Reservation'}
      onSubmit={handleAddReservation}
      inputs={inputs}
      formData={formData}
      onFormChange={onFormChange}
      submitButtonText={editMode ? 'Update' : 'Add'}
      onCancel={() => { setShowPopup(false); setEditMode(false); }}
    />
  );
}

export default ReservedBookFormPopup;