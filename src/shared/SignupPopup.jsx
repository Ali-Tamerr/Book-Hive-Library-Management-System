import { useState } from 'react';
import { createPortal } from 'react-dom';
import { createUserRequest } from '../services/userRequests.api';
import AuthInput from '../components/AuthInput';
import PrimaryButton from '../components/PrimaryButton';
import DarkBgSection from '../components/DarkBgSection';
import WhiteBgSection from '../components/WhiteBgSection';
import FormSelect from '../components/FormSelect';

function SignupPopup({ isOpen, onClose, onLogin }) {
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
            setTimeout(() => {
                onClose?.();
                setSuccess(false);
            }, 3000);
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err?.message || 'Request submission failed. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = () => {
        onClose?.();
        onLogin?.();
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
                <div className="flex max-[1080px]:flex-col w-full h-full bg-white overflow-hidden">
                    <DarkBgSection
                        message="Already have Account? Sign In now."
                        buttonText="SIGN IN"
                        onButtonClick={handleLogin}
                        position="left"
                    />

                    <WhiteBgSection
                        title="Registration Request"
                        subtitle="Fill out the form below to request an account. An admin will review your request."
                        logoWithTitle={true}
                    >
                        {success ? (
                            <div className="w-full text-center py-8">
                                <div className="text-green-600 text-xl font-semibold mb-4">
                                    ✓ Request Submitted Successfully!
                                </div>
                                <p className="text-gray-600">
                                    Your registration request has been sent to the admin for approval.
                                    You will be notified once your account is approved.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className='w-full items-center flex flex-col gap-6'>
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
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        autoComplete="email"
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
                                <PrimaryButton
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'SUBMITTING...' : 'SUBMIT REQUEST'}
                                </PrimaryButton>
                            </form>
                        )}
                        <p className="text-lg max-[1080px]:block hidden text-gray-400">Already have Account? <button onClick={handleLogin} className='underline text-gray-900 cursor-pointer'>Sign In now.</button></p>
                    </WhiteBgSection>
                </div>
            </div>
        </div>
    );

    return createPortal(popupContent, document.body);
}

export default SignupPopup;
