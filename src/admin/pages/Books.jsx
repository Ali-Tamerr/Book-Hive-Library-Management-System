import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, FilePenLine, Trash2 } from 'lucide-react';
import { 
  useBooks, 
  useCreateBook, 
  useUpdateBook, 
  useDeleteBook 
} from '../hooks/useBooks';
import { useCategories } from '../hooks/useCategories';
import BookFormPopup from '../components/BookFormPopup.jsx';

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
      // Transform form data to API format (PascalCase) and handle potential NaN values
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

  const filteredBooks = searchValue
    ? books.filter(
        (book) => {
          const title = book.title || book.title || '';
          const author = book.author || book.author || '';
          const isbn = book.isbn || book.isbn || '';
          return title.toLowerCase().includes(searchValue.toLowerCase()) ||
                 author.toLowerCase().includes(searchValue.toLowerCase()) ||
                 isbn.toString().includes(searchValue);
        }
      )
    : books;

  return (
    <>
        <section className="flex-1 h-full bg-white mx-6 my-5 rounded-lg p-5 border-2 border-[#c7d5f2] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl max-[856px]:text-sm font-semibold">Book Management</h2>
            <button
              onClick={() => {
                setFormData({ title: '', author: '', isbn: '', publisher: '', publication_year: '', category_id: '', total_copies: 1, available_copies: 1, sale_price: '', digital_url: '', description: '' });
                setEditMode(false);
                setShowPopup(true);
              }}
              className="bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors text-sm font-medium flex items-center gap-2 max-[856px]:scale-90"
            >
              <Plus size={15}/> Add Book
            </button>
          </div>

          <div className="overflow-x-auto flex-1 h-full">
            <table className="w-full border-collapse text-left text-sm min-w-max">
              <thead>
                <tr>
                <th className="p-3 border-b border-gray-300 font-semibold">book_id</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">isbn</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">Title</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">author</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">publisher</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">Year</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">Category book_id</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">Total Copies</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">Available</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">Price</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="10" className="p-3 text-center text-gray-500">Loading...</td>
                  </tr>
                ) : filteredBooks.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="p-3 text-center text-gray-500">No books found</td>
                  </tr>
                ) : (
                  filteredBooks.map((book) => (
                    <tr key={book.isbn} className="border-b border-gray-200">
                        <td className="p-3">{book.book_id || book.book_id}</td>
                      <td className="p-3">{book.isbn || book.isbn || ''}</td>
                      <td className="p-3">{book.title || book.title || ''}</td>
                      <td className="p-3">{book.author || book.author || ''}</td>
                      <td className="p-3">{book.publisher || book.publisher || ''}</td>
                      <td className="p-3">{book.publication_year || book.publication_year || ''}</td>
                      <td className="p-3">{book.category_id || book.category_id || ''}</td>
                      <td className="p-3">{book.total_copies || book.total_copies || ''}</td>
                      <td className="p-3">{book.available_copies || book.available_copies || ''}</td>
                      <td className="p-3">{book.sale_price || book.sale_price || ''}</td>
                      <td className="p-3">
                        <button 
                          onClick={() => handleEdit(book)}
                          className="mr-2 text-lg hover:scale-125 transition-transform" 
                          title="Edit"><FilePenLine size={20}/></button>
                        <button 
                          onClick={() => handleDelete(book.book_id)}
                          className="mr-2 text-lg hover:scale-125 transition-transform" 
                          title="Delete"><Trash2 size={20}/></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
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
    </>
  );
}

export default Books;
