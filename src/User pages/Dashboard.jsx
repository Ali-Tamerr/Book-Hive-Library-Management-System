import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

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
import JuhanCruyff from '../Home/assets/img/Juhan Cruyff.png';

const dummyBooks = [
  { book_id: -1, name: 'MY TURN', author: 'JUAN CARLOS', image_url: JuhanCruyff },
  { book_id: -2, name: 'MY TURN', author: 'JUAN CARLOS', image_url: JuhanCruyff },
  { book_id: -3, name: 'MY TURN', author: 'JUAN CARLOS', image_url: JuhanCruyff },
  { book_id: -4, name: 'MY TURN', author: 'JUAN CARLOS', image_url: JuhanCruyff },
  { book_id: -5, name: 'MY TURN', author: 'JUAN CARLOS', image_url: JuhanCruyff },
  { book_id: -6, name: 'MY TURN', author: 'JUAN CARLOS', image_url: JuhanCruyff },
  { book_id: -7, name: 'MY TURN', author: 'JUAN CARLOS', image_url: JuhanCruyff },
  { book_id: -8, name: 'MY TURN', author: 'JUAN CARLOS', image_url: JuhanCruyff },
];

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
        book.name?.toLowerCase().includes(searchValue.toLowerCase())
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

    // Pad with dummy books if needed (only if searched/filtered count is less than 8, or always? User said "if another book is added ... remove one from dummy")
    // This implies filling the view to 8.
    if (result.length < 8) {
      const needed = 8 - result.length;
      result = [...result, ...dummyBooks.slice(0, needed)];
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
    <div className="flex h-full w-full">
      <main className="flex-1 h-full px-[27px] py-[18px] flex flex-col gap-[18px]">
        <div className="flex gap-3.5 items-center w-full">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search for book"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setCurrentPage(0);
              }}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-md border border-zinc-400 bg-white dark:bg-[#121317] dark:text-white dark:border-[#292D32] text-sm focus:outline-none focus:border-[#0b0c28] transition-colors"
            />
          </div>
          <div className="relative flex-1 w-full max-w-[531px] min-w-[162px] mr-22">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(0);
              }}
              className="w-full appearance-none px-3.5 py-2.5 pr-9 rounded-md border border-zinc-400 bg-white dark:bg-[#121317] dark:text-white dark:border-[#292D32] text-sm focus:outline-none focus:border-[#0b0c28] transition-colors cursor-pointer"
            >
              <option value="">Category</option>
              {categories.map(cat => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.category_name || cat.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
        <section className="flex h-full gap-[22px]">
          <div className="flex h-full flex-col flex-1 gap-[18px]">


            <div className="flex items-center border-b justify-between">
              <div className="flex gap-5 ">
                <button
                  onClick={() => {
                    setActiveTab('recommended');
                    setCurrentPage(0);
                  }}
                  className={`pb-1.5 text-base font-regular transition-colors relative ${activeTab === 'recommended'
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
                  className={`pb-1.5 text-base font-regular transition-colors relative ${activeTab === 'recently'
                    ? 'text-[#0b0c28] dark:text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#0b0c28] dark:after:bg-white'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                    }`}
                >
                  Recently added
                </button>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className={`p-1 rounded transition-colors ${currentPage === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-800 hover:bg-gray-100'
                    }`}
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex gap-1">
                  <div
                    className={`w-2 h-0.5 rounded-full transition-colors bg-gray-300`}
                  />
                  <div
                    className={`w-2 h-0.5 rounded-full transition-colors bg-gray-300`}
                  />
                  <div
                    className={`w-2 h-0.5 rounded-full transition-colors bg-gray-300`}
                  />
                </div>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages - 1}
                  className={`p-1 rounded transition-colors ${currentPage >= totalPages - 1 ? 'text-gray-800 cursor-not-allowed' : 'text-gray-300 hover:bg-gray-100'
                    }`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="grid w-full place-items-center grid-cols-4 gap-13 max-[1200px]:grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
              {loading ? (
                <div className="col-span-full text-center py-9 text-gray-500">Loading books...</div>
              ) : paginatedBooks.length === 0 ? (
                <div className="col-span-full text-center py-9 text-gray-500">No books found</div>
              ) : (
                paginatedBooks.map((book) => (
                  <div
                    key={book.book_id}
                    className="bg-white w-fit rounded-lg p-4 transition-shadow cursor-pointer flex flex-col items-center"
                  >
                    <div className="w-full h-36 rounded-md mb-2.5 flex items-center justify-center overflow-hidden">
                      {book.image_url ? (
                        <img
                          src={book.image_url}
                          alt={book.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="text-black text-center p-2">
                          <div className="text-xs font-bold uppercase tracking-wider opacity-80 line-clamp-2">{book.name}</div>
                          {book.author && <div className="text-[10px] mt-1 opacity-60">{book.author}</div>}
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-[#0b0c28]  text-center line-clamp-1 mb-1.5">
                      {book.name || 'Untitled'}
                    </h3>
                    <button className="bg-[#0b0c28] text-white text-xs px-5 py-2 rounded-md hover:bg-[#1a1b4b] transition-colors">
                      Explore Now
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className='flex w-full my-auto justify-center'>
              <div className="bg-white w-fit pr-13  text-sm scale-126 p-4  ">
                <p className="text-[#0b0c28] ">
                  Dear {currentUser?.name || 'Ahmed'}, please note that your subscription will expire on{' '}
                  <span className="block">1/1/2026.</span>
                </p>
                <p className="text-[#0b0c28] ">
                  To renew your subscription, kindly visit the nearest branch.
                </p>
              </div></div>
          </div>

          {/* Pie chart inspired by admin/pages/Dashboard.jsx */}
          <div className={`flex h-full justify-start flex-col flex-1 gap-[18px] flex-1 max-[1540px]:h-72 max-[1540px]:flex-none w-full max-w-[630px] items-center max-[1540px]:mx-0 ml-18`}>
            <div className="h-full rounded-md w-full  flex flex-col items-center justify-center min-[1200px]:mb-13">
              <div className="flex max-[1540px]:flex-row flex-col gap-14 justify-center max-3xl:items-start items-center max-[1540px]:-mr-7 w-full max-w-[630px] h-full max-[1080px]:h-54 max-[430px]:scale-80 [430px]:mx-0 -ml-9 max-[380px]:w-[110%]">
                <PieChartLegend variant="mobile" />
                <div className='max-[1540px]:w-[162px] w-full h-fit max-[1540px]:min-h-[162px] max-[1080px]:w-[180px] max-[1080px]:h-full max-[340px]:-ml-9'>
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
