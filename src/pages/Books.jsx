import { useState } from 'react';
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
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  const [formData, setFormData] = useState({ 
    title: '', 
    author: '', 
    isbn: '', 
    publisher: '',
    publicationYear: '',
    categoryId: '',
    totalCopies: 1,
    availableCopies: 1,
    salePrice: '',
    digitalUrl: '',
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
      const publicationYear = parseInt(formData.publicationYear, 10);
      const categoryId = parseInt(formData.categoryId, 10);
      const totalCopies = parseInt(formData.totalCopies, 10);
      const availableCopies = parseInt(formData.availableCopies, 10);
      const salePrice = parseFloat(formData.salePrice);

      const apiData = {
        title: formData.title,
        author: formData.author,
        isbn: formData.isbn,
        publisher: formData.publisher,
        publication_year: isNaN(publicationYear) ? null : publicationYear,
        category_id: isNaN(categoryId) ? null : categoryId,
        total_copies: isNaN(totalCopies) ? 1 : totalCopies,
        available_copies: isNaN(availableCopies) ? 1 : availableCopies,
        sale_price: isNaN(salePrice) ? null : salePrice,
        digital_url: formData.digitalUrl || null,
        description: formData.description || null
      };
      
      if (editMode && formData.id) {
        await updateBookMutation.mutateAsync({ id: formData.id, data: apiData });
      } else {
        await createBookMutation.mutateAsync(apiData);
      }
      setFormData({ title: '', author: '', isbn: '', publisher: '', publicationYear: '', categoryId: '', totalCopies: 1, availableCopies: 1, salePrice: '', digitalUrl: '', description: '' });
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
      id: book.id,
      title: book.Title || book.title || '',
      author: book.Author || book.author || '',
      isbn: book.ISBN || book.isbn || '',
      publisher: book.Publisher || book.publisher || '',
      publicationYear: book.PublicationYear || book.publicationYear || '',
      categoryId: book.CategoryId || book.categoryId || '',
      totalCopies: book.TotalCopies || book.totalCopies || 1,
      availableCopies: book.AvailableCopies || book.availableCopies || 1,
      salePrice: book.SalePrice || book.salePrice || '',
      digitalUrl: book.DigitalUrl || book.digitalUrl || '',
      description: book.Description || book.description || ''
    });
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBookMutation.mutateAsync(id);
      } catch (error) {
        if (error.status === 405) {
          alert('Book deletion is not supported by the API. The Books endpoint may be read-only.');
        } else {
          alert(`Failed to delete book: ${error.message || 'Please try again.'}`);
        }
      }
    }
  };

  const filteredBooks = searchValue
    ? books.filter(
        (book) => {
          const title = book.Title || book.title || '';
          const author = book.Author || book.author || '';
          const isbn = book.ISBN || book.isbn || '';
          return title.toLowerCase().includes(searchValue.toLowerCase()) ||
                 author.toLowerCase().includes(searchValue.toLowerCase()) ||
                 isbn.toString().includes(searchValue);
        }
      )
    : books;

  return (
    <>
        <section className="flex-1 bg-white mx-6 my-5 rounded-lg p-5 border-2 border-[#c7d5f2] overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Book Management</h2>
            <button
              onClick={() => {
                setFormData({ title: '', author: '', isbn: '', publisher: '', publicationYear: '', categoryId: '', totalCopies: 1, availableCopies: 1, salePrice: '', digitalUrl: '', description: '' });
                setEditMode(false);
                setShowPopup(true);
              }}
              className="bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors text-sm font-medium flex items-center gap-2"
            >
              <Plus size={15}/> Add Book
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr>
                  <th className="p-3 border-b border-gray-300 font-semibold">ISBN</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">Title</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">Author</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">Publisher</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">Year</th>
                  <th className="p-3 border-b border-gray-300 font-semibold">Category ID</th>
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
                    <tr key={book.id} className="border-b border-gray-200">
                      <td className="p-3">{book.ISBN || book.isbn || ''}</td>
                      <td className="p-3">{book.Title || book.title || ''}</td>
                      <td className="p-3">{book.Author || book.author || ''}</td>
                      <td className="p-3">{book.Publisher || book.publisher || ''}</td>
                      <td className="p-3">{book.PublicationYear || book.publicationYear || ''}</td>
                      <td className="p-3">{book.CategoryId || book.categoryId || ''}</td>
                      <td className="p-3">{book.TotalCopies || book.totalCopies || ''}</td>
                      <td className="p-3">{book.AvailableCopies || book.availableCopies || ''}</td>
                      <td className="p-3">{book.SalePrice || book.salePrice || ''}</td>
                      <td className="p-3">
                        <button 
                          onClick={() => handleEdit(book)}
                          className="mr-2 text-lg hover:scale-125 transition-transform" 
                          title="Edit"><FilePenLine size={20}/></button>
                        <button 
                          onClick={() => handleDelete(book.id)}
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
