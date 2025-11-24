import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../services/auth.api';
import LogoIcon from '../assets/logo.svg?react'
import AuthInput from '../components/AuthInput';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        logout();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const user = await login(username, password);
            if (user.role === 'Admin') {
                navigate('/admin/dashboard');
            } else if (user.role === 'User') {
                navigate('/user/dashboard');
            } else {
                navigate('/login');
            }
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-full flex bg-[#f4f6fb]">
            <div className="flex max-[1080px]:flex-col justify-stretch w-full h-full max-[1080px]:h-full bg-white overflow shadow-[0_15px_40px_rgba(0,0,0,0.15)]">
                <div className="max-[1080px]:w-full w-1/2 max-[1080px]:h-screen bg-white flex items-center justify-center p-16">
                    <div className="w-full max-w-[500px] h-full justify-between max-[1080px]:p-0 py-12 max-[1080px]:flex max-[1080px]:flex-col max-[1080px]:items-center max-[1080px]:justify-center flex flex-col items-center gap-8">
                        <LogoIcon className="w-32 h-min text-[#0a0f33]" />
                        <div className="flex flex-col gap-8 -mt-8">
                            <h2 className="text-[52px] font-medium text-[#0a0f33]">Welcome Back !!</h2>
                            <p className="text-[#0a0f33] text-lg text-center">Please enter your credentials to log in</p>
                        </div>

                        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-6'>
                            <AuthInput
                                type="email"
                                placeholder="Email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                                onClick={() => navigate('/forgot-password')}
                                className="block text-lg font-medium text-[#0a0f33] mb-6 hover:underline"
                            >
                                Forgot password?
                            </a>
                            <PrimaryButton
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'LOGGING IN...' : 'SIGN IN'}
                            </PrimaryButton>
                        </form>
                        <p className="text-lg max-[1080px]:block hidden text-gray-400">New to our platform? <button onClick={() => navigate('/signup')} className='underline text-gray-900'>Sign Up now.</button></p>

                    </div>
                </div>

                <div className="max-[1080px]:hidden w-1/2 bg-[#0a0f33] text-white flex flex-col items-center justify-center gap-12 rounded-tl-[80px] rounded-bl-[80px] p-16">
                    <LogoIcon className="w-[280px] h-min" />
                    <h1 className="text-[64px] text-center -mt-12">
                        BookHive
                        <br />
                        <span className="block font-['Caveat',cursive] text-[64px] -mt-6 font-medium">Library</span>
                    </h1>
                    <p className="text-xl text-white cursor-default">New to our platform? Sign Up now.</p>
                    <SecondaryButton
                        onClick={() => navigate('/signup')}
                    >
                        SIGN UP
                    </SecondaryButton>
                </div>
            </div>
        </div>
    );
}

export default Login;
