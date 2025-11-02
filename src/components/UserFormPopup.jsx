import Popup from './Popup.jsx';

function UserFormPopup({ showPopup, editMode, formData, setFormData, handleAddUser, setShowPopup, setEditMode }) {
  return (
    <Popup show={showPopup} onClose={() => { setShowPopup(false); setEditMode(false); }} title={editMode ? 'Edit User' : 'Add New User'}>
      <form onSubmit={handleAddUser} className="space-y-3">
        <div>
          <label className="text-sm font-medium block">First Name</label>
          <input
            type="text"
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            placeholder="Enter first name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block">Last Name</label>
          <input
            type="text"
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            placeholder="Enter last name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block">Phone Number</label>
          <input
            type="text"
            value={formData.phone_number}
            onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
            placeholder="Enter phone number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        {!editMode && (
          <div>
            <label className="text-sm font-medium block">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        )}
        <div>
          <label className="text-sm font-medium block">Role</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="Student">Student</option>
            <option value="Admin">Admin</option>
          </select>
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

export default UserFormPopup;