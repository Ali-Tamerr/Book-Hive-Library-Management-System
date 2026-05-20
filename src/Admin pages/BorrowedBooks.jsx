import { useState } from "react";
import {
  useBorrowedBooks,
  useCreateBorrowedBook,
  useUpdateBorrowedBook,
  useDeleteBorrowedBook,
} from "../hooks/useBorrowedBooks.js";
import { useBooks } from "../hooks/useBooks.js";
import { useUsers } from "../hooks/useUsers.js";
import { useBookCopies } from "../hooks/useBookCopies.js";
import { useBranches } from "../hooks/useBranches.js";
import { useCheckBook } from "../hooks/useSupabaseEdge.js";
import BorrowedBookFormPopup from "../components/BorrowedBookFormPopup.jsx";
import DeleteConfirmationPopup from "../components/DeleteConfirmationPopup.jsx";
import ViewDetailsPopup from "../components/ViewDetailsPopup.jsx";
import CommonLayout from "../Layouts/CommonLayout.jsx";
import { getCurrentUser } from "../services/auth.api.js";

function BorrowedBooks({
  searchValue,
  setSearchValue,
  customTitle,
  hideButton = false,
  showPending = false,
  showReturned = false,
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [formData, setFormData] = useState({
    transaction_id: "",
    user_id: "",
    book_id: "",
    transaction_type: "Check-Out",
    due_date: "",
    return_date: "",
    fine_amount: "",
    status: "Pending",
    borrow_type: "Borrow",
  });

  const { data: borrowedBooks = [], isLoading } = useBorrowedBooks();
  const { data: books = [] } = useBooks();
  const { data: usersData } = useUsers();
  const users = usersData
    ? usersData.pages.flatMap((page) => page.data || [])
    : [];
  const { data: bookCopies = [] } = useBookCopies();
  const { data: branches = [] } = useBranches();
  const createBorrowedBookMutation = useCreateBorrowedBook();
  const updateBorrowedBookMutation = useUpdateBorrowedBook();
  const deleteBorrowedBookMutation = useDeleteBorrowedBook();

  const getBookName = (bookCopyId) => {
    // 1. Try to find the physical copy
    const copy = bookCopies.find(
      (c) =>
        String(c.book_copy_id) === String(bookCopyId) ||
        String(c.id) === String(bookCopyId),
    );

    // 2. If copy has embedded book detail (as populated by BookCopiesController)
    if (copy && copy.book) {
      return copy.book.name || copy.book.title || "-";
    }

    // 3. Fallback: Manual lookup in books list via cross-reference ID
    const actualBookId = copy?.book_id;
    if (actualBookId) {
      const book = books.find(
        (b) =>
          String(b.book_id) === String(actualBookId) ||
          String(b.id) === String(actualBookId),
      );
      return book?.name || book?.title || "-";
    }

    // 4. Last resort: Direct book lookup (if bookCopyId was actually a book_id)
    const directBook = books.find(
      (b) =>
        String(b.book_id) === String(bookCopyId) ||
        String(b.id) === String(bookCopyId),
    );
    return directBook?.name || directBook?.title || "-";
  };

  const getBookBranchId = (bookCopyId) => {
    // Try to find copy
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

  const getUserName = (userId) => {
    const user = users.find((u) => u.user_id === userId || u.id === userId);
    return user
      ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
      : "-";
  };

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

  const checkBookMutation = useCheckBook();

  const handleAddBorrowedBook = async (e) => {
    e.preventDefault();
    try {
      const isBorrowing = formData.transaction_type === "Check-Out";

      // Hardware proxy / Edge validation flow (if applicable)
      if (!editMode && isBorrowing && formData.user_id && formData.book_id) {
        try {
          const res = await checkBookMutation.mutateAsync({
            userId: formData.user_id,
            bookCopyId: formData.book_id,
          });
          if (!res.ok) {
            alert(
              `Validation failed: ${res.reason || "Unable to borrow this copy"}`,
            );
            return;
          }
          if (!res.available) {
            alert("This book copy is currently not available for borrowing.");
            return;
          }
        } catch (err) {
          console.error(
            "Hardware proxy validation failed, continuing normally:",
            err,
          );
          // If the proxy fails/is offline, we can decide to block or allow
          // For now, allow continuing if the backend proxy isn't setup
        }
      }

      const apiData = {
        user_id: formData.user_id,
        book_id: formData.book_id,
        transaction_type: formData.transaction_type,
        borrow_type: formData.borrow_type || null,
        due_date: formData.due_date || null,
      };

      if (editMode) {
        apiData.return_date = formData.return_date || null;
        apiData.fine_amount = formData.fine_amount
          ? parseFloat(formData.fine_amount)
          : null;
        apiData.status = formData.status || "Pending";
      }

      if (editMode && formData.transaction_id) {
        await updateBorrowedBookMutation.mutateAsync({
          id: formData.transaction_id,
          data: apiData,
        });
      } else {
        await createBorrowedBookMutation.mutateAsync(apiData);
      }
      setFormData({
        transaction_id: "",
        user_id: "",
        book_id: "",
        transaction_type: "Check-Out",
        due_date: "",
        return_date: "",
        fine_amount: "",
        status: "Pending",
        borrow_type: "Borrow",
      });
      setShowPopup(false);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save transaction:", error);
      alert("Failed to save transaction. Please try again.");
    }
  };

  const _handleEdit = (transaction) => {
    setFormData({
      transaction_id: transaction.transaction_id || transaction.id,
      user_id: transaction.user_id || "",
      book_id: transaction.book_id || "",
      transaction_type: transaction.transaction_type || "Check-Out",
      due_date: transaction.due_date || "",
      return_date: transaction.return_date || "",
      fine_amount: transaction.fine_amount || "",
      status: transaction.status || "Pending",
      borrow_type: transaction.borrow_type || "Borrow",
    });
    setEditMode(true);
    setShowPopup(true);
  };

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

  const _handleView = (transaction) => {
    setSelectedTransaction(transaction);
    setShowViewDetails(true);
  };

  const handleButtonClick = () => {
    setFormData({
      transaction_id: "",
      user_id: "",
      book_id: "",
      transaction_type: "Check-Out",
      due_date: "",
      return_date: "",
      fine_amount: "",
      status: "Pending",
      borrow_type: "Borrow",
    });
    setEditMode(false);
    setShowPopup(true);
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

  const visibleBorrowedBooks = borrowedBooks;

  const filteredPending = visibleBorrowedBooks.filter((book) => {
    const status = (book.status || "").toLowerCase();
    const isPending = status === "pending";
    const isReturned = status === "returned";
    const hasReturnDate = !!book.return_date;

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const dueDate = book.due_date ? new Date(book.due_date) : null;
    if (dueDate) dueDate.setHours(0, 0, 0, 0);

    const isOverdue =
      !isReturned &&
      !hasReturnDate &&
      (status === "overdue" || (dueDate && dueDate < now));

    if (showPending) {
      return isPending;
    }
    if (showReturned) {
      return isReturned || hasReturnDate;
    }
    // Show active borrowings (exclude Pending, Returned, and Overdue)
    return !isPending && !isReturned && !hasReturnDate && !isOverdue;
  });

  const filteredBorrowedBooks = searchValue
    ? filteredPending.filter(
        (book) =>
          getBookName(book.book_id)
            ?.toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          getUserName(book.user_id)
            ?.toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          book.transaction_id?.toString().includes(searchValue) ||
          (isSuperAdmin &&
            getBookBranchName(book.book_id)
              .toLowerCase()
              .includes(searchValue.toLowerCase())),
      )
    : filteredPending;

  const tableData = filteredBorrowedBooks.map((book) => ({
    ...book,
    id: book.transaction_id,
    book_name: getBookName(book.book_id),
    user_name_display: getUserName(book.user_id),
    due_date_formatted: formatDate(book.due_date),
    return_date_formatted: formatDate(book.return_date),
    borrowed_on_formatted: formatDate(book.created_at),
    branch_name: getBookBranchName(book.book_id),
  }));

  const columns = [
    { header: "User Name", accessor: "user_name_display" },
    { header: "Book Name", accessor: "book_name" },
    ...(isSuperAdmin ? [{ header: "Branch", accessor: "branch_name" }] : []),
    {
      header: showReturned ? "Return Date" : "Due Date",
      accessor: showReturned ? "return_date_formatted" : "due_date_formatted",
    },
    { header: "Date & Time", accessor: "borrowed_on_formatted" },
    ...(isSuperAdmin ? [{ header: "Action", accessor: "action" }] : []),
  ];

  const formPopupComponent = (
    <BorrowedBookFormPopup
      showPopup={showPopup}
      editMode={editMode}
      formData={formData}
      setFormData={setFormData}
      handleAddBorrowedBook={handleAddBorrowedBook}
      setShowPopup={setShowPopup}
      setEditMode={setEditMode}
    />
  );

  return (
    <>
      <CommonLayout
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        buttonBehaviour={handleButtonClick}
        isLoading={isLoading}
        data={tableData}
        handleDelete={handleDelete}
        title={customTitle || "Book Transactions"}
        buttonText={hideButton ? "" : "Add Transaction"}
        columns={columns}
        emphasizedColumns={[
          "user_name_display",
          "book_name",
          showReturned ? "return_date_formatted" : "due_date_formatted",
          "borrowed_on_formatted",
        ]}
        formPopup={formPopupComponent}
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
      <ViewDetailsPopup
        show={showViewDetails}
        onClose={() => {
          setShowViewDetails(false);
          setSelectedTransaction(null);
        }}
        variant="details"
        title="View Transaction"
        data={
          selectedTransaction
            ? {
                "Transaction ID": selectedTransaction.transaction_id,
                "User ID": selectedTransaction.user_id,
                "Book ID": selectedTransaction.book_id,
                "Transaction Type": selectedTransaction.transaction_type,
                "Due Date": selectedTransaction.due_date,
                "Return Date": selectedTransaction.return_date,
                "Fine Amount": selectedTransaction.fine_amount,
                Status: selectedTransaction.status,
                "Borrow Type": selectedTransaction.borrow_type,
              }
            : null
        }
      ></ViewDetailsPopup>
    </>
  );
}

export default BorrowedBooks;
