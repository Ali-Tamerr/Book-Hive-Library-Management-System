import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/auth.api';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb] p-4">
      <div className="flex w-full max-w-[900px] h-[520px] bg-white rounded-[10px] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
        <div className="w-[45%] bg-[#0a0f33] text-white flex flex-col items-center justify-center p-10 rounded-tr-[60px] rounded-br-[60px]">
          <img src="/assets/logo.svg" alt="BookHive Logo" className="w-24 mb-5" />
          <h1 className="text-3xl text-center mb-5 leading-relaxed">
            BookHive
            <br />
            <span className="block font-['Caveat',cursive] text-3xl font-medium">Library</span>
          </h1>
          <p className="text-sm text-[#d9defa] mb-5 text-center">Already have Account? Sign In now.</p>
          <button
            onClick={() => navigate('/login')}
            className="border border-white text-white px-6 py-2 rounded-[25px] hover:bg-white hover:text-[#0a0f33] transition-colors text-sm"
          >
            SIGN IN
          </button>
        </div>

        <div className="w-[55%] bg-white flex items-center justify-center">
          <div className="text-center w-[85%] max-w-[400px]">
            <img src="/assets/logo.svg" alt="Small Logo" className="w-16 mb-4 mx-auto" />
            <h2 className="text-2xl font-semibold text-[#0a0f33] mb-2">Sign Up</h2>
            <p className="text-gray-700 text-sm mb-6">Please provide your information to sign up.</p>

            <form onSubmit={handleSubmit}>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0a0f33]"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0a0f33]"
                />
              </div>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  name="contact"
                  placeholder="Contact No"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0a0f33]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0a0f33]"
                />
              </div>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0a0f33]"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0a0f33]"
                />
              </div>
              {error && (
                <p className="text-red-500 text-xs mb-2">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-[#0a0f33] text-white rounded-[20px] hover:bg-[#192261] transition-colors font-medium disabled:opacity-50"
              >
                {loading ? 'SIGNING UP...' : 'SIGN UP'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

