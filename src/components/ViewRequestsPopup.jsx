import React, { useState, useMemo } from 'react';
import Popup from './Popup.jsx';
import FormButton from './FormButton.jsx';
import { Users, Search, Check, X } from 'lucide-react';

const ViewRequestsPopup = ({ show, onClose, requests = [], onApprove, onReject, isLoading = false }) => {
    const [searchValue, setSearchValue] = useState('');

    const filteredAndSortedRequests = useMemo(() => {
        let filtered = requests;

        if (searchValue.trim()) {
            const searchLower = searchValue.toLowerCase();
            filtered = requests.filter(
                (request) =>
                    request.name?.toLowerCase().includes(searchLower) ||
                    request.email?.toLowerCase().includes(searchLower)
            );
        }

        return [...filtered].sort((a, b) => {
            const dateA = new Date(a.created_at || 0);
            const dateB = new Date(b.created_at || 0);
            return dateB - dateA;
        });
    }, [requests, searchValue]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status) => {
        return (
            <span className={`text-xs font-medium`}>
                {status || 'Pending'}
            </span>
        );
    };

    return (
        <Popup
            show={show}
            onClose={onClose}
            title="User Requests"
            icon={<Users size={30} />}
            maxWidthClass="max-w-[1100px] max-[856px]:scale-80"
        >
            <div className='flex flex-col gap-6'>
                <div className='relative'>
                    <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="w-full h-[50px] pl-12 pr-4 py-3 rounded-xl border border-[#3D3E3E] outline-none focus:border-[#1e255e] text-[13px]"
                    />
                </div>

                <div className='border border-[#8787A3] rounded-[10px] overflow-hidden'>
                    <div className='max-h-[400px]  min-w-[100px] overflow-auto'>
                        {isLoading ? (
                            <div className='p-8 text-center text-gray-500'>
                                Loading requests...
                            </div>
                        ) : filteredAndSortedRequests.length === 0 ? (
                            <div className='p-8 text-center text-gray-500'>
                                {searchValue ? 'No requests match your search.' : 'No pending requests.'}
                            </div>
                        ) : (
                            <table className='w-full'>
                                <thead className='sticky top-0'>
                                    <tr>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>Name</th>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>Email</th>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>Contact No</th>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>Plan</th>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>Sent At</th>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>Status</th>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAndSortedRequests.map((request, index) => (
                                        <tr
                                            key={request.request_id || index}
                                            className='border-t border-[#0a0f33] transition-colors'
                                        >
                                            <td className='p-4 text-sm whitespace-nowrap text-center'>{request.name}</td>
                                            <td className='p-4 text-sm whitespace-nowrap text-center'>{request.email}</td>
                                            <td className='p-4 text-sm whitespace-nowrap text-center'>{request.phone_number}</td>
                                            <td className='p-4 text-sm whitespace-nowrap text-center'>{request.plan || 'N/A'}</td>
                                            <td className='p-4 text-sm whitespace-nowrap text-center'>{formatDate(request.created_at)}</td>
                                            <td className='p-4 whitespace-nowrap text-center'>{getStatusBadge(request.status)}</td>
                                            <td className='p-4'>
                                                <div className='flex justify-center gap-2'>
                                                    {request.status === 'Pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => onApprove && onApprove(request)}
                                                                className='p-2 bg-white text-[#1e255e] border border-[#1e255e] rounded-lg cursor-pointer'
                                                                title="Approve"
                                                            >
                                                                <Check size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => onReject && onReject(request)}
                                                                className='p-2 bg-white text-[#1e255e] border border-[#1e255e] rounded-lg cursor-pointer'
                                                                title="Reject"
                                                            >
                                                                <X size={16} />
                                                            </button>
                                                        </>
                                                    )}
                                                    {request.status !== 'Pending' && (
                                                        <span className='text-sm text-gray-400 italic'>Processed</span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                <div className='text-sm text-gray-500 text-center'>
                    Showing {filteredAndSortedRequests.length} of {requests.length} requests
                </div>

                <div className="flex justify-center gap-3">
                    <FormButton onClick={onClose} isPrimary>
                        CLOSE
                    </FormButton>
                </div>
            </div>
        </Popup>
    );
};

export default ViewRequestsPopup;
