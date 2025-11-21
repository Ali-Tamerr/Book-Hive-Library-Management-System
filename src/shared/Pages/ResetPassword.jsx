import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb] p-4">
      <div className="flex w-full max-w-[900px] h-[500px] bg-white rounded-[10px] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
        <div className="w-1/2 bg-[#0a0f33] text-white flex flex-col items-center justify-center p-10 rounded-tr-[60px] rounded-br-[60px]">
          <img src="/assets/logo.svg" alt="BookHive Logo" className="w-24 mb-5" />
          <h1 className="text-3xl text-center mb-5 leading-relaxed">
            BookHive
            <br />
            <span className="block font-['Caveat',cursive] text-3xl font-medium">Library</span>
          </h1>
          <p className="text-sm text-[#d9defa] text-center leading-relaxed">
            "Your premier digital library<br />for borrowing and reading books"
          </p>
        </div>

        <div className="w-1/2 bg-white flex flex-col items-center justify-center relative">
          <button
            onClick={() => navigate('/otp')}
            className="absolute top-5 right-5 border border-[#0a0f33] rounded-[20px] px-4 py-1 text-xs hover:bg-[#0a0f33] hover:text-white transition-colors"
          >
            BACK
          </button>

          <div className="text-center w-[80%] max-w-[300px]">
            <img src="/assets/logo.svg" alt="Small Logo" className="w-16 mb-4 mx-auto" />
            <h2 className="text-xl font-semibold text-[#0a0f33] mb-2">Reset Password</h2>
            <p className="text-gray-700 text-sm mb-5">Please enter your new password</p>

            <form onSubmit={handleSubmit}>
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 mb-4 rounded-lg border border-gray-300 outline-none focus:border-[#0a0f33] text-sm"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 mb-5 rounded-lg border border-gray-300 outline-none focus:border-[#0a0f33] text-sm"
              />
              <button
                type="submit"
                className="w-full py-2 bg-[#0a0f33] text-white rounded-[20px] hover:bg-[#192261] transition-colors"
              >
                RESET PASSWORD
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

