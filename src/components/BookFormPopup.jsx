import React from 'react';
import { BookOpen } from 'lucide-react';
import FormLayout from '../Layouts/FormLayout.jsx';
import NFCReaderButton from './NFCReaderButton.jsx';

function BookFormPopup({ showPopup, editMode, formData, setFormData, handleAddBook, setShowPopup, setEditMode, categories }) {
  const isbnInputRef = React.useRef(null);

  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNFCData = (data) => {
    setFormData(prevData => ({ ...prevData, book_id: data }));
  };

  const inputs = [
    { name: 'name', type: 'text', placeholder: 'Book Name', required: true },
    {
      name: 'category_id',
      type: 'select',
      options: [
        { value: '', label: 'Select Category' },
        ...(categories || []).map(cat => ({ value: cat.category_id, label: cat.category_name })),
      ],
    },
    { name: 'quantity', type: 'number', placeholder: 'Quantity', required: true },
    {
      name: 'book_id',
      type: 'custom',
      render: (data, onChange) => (
        <div>
          <div className="flex items-center gap-2">
            <NFCReaderButton onDataReceived={handleNFCData} inputRef={isbnInputRef} />
            <input
              ref={isbnInputRef}
              name="book_id"
              type="text"
              value={data.book_id || ''}
              onChange={onChange}
              placeholder="Book ID"
              required
              className="w-full p-5 rounded-xl border border-[#3D3E3E] outline-none focus:border-[#1e255e] text-lg max-[1080px]:text-sm max-[1080px]:p-4"
            />
          </div>
        </div>
      )
    },
  ];

  const customLayout = [
    { columns: 1, inputs: ['name'] },
    { columns: 2, inputs: ['quantity', 'category_id'] },
    { columns: 1, inputs: ['book_id'] },
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
      submitButtonText={editMode ? 'UPDATE' : 'ADD'}
      onCancel={() => { setShowPopup(false); setEditMode(false); }}
      icon={<BookOpen size={24} strokeWidth={2.3} />}
      customLayout={customLayout}
    />
  );
}

export default BookFormPopup;