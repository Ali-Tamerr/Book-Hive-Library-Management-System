import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import CommonLayout from "../Layouts/CommonLayout";
import { useBorrowedBooks } from "../hooks/useBorrowedBooks";
import { useBooks } from "../hooks/useBooks";
import { useBookCopies } from "../hooks/useBookCopies";
import { useCategories } from "../hooks/useCategories";
import {
  useBookTransactions,
  useCreateBookTransaction,
  useReturnBookTransaction,
} from "../hooks/useBookTransactions";
import { getCurrentUser } from "../services/auth.api";
import StatusMessage from "../components/StatusMessage";

function BorrowedBooksContent({ searchValue, customTitle }) {
  const currentUser = getCurrentUser();
  const { data: borrowedBooks = [], isLoading, error } = useBorrowedBooks();
  const { data: allTransactions = [] } = useBookTransactions();
  const { data: books = [] } = useBooks();
  const { data: bookCopies = [] } = useBookCopies();
  const { data: categories = [] } = useCategories();
  const createTransactionMutation = useCreateBookTransaction();
  const returnTransactionMutation = useReturnBookTransaction();
  const [pendingReturns, setPendingReturns] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

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

  const hasPendingReturnRequest = (bookId, userId) => {
    return allTransactions.some(
      (t) =>
        t.book_id === bookId &&
        t.user_id === userId &&
        t.transaction_type === "Check-In" &&
        t.status === "Pending",
    );
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

  const handleReturn = async (book) => {
    // If we want to prevent returning if already requested (though instant return overrides this)
    // if (hasPendingReturnRequest(book.book_id, currentUser?.user_id)) {
    //   setMessage({ text: 'You already have a pending return request for this book.', type: 'error' });
    //   return;
    // }

    try {
      // Use the new return endpoint
      await returnTransactionMutation.mutateAsync({
        transaction_id: book.transaction_id,
        action: "return_book",
      });
      // createTransactionMutation logic removed in favor of direct return
      setMessage({ text: "Book returned successfully!", type: "success" });
    } catch (error) {
      console.error("Failed to return book:", error);
      setMessage({
        text: "Failed to return book. Please try again.",
        type: "error",
      });
    }
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
    fine_amount: book.fine_amount ? `$${book.fine_amount}` : "N/A",
    hasPendingReturn:
      hasPendingReturnRequest(book.book_id, currentUser?.user_id) ||
      pendingReturns.includes(book.book_id),
  }));

  const titleWithMessage = (
    <div className="flex items-center gap-4">
      {customTitle || (
        <h2 className="whitespace-nowrap text-xl font-semibold max-[856px]:text-sm">
          My Borrowed Books
        </h2>
      )}
      <StatusMessage message={message.text} type={message.type} />
    </div>
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
      customTitle={titleWithMessage}
      customActionRenderer={(book) => (
        <div className="flex justify-center">
          {book.hasPendingReturn ? (
            <span className="rounded-lg bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700">
              Pending Return
            </span>
          ) : (
            <button
              onClick={() => handleReturn(book)}
              disabled={returnTransactionMutation.isPending}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#0a0f33] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#192261] disabled:opacity-50"
            >
              <ArrowLeft size={16} />
              Return
            </button>
          )}
        </div>
      )}
    />
  );
}

export default BorrowedBooksContent;
