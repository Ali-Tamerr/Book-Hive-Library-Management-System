import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import AuthInput from "../components/AuthInput";
import PrimaryButton from "../components/PrimaryButton";
import DarkBgSection from "../components/DarkBgSection";
import WhiteBgSection from "../components/WhiteBgSection";
import { createUserRequest } from "../services/userRequests.api";

function OTPPopup({
  isOpen,
  onClose,
  onResetPassword,
  onBack,
  email,
  signupData, // Captured form data from SignupPopup
  isSignupVerification = false,
  slideFromTop = false,
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (isSignupVerification) {
      if (!email || !signupData) {
        setError("Session data is missing. Please try signing up again.");
        return;
      }
      setLoading(true);
      try {
        // Finalize registration by sending both data and OTP
        await createUserRequest(signupData, otp);
        setSuccess(true);
        setTimeout(() => {
          onClose?.();
          setSuccess(false);
          setOtp("");
        }, 3000);
      } catch (err) {
        setError(err?.response?.data?.message || "Verification failed. Please check your code.");
      } finally {
        setLoading(false);
      }
    } else {
      // Default behavior for Forgot Password flow
      onClose?.();
      onResetPassword?.();
    }
  };

  const handleBack = () => {
    onClose?.();
    onBack?.();
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
        setError("");
        setSuccess(false);
        setOtp("");
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
        className={`relative h-full max-h-none w-full overflow-hidden rounded-none shadow-2xl transition-all duration-500 ease-in-out will-change-[transform,opacity] min-[48.0625rem]:h-auto min-[48.0625rem]:max-h-[87vh] min-[48.0625rem]:w-[95%] min-[48.0625rem]:max-w-[88.75rem] min-[48.0625rem]:rounded-2xl ${!slideFromTop ? (isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0") : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex h-full w-full max-[67.5rem]:flex-col max-[48rem]:justify-center ${isDarkMode ? "bg-[#121317]" : "bg-white"} overflow-hidden`}
        >
          <WhiteBgSection
            title={success ? "Request Submitted!" : "Check your Mailbox"}
            subtitle={success ? "Your email is verified and your request has been sent to our librarian." : `Please enter the 6-digit code sent to ${email || "your email"}`}
            backButton={!success ? { text: "BACK", onClick: handleBack, position: "left" } : null}
            isDarkMode={isDarkMode}
          >
            {success ? (
               <div className="flex flex-col items-center py-6">
                  <i className="ri-checkbox-circle-fill text-6xl text-green-500 mb-4 animate-bounce"></i>
                  <p className={`text-center ${isDarkMode ? "text-[#D7D7D7]" : "text-[#000035]"} max-w-sm px-4`}>
                    Great! We will review your application and notify you once your account is ready.
                  </p>
               </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col items-center gap-4"
              >
                <AuthInput
                  type="text"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                  isDarkMode={isDarkMode}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                <PrimaryButton type="submit" disabled={loading} isDarkMode={isDarkMode}>
                  {loading ? "VERIFYING..." : "VERIFY"}
                </PrimaryButton>
              </form>
            )}
          </WhiteBgSection>

          <DarkBgSection
            message={
              <>
                "Your premier digital library
                <br />
                for borrowing and reading books"
              </>
            }
            position="right"
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );

  return createPortal(popupContent, document.body);
}

export default OTPPopup;
