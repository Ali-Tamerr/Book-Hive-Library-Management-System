import React from 'react';
import CommonLayout from '../Layouts/CommonLayout';
import { useReturnedBooks } from '../hooks/useReturnedBooks';

function ReturnedBooksContent({ searchValue, customTitle }) {
    const { data: returnedBooks = [], isLoading } = useReturnedBooks();

    const filteredBooks = searchValue
        ? returnedBooks.filter(book =>
            book.book_id?.toString().includes(searchValue) ||
            book.user_id?.toString().includes(searchValue)
        )
        : returnedBooks;

    const columns = [
        { header: 'ID', accessor: 'transaction_id' },
        { header: 'User ID', accessor: 'user_id' },
        { header: 'Amount', accessor: 'fine_amount' },
        { header: 'Due Date', accessor: 'due_date' },
        { header: 'Date & Time', accessor: 'created_at' },
        { header: 'Return Date', accessor: 'return_date' },
    ];

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
            title="Returned Books"
            buttonText=""
            columns={columns}
            formPopup={null}
            isUserPage={true}
            customTitle={customTitle}
        />
    );
}

export default ReturnedBooksContent;
