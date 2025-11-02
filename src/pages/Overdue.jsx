import DashboardLayout from '../layouts/DashboardLayout';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllReservations } from '../services/bookReservations.api';

function Overdue() {
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState(null);
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOverdueBooks = async () => {
      try {
        setLoading(true);
        const reservations = await getAllReservations();
        
        // Filter for overdue books (past due date)
        const overdue = (reservations || []).filter(r => {
          if (!r.dueDate) return false;
          return new Date(r.dueDate) < new Date();
        });
        
        setOverdueBooks(overdue);
      } catch (error) {
        console.error('Error loading overdue books:', error);
      } finally {
        setLoading(false);
      }
    };
    loadOverdueBooks();
  }, []);

  const openPopup = (data) => {
    setSelectedData(data);
  };

  const closePopup = () => {
    setSelectedData(null);
  };

  return (
    <DashboardLayout activeTab="overdue">
      <div className="flex flex-col h-screen">
        <header className="bg-white flex justify-between items-center px-6 py-3 border-b-2 border-gray-300">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
            <div>
              <h3 className="text-sm font-semibold">Abdelmohymen</h3>
              <p className="text-xs text-gray-600">Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs font-semibold">12:29 PM</span>
              <p className="text-xs text-gray-600">Sep 27, 2025</p>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by ID"
                className="px-3 py-1 pr-8 rounded border border-gray-300 outline-none text-xs"
              />
              <button className="absolute right-2 top-1 text-base">🔍</button>
            </div>
            <button className="text-2xl">⚙️</button>
          </div>
        </header>

        <div className="flex gap-2 px-6 py-3 bg-[#f8f8fb] border-b border-[#0b0b3b]">
          <button
            onClick={() => navigate('/borrowed-books')}
            className="px-4 py-2 bg-white rounded-md text-sm font-medium"
          >
            Borrowed Books
          </button>
          <button
            onClick={() => navigate('/overdue')}
            className="px-4 py-2 bg-white text-[#0b0b3b] rounded-md text-sm font-medium"
          >
            Overdue Borrowers
          </button>
        </div>

        <section className="flex-1 bg-white mx-6 my-5 rounded-lg p-5 shadow-[0_2px_6px_rgba(0,0,0,0.05)] overflow-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="p-3 border-b border-gray-300 font-semibold">ID</th>
                <th className="p-3 border-b border-gray-300 font-semibold">User ID</th>
                <th className="p-3 border-b border-gray-300 font-semibold">Book ID</th>
                <th className="p-3 border-b border-gray-300 font-semibold">Due Date</th>
                <th className="p-3 border-b border-gray-300 font-semibold">Reservation Date</th>
                <th className="p-3 border-b border-gray-300 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-3 text-center text-gray-500">Loading...</td>
                </tr>
              ) : overdueBooks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-3 text-center text-gray-500">No overdue books found</td>
                </tr>
              ) : (
                overdueBooks.map((book, index) => (
                  <tr key={book.id || index} className="border-b border-gray-200">
                    <td className="p-3">{book.id || index + 1}</td>
                    <td className="p-3">{book.userId || 'N/A'}</td>
                    <td className="p-3">{book.bookId || 'N/A'}</td>
                    <td className="p-3">{book.dueDate ? new Date(book.dueDate).toLocaleDateString() : 'N/A'}</td>
                    <td className="p-3">{book.reservationDate ? new Date(book.reservationDate).toLocaleString() : 'N/A'}</td>
                    <td className="p-3">
                      <button
                        onClick={() => openPopup(book)}
                        className="text-xl hover:scale-110 transition-transform"
                      >
                        📘
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </div>

      {selectedData && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={closePopup}>
          <div className="bg-white w-4/5 max-w-[700px] rounded-lg border-2 border-[#0b0b3b] p-5 animate-[popupFade_0.3s_ease]" onClick={(e) => e.stopPropagation()}>
            <table className="w-full border-collapse mb-4">
              <thead>
                <tr>
                  <th className="p-2 border-b border-gray-300 text-left text-sm font-semibold">Book ID</th>
                  <th className="p-2 border-b border-gray-300 text-left text-sm font-semibold">Name</th>
                  <th className="p-2 border-b border-gray-300 text-left text-sm font-semibold">Type</th>
                  <th className="p-2 border-b border-gray-300 text-left text-sm font-semibold">Language</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border-b border-gray-200 text-sm">001</td>
                  <td className="p-2 border-b border-gray-200 text-sm">Sample Book</td>
                  <td className="p-2 border-b border-gray-200 text-sm">Fiction</td>
                  <td className="p-2 border-b border-gray-200 text-sm">English</td>
                </tr>
              </tbody>
            </table>
            <div className="bg-[#f8f9ff] flex justify-between items-center rounded-lg p-3 border border-gray-300">
              <div>
                <p className="text-sm font-medium mb-1"><strong>ID:</strong> {selectedData?.id || 'N/A'}</p>
                <p className="text-sm font-medium mb-1"><strong>User ID:</strong> {selectedData?.userId || 'N/A'}</p>
                <p className="text-sm font-medium"><strong>Due Date:</strong> {selectedData?.dueDate ? new Date(selectedData.dueDate).toLocaleDateString() : 'N/A'}</p>
              </div>
              <button
                onClick={closePopup}
                className="bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#242477] transition-colors font-semibold"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Overdue;

