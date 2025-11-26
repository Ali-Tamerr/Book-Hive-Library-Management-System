import React, { useState, useEffect, useRef } from 'react';
import FormLayout from '../Layouts/FormLayout.jsx';

function UserFormPopup({ showPopup, editMode, formData, setFormData, handleAddUser, setShowPopup, setEditMode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isWebSerialSupported, setIsWebSerialSupported] = useState(false);
  const portRef = useRef(null);
  const readerRef = useRef(null);

  useEffect(() => {
    if ("serial" in navigator) {
      setIsWebSerialSupported(true);
    }
  }, []);

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
    } else if (portRef.current) {
      await portRef.current.close().catch(e => console.error("Error closing port:", e));
    }
    setIsConnected(false);
    portRef.current = null;
    readerRef.current = null;
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

      port.ondisconnect = () => {
        setIsConnected(false);
        portRef.current = null;
        readerRef.current = null;
      };

      const textDecoder = new TextDecoderStream();
      port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();
      readerRef.current = reader;

      (async () => {
        let buffer = '';
        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            buffer += value;
            const lines = buffer.split('\n');
            if (lines.length > 1) {
              const completeLine = lines.shift().trim();
              if (completeLine) {
                setFormData(prevData => ({ ...prevData, user_id: completeLine }));
              }
              buffer = lines.join('\n');
            }
          }
        } catch (error) {
          console.log("Read loop was cancelled or an error occurred:", error);
        } finally {
          reader.releaseLock();
        }
      })();
    } catch (error) {
      if (error.name !== 'NotFoundError') {
        console.error("Failed to connect to the serial device:", error);
        alert(`An error occurred while connecting to the NFC reader: ${error.message}`);
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
      name: 'user_id',
      label: 'User ID',
      type: 'custom',
      render: (data, onChange) => (
        <div>
          <label className="text-sm font-medium block">User ID</label>
          <div className="flex items-center gap-2">
            <input
              name="user_id"
              type="text"
              value={data.user_id || ''}
              onChange={onChange}
              placeholder="Enter User ID (e.g., U-10001)"
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
      ),
    },
    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter full name', required: true },
    { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter username', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email', required: true },
    { name: 'phone_number', label: 'Phone Number', type: 'text', placeholder: 'Enter phone number' },
    { name: 'password', label: 'Password', type: 'password', placeholder: editMode ? "Leave blank to keep current password" : "Enter password", required: !editMode },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { value: 'Member', label: 'Member' },
        { value: 'Librarian', label: 'Librarian' },
        { value: 'Admin', label: 'Admin' },
      ],
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
        { value: 'Suspended', label: 'Suspended' },
      ],
    },
  ];

  return (
    <FormLayout
      show={showPopup}
      onClose={() => { setShowPopup(false); setEditMode(false); }}
      title={editMode ? 'Edit User' : 'Add New User'}
      onSubmit={handleAddUser}
      inputs={inputs}
      formData={formData}
      onFormChange={onFormChange}
      submitButtonText={editMode ? 'Update' : 'Add'}
      onCancel={() => { setShowPopup(false); setEditMode(false); }}
    />
  );
}

export default UserFormPopup;