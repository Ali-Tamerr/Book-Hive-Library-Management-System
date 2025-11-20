import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../services/auth.api';
import LogoIcon from '../../assets/logo.svg?react'

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Clear any existing user session when the login page loads
    logout();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(username, password);
      if (user.role === 'Admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'User') {
        navigate('/user/dashboard');
      } else {
        navigate('/login');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex max-[1080px]:min-w-screen items-center justify-center bg-[#f4f6fb] [1080px]:p-4">
      <div className="flex max-[1080px]:flex-col justify-stretch w-full max-w-[900px] h-[550px] max-[1080px]:h-full bg-white rounded-[10px] overflow max-[1080px]:min-w-screen shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
        <div className="max-[1080px]:w-full w-1/2 max-[1080px]:h-screen [1080px]:flex-1 bg-white flex items-center justify-center p-10">
          <div className="w-full max-w-[300px] max-[1080px]:flex max-[1080px]:flex-col max-[1080px]:items-center max-[1080px]:justify-center flex flex-col items-center justify-center gap-4">
          <LogoIcon width="120" className="hidden max-[1080px]:block"/> 
            <h2 className="text-2xl font-semibold text-gray-900">Welcome Back !!</h2>
            <p className="text-gray-600 text-sm text-center">Please enter your credentials to log in</p>

            <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
              <input
                type="email"
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none focus:border-[#1e255e] text-sm"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none focus:border-[#1e255e] text-sm"
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
            <p className="text-sm text-gray-400 mb-5">New to our platform? <button onClick={() => navigate('/signup')} className='underline text-gray-900'>Sign Up now.</button></p>

          </div>
        </div>

        <div className="max-[1080px]:hidden max-[1080px]:h-full w-1/2 [1080px]:flex-1 bg-[#0a0f33] text-white flex flex-col items-center justify-center max-[1080px]:rounded-none rounded-tl-[60px] rounded-bl-[60px]">
<LogoIcon width="120"/> 
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

