import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/auth.api';
import LogoIcon from '../assets/logo.svg?react';
import AuthInput from '../components/AuthInput';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

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
            navigate('/user/dashboard');
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
            <div className="flex max-[1080px]:flex-col w-full max-w-[900px] h-[550px] bg-white max-[1080px]:h-full rounded-[10px] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
                <div className="w-[55%] max-[1080px]:flex hidden max-[1080px]:w-full max-[1080px]:h-full  [1080px]:flex-1  bg-white  items-center justify-center ">
                    <div className="flex flex-col gap-2 justify-center p-4 items-center max-[1080px]:h-screen w-[85%] max-[1080px]:w-full max-w-[400px]">
                        <div className='flex gap-4'>
                            <h2 className="text-2xl inline font-semibold text-[#0a0f33]">Sign Up</h2>
                            <LogoIcon className="w-22 text-[#0a0f33]" />
                        </div>
                        <p className="text-[#0a0f33] text-sm mb-6 text-center">Please provide your information to sign up.</p>
                        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-6'>
                            <div className="flex gap-2">
                                <AuthInput
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                                <AuthInput
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex gap-2 ">
                                <AuthInput
                                    type="text"
                                    name="contact"
                                    placeholder="Contact No"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    required
                                />
                                <AuthInput
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="">
                                <AuthInput
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {error && (
                                <p className="text-red-500 text-xs mb-2">{error}</p>
                            )}
                            <div className='w-full max-[1080px]:px-8'>
                                <PrimaryButton
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'SIGNING UP...' : 'SIGN UP'}
                                </PrimaryButton>
                            </div>
                            <p className="hidden max-[1080px]:block text-sm text-[#0a0f33] mb-5 text-center">Already have Account? <button className='underline text-[#0a0f33]' onClick={() => navigate('/login')}>Sign In now.</button></p>
                        </form>

                    </div>
                </div>
                <div className="max-[1080px]:hidden max-[1080px]:h-full w-1/2 [1080px]:flex-1 bg-[#0a0f33] text-white flex flex-col items-center justify-center gap-8  p-10 rounded-tr-[60px] rounded-br-[60px] max-[1080px]:rounded-none">
                    <LogoIcon className="w-[160px] h-min" />
                    <h1 className="text-[40px] text-center -mt-8 text-white">
                        BookHive
                        <br />
                        <span className="block font-['Caveat',cursive] text-[40px] -mt-4 font-medium">Library</span>
                    </h1>
                    <p className="text-sm text-white text-center cursor-default">Already have Account? Sign In now.</p>
                    <SecondaryButton
                        onClick={() => navigate('/login')}
                    >
                        SIGN IN
                    </SecondaryButton>
                </div>
                <div className="flex flex-1 flex-col gap-2 justify-center p-4 items-center max-[1080px]:hidden w-full">
                    <LogoIcon className="w-22 text-[#0a0f33]" />
                    <h2 className="text-2xl font-semibold text-[#0a0f33] mb-2">Sign Up</h2>
                    <p className="text-[#0a0f33] text-sm mb-6 text-center">Please provide your information to sign up.</p>
                    <form onSubmit={handleSubmit} className='w-full flex flex-col gap-6'>
                        <div className="flex gap-2">
                            <AuthInput
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                            <AuthInput
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex gap-2 ">
                            <AuthInput
                                type="text"
                                name="contact"
                                placeholder="Contact No"
                                value={formData.contact}
                                onChange={handleChange}
                                required
                            />
                            <AuthInput
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="">
                            <AuthInput
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {error && (
                            <p className="text-red-500 text-xs mb-2">{error}</p>
                        )}
                        <div className='w-full max-[1080px]:px-8'>
                            <PrimaryButton
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'SIGNING UP...' : 'SIGN UP'}
                            </PrimaryButton>
                        </div>
                        <p className="hidden max-[1080px]:block text-sm text-[#0a0f33] mb-5 text-center">Already have Account? <button className='underline text-[#0a0f33]' onClick={() => navigate('/login')}>Sign In now.</button></p>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Signup;
