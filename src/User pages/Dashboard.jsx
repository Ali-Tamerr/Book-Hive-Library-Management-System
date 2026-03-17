import React, { useState, useMemo, useEffect } from "react";
import { Search, ChevronDown, ArrowLeft, ArrowRight } from "lucide-react";
import PieChart from "../components/PieChart";
import PieChartLegend from "../components/PieChartLegend";
import ViewDetailsPopup from "../components/ViewDetailsPopup";
import LazyImage from "../components/LazyImage";
import { useUsers } from "../hooks/useUsers";
import { useBooks, useDashboardBooks, useBook } from "../hooks/useBooks";
import { useCategories } from "../hooks/useCategories";
import { useReservations } from "../hooks/useReservations";
import { useBranches } from "../hooks/useBranches";
import { useOverdueBooks } from "../hooks/useOverdueBooks";
import { useBookTransactions } from "../hooks/useBookTransactions";
import { useBookCopies } from "../hooks/useBookCopies";
import { usePlans } from "../hooks/usePlans";
import { getCurrentUser } from "../services/auth.api";
import { apiGet, getImageUrl } from "../services/api.config";

function Dashboard() {
  const currentUser = getCurrentUser();
  const currentUserDisplayName =
    `${currentUser?.first_name || ""} ${currentUser?.last_name || ""}`.trim() ||
    currentUser?.user_id ||
    "User";
  const { data: usersData, isLoading: usersLoading } = useUsers();
  const users = usersData
    ? usersData.pages.flatMap((page) => page.data || [])
    : [];
  const [displayBooks, setDisplayBooks] = useState([]);
  const [generalStats, setGeneralStats] = useState({
    branches: 0,
    books: 0,
    users: 0,
  });
  const { data: booksSource, isLoading: booksLoading } = useDashboardBooks();
  const books = useMemo(() => {
    if (Array.isArray(booksSource)) return booksSource;
    if (booksSource?.data && Array.isArray(booksSource.data))
      return booksSource.data;
    return [];
  }, [booksSource]);

  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategories();
  const categories = useMemo(() => {
    if (Array.isArray(categoriesData)) return categoriesData;
    if (categoriesData?.data && Array.isArray(categoriesData.data))
      return categoriesData.data;
    return [];
  }, [categoriesData]);
  const { data: reservations = [], isLoading: reservationsLoading } =
    useReservations();
  const { data: branches = [], isLoading: branchesLoading } = useBranches();
  const { data: overdueBooksData = [], isLoading: overdueLoading } =
    useOverdueBooks();
  const { data: bookTransactions = [], isLoading: transactionsLoading } =
    useBookTransactions();
  const { data: bookCopies = [] } = useBookCopies();
  const { data: plansData } = usePlans();

  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeTab, setActiveTab] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [isViewLoading, setIsViewLoading] = useState(false);
  const {
    data: selectedBookDetail,
    isLoading: selectedBookLoading,
    isFetching: selectedBookFetching,
  } = useBook(selectedBookId);

  // 1. Fetch Stats from backend (just like Home.jsx)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const maybeStats = await apiGet("/Stats").catch(() => null);
        if (maybeStats && typeof maybeStats === "object") {
          setGeneralStats({
            branches: +maybeStats.branches || 0,
            books: +maybeStats.books || 0,
            users: +maybeStats.users || users.length || 0,
          });
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };
    fetchStats();
  }, [users.length]);

  // 2. Load cached books on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("dashboardBooksCache.v1");
      if (raw) {
        setDisplayBooks(JSON.parse(raw));
      }
    } catch {}
  }, []);

  // 3. Sync and map books from API to local state and localStorage
  useEffect(() => {
    const rawArray = Array.isArray(booksSource)
      ? booksSource
      : booksSource?.data || [];

    if (rawArray.length > 0) {
      const mapped = rawArray.map((book) => ({
        book_id: book.book_id,
        name: book.name,
        category_id: book.category_id,
        category_name: book.category_name || book.category,
        quantity: book.quantity,
        created_at: book.created_at,
        image: getImageUrl(book.image_url) || "",
      }));
      setDisplayBooks(mapped);
      localStorage.setItem("dashboardBooksCache.v1", JSON.stringify(mapped));
    }
  }, [booksSource]);

  // Sync isViewLoading with React Query's fetching state
  React.useEffect(() => {
    if (!selectedBookFetching && !selectedBookLoading) {
      setIsViewLoading(false);
    }
  }, [selectedBookFetching, selectedBookLoading]);

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

  const currentUserFromList = useMemo(() => {
    if (!currentUser?.user_id) return null;
    return (
      users.find(
        (u) => String(u.user_id ?? u.id ?? "") === String(currentUser.user_id),
      ) || null
    );
  }, [users, currentUser?.user_id]);

  // Calculate current month's limits
  const userPlanId =
    currentUserFromList?.plan || currentUser?.plan || "Discover";
  const userPlan = plansData?.find((p) => p.id === userPlanId);
  const borrowLimit = userPlan?.borrow_limit || 3;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const userBorrowedTransactions = Array.isArray(bookTransactions)
    ? bookTransactions.filter(
        (t) =>
          t.transaction_type === "Check-Out" &&
          t.user_id === currentUser?.user_id,
      )
    : [];

  const monthlyBorrowedCount = userBorrowedTransactions.filter((t) => {
    const borrowDate = new Date(t.created_at);
    return (
      borrowDate.getMonth() === currentMonth &&
      borrowDate.getFullYear() === currentYear
    );
  }).length;

  const stats = {
    totalUsers: generalStats.users || users?.length || 0,
    totalBooks: generalStats.books || displayBooks?.length || 0,
    branchCount: generalStats.branches || branches?.length || 0,
    totalBorrowed: borrowLimit, // Total pie size
    currentlyBorrowed: Math.max(0, borrowLimit - monthlyBorrowedCount), // Grey empty limit left
    returnedBooks: monthlyBorrowedCount, // Navy Blue filled part
  };

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

  const bookPopularity = useMemo(() => {
    const counts = {};
    const copyToBook = {};
    bookCopies.forEach((copy) => {
      const copyId = String(copy.book_copy_id || copy.id);
      copyToBook[copyId] = copy.book_id;
    });
    bookTransactions.forEach((tx) => {
      const bookId = copyToBook[String(tx.book_id)];
      if (bookId) {
        counts[bookId] = (counts[bookId] || 0) + 1;
      }
    });
    return counts;
  }, [bookTransactions, bookCopies]);

  const filteredBooks = useMemo(() => {
    let result = [...displayBooks];

    if (searchValue) {
      result = result.filter((book) =>
        book.name?.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }

    if (selectedCategory) {
      result = result.filter(
        (book) => String(book.category_id) === String(selectedCategory),
      );
    }

    if (activeTab === "recently") {
      result = result.sort((a, b) => {
        const dateA = new Date(a.created_at || 0);
        const dateB = new Date(b.created_at || 0);
        return dateB - dateA || b.book_id - a.book_id;
      });
    } else if (activeTab === "recommended") {
      result = result.sort((a, b) => {
        const popA = bookPopularity[a.book_id] || 0;
        const popB = bookPopularity[b.book_id] || 0;
        if (popA !== popB) return popB - popA;
        return (b.name || "").localeCompare(a.name || "");
      });
    }

    return result;
  }, [displayBooks, searchValue, selectedCategory, activeTab, bookPopularity]);

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
    <div 
      className="flex h-full w-full"
      style={{
        "--card-scale": "clamp(0.55, 100vh / 995px, 1)",
      }}
    >
      <main className="flex h-full flex-1 flex-col px-5 py-3" style={{ gap: "clamp(12px, 2vh, 18px)" }}>
        <div className="flex w-full items-center gap-3.5">
          <div className="relative flex-1">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#000035] dark:text-[#D7D7D7]"
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
              className="w-full rounded-lg border border-[#000035] py-1.5 pl-10 pr-3.5 text-sm transition-colors placeholder:text-[#000035] dark:border-[#D7D7D7] dark:text-[#D7D7D7] dark:placeholder-[#D7D7D7]"
            />
          </div>
          <div className="mr-22 relative w-full min-w-[162px] max-w-[531px] flex-1">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(0);
              }}
              className="w-full cursor-pointer appearance-none rounded-lg border border-[#000035] px-3.5 py-1.5 pr-9 text-sm transition-colors dark:border-[#D7D7D7] dark:text-[#D7D7D7]"
            >
              <option value="">Category</option>
              {categories.map((cat) => (
                <option
                  key={cat.category_id}
                  value={cat.category_id}
                  className="bg-[#D7D7D7] font-['Noto_Sans_Georgian',sans-serif] text-[#000035] dark:bg-[#121317] dark:text-[#D7D7D7]"
                >
                  {cat.category_name || cat.name}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#000035] dark:text-[#D7D7D7]"
              size={16}
            />
          </div>
        </div>
        <section 
          className="flex max-[640px]:flex-col"
          style={{ 
            height: "calc(100% - 60px)",
            gap: "clamp(12px, 2vh, 18px)" 
          }}
        >
          <div
            className={`flex-3 flex w-full flex-col items-center justify-center gap-3 max-[640px]:mx-auto max-[640px]:max-w-[300px] max-[640px]:flex-none min-[640px]:order-last min-[640px]:h-full min-[1540px]:-ml-5`}
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
          <div 
            className="min-[640px]:flex-4 flex w-full flex-col min-[640px]:h-full"
            style={{ gap: "clamp(16px, 2.5vh, 24px)" }}
          >
            <div className="flex items-center justify-between border-b border-[#000035] dark:border-[#D7D7D7]">
              <div className="flex gap-16">
                <button
                  onClick={() => {
                    setActiveTab("recommended");
                    setCurrentPage(0);
                  }}
                  className={`w-45 relative pb-3 !font-['Bebas_Neue',sans-serif] text-2xl font-bold tracking-wider transition-colors ${
                    activeTab === "recommended"
                      ? "text-[#0b0c28] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#0b0c28] dark:text-[#D7D7D7] dark:after:bg-white"
                      : "cursor-pointer text-[#000035] hover:text-gray-600 dark:text-[#D7D7D7]/40 dark:hover:text-gray-300"
                  }`}
                >
                  Recommended
                </button>
                <button
                  onClick={() => {
                    setActiveTab("recently");
                    setCurrentPage(0);
                  }}
                  className={`w-45 relative pb-3 !font-['Bebas_Neue',sans-serif] text-2xl font-bold tracking-wider transition-colors ${
                    activeTab === "recently"
                      ? "text-[#0b0c28] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#0b0c28] dark:text-[#D7D7D7] dark:after:bg-white"
                      : "cursor-pointer text-[#000035] hover:text-gray-600 dark:text-[#D7D7D7]/40 dark:hover:text-gray-300"
                  }`}
                >
                  Recently added
                </button>
              </div>
              <div className="mr-10 flex items-center gap-3 pb-1.5">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className={`rounded transition-colors ${
                    currentPage === 0
                      ? "cursor-not-allowed text-[#000035]/10 dark:text-gray-500/20"
                      : "cursor-pointer text-[#000035] hover:opacity-75 dark:text-[#D7D7D7] dark:hover:text-white"
                  }`}
                >
                  <ArrowLeft
                    size={20}
                    strokeWidth={2}
                    className="scale-x-150"
                  />
                </button>
                <div className="flex gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-[1.5px] w-[10px] rounded-full transition-colors ${
                        i === Math.min(currentPage, 2)
                          ? "bg-[#000035] dark:bg-[#D7D7D7]"
                          : "bg-[#000035]/10 dark:bg-[#D7D7D7]/10"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages - 1}
                  className={`rounded transition-colors ${
                    currentPage >= totalPages - 1
                      ? "cursor-not-allowed text-[#000035]/10 dark:text-gray-500/20"
                      : "cursor-pointer text-[#000035] hover:opacity-75 dark:text-[#D7D7D7] dark:hover:text-white"
                  }`}
                >
                  <ArrowRight
                    size={20}
                    strokeWidth={2}
                    className="scale-x-150"
                  />
                </button>
              </div>
            </div>

            <div 
              className="grid w-full grid-cols-4 place-items-center max-[1400px]:grid-cols-3 max-[1300px]:grid-cols-2"
              style={{ rowGap: "calc(1.25rem * var(--card-scale, 1))" }}
            >
              {booksLoading && displayBooks.length === 0 ? (
                <div className="col-span-full py-9 text-center text-[#000035]">
                  Loading books...
                </div>
              ) : displayBooks.length === 0 ? (
                <div className="col-span-full py-9 text-center text-[#000035]">
                  No books found
                </div>
              ) : (
                paginatedBooks.map((book) => (
                  <div
                    key={book.book_id}
                    className="flex items-center justify-center transition-all duration-300"
                    style={{
                      width: "calc(160px * var(--card-scale, 1))",
                      height: "calc(300px * var(--card-scale, 1))",
                    }}
                  >
                    <div
                      className="flex h-[300px] w-40 cursor-pointer flex-col overflow-hidden rounded-lg px-2 py-2 font-['Noto_Sans_Georgian',sans-serif] shrink-0"
                      style={{
                        transform: "scale(var(--card-scale, 1))",
                        transformOrigin: "center center",
                      }}
                    >
                      <div className="relative flex h-[160px] w-full shrink-0 items-center justify-center overflow-hidden rounded-md">
                        {book.image ? (
                          <LazyImage
                            src={book.image}
                            alt={book.name}
                            className="h-full w-full object-contain text-[#000035] dark:text-[#D7D7D7]"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center p-2 text-center text-[#000035] dark:text-[#D7D7D7]">
                            <div className="line-clamp-2 font-['Noto_Sans_Georgian',sans-serif] text-xs font-bold uppercase tracking-wider text-[#000035] opacity-80 dark:text-[#D7D7D7]">
                              {book.name}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="mt-2 flex w-full shrink-0 flex-col gap-1">
                        <h3 className="text-md min-h-[44px] line-clamp-2 text-center !font-['Noto_Sans_Georgian',sans-serif] font-bold text-[#000035] dark:text-[#D7D7D7]">
                          {book.name || "Untitled"}
                        </h3>
                        <button
                          className="w-full shrink-0 cursor-pointer whitespace-nowrap rounded-xl border border-[#000035] py-1.5 text-[17px] font-bold text-[#000035] transition-colors dark:border-[#D7D7D7] dark:text-[#D7D7D7]"
                          onClick={() => {
                            setSelectedBookId(book.book_id);
                            setIsViewLoading(true);
                          }}
                        >
                          Explore Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div 
              className="mt-auto flex w-full justify-start md:ml-10"
              style={{ marginBottom: "calc(1.5rem * var(--card-scale, 1))" }}
            >
              <div 
                className="w-fit rounded-md transition-all duration-300"
                style={{ 
                  fontSize: "calc(1.1rem * var(--card-scale, 1))",
                  padding: "calc(0.5rem * var(--card-scale, 1))",
                  paddingRight: "1.5rem"
                }}
              >
                <p className="text-[#0b0c28] dark:text-white">
                  Dear {currentUserDisplayName}, please note that your
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
        {selectedBookId && (
          <ViewDetailsPopup
            show={!!selectedBookId}
            onClose={() => {
              setSelectedBookId(null);
              setIsViewLoading(false);
            }}
            title={
              selectedBookLoading || isViewLoading
                ? "LOADING INFO..."
                : "Book Details"
            }
            imageUrl={getImageUrl(selectedBookDetail?.image_url)}
            imageAlt={selectedBookDetail?.name || "Book cover"}
            data={
              selectedBookLoading || isViewLoading || !selectedBookDetail
                ? null
                : {
                    "Book ID": selectedBookDetail.book_id,
                    "Book Name": selectedBookDetail.name,
                    ...(selectedBookDetail.author
                      ? { Author: selectedBookDetail.author }
                      : {}),
                    Branch:
                      selectedBookDetail.branch ||
                      branches.find(
                        (branch) =>
                          String(branch.branch_id) ===
                          String(selectedBookDetail.branch_id),
                      )?.name ||
                      "N/A",
                    Category:
                      categories.find(
                        (c) => c.category_id === selectedBookDetail.category_id,
                      )?.category_name ||
                      selectedBookDetail.category ||
                      "N/A",
                    Language: selectedBookDetail.language || "N/A",
                    Status: selectedBookDetail.status || "N/A",
                    Description:
                      selectedBookDetail.description ||
                      "No description available.",
                  }
            }
          >
            {(selectedBookLoading || isViewLoading) && (
              <div className="flex h-40 w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0b0c28] border-t-transparent dark:border-white dark:border-t-transparent"></div>
              </div>
            )}
          </ViewDetailsPopup>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
