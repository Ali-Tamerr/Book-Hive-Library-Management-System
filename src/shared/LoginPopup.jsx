import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth.api";
import AuthInput from "../components/AuthInput";
import PrimaryButton from "../components/PrimaryButton";
import DarkBgSection from "../components/DarkBgSection";
import WhiteBgSection from "../components/WhiteBgSection";
import BranchesPopup from "../components/BranchesPopup";

function LoginPopup({ isOpen, onClose, onForgotPassword, onSignup }) {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showBranchesPopup, setShowBranchesPopup] = useState(false);

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
    setLoading(true);

    try {
      const user = await login(email, password);
      if (
        user.role === "Super Admin" ||
        user.role === "Admin" ||
        user.role === "Librarian"
      ) {
        navigate("/admin/dashboard");
      } else if (user.role === "User" || user.role === "Member") {
        navigate("/user/dashboard");
      } else {
        onClose?.();
      }
      onClose?.();
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    onClose?.();
    onForgotPassword?.();
  };

  const handleSignup = () => {
    onClose?.();
    onSignup?.();
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    setIsAnimating(false);
    const id = requestAnimationFrame(() => setIsAnimating(true));
    return () => cancelAnimationFrame(id);
  }, [isOpen]);

  if (!isOpen) return null;

  const popupContent = (
    <div
      className="login-popup-overlay fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`relative h-full max-h-[87vh] w-[95%] max-w-[1420px] overflow-hidden rounded-2xl shadow-2xl transition-[transform,opacity] duration-200 ease-in-out will-change-[transform,opacity] ${isAnimating ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex h-full w-full justify-stretch max-[1080px]:flex-col ${isDarkMode ? "bg-[#121317]" : "bg-white"} overflow-hidden`}
        >
          <WhiteBgSection
            title="Welcome Back !!"
            subtitle="Please enter your email and password to log in"
            loginLayout={true}
            isDarkMode={isDarkMode}
            backButton={{
              text: "BACK",
              position: "left",
              onClick: onClose,
            }}
          >
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col items-center gap-6 px-[100px] max-[856px]:px-[5%]"
            >
              <AuthInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                isDarkMode={isDarkMode}
              />
              <AuthInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                isDarkMode={isDarkMode}
              />

              {error && <p className="mb-3 text-base text-red-500">{error}</p>}

              <a
                href="#"
                onClick={handleForgotPassword}
                className={`block self-start text-lg font-medium ${isDarkMode ? "text-white" : "text-[#000035]"} mb-6 hover:underline`}
              >
                Forgot password?
              </a>
              <PrimaryButton
                type="submit"
                disabled={loading}
                isDarkMode={isDarkMode}
              >
                {loading ? "SIGNING IN..." : "SIGN IN"}
              </PrimaryButton>
            </form>
            <div className="mb-8 hidden flex-col items-center gap-3 max-[1080px]:flex">
              <p
                className={`text-center text-lg ${isDarkMode ? "text-[#000035]" : "text-[#000035]"}`}
              >
                New to our platform?
              </p>
              <PrimaryButton onClick={handleSignup} isDarkMode={isDarkMode}>
                Sign Up now.
              </PrimaryButton>
            </div>
          </WhiteBgSection>

          <DarkBgSection
            message="New to our platform? Please fill your form and visit any of our branches to complete the registration process."
            buttonText="Registration Form"
            onButtonClick={handleSignup}
            secondButtonText="Where are we ?"
            onSecondButtonClick={() => setShowBranchesPopup(true)}
            position="right"
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {createPortal(popupContent, document.body)}
      <BranchesPopup
        isOpen={showBranchesPopup}
        onClose={() => setShowBranchesPopup(false)}
      />
    </>
  );
}

export default LoginPopup;
