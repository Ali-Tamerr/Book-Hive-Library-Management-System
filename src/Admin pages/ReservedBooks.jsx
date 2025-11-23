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
    book_id: '',
    user_id: '',
    reservation_date: ''
  });

  const { data: reservations = [], isLoading } = useReservations();
  const createReservationMutation = useCreateReservation();
  const updateReservationMutation = useUpdateReservation();
  const deleteReservationMutation = useDeleteReservation();

  const handleAddReservation = async (e) => {
    e.preventDefault();
    try {
      if (editMode && formData.id) {
        await updateReservationMutation.mutateAsync({ id: formData.id, data: formData });
      } else {
        await createReservationMutation.mutateAsync(formData);
      }
      setFormData({ book_id: '', user_id: '', reservation_date: '' });
      setShowPopup(false);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save reservation:", error);
      alert('Failed to save reservation. Please try again.');
    }
  };

  const handleEdit = (reservation) => {
    setFormData({
      id: reservation.id,
      book_id: reservation.book_id || '',
      user_id: reservation.user_id || '',
      reservation_date: reservation.reservation_date || ''
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
    setFormData({ book_id: '', user_id: '', reservation_date: '' });
    setEditMode(false);
    setShowPopup(true);
  };

  const filteredReservations = searchValue
    ? reservations.filter(
      (reservation) =>
        reservation.book_title?.toLowerCase().includes(searchValue.toLowerCase()) ||
        reservation.user_name?.toLowerCase().includes(searchValue.toLowerCase())
    )
    : reservations;

  const columns = [
    { header: 'Book Title', accessor: 'book_title' },
    { header: 'User Name', accessor: 'user_name' },
    { header: 'Reservation Date', accessor: 'reservation_date' },
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
      title="Reserved Books"
      buttonText={hideButton ? "" : "Add Reservation"}
      columns={columns}
      formPopup={formPopupComponent}
      customTitle={customTitle}
    />
  );
}

export default ReservedBooks;