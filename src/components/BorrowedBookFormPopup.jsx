import Popup from './Popup.jsx';

function BorrowedBookFormPopup({ showPopup, editMode, formData, setFormData, handleAddBorrowedBook, setShowPopup, setEditMode }) {
  return (
    <Popup show={showPopup} onClose={() => { setShowPopup(false); setEditMode(false); }} title={editMode ? 'Edit Borrowed Book' : 'Add New Borrowed Book'}>
      <form onSubmit={handleAddBorrowedBook} className="space-y-3">
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
          <label className="text-sm font-medium block">Borrow Date</label>
          <input
            type="date"
            value={formData.borrow_date}
            onChange={(e) => setFormData({ ...formData, borrow_date: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block">Due Date</label>
          <input
            type="date"
            value={formData.due_date}
            onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block">Return Date</label>
          <input
            type="date"
            value={formData.return_date}
            onChange={(e) => setFormData({ ...formData, return_date: e.target.value })}
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

export default BorrowedBookFormPopup;