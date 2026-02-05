import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { User, Book, Building2, ShieldCheck, RefreshCw } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { useBooks } from '../hooks/useBooks';
import { useReservations } from '../hooks/useReservations';
import { useBranches } from '../hooks/useBranches';
import { useOverdueBooks } from '../hooks/useOverdueBooks';
import { useBookCopies } from '../hooks/useBookCopies';
import { useBookTransactions } from '../hooks/useBookTransactions';
import { getCurrentUser } from '../services/auth.api';
import DashboardCard from '../components/DashboardCard';
import DashboardInfoCard from '../components/DashboardInfoCard';
import { useUserActivity } from '../hooks/useUserActivity';
import { isUserOnline } from '../services/userActivity.api';
import LogoIcon from "../assets/logo.svg?react";
import PieChart from '../components/PieChart';
import AdminDashboardCard from '../components/AdminDashboardCard.jsx';
import ViewDetailsPopup from '../components/ViewDetailsPopup';
import MaximizeIcon from '../assets/icons/maximize-circle.svg?react';

function Dashboard() {
  const location = useLocation();
  const [loadingAdmins, setLoadingAdmins] = useState({});
  const [currentUser] = useState(getCurrentUser());
  useUserActivity();

  const [viewDetailsItem, setViewDetailsItem] = useState(null);
  const [viewDetailsType, setViewDetailsType] = useState(null);
  const [showViewDetails, setShowViewDetails] = useState(false);

  const handleViewDetails = (item, type) => {
    setViewDetailsItem(item);
    setViewDetailsType(type);
    setShowViewDetails(true);
  };

  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/admin/dashboard')) {
      setActiveTab('dashboard');
    }
  }, [location.pathname]);

  // Use React Query hooks - much cleaner!
  const { data: users = [], isLoading: usersLoading, refetch: refetchUsers } = useUsers();

  const getCreatorName = (createdById) => {
    if (!createdById || !Array.isArray(users)) return { name: 'N/A', role: 'Not recorded' };
    const creator = users.find(u => u.user_id === createdById);
    return creator ? { name: creator.name, role: creator.role } : { name: createdById, role: 'Unknown' };
  };
  const { data: books = [], isLoading: booksLoading } = useBooks();
  const { data: reservations = [], isLoading: reservationsLoading } = useReservations();
  const { data: branches = [], isLoading: branchesLoading } = useBranches();
  const { data: bookCopies = [] } = useBookCopies();
  const { data: overdueBooksData = [], isLoading: overdueLoading } = useOverdueBooks();
  const { data: bookTransactions = [], isLoading: transactionsLoading } = useBookTransactions();

  const handleRefreshAdmins = (adminId) => {
    setLoadingAdmins(prev => ({ ...prev, [adminId]: true }));
    refetchUsers().finally(() => {
      setLoadingAdmins(prev => ({ ...prev, [adminId]: false }));
    });
  };

  // Calculate stats from data
  const loading = usersLoading || booksLoading || reservationsLoading || branchesLoading || overdueLoading || transactionsLoading;

  const adminUsers = Array.isArray(users) ? users.filter(user => user.role === 'Admin') : [];

  const borrowedTransactions = Array.isArray(bookTransactions) ? bookTransactions.filter(
    t => t.transaction_type === 'Check-Out' && t.status === 'Completed'
  ) : [];
  const returnedBooks = borrowedTransactions.filter(t => t.return_date).length;
  const currentlyBorrowed = borrowedTransactions.filter(t => !t.return_date).length;
  const totalBorrowed = borrowedTransactions.length;

  const stats = {
    totalUsers: Array.isArray(users) ? users.length : 0,
    totalBooks: Array.isArray(books) ? books.reduce((sum, book) => sum + (book.quantity || 0), 0) : 0,
    branchCount: Array.isArray(branches) ? branches.length : 0,
    totalBorrowed: totalBorrowed,
    currentlyBorrowed: currentlyBorrowed,
    returnedBooks: returnedBooks
  };

  // Get overdue borrowers with user info
  const overdueBorrowers = (Array.isArray(overdueBooksData) ? overdueBooksData.slice(0, 5) : []).map(book => {
    const user = Array.isArray(users) ? users.find(u => u.id === book.user_id || u.first_name + ' ' + u.last_name === book.user_name) : null;
    return {
      id: book.id,
      borrowedId: book.id,
      userName: book.user_name || (user ? `${user.first_name} ${user.last_name}` : 'Unknown'),
      userId: book.user_id || user?.id
    };
  }) || [];

  const displayAdmins = adminUsers
    .map(user => ({
      id: user.user_id,
      name: user.name || 'Unknown',
      adminId: user.user_id,
      isOnline: isUserOnline(user)
    }))
    .sort((a, b) => {
      if (a.isOnline !== b.isOnline) {
        return b.isOnline - a.isOnline;
      }
      return a.name.localeCompare(b.name);
    })
    .slice(0, 4);

  return (
    <div className="max-[1540px]:py-5 py-8 px-10 max-[1080px]:px-12 max-[430px]:px-0 flex-1 w-full overflow-hidden relative max-[430px]:w-dvw flex flex-col h-full">
      <section className="flex-1 flex max-[1540px]:flex-col flex-row justify-between gap-14 max-[1540px]:gap-0 min-h-0">
        <div className='flex max-[1540px]:h-50 min-[1540px]:mt-10 justify-center items-center flex-1 max-[1540px]:mx-0 ml-20 self-stretch'>
          <div className=" rounded-lg w-full h-full flex flex-col items-center justify-center min-[1200px]:mb-15">
            <div className="flex max-[1540px]:flex-row flex-col gap-15 justify-center max-3xl:items-start items-center max-[1540px]:-mr-8 w-full h-full max-[1080px]:h-60 max-[430px]:scale-80 [430px]:mx-0 -ml-10  max-[380px]:w-[110%]">
              <div className="gap-8 items-center bg-white dark:bg-[#D7D7D7] border dark:border-[#292D32] dark:text-black p-6 rounded-lg hidden max-[1540px]:flex max-[1080px]:scale-90 max-[340px]:scale-70 ">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <circle cx="8" cy="8" r="6" fill="#4b5563" className="dark:fill-[#121317]" />
                    </svg>
                    <p className="text-sm text-[#000035] dark:text-black font-medium max-[340px]:whitespace-nowrap">Total Borrowed Books</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <circle cx="8" cy="8" r="6" fill="#000035" className="dark:fill-[#292D32]" />
                    </svg>
                    <p className="text-sm text-[#000035] dark:text-black font-medium max-[340px]:whitespace-nowrap">Total Returned Books</p>
                  </div>
                </div>
              </div>
              <div className='max-[1540px]:w-[180px] w-full h-fit max-[1540px]:min-h-[180px] max-[1080px]:w-[200px] max-[1080px]:h-full max-[340px]:-ml-10 flex-1'>
                <PieChart totalBorrowed={stats.totalBorrowed} currentlyBorrowed={stats.currentlyBorrowed} returnedBooks={stats.returnedBooks} />
              </div>
              <div className="max-[1540px]:hidden flex gap-8 items-center bg-white dark:bg-[#D7D7D7]  -mt-10  p-6 rounded-lg scale-110">
                <div className='max-[1650px]:hidden block'>
                  <LogoIcon className="w-16 h-16 text-[#0a0f33] dark:text-black " />
                </div>
                <div className='h-[125%] bg-[#0a0f33] dark:bg-black w-0.5 rounded-full block max-[1650px]:hidden'></div>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <circle cx="8" cy="8" r="6" fill="#4b5563" className="dark:fill-[#121317]" />
                    </svg>
                    <p className="text-sm text-[#000035] dark:text-black  font-medium">Total Borrowed Books</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <circle cx="8" cy="8" r="6" fill="#000035" className="dark:fill-[#292D32]" />
                    </svg>
                    <p className="text-sm text-[#000035] dark:text-black  font-medium">Total Returned Books</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-15 self-stretch justify-start items-end max-[1540px]:items-center  max-[1540px]:max-h-[150px] max-[1540px]:w-full max-[1540px]:items-center'>
          <div className='flex max-[1540px]:mr-0 max-[1200px]:grid max-[1200px]:grid-cols-2 max-[1540px]:flex-row max-[1540px]:justify-center max-[1200px]:place-items-center max-[1200px]:content-center max-[1200px]:items-center flex-col gap-9 max-[1080px]:gap-2 min-[1080px]:p-0 max-[650px]:p-0 max-[650px]:w-screen max-[1540px]:w-[90%] max-[856px]:scale-90 max-[1080px]:w-[110%]'>

            <div className="max-[1200px]:w-full max-[340px]:scale-90 max-[1200px]:flex max-[1200px]:justify-center">
              <DashboardInfoCard
                icon={<User className="text-[#0a0f33] h-full w-full" />}
                title="Total User Base"
                value={stats.totalUsers}
                loading={loading} />
            </div>
            <div className="max-[1200px]:w-full max-[340px]:scale-90 max-[1200px]:flex max-[1200px]:justify-center">
              <DashboardInfoCard
                icon={<Book className="text-[#0a0f33] h-full w-full" />}
                title="Total Book Count"
                value={stats.totalBooks}
                loading={loading} />
            </div>
            <div className="max-[1200px]:w-full max-[340px]:scale-90 max-[1200px]:col-span-2 max-[1200px]:flex max-[1200px]:justify-center">
              <DashboardInfoCard
                icon={<Building2 className="text-[#0a0f33] h-full w-full" />}
                title="Branch Count"
                value={stats.branchCount}
                loading={loading} />
            </div>
          </div>
          <div className='flex-1 mr-6 w-[440px] h-full block max-[1540px]:hidden'>
            <AdminDashboardCard
              loading={loading}
              displayAdmins={displayAdmins}
              handleRefreshAdmins={handleRefreshAdmins}
              loadingAdmins={loadingAdmins}
            />
          </div>
        </div>

        <div className='flex self-stretch max-[640px]:-mb-8 max-[1540px]:flex-row flex-col gap-10 w-max min-w-[200px] max-w-[450px] max-[1540px]:w-full max-[1540px]:max-w-full max-[1080px]:mt-2 overflow-x-auto max-[1540px]:flex-20 max-[1400px]:max-h-[400px] max-[1540px]:rounded-lg max-[1540px]:gap-5 max-[856px]:scale-90 snap-x snap-mandatory pr-4'>

          <div className='flex-1 flex flex-col snap-start min-h-0'>
            <DashboardCard title="Overdue Borrowers">
              {loading ? (
                <li className="text-xs p-3 rounded-lg flex items-center gap-3">Loading...</li>
              ) : overdueBorrowers.length > 0 ? (
                overdueBorrowers.map((borrower) => (
                  <li key={borrower.id} className="text-xs bg-transparent border border-[#0a0f33] dark:border-[#929292] px-3 py-4 h-16 rounded-2xl flex items-center gap-3 mb-2 dark:bg-[#929292]">
                    <div className="w-8 h-8 bg-[#0a0f33] dark:bg-[#929292] rounded-lg flex items-center justify-center shrink-0">
                      <User size={16} className="text-white dark:text-black" />
                    </div>
                    <div className='w-[1.8px] h-full bg-[#0b0b3b] dark:bg-black rounded-full'></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#0a0f33] dark:text-black">{borrower.userName}</p>
                      <p className="text-xs font-medium text-[#6f7390] dark:text-black">Borrowed ID: {borrower.borrowedId}</p>
                    </div>
                    <MaximizeIcon
                      className="w-8 h-8 text-[#0a0f33] dark:text-black cursor-pointer"
                      onClick={() => handleViewDetails(borrower, 'overdue')}
                    />
                  </li>
                ))
              ) : (
                <li className="text-xs  p-3 rounded-lg text-gray-500">No overdue books</li>
              )}
            </DashboardCard>
          </div>

          <div className="flex-1 flex flex-col snap-center min-h-0">
            <DashboardCard title="Branch Network">
              {branchesLoading ? (
                <li className="text-xs  p-3 rounded-lg flex items-center gap-3">Loading...</li>
              ) : Array.isArray(branches) && branches.length > 0 ? (
                branches.map((branch) => (
                  <li key={branch.id} className="text-xs bg-transparent border border-[#0a0f33] dark:border-[#292D32] px-3 py-2 h-16 rounded-2xl flex items-center gap-3 mb-2 dark:bg-[#929292]">
                    <div className="w-10 h-8 p4 rounded-lg flex items-center justify-center shrink-0">
                      <Building2 className="text-[#0a0f33] dark:text-black  h-full w-full" />
                    </div>
                    <div className='w-[1.8px] h-full bg-[#0b0b3b] dark:bg-black '></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#0a0f33] dark:text-black">{branch.name}</p>
                      <p className="text-xs font-medium text-[#0a0f33] dark:text-black">{branch.location || branch.address || 'Location not specified'}</p>
                    </div>
                    <MaximizeIcon
                      className="w-8 h-8 text-[#0a0f33] dark:text-black cursor-pointer"
                      onClick={() => handleViewDetails(branch, 'branch')}
                    />
                  </li>
                ))
              ) : (
                <li className="text-xs  p-3 rounded-lg text-gray-500">No branches found</li>
              )}
            </DashboardCard>
          </div>

          <div className='h-[380px] max-[1540px]:h-full max-[1540px]:flex-1 max-[1540px]:flex hidden flex-col snap-end'>
            <AdminDashboardCard
              loading={loading}
              displayAdmins={displayAdmins}
              handleRefreshAdmins={handleRefreshAdmins}
              loadingAdmins={loadingAdmins}
            />
          </div>
        </div>
      </section>

      {showViewDetails && (
        <ViewDetailsPopup
          show={showViewDetails}
          onClose={() => {
            setShowViewDetails(false);
            setViewDetailsItem(null);
            setViewDetailsType(null);
          }}
          title={viewDetailsType === 'branch' ? "View Branch" : "Overdue Details"}
          data={(() => {
            if (!viewDetailsItem) return null;
            if (viewDetailsType === 'overdue') {
              return {
                "Borrower Name": viewDetailsItem.userName,
                "Book ID": viewDetailsItem.borrowedId,
                "User ID": viewDetailsItem.userId || 'N/A'
              };
            }
            return {
              "Branch ID": viewDetailsItem.branch_id,
              "Name": viewDetailsItem.name,
              "Contact No": viewDetailsItem.contact_number,
              "Location": viewDetailsItem.location,
              // 'Book Copies': (() => {
              //   const branchCopies = bookCopies.filter(bc => bc.branch_id === viewDetailsItem.branch_id);
              //   if (branchCopies.length === 0) return 'No books in this branch';
              //   const bookDetails = branchCopies.map(bc => {
              //     const book = books.find(b => b.book_id === bc.book_id);
              //     return `${book?.name || 'Unknown'} (${bc.book_copy_id})`;
              //   });
              //   return bookDetails.join(', ');
              // })()
            };
          })()}
          savedBy={viewDetailsType === 'branch' && viewDetailsItem ? getCreatorName(viewDetailsItem.created_by) : null}
        />
      )}
    </div>
  );
}

export default Dashboard;