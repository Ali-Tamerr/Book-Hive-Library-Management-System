import { useState, useEffect } from "react";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "../hooks/useCategories.js";
import { useUsers } from "../hooks/useUsers.js";
import CategoryFormPopup from "../components/CategoryFormPopup.jsx";
import DeleteConfirmationPopup from "../components/DeleteConfirmationPopup.jsx";
import ViewDetailsPopup from "../components/ViewDetailsPopup.jsx";
import CommonLayout from "../Layouts/CommonLayout.jsx";
import { getCurrentUser } from "../services/auth.api";

import { useBooks } from "../hooks/useBooks.js";

function Categories({ searchValue, setSearchValue }) {
  const currentUser = getCurrentUser();
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteWarning, setDeleteWarning] = useState(null);
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const { data: categories = [], isLoading } = useCategories();
  const { data: books = [] } = useBooks();
  const { data: usersData } = useUsers();
  const users = usersData
    ? usersData.pages.flatMap((page) => page.data || [])
    : [];
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const apiData = {
        category_name: formData.name,
        category_description: formData.description,
        created_by: currentUser?.user_id || null,
      };

      if (editMode && formData.id) {
        await updateCategoryMutation.mutateAsync({
          id: formData.id,
          data: apiData,
        });
      } else {
        await createCategoryMutation.mutateAsync(apiData);
      }
      setFormData({ name: "", description: "" });
      setShowPopup(false);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save category:", error);
      alert("Failed to save category. Please try again.");
    }
  };

  const handleEdit = (category) => {
    setFormData({
      id: category.category_id || category.id,
      name: category.category_name || category.name || "",
      description: category.category_description || category.description || "",
    });
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = (id) => {
    setCategoryToDelete(id);

    // Check if any book uses this category
    const linkedBooks = books.filter((book) => book.category_id === id);
    if (linkedBooks.length > 0) {
      setDeleteWarning(
        `Cannot delete this category because it is linked to ${linkedBooks.length} book(s).`,
      );
      setIsDeleteDisabled(true);
    } else {
      setDeleteWarning(null);
      setIsDeleteDisabled(false);
    }

    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (categoryToDelete && !isDeleteDisabled) {
      try {
        await deleteCategoryMutation.mutateAsync(categoryToDelete);
        setShowDeleteConfirm(false);
        setCategoryToDelete(null);
      } catch (error) {
        alert(
          `Failed to delete category: ${error.message || "Unknown error"}. Please try again.`,
        );
        setShowDeleteConfirm(false);
        setCategoryToDelete(null);
      }
    }
  };

  const handleView = (category) => {
    setSelectedCategory(category);
    setShowViewDetails(true);
  };

  const buttonBehaviour = () => {
    setFormData({ name: "", description: "" });
    setEditMode(false);
    setShowPopup(true);
  };

  const getCreatorName = (createdById) => {
    if (!createdById) return { name: "N/A", role: "Not recorded" };
    const creator = users.find((u) => u.user_id === createdById);
    return creator
      ? { name: creator.name, role: creator.role }
      : { name: createdById, role: "Unknown" };
  };

  const filteredCategories = searchValue
    ? categories.filter((category) => {
        const name = category.category_name || category.name || "";
        const description =
          category.category_description || category.description || "";
        return (
          name.toLowerCase().includes(searchValue.toLowerCase()) ||
          description.toLowerCase().includes(searchValue.toLowerCase())
        );
      })
    : categories;

  const title = "Category Management";
  const buttonText = "Add Category";
  const columns = [
    // { header: 'ID', accessor: 'category_id' },
    { header: "Name", accessor: "category_name" },
    {
      header: "Bo Quantity",
      accessor: "book_count",
      render: (category) => {
        const count = books.filter(
          (b) => b.category_id === category.category_id,
        ).length;
        return <span className="text-sm font-medium">{count}</span>;
      },
    },
    { header: "Action", accessor: "action" },
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
    <>
      <CommonLayout
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        buttonBehaviour={buttonBehaviour}
        isLoading={isLoading}
        data={filteredCategories}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleView={handleView}
        title={title}
        buttonText={buttonText}
        columns={columns}
        formPopup={formPopup}
      />
      <DeleteConfirmationPopup
        show={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setCategoryToDelete(null);
          setDeleteWarning(null);
          setIsDeleteDisabled(false);
        }}
        onConfirm={confirmDelete}
        title="Delete Category"
        warningMessage={deleteWarning}
        isDeleteDisabled={isDeleteDisabled}
      />
      <ViewDetailsPopup
        show={showViewDetails}
        onClose={() => {
          setShowViewDetails(false);
          setSelectedCategory(null);
        }}
        title="View Category"
        data={
          selectedCategory
            ? {
                "Category ID": selectedCategory.category_id,
                Name: selectedCategory.category_name,
              }
            : null
        }
        savedBy={
          selectedCategory ? getCreatorName(selectedCategory.created_by) : null
        }
      ></ViewDetailsPopup>
    </>
  );
}

export default Categories;
