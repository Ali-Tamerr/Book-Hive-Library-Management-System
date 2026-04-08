import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { createUserRequest } from "../services/userRequests.api";

import { useBranches } from "../hooks/useBranches";
import AuthInput from "../components/AuthInput";
import PrimaryButton from "../components/PrimaryButton";
import DarkBgSection from "../components/DarkBgSection";
import WhiteBgSection from "../components/WhiteBgSection";
import FormSelect from "../components/FormSelect";

function SignupPopup({ isOpen, onClose, onLogin, onShowOTP, slideFromTop = false }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    branch_id: "",
    plan: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);


  const { data: branches = [] } = useBranches();

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



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createUserRequest(formData);
      const emailForOTP = formData.email;
      setSuccess(true);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        branch_id: "",
        plan: "",
      });
      setTimeout(() => {
        onClose?.();
        setSuccess(false);
        onShowOTP?.(emailForOTP);
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

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const id = requestAnimationFrame(() => setIsAnimating(true));
      return () => cancelAnimationFrame(id);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender && !isOpen) return null;

  const popupContent = (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center bg-black/10 backdrop-blur-sm transition-all duration-500 ${slideFromTop ? (isAnimating ? "translate-y-0" : "-translate-y-full") : (isAnimating ? "opacity-100" : "opacity-0")}`}
      onClick={onClose}
    >
      <div
        className={`relative h-full max-h-none w-full overflow-y-auto min-[48.0625rem]:overflow-hidden rounded-none shadow-2xl transition-all duration-500 ease-in-out will-change-[transform,opacity] min-[48.0625rem]:h-auto min-[48.0625rem]:max-h-[87vh] min-[48.0625rem]:w-[95%] min-[48.0625rem]:max-w-[88.75rem] min-[48.0625rem]:rounded-2xl ${!slideFromTop ? (isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0") : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex min-h-full w-full max-[67.5rem]:flex-col ${isDarkMode ? "bg-[#121317]" : "bg-white"}`}
        >
          <DarkBgSection
            message={"Already have account ?\nSign in now !"}
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
                  className={`${isDarkMode ? "text-[#D7D7D7]" : "text-[#000035]"}`}
                >
                  Your registration request has been sent to the admin for
                  approval. You will be notified once your account is approved.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col items-center gap-4"
              >
                <div className="flex w-full gap-4">
                  <AuthInput
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    autoComplete="given-name"
                    isDarkMode={isDarkMode}
                  />
                  <AuthInput
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    autoComplete="family-name"
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
                    name="branch_id"
                    value={formData.branch_id || ""}
                    onChange={handleChange}
                    placeholder="Branch"
                    variant="auth"
                    isDarkMode={isDarkMode}
                    options={branches.map((b) => ({
                      value: b.branch_id || b.id,
                      label: b.name,
                    }))}
                  />
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
            <div className="hidden w-full flex-row items-center justify-center gap-2 max-[67.5rem]:flex max-[48rem]:flex-row max-[48rem]:flex-wrap">
              <p
                className={`text-center text-lg max-[48rem]:text-sm ${isDarkMode ? "text-white" : "text-[#000035]"}`}
              >
                Already have Account?
              </p>
              <button 
                onClick={handleLogin} 
                className={`text-lg max-[48rem]:text-sm font-bold underline ${isDarkMode ? "text-white" : "text-[#000035]"}`}
              >
                Sign In now.
              </button>
            </div>
          </WhiteBgSection>
        </div>
      </div>
    </div>
  );

  return createPortal(popupContent, document.body);
}

export default SignupPopup;
