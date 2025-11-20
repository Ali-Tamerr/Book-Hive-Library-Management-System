import { useState } from 'react';
import { Plus, FilePenLine, Trash2 } from 'lucide-react';
import { 
  useReservations, 
  useCreateReservation, 
  useUpdateReservation, 
  useDeleteReservation 
} from '../hooks/useReservations';
import ReservedBookFormPopup from '../../components/ReservedBookFormPopup.js';

function ReservedBooks({ searchValue }) {
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

  const filteredReservations = searchValue
    ? reservations.filter(
        (reservation) =>
          reservation.book_title?.toLowerCase().includes(searchValue.toLowerCase()) ||
          reservation.user_name?.toLowerCase().includes(searchValue.toLowerCase())
      )
    : reservations;

  return (
<div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Reserved Books</h2>
        <button
          onClick={() => {
            setFormData({ book_id: '', user_id: '', reservation_date: '' });
            setEditMode(false);
            setShowPopup(true);
          }}
          className="bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors text-sm font-medium flex items-center gap-2"
        >
          <Plus size={15}/> Add Reservation
        </button>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full border-collapse text-left text-sm min-w-max">
          <thead>
            <tr>
              <th className="p-3 border-b border-gray-300 font-semibold">Book Title</th>
              <th className="p-3 border-b border-gray-300 font-semibold">User Name</th>
              <th className="p-3 border-b border-gray-300 font-semibold">Reservation Date</th>
              <th className="p-3 border-b border-gray-300 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">Loading...</td>
              </tr>
            ) : filteredReservations.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">No reservations found</td>
              </tr>
            ) : (
              filteredReservations.map((reservation) => (
                <tr key={reservation.id} className="border-b border-gray-200">
                  <td className="p-3">{reservation.book_title}</td>
                  <td className="p-3">{reservation.user_name}</td>
                  <td className="p-3">{reservation.reservation_date}</td>
                  <td className="p-3">
                    <button 
                      onClick={() => handleEdit(reservation)}
                      className="mr-2 text-lg hover:scale-125 transition-transform" 
                      title="Edit"><FilePenLine size={20}/></button>
                    <button 
                      onClick={() => handleDelete(reservation.id)}
                      className="mr-2 text-lg hover:scale-125 transition-transform" 
                      title="Delete"><Trash2 size={20}/></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ReservedBookFormPopup 
        showPopup={showPopup} 
        editMode={editMode} 
        formData={formData} 
        setFormData={setFormData} 
        handleAddReservation={handleAddReservation} 
        setShowPopup={setShowPopup} 
        setEditMode={setEditMode} 
      />
    </div>
  );
}

export default ReservedBooks;