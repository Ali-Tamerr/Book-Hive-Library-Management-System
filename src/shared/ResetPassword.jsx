import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthInput from '../components/AuthInput';
import PrimaryButton from '../components/PrimaryButton';
import DarkBgSection from '../components/DarkBgSection';
import WhiteBgSection from '../components/WhiteBgSection';

function ResetPassword() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <div className="h-screen w-full flex bg-[#f5f7fb]">
            <div className="flex max-[1080px]:flex-col w-full h-full max-[1080px]:h-full bg-white overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.15)]">

                <WhiteBgSection
                    title="Reset Password"
                    subtitle="Please enter your new password"
                    mobileOnly={true}
                >
                    <form onSubmit={handleSubmit} className="w-full items-center flex flex-col gap-6">
                        <AuthInput
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <AuthInput
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <PrimaryButton type="submit">
                            RESET PASSWORD
                        </PrimaryButton>
                    </form>
                </WhiteBgSection>

                <DarkBgSection
                    message={<>"Your premier digital library<br />for borrowing and reading books"</>}
                    position="left"
                />

                <WhiteBgSection
                    title="Reset Password"
                    subtitle="Please enter your new password"
                    desktopOnly={true}
                    backButton={{ text: 'BACK', onClick: () => navigate('/otp'), position: 'right' }}
                >
                    <form onSubmit={handleSubmit} className="w-full items-center flex flex-col gap-6">
                        <AuthInput
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <AuthInput
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="mb-2"
                        />
                        <PrimaryButton type="submit">
                            RESET PASSWORD
                        </PrimaryButton>
                    </form>
                </WhiteBgSection>
            </div>
        </div>
    );
}

export default ResetPassword;
