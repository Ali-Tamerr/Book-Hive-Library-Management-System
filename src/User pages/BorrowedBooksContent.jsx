import React from 'react';
import CommonLayout from '../Layouts/CommonLayout';
import { useBorrowedBooks } from '../hooks/useBorrowedBooks';

function BorrowedBooksContent({ searchValue, customTitle }) {
    const { data: borrowedBooks = [], isLoading } = useBorrowedBooks();

    const filteredBooks = searchValue
        ? borrowedBooks.filter(book =>
            book.book_id?.toString().includes(searchValue) ||
            book.user_id?.toString().includes(searchValue)
        )
        : borrowedBooks;

    const columns = [
        { header: 'ID', accessor: 'transaction_id' },
        { header: 'User ID', accessor: 'user_id' },
        { header: 'Amount', accessor: 'fine_amount' },
        { header: 'Due Date', accessor: 'due_date' },
        { header: 'Date & Time', accessor: 'created_at' },
    ];

    const tableData = filteredBooks.map(book => ({
        ...book,
        created_at: book.created_at ? new Date(book.created_at).toLocaleDateString() : 'N/A',
        due_date: book.due_date ? new Date(book.due_date).toLocaleDateString() : 'N/A',
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
            title="Borrowed Books"
            buttonText=""
            columns={columns}
            formPopup={null}
            isUserPage={true}
            customTitle={customTitle}
        />
    );
}

export default BorrowedBooksContent;
