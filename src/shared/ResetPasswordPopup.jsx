import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import AuthInput from '../components/AuthInput';
import PrimaryButton from '../components/PrimaryButton';
import DarkBgSection from '../components/DarkBgSection';
import WhiteBgSection from '../components/WhiteBgSection';

function ResetPasswordPopup({ isOpen, onClose, onLogin, onBack }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const checkTheme = () => {
            setIsDarkMode(document.body.classList.contains('dark-theme'));
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onClose?.();
        onLogin?.();
    };

    const handleBack = () => {
        onClose?.();
        onBack?.();
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
                <div className={`flex max-[1080px]:flex-col w-full h-full ${isDarkMode ? 'bg-[#121317]' : 'bg-white'} overflow-hidden`}>
                    <DarkBgSection
                        message={<>"Your premier digital library<br />for borrowing and reading books"</>}
                        position="left"
                        isDarkMode={isDarkMode}
                    />

                    <WhiteBgSection
                        title="Reset Password"
                        subtitle="Please enter your new password"
                        backButton={{ text: 'BACK', onClick: handleBack, position: 'right' }}
                        isDarkMode={isDarkMode}
                    >
                        <form onSubmit={handleSubmit} className="w-full items-center flex flex-col gap-6">
                            <AuthInput
                                type="password"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                isDarkMode={isDarkMode}
                            />
                            <AuthInput
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                isDarkMode={isDarkMode}
                            />
                            <PrimaryButton type="submit" isDarkMode={isDarkMode}>
                                RESET PASSWORD
                            </PrimaryButton>
                        </form>
                    </WhiteBgSection>
                </div>
            </div>
        </div>
    );

    return createPortal(popupContent, document.body);
}

export default ResetPasswordPopup;
