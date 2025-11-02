import DashboardLayout from '../layouts/DashboardLayout';
import { useState } from 'react';
import { 
  useCategories, 
  useCreateCategory, 
  useUpdateCategory, 
  useDeleteCategory 
} from '../hooks/useCategories';
import CategoryFormPopup from '../components/CategoryFormPopup.jsx';

function Categories({ searchValue }) {
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  const [formData, setFormData] = useState({ 
    name: '', 
    description: ''
  });

  const { data: categories = [], isLoading } = useCategories();
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      if (editMode && formData.id) {
        await updateCategoryMutation.mutateAsync({ id: formData.id, data: formData });
      } else {
        await createCategoryMutation.mutateAsync(formData);
      }
      setFormData({ name: '', description: '' });
      setShowPopup(false);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save category:", error);
      alert('Failed to save category. Please try again.');
    }
  };

  const handleEdit = (category) => {
    setFormData({
      id: category.id,
      name: category.name || '',
      description: category.description || ''
    });
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategoryMutation.mutateAsync(id);
      } catch (error) {
        alert('Failed to delete category. Please try again.');
      }
    }
  };

  const filteredCategories = searchValue
    ? categories.filter(
        (category) =>
          category.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
          category.description?.toLowerCase().includes(searchValue.toLowerCase())
      )
    : categories;

  return (
    <>
      <DashboardLayout activeTab="categories">
        <section className="flex-1 bg-white mx-6 my-5 rounded-lg p-5 border-2 border-[#c7d5f2] overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Category Management</h2>
            <button
              onClick={() => {
                setFormData({ name: '', description: '' });
                setEditMode(false);
                setShowPopup(true);
              }}
              className="bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors text-sm font-medium"
            >
              ➕ Add Category
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr>
                  <th className="p-3 border-b border-gray-300 font-semibold">ID</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">Name</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">Description</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="4" className="p-3 text-center text-gray-500">Loading...</td>
                  </tr>
                ) : filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-3 text-center text-gray-500">No categories found</td>
                  </tr>
                ) : (
                  filteredCategories.map((category) => (
                    <tr key={category.id} className="border-b border-gray-200">
                      <td className="p-3">{category.id}</td>
                      <td className="p-3">{category.name}</td>
                      <td className="p-3">{category.description}</td>
                      <td className="p-3">
                        <button 
                          onClick={() => handleEdit(category)}
                          className="mr-2 text-lg hover:scale-125 transition-transform" 
                          title="Edit">✏️</button>
                        <button 
                          onClick={() => handleDelete(category.id)}
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
      <CategoryFormPopup 
        showPopup={showPopup} 
        editMode={editMode} 
        formData={formData} 
        setFormData={setFormData} 
        handleAddCategory={handleAddCategory} 
        setShowPopup={setShowPopup} 
        setEditMode={setEditMode} 
      />
    </>
  );
}

export default Categories;
