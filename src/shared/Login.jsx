import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../services/auth.api";
import AuthInput from "../components/AuthInput";
import PrimaryButton from "../components/PrimaryButton";
import DarkBgSection from "../components/DarkBgSection";
import WhiteBgSection from "../components/WhiteBgSection";
import BranchesPopup from "../components/BranchesPopup";

function Login() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBranchesPopup, setShowBranchesPopup] = useState(false);

  useEffect(() => {
    logout();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(phoneNumber, password);
      if (
        user.role === "Super Admin" ||
        user.role === "Admin" ||
        user.role === "Librarian"
      ) {
        navigate("/admin/dashboard");
      } else if (user.role === "User" || user.role === "Member") {
        navigate("/user/dashboard");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-screen w-full bg-[#f4f6fb]">
        <div className="overflow flex h-full w-full justify-stretch bg-white shadow-[0_15px_40px_rgba(0,0,0,0.15)] max-[1080px]:h-full max-[1080px]:flex-col">
          <WhiteBgSection
            title="Welcome Back !!"
            subtitle="Please enter your phone number and password to log in"
            loginLayout={true}
          >
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col items-center gap-6 px-[100px] max-[856px]:px-[120px]"
            >
              <AuthInput
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <AuthInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {error && <p className="mb-3 text-base text-red-500">{error}</p>}

              <a
                href="#"
                onClick={() => navigate("/forgot-password")}
                className="mb-6 block self-start text-lg font-medium text-[#000035] hover:underline"
              >
                Forgot password?
              </a>
              <PrimaryButton type="submit" disabled={loading}>
                {loading ? "SIGNING IN..." : "SIGN IN"}
              </PrimaryButton>
            </form>
            <p className="hidden text-lg text-[#000035] max-[1080px]:block">
              New to our platform?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="cursor-pointer text-gray-900 underline"
              >
                Sign Up now.
              </button>
            </p>
          </WhiteBgSection>

          <DarkBgSection
            message="New to our platform? Please visit any of our branches to complete the registration process."
            buttonText="Where are we ?"
            onButtonClick={() => setShowBranchesPopup(true)}
            secondButtonText="Fill your form"
            onSecondButtonClick={() => navigate("/signup")}
            position="right"
          />
        </div>
      </div>
      <BranchesPopup
        isOpen={showBranchesPopup}
        onClose={() => setShowBranchesPopup(false)}
      />
    </>
  );
}

export default Login;
