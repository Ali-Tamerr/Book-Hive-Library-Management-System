import React from 'react';
import FormLayout from '../Layouts/FormLayout.jsx';

function LanguageFormPopup({ showPopup, editMode, formData, setFormData, handleAddLanguage, setShowPopup, setEditMode }) {
    const onFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const inputs = [
        { name: 'name', label: 'Language Name', type: 'text', placeholder: 'Enter language name', required: true },
        { name: 'code', label: 'Language Code', type: 'text', placeholder: 'Enter ISO code (e.g., en, fr, ar)', required: true },
    ];

    return (
        <FormLayout
            show={showPopup}
            onClose={() => { setShowPopup(false); setEditMode(false); }}
            title={editMode ? 'Edit Language' : 'Add New Language'}
            onSubmit={handleAddLanguage}
            inputs={inputs}
            formData={formData}
            onFormChange={onFormChange}
            submitButtonText={editMode ? 'Update' : 'Add'}
            onCancel={() => { setShowPopup(false); setEditMode(false); }}
        />
    );
}

export default LanguageFormPopup;
