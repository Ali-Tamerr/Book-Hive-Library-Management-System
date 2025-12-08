import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../services/auth.api';
import AuthInput from '../components/AuthInput';
import PrimaryButton from '../components/PrimaryButton';
import DarkBgSection from '../components/DarkBgSection';
import WhiteBgSection from '../components/WhiteBgSection';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
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
            const user = await login(email, password);
            if (user.role === 'Super Admin' || user.role === 'Admin' || user.role === 'Librarian') {
                navigate('/admin/dashboard');
            } else if (user.role === 'User' || user.role === 'Member') {
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

                <WhiteBgSection
                    title="Welcome Back !!"
                    subtitle="Please enter your email and password to log in"
                    loginLayout={true}
                >
                    <form onSubmit={handleSubmit} className='w-full max-[856px]:px-[120px] px-[100px] items-center flex flex-col gap-6'>
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
                            onClick={() => navigate('/forgot-password')}
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
                    <p className="text-lg max-[1080px]:block hidden text-gray-400">New to our platform? <button onClick={() => navigate('/signup')} className='underline text-gray-900'>Sign Up now.</button></p>
                </WhiteBgSection>

                <DarkBgSection
                    message="New to our platform? Sign Up now."
                    buttonText="SIGN UP"
                    onButtonClick={() => navigate('/signup')}
                    position="right"
                />
            </div>
        </div>
    );
}

export default Login;
