import React from 'react';
import { Users } from 'lucide-react';
import FormLayout from '../Layouts/FormLayout.jsx';
import NFCReaderButton from './NFCReaderButton.jsx';
import { getCurrentUser } from '../services/auth.api';

function UserFormPopup({ showPopup, editMode, formData, setFormData, handleAddUser, setShowPopup, setEditMode }) {
  const userIdInputRef = React.useRef(null);
  const currentUser = getCurrentUser();
  const isSuperAdmin = currentUser?.role === 'Super Admin';

  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNFCData = (data) => {
    setFormData(prevData => ({ ...prevData, user_id: data }));
  };

  const baseInputs = [
    { name: 'name', type: 'text', placeholder: 'Name', required: true, autocomplete: 'name' },
    { name: 'email', type: 'email', placeholder: 'Email', required: true, autocomplete: 'email' },
    { name: 'phone_number', type: 'text', placeholder: 'Contact No', autocomplete: 'tel' },
    { name: 'password', type: 'password', placeholder: editMode ? "Password (leave blank to keep current)" : "Password", required: !editMode, autocomplete: editMode ? 'off' : 'new-password' },
  ];

  const roleInput = isSuperAdmin ? {
    name: 'role',
    type: 'select',
    placeholder: 'Role',
    required: true,
    autocomplete: 'off',
    options: [
      { value: 'User', label: 'User' },
      { value: 'Admin', label: 'Admin' },
      { value: 'Super Admin', label: 'Super Admin' },
    ],
  } : null;

  const userIdInput = {
    name: 'user_id',
    type: 'custom',
    render: (data, onChange) => (
      <div>
        <div className="flex items-center gap-2">
          <div className='flex-1'>
            <NFCReaderButton onDataReceived={handleNFCData} inputRef={userIdInputRef} />
          </div>
          <div className='flex-2'>
            <input
              ref={userIdInputRef}
              name="user_id"
              type="text"
              value={data.user_id || ''}
              onChange={onChange}
              placeholder="User ID"
              required
              autoComplete="off"
              className="w-full h-[50px] px-4 py-3 rounded-xl border border-[#3D3E3E] outline-none focus:border-[#1e255e] text-[13px]"
            />
          </div>
        </div>
      </div>
    ),
  };

  const inputs = roleInput
    ? [...baseInputs, roleInput, userIdInput]
    : [...baseInputs, userIdInput];

  const customLayout = roleInput
    ? [
      { columns: 3, inputs: ['name', 'phone_number', 'role'] },
      { columns: 2, inputs: ['email', 'password'] },
      { columns: 1, inputs: ['user_id'] },
    ]
    : [
      { columns: 2, inputs: ['name', 'phone_number'] },
      { columns: 2, inputs: ['email', 'password'] },
      { columns: 1, inputs: ['user_id'] },
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
      submitButtonText={editMode ? 'UPDATE' : 'ADD'}
      onCancel={() => { setShowPopup(false); setEditMode(false); }}
      icon={<Users size={24} strokeWidth={2.3} />}
      customLayout={customLayout}
    />
  );
}

export default UserFormPopup;