import { useState } from "react";
import {
  useReservations,
  useCreateReservation,
  useUpdateReservation,
  useDeleteReservation,
} from "../hooks/useReservations.js";
import { useBooks } from "../hooks/useBooks.js";
import { useBookCopies } from "../hooks/useBookCopies.js";
import ReservedBookFormPopup from "../components/ReservedBookFormPopup.jsx";
import DeleteConfirmationPopup from "../components/DeleteConfirmationPopup.jsx";
import ViewDetailsPopup from "../components/ViewDetailsPopup.jsx";
import CommonLayout from "../Layouts/CommonLayout.jsx";

function ReservedBooks({
  searchValue,
  setSearchValue,
  customTitle,
  hideButton = false,
}) {
  // Search searches: Book Title, User Name, Reservation ID
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [formData, setFormData] = useState({
    reservation_id: "",
    user_id: "",
    book_id: "",
    reservation_date: "",
    expiration_date: "",
    status: "Active",
  });

  const { data: reservations = [], isLoading } = useReservations();
  const { data: books = [] } = useBooks();
  const { data: bookCopies = [] } = useBookCopies();
  const createReservationMutation = useCreateReservation();
  const updateReservationMutation = useUpdateReservation();
  const deleteReservationMutation = useDeleteReservation();

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

  const handleAddReservation = async (e) => {
    e.preventDefault();
    try {
      const apiData = {
        user_id: formData.user_id,
        book_id: formData.book_id,
        reservation_date: formData.reservation_date || null,
        expiration_date: formData.expiration_date,
        status: formData.status,
      };

      if (editMode && formData.reservation_id) {
        await updateReservationMutation.mutateAsync({
          id: formData.reservation_id,
          data: apiData,
        });
      } else {
        await createReservationMutation.mutateAsync(apiData);
      }
      setFormData({
        reservation_id: "",
        user_id: "",
        book_id: "",
        reservation_date: "",
        expiration_date: "",
        status: "Active",
      });
      setShowPopup(false);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save reservation:", error);
      alert("Failed to save reservation. Please try again.");
    }
  };

  const handleEdit = (reservation) => {
    setFormData({
      reservation_id: reservation.reservation_id || reservation.id,
      user_id: reservation.user_id || "",
      book_id: reservation.book_id || "",
      reservation_date: reservation.reservation_date || "",
      expiration_date: reservation.expiration_date || "",
      status: reservation.status || "Active",
    });
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = (id) => {
    setReservationToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (reservationToDelete) {
      try {
        await deleteReservationMutation.mutateAsync(reservationToDelete);
        setShowDeleteConfirm(false);
        setReservationToDelete(null);
      } catch (error) {
        alert("Failed to delete reservation. Please try again.");
        setShowDeleteConfirm(false);
        setReservationToDelete(null);
      }
    }
  };

  const handleView = (reservation) => {
    setSelectedReservation(reservation);
    setShowViewDetails(true);
  };

  const handleButtonClick = () => {
    setFormData({
      reservation_id: "",
      user_id: "",
      book_id: "",
      reservation_date: "",
      expiration_date: "",
      status: "Active",
    });
    setEditMode(false);
    setShowPopup(true);
  };

  const mappedReservations = reservations.map((reservation) => ({
    ...reservation,
    user_name: reservation.user
      ? `${reservation.user.first_name || ""} ${reservation.user.last_name || ""}`.trim()
      : "Unknown",
    book_title: getBookName(reservation.book_id),
  }));

  const filteredReservations = searchValue
    ? mappedReservations.filter(
        (reservation) =>
          reservation.book_title
            ?.toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          reservation.user_name
            ?.toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          reservation.reservation_id?.toString().includes(searchValue),
      )
    : mappedReservations;

  const columns = [
    { header: "Reservation ID", accessor: "reservation_id" },
    { header: "Book Title", accessor: "book_title" },
    { header: "User Name", accessor: "user_name" },
    { header: "Reservation Date", accessor: "reservation_date" },
    { header: "Expiration Date", accessor: "expiration_date" },
    {
      header: "Expiration Status",
      accessor: "expiration_status",
      render: (reservation) => {
        if (!reservation.expiration_date) {
          return (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
              No Deadline
            </span>
          );
        }
        const now = new Date();
        const expirationDate = new Date(reservation.expiration_date);
        const isExpired = now > expirationDate;

        return (
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              isExpired
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {isExpired ? "Expired" : "Active"}
          </span>
        );
      },
    },
    { header: "Status", accessor: "status" },
    { header: "Action", accessor: "action" },
  ];

  const formPopupComponent = (
    <ReservedBookFormPopup
      showPopup={showPopup}
      editMode={editMode}
      formData={formData}
      setFormData={setFormData}
      handleAddReservation={handleAddReservation}
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
        data={filteredReservations}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleView={handleView}
        title={customTitle || "Book Reservations"}
        buttonText={hideButton ? "" : "Add Reservation"}
        columns={columns}
        formPopup={formPopupComponent}
        customTitle={customTitle}
      />
      <DeleteConfirmationPopup
        show={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setReservationToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Reservation"
      />
      <ViewDetailsPopup
        show={showViewDetails}
        onClose={() => {
          setShowViewDetails(false);
          setSelectedReservation(null);
        }}
        variant="details"
        title="View Reservation"
        data={
          selectedReservation
            ? {
                "Reservation ID": selectedReservation.reservation_id,
                "Book Title": selectedReservation.book_title,
                "User Name": selectedReservation.user_name,
                "Reservation Date": selectedReservation.reservation_date,
                "Expiration Date": selectedReservation.expiration_date,
                Status: selectedReservation.status,
              }
            : null
        }
        savedBy={{
          name: "Admin User",
          role: "Admin",
        }}
      ></ViewDetailsPopup>
    </>
  );
}

export default ReservedBooks;
