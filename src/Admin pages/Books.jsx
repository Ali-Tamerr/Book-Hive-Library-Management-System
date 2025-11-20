import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  useBooks, 
  useCreateBook, 
  useUpdateBook, 
  useDeleteBook 
} from '../hooks/useBooks.js';
import { useCategories } from '../hooks/useCategories.js';
import BookFormPopup from '../components/BookFormPopup.jsx';
import CommonLayout from '../Layouts/CommonLayout.jsx';

function Books({ searchValue }) {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  const [formData, setFormData] = useState({ 
    book_id: 0,
    title: '', 
    author: '', 
    isbn: '', 
    publisher: '',
    publication_year: '',
    category_id: '',
    total_copies: 1,
    available_copies: 1,
    sale_price: '',
    digital_url: '',
    description: ''
  });

  const { data: books = [], isLoading } = useBooks();
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();
  const createBookMutation = useCreateBook();
  const updateBookMutation = useUpdateBook();
  const deleteBookMutation = useDeleteBook();

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const publication_year = parseInt(formData.publication_year, 10);
      const category_id = parseInt(formData.category_id, 10);
      const total_copies = parseInt(formData.total_copies, 10);
      const available_copies = parseInt(formData.available_copies, 10);
      const sale_price = parseFloat(formData.sale_price);

      const apiData = {
        book_id: formData.book_id,
        title: formData.title,
        author: formData.author,
        isbn: formData.isbn,
        publisher: formData.publisher,
        publication_year: isNaN(publication_year) ? null : publication_year,
        category_id: isNaN(category_id) ? null : category_id,
        total_copies: isNaN(total_copies) ? 1 : total_copies,
        available_copies: isNaN(available_copies) ? 1 : available_copies,
        sale_price: isNaN(sale_price) ? null : sale_price,
        digital_url: formData.digital_url || null,
        description: formData.description || null
      };
      
      if (editMode && formData.book_id) {
        await updateBookMutation.mutateAsync({ id: formData.book_id, data: apiData });
      } else {
        await createBookMutation.mutateAsync(apiData);
      }
      setFormData({ title: '', author: '', isbn: '', publisher: '', publication_year: '', category_id: '', total_copies: 1, available_copies: 1, sale_price: '', digital_url: '', description: '' });
      setShowPopup(false);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save book:", error);
      if (error.status === 405) {
        alert('Book creation/update is not supported by the API. The Books endpoint may be read-only.');
      } else if (error.status === 400) {
        alert(`Validation error: ${error.message || 'Please check your input fields.'}`);
      } else {
        alert(`Failed to save book: ${error.message || 'Please try again.'}`);
      }
    }
  };

  const handleEdit = (book) => {
    setFormData({
      book_id: book.book_id,
      title: book.title || '',
      author: book.author || '',
      isbn:  book.isbn || '',
      publisher:  book.publisher || '',
      publication_year:  book.publication_year || '',
      category_id:  book.category_id || '',
      total_copies: book.total_copies || 1,
      available_copies: book.available_copies || 1,
      sale_price: book.sale_price || '',
      digital_url: book.digital_url || '',
      description:book.description || ''
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
    setFormData({ title: '', author: '', isbn: '', publisher: '', publication_year: '', category_id: '', total_copies: 1, available_copies: 1, sale_price: '', digital_url: '', description: '' });
    setEditMode(false);
    setShowPopup(true);
  };

  const filteredBooks = searchValue
    ? books.filter(
        (book) => {
          const title = book.title || '';
          const author = book.author || '';
          const isbn = book.isbn || '';
          return title.toLowerCase().includes(searchValue.toLowerCase()) ||
                 author.toLowerCase().includes(searchValue.toLowerCase()) ||
                 isbn.toString().includes(searchValue);
        }
      )
    : books;
  
  const title = "Book Management";
  const buttonText = "Add Book";
  const columns = [
    { header: 'Book ID', accessor: 'book_id' },
    { header: 'ISBN', accessor: 'isbn' },
    { header: 'Title', accessor: 'title' },
    { header: 'Author', accessor: 'author' },
    { header: 'Publisher', accessor: 'publisher' },
    { header: 'Year', accessor: 'publication_year' },
    { header: 'Category ID', accessor: 'category_id' },
    { header: 'Total Copies', accessor: 'total_copies' },
    { header: 'Available', accessor: 'available_copies' },
    { header: 'Price', accessor: 'sale_price' },
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
