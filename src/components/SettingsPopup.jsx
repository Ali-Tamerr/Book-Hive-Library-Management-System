import React, { useState } from 'react';
import Popup from './Popup.jsx';
import FormButton from './FormButton.jsx';
import { Settings } from 'lucide-react';
import { getCurrentUser } from '../services/auth.api';
import { updateUser } from '../services/users.api';

const SettingsPopup = ({ show, onClose }) => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.newPassword !== formData.confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        if (formData.newPassword.length < 6) {
            setError('New password must be at least 6 characters');
            return;
        }

        const currentUser = getCurrentUser();
        if (!currentUser) {
            setError('Not logged in');
            return;
        }

        if (formData.currentPassword !== currentUser.password_hash) {
            setError('Current password is incorrect');
            return;
        }

        setLoading(true);
        try {
            const userData = {
                user_id: currentUser.user_id,
                name: currentUser.name,
                email: currentUser.email,
                phone_number: currentUser.phone_number,
                role: currentUser.role,
                status: currentUser.status || 'Active',
                plan: currentUser.plan || null,
                password_hash: formData.newPassword,
                created_by: currentUser.created_by || null
            };

            await updateUser(currentUser.user_id, userData);

            const updatedUser = { ...currentUser, password_hash: formData.newPassword };
            localStorage.setItem('authToken', JSON.stringify(updatedUser));
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            window.dispatchEvent(new Event('userUpdated'));

            setSuccess('Password changed successfully!');
            setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });

            setTimeout(() => {
                setSuccess('');
                onClose();
            }, 1500);
        } catch (err) {
            console.error('Failed to change password:', err);
            setError('Failed to change password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setError('');
        setSuccess('');
        onClose();
    };

    return (
        <Popup
            show={show}
            onClose={onClose}
            title="Change Credentials"
            icon={<Settings size={28} strokeWidth={2.3} />}
            maxWidthClass="max-w-[700px]"
        >
            <form onSubmit={handleSubmit} className='flex text-[#0a0f33]  flex-col gap-14'>
                <div className='px-10 space-y-6'>
                    <div className='flex items-center gap-6'>
                        <label className='text-sm font-medium w-[180px] text-left whitespace-nowrap'>
                            Enter Current Password
                        </label>
                        <input
                            type="password"
                            name="currentPassword"
                            placeholder="Enter Current Password"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            required
                            className="flex-1 h-[50px] px-4 py-3 rounded-xl border border-[#3D3E3E] outline-none focus:border-[#1e255e] text-[13px]"
                        />
                    </div>

                    <div className='flex items-center gap-6'>
                        <label className='text-sm font-medium w-[180px] text-left whitespace-nowrap'>
                            Enter New Password
                        </label>
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="Enter New Password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                            className="flex-1 h-[50px] px-4 py-3 rounded-xl border border-[#3D3E3E] outline-none focus:border-[#1e255e] text-[13px]"
                        />
                    </div>

                    <div className='flex items-center gap-6'>
                        <label className='text-sm font-medium w-[180px] text-left whitespace-nowrap'>
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm New Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="flex-1 h-[50px] px-4 py-3 rounded-xl border border-[#3D3E3E] outline-none focus:border-[#1e255e] text-[13px]"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}
                    {success && (
                        <p className="text-green-500 text-sm text-center">{success}</p>
                    )}
                </div>

                <div className="flex justify-between gap-3">
                    <FormButton type="button" onClick={handleCancel}>
                        CANCEL
                    </FormButton>
                    <FormButton type="submit" isPrimary disabled={loading}>
                        {loading ? 'CONFIRMING...' : 'CONFIRM'}
                    </FormButton>
                </div>
            </form>
        </Popup>
    );
};

export default SettingsPopup;

