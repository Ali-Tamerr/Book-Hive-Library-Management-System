import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth.api';
import AuthInput from '../components/AuthInput';
import PrimaryButton from '../components/PrimaryButton';
import DarkBgSection from '../components/DarkBgSection';
import WhiteBgSection from '../components/WhiteBgSection';
import BranchesPopup from '../components/BranchesPopup';

function LoginPopup({ isOpen, onClose, onForgotPassword, onSignup }) {
    const navigate = useNavigate();
    const [isAnimating, setIsAnimating] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showBranchesPopup, setShowBranchesPopup] = useState(false);

    useEffect(() => {
        const checkTheme = () => {
            setIsDarkMode(document.body.classList.contains('dark-theme'));
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const user = await login(phoneNumber, password);
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

    useEffect(() => {
        if (!isOpen) return undefined;
        setIsAnimating(false);
        const id = requestAnimationFrame(() => setIsAnimating(true));
        return () => cancelAnimationFrame(id);
    }, [isOpen]);

    if (!isOpen) return null;

    const popupContent = (
        <div
            className="login-popup-overlay fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className={`login-popup-container ${isAnimating ? 'login-popup-container--show' : ''} relative w-[95%] max-w-[1420px] h-full max-h-[87vh] overflow-hidden rounded-2xl shadow-2xl`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={`flex max-[1080px]:flex-col justify-stretch w-full h-full ${isDarkMode ? 'bg-[#121317]' : 'bg-white'} overflow-hidden`}>
                    <WhiteBgSection
                        title="Welcome Back !!"
                        subtitle="Please enter your phone number and password to log in"
                        loginLayout={true}
                        isDarkMode={isDarkMode}
                        backButton={{
                            text: 'BACK',
                            position: 'left',
                            onClick: onClose
                        }}
                    >
                        <form onSubmit={handleSubmit} className='w-full px-[100px] max-[856px]:px-[120px] items-center flex flex-col gap-6'>
                            <AuthInput
                                type="text"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                isDarkMode={isDarkMode}
                            />
                            <AuthInput
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                isDarkMode={isDarkMode}
                            />

                            {error && (
                                <p className="text-red-500 text-base mb-3">{error}</p>
                            )}

                            <a
                                href="#"
                                onClick={handleForgotPassword}
                                className={`block text-lg self-start font-medium ${isDarkMode ? 'text-white' : 'text-[#0a0f33]'} mb-6 hover:underline`}
                            >
                                Forgot password?
                            </a>
                            <PrimaryButton
                                type="submit"
                                disabled={loading}
                                isDarkMode={isDarkMode}
                            >
                                {loading ? 'SIGNING IN...' : 'SIGN IN'}
                            </PrimaryButton>
                        </form>
                        <p className={`text-lg max-[1080px]:block hidden ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>New to our platform? <button onClick={handleSignup} className={`underline ${isDarkMode ? 'text-white' : 'text-gray-900'} cursor-pointer`}>Sign Up now.</button></p>
                    </WhiteBgSection>

                    <DarkBgSection
                        message="New to our platform? Please fill your form and visit any of our branches to complete the registration process."
                        buttonText="Registration Form"
                        onButtonClick={handleSignup}
                        secondButtonText="Where are we ?"
                        onSecondButtonClick={() => setShowBranchesPopup(true)}
                        position="right"
                        isDarkMode={isDarkMode}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <>
            {createPortal(popupContent, document.body)}
            <BranchesPopup
                isOpen={showBranchesPopup}
                onClose={() => setShowBranchesPopup(false)}
            />
        </>
    );
}

export default LoginPopup;
