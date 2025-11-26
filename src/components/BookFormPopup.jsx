import React, { useEffect } from 'react';
import FormLayout from '../Layouts/FormLayout.jsx';

function BookFormPopup({ showPopup, editMode, formData, setFormData, handleAddBook, setShowPopup, setEditMode, categories, languages }) {
  const [nfcTagId, setNfcTagId] = React.useState('');
  const [isConnected, setIsConnected] = React.useState(false);
  const portRef = React.useRef(null);
  const readerRef = React.useRef(null);
  const isbnInputRef = React.useRef(null);

  // This useEffect hook handles the cleanup of the serial port connection.
  useEffect(() => {
    return () => {
      if (readerRef.current) {
        readerRef.current.cancel().catch(e => console.error("Error cancelling reader on unmount:", e));
      }
      if (portRef.current) {
        portRef.current.close().catch(e => console.error("Error closing port on unmount:", e));
        portRef.current = null;
      }
    };
  }, []);

  const disconnectFromArduino = async () => {
    if (readerRef.current) {
      await readerRef.current.cancel().catch(e => console.error("Error cancelling reader on disconnect:", e));
      // The read loop's finally block will do the rest.
    } else if (portRef.current) {
      // Fallback if reader isn't set up but port is.
      await portRef.current.close().catch(e => console.error("Error closing port:", e));
      setIsConnected(false);
      portRef.current = null;
    }
  };

  const connectToArduino = async () => {
    if (portRef.current) {
      console.warn("A port is already selected. Disconnect first.");
      return;
    }

    try {
      const port = await navigator.serial.requestPort();
      portRef.current = port;
      await port.open({ baudRate: 9600 });
      setIsConnected(true);
      if (isbnInputRef.current) {
        isbnInputRef.current.focus();
      }

      port.ondisconnect = (event) => {
        console.log("Serial port disconnected:", event);
        setIsConnected(false);
        portRef.current = null;
        readerRef.current = null;
      };

      const textDecoder = new TextDecoderStream();
      port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();
      readerRef.current = reader;

      // Asynchronously read from the serial port until the component unmounts or an error occurs
      (async () => {
        let buffer = '';
        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) {
              break;
            }
            buffer += value;
            const lines = buffer.split('\n');
            if (lines.length > 1) {
              const completeLine = lines.shift().trim();
              if (completeLine) {
                console.log('NFC Tag ID:', completeLine);
                setNfcTagId(completeLine);
                setFormData(prevData => ({ ...prevData, book_id: completeLine }));
              }
              buffer = lines.join('\n');
            }
          }
        } catch (error) {
          console.log("Read loop was cancelled or an error occurred:", error);
        } finally {
          reader.releaseLock();
          setIsConnected(false);
          if (portRef.current) {
            await portRef.current.close();
            portRef.current = null;
          }
          readerRef.current = null;
        }
      })();
    } catch (error) {
      console.error("Failed to connect to the serial device:", error);
      setIsConnected(false);
      if (portRef.current) {
        portRef.current = null;
      }
    }
  };

  const handleConnectClick = async () => {
    if (isConnected) {
      await disconnectFromArduino();
    } else {
      await connectToArduino();
    }
  };

  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputs = [
    {
      name: 'book_id',
      type: 'custom',
      render: (data, onChange) => (
        <div>
          <label className="text-sm font-medium block">Book ID</label>
          <div className="flex items-center gap-2">
            <input
              ref={isbnInputRef}
              name="book_id"
              type="text"
              value={data.book_id || ''}
              onChange={onChange}
              placeholder="Enter book ID (e.g., B-00123)"
              required
              className="w-full p-5 rounded-xl border-2 border-[#3D3E3E] outline-none focus:border-[#1e255e] text-lg max-[1080px]:text-sm max-[1080px]:p-4"
            />
            <button
              type="button"
              onClick={handleConnectClick}
              className={`px-4 py-2 h-full rounded transition-colors text-[10px] font-semibold whitespace-nowrap ${isConnected
                ? 'bg-red-200 text-red-900 hover:bg-red-300'
                : 'bg-gray-300 hover:bg-gray-400'
                }`}
              style={{ height: '50px' }}
            >
              {isConnected ? "Disconnect" : "Connect to NFC Reader"}
            </button>
          </div>
        </div>
      )
    },
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