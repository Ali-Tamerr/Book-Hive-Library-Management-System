import { useState } from "react";
import { useOverdueBooks } from "../hooks/useOverdueBooks";
import { useBooks } from "../hooks/useBooks";
import { useUsers } from "../hooks/useUsers";
import { useBookCopies } from "../hooks/useBookCopies";
import { useDeleteBorrowedBook } from "../hooks/useBorrowedBooks";
import CommonLayout from "../Layouts/CommonLayout.jsx";
import DeleteConfirmationPopup from "../components/DeleteConfirmationPopup.jsx";
import { getCurrentUser } from "../services/auth.api";

function Overdue({ searchValue, setSearchValue, customTitle }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const { data: overdueBooks = [], isLoading } = useOverdueBooks();
  const { data: books = [] } = useBooks();
  const { data: users = [] } = useUsers();
  const { data: bookCopies = [] } = useBookCopies();
  const deleteBorrowedBookMutation = useDeleteBorrowedBook();

  const currentUser = getCurrentUser();
  const isSuperAdmin = currentUser?.role === "Super Admin";

  const getBookName = (bookCopyId) => {
    const copy = bookCopies.find(
      (c) => c.book_copy_id === bookCopyId || c.id === bookCopyId,
    );
    const actualBookId = copy?.book_id;
    if (actualBookId) {
      const book = books.find(
        (b) => b.book_id === actualBookId || b.id === actualBookId,
      );
      return book?.name || book?.title || "-";
    }
    const directBook = books.find(
      (b) => b.book_id === bookCopyId || b.id === bookCopyId,
    );
    return directBook?.name || directBook?.title || "-";
  };

  const getUserName = (userId) => {
    const user = users.find((u) => u.user_id === userId || u.id === userId);
    return user?.full_name || user?.name || user?.username || "-";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const enrichedOverdueBooks = overdueBooks.map((book) => ({
    ...book,
    id: book.transaction_id,
    book_name: getBookName(book.book_id),
    user_name_display: getUserName(book.user_id),
    due_date_formatted: formatDate(book.due_date),
    created_at_formatted: formatDate(book.created_at),
  }));

  const filteredOverdueBooks = searchValue
    ? enrichedOverdueBooks.filter(
        (book) =>
          book.book_name?.toLowerCase().includes(searchValue.toLowerCase()) ||
          book.user_name_display
            ?.toLowerCase()
            .includes(searchValue.toLowerCase()),
      )
    : enrichedOverdueBooks;

  const handleDelete = (id) => {
    setTransactionToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (transactionToDelete) {
      try {
        await deleteBorrowedBookMutation.mutateAsync(transactionToDelete);
        setShowDeleteConfirm(false);
        setTransactionToDelete(null);
      } catch (error) {
        alert("Failed to delete transaction. Please try again.");
        setShowDeleteConfirm(false);
        setTransactionToDelete(null);
      }
    }
  };

  const columns = [
    { header: "User Name", accessor: "user_name_display" },
    { header: "Book Name", accessor: "book_name" },
    { header: "Due Date", accessor: "due_date_formatted" },
    { header: "Date & Time", accessor: "created_at_formatted" },
    ...(isSuperAdmin ? [{ header: "Action", accessor: "action" }] : []),
  ];

  return (
    <>
      <CommonLayout
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        buttonBehaviour={() => {}}
        isLoading={isLoading}
        data={filteredOverdueBooks}
        handleEdit={() => {}}
        handleDelete={handleDelete}
        title="Overdue Borrowers"
        buttonText=""
        columns={columns}
        formPopup={null}
        customTitle={customTitle}
      />
      <DeleteConfirmationPopup
        show={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setTransactionToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Transaction"
      />
    </>
  );
}

export default Overdue;
