import { useState } from 'react';
import {
  useBookSales,
  useCreateBookSale,
  useUpdateBookSale,
  useDeleteBookSale
} from '../hooks/useBookSales.js';
import BoughtBookFormPopup from '../components/BoughtBookFormPopup.jsx';
import CommonLayout from '../Layouts/CommonLayout.jsx';

function BoughtBooks({ searchValue, customTitle, hideButton = false }) {
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    book_id: '',
    user_id: '',
    sale_date: '',
    price: ''
  });

  const { data: bookSales = [], isLoading } = useBookSales();
  const createBookSaleMutation = useCreateBookSale();
  const updateBookSaleMutation = useUpdateBookSale();
  const deleteBookSaleMutation = useDeleteBookSale();

  const handleAddBookSale = async (e) => {
    e.preventDefault();
    try {
      if (editMode && formData.id) {
        await updateBookSaleMutation.mutateAsync({ id: formData.id, data: formData });
      } else {
        await createBookSaleMutation.mutateAsync(formData);
      }
      setFormData({ book_id: '', user_id: '', sale_date: '', price: '' });
      setShowPopup(false);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save book sale:", error);
      alert('Failed to save book sale. Please try again.');
    }
  };

  const handleEdit = (sale) => {
    setFormData({
      id: sale.id,
      book_id: sale.book_id || '',
      user_id: sale.user_id || '',
      sale_date: sale.sale_date || '',
      price: sale.price || ''
    });
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await deleteBookSaleMutation.mutateAsync(id);
      } catch (error) {
        alert('Failed to delete record. Please try again.');
      }
    }
  };

  const handleButtonClick = () => {
    setFormData({ book_id: '', user_id: '', sale_date: '', price: '' });
    setEditMode(false);
    setShowPopup(true);
  };

  const filteredBookSales = searchValue
    ? bookSales.filter(
      (sale) =>
        sale.book_title?.toLowerCase().includes(searchValue.toLowerCase()) ||
        sale.user_name?.toLowerCase().includes(searchValue.toLowerCase())
    )
    : bookSales;

  const columns = [
    { header: 'Book Title', accessor: 'book_title' },
    { header: 'User Name', accessor: 'user_name' },
    { header: 'Sale Date', accessor: 'sale_date' },
    { header: 'Price', accessor: 'price' },
    { header: 'Action', accessor: 'action' },
  ];

  const formPopupComponent = (
    <BoughtBookFormPopup
      showPopup={showPopup}
      editMode={editMode}
      formData={formData}
      setFormData={setFormData}
      handleAddBookSale={handleAddBookSale}
      setShowPopup={setShowPopup}
      setEditMode={setEditMode}
    />
  );

  return (
    <CommonLayout
      searchValue={searchValue}
      buttonBehaviour={handleButtonClick}
      isLoading={isLoading}
      data={filteredBookSales}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      title="Bought Books"
      buttonText={hideButton ? "" : "Add Book Sale"}
      columns={columns}
      formPopup={formPopupComponent}
      customTitle={customTitle}
    />
  );
}

export default BoughtBooks;