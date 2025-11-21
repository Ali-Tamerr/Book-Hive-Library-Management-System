import React, { useState, useEffect, useRef } from 'react';
import FormLayout from '../Layouts/FormLayout.jsx';

function BookFormPopup({ showPopup, editMode, formData, setFormData, handleAddBook, setShowPopup, setEditMode, categories }) {
  const [isConnected, setIsConnected] = useState(false);
  const portRef = useRef(null);
  const readerRef = useRef(null);
  const [isWebSerialSupported, setIsWebSerialSupported] = useState(false);

  useEffect(() => {
    setIsWebSerialSupported("serial" in navigator);
  }, []);
  
  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConnectClick = async () => {
    if (!isWebSerialSupported) {
      alert("Web Serial API not supported. Please use Chrome or Edge.");
      return;
    }
    if (isConnected) {
      await disconnectFromArduino();
    } else {
      await connectToArduino();
    }
  };
  
  const disconnectFromArduino = async () => {
    if (readerRef.current) {
      await readerRef.current.cancel().catch(console.error);
    }
    if (portRef.current) {
      await portRef.current.close().catch(console.error);
    }
    setIsConnected(false);
    portRef.current = null;
    readerRef.current = null;
  };

  const connectToArduino = async () => {
    try {
      const port = await navigator.serial.requestPort();
      portRef.current = port;
      await port.open({ baudRate: 9600 });
      setIsConnected(true);

      const textDecoder = new TextDecoderStream();
      port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();
      readerRef.current = reader;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const trimmedValue = value.trim();
        if (trimmedValue) {
          setFormData(prev => ({ ...prev, isbn: trimmedValue }));
        }
      }
    } catch (error) {
      if (error.name !== 'NotFoundError') {
        console.error("Error connecting to serial device:", error);
      }
    }
  };

  const inputs = [
    { name: 'title', label: 'Title', type: 'text', placeholder: 'Enter title', required: true },
    { name: 'author', label: 'Author', type: 'text', placeholder: 'Enter author', required: true },
    {
      name: 'isbn',
      label: 'ISBN',
      type: 'custom',
      render: (formData, onFormChange) => (
        <div key="isbn">
          <label className="text-sm font-medium block">ISBN</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleConnectClick}
              className={`px-4 py-2 rounded transition-colors text-[10px] font-semibold ${
                isConnected ? 'bg-red-200 text-red-900 hover:bg-red-300' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            >
              {isConnected ? "Disconnect" : "Connect NFC"}
            </button>
            <input
              type="text"
              name="isbn"
              value={formData.isbn || ''}
              onChange={onFormChange}
              placeholder="Enter ISBN"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>
      ),
    },
    { name: 'publisher', label: 'Publisher', type: 'text', placeholder: 'Enter publisher' },
    { name: 'publication_year', label: 'Publication Year', type: 'number', placeholder: 'Enter publication year' },
    {
      name: 'category_id',
      label: 'Category',
      type: 'select',
      options: [
        { value: '', label: 'Select Category' },
        ...(categories || []).map(cat => ({ value: cat.category_id, label: cat.category_name })),
      ],
    },
    { name: 'total_copies', label: 'Total Copies', type: 'number', placeholder: 'Enter total copies', required: true },
    { name: 'available_copies', label: 'Available Copies', type: 'number', placeholder: 'Enter available copies', required: true },
    { name: 'sale_price', label: 'Sale Price', type: 'number', placeholder: 'Enter sale price' },
    { name: 'digital_url', label: 'Digital URL', type: 'text', placeholder: 'Enter digital URL' },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter description', rows: 4 },
  ];

  return (
    <FormLayout
      show={showPopup}
      onClose={() => { setShowPopup(false); setEditMode(false); disconnectFromArduino(); }}
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