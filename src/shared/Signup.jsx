import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserRequest } from '../services/userRequests.api';
import AuthInput from '../components/AuthInput';
import PrimaryButton from '../components/PrimaryButton';
import DarkBgSection from '../components/DarkBgSection';
import WhiteBgSection from '../components/WhiteBgSection';
import FormSelect from '../components/FormSelect';

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone_number: '',
        plan: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await createUserRequest(formData);
            setSuccess(true);
            setFormData({
                name: '',
                email: '',
                password: '',
                phone_number: '',
                plan: ''
            });
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err?.message || 'Request submission failed. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-full flex bg-[#f5f7fb]">
            <div className="flex max-[1080px]:flex-col w-full h-full bg-white max-[1080px]:h-full overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.15)]">

                <WhiteBgSection
                    title="Registration Request"
                    subtitle="Fill out the form below to request an account. An admin will review your request."
                    logoWithTitle={false}
                    mobileOnly={true}
                >
                    {success ? (
                        <div className="w-full text-center py-8">
                            <div className="text-green-600 text-xl font-semibold mb-4">
                                ✓ Request Submitted Successfully!
                            </div>
                            <p className="text-gray-600 mb-6">
                                Your registration request has been sent to the admin for approval.
                                You will be notified once your account is approved.
                            </p>
                            <button
                                onClick={() => navigate('/login')}
                                className="text-[#0a0f33] underline cursor-pointer font-semibold"
                            >
                                Go to Login
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className='w-full items-center flex flex-col gap-8'>
                            <div className="flex w-full gap-4">
                                <AuthInput
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    autoComplete="name"
                                />
                                <AuthInput
                                    type="text"
                                    name="phone_number"
                                    placeholder="Contact No"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    required
                                    autoComplete="tel"
                                />
                            </div>
                            <div className="flex w-full gap-4">
                                <AuthInput
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                />
                                <AuthInput
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-password"
                                />
                            </div>
                            <div className="w-full">
                                <FormSelect
                                    name="plan"
                                    value={formData.plan}
                                    onChange={handleChange}
                                    placeholder="Select Plan (Optional)"
                                    options={[
                                        { value: 'Discover', label: 'Discover' },
                                        { value: 'Enterprise', label: 'Enterprise' },
                                        { value: 'Professional', label: 'Professional' }
                                    ]}
                                />
                            </div>
                            {error && (
                                <p className="text-red-500 text-base mb-3">{error}</p>
                            )}
                            <div className='w-full flex justify-center max-[1080px]:px-12'>
                                <PrimaryButton
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'SUBMITTING...' : 'SUBMIT REQUEST'}
                                </PrimaryButton>
                            </div>
                            <p className="hidden max-[1080px]:block text-lg text-[#0a0f33] mb-8 text-center">Already have Account? <button className='underline text-[#0a0f33] cursor-pointer' onClick={() => navigate('/login')}>Sign In now.</button></p>
                        </form>
                    )}
                </WhiteBgSection>

                <DarkBgSection
                    message="Already have Account? Sign In now."
                    buttonText="SIGN IN"
                    onButtonClick={() => navigate('/login')}
                    position="left"
                />

                <WhiteBgSection
                    title="Registration Request"
                    subtitle="Fill out the form below to request an account. An admin will review your request."
                    logoWithTitle={true}
                    desktopOnly={true}
                >
                    {success ? (
                        <div className="w-full text-center py-8">
                            <div className="text-green-600 text-xl font-semibold mb-4">
                                ✓ Request Submitted Successfully!
                            </div>
                            <p className="text-gray-600 mb-6">
                                Your registration request has been sent to the admin for approval.
                                You will be notified once your account is approved.
                            </p>
                            <button
                                onClick={() => navigate('/login')}
                                className="text-[#0a0f33] underline cursor-pointer font-semibold"
                            >
                                Go to Login
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className='w-full items-center flex flex-col gap-8'>
                            <div className="w-full">
                                <AuthInput
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    autoComplete="name"
                                />
                            </div>
                            <div className="flex w-full gap-4">
                                <AuthInput
                                    type="text"
                                    name="phone_number"
                                    placeholder="Contact No"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    required
                                    autoComplete="tel"
                                />
                                <AuthInput
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                />
                            </div>
                            <div className="flex w-full gap-4">
                                <AuthInput
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-password"
                                />
                                <FormSelect
                                    name="plan"
                                    value={formData.plan}
                                    onChange={handleChange}
                                    placeholder="Select Plan (Optional)"
                                    options={[
                                        { value: 'Discover', label: 'Discover' },
                                        { value: 'Enterprise', label: 'Enterprise' },
                                        { value: 'Professional', label: 'Professional' }
                                    ]}
                                />
                            </div>
                            {error && (
                                <p className="text-red-500 text-base mb-3">{error}</p>
                            )}
                            <div className='w-full max-w-100 max-[1080px]:px-12'>
                                <PrimaryButton
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'SUBMITTING...' : 'SUBMIT REQUEST'}
                                </PrimaryButton>
                            </div>
                            <p className="hidden max-[1080px]:block text-lg text-[#0a0f33] mb-8 text-center">Already have Account? <button className='underline text-[#0a0f33] cursor-pointer' onClick={() => navigate('/login')}>Sign In now.</button></p>
                        </form>
                    )}
                </WhiteBgSection>
            </div>
        </div>
    );
}

export default Signup;
