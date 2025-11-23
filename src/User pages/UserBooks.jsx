import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import CommonLayout from '../Layouts/CommonLayout';
import { useBooks } from '../hooks/useBooks';

function UserBooks() {
    const { data: books = [], isLoading, error } = useBooks();
    const [searchValue, setSearchValue] = useState('');

    const filteredBooks = searchValue
        ? books.filter(book =>
            book.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
            book.author?.toLowerCase().includes(searchValue.toLowerCase()) ||
            book.isbn?.toLowerCase().includes(searchValue.toLowerCase())
        )
        : books;

    const columns = [
        { header: 'Title', accessor: 'title' },
        { header: 'Author', accessor: 'author' },
        { header: 'Publisher', accessor: 'publisher' },
        { header: 'Year', accessor: 'publication_year' },
        { header: 'Available', accessor: 'available_copies' },
        { header: 'Total', accessor: 'total_copies' },
        { header: 'Price', accessor: 'sale_price' },
        { header: 'Action', accessor: 'action' },
    ];

    const handleBorrow = (book) => {
        console.log('Borrow book:', book);
    };

    const tableData = filteredBooks.map(book => ({
        ...book,
        sale_price: book.sale_price ? `$${book.sale_price}` : 'N/A',
    }));

    return (
        <CommonLayout
            searchValue={searchValue}
            buttonBehaviour={() => { }}
            isLoading={isLoading}
            data={tableData}
            handleEdit={(book) => handleBorrow(book)}
            handleDelete={() => { }}
            title="Available Books"
            buttonText=""
            columns={columns}
            formPopup={null}
            isUserPage={true}
            customActionRenderer={(book) => (
                <button
                    onClick={() => handleBorrow(book)}
                    disabled={book.available_copies === 0}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${book.available_copies > 0
                        ? 'bg-[#0a0f33] text-white hover:bg-[#192261]'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    {book.available_copies > 0 ? 'Borrow' : 'Unavailable'}
                </button>
            )}
        />
    );
}

export default UserBooks;
