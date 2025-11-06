import DashboardLayout from '../layouts/DashboardLayout';
import { useState } from 'react';
import { User, Book, MapPin, ShieldCheck, RefreshCw } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { useBooks } from '../hooks/useBooks';
import { useReservations } from '../hooks/useReservations';
import { useBranches } from '../hooks/useBranches';
import { useBookSales } from '../hooks/useBookSales';
import { useOverdueBooks } from '../hooks/useOverdueBooks';
import { getCurrentUser } from '../services/auth.api';
import DashboardCard from '../components/DashboardCard';
import DashboardInfoCard from '../components/DashboardInfoCard';
import { useUserActivity } from '../hooks/useUserActivity';
import { isUserOnline } from '../services/userActivity.api';


function Dashboard() {
  const [currentUser] = useState(getCurrentUser());
  useUserActivity();

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
    adminId: user.id,
    isOnline: isUserOnline(user)
  }));

  // Pie Chart Component
  const PieChart = () => {
    // Use 100% width/height of parent; maintain minimum size for mobile
    // We'll use viewBox for scaling the SVG nicely
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
        <div className="w-full h-full mb-6 flex items-center justify-center">
          <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="block">
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
      <div className="w-full h-full mb-6 flex items-center justify-center">
        <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="block">
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
        <section className="max-lg:grid max-lg:grid-cols-[40%_60%] h-full gap-6 ">
          {/* Left Column - Pie Chart */}
          <div className="max-xl:bg-white rounded-lg p-6 h-full w-[600px] flex flex-col items-center justify-center max-xl:shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex flex-col gap-5 justify-space-between items-center w-full h-full">
              <div className='w-[80%]'>
                <PieChart />
              </div>
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
            </div>

            <div className='flex flex-col gap-5 w-[200px] absolute xl:top-10 xl:right-[450px] 2xl:right-[600px] 2xl:w-[300px]'>
              <DashboardInfoCard
                icon={<User size={24} className="text-[#0a0f33]" />}
                title="Total User Base"
                value={stats.totalUsers}
                loading={loading} />
              <DashboardInfoCard
                icon={<Book size={24} className="text-[#0a0f33]" />}
                title="Total Book Count"
                value={stats.totalBooks}
                loading={loading} />
              <DashboardInfoCard
                icon={<MapPin size={24} className="text-[#0a0f33]" />}
                title="Branch Count"
                value={stats.branchCount}
                loading={loading} />
            </div>

          </div>
          <div className='absolute xl:left-[250px] xl:bottom-7 2xl:left-[650px]'>
            <DashboardCard title="Admins">
              {loading ? (
                <li className="text-xs bg-[#f5f7fb] p-3 rounded-lg flex items-center gap-3">Loading...</li>
              ) : displayAdmins.length > 0 ? (
                displayAdmins.map((admin) => (
                  <li key={admin.id} className="text-xs bg-[#f5f7fb] p-3 rounded-lg flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-[#0a0f33] rounded-lg flex items-center justify-center shrink-0">
                      <ShieldCheck size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#0a0f33]">{admin.name}</p>
                      <p className="text-xs text-[#6f7390]">Admin ID: {admin.adminId}</p>
                      <div className="flex items-center gap-1 mt-1">
                          <span className={`w-2 h-2 rounded-full ${admin.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                          <span className="text-xs text-[#6f7390]">{admin.isOnline ? 'Online' : 'Offline'}</span>
                        </div>
                    </div>
                    <RefreshCw size={20} className="text-[#0a0f33] cursor-pointer" />
                  </li>
                ))
              ) : (
                <li className="text-xs bg-[#f5f7fb] p-3 rounded-lg text-gray-500">No admins found</li>
              )}
            </DashboardCard>
          </div>

          {/* Overdue Borrowers */}
          <div className='absolute xl:top-5 xl:right-10'>
            <DashboardCard title="Overdue Borrowers">
              {loading ? (
                <li className="text-xs bg-[#f5f7fb] p-3 rounded-lg flex items-center gap-3">Loading...</li>
              ) : overdueBorrowers.length > 0 ? (
                overdueBorrowers.map((borrower) => (
                  <li key={borrower.id} className="text-xs bg-[#f5f7fb] p-3 rounded-lg flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-[#0a0f33] rounded-lg flex items-center justify-center shrink-0">
                      <User size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#0a0f33]">{borrower.userName}</p>
                      <p className="text-xs text-[#6f7390]">Borrowed ID: {borrower.borrowedId}</p>
                    </div>
                    <RefreshCw size={20} className="text-[#0a0f33] cursor-pointer" />
                  </li>
                ))
              ) : (
                <li className="text-xs bg-[#f5f7fb] p-3 rounded-lg text-gray-500">No overdue books</li>
              )}
            </DashboardCard>
          </div>

          <div className="absolute xl:bottom-14 xl:right-12 2xl:right-20">
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


      </div>
    </DashboardLayout>
  );
}

export default Dashboard;

