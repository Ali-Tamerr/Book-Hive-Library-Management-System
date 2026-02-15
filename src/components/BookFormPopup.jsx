import React, { useState } from 'react';
import { BookOpen, Copy } from 'lucide-react';
import FormLayout from '../Layouts/FormLayout.jsx';
import BookCopiesPopup from './BookCopiesPopup.jsx';

function BookFormPopup({ showPopup, editMode, formData, setFormData, handleAddBook, setShowPopup, setEditMode, categories }) {
  const [showCopiesPopup, setShowCopiesPopup] = useState(false);

  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveBookCopies = (copiesArray) => {
    const updatedData = { ...formData, BookCopies: copiesArray };
    setFormData(updatedData);
    // Directly submit the book with the new copies
    if (handleAddBook) {
      handleAddBook(null, updatedData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate required fields
    if (!formData.name || !formData.name.trim()) {
      alert('Please enter a book name');
      return;
    }
    const qty = parseInt(formData.quantity, 10);
    if (!qty || qty < 1) {
      alert('Please enter a valid quantity');
      return;
    }
    if (!formData.category_id) {
      alert('Please select a category');
      return;
    }

    setShowCopiesPopup(true);
  };

  const inputs = [
    { name: 'name', type: 'text', placeholder: 'Name', required: true },
    { name: 'quantity', type: 'number', placeholder: 'Quantity', required: true },
    {
      name: 'category_id',
      type: 'select',
      placeholder: 'Category',
      options: (categories || []).map(cat => ({ value: cat.category_id, label: cat.category_name })),
    },
    // {
    //   name: 'copy_indicator',
    //   type: 'custom',
    //   render: () => (
    //     <div className="flex justify-center w-full">
    //       <div className="w-[150px] h-[45px] rounded-xl border border-[#3D3E3E] flex items-center justify-center bg-white text-[#0a0f33]">
    //         <Copy size={20} />
    //       </div>
    //     </div>
    //   )
    // },
  ];

  const customLayout = [
    { columns: 1, inputs: ['name'] },
    { columns: 2, inputs: ['quantity', 'category_id'] },
    { columns: 1, inputs: ['copy_indicator'] },
  ];

  return (
    <>
      <FormLayout
        show={showPopup}
        onClose={() => { setShowPopup(false); setEditMode(false); }}
        title={editMode ? 'Edit Book' : 'Add Book'}
        onSubmit={handleSubmit}
        inputs={inputs}
        formData={formData}
        onFormChange={onFormChange}
        submitButtonText="Enter Ids"
        onCancel={() => { setShowPopup(false); setEditMode(false); }}
        icon={<BookOpen size={24} strokeWidth={2.3} />}
        customLayout={customLayout}
      />
      <BookCopiesPopup
        show={showCopiesPopup}
        onClose={() => setShowCopiesPopup(false)}
        quantity={formData.quantity}
        bookCopies={formData.BookCopies}
        onSave={handleSaveBookCopies}
      />
    </>
  );
}

export default BookFormPopup;