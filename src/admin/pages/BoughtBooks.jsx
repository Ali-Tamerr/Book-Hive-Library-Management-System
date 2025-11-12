import { useState } from 'react';
import { Plus, FilePenLine, Trash2 } from 'lucide-react';
import { 
  useBookSales, 
  useCreateBookSale, 
  useUpdateBookSale, 
  useDeleteBookSale 
} from '../hooks/useBookSales';
import BoughtBookFormPopup from '../components/BoughtBookFormPopup.jsx';

function BoughtBooks({ searchValue }) {
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ 
    book_id: '', 
    user_id: '', 
    sale_date: '', 
    price: '' 
  });

  const { data: bookSales = [], isLoading } = useBookSales();
  const createBookSaleMutation = useCreateBookSale();
  const updateBookSaleMutation = useUpdateBookSale();
  const deleteBookSaleMutation = useDeleteBookSale();

  const handleAddBookSale = async (e) => {
    e.preventDefault();
    try {
      if (editMode && formData.id) {
        await updateBookSaleMutation.mutateAsync({ id: formData.id, data: formData });
      } else {
        await createBookSaleMutation.mutateAsync(formData);
      }
      setFormData({ book_id: '', user_id: '', sale_date: '', price: '' });
      setShowPopup(false);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save book sale:", error);
      alert('Failed to save book sale. Please try again.');
    }
  };

  const handleEdit = (sale) => {
    setFormData({
      id: sale.id,
      book_id: sale.book_id || '',
      user_id: sale.user_id || '',
      sale_date: sale.sale_date || '',
      price: sale.price || ''
    });
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await deleteBookSaleMutation.mutateAsync(id);
      } catch (error) {
        alert('Failed to delete record. Please try again.');
      }
    }
  };

  const filteredBookSales = searchValue
    ? bookSales.filter(
        (sale) =>
          sale.book_title?.toLowerCase().includes(searchValue.toLowerCase()) ||
          sale.user_name?.toLowerCase().includes(searchValue.toLowerCase())
      )
    : bookSales;

  return (
<div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Bought Books</h2>
        <button
          onClick={() => {
            setFormData({ book_id: '', user_id: '', sale_date: '', price: '' });
            setEditMode(false);
            setShowPopup(true);
          }}
          className="bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors text-sm font-medium flex items-center gap-2"
        >
          <Plus size={15}/> Add Book Sale
        </button>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full border-collapse text-left text-sm min-w-max">
          <thead>
            <tr>
              <th className="p-3 border-b border-gray-300 font-semibold">Book Title</th>
              <th className="p-3 border-b border-gray-300 font-semibold">User Name</th>
              <th className="p-3 border-b border-gray-300 font-semibold">Sale Date</th>
              <th className="p-3 border-b border-gray-300 font-semibold">Price</th>
              <th className="p-3 border-b border-gray-300 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">Loading...</td>
              </tr>
            ) : filteredBookSales.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">No book sales found</td>
              </tr>
            ) : (
              filteredBookSales.map((sale) => (
                <tr key={sale.id} className="border-b border-gray-200">
                  <td className="p-3">{sale.book_title}</td>
                  <td className="p-3">{sale.user_name}</td>
                  <td className="p-3">{sale.sale_date}</td>
                  <td className="p-3">{sale.price}</td>
                  <td className="p-3">
                    <button 
                      onClick={() => handleEdit(sale)}
                      className="mr-2 text-lg hover:scale-125 transition-transform" 
                      title="Edit"><FilePenLine size={20}/></button>
                    <button 
                      onClick={() => handleDelete(sale.id)}
                      className="mr-2 text-lg hover:scale-125 transition-transform" 
                      title="Delete"><Trash2 size={20}/></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <BoughtBookFormPopup 
        showPopup={showPopup} 
        editMode={editMode} 
        formData={formData} 
        setFormData={setFormData} 
        handleAddBookSale={handleAddBookSale} 
        setShowPopup={setShowPopup} 
        setEditMode={setEditMode} 
      />
    </div>
  );
}

export default BoughtBooks;