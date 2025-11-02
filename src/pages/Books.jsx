import DashboardLayout from '../layouts/DashboardLayout';
import { useState } from 'react';
import { 
  useBooks, 
  useCreateBook, 
  useUpdateBook, 
  useDeleteBook 
} from '../hooks/useBooks';
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
  const createBookMutation = useCreateBook();
  const updateBookMutation = useUpdateBook();
  const deleteBookMutation = useDeleteBook();

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      if (editMode && formData.id) {
        await updateBookMutation.mutateAsync({ id: formData.id, data: formData });
      } else {
        await createBookMutation.mutateAsync(formData);
      }
      setFormData({ title: '', author: '', isbn: '', publisher: '', publicationYear: '', categoryId: '', totalCopies: 1, availableCopies: 1, salePrice: '', digitalUrl: '', description: '' });
      setShowPopup(false);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save book:", error);
      alert('Failed to save book. Please try again.');
    }
  };

  const handleEdit = (book) => {
    setFormData({
      id: book.id,
      title: book.title || '',
      author: book.author || '',
      isbn: book.isbn || '',
      publisher: book.publisher || '',
      publicationYear: book.publicationYear || '',
      categoryId: book.categoryId || '',
      totalCopies: book.totalCopies || 1,
      availableCopies: book.availableCopies || 1,
      salePrice: book.salePrice || '',
      digitalUrl: book.digitalUrl || '',
      description: book.description || ''
    });
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBookMutation.mutateAsync(id);
      } catch (error) {
        alert('Failed to delete book. Please try again.');
      }
    }
  };

  const filteredBooks = searchValue
    ? books.filter(
        (book) =>
          book.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
          book.author?.toLowerCase().includes(searchValue.toLowerCase()) ||
          book.isbn?.toString().includes(searchValue)
      )
    : books;

  return (
    <>
      <DashboardLayout activeTab="books">
        <section className="flex-1 bg-white mx-6 my-5 rounded-lg p-5 border-2 border-[#c7d5f2] overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Book Management</h2>
            <button
              onClick={() => {
                setFormData({ title: '', author: '', isbn: '', publisher: '', publicationYear: '', categoryId: '', totalCopies: 1, availableCopies: 1, salePrice: '', digitalUrl: '', description: '' });
                setEditMode(false);
                setShowPopup(true);
              }}
              className="bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors text-sm font-medium"
            >
              ➕ Add Book
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
                      <td className="p-3">{book.isbn}</td>
                      <td className="p-3">{book.title}</td>
                      <td className="p-3">{book.author}</td>
                      <td className="p-3">{book.publisher}</td>
                      <td className="p-3">{book.publicationYear}</td>
                      <td className="p-3">{book.categoryId}</td>
                      <td className="p-3">{book.totalCopies}</td>
                      <td className="p-3">{book.availableCopies}</td>
                      <td className="p-3">{book.salePrice}</td>
                      <td className="p-3">
                        <button 
                          onClick={() => handleEdit(book)}
                          className="mr-2 text-lg hover:scale-125 transition-transform" 
                          title="Edit">✏️</button>
                        <button 
                          onClick={() => handleDelete(book.id)}
                          className="mr-2 text-lg hover:scale-125 transition-transform" 
                          title="Delete">🗑️</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </DashboardLayout>
      <BookFormPopup 
        showPopup={showPopup} 
        editMode={editMode} 
        formData={formData} 
        setFormData={setFormData} 
        handleAddBook={handleAddBook} 
        setShowPopup={setShowPopup} 
        setEditMode={setEditMode} 
      />
    </>
  );
}

export default Books;
