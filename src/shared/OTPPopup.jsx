import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import AuthInput from "../components/AuthInput";
import PrimaryButton from "../components/PrimaryButton";
import DarkBgSection from "../components/DarkBgSection";
import WhiteBgSection from "../components/WhiteBgSection";
import { createUserRequest, sendOtpToEmail } from "../services/userRequests.api";

const formatCooldownTime = (seconds) => {
  if (seconds <= 0) return "";
  
  if (seconds === 1800) return "30m";
  if (seconds === 300) return "5m";
  if (seconds === 60) return "1m";

  if (seconds >= 60) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
  }
  return `${seconds}s`;
};

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
  const [resendMsg, setResendMsg] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!email || !isOpen) return;

    const key = `otp_cooldown_${email}`;
    const rawData = localStorage.getItem(key);
    if (rawData) {
      try {
        const data = JSON.parse(rawData);
        const now = Date.now();
        
        // If a day has passed since the first click, clear/reset the data
        if (data.firstClickTime && now - data.firstClickTime > 24 * 60 * 60 * 1000) {
          localStorage.removeItem(key);
          setTimeLeft(0);
          return;
        }

        if (data.nextAllowedTime && data.nextAllowedTime > now) {
          const secondsLeft = Math.ceil((data.nextAllowedTime - now) / 1000);
          setTimeLeft(secondsLeft);
        } else {
          setTimeLeft(0);
        }
      } catch (e) {
        console.error("Error parsing OTP cooldown data", e);
      }
    } else {
      setTimeLeft(0);
    }
  }, [email, isOpen]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

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
    setResendMsg("");
    
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

  const handleResend = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is missing.");
      return;
    }
    if (timeLeft > 0) return;

    setError("");
    setResendMsg("");
    try {
      await sendOtpToEmail(email);
      setResendMsg("A new OTP has been sent to your email.");

      // Calculate cooldown and store in localStorage
      const key = `otp_cooldown_${email}`;
      const rawData = localStorage.getItem(key);
      let clickCount = 0;
      let firstClickTime = Date.now();

      if (rawData) {
        try {
          const data = JSON.parse(rawData);
          // Only use previous values if within 24 hours
          if (data.firstClickTime && Date.now() - data.firstClickTime <= 24 * 60 * 60 * 1000) {
            clickCount = data.clickCount || 0;
            firstClickTime = data.firstClickTime;
          }
        } catch (e) {
          console.error(e);
        }
      }

      clickCount += 1;

      // Progressive duration sequence:
      // 1st click = 30s
      // 2nd click = 1m (60s)
      // 3rd click = 5m (300s)
      // 4th+ clicks = 30m (1800s)
      let cooldownDuration = 30;
      if (clickCount === 2) {
        cooldownDuration = 60;
      } else if (clickCount === 3) {
        cooldownDuration = 300;
      } else if (clickCount >= 4) {
        cooldownDuration = 1800;
      }

      const nextAllowedTime = Date.now() + cooldownDuration * 1000;
      const newState = {
        clickCount,
        firstClickTime,
        nextAllowedTime,
      };

      localStorage.setItem(key, JSON.stringify(newState));
      setTimeLeft(cooldownDuration);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to resend OTP.");
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
        setResendMsg("");
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
                {timeLeft > 0 ? (
                  <span 
                    className={`block self-start text-lg max-[48rem]:text-base font-medium ${isDarkMode ? "text-gray-500" : "text-gray-400"} mb-3 cursor-not-allowed`}
                  >
                    Resend OTP ({formatCooldownTime(timeLeft)})
                  </span>
                ) : (
                  <a 
                    href="#" 
                    onClick={handleResend}
                    className={`block self-start text-lg max-[48rem]:text-base font-medium ${isDarkMode ? "text-white" : "text-[#000035]"} mb-3 hover:underline`}
                  >
                    Resend OTP
                  </a>
                )}
                {resendMsg && <p className="self-start text-green-500 text-sm">{resendMsg}</p>}
                {error && <p className="self-start text-red-500 text-sm">{error}</p>}
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
