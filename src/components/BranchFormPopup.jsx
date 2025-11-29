import React from 'react';
import { Library } from 'lucide-react';
import FormLayout from '../Layouts/FormLayout.jsx';

const BranchFormPopup = ({ showPopup, editMode, formData, setFormData, handleAddBranch, setShowPopup, setEditMode }) => {
    if (!showPopup) return null;

    const onFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const inputs = [
        { name: 'name', type: 'text', placeholder: 'Name', required: true },
        { name: 'location', type: 'text', placeholder: 'Location', required: true },
        { name: 'contact_number', type: 'text', placeholder: 'Contact Number' },
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
            submitButtonText={editMode ? 'UPDATE' : 'ADD'}
            onCancel={() => { setShowPopup(false); setEditMode(false); }}
            icon={<Library size={24} strokeWidth={2.3} />}
        />
    );
};

export default BranchFormPopup;
