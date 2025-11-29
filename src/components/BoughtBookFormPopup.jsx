import React from 'react';
import { ShoppingCart } from 'lucide-react';
import FormLayout from '../Layouts/FormLayout.jsx';

function BoughtBookFormPopup({ showPopup, editMode, formData, setFormData, handleAddBookSale, setShowPopup, setEditMode }) {
  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputs = [
    { name: 'user_id', type: 'text', placeholder: 'User ID', required: true },
    { name: 'book_id', type: 'text', placeholder: 'Book ID', required: true },
    { name: 'transaction_id', type: 'number', placeholder: 'Transaction ID', required: true },
    { name: 'price', type: 'number', placeholder: 'Price', step: '0.01', required: true },
    { name: 'sale_date', type: 'datetime-local' },
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
      submitButtonText={editMode ? 'UPDATE' : 'ADD'}
      onCancel={() => { setShowPopup(false); setEditMode(false); }}
      icon={<ShoppingCart size={24} strokeWidth={2.3} />}
    />
  );
}

export default BoughtBookFormPopup;