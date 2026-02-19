import React, { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import PieChart from "../components/PieChart";
import PieChartLegend from "../components/PieChartLegend";
import ViewDetailsPopup from "../components/ViewDetailsPopup";
import { useUsers } from "../hooks/useUsers";
import { useBooks } from "../hooks/useBooks";
import { useCategories } from "../hooks/useCategories";
import { useReservations } from "../hooks/useReservations";
import { useBranches } from "../hooks/useBranches";
import { useOverdueBooks } from "../hooks/useOverdueBooks";
import { useBookTransactions } from "../hooks/useBookTransactions";
import { getCurrentUser } from "../services/auth.api";

function Dashboard() {
  const currentUser = getCurrentUser();
  const { data: usersData, isLoading: usersLoading } = useUsers();
  const users = usersData
    ? usersData.pages.flatMap((page) => page.data || [])
    : [];
  const { data: books = [], isLoading: booksLoading } = useBooks();
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();
  const { data: reservations = [], isLoading: reservationsLoading } =
    useReservations();
  const { data: branches = [], isLoading: branchesLoading } = useBranches();
  const { data: overdueBooksData = [], isLoading: overdueLoading } =
    useOverdueBooks();
  const { data: bookTransactions = [], isLoading: transactionsLoading } =
    useBookTransactions();

  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeTab, setActiveTab] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedBook, setSelectedBook] = useState(null);
  const booksPerPage = 8;

  const loading =
    usersLoading ||
    booksLoading ||
    reservationsLoading ||
    branchesLoading ||
    overdueLoading ||
    categoriesLoading ||
    transactionsLoading;

  // Filter transactions for the current user only
  const userBorrowedTransactions = Array.isArray(bookTransactions)
    ? bookTransactions.filter(
        (t) =>
          t.transaction_type === "Check-Out" &&
          t.status === "Completed" &&
          t.user_id === currentUser?.user_id,
      )
    : [];
  const userReturnedBooks = userBorrowedTransactions.filter(
    (t) => t.return_date,
  ).length;
  const userCurrentlyBorrowed = userBorrowedTransactions.filter(
    (t) => !t.return_date,
  ).length;
  const userTotalBorrowed = userBorrowedTransactions.length;

  const stats = {
    totalUsers: users?.length || 0,
    totalBooks: books?.length || 0,
    branchCount: branches?.length || 0,
    totalBorrowed: userTotalBorrowed,
    currentlyBorrowed: userCurrentlyBorrowed,
    returnedBooks: userReturnedBooks,
  };

  const filteredBooks = useMemo(() => {
    let result = [...books];

    if (searchValue) {
      result = result.filter((book) =>
        book.name?.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }

    if (selectedCategory) {
      result = result.filter(
        (book) =>
          book.category_id === parseInt(selectedCategory) ||
          book.category === selectedCategory,
      );
    }

    if (activeTab === "recently") {
      result = result.sort((a, b) => {
        const dateA = new Date(a.created_at || 0);
        const dateB = new Date(b.created_at || 0);
        return dateB - dateA || b.book_id - a.book_id;
      });
    }

    return result;
  }, [books, searchValue, selectedCategory, activeTab]);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage) || 1;
  const paginatedBooks = filteredBooks.slice(
    currentPage * booksPerPage,
    (currentPage + 1) * booksPerPage,
  );

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex h-full w-full">
      <main className="flex h-full flex-1 flex-col gap-[18px] px-[27px] py-[18px]">
        <div className="flex w-full items-center gap-3.5">
          <div className="relative flex-1">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search for book"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setCurrentPage(0);
              }}
              className="w-full rounded-md border border-zinc-400 bg-white py-2.5 pl-10 pr-3.5 text-sm transition-colors focus:outline-none dark:border-[#292D32] dark:bg-[#121317] dark:text-[#D7D7D7]"
            />
          </div>
          <div className="mr-22 relative w-full min-w-[162px] max-w-[531px] flex-1">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(0);
              }}
              className="w-full cursor-pointer appearance-none rounded-md border border-zinc-400 bg-white px-3.5 py-2.5 pr-9 text-sm transition-colors focus:outline-none dark:border-[#292D32] dark:bg-[#121317] dark:text-[#D7D7D7]"
            >
              <option value="">Category</option>
              {categories.map((cat) => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.category_name || cat.name}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>
        </div>
        <section className="flex h-full gap-[22px] max-[640px]:flex-col">
          <div
            className={`min-[1540px]:ml-18 flex w-full flex-1 flex-col items-center justify-center gap-[18px] max-[640px]:mx-auto max-[640px]:max-w-[300px] max-[640px]:flex-none min-[640px]:order-last min-[640px]:h-full`}
          >
            <div className="min-[1200px]:mb-13 flex h-full w-full flex-col items-center justify-start rounded-md">
              <div className="max-3xl:items-start max-[430px]:scale-80 [430px]:mx-0 flex h-full w-full max-w-[630px] flex-col items-center justify-start gap-10 p-10 max-[380px]:w-[110%]">
                <div className="h-fit w-full max-[640px]:min-h-[162px] max-[640px]:w-full max-[340px]:-ml-9">
                  <PieChart
                    totalBorrowed={stats.totalBorrowed}
                    currentlyBorrowed={stats.currentlyBorrowed}
                    returnedBooks={stats.returnedBooks}
                    className="!max-h-full !max-w-full"
                  />
                </div>
                <PieChartLegend
                  variant="mobile"
                  className="scale-125 max-[1540px]:!hidden max-[1080px]:!flex"
                />
                <PieChartLegend
                  variant="desktop"
                  className="max-[1540px]:!flex max-[1080px]:!hidden"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-[18px] min-[640px]:h-full min-[640px]:flex-1">
            <div className="flex items-center justify-between border-b border-[#EAEAEA] dark:border-[#2C2D33]">
              <div className="flex gap-5">
                <button
                  onClick={() => {
                    setActiveTab("recommended");
                    setCurrentPage(0);
                  }}
                  className={`font-regular relative pb-1.5 text-base transition-colors ${
                    activeTab === "recommended"
                      ? "text-[#0b0c28] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#0b0c28] dark:text-[#D7D7D7] dark:after:bg-white"
                      : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  }`}
                >
                  Recommended
                </button>
                <button
                  onClick={() => {
                    setActiveTab("recently");
                    setCurrentPage(0);
                  }}
                  className={`font-regular relative pb-1.5 text-base transition-colors ${
                    activeTab === "recently"
                      ? "text-[#0b0c28] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#0b0c28] dark:text-[#D7D7D7] dark:after:bg-white"
                      : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  }`}
                >
                  Recently added
                </button>
              </div>
              <div className="flex items-center gap-1.5 pb-1.5">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className={`rounded p-1 transition-colors ${
                    currentPage === 0
                      ? "cursor-not-allowed text-gray-300 dark:text-gray-600"
                      : "text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#2C2D33]"
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex gap-1">
                  <div
                    className={`h-0.5 w-2 rounded-full bg-gray-300 transition-colors dark:bg-[#585858]`}
                  />
                  <div
                    className={`h-0.5 w-2 rounded-full bg-gray-300 transition-colors dark:bg-[#585858]`}
                  />
                  <div
                    className={`h-0.5 w-2 rounded-full bg-gray-300 transition-colors dark:bg-[#585858]`}
                  />
                </div>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages - 1}
                  className={`rounded p-1 transition-colors ${
                    currentPage >= totalPages - 1
                      ? "cursor-not-allowed text-gray-300 dark:text-gray-600"
                      : "text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#2C2D33]"
                  }`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="gap-13 grid w-full grid-cols-4 place-items-center max-[1400px]:grid-cols-3 max-[1300px]:grid-cols-2">
              {loading ? (
                <div className="col-span-full py-9 text-center text-gray-500">
                  Loading books...
                </div>
              ) : paginatedBooks.length === 0 ? (
                <div className="col-span-full py-9 text-center text-gray-500">
                  No books found
                </div>
              ) : (
                paginatedBooks.map((book) => (
                  <div
                    key={book.book_id}
                    className="flex h-60 w-36 cursor-pointer flex-col items-center overflow-hidden rounded-lg bg-white p-4 transition-shadow dark:bg-transparent"
                  >
                    <div className="mb-2.5 flex h-36 w-full items-center justify-center overflow-hidden rounded-md">
                      {book.image_url ? (
                        <img
                          src={book.image_url}
                          alt={book.name}
                          className="h-full w-full object-contain text-black dark:text-[#D7D7D7]"
                        />
                      ) : (
                        <div className="p-2 text-center text-black dark:text-[#D7D7D7]">
                          <div className="line-clamp-2 text-xs font-bold uppercase tracking-wider text-black opacity-80 dark:text-[#D7D7D7]">
                            {book.name}
                          </div>
                          {book.author && (
                            <div className="mt-1 text-[10px] text-black opacity-60 dark:text-[#D7D7D7]">
                              {book.author}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <h3 className="mb-1.5 text-center text-sm font-semibold text-[#0b0c28] text-black dark:text-[#D7D7D7]">
                      {book.name || "Untitled"}
                    </h3>
                    <button
                      className="cursor-pointer whitespace-nowrap rounded-xl bg-[#0b0c28] px-4 py-2 text-xs font-bold text-white transition-colors dark:bg-[#D7D7D7] dark:text-black"
                      onClick={() => setSelectedBook(book)}
                    >
                      Explore Now
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="my-auto flex w-full justify-center">
              <div className="pr-13 w-fit rounded-md bg-white p-6 text-lg">
                <p className="text-[#0b0c28]">
                  Dear {currentUser?.name || "Ahmed"}, please note that your
                  subscription will expire on{" "}
                  <span className="block font-bold">1/1/2026.</span>
                </p>
                <p className="mt-2 text-[#0b0c28]">
                  To renew your subscription, kindly visit the nearest branch.
                </p>
              </div>
            </div>
          </div>
        </section>
        {selectedBook && (
          <ViewDetailsPopup
            show={!!selectedBook}
            onClose={() => setSelectedBook(null)}
            title="Book Details"
            data={{
              "Book Name": selectedBook.name,
              Author: selectedBook.author || "N/A",
              Category:
                categories.find(
                  (c) => c.category_id === selectedBook.category_id,
                )?.category_name ||
                selectedBook.category ||
                "N/A",
              Language: selectedBook.language || "N/A",
              Status: selectedBook.status || "N/A",
              Description:
                selectedBook.description || "No description available.",
            }}
          />
        )}
      </main>
    </div>
  );
}

export default Dashboard;
