import React, { useState } from "react";
import CommonLayout from "../Layouts/CommonLayout";
import { useReturnedBooks } from "../hooks/useReturnedBooks";
import { useBooks } from "../hooks/useBooks";
import { useBookCopies } from "../hooks/useBookCopies";
import { useCategories } from "../hooks/useCategories";
import { getCurrentUser } from "../services/auth.api";

function ReturnedBooksContent({ searchValue, customTitle }) {
  const currentUser = getCurrentUser();
  const { data: returnedBooks = [], isLoading } = useReturnedBooks();
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
    { header: "Return Date", accessor: "return_date" },
    { header: "Date & Time", accessor: "created_at" },
  ];

  const tableData = filteredBooks.map((book) => ({
    ...book,
    book_name: getBookName(book.book_id),
    category: getBookCategory(book.book_id),
    created_at: book.created_at
      ? new Date(book.created_at).toLocaleDateString()
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
    />
  );
}

export default ReturnedBooksContent;
