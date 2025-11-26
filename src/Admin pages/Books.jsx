import { useState } from 'react';
import {
  useBooks,
  useCreateBook,
  useUpdateBook,
  useDeleteBook
} from '../hooks/useBooks.js';
import { useCategories } from '../hooks/useCategories.js';
import { useLanguages } from '../hooks/useLanguages.js';
import BookFormPopup from '../components/BookFormPopup.jsx';
import CommonLayout from '../Layouts/CommonLayout.jsx';

function Books({ searchValue }) {
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    book_id: '',
    name: '',
    language_id: '',
    category_id: '',
    quantity: 1,
    sale_price: ''
  });

  const { data: books = [], isLoading } = useBooks();
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();
  const { data: languages = [], isLoading: isLoadingLanguages } = useLanguages();
  const createBookMutation = useCreateBook();
  const updateBookMutation = useUpdateBook();
  const deleteBookMutation = useDeleteBook();

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const language_id = parseInt(formData.language_id, 10);
      const category_id = parseInt(formData.category_id, 10);
      const quantity = parseInt(formData.quantity, 10);
      const sale_price = parseFloat(formData.sale_price);

      const apiData = {
        book_id: formData.book_id,
        name: formData.name,
        language_id: isNaN(language_id) ? null : language_id,
        category_id: isNaN(category_id) ? null : category_id,
        quantity: isNaN(quantity) ? 1 : quantity,
        sale_price: isNaN(sale_price) ? null : sale_price
      };

      if (editMode && formData.book_id) {
        await updateBookMutation.mutateAsync({ id: formData.book_id, data: apiData });
      } else {
        await createBookMutation.mutateAsync(apiData);
      }
      setFormData({ book_id: '', name: '', language_id: '', category_id: '', quantity: 1, sale_price: '' });
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
      language_id: book.language_id || '',
      category_id: book.category_id || '',
      quantity: book.quantity || 1,
      sale_price: book.sale_price || ''
    });
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = async (book_id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBookMutation.mutateAsync(book_id);
      } catch (error) {
        if (error.status === 405) {
          alert('Book deletion is not supported by the API. The Books endpoint may be read-only.');
        } else if (error.status === 400) {
          alert('This book cannot be deleted because it has related reservations, sales, or transactions.');
        } else {
          alert(`Failed to delete book: ${error.message || 'Please try again.'}`);
        }
      }
    }
  };

  const buttonBehaviour = () => {
    setFormData({ book_id: '', name: '', language_id: '', category_id: '', quantity: 1, sale_price: '' });
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
    { header: 'Language', accessor: 'language_id' },
    {
      header: 'Availability',
      accessor: 'availability',
      render: (book) => (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${book.quantity > 0
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
          }`}>
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
      languages={languages}
    />
  );

  return (
    <CommonLayout
      searchValue={searchValue}
      buttonBehaviour={buttonBehaviour}
      isLoading={isLoading}
      data={filteredBooks}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      title={title}
      buttonText={buttonText}
      columns={columns}
      formPopup={formPopup}
    />
  );
}

export default Books;
