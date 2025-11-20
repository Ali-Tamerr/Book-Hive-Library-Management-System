import { useState, useEffect } from 'react';
import { 
  useCategories, 
  useCreateCategory, 
  useUpdateCategory, 
  useDeleteCategory 
} from '../hooks/useCategories.js';
import CategoryFormPopup from '../components/CategoryFormPopup.jsx';
import CommonLayout from '../Layouts/CommonLayout.jsx';

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

  const buttonBehaviour = () => {
    setFormData({ name: '', description: '' });
    setEditMode(false);
    setShowPopup(true);
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

  const title = "Category Management";
  const buttonText = "Add Category";
  const columns = [
    { header: 'ID', accessor: 'category_id' },
    { header: 'Name', accessor: 'category_name' },
    { header: 'Description', accessor: 'category_description' },
    { header: 'Action', accessor: 'action' },
  ];

  const formPopup = (
    <CategoryFormPopup 
      showPopup={showPopup} 
      editMode={editMode} 
      formData={formData} 
      setFormData={setFormData} 
      handleAddCategory={handleAddCategory} 
      setShowPopup={setShowPopup} 
      setEditMode={setEditMode} 
    />
  );

  return (
    <CommonLayout
      searchValue={searchValue}
      buttonBehaviour={buttonBehaviour}
      isLoading={isLoading}
      data={filteredCategories}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      title={title}
      buttonText={buttonText}
      columns={columns}
      formPopup={formPopup}
    />
  );
}

export default Categories;
