import DashboardLayout from '../layouts/DashboardLayout';
import { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import { useBooks } from '../hooks/useBooks';
import { useReservations } from '../hooks/useReservations';
import { useBranches } from '../hooks/useBranches';
import { useBookSales } from '../hooks/useBookSales';
import { useOverdueBooks } from '../hooks/useOverdueBooks';
import { getCurrentUser } from '../services/auth.api';
import DashboardCard from '../components/DashboardCard';

function Dashboard() {
  const [showPopup, setShowPopup] = useState(false);
  const [currentUser] = useState(getCurrentUser());

  // Use React Query hooks - much cleaner!
  const { data: users = [], isLoading: usersLoading } = useUsers();
  const { data: books = [], isLoading: booksLoading } = useBooks();
  const { data: reservations = [], isLoading: reservationsLoading } = useReservations();
  const { data: branches = [], isLoading: branchesLoading } = useBranches();
  const { data: overdueBooksData = [], isLoading: overdueLoading } = useOverdueBooks();
  const { data: bookSales = [], isLoading: bookSalesLoading } = useBookSales();

  // Calculate stats from data
  const loading = usersLoading || booksLoading || reservationsLoading || branchesLoading || overdueLoading;

  const adminUsers = users.filter(user => user.role === 'Admin');

  // Calculate borrowed vs returned
  const totalBorrowed = reservations?.length || 0;
  const returnedBooks = reservations?.filter(r => r.returnDate || r.status === 'Returned').length || 0;
  const currentlyBorrowed = totalBorrowed - returnedBooks;

  const stats = {
    totalUsers: users?.length || 0,
    totalBooks: books?.length || 0,
    branchCount: branches?.length || 0,
    totalBorrowed: totalBorrowed,
    currentlyBorrowed: currentlyBorrowed,
    returnedBooks: returnedBooks
  };

  // Get overdue borrowers with user info
  const overdueBorrowers = overdueBooksData?.slice(0, 5).map(book => {
    const user = users.find(u => u.id === book.user_id || u.first_name + ' ' + u.last_name === book.user_name);
    return {
      id: book.id,
      borrowedId: book.id,
      userName: book.user_name || (user ? `${user.first_name} ${user.last_name}` : 'Unknown'),
      userId: book.user_id || user?.id
    };
  }) || [];

  // Get admin users for display
  const displayAdmins = adminUsers.slice(0, 4).map(user => ({
    id: user.id,
    name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Unknown',
    adminId: user.id
  }));

  // Pie Chart Component
  const PieChart = () => {
    const size = 300;
    const radius = size / 2 - 10;
    const center = size / 2;

    // Calculate percentages - use totalBorrowed as the total (all reservations)
    const totalForChart = totalBorrowed || 1;
    const borrowedPercentage = totalForChart > 0 ? (currentlyBorrowed / totalForChart) : 0;
    const returnedPercentage = totalForChart > 0 ? (returnedBooks / totalForChart) : 0;

    // If no data, show full circle in gray
    if (totalForChart === 0 || (currentlyBorrowed === 0 && returnedBooks === 0)) {
      return (
        <div className="w-[300px] h-[300px] mb-6 flex items-center justify-center">
          <svg width={size} height={size} className="block">
            <circle cx={center} cy={center} r={radius} fill="#4b5563" />
          </svg>
        </div>
      );
    }

    // Convert percentage to degrees (starting from top, -90 offset)
    const borrowedDegrees = borrowedPercentage * 360;
    const returnedDegrees = returnedPercentage * 360;

    // Create path function
    const describeArc = (x, y, radius, startAngle, endAngle) => {
      const start = polarToCartesian(x, y, radius, endAngle);
      const end = polarToCartesian(x, y, radius, startAngle);
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      const d = [
        "M", x, y,
        "L", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "Z"
      ].join(" ");
      return d;
    };

    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
      const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
      };
    };

    // Start angle from top (0 degrees is at top)
    const borrowedStart = 0;
    const borrowedEnd = borrowedDegrees;
    const returnedStart = borrowedEnd;
    const returnedEnd = returnedStart + returnedDegrees;

    return (
      <div className="w-[300px] h-[300px] mb-6 flex items-center justify-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
          {/* Borrowed segment - dark gray (larger segment) */}
          {borrowedDegrees > 0 && (
            <path
              d={describeArc(center, center, radius, borrowedStart, borrowedEnd)}
              fill="#4b5563"
            />
          )}
          {/* Returned segment - dark blue (smaller segment) */}
          {returnedDegrees > 0 && (
            <path
              d={describeArc(center, center, radius, returnedStart, returnedEnd)}
              fill="#0a0f33"
            />
          )}
        </svg>
      </div>
    );
  };

  return (
    <DashboardLayout activeTab="dashboard">
      <div className="p-6 flex-1 overflow-y-auto h-screen relative">
        <section className="grid grid-cols-[40%_60%] gap-6 ">
          {/* Left Column - Pie Chart */}
          <div className="bg-white rounded-lg p-6 max-h-[500px] flex flex-col items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <PieChart />
            <div className="flex gap-8 items-center w-full">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="6" fill="#4b5563" />
                </svg>
                <p className="text-sm text-[#6f7390]">Total Borrowed Books</p>
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="6" fill="#0a0f33" />
                </svg>
                <p className="text-sm text-[#6f7390]">Total Returned Books</p>
              </div>
            </div>
            <div className='flex flex-col gap-5 w-[200px] absolute top-10 left-[450px]'>

              <div className="flex flex-col gap-4 w-full">
                <div className="bg-white rounded-lg p-5 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                  <div className="w-12 h-12 bg-[#f5f7fb] rounded-lg flex items-center justify-center shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#0a0f33]">
                      <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#0a0f33" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-semibold text-[#0a0f33] mb-1">
                      {loading ? '...' : String(stats.totalUsers)}
                    </h3>
                    <p className="text-xs text-[#6f7390]">Total User Base</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-5 w-full flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <div className="w-12 h-12 bg-[#f5f7fb] rounded-lg flex items-center justify-center shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#0a0f33]">
                    <path d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM18 20H6V4H18V20ZM7 9H9V7H7V9ZM15 9H17V7H15V9ZM7 13H9V11H7V13ZM15 13H17V11H15V13ZM7 17H9V15H7V17ZM15 17H17V15H15V17Z" fill="#0a0f33" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-semibold text-[#0a0f33] mb-1">
                    {loading ? '...' : String(stats.totalBooks)}
                  </h3>
                  <p className="text-xs text-[#6f7390]">Total Book Count</p>
                </div>
              </div>

              <div className="bg-white w-full rounded-lg p-5 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <div className="w-12 h-12 bg-[#f5f7fb] rounded-lg flex items-center justify-center shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#0a0f33]">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#0a0f33" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-semibold text-[#0a0f33] mb-1">
                    {loading ? '...' : String(stats.branchCount)}
                  </h3>
                  <p className="text-xs text-[#6f7390]">Branch Count</p>
                </div>
              </div>
            </div>
          </div>
              
              <div className='absolute left-[250px] bottom-7'>
                <DashboardCard title="Admins">
                {loading ? (
                  <li className="text-xs bg-[#f5f7fb] p-3 rounded-lg flex items-center gap-3">Loading...</li>
                ) : displayAdmins.length > 0 ? (
                  displayAdmins.map((admin) => (
                    <li key={admin.id} className="text-xs bg-[#f5f7fb] p-3 rounded-lg flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-[#0a0f33] rounded-lg flex items-center justify-center shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                          <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="white" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#0a0f33]">{admin.name}</p>
                        <p className="text-xs text-[#6f7390]">Admin ID: {admin.adminId}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="w-2 h-2 bg-[#0a0f33] rounded-full"></span>
                          <span className="text-xs text-[#6f7390]">Active</span>
                        </div>
                      </div>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#0a0f33] cursor-pointer">
                        <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12H18C18 15.31 15.31 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z" fill="#0a0f33" />
                      </svg>
                    </li>
                  ))
                ) : (
                  <li className="text-xs bg-[#f5f7fb] p-3 rounded-lg text-gray-500">No admins found</li>
                )}
              </DashboardCard>
              </div>

            {/* Overdue Borrowers */}
            <div className='absolute top-5 right-4'>
            <DashboardCard title="Overdue Borrowers">
              {loading ? (
                <li className="text-xs bg-[#f5f7fb] p-3 rounded-lg flex items-center gap-3">Loading...</li>
              ) : overdueBorrowers.length > 0 ? (
                overdueBorrowers.map((borrower) => (
                  <li key={borrower.id} className="text-xs bg-[#f5f7fb] p-3 rounded-lg flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-[#0a0f33] rounded-lg flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="white" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#0a0f33]">{borrower.userName}</p>
                      <p className="text-xs text-[#6f7390]">Borrowed ID: {borrower.borrowedId}</p>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#0a0f33] cursor-pointer">
                      <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12H18C18 15.31 15.31 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z" fill="#0a0f33" />
                    </svg>
                  </li>
                ))
              ) : (
                <li className="text-xs bg-[#f5f7fb] p-3 rounded-lg text-gray-500">No overdue books</li>
              )}
              </DashboardCard>
            </div>

            {/* Bottom Row - Branch Network */}
            <div className="absolute bottom-14 right-12">
            <DashboardCard title="Books Sold">
                {loading ? (
                  <li className="text-xs bg-[#f5f7fb] p-2 rounded-lg">Loading...</li>
                ) : bookSales.length > 0 ? (
                  bookSales.map((sale, idx) => (
                    <li key={idx} className="text-xs bg-[#f5f7fb] p-2 rounded-lg">
                      {sale.bookTitle} by {sale.userName}
                    </li>
                  ))
                ) : (
                  <li className="text-xs bg-[#f5f7fb] p-2 rounded-lg text-gray-500">No books sold</li>
                )}
              </DashboardCard>
            </div>
          
        </section>

        {showPopup && (
          <div className="fixed inset-0 bg-[rgba(10,15,51,0.5)] flex items-center justify-center z-50">
            <div className="bg-white w-96 p-6 rounded-lg shadow-[0_5px_25px_rgba(0,0,0,0.1)]">
              <h3 className="text-center text-lg mb-4">Change Credentials</h3>
              <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setShowPopup(false); }}>
                <label className="text-sm font-medium block">Enter Current Password</label>
                <input
                  type="password"
                  placeholder="Enter Current Password"
                  className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg outline-none text-sm"
                />
                <label className="text-sm font-medium block">Enter New Password</label>
                <input
                  type="password"
                  placeholder="Enter New Password"
                  className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg outline-none text-sm"
                />
                <label className="text-sm font-medium block">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg outline-none text-sm"
                />
                <div className="flex justify-between gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowPopup(false)}
                    className="w-[48%] bg-gray-300 text-black rounded-lg py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-[48%] bg-[#0a0f33] text-white rounded-lg py-2 hover:bg-[#192261]"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;

