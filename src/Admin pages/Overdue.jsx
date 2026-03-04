import { useState } from "react";
import { useOverdueBooks } from "../hooks/useOverdueBooks";
import { useBooks } from "../hooks/useBooks";
import { useUsers } from "../hooks/useUsers";
import { useBookCopies } from "../hooks/useBookCopies";
import { useBranches } from "../hooks/useBranches"; // Added
import { useDeleteBorrowedBook } from "../hooks/useBorrowedBooks";
import CommonLayout from "../Layouts/CommonLayout.jsx";
import DeleteConfirmationPopup from "../components/DeleteConfirmationPopup.jsx";
import { getCurrentUser } from "../services/auth.api";

function Overdue({ searchValue, setSearchValue, customTitle }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const { data: overdueBooks = [], isLoading } = useOverdueBooks();
  const { data: books = [] } = useBooks();
  const { data: usersData } = useUsers();
  const users = usersData
    ? usersData.pages.flatMap((page) => page.data || [])
    : [];
  const { data: bookCopies = [] } = useBookCopies();
  const { data: branches = [] } = useBranches(); // Added
  const deleteBorrowedBookMutation = useDeleteBorrowedBook();

  const currentUser = getCurrentUser();
  const isSuperAdmin = currentUser?.role === "Super Admin";

  const getBranchIdFromUser = (user) => {
    if (!user) return null;
    return (
      user.branch_id ||
      user.branchId ||
      user.branch?.branch_id ||
      user.branch?.id
    );
  };
  const currentUserBranchId = getBranchIdFromUser(currentUser);

  const getBookBranchId = (bookCopyId) => {
    const copy = bookCopies.find(
      (c) => c.book_copy_id === bookCopyId || c.id === bookCopyId,
    );
    if (copy && copy.branch_id) return String(copy.branch_id);
    return null;
  };

  const getBookBranchName = (bookCopyId) => {
    const branchId = getBookBranchId(bookCopyId);
    if (!branchId) return "N/A";
    const branch = branches.find(
      (b) => String(b.branch_id) === String(branchId),
    );
    return branch ? branch.name : `Branch ${branchId}`;
  };

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
    return user
      ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
      : "-";
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

  const visibleOverdueBooks = overdueBooks.filter((item) => {
    if (isSuperAdmin) return true;
    if (currentUserBranchId) {
      const itemBranchId = getBookBranchId(item.book_id); // book_id here is actually book_copy_id in transactions usually?
      // API docs say `book_id` in `BookTransactions` refers to `BookCopies.book_copy_id`.
      // So checking `item.book_id` against copy's branch is correct.
      return String(itemBranchId) === String(currentUserBranchId);
    }
    return false;
  });

  const enrichedOverdueBooks = visibleOverdueBooks.map((book) => ({
    ...book,
    id: book.transaction_id,
    book_name: getBookName(book.book_id),
    user_name_display: getUserName(book.user_id),
    due_date_formatted: formatDate(book.due_date),
    created_at_formatted: formatDate(book.created_at),
    branch_name: getBookBranchName(book.book_id),
  }));

  const filteredOverdueBooks = searchValue
    ? enrichedOverdueBooks.filter(
        (book) =>
          book.book_name?.toLowerCase().includes(searchValue.toLowerCase()) ||
          book.user_name_display
            ?.toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          (isSuperAdmin &&
            book.branch_name
              ?.toLowerCase()
              .includes(searchValue.toLowerCase())),
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
      } catch {
        alert("Failed to delete transaction. Please try again.");
        setShowDeleteConfirm(false);
        setTransactionToDelete(null);
      }
    }
  };

  const columns = [
    { header: "User Name", accessor: "user_name_display" },
    { header: "Book Name", accessor: "book_name" },
    ...(isSuperAdmin ? [{ header: "Branch", accessor: "branch_name" }] : []),
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
        emphasizedColumns={[
          "user_name_display",
          "book_name",
          "due_date_formatted",
          "created_at_formatted",
        ]}
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
