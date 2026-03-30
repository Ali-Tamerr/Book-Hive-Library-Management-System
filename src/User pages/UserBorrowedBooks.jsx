import React from "react";
import CommonLayout from "../Layouts/CommonLayout";
import { useBorrowedBooks } from "../hooks/useBorrowedBooks";
import { useBooks } from "../hooks/useBooks";
import { useBookCopies } from "../hooks/useBookCopies";
import { useCategories } from "../hooks/useCategories";
import { getCurrentUser } from "../services/auth.api";

function BorrowedBooksContent({ searchValue, customTitle }) {
  const currentUser = getCurrentUser();
  const { data: borrowedBooks = [], isLoading } = useBorrowedBooks();
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

  const userBorrowedBooks = borrowedBooks.filter(
    (book) =>
      String(book.user_id) === String(currentUser?.user_id) &&
      book.status === "Completed" &&
      !book.return_date,
  );

  const filteredBooks = searchValue
    ? userBorrowedBooks.filter(
        (book) =>
          getBookName(book.book_id)
            ?.toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          book.transaction_id?.toString().includes(searchValue),
      )
    : userBorrowedBooks;

  const columns = [
    // { header: 'ID', accessor: 'transaction_id' },
    { header: "Book Name", accessor: "book_name" },
    { header: "Category", accessor: "category" },
    { header: "Due Date", accessor: "due_date" },
    { header: "Date & Time", accessor: "created_at" },
    // { header: "Action", accessor: "action" },
  ];

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
    fine_amount: book.fine_amount ? `$${book.fine_amount}` : "N/A",
  }));

  const titleNode =
    customTitle || (
      <h2 className="whitespace-nowrap text-xl font-semibold max-[53.5rem]:text-sm">
        My Borrowed Books
      </h2>
    );

  return (
    <CommonLayout
      searchValue={searchValue}
      buttonBehaviour={() => {}}
      isLoading={isLoading}
      data={tableData}
      handleEdit={() => {}}
      handleDelete={() => {}}
      title="My Borrowed Books"
      buttonText=""
      columns={columns}
      formPopup={null}
      isUserPage={true}
      customTitle={titleNode}
    />
  );
}

export default BorrowedBooksContent;
