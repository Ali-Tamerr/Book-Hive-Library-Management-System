import { useState, useEffect } from 'react';
import { Plus, FilePenLine, Trash2 } from 'lucide-react';
import { 
  useCategories, 
  useCreateCategory, 
  useUpdateCategory, 
  useDeleteCategory 
} from '../hooks/useCategories';
import CategoryFormPopup from '../components/CategoryFormPopup.jsx';

function Categories({ searchValue, setActiveTab }) {
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
      // Transform form data to API format (snake_case)
      const apiData = {
        category_name: formData.name,
        category_description: formData.description
      };
      
      if (editMode && formData.id) {
        await updateCategoryMutation.mutateAsync({ id: formData.id, data: apiData });
      } else {
        await createCategoryMutation.mutateAsync(apiData);
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
      id: category.category_id || category.id,
      name: category.category_name || category.name || '',
      description: category.category_description || category.description || ''
    });
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategoryMutation.mutateAsync(id);
      } catch (error) {
        alert(`Failed to delete category: ${error.message || 'Unknown error'}. Please try again.`);
      }
    }
  };

  const filteredCategories = searchValue
    ? categories.filter(
        (category) => {
          const name = category.category_name || category.name || '';
          const description = category.category_description || category.description || '';
          return name.toLowerCase().includes(searchValue.toLowerCase()) ||
                 description.toLowerCase().includes(searchValue.toLowerCase());
        }
      )
    : categories;

  return (
    <>
        <section className="flex-1 h-full bg-white mx-6 my-5 rounded-lg p-5 border-2 border-[#c7d5f2] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold max-[856px]:text-sm ">Category Management</h2>
            <button
              onClick={() => {
                setFormData({ name: '', description: '' });
                setEditMode(false);
                setShowPopup(true);
              }}
              className="bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors text-sm font-medium flex items-center gap-2 max-[856px]:scale-90"
            >
              <Plus size={15}/> Add Category
            </button>
          </div>

          <div className="overflow-x-auto flex-1 h-full">
            <table className="w-full border-collapse text-left text-sm min-w-max">
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
                    <tr key={category.category_id || category.id} className="border-b border-gray-200">
                      <td className="p-3">{category.category_id || category.id}</td>
                      <td className="p-3">{category.category_name || category.name || ''}</td>
                      <td className="p-3">{category.category_description || category.description || ''}</td>
                      <td className="p-3">
                        <button 
                          onClick={() => handleEdit(category)}
                          className="mr-2 text-lg hover:scale-125 transition-transform" 
                          title="Edit"><FilePenLine size={20}/></button>
                        <button 
                          onClick={() => handleDelete(category.category_id || category.id)}
                          className="mr-2 text-lg hover:scale-125 transition-transform" 
                          title="Delete"><Trash2 size={20}/></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
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
