import { useState } from "react";
import {
  useBookManagement,
  useCreateBook,
  useUpdateBook,
  useDeleteBook,
  bookKeys,
} from "../hooks/useBooks.js";
import { useCategories } from "../hooks/useCategories.js";
import { useUsers } from "../hooks/useUsers.js";
import { useBookCopies } from "../hooks/useBookCopies.js";
import { useBorrowedBooks } from "../hooks/useBorrowedBooks.js";
import { useBranches } from "../hooks/useBranches.js";
import BookFormPopup from "../components/BookFormPopup.jsx";
import DeleteConfirmationPopup from "../components/DeleteConfirmationPopup.jsx";
import ViewDetailsPopup from "../components/ViewDetailsPopup.jsx";
import CommonLayout from "../Layouts/CommonLayout.jsx";
import { getCurrentUser } from "../services/auth.api";
import { getImageUrl } from "../services/api.config";
import { getBookById } from "../services/books.api";
import { useQueryClient } from "@tanstack/react-query";

function Books({ searchValue, setSearchValue }) {
  const queryClient = useQueryClient();
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

  const [isPopupLoading, setIsPopupLoading] = useState(false);
  const [isViewLoading, setIsViewLoading] = useState(false);

  const { data: books = [], isLoading } = useBookManagement();
  const { data: categories = [], isLoading: isLoadingCategories } =
    useCategories();
  const { data: usersData, isLoading: isLoadingUsers } = useUsers();
  const users = usersData
    ? usersData.pages.flatMap((page) => page.data || [])
    : [];
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

  const handleEdit = async (book) => {
    // Open the popup immediately with a loading spinner
    setEditMode(true);
    setShowPopup(true);
    setIsPopupLoading(true);

    try {
      const fullBook = await queryClient.fetchQuery({
        queryKey: bookKeys.detail(book.book_id),
        queryFn: () => getBookById(book.book_id),
      });

      const existingCopies =
        fullBook.BookCopies?.map((c) => ({ book_copy_id: c.book_copy_id })) ||
        [];

      setFormData({
        book_id: fullBook.book_id,
        name: fullBook.name || "",
        category_id: fullBook.category_id || "",
        quantity: fullBook.quantity || 1,
        sale_price: fullBook.sale_price || "",
        BookCopies: existingCopies,
      });
    } catch (error) {
      console.error(error);
      alert("Failed to load full book details.");
      setShowPopup(false);
    } finally {
      setIsPopupLoading(false);
    }
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

  const handleView = async (book) => {
    setShowViewDetails(true);
    setIsViewLoading(true);
    setSelectedBook(null); // Clear previous selection

    try {
      const fullBook = await queryClient.fetchQuery({
        queryKey: bookKeys.detail(book.book_id),
        queryFn: () => getBookById(book.book_id),
      });
      setSelectedBook(fullBook);
    } catch (error) {
      console.error(error);
      alert("Failed to load full book data.");
      setShowViewDetails(false);
    } finally {
      setIsViewLoading(false);
    }
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

  const { data: branches = [] } = useBranches();

  const getUserBranchId = (user) => {
    if (!user) return null;
    const directBranchId = user.branch_id ?? user.branchId;
    if (directBranchId !== undefined && directBranchId !== null)
      return String(directBranchId).trim();
    const nestedBranchId = user.branch?.branch_id ?? user.branch?.id;
    if (nestedBranchId !== undefined && nestedBranchId !== null)
      return String(nestedBranchId).trim();
    return null;
  };

  const currentUserBranchId = getUserBranchId(currentUser);

  const getBookBranchLabel = (bookId) => {
    const relatedCopies = bookCopies.filter((copy) => copy.book_id === bookId);
    if (relatedCopies.length === 0) return "N/A";

    const uniqueBranchNames = [
      ...new Set(
        relatedCopies
          .map((copy) => {
            const matchedBranch = branches.find(
              (branch) => String(branch.branch_id) === String(copy.branch_id),
            );
            return matchedBranch?.name || null;
          })
          .filter(Boolean),
      ),
    ];

    return uniqueBranchNames.length > 0 ? uniqueBranchNames.join(", ") : "N/A";
  };

  // Filter books based on branch and search value
  const filteredBooks = books.filter((book) => {
    // 1. Filter by Branch (Permission)
    if (!isSuperAdmin) {
      if (!currentUserBranchId) return false; // If admin has no branch, show nothing? Or all? Assuming restricted.

      // Check if this book has ANY copy in the current user's branch
      const hasCopyWithBranch = bookCopies.some(
        (copy) =>
          copy.book_id === book.book_id &&
          String(copy.branch_id).trim() === String(currentUserBranchId).trim(),
      );

      if (!hasCopyWithBranch) return false;
    }

    // 2. Filter by Search (Search bar)
    if (searchValue) {
      const name = book.name || "";
      const book_id = book.book_id || "";
      return (
        name.toLowerCase().includes(searchValue.toLowerCase()) ||
        book_id.toString().includes(searchValue)
      );
    }

    return true;
  });

  const getAvailableCopiesCount = (bookId) => {
    // Filter copies by book ID AND by branch (if not Super Admin)
    const copies = bookCopies.filter((copy) => {
      const isBookMatch = copy.book_id === bookId;
      if (!isSuperAdmin && currentUserBranchId) {
        return (
          isBookMatch &&
          String(copy.branch_id).trim() === String(currentUserBranchId).trim()
        );
      }
      return isBookMatch;
    });

    if (!copies.length) return 0;

    // Count active transactions for these SPECIFIC copies
    const activeTransactions = transactions.filter((t) => {
      if (!t || !t.book_id) return false;
      const txBookId = String(t.book_id).trim();

      // Ensure transaction matches one of the valid copies we just filtered
      const isRelevant = copies.some(
        (c) => String(c.book_copy_id).trim() == txBookId,
      );

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

    return Math.max(0, copies.length - activeTransactions.length);
  };

  const title = "Book Management";
  const buttonText = isSuperAdmin ? "Add Book" : null;
  const columns = [
    // { header: "ID", accessor: "book_id" },
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
      isLoading={isPopupLoading}
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
        title={isViewLoading ? "LOADING INFO..." : "View Book"}
        imageUrl={selectedBook ? getImageUrl(selectedBook.image_url) : null}
        imageAlt={selectedBook?.name || "Book cover"}
        data={
          isViewLoading || !selectedBook
            ? null
            : {
                "Book ID": selectedBook.book_id,
                Name: selectedBook.name,
                ...(selectedBook.author ? { Author: selectedBook.author } : {}),
                Branch: getBookBranchLabel(selectedBook.book_id),
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
        }
        savedBy={selectedBook ? getCreatorName(selectedBook.created_by) : null}
      >
        {isViewLoading && (
          <div className="flex h-40 w-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0b0c28] border-t-transparent dark:border-white"></div>
          </div>
        )}
      </ViewDetailsPopup>
    </>
  );
}

export default Books;
