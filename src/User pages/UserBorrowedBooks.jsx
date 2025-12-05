import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import CommonLayout from '../Layouts/CommonLayout';
import { useBorrowedBooks } from '../hooks/useBorrowedBooks';

function UserBorrowedBooks() {
  const { data: borrowedBooks = [], isLoading, error } = useBorrowedBooks();
  const [searchValue, setSearchValue] = useState('');

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
    { header: 'Action', accessor: 'action' },
  ];

  const handleReturn = (book) => {
    console.log('Return book:', book);
  };

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
      customActionRenderer={(book) => (
        <button
          onClick={() => handleReturn(book)}
          className="px-4 py-2 bg-[#0a0f33] text-white rounded-lg text-sm font-medium hover:bg-[#192261] transition-all flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Return
        </button>
      )}
    />
  );
}

export default UserBorrowedBooks;
