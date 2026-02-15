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
import BorrowedBookFormPopup from "../components/BorrowedBookFormPopup.jsx";
import DeleteConfirmationPopup from "../components/DeleteConfirmationPopup.jsx";
import ViewDetailsPopup from "../components/ViewDetailsPopup.jsx";
import CommonLayout from "../Layouts/CommonLayout.jsx";

function BorrowedBooks({
  searchValue,
  setSearchValue,
  customTitle,
  hideButton = false,
  showPending = false,
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
    rfid_tag_id: "",
    transaction_type: "Borrow",
    due_date: "",
    return_date: "",
    fine_amount: "",
    status: "Open",
    borrow_type: "TakeHome",
  });

  const { data: borrowedBooks = [], isLoading } = useBorrowedBooks();
  const { data: books = [] } = useBooks();
  const { data: users = [] } = useUsers();
  const { data: bookCopies = [] } = useBookCopies();
  const createBorrowedBookMutation = useCreateBorrowedBook();
  const updateBorrowedBookMutation = useUpdateBorrowedBook();
  const deleteBorrowedBookMutation = useDeleteBorrowedBook();

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

  const handleAddBorrowedBook = async (e) => {
    e.preventDefault();
    try {
      const apiData = {
        user_id: formData.user_id,
        book_id: formData.book_id,
        rfid_tag_id: formData.rfid_tag_id
          ? parseInt(formData.rfid_tag_id, 10)
          : null,
        transaction_type: formData.transaction_type,
        due_date: formData.due_date || null,
        return_date: formData.return_date || null,
        fine_amount: formData.fine_amount
          ? parseFloat(formData.fine_amount)
          : null,
        status: formData.status,
        borrow_type: formData.borrow_type || null,
      };

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
        rfid_tag_id: "",
        transaction_type: "Borrow",
        due_date: "",
        return_date: "",
        fine_amount: "",
        status: "Open",
        borrow_type: "TakeHome",
      });
      setShowPopup(false);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save transaction:", error);
      alert("Failed to save transaction. Please try again.");
    }
  };

  const handleEdit = (transaction) => {
    setFormData({
      transaction_id: transaction.transaction_id || transaction.id,
      user_id: transaction.user_id || "",
      book_id: transaction.book_id || "",
      rfid_tag_id: transaction.rfid_tag_id || "",
      transaction_type: transaction.transaction_type || "Borrow",
      due_date: transaction.due_date || "",
      return_date: transaction.return_date || "",
      fine_amount: transaction.fine_amount || "",
      status: transaction.status || "Open",
      borrow_type: transaction.borrow_type || "TakeHome",
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
      } catch (error) {
        alert("Failed to delete transaction. Please try again.");
        setShowDeleteConfirm(false);
        setTransactionToDelete(null);
      }
    }
  };

  const handleView = (transaction) => {
    setSelectedTransaction(transaction);
    setShowViewDetails(true);
  };

  const handleButtonClick = () => {
    setFormData({
      transaction_id: "",
      user_id: "",
      book_id: "",
      rfid_tag_id: "",
      transaction_type: "Borrow",
      due_date: "",
      return_date: "",
      fine_amount: "",
      status: "Open",
      borrow_type: "TakeHome",
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

  const filteredPending = borrowedBooks.filter((book) => {
    const status = (book.status || "").toLowerCase();
    const isPending = status === "pending";
    const isReturned = status === "returned";

    if (showPending) {
      return isPending;
    }
    // Show everything except Pending and Returned (i.e., Completed, Overdue)
    return !isPending && !isReturned;
  });

  const filteredBorrowedBooks = searchValue
    ? filteredPending.filter(
        (book) =>
          book.book_title?.toLowerCase().includes(searchValue.toLowerCase()) ||
          book.user_name?.toLowerCase().includes(searchValue.toLowerCase()) ||
          book.transaction_id?.toString().includes(searchValue),
      )
    : filteredPending;

  const tableData = filteredBorrowedBooks.map((book) => ({
    ...book,
    id: book.transaction_id,
    book_name: getBookName(book.book_id),
    user_name_display: getUserName(book.user_id),
    due_date_formatted: formatDate(book.due_date),
    borrowed_on_formatted: formatDate(book.created_at),
  }));

  const columns = [
    { header: "User Name", accessor: "user_name_display" },
    { header: "Book Name", accessor: "book_name" },
    { header: "Due Date", accessor: "due_date_formatted" },
    { header: "Date & Time", accessor: "borrowed_on_formatted" },
    // { header: "Action", accessor: "action" },
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
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleView={handleView}
        title={customTitle || "Book Transactions"}
        buttonText={hideButton ? "" : "Add Transaction"}
        columns={columns}
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
