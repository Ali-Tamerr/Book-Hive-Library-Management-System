import React from "react";
import { Users } from "lucide-react";
import FormLayout from "../Layouts/FormLayout.jsx";
import NFCReaderButton from "./NFCReaderButton.jsx";
import FormInput from "./FormInput.jsx";

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

  const onFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "role" && value === "Admin") {
      const newId =
        !editMode && nextUserId ? nextUserId.toString() : formData.user_id;
      setFormData({ ...formData, [name]: value, plan: null, user_id: newId });
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
      placeholder: "Name",
      required: true,
      autocomplete: "name",
    },
    {
      name: "last_name",
      type: "text",
      placeholder: "Last Name",
      required: false,
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
    options: [
      { value: "Discover", label: "Plan: Discover" },
      { value: "Enterprise", label: "Plan: Enterprise" },
      { value: "Professional", label: "Plan: Professional" },
    ],
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
            context="user"
            onDataReceived={handleNFCData}
            inputRef={userIdInputRef}
            bookId={data.user_id}
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

  const isRoleAdmin = formData.role === "Admin";

  const editInputs = [
    baseInputs.find((input) => input.name === "first_name"),
    baseInputs.find((input) => input.name === "email"),
    baseInputs.find((input) => input.name === "password"),
    planInput,
    branchInput,
  ].filter(Boolean);

  const addInputs = isSuperAdmin
    ? isRoleAdmin
      ? [
          baseInputs.find((input) => input.name === "first_name"),
          baseInputs.find((input) => input.name === "email"),
          baseInputs.find((input) => input.name === "password"),
          roleInput,
          branchInput,
        ].filter(Boolean)
      : [
          baseInputs.find((input) => input.name === "first_name"),
          baseInputs.find((input) => input.name === "email"),
          baseInputs.find((input) => input.name === "password"),
          planInput,
          roleInput,
          branchInput,
          userIdInput,
        ].filter(Boolean)
    : [
        baseInputs.find((input) => input.name === "first_name"),
        baseInputs.find((input) => input.name === "email"),
        baseInputs.find((input) => input.name === "password"),
        planInput,
        userIdInput,
      ].filter(Boolean);

  const inputs = editMode ? editInputs : addInputs;

  const editCustomLayout = [
    { type: "flex", inputs: ["first_name", "email"] },
    { type: "flex", inputs: ["password", "plan"] },
    { type: "flex", inputs: ["branch_id"] },
  ];

  const addCustomLayout = isSuperAdmin
    ? [
        { type: "flex", inputs: ["first_name", "email"] },
        { type: "flex", inputs: ["password", "plan"] },
        isRoleAdmin
          ? { type: "flex", inputs: ["role", "branch_id"] }
          : { type: "flex", inputs: ["role", "branch_id"] },
        ...(isRoleAdmin ? [] : [{ type: "flex", inputs: ["user_id"] }]),
      ]
    : [
        { type: "flex", inputs: ["first_name", "email"] },
        { type: "flex", inputs: ["password", "plan"] },
        { type: "flex", inputs: ["user_id"] },
      ];

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
