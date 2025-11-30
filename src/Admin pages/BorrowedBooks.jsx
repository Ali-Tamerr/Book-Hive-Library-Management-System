import { useState } from 'react';
import {
  useBorrowedBooks,
  useCreateBorrowedBook,
  useUpdateBorrowedBook,
  useDeleteBorrowedBook
} from '../hooks/useBorrowedBooks.js';
import BorrowedBookFormPopup from '../components/BorrowedBookFormPopup.jsx';
import DeleteConfirmationPopup from '../components/DeleteConfirmationPopup.jsx';
import ViewDetailsPopup from '../components/ViewDetailsPopup.jsx';
import CommonLayout from '../Layouts/CommonLayout.jsx';

function BorrowedBooks({ searchValue, customTitle, hideButton = false }) {
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
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

  const handleDelete = (id) => {
    setTransactionToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (transactionToDelete) {
      try {
        await deleteBorrowedBookMutation.mutateAsync(transactionToDelete);
        setShowDeleteConfirm(false);
        setTransactionToDelete(null);
      } catch (error) {
        alert('Failed to delete transaction. Please try again.');
        setShowDeleteConfirm(false);
        setTransactionToDelete(null);
      }
    }
  };

  const handleView = (transaction) => {
    setSelectedTransaction(transaction);
    setShowViewDetails(true);
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
    { header: 'ID', accessor: 'transaction_id' },
    { header: 'User ID', accessor: 'user_id' },
    { header: 'Amount', accessor: 'fine_amount' },
    { header: 'Due Date', accessor: 'due_date' },
    { header: 'Date & Time', accessor: 'transaction_date' },
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
    <>
      <CommonLayout
        searchValue={searchValue}
        buttonBehaviour={handleButtonClick}
        isLoading={isLoading}
        data={filteredBorrowedBooks}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleView={handleView}
        title={customTitle || "Book Transactions"}
        buttonText={hideButton ? "" : "Add Transaction"}
        columns={columns}
        formPopup={formPopupComponent}
        customTitle={customTitle}
      />
      <DeleteConfirmationPopup
        show={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setTransactionToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Transaction"
      />
      <ViewDetailsPopup
        show={showViewDetails}
        onClose={() => {
          setShowViewDetails(false);
          setSelectedTransaction(null);
        }}
        title="View Transaction"
        data={selectedTransaction ? {
          'Transaction ID': selectedTransaction.transaction_id,
          'User ID': selectedTransaction.user_id,
          'Book ID': selectedTransaction.book_id,
          'Transaction Type': selectedTransaction.transaction_type,
          'Due Date': selectedTransaction.due_date,
          'Return Date': selectedTransaction.return_date,
          'Fine Amount': selectedTransaction.fine_amount,
          'Status': selectedTransaction.status,
          'Borrow Type': selectedTransaction.borrow_type
        } : null}
      >
      </ViewDetailsPopup>
    </>
  );
}

export default BorrowedBooks;