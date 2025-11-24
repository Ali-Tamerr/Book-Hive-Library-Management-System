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
        <div className="min-h-screen flex max-[1080px]:min-w-screen items-center justify-center bg-[#f4f6fb] [1080px]:p-4">
            <div className="flex max-[1080px]:flex-col justify-stretch w-full max-w-[900px] h-[550px] max-[1080px]:h-full bg-white rounded-[10px] overflow max-[1080px]:min-w-screen shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
                <div className="max-[1080px]:w-full w-1/2 max-[1080px]:h-screen [1080px]:flex-1 bg-white flex items-center justify-center p-10">
                    <div className="w-full max-w-[300px] h-full justify-between max-[1080px]:p-0 py-8 max-[1080px]:flex max-[1080px]:flex-col max-[1080px]:items-center max-[1080px]:justify-center flex flex-col items-center gap-4">
                        <LogoIcon className="w-18 h-min text-[#0a0f33]" />
                        <div className="flex flex-col gap-6 -mt-6">
                            <h2 className="text-[32px] font-medium text-[#0a0f33]">Welcome Back !!</h2>
                            <p className="text-[#0a0f33] text-xs text-center">Please enter your credentials to log in</p>
                        </div>

                        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
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
                                <p className="text-red-500 text-xs mb-2">{error}</p>
                            )}

                            <a
                                href="#"
                                onClick={() => navigate('/forgot-password')}
                                className="block text-sm font-medium text-[#0a0f33] mb-4 hover:underline"
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
                        <p className="text-sm max-[1080px]:block hidden text-gray-400">New to our platform? <button onClick={() => navigate('/signup')} className='underline text-gray-900'>Sign Up now.</button></p>

                    </div>
                </div>

                <div className="max-[1080px]:hidden max-[1080px]:h-full w-1/2 [1080px]:flex-1 bg-[#0a0f33] text-white flex flex-col items-center justify-center gap-8 max-[1080px]:rounded-none rounded-tl-[60px] rounded-bl-[60px]">
                    <LogoIcon className="w-[160px] h-min" />
                    <h1 className="text-[40px] text-center -mt-8 ">
                        BookHive
                        <br />
                        <span className="block font-['Caveat',cursive] text-[40px] -mt-4 font-medium">Library</span>
                    </h1>
                    <p className="text-sm text-white cursor-default ">New to our platform? Sign Up now.</p>
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
