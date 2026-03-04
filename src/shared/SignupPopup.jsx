import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  createUserRequest,
  getAllUserRequests,
} from "../services/userRequests.api";
import { getAllUsers } from "../services/users.api";
import AuthInput from "../components/AuthInput";
import PrimaryButton from "../components/PrimaryButton";
import DarkBgSection from "../components/DarkBgSection";
import WhiteBgSection from "../components/WhiteBgSection";
import FormSelect from "../components/FormSelect";

function SignupPopup({ isOpen, onClose, onLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    plan: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [existingUsers, setExistingUsers] = useState([]);
  const [existingRequests, setExistingRequests] = useState([]);

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.body.classList.contains("dark-theme"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const [users, requests] = await Promise.all([
          getAllUsers(),
          getAllUserRequests(),
        ]);
        setExistingUsers(users || []);
        setExistingRequests(requests || []);
      } catch (err) {
        console.error("Failed to fetch existing data:", err);
      }
    };
    if (isOpen) {
      fetchExistingData();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const validateUniqueFields = () => {
    const emailLower = formData.email.toLowerCase().trim();

    const emailExistsInUsers = existingUsers.some(
      (user) => user.email?.toLowerCase() === emailLower,
    );
    if (emailExistsInUsers) {
      setError(
        "This email is already registered. Please use a different email or sign in.",
      );
      return false;
    }

    const emailExistsInRequests = existingRequests.some(
      (request) =>
        request.email?.toLowerCase() === emailLower &&
        request.status === "Pending",
    );
    if (emailExistsInRequests) {
      setError("A registration request with this email is already pending.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateUniqueFields()) {
      return;
    }

    setLoading(true);

    try {
      await createUserRequest(formData);
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        password: "",
        plan: "",
      });
      setTimeout(() => {
        onClose?.();
        setSuccess(false);
      }, 3000);
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Request submission failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    onClose?.();
    onLogin?.();
  };

  if (!isOpen) return null;

  const popupContent = (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative h-full max-h-[87vh] w-[95%] max-w-[1420px] overflow-hidden rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex h-full w-full max-[1080px]:flex-col ${isDarkMode ? "bg-[#121317]" : "bg-white"} overflow-hidden`}
        >
          <DarkBgSection
            message="Already have account ? Sign in now !"
            buttonText="SIGN IN"
            onButtonClick={handleLogin}
            position="left"
            isDarkMode={isDarkMode}
          />

          <WhiteBgSection
            title="Registration Request"
            subtitle="Fill out the form below to request an account. and visit any of our branches to complete the registration process.."
            logoWithTitle={true}
            isDarkMode={isDarkMode}
            backButton={{
              text: "BACK",
              position: "right",
              onClick: onClose,
            }}
          >
            {success ? (
              <div className="w-full py-8 text-center">
                <div className="mb-4 text-xl font-semibold text-green-600">
                  ✓ Request Submitted Successfully!
                </div>
                <p
                  className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Your registration request has been sent to the admin for
                  approval. You will be notified once your account is approved.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col items-center gap-6"
              >
                <div className="w-full">
                  <AuthInput
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    isDarkMode={isDarkMode}
                  />
                </div>
                <div className="flex w-full gap-4">
                  <AuthInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    isDarkMode={isDarkMode}
                  />
                  <AuthInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                    isDarkMode={isDarkMode}
                  />
                </div>
                <div className="flex w-full gap-4">
                  <FormSelect
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    placeholder="Select Plan"
                    variant="auth"
                    isDarkMode={isDarkMode}
                    options={[
                      { value: "Discover", label: "Discover" },
                      { value: "Enterprise", label: "Enterprise" },
                      { value: "Professional", label: "Professional" },
                    ]}
                  />
                </div>
                {error && (
                  <p className="mb-3 text-base text-red-500">{error}</p>
                )}
                <PrimaryButton
                  type="submit"
                  disabled={loading}
                  isDarkMode={isDarkMode}
                >
                  {loading ? "SUBMITTING..." : "Submit Request"}
                </PrimaryButton>
              </form>
            )}
            <p
              className={`hidden text-lg max-[1080px]:block ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}
            >
              Already have Account?{" "}
              <button
                onClick={handleLogin}
                className={`underline ${isDarkMode ? "text-white" : "text-gray-900"} cursor-pointer`}
              >
                Sign In now.
              </button>
            </p>
          </WhiteBgSection>
        </div>
      </div>
    </div>
  );

  return createPortal(popupContent, document.body);
}

export default SignupPopup;
