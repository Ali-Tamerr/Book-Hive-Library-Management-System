import React, { useState, useEffect } from 'react';
import Popup from './Popup.jsx';
import FormButton from './FormButton.jsx';
import { BookOpen, Calendar } from 'lucide-react';

function BorrowBookPopup({ show, onClose, book, onConfirm, isLoading }) {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 14);

    const formatDateForInput = (date) => {
        return date.toISOString().split('T')[0];
    };

    const [dueDate, setDueDate] = useState(formatDateForInput(maxDate));

    useEffect(() => {
        if (show) {
            setDueDate(formatDateForInput(maxDate));
        }
    }, [show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!book) return;

        const selectedDate = new Date(dueDate);
        const daysDiff = Math.ceil((selectedDate - today) / (1000 * 60 * 60 * 24));

        if (daysDiff > 14) {
            alert('Maximum borrow duration is 14 days.');
            return;
        }

        if (daysDiff < 1) {
            alert('Due date must be at least 1 day from today.');
            return;
        }

        onConfirm({
            quantity: 1,
            dueDate: selectedDate.toISOString()
        });
    };

    if (!book) return null;

    return (
        <Popup
            show={show}
            onClose={onClose}
            title="Borrow Book"
            icon={<BookOpen size={24} />}
            maxWidthClass="max-w-[500px]"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="bg-[#f5f5f5] p-4 rounded-lg">
                    <p className="text-lg font-semibold text-[#0a0f33]">{book.name}</p>
                    <p className="text-sm text-gray-600">Available copies: {book.quantity}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-[#0a0f33]">
                        <Calendar size={16} />
                        Return By (Due Date)
                    </label>
                    <input
                        type="date"
                        value={dueDate}
                        min={formatDateForInput(new Date(today.getTime() + 24 * 60 * 60 * 1000))}
                        max={formatDateForInput(maxDate)}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full h-12 px-4 border border-[#3D3E3E] rounded-lg text-sm outline-none focus:border-[#1e255e]"
                    />
                    <p className="text-xs text-gray-500">Maximum borrow duration: 14 days from today</p>
                </div>

                <div className="flex w-full items-center justify-end gap-3 pt-4 border-t border-gray-200">
                    <FormButton type="button" onClick={onClose}>
                        Cancel
                    </FormButton>
                    <FormButton type="submit" isPrimary disabled={isLoading}>
                        {isLoading ? 'Borrowing...' : 'Confirm Borrow'}
                    </FormButton>
                </div>
            </form>
        </Popup>
    );
}

export default BorrowBookPopup;
