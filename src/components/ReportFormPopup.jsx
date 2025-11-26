import React from 'react';
import FormLayout from '../Layouts/FormLayout.jsx';

function ReportFormPopup({ showPopup, formData, setFormData, handleAddReport, setShowPopup }) {
  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputs = [
    { name: 'report_name', label: 'Report Name', type: 'text', placeholder: 'Enter report name', required: true },
    {
      name: 'report_type',
      label: 'Report Type',
      type: 'select',
      options: [
        { value: '', label: 'Select Report Type' },
        { value: 'Inventory', label: 'Inventory' },
        { value: 'Transactions', label: 'Transactions' },
        { value: 'Users', label: 'Users' },
        { value: 'Sales', label: 'Sales' },
        { value: 'Reservations', label: 'Reservations' },
        { value: 'Overdue', label: 'Overdue Books' },
        { value: 'Monthly', label: 'Monthly Summary' },
        { value: 'Annual', label: 'Annual Summary' },
      ],
      required: true
    },
    { name: 'file_path', label: 'File Path', type: 'text', placeholder: 'Enter file path (optional)' },
  ];

  return (
    <FormLayout
      show={showPopup}
      onClose={() => setShowPopup(false)}
      title="Generate New Report"
      onSubmit={handleAddReport}
      inputs={inputs}
      formData={formData}
      onFormChange={onFormChange}
      submitButtonText="Generate"
      onCancel={() => setShowPopup(false)}
    />
  );
}

export default ReportFormPopup;