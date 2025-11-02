import Popup from './Popup.jsx';

function BookFormPopup({ showPopup, editMode, formData, setFormData, handleAddBook, setShowPopup, setEditMode }) {
  return (
    <Popup show={showPopup} onClose={() => { setShowPopup(false); setEditMode(false); }} title={editMode ? 'Edit Book' : 'Add New Book'} maxWidthClass="max-w-[700px]">
      <form onSubmit={handleAddBook} className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium block">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter title"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block">Author</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            placeholder="Enter author"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block">ISBN</label>
          <input
            type="text"
            value={formData.isbn}
            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
            placeholder="Enter ISBN"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block">Publisher</label>
          <input
            type="text"
            value={formData.publisher}
            onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
            placeholder="Enter publisher"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block">Publication Year</label>
          <input
            type="number"
            value={formData.publicationYear}
            onChange={(e) => setFormData({ ...formData, publicationYear: e.target.value })}
            placeholder="Enter publication year"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block">Category ID</label>
          <input
            type="number"
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            placeholder="Enter category ID"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block">Total Copies</label>
          <input
            type="number"
            value={formData.totalCopies}
            onChange={(e) => setFormData({ ...formData, totalCopies: e.target.value })}
            placeholder="Enter total copies"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block">Available Copies</label>
          <input
            type="number"
            value={formData.availableCopies}
            onChange={(e) => setFormData({ ...formData, availableCopies: e.target.value })}
            placeholder="Enter available copies"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block">Sale Price</label>
          <input
            type="number"
            value={formData.salePrice}
            onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
            placeholder="Enter sale price"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block">Digital URL</label>
          <input
            type="text"
            value={formData.digitalUrl}
            onChange={(e) => setFormData({ ...formData, digitalUrl: e.target.value })}
            placeholder="Enter digital URL"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div className="col-span-2">
          <label className="text-sm font-medium block">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter description"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div className="col-span-2 flex justify-between mt-5">
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

export default BookFormPopup;