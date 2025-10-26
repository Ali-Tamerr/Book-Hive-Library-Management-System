import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth.api';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f6fb] p-4">
      <div className="flex w-full max-w-[900px] h-[550px] bg-white rounded-[10px] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
        <div className="w-1/2 bg-white flex items-center justify-center p-10">
          <div className="w-full max-w-[300px]">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome Back !!</h2>
            <p className="text-gray-600 text-sm mb-8">Please enter your credentials to log in</p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 mb-4 rounded-lg border border-gray-300 outline-none focus:border-[#1e255e] text-sm"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 mb-4 rounded-lg border border-gray-300 outline-none focus:border-[#1e255e] text-sm"
              />

              {error && (
                <p className="text-red-500 text-xs mb-2">{error}</p>
              )}

              <a
                href="#"
                onClick={() => navigate('/forgot-password')}
                className="block mb-4 text-sm text-gray-700 hover:underline"
              >
                Forgot password?
              </a>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-[#0a0f33] text-white rounded-[20px] hover:bg-[#192261] transition-colors disabled:opacity-50"
              >
                {loading ? 'LOGGING IN...' : 'SIGN IN'}
              </button>
            </form>
          </div>
        </div>

        <div className="w-1/2 bg-[#0a0f33] text-white flex flex-col items-center justify-center rounded-tl-[60px] rounded-bl-[60px]">
          <img src="/assets/logo.svg" alt="BookHive Logo" className="w-20 mb-5" />
          <h1 className="text-3xl text-center mb-3">
            BookHive
            <br />
            <span className="block font-['Caveat',cursive] text-3xl font-medium">Library</span>
          </h1>
          <p className="text-sm text-[#d9defa] mb-5">New to our platform? Sign Up now.</p>
          <button
            onClick={() => navigate('/signup')}
            className="border border-white text-white px-6 py-2 rounded-[20px] hover:bg-white hover:text-[#0a0f33] transition-colors"
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

