import React, { useState, useMemo } from 'react';
import Popup from './Popup.jsx';
import FormButton from './FormButton.jsx';
import TabButton from './TabButton.jsx';
import { Users, Search, Check, X, BookOpen, RotateCcw } from 'lucide-react';

const EXPIRATION_DAYS = 7;

const ViewRequestsPopup = ({
    show,
    onClose,
    requests = [],
    onApprove,
    onReject,
    isLoading = false,
    bookRequests = [],
    onApproveBook,
    onRejectBook,
    isLoadingBooks = false,
    returnRequests = [],
    onApproveReturn,
    onRejectReturn,
    isLoadingReturns = false,
    users = [],
    books = [],
    bookCopies = []
}) => {
    const [searchValue, setSearchValue] = useState('');
    const [showRejected, setShowRejected] = useState(false);
    const [activeTab, setActiveTab] = useState('users');

    const isExpired = (createdAt) => {
        if (!createdAt) return false;
        const createdDate = new Date(createdAt);
        const expirationDate = new Date(createdDate.getTime() + EXPIRATION_DAYS * 24 * 60 * 60 * 1000);
        return new Date() > expirationDate;
    };

    const getDaysRemaining = (createdAt) => {
        if (!createdAt) return 0;
        const createdDate = new Date(createdAt);
        const expirationDate = new Date(createdDate.getTime() + EXPIRATION_DAYS * 24 * 60 * 60 * 1000);
        const remaining = Math.ceil((expirationDate - new Date()) / (24 * 60 * 60 * 1000));
        return Math.max(0, remaining);
    };

    const filteredUserRequests = useMemo(() => {
        let filtered = requests.filter(request => {
            if (showRejected) {
                return request.status === 'Rejected';
            } else {
                if (request.status === 'Rejected') return false;
                if (request.status === 'Pending' && isExpired(request.created_at)) return false;
                return true;
            }
        });

        if (searchValue.trim()) {
            const searchLower = searchValue.toLowerCase();
            filtered = filtered.filter(
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
    }, [requests, searchValue, showRejected]);

    const filteredBookRequests = useMemo(() => {
        let filtered = bookRequests.filter(request => {
            if (showRejected) {
                return request.status === 'Rejected';
            } else {
                return request.status === 'Pending';
            }
        });

        if (searchValue.trim()) {
            const searchLower = searchValue.toLowerCase();
            filtered = filtered.filter((request) => {
                const user = users.find(u => u.user_id === request.user_id);
                const bookCopy = bookCopies.find(bc => bc.book_copy_id === request.book_id);
                const book = bookCopy ? books.find(b => b.book_id === bookCopy.book_id) : null;
                const userName = user?.name?.toLowerCase() || '';
                const bookName = book?.name?.toLowerCase() || '';
                return userName.includes(searchLower) || bookName.includes(searchLower);
            });
        }

        return [...filtered].sort((a, b) => {
            const dateA = new Date(a.created_at || 0);
            const dateB = new Date(b.created_at || 0);
            return dateB - dateA;
        });
    }, [bookRequests, searchValue, showRejected, users, books, bookCopies]);

    const filteredReturnRequests = useMemo(() => {
        let filtered = returnRequests.filter(request => {
            return request.status === 'Pending';
        });

        if (searchValue.trim()) {
            const searchLower = searchValue.toLowerCase();
            filtered = filtered.filter((request) => {
                const user = users.find(u => u.user_id === request.user_id);
                const bookCopy = bookCopies.find(bc => bc.book_copy_id === request.book_id);
                const book = bookCopy ? books.find(b => b.book_id === bookCopy.book_id) : null;
                const userName = user?.name?.toLowerCase() || '';
                const bookName = book?.name?.toLowerCase() || '';
                return userName.includes(searchLower) || bookName.includes(searchLower);
            });
        }

        return [...filtered].sort((a, b) => {
            const dateA = new Date(a.created_at || 0);
            const dateB = new Date(b.created_at || 0);
            return dateB - dateA;
        });
    }, [returnRequests, searchValue, users, books, bookCopies]);

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

    const formatDateShort = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getUserStatusBadge = (request) => {
        if (request.status === 'Pending') {
            const daysLeft = getDaysRemaining(request.created_at);
            if (daysLeft <= 0) {
                return <span className="text-xs font-medium text-red-500">Expired</span>;
            }
            return (
                <span className="text-xs font-medium">
                    Pending ({daysLeft}d left)
                </span>
            );
        }
        return (
            <span className="text-xs font-medium">
                {request.status || 'Pending'}
            </span>
        );
    };

    const getBookStatusBadge = (request) => {
        if (request.status === 'Rejected' && showRejected) {
            const daysLeft = getDaysRemaining(request.created_at);
            if (daysLeft <= 0) {
                return <span className="text-xs font-medium text-red-500">Expired</span>;
            }
            return (
                <span className="text-xs font-medium text-red-500">
                    Rejected ({daysLeft}d left)
                </span>
            );
        }
        return (
            <span className="text-xs font-medium">
                {request.status || 'Pending'}
            </span>
        ); 
        
    };

    const getUserName = (userId) => {
        const user = users.find(u => u.user_id === userId);
        return user?.name || userId || 'Unknown';
    };

    const getBookName = (bookCopyId) => {
        const bookCopy = bookCopies.find(bc => bc.book_copy_id === bookCopyId);
        if (!bookCopy) return bookCopyId || 'Unknown';
        const book = books.find(b => b.book_id === bookCopy.book_id);
        return book?.name || bookCopyId || 'Unknown';
    };

    const getCurrentData = () => {
        if (activeTab === 'users') return filteredUserRequests;
        if (activeTab === 'books') return filteredBookRequests;
        if (activeTab === 'returns') return filteredReturnRequests;
        return [];
    };

    const getTotalData = () => {
        if (activeTab === 'users') return requests;
        if (activeTab === 'books') return bookRequests;
        if (activeTab === 'returns') return returnRequests;
        return [];
    };

    const getCurrentLoading = () => {
        if (activeTab === 'users') return isLoading;
        if (activeTab === 'books') return isLoadingBooks;
        if (activeTab === 'returns') return isLoadingReturns;
        return false;
    };

    const getTabIcon = () => {
        if (activeTab === 'users') return <Users size={30} />;
        if (activeTab === 'books') return <BookOpen size={30} />;
        if (activeTab === 'returns') return <RotateCcw size={30} />;
        return <Users size={30} />;
    };

    const getSearchPlaceholder = () => {
        if (activeTab === 'users') return "Search by name or email...";
        return "Search by user or book name...";
    };

    const currentData = getCurrentData();
    const totalData = getTotalData();
    const currentLoading = getCurrentLoading();

    return (
        <Popup
            show={show}
            onClose={onClose}
            title="Requests"
            icon={getTabIcon()}
            maxWidthClass="max-w-[1100px] max-[856px]:scale-80"
            heightClass="h-[90vh]"
        >
            <div className='flex flex-col gap-4 h-full'>
                <div className="flex gap-0">
                    <TabButton
                        label="User Requests"
                        isActive={activeTab === 'users'}
                        onClick={() => { setActiveTab('users'); setShowRejected(false); }}
                        position="first"
                    />
                    <TabButton
                        label="Borrow Requests"
                        isActive={activeTab === 'books'}
                        onClick={() => { setActiveTab('books'); setShowRejected(false); }}
                        position="middle"
                    />
                    <TabButton
                        label="Return Requests"
                        isActive={activeTab === 'returns'}
                        onClick={() => { setActiveTab('returns'); setShowRejected(false); }}
                        position="last"
                    />
                </div>

                <div className='flex gap-3 items-center'>
                    <div className='relative flex-1'>
                        <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                        <input
                            type="text"
                            placeholder={getSearchPlaceholder()}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="w-full h-[50px] pl-12 pr-4 py-3 rounded-xl border border-[#3D3E3E] outline-none focus:border-[#1e255e] text-[13px]"
                        />
                    </div>
                    {activeTab !== 'returns' && (
                        <button
                            onClick={() => setShowRejected(!showRejected)}
                            className="bg-[#0b0b3b] cursor-pointer h-[50px] px-6 text-white rounded-xl hover:bg-[#1a1a6a] transition-colors text-sm font-medium whitespace-nowrap"
                        >
                            {showRejected ? 'Pending Requests' : 'Rejected Requests'}
                        </button>
                    )}
                </div>

                <div className='border border-[#8787A3] rounded-[10px] overflow-hidden flex-1 flex flex-col'>
                    <div className='flex-1 min-w-[100px] overflow-auto'>
                        {currentLoading ? (
                            <div className='p-8 text-center text-gray-500 dark:text-[#0a0f33]'>
                                Loading requests...
                            </div>
                        ) : currentData.length === 0 ? (
                            <div className='p-8 text-center text-gray-500 dark:text-[#0a0f33]'>
                                {searchValue
                                    ? 'No requests match your search.'
                                    : showRejected
                                        ? 'No rejected requests.'
                                        : 'No pending requests.'}
                            </div>
                        ) : activeTab === 'users' ? (
                            <table className='w-full'>
                                <thead className='sticky top-0 bg-white'>
                                    <tr>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>Name</th>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>Email</th>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>Contact No</th>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>Plan</th>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>Sent At</th>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>Status</th>
                                        {!showRejected && (
                                            <th className='p-4 text-center text-sm font-semibold text-[#333]'>Actions</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className='border-t border-[#0a0f33]'>
                                    {filteredUserRequests.map((request, index) => (
                                        <tr key={request.request_id || index}>
                                            <td className='p-4 dark:text-[#0a0f33] text-sm whitespace-nowrap text-center'>{request.name}</td>
                                            <td className='p-4 dark:text-[#0a0f33] text-sm whitespace-nowrap text-center'>{request.email}</td>
                                            <td className='p-4 dark:text-[#0a0f33] text-sm whitespace-nowrap text-center'>{request.phone_number}</td>
                                            <td className='p-4 dark:text-[#0a0f33] text-sm whitespace-nowrap text-center'>{request.plan || 'N/A'}</td>
                                            <td className='p-4 dark:text-[#0a0f33] text-sm whitespace-nowrap text-center'>{formatDate(request.created_at)}</td>
                                            <td className='p-4 dark:text-[#0a0f33] whitespace-nowrap text-center'>{getUserStatusBadge(request)}</td>
                                            {!showRejected && (
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
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : activeTab === 'books' ? (
                            <table className='w-full'>
                                <thead className='sticky top-0 bg-white'>
                                    <tr>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>User Name</th>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>Book Name</th>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>Due Date</th>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>Requested At</th>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>Status</th>
                                        {!showRejected && (
                                            <th className='p-4 text-center text-sm font-semibold text-[#333]'>Actions</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className='border-t border-[#0a0f33]'>
                                    {filteredBookRequests.map((request, index) => (
                                        <tr key={request.transaction_id || index}>
                                            <td className='p-4 dark:text-[#0a0f33] text-sm whitespace-nowrap text-center'>{getUserName(request.user_id)}</td>
                                            <td className='p-4 dark:text-[#0a0f33] text-sm whitespace-nowrap text-center'>{getBookName(request.book_id)}</td>
                                            <td className='p-4 dark:text-[#0a0f33] text-sm whitespace-nowrap text-center'>{formatDateShort(request.due_date)}</td>
                                            <td className='p-4 dark:text-[#0a0f33] text-sm whitespace-nowrap text-center'>{formatDate(request.created_at)}</td>
                                            <td className='p-4 dark:text-[#0a0f33] whitespace-nowrap text-center'>{getBookStatusBadge(request)}</td>
                                            {!showRejected && (
                                                <td className='p-4'>
                                                    <div className='flex justify-center gap-2'>
                                                        {request.status === 'Pending' && (
                                                            <>
                                                                <button
                                                                    onClick={() => onApproveBook && onApproveBook(request)}
                                                                    className='p-2 bg-white text-[#1e255e] border border-[#1e255e] rounded-lg cursor-pointer'
                                                                    title="Approve"
                                                                >
                                                                    <Check size={16} />
                                                                </button>
                                                                <button
                                                                    onClick={() => onRejectBook && onRejectBook(request)}
                                                                    className='p-2 bg-white text-[#1e255e] border border-[#1e255e] rounded-lg cursor-pointer'
                                                                    title="Reject"
                                                                >
                                                                    <X size={16} />
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <table className='w-full'>
                                <thead className='sticky top-0 bg-white'>
                                    <tr>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>User Name</th>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>Book Name</th>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>Requested At</th>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>Status</th>
                                        <th className='p-4 text-center text-sm font-semibold text-[#333]'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='border-t border-[#0a0f33]'>
                                    {filteredReturnRequests.map((request, index) => (
                                        <tr key={request.transaction_id || index}>
                                            <td className='p-4 dark:text-[#0a0f33] text-sm whitespace-nowrap text-center'>{getUserName(request.user_id)}</td>
                                            <td className='p-4 dark:text-[#0a0f33] text-sm whitespace-nowrap text-center'>{getBookName(request.book_id)}</td>
                                            <td className='p-4 dark:text-[#0a0f33] text-sm whitespace-nowrap text-center'>{formatDate(request.created_at)}</td>
                                            <td className='p-4 dark:text-[#0a0f33] whitespace-nowrap text-center'>
                                                <span className="text-xs font-medium text-yellow-600">Pending Return</span>
                                            </td>
                                            <td className='p-4'>
                                                <div className='flex justify-center gap-2'>
                                                    <button
                                                        onClick={() => onApproveReturn && onApproveReturn(request)}
                                                        className='p-2 bg-white text-[#1e255e] border border-[#1e255e] rounded-lg cursor-pointer'
                                                        title="Approve Return"
                                                    >
                                                        <Check size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => onRejectReturn && onRejectReturn(request)}
                                                        className='p-2 bg-white text-[#1e255e] border border-[#1e255e] rounded-lg cursor-pointer'
                                                        title="Reject Return"
                                                    >
                                                        <X size={16} />
                                                    </button>
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
                    <div>Showing {currentData.length} of {totalData.length} requests</div>
                    {activeTab === 'users' && !showRejected && (
                        <div className='text-xs mt-1'>Request expiration = {EXPIRATION_DAYS} days</div>
                    )}
                    {activeTab === 'books' && showRejected && (
                        <div className='text-xs mt-1'>Rejected request expiration = {EXPIRATION_DAYS} days</div>
                    )}
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
