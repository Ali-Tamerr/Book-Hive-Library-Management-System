import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/auth.api';
import AuthInput from '../components/AuthInput';
import PrimaryButton from '../components/PrimaryButton';
import DarkBgSection from '../components/DarkBgSection';
import WhiteBgSection from '../components/WhiteBgSection';

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
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
        <div className="h-screen w-full flex bg-[#f5f7fb]">
            <div className="flex max-[1080px]:flex-col w-full h-full bg-white max-[1080px]:h-full overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.15)]">

                <WhiteBgSection
                    title="Sign Up"
                    subtitle="Please provide your information to sign up."
                    logoWithTitle={false}
                    mobileOnly={true}
                >
                    <form onSubmit={handleSubmit} className='w-full items-center flex flex-col gap-8'>
                        <div className="">
                            <AuthInput
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex gap-4">
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
                            <p className="text-red-500 text-base mb-3">{error}</p>
                        )}
                        <div className='w-full max-[1080px]:px-12'>
                            <PrimaryButton
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'SIGNING UP...' : 'SIGN UP'}
                            </PrimaryButton>
                        </div>
                        <p className="hidden max-[1080px]:block text-lg text-[#0a0f33] mb-8 text-center">Already have Account? <button className='underline text-[#0a0f33]' onClick={() => navigate('/login')}>Sign In now.</button></p>
                    </form>
                </WhiteBgSection>

                <DarkBgSection
                    message="Already have Account? Sign In now."
                    buttonText="SIGN IN"
                    onButtonClick={() => navigate('/login')}
                    position="left"
                />

                <WhiteBgSection
                    title="Sign Up"
                    subtitle="Please provide your information to sign up."
                    logoWithTitle={true}
                    desktopOnly={true}
                >
                    <form onSubmit={handleSubmit} className='w-full items-center flex flex-col gap-8'>
                        <div className="w-full">
                            <AuthInput
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex w-full gap-4">
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
                        <div className="w-full">
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
                            <p className="text-red-500 text-base mb-3">{error}</p>
                        )}
                        <div className='w-full max-w-100 max-[1080px]:px-12'>
                            <PrimaryButton
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'SIGNING UP...' : 'SIGN UP'}
                            </PrimaryButton>
                        </div>
                        <p className="hidden max-[1080px]:block text-lg text-[#0a0f33] mb-8 text-center">Already have Account? <button className='underline text-[#0a0f33]' onClick={() => navigate('/login')}>Sign In now.</button></p>
                    </form>
                </WhiteBgSection>
            </div>
        </div>
    );
}

export default Signup;
