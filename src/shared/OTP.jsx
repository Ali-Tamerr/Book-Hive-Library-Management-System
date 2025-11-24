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
        <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb] [1080px]:p-4">
            <div className="flex max-[1080px]:flex-col w-full max-w-[900px] h-[550px] max-[1080px]:h-full bg-white rounded-[10px] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.1)]">

                <div className="max-[1080px]:flex hidden max-[1080px]:w-full max-[1080px]:h-full bg-white items-center justify-center">
                    <div className="flex flex-col gap-2 justify-center p-4 items-center max-[1080px]:h-screen w-[85%] max-[1080px]:w-full max-w-[400px]">
                        <LogoIcon className="w-18 h-min text-[#0a0f33] mb-4" />
                        <h2 className="text-xl font-semibold text-[#0a0f33] mb-2">Check your Mailbox</h2>
                        <p className="text-[#0a0f33] text-sm mb-5 text-center">Please enter the OTP to proceed</p>

                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
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

                <div className="w-1/2 max-[1080px]:hidden bg-white flex flex-col items-center justify-center relative">
                    <button
                        onClick={() => navigate('/forgot-password')}
                        className="absolute top-5 left-5 border border-[#0a0f33] text-[#0a0f33] rounded-[20px] px-4 py-1 text-xs hover:bg-[#0a0f33] hover:text-white transition-colors"
                    >
                        BACK
                    </button>

                    <div className="text-center w-[80%] max-w-[300px]">
                        <LogoIcon className="w-18 h-min text-[#0a0f33] mb-4 mx-auto" />
                        <h2 className="text-xl font-semibold text-[#0a0f33] mb-2">Check your Mailbox</h2>
                        <p className="text-[#0a0f33] text-sm mb-5">Please enter the OTP to proceed</p>

                        <form onSubmit={handleSubmit}>
                            <AuthInput
                                type="text"
                                placeholder="OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                className="mb-5"
                            />
                            <PrimaryButton
                                type="submit"
                            >
                                VERIFY
                            </PrimaryButton>
                        </form>
                    </div>
                </div>

                <div className="w-1/2 max-[1080px]:hidden bg-[#0a0f33] text-white flex flex-col items-center justify-center gap-8 p-10 rounded-tl-[60px] rounded-bl-[60px]">
                    <LogoIcon className="w-[160px] h-min" />
                    <h1 className="text-[40px] text-center -mt-8 text-white">
                        BookHive
                        <br />
                        <span className="block font-['Caveat',cursive] text-[40px] -mt-4 font-medium">Library</span>
                    </h1>
                    <p className="text-sm text-white text-center cursor-default">
                        "Your premier digital library<br />for borrowing and reading books"
                    </p>
                </div>
            </div>
        </div>
    );
}

export default OTP;
