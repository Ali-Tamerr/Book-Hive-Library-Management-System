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
    // Only allow PNG and JPEG/JPG
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setError("Only PNG and JPG/JPEG images are allowed.");
      return;
    }

    // 2MB = 2 * 1024 * 1024 bytes
    if (file.size > 2 * 1024 * 1024) {
      setError("Profile picture must be below 2MB in size.");
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

            // Scale down to a max of 512px to keep the PNG completely safe and lightweight
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
      formData.newPassword ||
      formData.confirmPassword ||
      formData.currentPassword;

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
      if (formData.currentPassword !== currentUser.password_hash) {
        setError("Current password is incorrect");
        return;
      }
    }

    // Only allow update if at least one field is changed
    const imageChanged =
      !!selectedImageBase64 && selectedImageBase64 !== currentUser?.image_url;
    if (!wantsPasswordChange && !imageChanged) {
      setError("No changes to update.");
      return;
    }

    setLoading(true);
    try {
      const userData = {
        user_id: currentUser.user_id,
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        role: currentUser.role,
        status: currentUser.status || "Active",
        plan: currentUser.plan || null,
        password_hash: wantsPasswordChange
          ? formData.newPassword
          : currentUser.password_hash,
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
      // Only store minimal session info (exclude image_url)
      const sessionUser = { ...updatedUser };
      delete sessionUser.image_url;
      localStorage.setItem("authToken", JSON.stringify(sessionUser));
      localStorage.setItem("currentUser", JSON.stringify(sessionUser));

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
      setSelectedImageBase64("");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      console.error("Failed to update credentials:", err);
      setError("Failed to update credentials. Please try again.");
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
      maxWidthClass="max-w-[700px]"
    >
      <form
        onSubmit={handleSubmit}
        className="settings-credentials-form flex flex-col gap-12 text-[#000035] dark:text-[#d6d6d6]"
      >
        <div className="space-y-6 px-10">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full bg-[#D7D7D7]">
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

            <label className="flex h-[42px] w-[320px] cursor-pointer items-center justify-between rounded-lg border dark:border-[#D7D7D7] px-4 text-[30px] text-[#000035] border-[#000035] dark:text-[#E8E8E8]">
              <span className="font-regular flex h-full items-center text-[19px]">
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
            <label className="font-regular w-[180px] whitespace-nowrap text-left text-sm">
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
            <label className="font-regular w-[180px] whitespace-nowrap text-left text-sm">
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
            <label className="font-regular w-[180px] whitespace-nowrap text-left text-sm">
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
