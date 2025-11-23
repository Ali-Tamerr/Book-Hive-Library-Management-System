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
    book_id: '',
    user_id: '',
    borrow_date: '',
    due_date: '',
    return_date: ''
  });

  const { data: borrowedBooks = [], isLoading } = useBorrowedBooks();
  const createBorrowedBookMutation = useCreateBorrowedBook();
  const updateBorrowedBookMutation = useUpdateBorrowedBook();
  const deleteBorrowedBookMutation = useDeleteBorrowedBook();

  const handleAddBorrowedBook = async (e) => {
    e.preventDefault();
    try {
      if (editMode && formData.id) {
        await updateBorrowedBookMutation.mutateAsync({ id: formData.id, data: formData });
      } else {
        await createBorrowedBookMutation.mutateAsync(formData);
      }
      setFormData({ book_id: '', user_id: '', borrow_date: '', due_date: '', return_date: '' });
      setShowPopup(false);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save borrowed book:", error);
      alert('Failed to save borrowed book. Please try again.');
    }
  };

  const handleEdit = (book) => {
    setFormData({
      id: book.id,
      book_id: book.book_id || '',
      user_id: book.user_id || '',
      borrow_date: book.borrow_date || '',
      due_date: book.due_date || '',
      return_date: book.return_date || ''
    });
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await deleteBorrowedBookMutation.mutateAsync(id);
      } catch (error) {
        alert('Failed to delete record. Please try again.');
      }
    }
  };

  const handleButtonClick = () => {
    setFormData({ book_id: '', user_id: '', borrow_date: '', due_date: '', return_date: '' });
    setEditMode(false);
    setShowPopup(true);
  };

  const filteredBorrowedBooks = searchValue
    ? borrowedBooks.filter(
      (book) =>
        book.book_title?.toLowerCase().includes(searchValue.toLowerCase()) ||
        book.user_name?.toLowerCase().includes(searchValue.toLowerCase())
    )
    : borrowedBooks;

  const columns = [
    { header: 'Book Title', accessor: 'book_title' },
    { header: 'User Name', accessor: 'user_name' },
    { header: 'Borrow Date', accessor: 'borrow_date' },
    { header: 'Due Date', accessor: 'due_date' },
    { header: 'Return Date', accessor: 'return_date' },
    { header: 'Status', accessor: 'status' },
    { header: 'Action', accessor: 'action' },
  ];

  const tableData = filteredBorrowedBooks.map(book => ({
    ...book,
    status: book.return_date ? 'Returned' : 'Borrowed'
  }));

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
      data={tableData}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      title="Borrowed Books"
      buttonText={hideButton ? "" : "Add Borrowed Book"}
      columns={columns}
      formPopup={formPopupComponent}
      customTitle={customTitle}
    />
  );
}

export default BorrowedBooks;