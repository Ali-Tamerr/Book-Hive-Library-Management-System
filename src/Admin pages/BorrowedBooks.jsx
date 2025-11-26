import { useState } from 'react';
import {
  useBorrowedBooks,
  useCreateBorrowedBook,
  useUpdateBorrowedBook,
  useDeleteBorrowedBook
} from '../hooks/useBorrowedBooks.js';
import BorrowedBookFormPopup from '../components/BorrowedBookFormPopup.jsx';
import CommonLayout from '../Layouts/CommonLayout.jsx';

function BorrowedBooks({ searchValue, customTitle, hideButton = false }) {
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    transaction_id: '',
    user_id: '',
    book_id: '',
    rfid_tag_id: '',
    transaction_type: 'Borrow',
    due_date: '',
    return_date: '',
    fine_amount: '',
    status: 'Open',
    borrow_type: 'TakeHome'
  });

  const { data: borrowedBooks = [], isLoading } = useBorrowedBooks();
  const createBorrowedBookMutation = useCreateBorrowedBook();
  const updateBorrowedBookMutation = useUpdateBorrowedBook();
  const deleteBorrowedBookMutation = useDeleteBorrowedBook();

  const handleAddBorrowedBook = async (e) => {
    e.preventDefault();
    try {
      const apiData = {
        user_id: formData.user_id,
        book_id: formData.book_id,
        rfid_tag_id: formData.rfid_tag_id ? parseInt(formData.rfid_tag_id, 10) : null,
        transaction_type: formData.transaction_type,
        due_date: formData.due_date || null,
        return_date: formData.return_date || null,
        fine_amount: formData.fine_amount ? parseFloat(formData.fine_amount) : null,
        status: formData.status,
        borrow_type: formData.borrow_type || null
      };

      if (editMode && formData.transaction_id) {
        await updateBorrowedBookMutation.mutateAsync({ id: formData.transaction_id, data: apiData });
      } else {
        await createBorrowedBookMutation.mutateAsync(apiData);
      }
      setFormData({ transaction_id: '', user_id: '', book_id: '', rfid_tag_id: '', transaction_type: 'Borrow', due_date: '', return_date: '', fine_amount: '', status: 'Open', borrow_type: 'TakeHome' });
      setShowPopup(false);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save transaction:", error);
      alert('Failed to save transaction. Please try again.');
    }
  };

  const handleEdit = (transaction) => {
    setFormData({
      transaction_id: transaction.transaction_id || transaction.id,
      user_id: transaction.user_id || '',
      book_id: transaction.book_id || '',
      rfid_tag_id: transaction.rfid_tag_id || '',
      transaction_type: transaction.transaction_type || 'Borrow',
      due_date: transaction.due_date || '',
      return_date: transaction.return_date || '',
      fine_amount: transaction.fine_amount || '',
      status: transaction.status || 'Open',
      borrow_type: transaction.borrow_type || 'TakeHome'
    });
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteBorrowedBookMutation.mutateAsync(id);
      } catch (error) {
        alert('Failed to delete transaction. Please try again.');
      }
    }
  };

  const handleButtonClick = () => {
    setFormData({ transaction_id: '', user_id: '', book_id: '', rfid_tag_id: '', transaction_type: 'Borrow', due_date: '', return_date: '', fine_amount: '', status: 'Open', borrow_type: 'TakeHome' });
    setEditMode(false);
    setShowPopup(true);
  };

  const filteredBorrowedBooks = searchValue
    ? borrowedBooks.filter(
      (book) =>
        book.book_title?.toLowerCase().includes(searchValue.toLowerCase()) ||
        book.user_name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        book.transaction_id?.toString().includes(searchValue)
    )
    : borrowedBooks;

  const columns = [
    { header: 'Transaction ID', accessor: 'transaction_id' },
    { header: 'Book Title', accessor: 'book_title' },
    { header: 'User Name', accessor: 'user_name' },
    { header: 'Transaction Type', accessor: 'transaction_type' },
    { header: 'Borrow Type', accessor: 'borrow_type' },
    { header: 'Due Date', accessor: 'due_date' },
    { header: 'Return Date', accessor: 'return_date' },
    { header: 'Fine Amount', accessor: 'fine_amount' },
    { header: 'Status', accessor: 'status' },
    { header: 'Action', accessor: 'action' },
  ];

  const formPopupComponent = (
    <BorrowedBookFormPopup
      showPopup={showPopup}
      editMode={editMode}
      formData={formData}
      setFormData={setFormData}
      handleAddBorrowedBook={handleAddBorrowedBook}
      setShowPopup={setShowPopup}
      setEditMode={setEditMode}
    />
  );

  return (
    <CommonLayout
      searchValue={searchValue}
      buttonBehaviour={handleButtonClick}
      isLoading={isLoading}
      data={filteredBorrowedBooks}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      title={customTitle || "Book Transactions"}
      buttonText={hideButton ? "" : "Add Transaction"}
      columns={columns}
      formPopup={formPopupComponent}
      customTitle={customTitle}
    />
  );
}

export default BorrowedBooks;