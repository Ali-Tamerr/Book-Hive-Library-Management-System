import Popup from './Popup.jsx';

function CategoryFormPopup({ showPopup, editMode, formData, setFormData, handleAddCategory, setShowPopup, setEditMode }) {
  return (
    <Popup show={showPopup} onClose={() => { setShowPopup(false); setEditMode(false); }} title={editMode ? 'Edit Category' : 'Add New Category'}>
      <form onSubmit={handleAddCategory} className="space-y-3">
        <div>
          <label className="text-sm font-medium block">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block">Description</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter description"
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

export default CategoryFormPopup;