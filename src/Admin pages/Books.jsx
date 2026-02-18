import { useState } from "react";
import {
  useBooks,
  useCreateBook,
  useUpdateBook,
  useDeleteBook,
} from "../hooks/useBooks.js";
import { useCategories } from "../hooks/useCategories.js";
import { useUsers } from "../hooks/useUsers.js";
import { useBookCopies } from "../hooks/useBookCopies.js";
import { useBorrowedBooks } from "../hooks/useBorrowedBooks.js";
import BookFormPopup from "../components/BookFormPopup.jsx";
import DeleteConfirmationPopup from "../components/DeleteConfirmationPopup.jsx";
import ViewDetailsPopup from "../components/ViewDetailsPopup.jsx";
import CommonLayout from "../Layouts/CommonLayout.jsx";
import { getCurrentUser } from "../services/auth.api";

function Books({ searchValue, setSearchValue }) {
  const currentUser = getCurrentUser();
  const isSuperAdmin = currentUser?.role === "Super Admin";
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [formData, setFormData] = useState({
    book_id: "",
    name: "",
    category_id: "",
    quantity: "",
    sale_price: "",
    BookCopies: [],
  });

  const { data: books = [], isLoading } = useBooks();
  const { data: categories = [], isLoading: isLoadingCategories } =
    useCategories();
  const { data: users = [] } = useUsers();
  const { data: bookCopies = [] } = useBookCopies();
  const { data: transactions = [] } = useBorrowedBooks();
  const createBookMutation = useCreateBook();
  const updateBookMutation = useUpdateBook();
  const deleteBookMutation = useDeleteBook();

  const handleAddBook = async (e, overrideData) => {
    if (e && e.preventDefault) e.preventDefault();
    const currentData = overrideData || formData;
    try {
      const category_id = parseInt(currentData.category_id, 10);
      const quantity = parseInt(currentData.quantity, 10);
      const sale_price = parseFloat(currentData.sale_price);

      const bookCopiesCount = currentData.BookCopies?.length || 0;
      if (bookCopiesCount !== quantity) {
        alert(
          `Please enter exactly ${quantity} copy ID${quantity !== 1 ? "s" : ""}. Currently have ${bookCopiesCount}.`,
        );
        return;
      }

      const apiData = {
        name: currentData.name,
        category_id: isNaN(category_id) ? null : category_id,
        quantity: isNaN(quantity) ? 1 : quantity,
        sale_price: isNaN(sale_price) ? null : sale_price,
        BookCopies: currentData.BookCopies,
        created_by: currentUser?.user_id || null,
      };

      if (editMode && currentData.book_id) {
        await updateBookMutation.mutateAsync({
          id: currentData.book_id,
          data: apiData,
        });
      } else {
        await createBookMutation.mutateAsync(apiData);
      }
      setFormData({
        book_id: "",
        name: "",
        category_id: "",
        quantity: "",
        sale_price: "",
        BookCopies: [],
      });
      setShowPopup(false);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save book:", error);
      if (error.status === 405) {
        alert(
          "Book creation/update is not supported by the API. The Books endpoint may be read-only.",
        );
      } else if (error.status === 400) {
        alert(
          `Validation error: ${error.message || "Please check your input fields."}`,
        );
      } else {
        alert(`Failed to save book: ${error.message || "Please try again."}`);
      }
    }
  };

  const handleEdit = (book) => {
    const existingCopies =
      book.BookCopies?.map((c) => ({ book_copy_id: c.book_copy_id })) || [];
    setFormData({
      book_id: book.book_id,
      name: book.name || "",
      category_id: book.category_id || "",
      quantity: book.quantity || 1,
      sale_price: book.sale_price || "",
      BookCopies: existingCopies,
    });
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = (book_id) => {
    setBookToDelete(book_id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (bookToDelete) {
      try {
        await deleteBookMutation.mutateAsync(bookToDelete);
        setShowDeleteConfirm(false);
        setBookToDelete(null);
      } catch (error) {
        if (error.status === 405) {
          alert(
            "Book deletion is not supported by the API. The Books endpoint may be read-only.",
          );
        } else if (error.status === 400) {
          alert(
            "This book cannot be deleted because it has related reservations, sales, or transactions.",
          );
        } else {
          alert(
            `Failed to delete book: ${error.message || "Please try again."}`,
          );
        }
        setShowDeleteConfirm(false);
        setBookToDelete(null);
      }
    }
  };

  const handleView = (book) => {
    setSelectedBook(book);
    setShowViewDetails(true);
  };

  const buttonBehaviour = () => {
    setFormData({
      book_id: "",
      name: "",
      category_id: "",
      quantity: "",
      sale_price: "",
      BookCopies: [],
    });
    setEditMode(false);
    setShowPopup(true);
  };

  const getCreatorName = (createdById) => {
    if (!createdById) return { name: "N/A", role: "Not recorded" };
    const creator = users.find((u) => u.user_id === createdById);
    return creator
      ? { name: creator.name, role: creator.role }
      : { name: createdById, role: "Unknown" };
  };

  const filteredBooks = searchValue
    ? books.filter((book) => {
        const name = book.name || "";
        const book_id = book.book_id || "";
        return (
          name.toLowerCase().includes(searchValue.toLowerCase()) ||
          book_id.toString().includes(searchValue)
        );
      })
    : books;

  const getAvailableCopiesCount = (bookId) => {
    const copies = bookCopies.filter((copy) => copy.book_id === bookId);
    if (!copies.length) return 0;

    // Count active transactions for these copies
    // Robust check: match copy ID or parent book ID, and ensure transaction is active
    // Count active transactions for these copies
    // Robust check: match copy ID or parent book ID, and ensure transaction is active
    const activeTransactions = transactions.filter((t) => {
      if (!t || !t.book_id) return false;
      const txBookId = String(t.book_id).trim();

      // Match against copy ID (string) or parent book ID (int->string)
      const isRelevant =
        copies.some((c) => String(c.book_copy_id).trim() == txBookId) ||
        String(bookId).trim() == txBookId;

      if (!isRelevant) return false;

      const type = (t.transaction_type || "").toLowerCase().trim();
      const status = (t.status || "").toLowerCase().trim();

      // "Open", "Active", "Approved" -> Active loan.
      // "Check-Out", "Borrow" -> Lending transaction.
      // Also check "Completed" if return_date is missing (implies ongoing loan per system convention)
      const isCompletedActive = status === "completed" && !t.return_date;
      const isActiveStatus =
        ["open", "active", "approved", "overdue"].includes(status) ||
        isCompletedActive;
      const isLendingType = ["check-out", "borrow"].includes(type);

      return isLendingType && isActiveStatus;
    });

    // console.log(`Book ${bookId}: Total Copies=${copies.length}, Active Loans=${activeTransactions.length}, Available=${Math.max(0, copies.length - activeTransactions.length)}`);

    return Math.max(0, copies.length - activeTransactions.length);
  };

  const title = "Book Management";
  const buttonText = "Add Book";
  const columns = [
    { header: "ID", accessor: "book_id" },
    { header: "Name", accessor: "name" },
    {
      header: "Category",
      accessor: "category_id",
      render: (book) =>
        categories.find((cat) => cat.category_id === book.category_id)
          ?.category_name || "N/A",
    },
    {
      header: "Quantity",
      accessor: "quantity",
      render: (book) => getAvailableCopiesCount(book.book_id),
    },
    {
      header: "Availability",
      accessor: "availability",
      render: (book) => {
        const availableCount = getAvailableCopiesCount(book.book_id);
        // Consolidate "Reference Only" and "Borrowed" into "Not Available"
        // If quantity <= 1, it's Reference Only -> Not Available (for borrowing)
        // If availableCount == 0, it's Borrowed -> Not Available
        // If availableCount is 1 or less, it's considered Reference Only -> Not Available for lending
        if (availableCount <= 1) {
          return "Not Available";
        }
        return "Available";
      },
    },
    ...(isSuperAdmin ? [{ header: "Action", accessor: "action" }] : []),
  ];

  const formPopup = (
    <BookFormPopup
      showPopup={showPopup}
      editMode={editMode}
      formData={formData}
      setFormData={setFormData}
      handleAddBook={handleAddBook}
      setShowPopup={setShowPopup}
      setEditMode={setEditMode}
      categories={categories}
    />
  );

  return (
    <>
      <CommonLayout
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        buttonBehaviour={buttonBehaviour}
        isLoading={isLoading || isLoadingCategories}
        data={filteredBooks}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleView={handleView}
        title={title}
        buttonText={buttonText}
        columns={columns}
        formPopup={formPopup}
      />
      <DeleteConfirmationPopup
        show={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setBookToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Book"
        showNFCInput={true}
      />
      <ViewDetailsPopup
        show={showViewDetails}
        onClose={() => {
          setShowViewDetails(false);
          setSelectedBook(null);
        }}
        title="View Book"
        data={
          selectedBook
            ? {
                "Book ID": selectedBook.book_id,
                Name: selectedBook.name,
                Category:
                  categories.find(
                    (cat) => cat.category_id === selectedBook.category_id,
                  )?.category_name || "N/A",
                Quantity: selectedBook.quantity,
                Availability: (() => {
                  const availableCount = getAvailableCopiesCount(
                    selectedBook.book_id,
                  );
                  if (availableCount <= 1) {
                    return "Not Available";
                  }
                  return "Available";
                })(),
              }
            : null
        }
        savedBy={selectedBook ? getCreatorName(selectedBook.created_by) : null}
      ></ViewDetailsPopup>
    </>
  );
}

export default Books;
