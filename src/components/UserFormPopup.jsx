import React from "react";
import { Users } from "lucide-react";
import FormLayout from "../Layouts/FormLayout.jsx";
import NFCReaderButton from "./NFCReaderButton.jsx";
import FormInput from "./FormInput.jsx";
import { usePlans } from "../hooks/usePlans";

function UserFormPopup({
  showPopup,
  editMode,
  formData,
  setFormData,
  handleAddUser,
  setShowPopup,
  setEditMode,
  isSuperAdmin = false,
  error,
  nextUserId,
  branches = [],
}) {
  const userIdInputRef = React.useRef(null);
  const { data: plansData } = usePlans();

  const onFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "role") {
      const isStaff = value === "Admin" || value === "Librarian";
      const newId =
        !editMode && nextUserId && value === "Admin"
          ? nextUserId.toString()
          : formData.user_id;

      setFormData({
        ...formData,
        [name]: value,
        plan: isStaff ? null : formData.plan,
        user_id: newId,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNFCData = React.useCallback(
    (data) => {
      setFormData((prevData) => ({ ...prevData, user_id: data }));
    },
    [setFormData],
  );

  const baseInputs = [
    {
      name: "first_name",
      type: "text",
      placeholder: "First Name",
      required: true,
      autocomplete: "given-name",
    },
    {
      name: "last_name",
      type: "text",
      placeholder: "Last Name",
      required: true,
      autocomplete: "family-name",
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      autocomplete: "email",
    },
    {
      name: "password",
      type: "password",
      placeholder: editMode ? "Password (leave blank)" : "Password",
      required: !editMode,
      autocomplete: editMode ? "off" : "new-password",
    },
  ];

  const planInput = {
    name: "plan",
    type: "select",
    placeholder: "Plan",
    required: false,
    autocomplete: "off",
    options: plansData
      ? plansData.map((p) => ({ value: p.id, label: `Plan: ${p.title}` }))
      : [],
  };

  const roleInput = {
    name: "role",
    type: "select",
    placeholder: "User",
    required: true,
    autocomplete: "off",
    options: [
      { value: "User", label: "Role: User" },
      { value: "Admin", label: "Role: Admin" },
      { value: "Librarian", label: "Role: Librarian" },
    ],
  };

  const branchInput = {
    name: "branch_id",
    type: "select",
    placeholder: "Branch",
    required: false,
    autocomplete: "off",
    options: branches.map((b) => ({
      value: b.branch_id,
      label: b.name,
    })),
  };

  const userIdInput = {
    name: "user_id",
    type: "custom",
    render: (data, onChange) => (
      <div className="flex items-center gap-2">
        <div className="w-auto">
          <NFCReaderButton
            onDataReceived={handleNFCData}
            inputRef={userIdInputRef}
            isFlexOne
          />
        </div>
        <div className="flex-1">
          <FormInput
            inputRef={userIdInputRef}
            name="user_id"
            type="text"
            value={data.user_id}
            onChange={onChange}
            placeholder="ID"
            required
            autocomplete="off"
          />
        </div>
      </div>
    ),
  };

  const isRoleUser = formData.role === "User";
  const isRoleAdmin = formData.role === "Admin";

  const editInputs = [
    ...baseInputs,
    isRoleUser ? planInput : null,
    roleInput,
    branchInput,
  ].filter(Boolean);

  const addInputs = isSuperAdmin
    ? isRoleAdmin
      ? [
          ...baseInputs,
          roleInput,
          branchInput,
        ].filter(Boolean)
      : [
          ...baseInputs,
          isRoleUser ? planInput : null,
          roleInput,
          branchInput,
          userIdInput,
        ].filter(Boolean)
    : [
        ...baseInputs,
        isRoleUser ? planInput : null,
        userIdInput,
      ].filter(Boolean);

  const inputs = editMode ? editInputs : addInputs;

  const editCustomLayout = [
    { type: "flex", inputs: ["first_name", "last_name"] },
    { type: "flex", inputs: ["email", "password"] },
    { type: "flex", inputs: isRoleUser ? ["plan", "role"] : ["role"] },
    { type: "flex", inputs: ["branch_id"] },
  ];

  const addCustomLayout = isSuperAdmin
    ? [
        { type: "flex", inputs: ["first_name", "last_name"] },
        { type: "flex", inputs: ["email", "password"] },
        isRoleUser
          ? { type: "flex", inputs: ["plan", "role"] }
          : { type: "flex", inputs: ["role"] },
        { type: "flex", inputs: ["branch_id"] },
        { type: "flex", inputs: ["user_id"] },
      ]
    : [
        { type: "flex", inputs: ["first_name", "last_name"] },
        { type: "flex", inputs: ["email", "password"] },
        isRoleUser ? { type: "flex", inputs: ["plan"] } : null,
        { type: "flex", inputs: ["user_id"] },
      ].filter(Boolean);

  const customLayout = editMode ? editCustomLayout : addCustomLayout;

  return (
    <FormLayout
      show={showPopup}
      onClose={() => {
        setShowPopup(false);
        setEditMode(false);
      }}
      title={editMode ? "Edit User" : "Add New User"}
      onSubmit={handleAddUser}
      inputs={inputs}
      formData={formData}
      onFormChange={onFormChange}
      submitButtonText={editMode ? "UPDATE" : "ADD"}
      onCancel={() => {
        setShowPopup(false);
        setEditMode(false);
      }}
      icon={<Users size={24} strokeWidth={2.3} />}
      customLayout={customLayout}
      error={error}
    />
  );
}

export default UserFormPopup;
