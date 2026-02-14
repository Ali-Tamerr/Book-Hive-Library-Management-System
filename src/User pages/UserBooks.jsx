import React, { useState, useEffect } from "react";
import {
  BookOpen,
  ShoppingCart,
  X,
  BookMarked,
  ReceiptText,
} from "lucide-react";
import CommonLayout from "../Layouts/CommonLayout";
import { useBooks } from "../hooks/useBooks";
import { useCategories } from "../hooks/useCategories";
import { useBookCopies } from "../hooks/useBookCopies";
import { useBranches } from "../hooks/useBranches";
import {
  useBorrowedBooks,
  useCreateBorrowedBook,
} from "../hooks/useBorrowedBooks";
import { getCurrentUser } from "../services/auth.api";
import BorrowBookPopup from "../components/BorrowBookPopup";
import ConfirmAcquirePopup from "../components/ConfirmAcquirePopup";
import BookDetailsPopup from "../components/BookDetailsPopup";
import StatusMessage from "../components/StatusMessage";

function UserBooks() {
  const currentUser = getCurrentUser();
  const { data: books = [], isLoading, error } = useBooks();
  const { data: categories = [] } = useCategories();
  const { data: bookCopies = [] } = useBookCopies();
  const { data: branches = [] } = useBranches();
  const { data: transactions = [] } = useBorrowedBooks();
  const createBorrowedBookMutation = useCreateBorrowedBook();
  const [searchValue, setSearchValue] = useState("");
  const [borrowingBookId, setBorrowingBookId] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showBorrowPopup, setShowBorrowPopup] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState({});
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [viewBook, setViewBook] = useState(null);

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const getAvailableCopies = (bookId) => {
    const copies = bookCopies.filter((c) => c.book_id === bookId);
    if (!copies.length) return [];

    const activeTransactions = transactions.filter((t) => {
      if (!t || !t.book_id) return false;
      const txBookId = String(t.book_id).trim();

      const isRelevant =
        copies.some((c) => String(c.book_copy_id).trim() == txBookId) ||
        String(bookId).trim() == txBookId;

      if (!isRelevant) return false;

      const type = (t.transaction_type || "").toLowerCase().trim();
      const status = (t.status || "").toLowerCase().trim();

      const isCompletedActive = status === "completed" && !t.return_date;
      const isActiveStatus =
        ["open", "active", "approved", "overdue"].includes(status) ||
        isCompletedActive;
      const isLendingType = ["check-out", "borrow"].includes(type);

      return isLendingType && isActiveStatus;
    });
    const borrowedCopyIds = new Set(activeTransactions.map((t) => t.book_id));

    return copies.filter((c) => !borrowedCopyIds.has(c.book_copy_id));
  };

  const getAvailableCopiesCount = (bookId) => {
    return getAvailableCopies(bookId).length;
  };

  const filteredBooks = searchValue
    ? books.filter(
        (book) =>
          book.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
          book.book_id?.toString().includes(searchValue),
      )
    : books;

  const columns = [
    { header: "Name", accessor: "name" },
    {
      header: "Category",
      accessor: "category_id",
      render: (book) =>
        categories.find((cat) => cat.category_id === book.category_id)
          ?.category_name || "N/A",
    },
    {
      header: "Availability",
      accessor: "availability",
      render: (book) => {
        const availableCopiesCount = getAvailableCopiesCount(book.book_id);

        if (book.quantity <= 1 || availableCopiesCount === 0) {
          return "Not Available";
        }

        return "Available";
      },
    },
    { header: "Action", accessor: "action" },
  ];

  const handleAcquireSelectedClick = () => {
    if (!currentUser) {
      setMessage({ text: "Please log in to borrow books.", type: "error" });
      return;
    }

    if (selectionMode) {
      const selectedList = Object.values(selectedBooks);
      if (selectedList.length === 0) {
        setMessage({
          text: "Please select at least one book to borrow.",
          type: "error",
        });
        return;
      }
      setShowConfirmPopup(true);
    } else {
      setSelectionMode(true);
    }
  };

  const handleCancelSelection = () => {
    setSelectionMode(false);
    setSelectedBooks({});
  };

  const handleBorrowClick = (book) => {
    if (!currentUser) {
      setMessage({ text: "Please log in to borrow books.", type: "error" });
      return;
    }

    if (book.quantity <= 1) {
      setMessage({
        text: "This book is Reference Only and cannot be borrowed.",
        type: "error",
      });
      return;
    }

    const availableCopies = getAvailableCopies(book.book_id);
    if (availableCopies.length === 0) {
      setMessage({ text: "No copies available for this book.", type: "error" });
      return;
    }

    setSelectedBook(book);
    setShowBorrowPopup(true);
  };

  const handleConfirmBorrowForSelection = ({ quantity, dueDate }) => {
    if (!selectedBook) return;

    setSelectedBooks((prev) => ({
      ...prev,
      [selectedBook.book_id]: {
        ...selectedBook,
        borrowDetails: { quantity, dueDate },
      },
    }));

    setShowBorrowPopup(false);
    setSelectedBook(null);
    // setMessage({
    //   text: `"${selectedBook.name}" added to selection!`,
    //   type: "success",
    // });
  };

  const handleConfirmBorrowDirect = async ({ dueDate }) => {
    if (!selectedBook || !currentUser) return;

    if (selectedBook.quantity <= 1) {
      setMessage({
        text: "This book is Reference Only and cannot be borrowed.",
        type: "error",
      });
      setShowBorrowPopup(false);
      return;
    }

    const availableCopies = getAvailableCopies(selectedBook.book_id);

    if (availableCopies.length === 0) {
      setMessage({ text: "No copies available.", type: "error" });
      setShowBorrowPopup(false);
      return;
    }

    setBorrowingBookId(selectedBook.book_id);

    try {
      const bookCopyId = availableCopies[0].book_copy_id;

      console.log("User initiating borrow request:", {
        bookId: selectedBook.book_id,
        copyId: bookCopyId,
        dueDate,
      });

      await createBorrowedBookMutation.mutateAsync({
        user_id: currentUser.user_id,
        book_id: bookCopyId,
        transaction_type: "Check-Out",
        borrow_type: "Borrow",
        due_date: dueDate,
        status: "Pending",
      });

      console.log("Borrow request sent successfully (status: Pending)");
      setMessage({
        text: `Successfully borrowed "${selectedBook.name}"!`,
        type: "success",
      });
      setShowBorrowPopup(false);
      setSelectedBook(null);
    } catch (error) {
      console.error("Failed to borrow book:", error);
      setMessage({
        text: `Failed to borrow: ${error.message || "Please try again."}`,
        type: "error",
      });
    } finally {
      setBorrowingBookId(null);
    }
  };

  const handleToggleBookSelection = (book) => {
    if (!selectionMode) return;

    setSelectedBooks((prev) => {
      const newSelection = { ...prev };
      if (newSelection[book.book_id]) {
        delete newSelection[book.book_id];
        // setMessage({
        //   text: `"${book.name}" removed from selection.`,
        //   type: "success",
        // });
      } else {
        if (book.quantity <= 1) {
          setMessage({
            text: "This book is Reference Only and cannot be borrowed.",
            type: "error",
          });
          return prev;
        }
        const availableCopies = getAvailableCopiesCount(book.book_id);
        if (availableCopies === 0) {
          setMessage({
            text: "No copies available for this book.",
            type: "error",
          });
          return prev;
        }
        newSelection[book.book_id] = { ...book };
        //     setMessage({
        //       text: `"${book.name}" added to selection.`,
        //       type: "success",
        //     });
      }
      return newSelection;
    });
  };

  const handleRemoveFromConfirmation = (bookId) => {
    setSelectedBooks((prev) => {
      const newSelection = { ...prev };
      delete newSelection[bookId];
      return newSelection;
    });
  };

  const handleFinalConfirm = async (globalDueDate) => {
    if (!currentUser) return;

    const selectedList = Object.values(selectedBooks);
    if (selectedList.length === 0) {
      setMessage({ text: "No books selected.", type: "error" });
      return;
    }

    setIsProcessing(true);

    try {
      for (const book of selectedList) {
        const availableCopies = getAvailableCopies(book.book_id);

        let dueDate = book.borrowDetails?.dueDate;
        if (!dueDate && globalDueDate) {
          dueDate = new Date(globalDueDate).toISOString();
        }

        if (availableCopies.length > 0) {
          const bookCopyId = availableCopies[0].book_copy_id;
          await createBorrowedBookMutation.mutateAsync({
            user_id: currentUser.user_id,
            book_id: bookCopyId,
            transaction_type: "Check-Out",
            borrow_type: "Borrow",
            due_date: dueDate,
            status: "Pending",
          });
        }
      }

      const totalBooks = selectedList.length;
      setMessage({
        text: `Successfully borrowed ${totalBooks} book(s)!\nPlease wait for the librarian to confirm your request.`,
        type: "success",
      });
      setShowConfirmPopup(false);
      setSelectedBooks({});
      setSelectionMode(false);
    } catch (error) {
      console.error("Failed to complete borrowing:", error);
      setMessage({
        text: `Failed to complete borrowing: ${error.message || "Please try again."}`,
        type: "error",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const tableData = filteredBooks.map((book) => ({
    ...book,
  }));

  const selectedCount = Object.keys(selectedBooks).length;

  const customTitle = (
    <div className="flex items-center gap-4">
      <h2 className="whitespace-nowrap text-xl font-semibold max-[856px]:text-sm">
        Available Books
      </h2>
      <StatusMessage message={message.text} type={message.type} />
    </div>
  );

  const secondaryButton = (
    <div className="flex gap-2">
      {selectionMode && (
        <button
          onClick={handleCancelSelection}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-300"
        >
          Cancel
        </button>
      )}
      <button
        onClick={handleAcquireSelectedClick}
        className={`flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 font-medium transition-colors ${
          selectionMode && selectedCount === 0
            ? "bg-gray-300 text-gray-500"
            : "bg-[#0a0f33] text-white hover:bg-[#192261]"
        }`}
      >
        <ShoppingCart size={18} />
        <span>
          Acquire Selected{selectedCount > 0 ? ` (${selectedCount})` : ""}
        </span>
      </button>
    </div>
  );

  return (
    <>
      <CommonLayout
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        buttonBehaviour={() => {}}
        isLoading={isLoading}
        data={tableData}
        handleEdit={(book) => handleBorrowClick(book)}
        handleDelete={() => {}}
        title="Available Books"
        buttonText=""
        columns={columns}
        formPopup={null}
        isUserPage={true}
        customTitle={customTitle}
        secondaryButton={secondaryButton}
        customActionRenderer={(book) => {
          const availableCopiesCount = getAvailableCopiesCount(book.book_id);
          const canBorrow = availableCopiesCount > 0 && book.quantity > 1;
          const isBorrowing = borrowingBookId === book.book_id;
          const isSelected = !!selectedBooks[book.book_id];

          if (selectionMode) {
            return (
              <div className="flex items-center justify-center gap-3">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleToggleBookSelection(book)}
                  disabled={!canBorrow && !isSelected}
                  className="h-5 w-5 cursor-pointer accent-[#0a0f33]"
                />
                <button
                  onClick={() => handleBorrowClick(book)}
                  disabled={!canBorrow}
                  className={`rounded-lg p-2 transition-all ${
                    canBorrow
                      ? "cursor-pointer text-[#0a0f33] hover:bg-gray-100 dark:text-white"
                      : "cursor-not-allowed text-gray-300"
                  }`}
                  title={
                    !canBorrow
                      ? book.quantity <= 1
                        ? "Reference Only"
                        : "Not available"
                      : "Configure borrow details"
                  }
                >
                  <BookMarked size={20} />
                </button>
              </div>
            );
          }

          return (
            <button
              onClick={() => {
                setViewBook(book);
                setShowViewDetails(true);
              }}
              className="cursor-pointer rounded-lg p-2 text-[#0a0f33] transition-all hover:bg-gray-100 dark:text-white"
              title="View book details"
            >
              <ReceiptText size={20} />
            </button>
          );
        }}
      />
      <BorrowBookPopup
        show={showBorrowPopup}
        onClose={() => {
          setShowBorrowPopup(false);
          setSelectedBook(null);
        }}
        book={selectedBook}
        availableCopies={
          selectedBook ? getAvailableCopiesCount(selectedBook.book_id) : 0
        }
        onConfirm={
          selectionMode
            ? handleConfirmBorrowForSelection
            : handleConfirmBorrowDirect
        }
        isLoading={borrowingBookId !== null}
      />
      <ConfirmAcquirePopup
        show={showConfirmPopup}
        onClose={() => setShowConfirmPopup(false)}
        selectedBooks={Object.values(selectedBooks)}
        onRemoveBook={handleRemoveFromConfirmation}
        onConfirm={handleFinalConfirm}
        isLoading={isProcessing}
        categories={categories}
        getAvailableCopiesCount={getAvailableCopiesCount}
      />
      <BookDetailsPopup
        show={showViewDetails}
        onClose={() => {
          setShowViewDetails(false);
          setViewBook(null);
        }}
        book={viewBook}
        availableCopies={
          viewBook ? getAvailableCopiesCount(viewBook.book_id) : 0
        }
        category={
          viewBook
            ? categories.find((cat) => cat.category_id === viewBook.category_id)
                ?.category_name
            : null
        }
        onBookNow={() => {
          setShowViewDetails(false);
          handleAcquireSelectedClick();
        }}
      />
    </>
  );
}

export default UserBooks;
