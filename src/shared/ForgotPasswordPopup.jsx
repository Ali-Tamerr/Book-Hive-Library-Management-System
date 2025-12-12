import { useState } from 'react';
import { createPortal } from 'react-dom';
import AuthInput from '../components/AuthInput';
import PrimaryButton from '../components/PrimaryButton';
import DarkBgSection from '../components/DarkBgSection';
import WhiteBgSection from '../components/WhiteBgSection';

function ForgotPasswordPopup({ isOpen, onClose, onOTP, onBack }) {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onClose?.();
        onOTP?.();
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
                className="relative w-[95%] max-w-[1100px] max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex max-[1080px]:flex-col w-full h-full bg-white overflow-hidden">
                    <DarkBgSection
                        message={<>"Your premier digital library<br />for borrowing and reading books"</>}
                        position="left"
                    />

                    <WhiteBgSection
                        title="Forgot Password"
                        subtitle="Please enter your email"
                        backButton={{ text: 'BACK', onClick: handleBack, position: 'right' }}
                    >
                        <form onSubmit={handleSubmit} className="w-full items-center flex flex-col gap-6">
                            <AuthInput
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <PrimaryButton type="submit">
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

export default ForgotPasswordPopup;
