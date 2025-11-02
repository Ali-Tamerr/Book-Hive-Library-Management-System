import DashboardLayout from '../layouts/DashboardLayout';
import { useState } from 'react';
import { 
  useBranches, 
  useCreateBranch, 
  useUpdateBranch, 
  useDeleteBranch 
} from '../hooks/useBranches';

function Branches({ searchValue }) {
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  const [formData, setFormData] = useState({ 
    name: '', 
    location: ''
  });

  const { data: branches = [], isLoading } = useBranches();
  const createBranchMutation = useCreateBranch();
  const updateBranchMutation = useUpdateBranch();
  const deleteBranchMutation = useDeleteBranch();

  const handleAddBranch = async (e) => {
    e.preventDefault();
    try {
      if (editMode && formData.id) {
        await updateBranchMutation.mutateAsync({ id: formData.id, data: formData });
      } else {
        await createBranchMutation.mutateAsync(formData);
      }
      setFormData({ name: '', location: '' });
      setShowPopup(false);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save branch:", error);
      alert('Failed to save branch. Please try again.');
    }
  };

  const handleEdit = (branch) => {
    setFormData({
      id: branch.id,
      name: branch.name || '',
      location: branch.location || ''
    });
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      try {
        await deleteBranchMutation.mutateAsync(id);
      } catch (error) {
        alert('Failed to delete branch. Please try again.');
      }
    }
  };

  const filteredBranches = searchValue
    ? branches.filter(
        (branch) =>
          branch.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
          branch.location?.toLowerCase().includes(searchValue.toLowerCase())
      )
    : branches;

  return (
    <>
      <DashboardLayout activeTab="branches">
        <section className="flex-1 bg-white mx-6 my-5 rounded-lg p-5 border-2 border-[#c7d5f2] overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Branch Management</h2>
            <button
              onClick={() => {
                setFormData({ name: '', location: '' });
                setEditMode(false);
                setShowPopup(true);
              }}
              className="bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors text-sm font-medium"
            >
              ➕ Add Branch
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr>
                  <th className="p-3 border-b border-gray-300 font-semibold">ID</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">Name</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">Location</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="4" className="p-3 text-center text-gray-500">Loading...</td>
                  </tr>
                ) : filteredBranches.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-3 text-center text-gray-500">No branches found</td>
                  </tr>
                ) : (
                  filteredBranches.map((branch) => (
                    <tr key={branch.id} className="border-b border-gray-200">
                      <td className="p-3">{branch.id}</td>
                      <td className="p-3">{branch.name}</td>
                      <td className="p-3">{branch.location}</td>
                      <td className="p-3">
                        <button 
                          onClick={() => handleEdit(branch)}
                          className="mr-2 text-lg hover:scale-125 transition-transform" 
                          title="Edit">✏️</button>
                        <button 
                          onClick={() => handleDelete(branch.id)}
                          className="mr-2 text-lg hover:scale-125 transition-transform" 
                          title="Delete">🗑️</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </DashboardLayout>
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 max-w-[400px] rounded-lg p-5 border-2 border-[#0b0b3b]" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-center mb-5 text-lg text-[#0b0b3b]">{editMode ? 'Edit Branch' : 'Add New Branch'}</h3>
            <form onSubmit={handleAddBranch} className="space-y-3">
              <label className="text-sm font-medium block">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <label className="text-sm font-medium block">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter location"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
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
          </div>
        </div>
      )}
    </>
  );
}

export default Branches;
