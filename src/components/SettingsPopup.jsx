import React, { useMemo, useState } from "react";
import { useUser } from "../hooks/useUsers";
import Popup from "./Popup.jsx";
import FormButton from "./FormButton.jsx";
import { ImagePlus, Settings, UserRound } from "lucide-react";
import { getCurrentUser } from "../services/auth.api";
import { updateUser } from "../services/users.api";
import { getImageUrl } from "../services/api.config";

const SettingsPopup = ({ show, onClose }) => {
    const localUser = getCurrentUser();
    const { data: userProfile } = useUser(localUser?.user_id);
    const currentUser = userProfile && userProfile.user_id ? userProfile : localUser;
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
                reader.onload = () => {
                    const result = String(reader.result || "");
                    const encoded = result.includes(",")
                        ? result.split(",")[1]
                        : result;
                    resolve(encoded);
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
            formData.newPassword || formData.confirmPassword || formData.currentPassword;

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
        const imageChanged = !!selectedImageBase64 && selectedImageBase64 !== currentUser?.image_url;
        if (!wantsPasswordChange && !imageChanged) {
            setError("No changes to update.");
            return;
        }

        setLoading(true);
        try {
            const userData = {
                user_id: currentUser.user_id,
                name: currentUser.name,
                phone_number: currentUser.phone_number,
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
            window.dispatchEvent(new Event("userUpdated"));

            setSuccess(
                imageChanged && !wantsPasswordChange
                    ? "Profile photo updated successfully!"
                    : "Credentials updated successfully!"
            );
            setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setSelectedImageBase64("");

            setTimeout(() => {
                setSuccess("");
                onClose();
            }, 1500);
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

    const cancelHoverClass =
        "hover:bg-[#000035] hover:text-white dark:hover:bg-[#000035] dark:hover:text-white";
    const confirmHoverClass =
        "border border-transparent hover:bg-white hover:text-[#000035] hover:border-[#000035] dark:hover:bg-white dark:hover:text-[#000035] dark:hover:border-[#000035]";

    return (
        <Popup
            show={show}
            onClose={onClose}
            title="Change Credentials"
            icon={<Settings size={35} strokeWidth={2.3} />}
            maxWidthClass="max-w-[700px]"
        >
            <form onSubmit={handleSubmit} className="settings-credentials-form flex flex-col gap-12 text-[#525252] dark:text-[#d6d6d6]">
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
                                <UserRound className=" w-22 h-22 text-[#0a0f33]" />
                            )}
                        </div>

                        <label className="flex h-[42px] w-[320px] cursor-pointer items-center justify-between rounded-lg bg-[#D7D7D7] px-4 text-[30px] text-[#0a0f33] dark:bg-[#2C2D33] dark:text-[#E8E8E8]">
                            <span className="text-[19px] h-full flex items-center font-regular">Add your photo</span>
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
                        <label className="w-[180px] whitespace-nowrap text-left text-sm font-regular">
                            Enter Current Password
                        </label>
                        <input
                            type="password"
                            name="currentPassword"
                            placeholder="Enter Current Password"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className="settings-credentials-input flex-1 h-[50px] px-4 py-3 rounded-xl border border-[#3D3E3E] dark:border-[#4b4f56] bg-white dark:bg-[#1f2228] text-[#121317] dark:text-[#E8E8E8] placeholder-[#6f7377] dark:placeholder-[#8b9097] outline-none focus:border-[#1e255e] dark:focus:border-[#9aa3ff] text-[13px]"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <label className="w-[180px] whitespace-nowrap text-left text-sm font-regular">
                            Enter New Password
                        </label>
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="Enter New Password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="settings-credentials-input flex-1 h-[50px] px-4 py-3 rounded-xl border border-[#3D3E3E] dark:border-[#4b4f56] bg-white dark:bg-[#1f2228] text-[#121317] dark:text-[#E8E8E8] placeholder-[#6f7377] dark:placeholder-[#8b9097] outline-none focus:border-[#1e255e] dark:focus:border-[#9aa3ff] text-[13px]"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <label className="w-[180px] whitespace-nowrap text-left text-sm font-regular">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm New Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="settings-credentials-input flex-1 h-[50px] px-4 py-3 rounded-xl border border-[#3D3E3E] dark:border-[#4b4f56] bg-white dark:bg-[#1f2228] text-[#121317] dark:text-[#E8E8E8] placeholder-[#6f7377] dark:placeholder-[#8b9097] outline-none focus:border-[#1e255e] dark:focus:border-[#9aa3ff] text-[13px]"
                        />
                    </div>

                    {/* Error/Success provider above buttons */}
                </div>

                {/* Wrap error/success and buttons in a fragment to fix adjacent JSX error */}
                <>
                    {(error || success) && (
                        <div className="px-10 pb-2">
                            {error && (
                                <p className="text-red-500 text-sm text-center mb-2">{error}</p>
                            )}
                            {success && (
                                <p className="text-green-500 text-sm text-center mb-2">{success}</p>
                            )}
                        </div>
                    )}
                    <div className="flex justify-between gap-3">
                        <FormButton type="button" onClick={handleCancel} className={cancelHoverClass}>
                            CANCEL
                        </FormButton>
                        <FormButton type="submit" isPrimary disabled={loading} className={confirmHoverClass}>
                            {loading ? "CONFIRMING..." : "CONFIRM"}
                        </FormButton>
                    </div>
                </>
            </form>
        </Popup>
    );
};

export default SettingsPopup;

