import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/auth.api';
import AuthInput from '../components/AuthInput';
import PrimaryButton from '../components/PrimaryButton';
import DarkBgSection from '../components/DarkBgSection';
import WhiteBgSection from '../components/WhiteBgSection';

function SignupPopup({ isOpen, onClose, onLogin }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        email: '',
        password: '',
        user_id: ''
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
            navigate('/user/dashboard');
            onClose?.();
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err?.message || 'Signup failed. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = () => {
        onClose?.();
        onLogin?.();
    };

    if (!isOpen) return null;

    const popupContent = (
        <div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-[95%] max-w-[1100px] max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex max-[1080px]:flex-col w-full h-full bg-white overflow-hidden">
                    <DarkBgSection
                        message="Already have Account? Sign In now."
                        buttonText="SIGN IN"
                        onButtonClick={handleLogin}
                        position="left"
                    />

                    <WhiteBgSection
                        title="Sign Up"
                        subtitle="Please provide your information to sign up."
                        logoWithTitle={true}
                    >
                        <form onSubmit={handleSubmit} className='w-full items-center flex flex-col gap-6'>
                            <div className="w-full">
                                <AuthInput
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    autoComplete="name"
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
                                    autoComplete="tel"
                                />
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
                            <div className="w-full">
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
                                <AuthInput
                                    type="text"
                                    name="user_id"
                                    placeholder="ID (for sign in testing)"
                                    value={formData.user_id}
                                    onChange={handleChange}
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            {error && (
                                <p className="text-red-500 text-base mb-3">{error}</p>
                            )}
                            <PrimaryButton
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'SIGNING UP...' : 'SIGN UP'}
                            </PrimaryButton>
                        </form>
                        <p className="text-lg max-[1080px]:block hidden text-gray-400">Already have Account? <button onClick={handleLogin} className='underline text-gray-900'>Sign In now.</button></p>
                    </WhiteBgSection>
                </div>
            </div>
        </div>
    );

    return createPortal(popupContent, document.body);
}

export default SignupPopup;
