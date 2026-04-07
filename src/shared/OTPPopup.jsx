import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import AuthInput from "../components/AuthInput";
import PrimaryButton from "../components/PrimaryButton";
import DarkBgSection from "../components/DarkBgSection";
import WhiteBgSection from "../components/WhiteBgSection";

function OTPPopup({
  isOpen,
  onClose,
  onResetPassword,
  onBack,
  slideFromTop = false,
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [otp, setOtp] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose?.();
    onResetPassword?.();
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
            title="Check your Mailbox"
            subtitle="Please enter the OTP to proceed"
            backButton={{ text: "BACK", onClick: handleBack, position: "left" }}
            isDarkMode={isDarkMode}
          >
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col items-center gap-4"
            >
              <AuthInput
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                isDarkMode={isDarkMode}
              />
              <PrimaryButton type="submit" isDarkMode={isDarkMode}>
                VERIFY
              </PrimaryButton>
            </form>
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
