import { useState } from 'react';
import {
  useReservations,
  useCreateReservation,
  useUpdateReservation,
  useDeleteReservation
} from '../hooks/useReservations.js';
import ReservedBookFormPopup from '../components/ReservedBookFormPopup.jsx';
import DeleteConfirmationPopup from '../components/DeleteConfirmationPopup.jsx';
import ViewDetailsPopup from '../components/ViewDetailsPopup.jsx';
import CommonLayout from '../Layouts/CommonLayout.jsx';

function ReservedBooks({ searchValue, customTitle, hideButton = false }) {
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [formData, setFormData] = useState({
    reservation_id: '',
    user_id: '',
    book_id: '',
    reservation_date: '',
    expiration_date: '',
    status: 'Pending'
  });

  const { data: reservations = [], isLoading } = useReservations();
  const createReservationMutation = useCreateReservation();
  const updateReservationMutation = useUpdateReservation();
  const deleteReservationMutation = useDeleteReservation();

  const handleAddReservation = async (e) => {
    e.preventDefault();
    try {
      const apiData = {
        user_id: formData.user_id,
        book_id: formData.book_id,
        reservation_date: formData.reservation_date || null,
        expiration_date: formData.expiration_date,
        status: formData.status
      };

      if (editMode && formData.reservation_id) {
        await updateReservationMutation.mutateAsync({ id: formData.reservation_id, data: apiData });
      } else {
        await createReservationMutation.mutateAsync(apiData);
      }
      setFormData({ reservation_id: '', user_id: '', book_id: '', reservation_date: '', expiration_date: '', status: 'Pending' });
      setShowPopup(false);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save reservation:", error);
      alert('Failed to save reservation. Please try again.');
    }
  };

  const handleEdit = (reservation) => {
    setFormData({
      reservation_id: reservation.reservation_id || reservation.id,
      user_id: reservation.user_id || '',
      book_id: reservation.book_id || '',
      reservation_date: reservation.reservation_date || '',
      expiration_date: reservation.expiration_date || '',
      status: reservation.status || 'Pending'
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
        alert('Failed to delete reservation. Please try again.');
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
    setFormData({ reservation_id: '', user_id: '', book_id: '', reservation_date: '', expiration_date: '', status: 'Pending' });
    setEditMode(false);
    setShowPopup(true);
  };

  const filteredReservations = searchValue
    ? reservations.filter(
      (reservation) =>
        reservation.book_title?.toLowerCase().includes(searchValue.toLowerCase()) ||
        reservation.user_name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        reservation.reservation_id?.toString().includes(searchValue)
    )
    : reservations;

  const columns = [
    { header: 'Reservation ID', accessor: 'reservation_id' },
    { header: 'Book Title', accessor: 'book_title' },
    { header: 'User Name', accessor: 'user_name' },
    { header: 'Reservation Date', accessor: 'reservation_date' },
    { header: 'Expiration Date', accessor: 'expiration_date' },
    { header: 'Status', accessor: 'status' },
    { header: 'Action', accessor: 'action' },
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
        title="View Reservation"
        data={selectedReservation ? {
          'Reservation ID': selectedReservation.reservation_id,
          'Book Title': selectedReservation.book_title,
          'User Name': selectedReservation.user_name,
          'Reservation Date': selectedReservation.reservation_date,
          'Expiration Date': selectedReservation.expiration_date,
          'Status': selectedReservation.status
        } : null}
        savedBy={{
          name: 'Admin User',
          role: 'Admin'
        }}
      >
      </ViewDetailsPopup>
    </>
  );
}

export default ReservedBooks;