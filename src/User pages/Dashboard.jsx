import React, { useState, useMemo } from "react";
import { Search, ChevronDown, ArrowLeft, ArrowRight } from "lucide-react";
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
import { getImageUrl } from "../services/api.config";

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
  const [booksPerPage, setBooksPerPage] = useState(8);

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1300) {
        setBooksPerPage(4); // 2 cols * 2 rows
      } else if (width < 1400) {
        setBooksPerPage(6); // 3 cols * 2 rows
      } else {
        setBooksPerPage(8); // 4 cols * 2 rows
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const currentUserFromList = useMemo(() => {
    if (!currentUser?.user_id) return null;
    return (
      users.find(
        (u) => String(u.user_id ?? u.id ?? "") === String(currentUser.user_id),
      ) || null
    );
  }, [users, currentUser?.user_id]);

  const subscriptionExpirationRaw =
    currentUserFromList?.subscription_end_date ||
    currentUserFromList?.subscription_expiration_date ||
    currentUserFromList?.subscription_expiry_date ||
    currentUserFromList?.plan_expiration_date ||
    currentUserFromList?.expiration_date ||
    currentUser?.subscription_end_date ||
    currentUser?.subscription_expiration_date ||
    currentUser?.subscription_expiry_date ||
    currentUser?.plan_expiration_date ||
    currentUser?.expiration_date ||
    null;

  const subscriptionExpirationLabel = useMemo(() => {
    if (!subscriptionExpirationRaw) return "N/A";
    const parsedDate = new Date(subscriptionExpirationRaw);
    if (Number.isNaN(parsedDate.getTime())) return "N/A";
    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }, [subscriptionExpirationRaw]);

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
      <main className="flex h-full flex-1 flex-col gap-3 px-5 py-3">
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
              className="w-full rounded-md border border-zinc-400 bg-white py-1.5 pl-10 pr-3.5 text-sm transition-colors focus:outline-none dark:border-[#292D32] dark:bg-[#121317] dark:text-[#D7D7D7]"
            />
          </div>
          <div className="mr-22 relative w-full min-w-[162px] max-w-[531px] flex-1">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(0);
              }}
              className="w-full cursor-pointer appearance-none rounded-md border border-zinc-400 bg-white px-3.5 py-1.5 pr-9 text-sm transition-colors focus:outline-none dark:border-[#292D32] dark:bg-[#121317] dark:text-[#D7D7D7]"
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
        <section className="flex h-full gap-3 max-[640px]:flex-col">
          <div
            className={`min-[1540px]:ml-18 flex-3 flex w-full flex-col items-center justify-center gap-3 max-[640px]:mx-auto max-[640px]:max-w-[300px] max-[640px]:flex-none min-[640px]:order-last min-[640px]:h-full`}
          >
            <div className="flex h-full w-full flex-col items-center justify-start rounded-md min-[1200px]:mb-6">
              <div className="max-3xl:items-start max-[430px]:scale-80 [430px]:mx-0 flex h-full w-full flex-col items-center justify-between gap-6 overflow-hidden max-[380px]:w-[110%]">
                <div className="relative flex min-h-0 w-full min-w-0 flex-1 flex-col items-center justify-center overflow-hidden max-[640px]:min-h-[162px] max-[340px]:-ml-9">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PieChart
                      totalBorrowed={stats.totalBorrowed}
                      currentlyBorrowed={stats.currentlyBorrowed}
                      returnedBooks={stats.returnedBooks}
                      className="h-full w-full"
                    />
                  </div>
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
          <div className="min-[640px]:flex-4 flex w-full flex-col gap-[18px] min-[640px]:h-full">
            <div className="flex items-center justify-between border-b border-[#525252] dark:border-[#2C2D33]">
              <div className="flex gap-16">
                <button
                  onClick={() => {
                    setActiveTab("recommended");
                    setCurrentPage(0);
                  }}
                  className={`w-45 relative pb-3 text-base font-semibold transition-colors ${
                    activeTab === "recommended"
                      ? "text-[#0b0c28] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#0b0c28] dark:text-[#D7D7D7] dark:after:bg-white"
                      : "text-[#525252] hover:text-gray-600 dark:hover:text-gray-300"
                  }`}
                >
                  Recommended
                </button>
                <button
                  onClick={() => {
                    setActiveTab("recently");
                    setCurrentPage(0);
                  }}
                  className={`w-45 relative pb-3 text-base font-semibold transition-colors ${
                    activeTab === "recently"
                      ? "text-[#0b0c28] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#0b0c28] dark:text-[#D7D7D7] dark:after:bg-white"
                      : "text-[#525252] hover:text-gray-600 dark:hover:text-gray-300"
                  }`}
                >
                  Recently added
                </button>
              </div>
              <div className="flex items-center gap-3 pb-1.5">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className={`rounded transition-colors ${
                    currentPage === 0
                      ? "cursor-not-allowed text-[#525252] dark:text-gray-600"
                      : "text-[#000035] hover:opacity-75 dark:text-[#D7D7D7] dark:hover:text-white"
                  }`}
                >
                  <ArrowLeft size={20} strokeWidth={1.5} />
                </button>
                <div className="flex gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-[1.5px] w-[10px] rounded-full transition-colors ${
                        i === Math.min(currentPage, 2)
                          ? "bg-[#000035] dark:bg-[#585858]"
                          : "bg-[#525252] dark:bg-white"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages - 1}
                  className={`rounded transition-colors ${
                    currentPage >= totalPages - 1
                      ? "cursor-not-allowed text-[#525252] dark:text-gray-600"
                      : "text-[#000035] hover:opacity-75 dark:text-[#D7D7D7] dark:hover:text-white"
                  }`}
                >
                  <ArrowRight size={20} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <div className="grid w-full grid-cols-4 place-items-center gap-y-5 max-[1400px]:grid-cols-3 max-[1300px]:grid-cols-2">
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
                    className="flex h-60 w-40 cursor-pointer flex-col items-center justify-between overflow-hidden rounded-lg bg-white px-2 py-2 transition-shadow dark:bg-transparent"
                  >
                    <div className="flex h-36 w-full items-center justify-center overflow-hidden rounded-md">
                      {getImageUrl(book.image_url) ? (
                        <img
                          src={getImageUrl(book.image_url)}
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
                    <div className="flex w-full flex-col gap-1">
                      <h3 className="text-md line-clamp-2 text-center font-semibold text-[#0b0c28] text-black dark:text-[#D7D7D7]">
                        {book.name || "Untitled"}
                      </h3>
                      <button
                        className="w-full cursor-pointer whitespace-nowrap rounded-xl bg-[#0b0c28] py-1.5 text-[17px] font-bold text-white transition-colors dark:bg-[#D7D7D7] dark:text-black"
                        onClick={() => setSelectedBook(book)}
                      >
                        Explore Now
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mb-10 mt-auto flex w-full justify-center">
              <div className="text-md w-fit rounded-md bg-white p-3 pr-6 dark:bg-transparent">
                <p className="text-[#0b0c28] dark:text-white">
                  Dear {currentUser?.name || "User"}, please note that your
                  subscription will expire on{" "}
                  <span className="block font-bold">
                    {subscriptionExpirationLabel}.
                  </span>
                </p>
                <p className="mt-1 text-[#0b0c28] dark:text-white">
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
            imageUrl={getImageUrl(selectedBook.image_url)}
            imageAlt={selectedBook.name || "Book cover"}
            data={{
              "Book ID": selectedBook.book_id,
              "Book Name": selectedBook.name,
              ...(selectedBook.author ? { Author: selectedBook.author } : {}),
              Branch:
                selectedBook.branch ||
                branches.find(
                  (branch) =>
                    String(branch.branch_id) === String(selectedBook.branch_id),
                )?.name ||
                "N/A",
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
