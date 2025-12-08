import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import CommonLayout from '../Layouts/CommonLayout';
import { useBooks } from '../hooks/useBooks';
import { useCategories } from '../hooks/useCategories';

function UserBooks() {
    const { data: books = [], isLoading, error } = useBooks();
    const { data: categories = [] } = useCategories();
    const [searchValue, setSearchValue] = useState('');

    const filteredBooks = searchValue
        ? books.filter(book =>
            book.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
            book.book_id?.toString().includes(searchValue)
        )
        : books;

    const columns = [
        { header: 'ID', accessor: 'book_id' },
        { header: 'Name', accessor: 'name' },
        {
            header: 'Category',
            accessor: 'category_id',
            render: (book) => categories.find(cat => cat.category_id === book.category_id)?.category_name || 'N/A'
        },
        // { header: 'Quantity', accessor: 'quantity' },
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

    const handleBorrow = (book) => {
        console.log('Borrow book:', book);
    };

    const tableData = filteredBooks.map(book => ({
        ...book,
        // Ensure necessary fields are present or calculated if needed for custom renderers
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
            customActionRenderer={(book) => {
                const canBorrow = book.quantity >= 2;
                const buttonText = book.quantity === 0
                    ? 'Unavailable'
                    : book.quantity === 1
                        ? 'Reserved'
                        : 'Borrow';

                return (
                    <div className="flex flex-col items-center gap-1">
                        <button
                            onClick={() => handleBorrow(book)}
                            disabled={!canBorrow}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${canBorrow
                                ? 'bg-[#0a0f33] text-white hover:bg-[#192261]'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            title={!canBorrow ? 'Minimum 2 copies required for borrowing' : ''}
                        >
                            {buttonText}
                        </button>
                        {book.quantity === 1 && (
                            <span className="text-xs text-gray-500">Min. 2 required</span>
                        )}
                    </div>
                );
            }}
        />
    );
}

export default UserBooks;
