import React, { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

import LogoIcon from "../assets/logo.svg?react";
import PieChart from "../components/PieChart";
import PieChartLegend from "../components/PieChartLegend";
import { useUsers } from "../hooks/useUsers";
import { useBooks } from "../hooks/useBooks";
import { useCategories } from "../hooks/useCategories";
import { useReservations } from "../hooks/useReservations";
import { useBranches } from "../hooks/useBranches";
import { useOverdueBooks } from "../hooks/useOverdueBooks";
import { useBookTransactions } from "../hooks/useBookTransactions";
import { getCurrentUser } from "../services/auth.api";
import JuhanCruyff from "../Home/assets/img/Juhan Cruyff.png";

const dummyBooks = [
  {
    book_id: -1,
    name: "MY TURN",
    author: "JUAN CARLOS",
    image_url: JuhanCruyff,
  },
  {
    book_id: -2,
    name: "MY TURN",
    author: "JUAN CARLOS",
    image_url: JuhanCruyff,
  },
  {
    book_id: -3,
    name: "MY TURN",
    author: "JUAN CARLOS",
    image_url: JuhanCruyff,
  },
  {
    book_id: -4,
    name: "MY TURN",
    author: "JUAN CARLOS",
    image_url: JuhanCruyff,
  },
  {
    book_id: -5,
    name: "MY TURN",
    author: "JUAN CARLOS",
    image_url: JuhanCruyff,
  },
  {
    book_id: -6,
    name: "MY TURN",
    author: "JUAN CARLOS",
    image_url: JuhanCruyff,
  },
  {
    book_id: -7,
    name: "MY TURN",
    author: "JUAN CARLOS",
    image_url: JuhanCruyff,
  },
  {
    book_id: -8,
    name: "MY TURN",
    author: "JUAN CARLOS",
    image_url: JuhanCruyff,
  },
];

function Dashboard() {
  const currentUser = getCurrentUser();
  const { data: users = [], isLoading: usersLoading } = useUsers();
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
      result = result.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
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
              className="w-full rounded-md border border-zinc-400 bg-white py-2.5 pl-10 pr-3.5 text-sm transition-colors focus:border-[#0b0c28] focus:outline-none dark:border-[#292D32] dark:bg-[#121317] dark:text-white"
            />
          </div>
          <div className="mr-22 relative w-full min-w-[162px] max-w-[531px] flex-1">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(0);
              }}
              className="w-full cursor-pointer appearance-none rounded-md border border-zinc-400 bg-white px-3.5 py-2.5 pr-9 text-sm transition-colors focus:border-[#0b0c28] focus:outline-none dark:border-[#292D32] dark:bg-[#121317] dark:text-white"
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
        <section className="flex h-full gap-[22px]">
          <div className="flex h-full flex-1 flex-col gap-[18px]">
            <div className="flex items-center justify-between border-b">
              <div className="flex gap-5">
                <button
                  onClick={() => {
                    setActiveTab("recommended");
                    setCurrentPage(0);
                  }}
                  className={`font-regular relative pb-1.5 text-base transition-colors ${
                    activeTab === "recommended"
                      ? "text-[#0b0c28] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#0b0c28] dark:text-white dark:after:bg-white"
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
                      ? "text-[#0b0c28] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#0b0c28] dark:text-white dark:after:bg-white"
                      : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  }`}
                >
                  Recently added
                </button>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className={`rounded p-1 transition-colors ${
                    currentPage === 0
                      ? "cursor-not-allowed text-gray-300"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex gap-1">
                  <div
                    className={`h-0.5 w-2 rounded-full bg-gray-300 transition-colors`}
                  />
                  <div
                    className={`h-0.5 w-2 rounded-full bg-gray-300 transition-colors`}
                  />
                  <div
                    className={`h-0.5 w-2 rounded-full bg-gray-300 transition-colors`}
                  />
                </div>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages - 1}
                  className={`rounded p-1 transition-colors ${
                    currentPage >= totalPages - 1
                      ? "cursor-not-allowed text-gray-800"
                      : "text-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="gap-13 grid w-full grid-cols-4 place-items-center max-[1200px]:grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
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
                    className="flex h-60 w-36 cursor-pointer flex-col items-center overflow-hidden rounded-lg bg-white p-4 transition-shadow"
                  >
                    <div className="mb-2.5 flex h-36 w-full items-center justify-center overflow-hidden rounded-md">
                      {book.image_url ? (
                        <img
                          src={book.image_url}
                          alt={book.name}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <div className="p-2 text-center text-black">
                          <div className="line-clamp-2 text-xs font-bold uppercase tracking-wider opacity-80">
                            {book.name}
                          </div>
                          {book.author && (
                            <div className="mt-1 text-[10px] opacity-60">
                              {book.author}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <h3 className="mb-1.5 line-clamp-1 text-center text-sm font-semibold text-[#0b0c28]">
                      {book.name || "Untitled"}
                    </h3>
                    <button className="rounded-md bg-[#0b0c28] px-5 py-2 text-xs text-white transition-colors hover:bg-[#1a1b4b]">
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

          {/* Pie chart inspired by admin/pages/Dashboard.jsx */}
          <div
            className={`ml-18 flex h-full w-full max-w-[630px] flex-1 flex-col items-center justify-start gap-[18px] max-[1540px]:mx-0 max-[1540px]:h-72 max-[1540px]:flex-none`}
          >
            <div className="min-[1200px]:mb-13 flex h-full w-full flex-col items-center justify-center rounded-md">
              <div className="max-3xl:items-start max-[1080px]:h-54 max-[430px]:scale-80 [430px]:mx-0 -ml-9 flex h-full w-full max-w-[630px] flex-col items-center justify-center gap-14 max-[1540px]:-mr-7 max-[1540px]:flex-row max-[380px]:w-[110%]">
                <PieChartLegend variant="mobile" />
                <div className="h-fit w-full max-[1540px]:min-h-[162px] max-[1540px]:w-[162px] max-[1080px]:h-full max-[1080px]:w-[180px] max-[340px]:-ml-9">
                  <PieChart
                    totalBorrowed={stats.totalBorrowed}
                    currentlyBorrowed={stats.currentlyBorrowed}
                    returnedBooks={stats.returnedBooks}
                  />
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
