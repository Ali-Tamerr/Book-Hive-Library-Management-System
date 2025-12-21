import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import CommonLayout from '../Layouts/CommonLayout';
import { useReturnedBooks } from '../hooks/useReturnedBooks';
import { getCurrentUser } from '../services/auth.api';

function ReturnedBooksContent({ searchValue, customTitle }) {
    const currentUser = getCurrentUser();
    const { data: returnedBooks = [], isLoading, error } = useReturnedBooks();

    const userReturnedBooks = returnedBooks.filter(
        book => String(book.user_id) === String(currentUser?.user_id)
    );

    const filteredBooks = searchValue
        ? userReturnedBooks.filter(book =>
            book.book_id?.toString().includes(searchValue) ||
            book.transaction_id?.toString().includes(searchValue)
        )
        : userReturnedBooks;

    const columns = [
        { header: 'ID', accessor: 'transaction_id' },
        { header: 'Book ID', accessor: 'book_id' },
        { header: 'Amount', accessor: 'fine_amount' },
        { header: 'Due Date', accessor: 'due_date' },
        { header: 'Date & Time', accessor: 'created_at' },
        { header: 'Return Date', accessor: 'return_date' },
        { header: 'Action', accessor: 'action' },
    ];

    const handleView = (book) => {
        console.log('View book details:', book);
    };

    const tableData = filteredBooks.map(book => ({
        ...book,
        created_at: book.created_at ? new Date(book.created_at).toLocaleDateString() : 'N/A',
        due_date: book.due_date ? new Date(book.due_date).toLocaleDateString() : 'N/A',
        return_date: book.return_date ? new Date(book.return_date).toLocaleDateString() : 'N/A',
        fine_amount: book.fine_amount ? `$${book.fine_amount}` : 'N/A',
    }));

    return (
        <CommonLayout
            searchValue={searchValue}
            buttonBehaviour={() => { }}
            isLoading={isLoading}
            data={tableData}
            handleEdit={() => { }}
            handleDelete={() => { }}
            title="My Returned Books"
            buttonText=""
            columns={columns}
            formPopup={null}
            isUserPage={true}
            customTitle={customTitle}
            customActionRenderer={(book) => (
                <div className="flex justify-center">
                    <button
                        onClick={() => handleView(book)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all flex items-center gap-2 cursor-pointer"
                    >
                        <Eye size={16} />
                        View
                    </button>
                </div>
            )}
        />
    );
}

export default ReturnedBooksContent;
