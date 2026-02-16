import React, { useState } from "react";
import { Eye } from "lucide-react";
import CommonLayout from "../Layouts/CommonLayout";
import { useReturnedBooks } from "../hooks/useReturnedBooks";
import { useBooks } from "../hooks/useBooks";
import { useBookCopies } from "../hooks/useBookCopies";
import { useCategories } from "../hooks/useCategories";
import { getCurrentUser } from "../services/auth.api";

function ReturnedBooksContent({ searchValue, customTitle }) {
  const currentUser = getCurrentUser();
  const { data: returnedBooks = [], isLoading, error } = useReturnedBooks();
  const { data: books = [] } = useBooks();
  const { data: bookCopies = [] } = useBookCopies();
  const { data: categories = [] } = useCategories();

  const getBookName = (bookCopyId) => {
    const copy = bookCopies.find((c) => c.book_copy_id === bookCopyId);
    if (copy) {
      const book = books.find((b) => b.book_id === copy.book_id);
      return book?.name || "Unknown";
    }
    return "Unknown";
  };

  const getBookCategory = (bookCopyId) => {
    const copy = bookCopies.find((c) => c.book_copy_id === bookCopyId);
    if (copy) {
      const book = books.find((b) => b.book_id === copy.book_id);
      if (book) {
        const category = categories.find(
          (c) => c.category_id === book.category_id,
        );
        return category?.category_name || "Unknown";
      }
    }
    return "Unknown";
  };

  const userReturnedBooks = returnedBooks.filter(
    (book) => String(book.user_id) === String(currentUser?.user_id),
  );

  const filteredBooks = searchValue
    ? userReturnedBooks.filter(
        (book) =>
          getBookName(book.book_id)
            ?.toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          book.transaction_id?.toString().includes(searchValue),
      )
    : userReturnedBooks;

  const columns = [
    // { header: 'ID', accessor: 'transaction_id' },
    { header: "Book Name", accessor: "book_name" },
    { header: "Category", accessor: "category" },
    { header: "Due Date", accessor: "due_date" },
    { header: "Date & Time", accessor: "created_at" },
    { header: "Action", accessor: "action" },
  ];

  const handleView = (book) => {
    console.log("View book details:", book);
  };

  const tableData = filteredBooks.map((book) => ({
    ...book,
    book_name: getBookName(book.book_id),
    category: getBookCategory(book.book_id),
    created_at: book.created_at
      ? new Date(book.created_at).toLocaleDateString()
      : "N/A",
    due_date: book.due_date
      ? new Date(book.due_date).toLocaleDateString()
      : "N/A",
    return_date: book.return_date
      ? new Date(book.return_date).toLocaleDateString()
      : "N/A",
    fine_amount: book.fine_amount ? `$${book.fine_amount}` : "N/A",
  }));

  return (
    <CommonLayout
      searchValue={searchValue}
      buttonBehaviour={() => {}}
      isLoading={isLoading}
      data={tableData}
      handleEdit={() => {}}
      handleDelete={() => {}}
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
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200"
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
