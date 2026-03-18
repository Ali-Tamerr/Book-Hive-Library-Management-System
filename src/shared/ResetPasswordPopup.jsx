import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import AuthInput from "../components/AuthInput";
import PrimaryButton from "../components/PrimaryButton";
import DarkBgSection from "../components/DarkBgSection";
import WhiteBgSection from "../components/WhiteBgSection";

function ResetPasswordPopup({
  isOpen,
  onClose,
  onLogin,
  onBack,
  slideFromTop = false,
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    onLogin?.();
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
        className={`relative h-full max-h-[87vh] w-[95%] max-w-[1420px] overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 ease-in-out will-change-[transform,opacity] ${!slideFromTop ? (isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0") : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex h-full w-full max-[1080px]:flex-col ${isDarkMode ? "bg-[#121317]" : "bg-white"} overflow-hidden`}
        >
          <DarkBgSection
            message={
              <>
                "Your premier digital library
                <br />
                for borrowing and reading books"
              </>
            }
            position="left"
            isDarkMode={isDarkMode}
          />

          <WhiteBgSection
            title="Reset Password"
            subtitle="Please enter your new password"
            backButton={{
              text: "BACK",
              onClick: handleBack,
              position: "right",
            }}
            isDarkMode={isDarkMode}
          >
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col items-center gap-6"
            >
              <AuthInput
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                isDarkMode={isDarkMode}
              />
              <AuthInput
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                isDarkMode={isDarkMode}
              />
              <PrimaryButton type="submit" isDarkMode={isDarkMode}>
                RESET PASSWORD
              </PrimaryButton>
            </form>
          </WhiteBgSection>
        </div>
      </div>
    </div>
  );

  return createPortal(popupContent, document.body);
}

export default ResetPasswordPopup;
