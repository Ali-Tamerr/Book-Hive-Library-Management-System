import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth.api";
import AuthInput from "../components/AuthInput";
import PrimaryButton from "../components/PrimaryButton";
import DarkBgSection from "../components/DarkBgSection";
import WhiteBgSection from "../components/WhiteBgSection";
import AboutBranchesPopup from "../components/AboutBranchesPopup";

function LoginPopup({
  isOpen,
  onClose,
  onForgotPassword,
  onSignup,
  slideFromTop = false,
}) {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
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
        className={`relative h-full max-h-none w-full overflow-y-auto min-[48.0625rem]:overflow-hidden rounded-none shadow-2xl transition-all duration-500 ease-in-out will-change-[transform,opacity] min-[48.0625rem]:h-auto min-[48.0625rem]:max-h-[87vh] min-[48.0625rem]:w-[95%] min-[48.0625rem]:max-w-[88.75rem] min-[48.0625rem]:rounded-2xl max-[67.5rem]:h-[100svh] ${!slideFromTop ? (isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0") : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex min-h-full w-full justify-stretch max-[67.5rem]:flex-col ${isDarkMode ? "bg-[#121317]" : "bg-white"}`}
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
              className="flex w-full flex-col items-center gap-4 px-[6.25rem] max-[53.5rem]:px-[5%]"
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
                className={`block self-start text-lg max-[48rem]:text-base font-medium ${isDarkMode ? "text-white" : "text-[#000035]"} mb-3 hover:underline`}
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
            <div className="mb-4 hidden flex-row items-center justify-center gap-2 max-[67.5rem]:flex max-[48rem]:flex-row max-[48rem]:flex-wrap">
              <p
                className={`text-center text-lg max-[48rem]:text-sm ${isDarkMode ? "text-white" : "text-[#000035]"}`}
              >
                New to our platform?
              </p>
              <button 
                onClick={handleSignup} 
                className={`text-lg max-[48rem]:text-sm font-bold underline ${isDarkMode ? "text-white" : "text-[#000035]"}`}
              >
                Sign Up now.
              </button>
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
      <AboutBranchesPopup
        isOpen={showBranchesPopup}
        onClose={() => setShowBranchesPopup(false)}
      />
    </>
  );
}

export default LoginPopup;
