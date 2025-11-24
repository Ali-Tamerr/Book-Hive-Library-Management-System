import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoIcon from '../assets/logo.svg?react';
import AuthInput from '../components/AuthInput';
import PrimaryButton from '../components/PrimaryButton';

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

                <div className="max-[1080px]:flex hidden max-[1080px]:w-full max-[1080px]:h-full bg-white items-center justify-center">
                    <div className="flex flex-col gap-4 justify-center p-8 items-center max-[1080px]:h-screen w-[85%] max-[1080px]:w-full max-w-[650px]">
                        <LogoIcon className="w-32 h-min text-[#0a0f33] mb-6" />
                        <h2 className="text-3xl font-semibold text-[#0a0f33] mb-4">Check your Mailbox</h2>
                        <p className="text-[#0a0f33] text-lg mb-8 text-center">Please enter the OTP to proceed</p>

                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
                            <AuthInput
                                type="text"
                                placeholder="OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                            <PrimaryButton
                                type="submit"
                            >
                                VERIFY
                            </PrimaryButton>
                        </form>
                    </div>
                </div>

                <div className="w-1/2 max-[1080px]:hidden bg-white flex flex-col items-center justify-center relative p-16">
                    <button
                        onClick={() => navigate('/forgot-password')}
                        className="absolute top-8 left-8 border border-[#0a0f33] text-[#0a0f33] rounded-[30px] px-6 py-2 text-base hover:bg-[#0a0f33] hover:text-white transition-colors"
                    >
                        BACK
                    </button>

                    <div className="text-center w-[80%] max-w-[500px]">
                        <LogoIcon className="w-32 h-min text-[#0a0f33] mb-6 mx-auto" />
                        <h2 className="text-3xl font-semibold text-[#0a0f33] mb-4">Check your Mailbox</h2>
                        <p className="text-[#0a0f33] text-lg mb-8">Please enter the OTP to proceed</p>

                        <form onSubmit={handleSubmit}>
                            <AuthInput
                                type="text"
                                placeholder="OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                className="mb-8"
                            />
                            <PrimaryButton
                                type="submit"
                            >
                                VERIFY
                            </PrimaryButton>
                        </form>
                    </div>
                </div>

                <div className="w-1/2 max-[1080px]:hidden bg-[#0a0f33] text-white flex flex-col items-center justify-center gap-12 p-16 rounded-tl-[80px] rounded-bl-[80px]">
                    <LogoIcon className="w-[280px] h-min" />
                    <h1 className="text-[64px] text-center -mt-12 text-white">
                        BookHive
                        <br />
                        <span className="block font-['Caveat',cursive] text-[64px] -mt-6 font-medium">Library</span>
                    </h1>
                    <p className="text-xl text-white text-center cursor-default">
                        "Your premier digital library<br />for borrowing and reading books"
                    </p>
                </div>
            </div>
        </div>
    );
}

export default OTP;
