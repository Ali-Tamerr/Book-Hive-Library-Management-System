import React from "react";
import { RotateCcw } from "lucide-react";
import FormLayout from "../Layouts/FormLayout.jsx";

function BorrowedBookFormPopup({
  showPopup,
  editMode,
  formData,
  setFormData,
  handleAddBorrowedBook,
  setShowPopup,
  setEditMode,
}) {
  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputs = [
    { name: "user_id", type: "text", placeholder: "User ID", required: true },
    { name: "book_id", type: "text", placeholder: "Book Copy ID", required: true },
    {
      name: "transaction_type",
      type: "select",
      options: [
        { value: "Check-Out", label: "Check-Out" },
        { value: "Check-In", label: "Check-In" },
      ],
    },
    {
      name: "borrow_type",
      type: "select",
      options: [
        { value: "", label: "Select Borrow Type" },
        { value: "Borrow", label: "Borrow" },
        { value: "Purchase", label: "Purchase" },
      ],
    },
    { name: "due_date", type: "datetime-local" },
    { name: "return_date", type: "datetime-local" },
    {
      name: "fine_amount",
      type: "number",
      placeholder: "Fine Amount",
      step: "0.01",
    },
    {
      name: "status",
      type: "select",
      options: [
        { value: "Pending", label: "Pending" },
        { value: "Completed", label: "Completed" },
        { value: "Overdue", label: "Overdue" },
        { value: "Returned", label: "Returned" },
      ],
    },
  ];

  return (
    <FormLayout
      show={showPopup}
      onClose={() => {
        setShowPopup(false);
        setEditMode(false);
      }}
      title={editMode ? "Edit Transaction" : "Add New Transaction"}
      onSubmit={handleAddBorrowedBook}
      inputs={inputs}
      formData={formData}
      onFormChange={onFormChange}
      submitButtonText={editMode ? "UPDATE" : "ADD"}
      onCancel={() => {
        setShowPopup(false);
        setEditMode(false);
      }}
      icon={<RotateCcw size={24} strokeWidth={2.3} />}
    />
  );
}

export default BorrowedBookFormPopup;
