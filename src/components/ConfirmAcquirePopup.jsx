import React from 'react';
import Popup from './Popup.jsx';
import FormButton from './FormButton.jsx';
import { ShoppingCart, Trash2 } from 'lucide-react';

function ConfirmAcquirePopup({ show, onClose, selectedBooks, onRemoveBook, onConfirm, isLoading, categories }) {
    if (!show) return null;

    const getCategoryName = (categoryId) => {
        return categories?.find(cat => cat.category_id === categoryId)?.category_name || 'N/A';
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, ' - ');
    };

    const totalBooks = selectedBooks.length;

    const latestDueDate = selectedBooks.reduce((latest, book) => {
        if (!book.borrowDetails?.dueDate) return latest;
        const bookDate = new Date(book.borrowDetails.dueDate);
        return bookDate > latest ? bookDate : latest;
    }, new Date());

    return (
        <Popup
            show={show}
            onClose={onClose}
            title="Confirm Acquisition"
            icon={<ShoppingCart size={24} />}
            maxWidthClass="max-w-[700px]"
        >
            <div className="flex flex-col gap-6">
                <div className="max-h-[300px] overflow-y-auto">
                    <table className="w-full border-collapse text-left text-sm">
                        <thead className="sticky top-0 bg-white">
                            <tr className="border-b border-gray-300">
                                <th className="p-3 font-semibold text-[#0a0f33]">Name</th>
                                <th className="p-3 font-semibold text-[#0a0f33]">Category</th>
                                <th className="p-3 font-semibold text-[#0a0f33]">Due Date</th>
                                <th className="p-3 font-semibold text-[#0a0f33] text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedBooks.map((book) => (
                                <tr key={book.book_id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-3 text-[#0a0f33]">{book.name}</td>
                                    <td className="p-3 text-gray-600">{getCategoryName(book.category_id)}</td>
                                    <td className="p-3 text-gray-600">{formatDate(book.borrowDetails?.dueDate)}</td>
                                    <td className="p-3 text-center">
                                        <button
                                            type="button"
                                            onClick={() => onRemoveBook(book.book_id)}
                                            className="text-[#0a0f33] hover:text-red-600 transition-colors cursor-pointer p-2"
                                            title="Remove from selection"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedBooks.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No books selected. Please go back and select books to borrow.
                    </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-4 bg-[#f5f5f5] px-4 py-3 rounded-lg">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500">Total Books</span>
                            <span className="text-lg font-bold text-[#0a0f33]">{totalBooks.toString().padStart(2, '0')} {totalBooks === 1 ? 'Book' : 'Books'}</span>
                        </div>
                        <div className="w-px h-10 bg-gray-300"></div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500">Latest Due Date</span>
                            <span className="text-lg font-bold text-[#0a0f33]">{formatDate(latestDueDate.toISOString())}</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <FormButton type="button" onClick={onClose}>
                            CANCEL
                        </FormButton>
                        <FormButton
                            type="button"
                            isPrimary
                            onClick={onConfirm}
                            disabled={isLoading || selectedBooks.length === 0}
                        >
                            {isLoading ? 'PROCESSING...' : 'CONFIRM'}
                        </FormButton>
                    </div>
                </div>
            </div>
        </Popup>
    );
}

export default ConfirmAcquirePopup;
