import Popup from './Popup.jsx';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function BookFormPopup({ showPopup, editMode, formData, setFormData, handleAddBook, setShowPopup, setEditMode, categories }) {

  const [nfcTagId, setNfcTagId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isWebSerialSupported, setIsWebSerialSupported] = useState(false);
  const portRef = useRef(null);
  const readerRef = useRef(null);
  const isbnInputRef = useRef(null);

  // Check for Web Serial API support on component mount
  useEffect(() => {
    if ("serial" in navigator) {
      setIsWebSerialSupported(true);
    }
  }, []);

  // This useEffect hook handles the cleanup of the serial port connection.
  // It runs when the component unmounts to prevent leaving the port in a busy state.
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
    if (!isWebSerialSupported) {
      alert("Your browser does not support the Web Serial API. Please use a compatible browser like Chrome or Edge.");
      return;
    }
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
                setFormData(prevData => ({ ...prevData, isbn: completeLine }));
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
      if (error.name === 'NotFoundError') {
        // Silently ignore the error if the user cancels the port selection dialog.
        console.log("User cancelled port selection.");
      } else {
        console.error("Failed to connect to the serial device:", error);
        alert(`An error occurred while connecting to the NFC reader: ${error.message}`);
      }
      setIsConnected(false);
      if (portRef.current) {
        portRef.current = null;
      }
    }
  };

  const handleConnectClick = async () => {
    if (!("serial" in navigator)) {
      alert("Error: Your browser does not support the Web Serial API.\nPlease use Google Chrome, Microsoft Edge, or Opera for this feature.");
      return;
    }

    if (isConnected) {
      await disconnectFromArduino();
    } else {
      await connectToArduino();
    }
  };

  const [activeTab, setActiveTab] = useState('books');

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/admin/books')) {
      setActiveTab('books');
    }
  }, [location.pathname]);

  return (
    <Popup show={showPopup} onClose={() => { setShowPopup(false); setEditMode(false); disconnectFromArduino(); }} title={editMode ? 'Edit Book' : 'Add New Book'} maxWidthClass="max-w-[700px]">
      <form onSubmit={handleAddBook} className="grid grid-cols-2 gap-4">
        <div>
       
          <label className="text-sm font-medium block">title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter title"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block">author</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            placeholder="Enter author"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block">isbn</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleConnectClick}
              className={`px-4 py-2 rounded transition-colors text-[10px] font-semibold ${
                isConnected
                  ? 'bg-red-200 text-red-900 hover:bg-red-300'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            >
              {isConnected ? "Disconnect" : "Connect to NFC Reader"}
            </button>
          <input
            type="text"
            value={formData.isbn}
            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
            placeholder="Enter isbn"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            ref={isbnInputRef}
          />
          </div>
          
        </div>
        <div className='flex flex-col'>
          <label className="text-sm font-medium block">publisher</label>
          <input
            type="text"
            value={formData.publisher}
            onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
            placeholder="Enter publisher"
            className="w-full flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block">Publication Year</label>
          <input
            type="number"
            value={formData.publication_year}
            onChange={(e) => setFormData({ ...formData, publication_year: e.target.value })}
            placeholder="Enter publication year"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block">Category</label>
          <select
            value={formData.category_id}
            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="">Select Category</option>
            {categories && categories.map(category => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium block">Total Copies</label>
          <input
            type="number"
            value={formData.total_copies}
            onChange={(e) => setFormData({ ...formData, total_copies: e.target.value })}
            placeholder="Enter total copies"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block">Available Copies</label>
          <input
            type="number"
            value={formData.available_copies}
            onChange={(e) => setFormData({ ...formData, available_copies: e.target.value })}
            placeholder="Enter available copies"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block">Sale Price</label>
          <input
            type="number"
            value={formData.sale_price}
            onChange={(e) => setFormData({ ...formData, sale_price: e.target.value })}
            placeholder="Enter sale price"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block">Digital URL</label>
          <input
            type="text"
            value={formData.digital_url}
            onChange={(e) => setFormData({ ...formData, digital_url: e.target.value })}
            placeholder="Enter digital URL"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div className="col-span-2">
          <label className="text-sm font-medium block">description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter description"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div className="col-span-2 flex justify-between mt-5">
          <button
            type="submit"
            className="bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors font-semibold"
          >
            {editMode ? 'Update' : 'Add'}
          </button>
          <button
            type="button"
            onClick={() => {
              setShowPopup(false);
              setEditMode(false);
            }}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </Popup>
  );
}

export default BookFormPopup;