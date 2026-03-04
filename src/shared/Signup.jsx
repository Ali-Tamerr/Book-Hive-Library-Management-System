import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserRequest } from "../services/userRequests.api";
import AuthInput from "../components/AuthInput";
import PrimaryButton from "../components/PrimaryButton";
import DarkBgSection from "../components/DarkBgSection";
import WhiteBgSection from "../components/WhiteBgSection";
import FormSelect from "../components/FormSelect";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    plan: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createUserRequest(formData);
      setSuccess(true);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        plan: "",
      });
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

  return (
    <div className="flex h-screen w-full bg-[#f5f7fb]">
      <div className="flex h-full w-full overflow-hidden bg-white shadow-[0_15px_40px_rgba(0,0,0,0.15)] max-[1080px]:h-full max-[1080px]:flex-col">
        <WhiteBgSection
          title="Registration Request"
          subtitle="Fill out the form below to request an account. An admin will review your request."
          logoWithTitle={false}
          mobileOnly={true}
        >
          {success ? (
            <div className="w-full py-8 text-center">
              <div className="mb-4 text-xl font-semibold text-green-600">
                ✓ Request Submitted Successfully!
              </div>
              <p className="mb-6 text-gray-600">
                Your registration request has been sent to the admin for
                approval. You will be notified once your account is approved.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="cursor-pointer font-semibold text-[#0a0f33] underline"
              >
                Go to Login
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col items-center gap-8"
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
                />
                <AuthInput
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  autoComplete="family-name"
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
                />
                <AuthInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
              </div>
              <div className="w-full">
                <FormSelect
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  placeholder="Select Plan (Optional)"
                  variant="auth"
                  options={[
                    { value: "Discover", label: "Discover" },
                    { value: "Enterprise", label: "Enterprise" },
                    { value: "Professional", label: "Professional" },
                  ]}
                />
              </div>
              {error && <p className="mb-3 text-base text-red-500">{error}</p>}
              <div className="flex w-full justify-center max-[1080px]:px-12">
                <PrimaryButton type="submit" disabled={loading}>
                  {loading ? "SUBMITTING..." : "SUBMIT REQUEST"}
                </PrimaryButton>
              </div>
              <p className="mb-8 hidden text-center text-lg text-[#0a0f33] max-[1080px]:block">
                Already have Account?{" "}
                <button
                  className="cursor-pointer text-[#0a0f33] underline"
                  onClick={() => navigate("/login")}
                >
                  Sign In now.
                </button>
              </p>
            </form>
          )}
        </WhiteBgSection>

        <DarkBgSection
          message="Already have Account? Sign In now."
          buttonText="SIGN IN"
          onButtonClick={() => navigate("/login")}
          position="left"
        />

        <WhiteBgSection
          title="Registration Request"
          subtitle="Fill out the form below to request an account. An admin will review your request."
          logoWithTitle={true}
          desktopOnly={true}
        >
          {success ? (
            <div className="w-full py-8 text-center">
              <div className="mb-4 text-xl font-semibold text-green-600">
                ✓ Request Submitted Successfully!
              </div>
              <p className="mb-6 text-gray-600">
                Your registration request has been sent to the admin for
                approval. You will be notified once your account is approved.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="cursor-pointer font-semibold text-[#0a0f33] underline"
              >
                Go to Login
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col items-center gap-8"
            >
              <div className="w-full">
                <AuthInput
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  autoComplete="given-name"
                />
                <AuthInput
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  autoComplete="family-name"
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
                />
              </div>
              <div className="flex w-full gap-4">
                <AuthInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
                <FormSelect
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  placeholder="Select Plan (Optional)"
                  variant="auth"
                  options={[
                    { value: "Discover", label: "Discover" },
                    { value: "Enterprise", label: "Enterprise" },
                    { value: "Professional", label: "Professional" },
                  ]}
                />
              </div>
              {error && <p className="mb-3 text-base text-red-500">{error}</p>}
              <div className="max-w-100 w-full max-[1080px]:px-12">
                <PrimaryButton type="submit" disabled={loading}>
                  {loading ? "SUBMITTING..." : "SUBMIT REQUEST"}
                </PrimaryButton>
              </div>
              <p className="mb-8 hidden text-center text-lg text-[#0a0f33] max-[1080px]:block">
                Already have Account?{" "}
                <button
                  className="cursor-pointer text-[#0a0f33] underline"
                  onClick={() => navigate("/login")}
                >
                  Sign In now.
                </button>
              </p>
            </form>
          )}
        </WhiteBgSection>
      </div>
    </div>
  );
}

export default Signup;
