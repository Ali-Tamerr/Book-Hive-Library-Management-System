import React from 'react';
import FormLayout from '../Layouts/FormLayout.jsx';

function ReportFormPopup({ showPopup, formData, setFormData, handleAddReport, setShowPopup }) {
  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputs = [
    { name: 'report_name', label: 'Report Name', type: 'text', placeholder: 'Enter report name', required: true },
    { name: 'report_type', label: 'Report Type', type: 'text', placeholder: 'Enter report type', required: true },
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