import DashboardLayout from '../layouts/DashboardLayout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BorrowedBooks() {
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState(null);
  const borrowedBooks = [
    { id: '001', userId: '001', amount: '002 Books', dueDate: '22 - 09 - 2025', datetime: '22-08-2025 10:39:34' },
    { id: '002', userId: '002', amount: '004 Books', dueDate: '15 - 09 - 2025', datetime: '22-08-2025 10:39:34' },
    { id: '003', userId: '001', amount: '002 Books', dueDate: '22 - 09 - 2025', datetime: '22-08-2025 10:39:34' },
    { id: '004', userId: '002', amount: '004 Books', dueDate: '14 - 09 - 2025', datetime: '22-08-2025 10:39:34' },
    { id: '005', userId: '001', amount: '002 Books', dueDate: '22 - 09 - 2025', datetime: '22-08-2025 10:39:34' },
  ];

  const openPopup = (data) => {
    setSelectedData(data);
  };

  const closePopup = () => {
    setSelectedData(null);
  };

  return (
    <DashboardLayout activeTab="borrowed">
      <div className="flex flex-col h-screen">
        <header className="bg-white flex justify-between items-center px-6 py-3 border-t-2 border-[#0b0c2a]">
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
            <div className="bg-gray-100 rounded flex items-center overflow-hidden">
              <input
                type="text"
                placeholder="Search by ID"
                className="px-3 py-1 bg-transparent outline-none text-xs"
              />
              <button className="bg-[#0b0c2a] text-white px-2 py-1">🔍</button>
            </div>
            <button className="text-2xl">⚙️</button>
          </div>
        </header>

        <div className="flex gap-2 px-6 py-3 bg-[#f8f8fb] border-b border-[#0b0b3b]">
          <button
            onClick={() => navigate('/borrowed-books')}
            className="px-4 py-2 bg-white rounded-md text-sm font-medium"
          >
            Borrowed books
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
                <th className="p-3 border-b border-gray-300 font-semibold">Amount</th>
                <th className="p-3 border-b border-gray-300 font-semibold">Due Date</th>
                <th className="p-3 border-b border-gray-300 font-semibold">Date & Time</th>
                <th className="p-3 border-b border-gray-300 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {borrowedBooks.map((book) => (
                <tr key={book.id} className="border-b border-gray-200">
                  <td className="p-3">{book.id}</td>
                  <td className="p-3">{book.userId}</td>
                  <td className="p-3">{book.amount}</td>
                  <td className="p-3">{book.dueDate}</td>
                  <td className="p-3">{book.datetime}</td>
                  <td className="p-3">
                    <button
                      onClick={() => openPopup(book)}
                      className="text-xl hover:scale-110 transition-transform"
                    >
                      📘
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      {selectedData && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={closePopup}>
          <div className="bg-white w-3/5 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.2)] animate-[fadeIn_0.3s_ease]" onClick={(e) => e.stopPropagation()}>
            <h2 className="bg-[#0b0c2a] text-white p-4 text-base">Borrowed Books Details</h2>
            <div className="p-4 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-3 border-b border-gray-300 text-center text-sm">Book ID</th>
                    <th className="p-3 border-b border-gray-300 text-center text-sm">Name</th>
                    <th className="p-3 border-b border-gray-300 text-center text-sm">Type</th>
                    <th className="p-3 border-b border-gray-300 text-center text-sm">Language</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border-b border-gray-200 text-center text-sm">001</td>
                    <td className="p-3 border-b border-gray-200 text-center text-sm">Sample Book</td>
                    <td className="p-3 border-b border-gray-200 text-center text-sm">Fiction</td>
                    <td className="p-3 border-b border-gray-200 text-center text-sm">English</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-[#f9f9f9] flex justify-between items-center p-4 border-t-2 border-[#0b0c2a]">
              <div>
                <p className="text-sm mb-1"><strong>ID:</strong> <span>{selectedData.id}</span></p>
                <p className="text-sm mb-1"><strong>Total Books:</strong> <span>{selectedData.amount}</span></p>
                <p className="text-sm"><strong>Due Date:</strong> <span>{selectedData.dueDate}</span></p>
              </div>
              <button
                onClick={closePopup}
                className="bg-[#0b0c2a] text-white px-5 py-2 rounded hover:bg-[#1a1c3d] transition-colors"
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

export default BorrowedBooks;

