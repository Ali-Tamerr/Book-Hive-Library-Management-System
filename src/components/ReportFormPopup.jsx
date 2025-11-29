import React from 'react';
import { BarChart2 } from 'lucide-react';
import FormLayout from '../Layouts/FormLayout.jsx';

function ReportFormPopup({ showPopup, formData, setFormData, handleAddReport, setShowPopup }) {
  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputs = [
    { name: 'report_name', type: 'text', placeholder: 'Report Name', required: true },
    {
      name: 'report_type',
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
    { name: 'file_path', type: 'text', placeholder: 'File Path (optional)' },
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
      submitButtonText="GENERATE"
      onCancel={() => setShowPopup(false)}
      icon={<BarChart2 size={24} strokeWidth={2.3} />}
    />
  );
}

export default ReportFormPopup;