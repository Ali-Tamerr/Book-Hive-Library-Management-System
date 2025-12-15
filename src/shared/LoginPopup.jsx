import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth.api';
import AuthInput from '../components/AuthInput';
import PrimaryButton from '../components/PrimaryButton';
import DarkBgSection from '../components/DarkBgSection';
import WhiteBgSection from '../components/WhiteBgSection';

function LoginPopup({ isOpen, onClose, onForgotPassword, onSignup }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const user = await login(email, password);
            if (user.role === 'Super Admin' || user.role === 'Admin' || user.role === 'Librarian') {
                navigate('/admin/dashboard');
            } else if (user.role === 'User' || user.role === 'Member') {
                navigate('/user/dashboard');
            } else {
                navigate('/login');
            }
            onClose?.();
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        onClose?.();
        onForgotPassword?.();
    };

    const handleSignup = () => {
        onClose?.();
        onSignup?.();
    };

    if (!isOpen) return null;

    const popupContent = (
        <div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-[95%] max-w-[1300px] h-[700px] max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex max-[1080px]:flex-col justify-stretch w-full h-full bg-white overflow-hidden">
                    <WhiteBgSection
                        title="Welcome Back !!"
                        subtitle="Please enter your email and password to log in"
                        loginLayout={true}
                    >
                        <form onSubmit={handleSubmit} className='w-full px-[100px] max-[856px]:px-[120px] items-center flex flex-col gap-6'>
                            <AuthInput
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <AuthInput
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            {error && (
                                <p className="text-red-500 text-base mb-3">{error}</p>
                            )}

                            <a
                                href="#"
                                onClick={handleForgotPassword}
                                className="block text-lg self-start font-medium text-[#0a0f33] mb-6 hover:underline"
                            >
                                Forgot password?
                            </a>
                            <PrimaryButton
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'SIGNING IN...' : 'SIGN IN'}
                            </PrimaryButton>
                        </form>
                        <p className="text-lg max-[1080px]:block hidden text-gray-400">New to our platform? <button onClick={handleSignup} className='underline text-gray-900 cursor-pointer'>Sign Up now.</button></p>
                    </WhiteBgSection>

                    <DarkBgSection
                        message="New to our platform? Please visit any of our branches to complete the registration process."
                        buttonText="Where are we ?"
                        onButtonClick={() => window.open('https://maps.google.com', '_blank')}
                        secondButtonText="Fill your form"
                        onSecondButtonClick={handleSignup}
                        position="right"
                    />
                </div>
            </div>
        </div>
    );

    return createPortal(popupContent, document.body);
}

export default LoginPopup;
