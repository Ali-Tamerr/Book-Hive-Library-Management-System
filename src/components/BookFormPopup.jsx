import React, { useState } from 'react';
import { BookOpen, Copy } from 'lucide-react';
import FormLayout from '../Layouts/FormLayout.jsx';
import NFCReaderButton from './NFCReaderButton.jsx';
import BookCopiesPopup from './BookCopiesPopup.jsx';

function BookFormPopup({ showPopup, editMode, formData, setFormData, handleAddBook, setShowPopup, setEditMode, categories }) {
  const [showCopiesPopup, setShowCopiesPopup] = useState(false);

  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveBookCopies = (copiesArray) => {
    setFormData(prevData => ({ ...prevData, BookCopies: copiesArray }));
  };

  const inputs = [
    { name: 'name', type: 'text', placeholder: 'Book Name', required: true },
    {
      name: 'category_id',
      type: 'select',
      placeholder: 'Category',
      options: (categories || []).map(cat => ({ value: cat.category_id, label: cat.category_name })),
    },
    { name: 'quantity', type: 'number', placeholder: 'Quantity', required: true },
    {
      name: 'book_copies_button',
      type: 'custom',
      render: (data) => {
        const qty = parseInt(data.quantity, 10) || 0;
        const copiesCount = data.BookCopies?.length || 0;
        const isValid = copiesCount === qty && qty > 0;

        return (
          <button
            type="button"
            onClick={() => setShowCopiesPopup(true)}
            disabled={qty < 1}
            className={`w-full h-[50px] px-4 py-3 rounded-xl border flex items-center justify-center gap-2 text-[13px] font-medium transition-colors ${qty < 1
                ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                : isValid
                  ? 'border-green-500 bg-green-50 text-green-700 hover:bg-green-100'
                  : 'border-[#1e255e] bg-[#f0f1ff] text-[#1e255e] hover:bg-[#e0e2ff]'
              }`}
          >
            <Copy size={18} />
            {copiesCount > 0
              ? `${copiesCount}/${qty} Copy IDs Entered ${isValid ? '✓' : ''}`
              : `Enter ${qty} Copy ID${qty !== 1 ? 's' : ''}`
            }
          </button>
        );
      }
    },
  ];

  const customLayout = [
    { columns: 1, inputs: ['name'] },
    { columns: 2, inputs: ['quantity', 'category_id'] },
    { columns: 1, inputs: ['book_copies_button'] },
  ];

  return (
    <>
      <FormLayout
        show={showPopup}
        onClose={() => { setShowPopup(false); setEditMode(false); }}
        title={editMode ? 'Edit Book' : 'Add New Book'}
        onSubmit={handleAddBook}
        inputs={inputs}
        formData={formData}
        onFormChange={onFormChange}
        submitButtonText={editMode ? 'UPDATE' : 'ADD'}
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