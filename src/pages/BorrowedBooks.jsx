import { useState } from 'react';
import { Plus, FilePenLine, Trash2 } from 'lucide-react';
import { 
  useBorrowedBooks, 
  useCreateBorrowedBook, 
  useUpdateBorrowedBook, 
  useDeleteBorrowedBook 
} from '../hooks/useBorrowedBooks';
import BorrowedBookFormPopup from '../components/BorrowedBookFormPopup.jsx';

function BorrowedBooks({ searchValue }) {
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

  const filteredBorrowedBooks = searchValue
    ? borrowedBooks.filter(
        (book) =>
          book.book_title?.toLowerCase().includes(searchValue.toLowerCase()) ||
          book.user_name?.toLowerCase().includes(searchValue.toLowerCase())
      )
    : borrowedBooks;

  return (
<div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4 w-full">
        <h2 className="text-xl font-semibold">Borrowed Books</h2>
        <button
          onClick={() => {
            setFormData({ book_id: '', user_id: '', borrow_date: '', due_date: '', return_date: '' });
            setEditMode(false);
            setShowPopup(true);
          }}
          className="bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors text-sm font-medium flex items-center gap-2"
        >
          <Plus size={15}/> Add Borrowed Book
        </button>
      </div>
      <div className="w-full overflow-x-auto flex-1">
        <table className="min-w-max w-full border-collapse text-left text-sm">
          <thead>
            <tr>
              <th className="p-3 border-b border-gray-300 font-semibold">Book Title</th>
              <th className="p-3 border-b border-gray-300 font-semibold">User Name</th>
              <th className="p-3 border-b border-gray-300 font-semibold">Borrow Date</th>
              <th className="p-3 border-b border-gray-300 font-semibold">Due Date</th>
              <th className="p-3 border-b border-gray-300 font-semibold">Return Date</th>
              <th className="p-3 border-b border-gray-300 font-semibold">Status</th>
              <th className="p-3 border-b border-gray-300 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7" className="p-3 text-center text-gray-500">Loading...</td>
              </tr>
            ) : filteredBorrowedBooks.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-3 text-center text-gray-500">No borrowed books found</td>
              </tr>
            ) : (
              filteredBorrowedBooks.map((book) => (
                <tr key={book.id} className="border-b border-gray-200">
                  <td className="p-3">{book.book_title}</td>
                  <td className="p-3">{book.user_name}</td>
                  <td className="p-3">{book.borrow_date}</td>
                  <td className="p-3">{book.due_date}</td>
                  <td className="p-3">{book.return_date}</td>
                  <td className="p-3">{book.return_date ? 'Returned' : 'Borrowed'}</td>
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
      <BorrowedBookFormPopup 
        showPopup={showPopup} 
        editMode={editMode} 
        formData={formData} 
        setFormData={setFormData} 
        handleAddBorrowedBook={handleAddBorrowedBook} 
        setShowPopup={setShowPopup} 
        setEditMode={setEditMode} 
      />
    </div>
  );
}

export default BorrowedBooks;