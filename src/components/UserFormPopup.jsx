import React from 'react';
import { Users } from 'lucide-react';
import FormLayout from '../Layouts/FormLayout.jsx';
import NFCReaderButton from './NFCReaderButton.jsx';

function UserFormPopup({ showPopup, editMode, formData, setFormData, handleAddUser, setShowPopup, setEditMode }) {
  const userIdInputRef = React.useRef(null);

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

  const planInput = {
    name: 'plan',
    type: 'select',
    placeholder: 'Plan',
    required: false,
    autocomplete: 'off',
    options: [
      { value: 'Discover', label: 'Discover' },
      { value: 'Enterprise', label: 'Enterprise' },
      { value: 'Professional', label: 'Professional' },
    ],
  };

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

  const inputs = [...baseInputs, planInput, userIdInput];

  const customLayout = [
    { columns: 3, inputs: ['name', 'phone_number', 'plan'] },
    {
      type: 'flex',
      inputs: [
        { name: 'email', flex: 2 },
        { name: 'password', flex: 1 }
      ]
    },
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