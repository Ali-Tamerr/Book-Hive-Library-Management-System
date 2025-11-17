import React from 'react';
import { Book, RotateCcw, Library, Settings } from 'lucide-react';
import styles from './Dashboard.module.css';
import LogoIcon from '../../assets/logo.svg?react';
import PieChart from '../../admin/components/PieChart';
import { useUsers } from '../../admin/hooks/useUsers';
import { useBooks } from '../../admin/hooks/useBooks';
import { useReservations } from '../../admin/hooks/useReservations';
import { useBranches } from '../../admin/hooks/useBranches';
import { useOverdueBooks } from '../../admin/hooks/useOverdueBooks';
import { useBookSales } from '../../admin/hooks/useBookSales';
function Dashboard() {
  const { data: users = [], isLoading: usersLoading, refetch: refetchUsers } = useUsers();
  const { data: books = [], isLoading: booksLoading } = useBooks();
  const { data: reservations = [], isLoading: reservationsLoading } = useReservations();
  const { data: branches = [], isLoading: branchesLoading } = useBranches();
  const { data: overdueBooksData = [], isLoading: overdueLoading } = useOverdueBooks();
  const { data: bookSales = [], isLoading: bookSalesLoading } = useBookSales();
  const loading = usersLoading || booksLoading || reservationsLoading || branchesLoading || overdueLoading;
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

  return (
    <div className={styles.dashboardContainer}>
      {/* Main Content */}
      <main className={styles.mainContent}>


        {/* Dashboard Body */}
        <section className={styles.dashboardBody}>
          <div className={styles.cards}>
            <div className='flex gap-[20px]'>

              <div className={styles.card}>
                <div className="h-full w-1 rounded-full bg-[#0b0c28]"></div>
                <div className={styles.iconBox}><Book /></div>
                <h3 className={`text-[30px] `}>Your Borrowed Book List</h3>
              </div>

              <div className={`${styles.card}`}>
                <div className="h-full w-1 rounded-full bg-[#0b0c28]"></div>
                <div className={styles.iconBox}><RotateCcw /></div>
                <h3>Your Returned Book List</h3>
              </div>
            </div>


            <div className={`${styles.card} scale-110 ml-6`}>
              <div className="h-full w-1 rounded-full bg-[#0b0c28]"></div>
              <div className={styles.iconBox}><Library /></div>
              <h3>Let's browse available book inventory</h3>
            </div>
          </div>

          {/* Pie chart inspired by admin/pages/Dashboard.jsx */}
          <div className={`${styles.cards} h-full max-[1540px]:h-50 w-full [1540px]:mt-10 items-center max-[1540px]:mx-0 ml-20 scale-90 `}>
            <div className="h-full rounded-lg w-full flex flex-col items-center justify-between [1200px]:mb-15">
              <div className="flex max-[1540px]:flex-row flex-col gap-15 pb-20 justify-between max-3xl:items-start items-center max-[1540px]:-mr-8 w-full h-full max-[1080px]:h-min max-[430px]:scale-80 [430px]:mx-0 -ml-10  max-[380px]:w-[110%]">
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
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
