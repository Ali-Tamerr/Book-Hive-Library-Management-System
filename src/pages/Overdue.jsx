import DashboardLayout from '../layouts/DashboardLayout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Overdue() {
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState(null);
  const overdueBooks = [
    { id: '001', userId: '1', amount: '002 Books', dueDate: '22 - 09 - 2025', datetime: '22-08-2025 10:39:34' },
    { id: '002', userId: '2', amount: '004 Books', dueDate: '14 - 09 - 2025', datetime: '22-08-2025 10:39:34' },
    { id: '003', userId: '1', amount: '002 Books', dueDate: '22 - 09 - 2025', datetime: '22-08-2025 10:39:34' },
    { id: '004', userId: '2', amount: '004 Books', dueDate: '14 - 09 - 2025', datetime: '22-08-2025 10:39:34' },
    { id: '005', userId: '1', amount: '002 Books', dueDate: '22 - 09 - 2025', datetime: '22-08-2025 10:39:34' },
  ];

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
                <th className="p-3 border-b border-gray-300 font-semibold">Amount</th>
                <th className="p-3 border-b border-gray-300 font-semibold">Due Date</th>
                <th className="p-3 border-b border-gray-300 font-semibold">Date & Time</th>
                <th className="p-3 border-b border-gray-300 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {overdueBooks.map((book) => (
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
                <p className="text-sm font-medium mb-1"><strong>ID:</strong> {selectedData.id}</p>
                <p className="text-sm font-medium mb-1"><strong>Total Books:</strong> {selectedData.amount}</p>
                <p className="text-sm font-medium"><strong>Due Date:</strong> {selectedData.dueDate}</p>
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

