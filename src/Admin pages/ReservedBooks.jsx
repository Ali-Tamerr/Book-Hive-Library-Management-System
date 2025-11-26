import { useState } from 'react';
import {
  useReservations,
  useCreateReservation,
  useUpdateReservation,
  useDeleteReservation
} from '../hooks/useReservations.js';
import ReservedBookFormPopup from '../components/ReservedBookFormPopup.jsx';
import CommonLayout from '../Layouts/CommonLayout.jsx';

function ReservedBooks({ searchValue, customTitle, hideButton = false }) {
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      try {
        await deleteReservationMutation.mutateAsync(id);
      } catch (error) {
        alert('Failed to delete reservation. Please try again.');
      }
    }
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
    <CommonLayout
      searchValue={searchValue}
      buttonBehaviour={handleButtonClick}
      isLoading={isLoading}
      data={filteredReservations}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      title={customTitle || "Book Reservations"}
      buttonText={hideButton ? "" : "Add Reservation"}
      columns={columns}
      formPopup={formPopupComponent}
      customTitle={customTitle}
    />
  );
}

export default ReservedBooks;