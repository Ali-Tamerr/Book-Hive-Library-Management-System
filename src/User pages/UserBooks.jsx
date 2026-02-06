import React, { useState, useEffect } from 'react';
import { BookOpen, ShoppingCart, X, BookMarked, ReceiptText } from 'lucide-react';
import CommonLayout from '../Layouts/CommonLayout';
import { useBooks } from '../hooks/useBooks';
import { useCategories } from '../hooks/useCategories';
import { useBookCopies } from '../hooks/useBookCopies';
import { useBranches } from '../hooks/useBranches';
import { useCreateBorrowedBook } from '../hooks/useBorrowedBooks';
import { getCurrentUser } from '../services/auth.api';
import BorrowBookPopup from '../components/BorrowBookPopup';
import ConfirmAcquirePopup from '../components/ConfirmAcquirePopup';
import BookDetailsPopup from '../components/BookDetailsPopup';
import StatusMessage from '../components/StatusMessage';

function UserBooks() {
    const currentUser = getCurrentUser();
    const { data: books = [], isLoading, error } = useBooks();
    const { data: categories = [] } = useCategories();
    const { data: bookCopies = [] } = useBookCopies();
    const { data: branches = [] } = useBranches();
    const createBorrowedBookMutation = useCreateBorrowedBook();
    const [searchValue, setSearchValue] = useState('');
    const [borrowingBookId, setBorrowingBookId] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [showBorrowPopup, setShowBorrowPopup] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedBooks, setSelectedBooks] = useState({});
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showViewDetails, setShowViewDetails] = useState(false);
    const [viewBook, setViewBook] = useState(null);

    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => {
                setMessage({ text: '', type: '' });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const filteredBooks = searchValue
        ? books.filter(book =>
            book.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
            book.book_id?.toString().includes(searchValue)
        )
        : books;

    const columns = [
        { header: 'Name', accessor: 'name' },
        {
            header: 'Category',
            accessor: 'category_id',
            render: (book) => categories.find(cat => cat.category_id === book.category_id)?.category_name || 'N/A'
        },
        {
            header: 'Availability',
            accessor: 'availability',
            render: (book) => (
                <span className={`px-3 py-1 rounded-full text-sm font-medium text-black`}>
                    {book.quantity > 0 ? 'Available' : 'Borrowed'}
                </span>
            )
        },
        { header: 'Action', accessor: 'action' },
    ];

    const handleAcquireSelectedClick = () => {
        if (!currentUser) {
            setMessage({ text: 'Please log in to borrow books.', type: 'error' });
            return;
        }

        if (selectionMode) {
            const selectedList = Object.values(selectedBooks);
            if (selectedList.length === 0) {
                setMessage({ text: 'Please select at least one book to borrow.', type: 'error' });
                return;
            }
            setShowConfirmPopup(true);
        } else {
            setSelectionMode(true);
        }
    };

    const handleCancelSelection = () => {
        setSelectionMode(false);
        setSelectedBooks({});
    };

    const handleBorrowClick = (book) => {
        if (!currentUser) {
            setMessage({ text: 'Please log in to borrow books.', type: 'error' });
            return;
        }

        const availableCopies = bookCopies.filter(copy => copy.book_id === book.book_id);
        if (availableCopies.length === 0) {
            setMessage({ text: 'No copies available for this book.', type: 'error' });
            return;
        }

        setSelectedBook(book);
        setShowBorrowPopup(true);
    };

    const handleConfirmBorrowForSelection = ({ quantity, dueDate }) => {
        if (!selectedBook) return;

        setSelectedBooks(prev => ({
            ...prev,
            [selectedBook.book_id]: {
                ...selectedBook,
                borrowDetails: { quantity, dueDate }
            }
        }));

        setShowBorrowPopup(false);
        setSelectedBook(null);
        setMessage({ text: `"${selectedBook.name}" added to selection!`, type: 'success' });
    };

    const handleConfirmBorrowDirect = async ({ dueDate }) => {
        if (!selectedBook || !currentUser) return;

        const availableCopies = bookCopies.filter(copy => copy.book_id === selectedBook.book_id);

        if (availableCopies.length === 0) {
            setMessage({ text: 'No copies available.', type: 'error' });
            setShowBorrowPopup(false);
            return;
        }

        setBorrowingBookId(selectedBook.book_id);

        try {
            const bookCopyId = availableCopies[0].book_copy_id;
            await createBorrowedBookMutation.mutateAsync({
                user_id: currentUser.user_id,
                book_id: bookCopyId,
                transaction_type: 'Check-Out',
                borrow_type: 'Borrow',
                due_date: dueDate,
                status: 'Pending'
            });
            setMessage({ text: `Successfully borrowed "${selectedBook.name}"!`, type: 'success' });
            setShowBorrowPopup(false);
            setSelectedBook(null);
        } catch (error) {
            console.error('Failed to borrow book:', error);
            setMessage({ text: `Failed to borrow: ${error.message || 'Please try again.'}`, type: 'error' });
        } finally {
            setBorrowingBookId(null);
        }
    };

    const handleToggleBookSelection = (book) => {
        setSelectedBooks(prev => {
            const newSelection = { ...prev };
            if (newSelection[book.book_id]) {
                delete newSelection[book.book_id];
            }
            return newSelection;
        });
    };

    const handleRemoveFromConfirmation = (bookId) => {
        setSelectedBooks(prev => {
            const newSelection = { ...prev };
            delete newSelection[bookId];
            return newSelection;
        });
    };

    const handleFinalConfirm = async () => {
        if (!currentUser) return;

        const selectedList = Object.values(selectedBooks);
        if (selectedList.length === 0) {
            setMessage({ text: 'No books selected.', type: 'error' });
            return;
        }

        setIsProcessing(true);

        try {
            for (const book of selectedList) {
                const availableCopies = bookCopies.filter(copy => copy.book_id === book.book_id);
                const dueDate = book.borrowDetails?.dueDate;

                if (availableCopies.length > 0) {
                    const bookCopyId = availableCopies[0].book_copy_id;
                    await createBorrowedBookMutation.mutateAsync({
                        user_id: currentUser.user_id,
                        book_id: bookCopyId,
                        transaction_type: 'Check-Out',
                        borrow_type: 'Borrow',
                        due_date: dueDate,
                        status: 'Pending'
                    });
                }
            }

            const totalBooks = selectedList.length;
            setMessage({ text: `Successfully borrowed ${totalBooks} book(s)!`, type: 'success' });
            setShowConfirmPopup(false);
            setSelectedBooks({});
            setSelectionMode(false);
        } catch (error) {
            console.error('Failed to complete borrowing:', error);
            setMessage({ text: `Failed to complete borrowing: ${error.message || 'Please try again.'}`, type: 'error' });
        } finally {
            setIsProcessing(false);
        }
    };

    const tableData = filteredBooks.map(book => ({
        ...book,
    }));

    const selectedCount = Object.keys(selectedBooks).length;

    const customTitle = (
        <div className="flex items-center gap-4">
            <h2 className="text-xl max-[856px]:text-sm font-semibold whitespace-nowrap">Available Books</h2>
            <StatusMessage message={message.text} type={message.type} />
        </div>
    );

    const secondaryButton = (
        <div className="flex gap-2">
            {selectionMode && (
                <button
                    onClick={handleCancelSelection}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer font-medium"
                >
                    Cancel
                </button>
            )}
            <button
                onClick={handleAcquireSelectedClick}
                className={`flex items-center whitespace-nowrap gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer font-medium ${selectionMode && selectedCount === 0
                    ? 'bg-gray-300 text-gray-500'
                    : 'bg-[#0a0f33] text-white hover:bg-[#192261]'
                    }`}
            >
                <ShoppingCart size={18} />
                <span>Acquire Selected{selectedCount > 0 ? ` (${selectedCount})` : ''}</span>
            </button>
        </div>
    );

    return (
        <>
            <CommonLayout
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                buttonBehaviour={() => { }}
                isLoading={isLoading}
                data={tableData}
                handleEdit={(book) => handleBorrowClick(book)}
                handleDelete={() => { }}
                title="Available Books"
                buttonText=""
                columns={columns}
                formPopup={null}
                isUserPage={true}
                customTitle={customTitle}
                secondaryButton={secondaryButton}
                customActionRenderer={(book) => {
                    const canBorrow = book.quantity >= 2;
                    const isBorrowing = borrowingBookId === book.book_id;
                    const isSelected = !!selectedBooks[book.book_id];

                    if (selectionMode) {
                        return (
                            <div className="flex items-center justify-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => handleToggleBookSelection(book)}
                                    className="w-5 h-5 accent-[#0a0f33] cursor-pointer"
                                />
                                <button
                                    onClick={() => handleBorrowClick(book)}
                                    disabled={!canBorrow}
                                    className={`p-2 rounded-lg transition-all ${canBorrow
                                        ? 'text-[#0a0f33] hover:bg-gray-100 cursor-pointer'
                                        : 'text-gray-300 cursor-not-allowed'
                                        }`}
                                    title={!canBorrow ? 'Not available' : 'Configure borrow details'}
                                >
                                    <BookMarked size={20} />
                                </button>
                            </div>
                        );
                    }

                    return (
                        <button
                            onClick={() => {
                                setViewBook(book);
                                setShowViewDetails(true);
                            }}
                            className="p-2 rounded-lg transition-all text-[#0a0f33] dark:text-white hover:bg-gray-100 cursor-pointer"
                            title="View book details"
                        >
                            <ReceiptText size={20} />
                        </button>
                    );
                }}
            />
            <BorrowBookPopup
                show={showBorrowPopup}
                onClose={() => {
                    setShowBorrowPopup(false);
                    setSelectedBook(null);
                }}
                book={selectedBook}
                onConfirm={selectionMode ? handleConfirmBorrowForSelection : handleConfirmBorrowDirect}
                isLoading={borrowingBookId !== null}
            />
            <ConfirmAcquirePopup
                show={showConfirmPopup}
                onClose={() => setShowConfirmPopup(false)}
                selectedBooks={Object.values(selectedBooks)}
                onRemoveBook={handleRemoveFromConfirmation}
                onConfirm={handleFinalConfirm}
                isLoading={isProcessing}
                categories={categories}
            />
            <BookDetailsPopup
                show={showViewDetails}
                onClose={() => {
                    setShowViewDetails(false);
                    setViewBook(null);
                }}
                book={viewBook}
                category={viewBook ? categories.find(cat => cat.category_id === viewBook.category_id)?.category_name : null}
                onBookNow={() => {
                    setShowViewDetails(false);
                    handleAcquireSelectedClick();
                }}
            />
        </>
    );
}

export default UserBooks;
