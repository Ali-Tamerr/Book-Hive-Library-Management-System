import React from 'react';
import { BookmarkPlus } from 'lucide-react';
import FormLayout from '../Layouts/FormLayout.jsx';

function ReservedBookFormPopup({ showPopup, editMode, formData, setFormData, handleAddReservation, setShowPopup, setEditMode }) {
  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputs = [
    { name: 'user_id', type: 'text', placeholder: 'User ID', required: true },
    { name: 'book_id', type: 'text', placeholder: 'Book Copy ID', required: true },
    { name: 'reservation_date', type: 'datetime-local' },
    { name: 'expiration_date', type: 'datetime-local', required: true },
    {
      name: 'status',
      type: 'select',
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Cancelled', label: 'Cancelled' },
        { value: 'Fulfilled', label: 'Fulfilled' },
      ],
    },
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
      submitButtonText={editMode ? 'UPDATE' : 'ADD'}
      onCancel={() => { setShowPopup(false); setEditMode(false); }}
      icon={<BookmarkPlus size={24} strokeWidth={2.3} />}
    />
  );
}

export default ReservedBookFormPopup;