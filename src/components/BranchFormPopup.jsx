import React from 'react';
import FormLayout from '../Layouts/FormLayout.jsx';

const BranchFormPopup = ({ showPopup, editMode, formData, setFormData, handleAddBranch, setShowPopup, setEditMode }) => {
    if (!showPopup) return null;

    const onFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const inputs = [
        { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter branch name', required: true },
        { name: 'location', label: 'Location', type: 'text', placeholder: 'Enter location', required: true },
        { name: 'contact_number', label: 'Contact Number', type: 'text', placeholder: 'Enter contact number' },
    ];

    return (
        <FormLayout
            show={showPopup}
            onClose={() => { setShowPopup(false); setEditMode(false); }}
            title={editMode ? 'Edit Branch' : 'Add New Branch'}
            onSubmit={handleAddBranch}
            inputs={inputs}
            formData={formData}
            onFormChange={onFormChange}
            submitButtonText={editMode ? 'Update' : 'Add'}
            onCancel={() => { setShowPopup(false); setEditMode(false); }}
        />
    );
};

export default BranchFormPopup;
