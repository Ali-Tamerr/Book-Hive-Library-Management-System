import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthInput from '../components/AuthInput';
import PrimaryButton from '../components/PrimaryButton';
import DarkBgSection from '../components/DarkBgSection';
import WhiteBgSection from '../components/WhiteBgSection';

function OTP() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/reset-password');
    };

    return (
        <div className="h-screen w-full flex bg-[#f5f7fb]">
            <div className="flex max-[1080px]:flex-col w-full h-full max-[1080px]:h-full bg-white overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.15)]">

                <WhiteBgSection
                    title="Check your Mailbox"
                    subtitle="Please enter the OTP to proceed"
                    mobileOnly={true}
                >
                    <form onSubmit={handleSubmit} className="w-full items-center flex flex-col gap-6">
                        <AuthInput
                            type="text"
                            placeholder="OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                        <PrimaryButton type="submit">
                            VERIFY
                        </PrimaryButton>
                    </form>
                </WhiteBgSection>

                <WhiteBgSection
                    title="Check your Mailbox"
                    subtitle="Please enter the OTP to proceed"
                    desktopOnly={true}
                    backButton={{ text: 'BACK', onClick: () => navigate('/forgot-password'), position: 'left' }}
                >
                    <form onSubmit={handleSubmit} className="w-full items-center flex flex-col gap-6">
                        <AuthInput
                            type="text"
                            placeholder="OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="mb-2"
                        />
                        <PrimaryButton type="submit">
                            VERIFY
                        </PrimaryButton>
                    </form>
                </WhiteBgSection>

                <DarkBgSection
                    message={<>"Your premier digital library<br />for borrowing and reading books"</>}
                    position="right"
                />
            </div>
        </div>
    );
}

export default OTP;
