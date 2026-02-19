import React from "react";
import { Users } from "lucide-react";
import FormLayout from "../Layouts/FormLayout.jsx";
import NFCReaderButton from "./NFCReaderButton.jsx";

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
      name: "name",
      type: "text",
      placeholder: "Name",
      required: true,
      autocomplete: "name",
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      required: true,
      autocomplete: "email",
    },
    {
      name: "phone_number",
      type: "text",
      placeholder: "Contact No",
      autocomplete: "tel",
    },
    {
      name: "password",
      type: "password",
      placeholder: editMode
        ? "Password (leave blank to keep current)"
        : "Password",
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
      { value: "Discover", label: "Discover" },
      { value: "Enterprise", label: "Enterprise" },
      { value: "Professional", label: "Professional" },
    ],
  };

  const roleInput = {
    name: "role",
    type: "select",
    placeholder: "Role",
    required: true,
    autocomplete: "off",
    options: [
      { value: "User", label: "User" },
      { value: "Admin", label: "Admin" },
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
      <div>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <NFCReaderButton
              onDataReceived={handleNFCData}
              inputRef={userIdInputRef}
            />
          </div>
          <div className="flex-2">
            <input
              ref={userIdInputRef}
              name="user_id"
              type="text"
              value={data.user_id || ""}
              onChange={onChange}
              placeholder="User ID"
              required
              autoComplete="off"
              className="h-[50px] w-full rounded-xl border border-[#3D3E3E] bg-white px-4 py-4 text-[13px] text-black placeholder-[#727374] outline-none focus:border-[#1e255e] dark:border-[#3D3E3E] dark:bg-[#121317] dark:text-[#D7D7D7] dark:placeholder-[#5A5B60] dark:focus:border-[#D7D7D7]"
            />
          </div>
        </div>
      </div>
    ),
  };

  const isRoleAdmin = formData.role === "Admin";

  const inputs = isSuperAdmin
    ? isRoleAdmin
      ? [...baseInputs, roleInput, branchInput]
      : [...baseInputs, planInput, roleInput, branchInput, userIdInput]
    : [...baseInputs, planInput, userIdInput];

  const customLayout = isSuperAdmin
    ? [
        { columns: 2, inputs: ["name", "phone_number"] },
        isRoleAdmin
          ? { columns: 2, inputs: ["role", "branch_id"] }
          : { columns: 3, inputs: ["plan", "role", "branch_id"] },
        {
          type: "flex",
          inputs: [
            { name: "email", flex: 2 },
            { name: "password", flex: 1 },
          ],
        },
        ...(isRoleAdmin ? [] : [{ columns: 1, inputs: ["user_id"] }]),
      ]
    : [
        { columns: 3, inputs: ["name", "phone_number", "plan"] },
        {
          type: "flex",
          inputs: [
            { name: "email", flex: 2 },
            { name: "password", flex: 1 },
          ],
        },
        { columns: 1, inputs: ["user_id"] },
      ];

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
