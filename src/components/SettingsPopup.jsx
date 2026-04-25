import React, { useMemo, useState } from "react";
import { useUser } from "../hooks/useUsers";
import Popup from "./Popup.jsx";
import FormButton from "./FormButton.jsx";
import { ImagePlus, Settings, UserRound } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../services/auth.api";
import { updateUser } from "../services/users.api";
import { getImageUrl } from "../services/api.config";

import FormInput from "./FormInput.jsx";

const SettingsPopup = ({ show, onClose }) => {
  const localUser = getCurrentUser();
  const { data: userProfile } = useUser(localUser?.user_id);
  const queryClient = useQueryClient();
  const currentUser =
    userProfile && userProfile.user_id ? userProfile : localUser;
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [selectedImageBase64, setSelectedImageBase64] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const displayImage = useMemo(() => {
    const source = selectedImageBase64 || currentUser?.image_url || "";
    return getImageUrl(source);
  }, [selectedImageBase64, currentUser?.image_url]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleSelectPhoto = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFileName(file.name);
    // Only allow PNG and JPEG/JPG
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setError("Only PNG and JPG/JPEG images are allowed.");
      return;
    }

    // 5MB = 5 * 1024 * 1024 bytes
    if (file.size > 5 * 1024 * 1024) {
      setError("Profile picture must be below 5MB in size.");
      return;
    }

    try {
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            let width = img.width;
            let height = img.height;

            // Scale down to a max of 32rem to keep the PNG completely safe and lightweight
            const MAX_SIZE = 512;
            if (width > MAX_SIZE || height > MAX_SIZE) {
              if (width > height) {
                height = Math.round((height * MAX_SIZE) / width);
                width = MAX_SIZE;
              } else {
                width = Math.round((width * MAX_SIZE) / height);
                height = MAX_SIZE;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            // Output strictly as PNG and extract the raw base64
            const pngDataUrl = canvas.toDataURL("image/png");
            resolve(pngDataUrl.split(",")[1]);
          };
          img.onerror = () => reject(new Error("Failed to read image content"));
          img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      setSelectedImageBase64(String(base64));
      setError("");
      setSuccess("");
    } catch {
      setError("Failed to load image. Please try another file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const wantsPasswordChange =
      formData.newPassword.length > 0 ||
      formData.confirmPassword.length > 0;

    if (wantsPasswordChange) {
      if (formData.newPassword !== formData.confirmPassword) {
        setError("New passwords do not match");
        return;
      }
      if (formData.newPassword.length < 6) {
        setError("New password must be at least 6 characters");
        return;
      }
      if (!currentUser) {
        setError("Not logged in");
        return;
      }
      // The backend now handles password verification securely
      if (wantsPasswordChange && !formData.currentPassword) {
        setError("Please enter your current password to make changes");
        return;
      }
    }

    // Only allow update if at least one field is changed
    const imageChanged =
      !!selectedImageBase64 && selectedImageBase64 !== currentUser?.image_url;
    if (!wantsPasswordChange && !imageChanged) {
      return;
    }

    setLoading(true);
    try {
      const userData = {
        user_id: currentUser.user_id,
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        email: currentUser.email,
        role: currentUser.role,
        status: currentUser.status || "Active",
        plan: currentUser.plan || null,
        password_hash: wantsPasswordChange
          ? formData.newPassword
          : null,
        current_password: wantsPasswordChange ? formData.currentPassword : null,
        created_by: currentUser.created_by || null,
        branch_id: currentUser.branch_id ?? null,
        subscription_end_date: currentUser.subscription_end_date || null,
        image_url: imageChanged
          ? selectedImageBase64
          : currentUser.image_url || null,
      };

      await updateUser(currentUser.user_id, userData);

      const updatedUser = {
        ...currentUser,
        ...userData,
        password_hash: wantsPasswordChange
          ? formData.newPassword
          : currentUser.password_hash,
      };

      // Store the updated user in localStorage (KEEP image_url for fast UI update)
      const sessionUser = { ...updatedUser };
      // Note: We keep image_url now to allow immediate preview in Navbar even if refetch is slow
      // IMPORTANT: Do NOT overwrite "authToken" here — it holds the JWT string from login.
      // Only update "currentUser" which holds the user profile data.
      localStorage.setItem("currentUser", JSON.stringify(sessionUser));

      // Optimistically update the React Query cache for the specific user detail
      queryClient.setQueryData(
        ["users", "detail", currentUser.user_id],
        updatedUser,
      );

      // Force React Query cache to re-fetch and components to update with the new image
      queryClient.invalidateQueries({ queryKey: ["users"] });
      window.dispatchEvent(new Event("userUpdated"));

      setSuccess(
        imageChanged && !wantsPasswordChange
          ? "Profile photo updated successfully!"
          : "Credentials updated successfully!",
      );
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => {
        setSuccess("");
        setSelectedImageBase64("");
      }, 3000);
    } catch (err) {
      console.error("Failed to update credentials:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to update credentials.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setSelectedImageBase64("");
    setError("");
    setSuccess("");
    onClose();
  };

  return (
    <Popup
      show={show}
      onClose={onClose}
      title="Change Credentials"
      icon={<Settings size={35} strokeWidth={2.3} />}
      maxWidthClass="max-w-[43.75rem]"
    >
      <form
        onSubmit={handleSubmit}
        className="settings-credentials-form flex flex-col gap-12 text-[#000035] dark:text-[#d6d6d6]"
      >
        <div className="space-y-6 px-10">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-[6.25rem] w-[6.25rem] items-center justify-center overflow-hidden rounded-full bg-[#D7D7D7]">
              {displayImage ? (
                <img
                  src={displayImage}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound className="w-22 h-22 text-[#000035]" />
              )}
            </div>

            <label className="flex h-[2.625rem] w-[20rem] cursor-pointer items-center justify-between rounded-lg border dark:border-[#D7D7D7] px-4 text-[1.875rem] text-[#000035] border-[#000035] dark:text-[#E8E8E8]">
              <span className="font-regular flex h-full items-center text-[1.1875rem]">
                Add your photo
              </span>
              <ImagePlus className="h-7 w-7" />
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
                onChange={handleSelectPhoto}
              />
            </label>
          </div>

          <div className="flex items-center gap-6">
            <label className="font-regular w-[11.25rem] whitespace-nowrap text-left text-sm">
              Enter Current Password
            </label>
            <FormInput
              type="password"
              name="currentPassword"
              placeholder="Enter Current Password"
              value={formData.currentPassword}
              onChange={handleChange}
              className="flex-1"
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="font-regular w-[11.25rem] whitespace-nowrap text-left text-sm">
              Enter New Password
            </label>
            <FormInput
              type="password"
              name="newPassword"
              placeholder="Enter New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="flex-1"
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="font-regular w-[11.25rem] whitespace-nowrap text-left text-sm">
              Confirm New Password
            </label>
            <FormInput
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="flex-1"
            />
          </div>

          {/* Error/Success provider above buttons */}
        </div>

        {/* Wrap error/success and buttons in a fragment to fix adjacent JSX error */}
        <>
          {(error || success) && (
            <div className="px-10 pb-2">
              {error && (
                <p className="mb-2 text-center text-sm text-red-500">{error}</p>
              )}
              {success && (
                <p className="mb-2 text-center text-sm text-green-500">
                  {success}
                </p>
              )}
            </div>
          )}
          <div className="flex justify-between gap-3">
            <FormButton type="button" onClick={handleCancel}>
              CANCEL
            </FormButton>
            <FormButton type="submit" disabled={loading}>
              {loading ? "CONFIRMING..." : "CONFIRM"}
            </FormButton>
          </div>
        </>
      </form>
    </Popup>
  );
};

export default SettingsPopup;
