import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../services/auth.api';
import LogoIcon from '../../assets/logo.svg?react'


function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
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
      console.log('Signup form submitted with:', formData);
      await signup(formData);
      console.log('Signup successful, navigating to dashboard');
      navigate('/dashboard');
    } catch (err) {
      console.error('Signup failed with error:', err);
      const errorMessage = err?.response?.data?.message || err?.message || 'Signup failed. Please try again.';
      console.error('Error message:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb] [1080px]:p-4">
      <div className="flex max-[1080px]:flex-col w-full max-w-[900px] h-[520px] bg-white max-[1080px]:h-full rounded-[10px] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
        <div className="w-[55%] max-[1080px]:flex hidden max-[1080px]:w-full max-[1080px]:h-full  [1080px]:flex-1  bg-white  items-center justify-center ">
          <div className="flex flex-col gap-2 justify-center p-4 items-center max-[1080px]:h-screen w-[85%] max-[1080px]:w-full max-w-[400px]">
            <LogoIcon className="w-22 text-[#0a0f33]" />
            <h2 className="text-2xl font-semibold text-[#0a0f33] mb-2">Sign Up</h2>
            <p className="text-gray-700 text-sm mb-6 text-center">Please provide your information to sign up.</p>
            <form onSubmit={handleSubmit} className='w-full flex flex-col gap-6'>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0a0f33]"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0a0f33]"
                />
              </div>
              <div className="flex gap-2 ">
                <input
                  type="text"
                  name="contact"
                  placeholder="Contact No"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0a0f33]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full  px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0a0f33]"
                />
              </div>
              <div className="">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0a0f33]"
                />
              </div>
              {error && (
                <p className="text-red-500 text-xs mb-2">{error}</p>
              )}
              <div className='w-full max-[1080px]:px-8'> 
                <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-[#0a0f33] text-white rounded-[20px] hover:bg-[#192261] transition-colors font-medium disabled:opacity-50"
              >
                {loading ? 'SIGNING UP...' : 'SIGN UP'}
              </button>
              </div>
              <p className="hidden max-[1080px]:block text-sm text-[#3f3f3f] mb-5 text-center">Already have Account? <button className='underline text-[#0a0f33]' onClick={() => navigate('/login')}>Sign In now.</button></p>
            </form>

          </div>
        </div>
        <div className="max-[1080px]:hidden max-[1080px]:w-full max-[1080px]:h-full  bg-[#0a0f33] text-white flex flex-1 flex-col items-center justify-center p-10 rounded-tr-[60px] rounded-br-[60px] max-[1080px]:rounded-none">
          <LogoIcon width="120" />
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
        <div className="flex flex-1 flex-col gap-2 justify-center p-4 items-center max-[1080px]:hidden w-full">
            <LogoIcon className="w-22 text-[#0a0f33]" />
            <h2 className="text-2xl font-semibold text-[#0a0f33] mb-2">Sign Up</h2>
            <p className="text-gray-700 text-sm mb-6 text-center">Please provide your information to sign up.</p>
            <form onSubmit={handleSubmit} className='w-full flex flex-col gap-6'>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0a0f33]"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0a0f33]"
                />
              </div>
              <div className="flex gap-2 ">
                <input
                  type="text"
                  name="contact"
                  placeholder="Contact No"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0a0f33]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full  px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0a0f33]"
                />
              </div>
              <div className="">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0a0f33]"
                />
              </div>
              {error && (
                <p className="text-red-500 text-xs mb-2">{error}</p>
              )}
              <div className='w-full max-[1080px]:px-8'> 
                <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-[#0a0f33] text-white rounded-[20px] hover:bg-[#192261] transition-colors font-medium disabled:opacity-50"
              >
                {loading ? 'SIGNING UP...' : 'SIGN UP'}
              </button>
              </div>
              <p className="hidden max-[1080px]:block text-sm text-[#3f3f3f] mb-5 text-center">Already have Account? <button className='underline text-[#0a0f33]' onClick={() => navigate('/login')}>Sign In now.</button></p>
            </form>

          </div>
      </div>
    </div>
  );
}

export default Signup;

