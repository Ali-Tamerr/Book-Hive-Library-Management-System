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
    { name: "book_id", type: "text", placeholder: "Book ID", required: true },
    {
      name: "rfid_tag_id",
      type: "number",
      placeholder: "RFID Tag ID (optional)",
    },
    {
      name: "transaction_type",
      type: "select",
      options: [
        { value: "Borrow", label: "Borrow" },
        { value: "Return", label: "Return" },
        { value: "Renewal", label: "Renewal" },
        { value: "SaleConversion", label: "Sale Conversion" },
      ],
    },
    {
      name: "borrow_type",
      type: "select",
      options: [
        { value: "", label: "Select Borrow Type" },
        { value: "InLibrary", label: "In Library" },
        { value: "TakeHome", label: "Take Home" },
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
        { value: "Open", label: "Open" },
        { value: "Completed", label: "Completed" },
        { value: "Overdue", label: "Overdue" },
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
