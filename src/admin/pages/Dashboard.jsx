import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { User, Book, MapPin, ShieldCheck, RefreshCw } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { useBooks } from '../hooks/useBooks';
import { useReservations } from '../hooks/useReservations';
import { useBranches } from '../hooks/useBranches';
import { useBookSales } from '../hooks/useBookSales';
import { useOverdueBooks } from '../hooks/useOverdueBooks';
import { getCurrentUser } from '../services/auth.api';
import DashboardCard from '../../components/DashboardCard';
import DashboardInfoCard from '../../components/DashboardInfoCard';
import { useUserActivity } from '../hooks/useUserActivity';
import { isUserOnline } from '../services/userActivity.api';
import LogoIcon from "../../assets/logo.svg?react";
import PieChart from '../../components/PieChart';

function Dashboard() {
  const location = useLocation();
  const [loadingAdmins, setLoadingAdmins] = useState({});
  const [currentUser] = useState(getCurrentUser());
  useUserActivity();

  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/admin/dashboard')) {
      setActiveTab('dashboard');
    }
  }, [location.pathname]);

  // Use React Query hooks - much cleaner!
  const { data: users = [], isLoading: usersLoading, refetch: refetchUsers } = useUsers();
  const { data: books = [], isLoading: booksLoading } = useBooks();
  const { data: reservations = [], isLoading: reservationsLoading } = useReservations();
  const { data: branches = [], isLoading: branchesLoading } = useBranches();
  const { data: overdueBooksData = [], isLoading: overdueLoading } = useOverdueBooks();
  const { data: bookSales = [], isLoading: bookSalesLoading } = useBookSales();

  const handleRefreshAdmins = (adminId) => {
    setLoadingAdmins(prev => ({ ...prev, [adminId]: true }));
    refetchUsers().finally(() => {
      setLoadingAdmins(prev => ({ ...prev, [adminId]: false }));
    });
  };

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

  return (
    <div className="max-[1540px]:py-5 px-10 max-[1080px]:px-2 max-[430px]:px-0 flex-1 overflow-y-auto -mt-3 h-full relative max-[430px]:w-dvw ">
      <section className="h-full flex max-[1540px]:flex-col flex-row justify-between gap-8">
        {/* Left Column - Pie Chart */}
        <div className='flex h-full max-[1540px]:h-50 [1540px]:mt-10 justify-center items-center flex-1 max-[1540px]:mx-0 ml-20 '>
          <div className=" rounded-lg w-full flex flex-col items-center justify-center [1200px]:mb-15">
            <div className="flex max-[1540px]:flex-row flex-col gap-15 max-[1540px]:justify-center max-3xl:items-start items-center max-[1540px]:-mr-8 w-full h-full max-[1080px]:h-min max-[430px]:scale-80 [430px]:mx-0 -ml-10  max-[380px]:w-[110%]">
              <div className="gap-8 items-center border border-[#0a0f3373] bg-white p-6 rounded-lg hidden max-[1540px]:flex max-[1080px]:scale-90 max-[340px]:scale-70 ">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <circle cx="8" cy="8" r="6" fill="#4b5563" />
                    </svg>
                    <p className="text-sm text-[#6f7390] max-[340px]:whitespace-nowrap">Total Borrowed Books</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <circle cx="8" cy="8" r="6" fill="#0a0f33" />
                    </svg> 
                    <p className="text-sm text-[#6f7390] max-[340px]:whitespace-nowrap">Total Returned Books</p>
                  </div>
                </div>
              </div>
              <div className='w-[120%] max-[1540px]:w-[180px] max-[1540px]:h-[180px] max-[1080px]:w-[140px] max-[1080px]:h-[140px] max-[340px]:-ml-10'>
                <PieChart totalBorrowed={stats.totalBorrowed} currentlyBorrowed={stats.currentlyBorrowed} returnedBooks={stats.returnedBooks} />
              </div>
              <div className="max-[1540px]:hidden  flex gap-8 items-center border border-[#0a0f3373] bg-white p-6 rounded-lg scale-110">
                <div className='max-[1650px]:hidden block'>
                  <LogoIcon className="w-16 h-16 text-[#0a0f33]" />
                </div>
                <div className='h-16 bg-[#0a0f33] w-1 rounded-full block max-[1650px]:hidden'></div>
                <div className="flex flex-col gap-6">
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
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-8 h-full max-h-[1000px] [1200px]:py-5 justify-between items-end max-[1540px]:items-center w-[450px] max-[1540px]:w-full flex-1'>
          <div className='flex max-[1200px]:grid max-[1200px]:grid-cols-2 max-[1540px]:flex-row max-[1200px]:place-items-center max-[1200px]:content-center max-[1200px]:items-center flex-col gap-5 max-[1080px]:gap-2 max-[1540px]:my-0 mt-12 [1540px]:mr-8  w-[230px] max-[1540px]:w-[90%]  max-[856px]:scale-90  max-[1080px]:w-[110%]  max-[380px]:scale-80 max-[340px]:scale-70 max-[340px]:w-[120%]'>

            <div className="flex-1 max-[1200px]:w-full max-[340px]:scale-90 max-[1200px]:flex max-[1200px]:justify-center"><DashboardInfoCard
              icon={<User size={24} className="text-[#0a0f33]" />}
              title="Total User Base"
              value={stats.totalUsers}
              loading={loading} />
            </div>
            <div className="flex-1 max-[1200px]:w-full max-[340px]:scale-90 max-[1200px]:flex max-[1200px]:justify-center"> <DashboardInfoCard
              icon={<Book size={24} className="text-[#0a0f33]" />}
              title="Total Book Count"
              value={stats.totalBooks}
              loading={loading} />
            </div>
            <div className="flex-1 max-[1200px]:w-full max-[340px]:scale-90 max-[1200px]:col-span-2 max-[1200px]:flex max-[1200px]:justify-center">
              <DashboardInfoCard
                icon={<MapPin size={24} className="text-[#0a0f33]" />}
                title="Branch Count"
                value={stats.branchCount}
                loading={loading} />
            </div>
          </div>
          <div className='-mt-20 h-[380px] w-[400px] block max-[1540px]:hidden'>
            <DashboardCard title="Admins">
              {loading ? (
                <li className="text-xs bg-[#f5f7fb] p-3 rounded-lg flex items-center gap-3">Loading...</li>
              ) : displayAdmins.length > 0 ? (
                displayAdmins.map((admin) => (
                  <li key={admin.id} className="text-xs bg-[#f5f7fb]  p-1 rounded-lg flex items-center justify-between gap-3 mb-2 border border-[#0a0f33]">
                    <div className="bg-[#C7C7C77A] flex gap-3 items-center flex-1 p-2 rounded-lg px-2 py-1">
                      <div className="w-8 h-8 bg-[#0a0f33] rounded-lg flex items-center justify-center shrink-0 ">
                        <ShieldCheck size={16} className="text-white" />
                      </div>
                      <div className="flex-1 overflow-hidden whitespace-nowrap truncate">
                        <p className="text-sm font-medium text-[#0a0f33]">{admin.name}</p>
                        <p className="text-xs text-[#6f7390]">Admin ID: {admin.adminId}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className={`w-2 h-2 rounded-full ${admin.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                          <span className="text-xs text-[#6f7390]">{admin.isOnline ? 'Online' : 'Offline'}</span>
                        </div>
                      </div>
                    </div>
                    <RefreshCw onClick={() => handleRefreshAdmins(admin.id)} className={`mr-2 h-15 w-10 px-2 text-[#0a0f33] cursor-pointer ${loadingAdmins[admin.id] ? 'animate-spin' : ''}`} />
                  </li>
                ))
              ) : (
                <li className="text-xs bg-[#f5f7fb] p-3 rounded-lg text-gray-500">No admins found</li>
              )}
            </DashboardCard>
          </div>
        </div>

        <div className='flex max-[1540px]:flex-row flex-col w-full min-w-[200px] max-w-[450px] max-[1540px]:min-w-full [1540px]:my-5 overflow-x-auto max-[1540px]:flex-20 align-center mb-5 max-[1400px]:max-h-[400px] max-[1540px]:rounded-lg gap-8 max-[1540px]:gap-4 max-[1400px]:border-r border-[#0a0f3373] noBorderBox max-[856px]:scale-90 snap-x snap-mandatory'>

            <div className='flex-1 flex flex-col justify-end snap-start'>
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

            <div className="flex-1 flex flex-col justify-end  snap-center">
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

            <div className=' [1540px]:h-[380px] [1540px]:w-[400px] max-[1540px]:flex-1 max-[1540px]:flex hidden  flex-col justify-end snap-end '>
              <DashboardCard title="Admins">
                {loading ? (
                  <li className="text-xs bg-[#f5f7fb] p-3 rounded-lg flex items-center gap-3">Loading...</li>
                ) : displayAdmins.length > 0 ? (
                  displayAdmins.map((admin) => (
                    <li key={admin.id} className="text-xs bg-[#f5f7fb]  p-1 rounded-lg flex items-center justify-between gap-3 mb-2 border border-[#0a0f33]">
                      <div className="bg-[#C7C7C77A] flex gap-3 items-center flex-1 p-2 rounded-lg px-2 py-1">
                        <div className="w-8 h-8 bg-[#0a0f33] rounded-lg flex items-center justify-center shrink-0 ">
                          <ShieldCheck size={16} className="text-white" />
                        </div>
                        <div className="flex-1 overflow-hidden whitespace-nowrap truncate">
                          <p className="text-sm font-medium text-[#0a0f33]">{admin.name}</p>
                          <p className="text-xs text-[#6f7390]">Admin ID: {admin.adminId}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <span className={`w-2 h-2 rounded-full ${admin.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                            <span className="text-xs text-[#6f7390]">{admin.isOnline ? 'Online' : 'Offline'}</span>
                          </div>
                        </div>
                      </div>
                      <RefreshCw onClick={() => handleRefreshAdmins(admin.id)} className={`mr-2 h-15 w-10 px-2 text-[#0a0f33] cursor-pointer ${loadingAdmins[admin.id] ? 'animate-spin' : ''}`} />
                    </li>
                  ))
                ) : (
                  <li className="text-xs bg-[#f5f7fb] p-3 rounded-lg text-gray-500">No admins found</li>
                )}
              </DashboardCard>
            </div>

        </div>
      </section>
    </div>
  );
}

export default Dashboard;