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
    sale_id: '',
    user_id: '',
    book_id: '',
    transaction_id: '',
    price: '',
    sale_date: ''
  });

  const { data: bookSales = [], isLoading } = useBookSales();
  const createBookSaleMutation = useCreateBookSale();
  const updateBookSaleMutation = useUpdateBookSale();
  const deleteBookSaleMutation = useDeleteBookSale();

  const handleAddBookSale = async (e) => {
    e.preventDefault();
    try {
      const apiData = {
        user_id: formData.user_id,
        book_id: formData.book_id,
        transaction_id: formData.transaction_id ? parseInt(formData.transaction_id, 10) : null,
        price: parseFloat(formData.price),
        sale_date: formData.sale_date || null
      };

      if (editMode && formData.sale_id) {
        await updateBookSaleMutation.mutateAsync({ id: formData.sale_id, data: apiData });
      } else {
        await createBookSaleMutation.mutateAsync(apiData);
      }
      setFormData({ sale_id: '', user_id: '', book_id: '', transaction_id: '', price: '', sale_date: '' });
      setShowPopup(false);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save book sale:", error);
      alert('Failed to save book sale. Please try again.');
    }
  };

  const handleEdit = (sale) => {
    setFormData({
      sale_id: sale.sale_id || sale.id,
      user_id: sale.user_id || '',
      book_id: sale.book_id || '',
      transaction_id: sale.transaction_id || '',
      price: sale.price || '',
      sale_date: sale.sale_date || ''
    });
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this sale record?')) {
      try {
        await deleteBookSaleMutation.mutateAsync(id);
      } catch (error) {
        alert('Failed to delete sale record. Please try again.');
      }
    }
  };

  const handleButtonClick = () => {
    setFormData({ sale_id: '', user_id: '', book_id: '', transaction_id: '', price: '', sale_date: '' });
    setEditMode(false);
    setShowPopup(true);
  };

  const filteredBookSales = searchValue
    ? bookSales.filter(
      (sale) =>
        sale.book_title?.toLowerCase().includes(searchValue.toLowerCase()) ||
        sale.user_name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        sale.sale_id?.toString().includes(searchValue)
    )
    : bookSales;

  const columns = [
    { header: 'Sale ID', accessor: 'sale_id' },
    { header: 'Book Title', accessor: 'book_title' },
    { header: 'User Name', accessor: 'user_name' },
    { header: 'Transaction ID', accessor: 'transaction_id' },
    { header: 'Price', accessor: 'price' },
    { header: 'Sale Date', accessor: 'sale_date' },
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
      title={customTitle || "Book Sales"}
      buttonText={hideButton ? "" : "Add Book Sale"}
      columns={columns}
      formPopup={formPopupComponent}
      customTitle={customTitle}
    />
  );
}

export default BoughtBooks;