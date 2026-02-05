import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Styles/Dashboard.module.css';
import LogoIcon from '../assets/logo.svg?react';
import PieChart from '../components/PieChart';
import PieChartLegend from '../components/PieChartLegend';
import { useUsers } from '../hooks/useUsers';
import { useBooks } from '../hooks/useBooks';
import { useCategories } from '../hooks/useCategories';
import { useReservations } from '../hooks/useReservations';
import { useBranches } from '../hooks/useBranches';
import { useOverdueBooks } from '../hooks/useOverdueBooks';
import { useBookTransactions } from '../hooks/useBookTransactions';
import { getCurrentUser } from '../services/auth.api';

function Dashboard() {
  const currentUser = getCurrentUser();
  const { data: users = [], isLoading: usersLoading } = useUsers();
  const { data: books = [], isLoading: booksLoading } = useBooks();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: reservations = [], isLoading: reservationsLoading } = useReservations();
  const { data: branches = [], isLoading: branchesLoading } = useBranches();
  const { data: overdueBooksData = [], isLoading: overdueLoading } = useOverdueBooks();
  const { data: bookTransactions = [], isLoading: transactionsLoading } = useBookTransactions();

  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeTab, setActiveTab] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 8;

  const loading = usersLoading || booksLoading || reservationsLoading || branchesLoading || overdueLoading || categoriesLoading || transactionsLoading;

  // Filter transactions for the current user only
  const userBorrowedTransactions = Array.isArray(bookTransactions) ? bookTransactions.filter(
    t => t.transaction_type === 'Check-Out' && t.status === 'Completed' && t.user_id === currentUser?.user_id
  ) : [];
  const userReturnedBooks = userBorrowedTransactions.filter(t => t.return_date).length;
  const userCurrentlyBorrowed = userBorrowedTransactions.filter(t => !t.return_date).length;
  const userTotalBorrowed = userBorrowedTransactions.length;

  const stats = {
    totalUsers: users?.length || 0,
    totalBooks: books?.length || 0,
    branchCount: branches?.length || 0,
    totalBorrowed: userTotalBorrowed,
    currentlyBorrowed: userCurrentlyBorrowed,
    returnedBooks: userReturnedBooks
  };

  const filteredBooks = useMemo(() => {
    let result = [...books];

    if (searchValue) {
      result = result.filter(book =>
        book.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter(book =>
        book.category_id === parseInt(selectedCategory) ||
        book.category === selectedCategory
      );
    }

    if (activeTab === 'recently') {
      result = result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return result;
  }, [books, searchValue, selectedCategory, activeTab]);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const paginatedBooks = filteredBooks.slice(currentPage * booksPerPage, (currentPage + 1) * booksPerPage);

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <div className={styles.dashboardContainer}>
      <main className={styles.mainContent}>
        <section className={styles.dashboardBody}>
          <div className={styles.cards}>
            <div className="flex gap-4 items-center w-full">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search for book"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    setCurrentPage(0);
                  }}
                  className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 bg-white dark:bg-[#121317] dark:text-white dark:border-[#292D32] text-sm focus:outline-none focus:border-[#0b0c28] transition-colors"
                />
              </div>
              <div className="relative min-w-[180px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(0);
                  }}
                  className="w-full appearance-none px-4 py-3 pr-10 rounded-lg border border-gray-200 bg-white dark:bg-[#121317] dark:text-white dark:border-[#292D32] text-sm focus:outline-none focus:border-[#0b0c28] transition-colors cursor-pointer"
                >
                  <option value="">Category</option>
                  {categories.map(cat => (
                    <option key={cat.category_id} value={cat.category_id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-6">
                <button
                  onClick={() => {
                    setActiveTab('recommended');
                    setCurrentPage(0);
                  }}
                  className={`pb-2 text-sm font-medium transition-colors relative ${activeTab === 'recommended'
                    ? 'text-[#0b0c28] dark:text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#0b0c28] dark:after:bg-white'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                    }`}
                >
                  Recommended
                </button>
                <button
                  onClick={() => {
                    setActiveTab('recently');
                    setCurrentPage(0);
                  }}
                  className={`pb-2 text-sm font-medium transition-colors relative ${activeTab === 'recently'
                    ? 'text-[#0b0c28] dark:text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#0b0c28] dark:after:bg-white'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                    }`}
                >
                  Recently added
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className={`p-1 rounded transition-colors ${currentPage === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(totalPages, 4) }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors ${i === currentPage ? 'bg-[#0b0c28]' : 'bg-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages - 1}
                  className={`p-1 rounded transition-colors ${currentPage >= totalPages - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 max-[1200px]:grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
              {loading ? (
                <div className="col-span-full text-center py-10 text-gray-500">Loading books...</div>
              ) : paginatedBooks.length === 0 ? (
                <div className="col-span-full text-center py-10 text-gray-500">No books found</div>
              ) : (
                paginatedBooks.map((book) => (
                  <div
                    key={book.book_id || book.id}
                    className="bg-white dark:bg-[#121317] rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center"
                  >
                    <div className="w-full h-36 bg-gradient-to-br from-[#f97316] to-[#ea580c] rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                      {book.cover_image ? (
                        <img
                          src={book.cover_image}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-white text-center p-2">
                          <div className="text-xs font-bold uppercase tracking-wider opacity-80">MY TURN</div>
                          <div className="text-[10px] mt-1 opacity-60">JUAN CARLOS</div>
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-[#0b0c28] dark:text-[#E8E8E8] text-center line-clamp-1 mb-2">
                      {book.title || 'MY TURN'}
                    </h3>
                    <button className="bg-[#0b0c28] text-white text-xs px-4 py-2 rounded-md hover:bg-[#1a1b4b] transition-colors">
                      Explore Now
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="bg-white dark:bg-[#121317] rounded-xl p-5 shadow-sm border-l-4 border-[#0b0c28] dark:border-[#E8E8E8] mt-2">
              <p className="text-sm text-[#0b0c28] dark:text-[#E8E8E8]">
                Dear {currentUser?.name || 'Ahmed'}, please note that your subscription will expire on{' '}
                <span className="font-semibold">1/1/2026</span>.
              </p>
              <p className="text-sm text-[#0b0c28] dark:text-[#E8E8E8] mt-1">
                To renew your subscription, kindly visit the nearest branch.
              </p>
            </div>
          </div>

          {/* Pie chart inspired by admin/pages/Dashboard.jsx */}
          <div className={`${styles.cards} flex-1 max-[1540px]:h-80 max-[1540px]:flex-none w-full items-center max-[1540px]:mx-0 ml-20`}>
            <div className="h-full rounded-lg w-full flex flex-col items-center justify-center min-[1200px]:mb-15">
              <div className="flex max-[1540px]:flex-row flex-col gap-16 justify-center max-3xl:items-start items-center max-[1540px]:-mr-8 w-full max-w-[700px] h-full max-[1080px]:h-60 max-[430px]:scale-80 [430px]:mx-0 -ml-10 max-[380px]:w-[110%]">
                <PieChartLegend variant="mobile" />
                <div className='max-[1540px]:w-[180px] w-full h-fit max-[1540px]:min-h-[180px] max-[1080px]:w-[200px] max-[1080px]:h-full max-[340px]:-ml-10'>
                  <PieChart totalBorrowed={stats.totalBorrowed} currentlyBorrowed={stats.currentlyBorrowed} returnedBooks={stats.returnedBooks} />
                </div>
                <PieChartLegend variant="desktop" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
