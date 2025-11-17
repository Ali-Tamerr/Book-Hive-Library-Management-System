import Popup from './Popup.jsx';
import React, { useState, useEffect, useRef } from 'react';

function UserFormPopup({ showPopup, editMode, formData, setFormData, handleAddUser, setShowPopup, setEditMode }) {
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
    <Popup show={showPopup} onClose={() => { setShowPopup(false); setEditMode(false); }} title={editMode ? 'Edit User' : 'Add New User'}>
      <form onSubmit={handleAddUser} className="space-y-3">
        <div>
          <label className="text-sm font-medium block">ID</label>
          <div className='flex gap-2'>
          <button
            type="button"
            onClick={handleConnectClick}
            className={`px-4 py-2 rounded transition-colors text-[10px] font-semibold ${isConnected
                ? 'bg-red-200 text-red-900 hover:bg-red-300'
                : 'bg-gray-300 hover:bg-gray-400'
              }`}
          >
            {isConnected ? "Disconnect" : "Connect to NFC Reader"}
          </button>
          <input
            type="text"
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            placeholder="Enter ID"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <label className="text-sm font-medium block">First Name</label>
        <input
          type="text"
          value={formData.first_name}
          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          placeholder="Enter first name"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="text-sm font-medium block">Last Name</label>
        <input
          type="text"
          value={formData.last_name}
          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          placeholder="Enter last name"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="text-sm font-medium block">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="text-sm font-medium block">Phone Number (optional)</label>
        <input
          type="text"
          value={formData.phone_number}
          onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
          placeholder="Enter phone number"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
      {!editMode && (
        <div>
          <label className="text-sm font-medium block">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Enter password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      )}
      <div>
        <label className="text-sm font-medium block">Role</label>
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <div className="flex justify-between mt-5">
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
    </Popup >
  );
}

export default UserFormPopup;