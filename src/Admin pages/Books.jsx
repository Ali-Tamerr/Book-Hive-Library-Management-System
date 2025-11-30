import { useState } from 'react';
import {
  useBooks,
  useCreateBook,
  useUpdateBook,
  useDeleteBook
} from '../hooks/useBooks.js';
import { useCategories } from '../hooks/useCategories.js';
import BookFormPopup from '../components/BookFormPopup.jsx';
import DeleteConfirmationPopup from '../components/DeleteConfirmationPopup.jsx';
import ViewDetailsPopup from '../components/ViewDetailsPopup.jsx';
import CommonLayout from '../Layouts/CommonLayout.jsx';

function Books({ searchValue }) {
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [formData, setFormData] = useState({
    book_id: '',
    name: '',
    category_id: '',
    quantity: '',
    sale_price: ''
  });

  const { data: books = [], isLoading } = useBooks();
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();
  const createBookMutation = useCreateBook();
  const updateBookMutation = useUpdateBook();
  const deleteBookMutation = useDeleteBook();

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const category_id = parseInt(formData.category_id, 10);
      const quantity = parseInt(formData.quantity, 10);
      const sale_price = parseFloat(formData.sale_price);

      const apiData = {
        book_id: formData.book_id,
        name: formData.name,
        category_id: isNaN(category_id) ? null : category_id,
        quantity: isNaN(quantity) ? 1 : quantity,
        sale_price: isNaN(sale_price) ? null : sale_price
      };

      if (editMode && formData.book_id) {
        await updateBookMutation.mutateAsync({ id: formData.book_id, data: apiData });
      } else {
        await createBookMutation.mutateAsync(apiData);
      }
      setFormData({ book_id: '', name: '', category_id: '', quantity: '', sale_price: '' });
      setShowPopup(false);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save book:", error);
      if (error.status === 405) {
        alert('Book creation/update is not supported by the API. The Books endpoint may be read-only.');
      } else if (error.status === 400) {
        alert(`Validation error: ${error.message || 'Please check your input fields.'}`)
          ;
      } else {
        alert(`Failed to save book: ${error.message || 'Please try again.'}`);
      }
    }
  };

  const handleEdit = (book) => {
    setFormData({
      book_id: book.book_id,
      name: book.name || '',
      category_id: book.category_id || '',
      quantity: book.quantity || 1,
      sale_price: book.sale_price || ''
    });
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = (book_id) => {
    setBookToDelete(book_id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (bookToDelete) {
      try {
        await deleteBookMutation.mutateAsync(bookToDelete);
        setShowDeleteConfirm(false);
        setBookToDelete(null);
      } catch (error) {
        if (error.status === 405) {
          alert('Book deletion is not supported by the API. The Books endpoint may be read-only.');
        } else if (error.status === 400) {
          alert('This book cannot be deleted because it has related reservations, sales, or transactions.');
        } else {
          alert(`Failed to delete book: ${error.message || 'Please try again.'}`);
        }
        setShowDeleteConfirm(false);
        setBookToDelete(null);
      }
    }
  };

  const handleView = (book) => {
    setSelectedBook(book);
    setShowViewDetails(true);
  };

  const buttonBehaviour = () => {
    setFormData({ book_id: '', name: '', category_id: '', quantity: '', sale_price: '' });
    setEditMode(false);
    setShowPopup(true);
  };

  const filteredBooks = searchValue
    ? books.filter(
      (book) => {
        const name = book.name || '';
        const book_id = book.book_id || '';
        return name.toLowerCase().includes(searchValue.toLowerCase()) ||
          book_id.toString().includes(searchValue);
      }
    )
    : books;

  const title = "Book Management";
  const buttonText = "Add Book";
  const columns = [
    { header: 'ID', accessor: 'book_id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Category', accessor: 'category_id' },
    {
      header: 'Availability',
      accessor: 'availability',
      render: (book) => (
        <span className={`px-3 py-1 rounded-full text-sm font-medium`}>
          {book.quantity > 0 ? 'Available' : 'Borrowed'}
        </span>
      )
    },
    { header: 'Action', accessor: 'action' },
  ];

  const formPopup = (
    <BookFormPopup
      showPopup={showPopup}
      editMode={editMode}
      formData={formData}
      setFormData={setFormData}
      handleAddBook={handleAddBook}
      setShowPopup={setShowPopup}
      setEditMode={setEditMode}
      categories={categories}
    />
  );

  return (
    <>
      <CommonLayout
        searchValue={searchValue}
        buttonBehaviour={buttonBehaviour}
        isLoading={isLoading}
        data={filteredBooks}
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
          setBookToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Book"
      />
      <ViewDetailsPopup
        show={showViewDetails}
        onClose={() => {
          setShowViewDetails(false);
          setSelectedBook(null);
        }}
        title="View Book"
        data={selectedBook ? {
          'Book ID': selectedBook.book_id,
          'Name': selectedBook.name,
          'Category': categories.find(cat => cat.category_id === selectedBook.category_id)?.category_name || 'N/A',
          'Availability': selectedBook.quantity > 0 ? 'Available' : 'Borrowed',
        } : null}
        savedBy={{
          name: 'Admin User',
          role: 'Admin'
        }}
      >
      </ViewDetailsPopup>
    </>
  );
}

export default Books;
