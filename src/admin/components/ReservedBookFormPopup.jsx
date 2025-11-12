import Popup from './Popup.jsx';

function ReservedBookFormPopup({ showPopup, editMode, formData, setFormData, handleAddReservation, setShowPopup, setEditMode }) {
  return (
    <Popup show={showPopup} onClose={() => { setShowPopup(false); setEditMode(false); }} title={editMode ? 'Edit Reservation' : 'Add New Reservation'}>
      <form onSubmit={handleAddReservation} className="space-y-3">
        <div>
          <label className="text-sm font-medium block">Book ID</label>
          <input
            type="text"
            value={formData.book_id}
            onChange={(e) => setFormData({ ...formData, book_id: e.target.value })}
            placeholder="Enter book ID"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block">User ID</label>
          <input
            type="text"
            value={formData.user_id}
            onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
            placeholder="Enter user ID"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block">Reservation Date</label>
          <input
            type="date"
            value={formData.reservation_date}
            onChange={(e) => setFormData({ ...formData, reservation_date: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div className="flex justify-between mt-5">
          <button
            type="submit"
            className="bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors font-semibold"
          >
            {editMode ? 'Update' : 'Add'}
          </button>
          <button
            type="button"
            onClick={() => {
              setShowPopup(false);
              setEditMode(false);
            }}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </Popup>
  );
}

export default ReservedBookFormPopup;