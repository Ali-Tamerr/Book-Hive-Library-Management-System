import React, { useState, useMemo, useEffect, useRef } from "react";
import { Search, ChevronDown, ArrowLeft, ArrowRight, X } from "lucide-react";
import PieChart from "../components/PieChart";
import PieChartLegend from "../components/PieChartLegend";
import ViewDetailsPopup from "../components/ViewDetailsPopup";
import LazyImage from "../components/LazyImage";
import BookCard from "../components/BookCard";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useBooks, useDashboardBooks, useBook, useAIRecommendations } from "../hooks/useBooks";
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
  const { data: aiResponse, isLoading: aiLoading } = useAIRecommendations(currentUser?.user_id);
  const aiRecommendations = useMemo(() => {
    if (aiResponse?.status === "success" && Array.isArray(aiResponse.data)) {
      return aiResponse.data;
    }
    return [];
  }, [aiResponse]);

  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeTab, setActiveTab] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [isViewLoading, setIsViewLoading] = useState(false);
  const [showSubscriptionInfo, setShowSubscriptionInfo] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [cardScale, setCardScale] = useState(1);
  const observerTarget = useRef(null);
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
            users: +maybeStats.users || 0,
          });
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };
    fetchStats();
  }, []);

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

  React.useEffect(() => {
    if (selectedBookDetail || (!selectedBookFetching && !selectedBookLoading)) {
      setIsViewLoading(false);
    }
  }, [selectedBookDetail, selectedBookFetching, selectedBookLoading]);

  const [booksPerPage, setBooksPerPage] = useState(8);

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setIsMobile(width < 640);

      // Height based scale
      const hScale = Math.max(0.6, Math.min(1, (height - 260) / 700));
      // Width based scale
      const widthTarget = width < 640 ? 360 : width < 1150 ? 800 : 1300;
      const wScale = Math.max(0.6, Math.min(1, (width - 60) / widthTarget));
      
      setCardScale(Math.min(hScale, wScale));

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



  useEffect(() => {
    if (!isMobile) {
      setCurrentPage(0);
    }
  }, [isMobile]);

  const loading =
    booksLoading ||
    reservationsLoading ||
    branchesLoading ||
    overdueLoading ||
    categoriesLoading ||
    transactionsLoading ||
    aiLoading;



  // Calculate current month's limits
  const userPlanId =
    currentUser?.plan || "Discover";
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

  const subscriptionExpirationRaw =
    currentUser?.subscription_end_date ||
    currentUser?.subscription_expiration_date ||
    currentUser?.subscription_expiry_date ||
    currentUser?.plan_expiration_date ||
    currentUser?.expiration_date ||
    null;

  const isExpired = useMemo(() => {
    if (!subscriptionExpirationRaw) return true;
    const expirationDate = new Date(subscriptionExpirationRaw);
    if (Number.isNaN(expirationDate.getTime())) return true;
    return expirationDate < new Date();
  }, [subscriptionExpirationRaw]);

  const stats = {
    totalUsers: generalStats.users || 0,
    totalBooks: generalStats.books || displayBooks?.length || 0,
    branchCount: generalStats.branches || branches?.length || 0,
    totalBorrowed: isExpired ? 0 : borrowLimit, // Total pie size
    currentlyBorrowed: isExpired
      ? 0
      : Math.max(0, borrowLimit - monthlyBorrowedCount), // Grey empty limit left
    returnedBooks: isExpired ? 0 : monthlyBorrowedCount, // Navy Blue filled part
  };

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
      // If we have AI recommendations, prioritize them
      if (aiRecommendations.length > 0 && !searchValue && !selectedCategory) {
        // Map AI results to ensure they have the same structure (e.g., 'image' prop)
        const aiMapped = aiRecommendations.map(aiBook => {
          const originalBook = displayBooks.find(b => String(b.book_id) === String(aiBook.id));
          return originalBook || {
            ...aiBook,
            book_id: aiBook.id,
            image: getImageUrl(aiBook.image_url)
          };
        });
        
        // Add other popular books that aren't in the AI recommendation to fill the list
        const otherBooks = result
          .filter(b => !aiRecommendations.some(ai => String(ai.id) === String(b.book_id)))
          .sort((a, b) => {
            const popA = bookPopularity[a.book_id] || 0;
            const popB = bookPopularity[b.book_id] || 0;
            return popB - popA;
          });
          
        return [...aiMapped, ...otherBooks];
      }

      // Default sorting by popularity if AI recommendations aren't available
      result = result.sort((a, b) => {
        const popA = bookPopularity[a.book_id] || 0;
        const popB = bookPopularity[b.book_id] || 0;
        if (popA !== popB) return popB - popA;
        return (b.name || "").localeCompare(a.name || "");
      });
    }

    return result;
  }, [displayBooks, searchValue, selectedCategory, activeTab, bookPopularity, aiRecommendations]);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage) || 1;

  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && currentPage < totalPages - 1) {
          setCurrentPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    );

    const target = observerTarget.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [isMobile, currentPage, totalPages]);

  const paginatedBooks = isMobile
    ? filteredBooks.slice(0, (currentPage + 1) * booksPerPage)
    : filteredBooks.slice(currentPage * booksPerPage, (currentPage + 1) * booksPerPage);

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <div
      className="flex min-h-full w-full overflow-y-auto"
      style={{
        "--card-scale": cardScale,
      }}
    >
      <main
        className="flex min-h-full flex-1 flex-col px-5 py-3 max-[40rem]:h-auto max-[40rem]:px-2"
        style={{ gap: "clamp(0.25rem, 1.5vh, 1.125rem)" }}
      >
        {showSubscriptionInfo && (
          <div className="hidden w-full max-[40rem]:block">
            <div
              className="relative flex w-full items-start justify-between rounded-lg p-3"
              style={{
                marginBottom: "clamp(0.5rem, 1.5vh, 1.125rem)",
              }}
            >
              <div className="pr-8">
                <p className="text-sm font-medium text-[#0b0c28] dark:text-white">
                  {isExpired ? (
                    <>
                      Dear {currentUserDisplayName} please note that your subscription has expired
                      <br className="max-[40rem]:hidden" />
                    </>
                  ) : (
                    <>
                      Dear {currentUserDisplayName}, your subscription will
                      expire on{" "}
                      <span className="font-bold">
                        {subscriptionExpirationLabel}.
                      </span>
                    </>
                  )}
                </p>
                <p className="mt-0.5 text-xs text-[#0b0c28]/70 dark:text-white/70">
                  To renew your subscription, kindly visit the nearest branch.
                </p>
              </div>
              <button
                onClick={() => setShowSubscriptionInfo(false)}
                className="absolute right-2 top-2 rounded-full p-1 transition-colors hover:bg-black/10 dark:hover:bg-white/10"
              >
                <X size={16} className="text-[#0b0c28] dark:text-white" />
              </button>
            </div>
          </div>
        )}
        <div className="flex w-full items-center gap-3.5 max-[40rem]:flex-col">
          <div className="relative flex-1 max-[40rem]:w-full max-[40rem]:min-w-0 max-[40rem]:max-w-none">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#000035] dark:text-[#D7D7D7]"
              size={16}
            />
            <input
              type="text"
              placeholder="Search for book"
              value={searchValue}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setCurrentPage(0);
              }}
              className="w-full rounded-lg border border-[#000035] py-1.5 pl-10 pr-3.5 text-sm transition-colors placeholder:text-[#000035] dark:border-[#D7D7D7] dark:text-[#D7D7D7] dark:placeholder-[#D7D7D7]"
            />
          </div>
          <div className="mr-22 relative w-full min-w-[10.125rem] max-w-[33.1875rem] flex-1 max-[40rem]:mr-0 max-[40rem]:min-w-0 max-[40rem]:max-w-none">
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
          className="flex max-[40rem]:flex-col"
          style={{
            height: "auto",
            minHeight: "calc(100% - 3.75rem)",
            gap: "clamp(0.75rem, 2vh, 1.125rem)",
          }}
        >
          <div
            className={`flex flex-col items-center justify-center gap-3 overflow-hidden transition-all duration-500 ease-in-out max-[40rem]:mx-auto max-[40rem]:flex-none min-[40rem]:order-last min-[40rem]:h-full min-[96.25rem]:-ml-5 ${
              searchValue || isSearchFocused
                ? "invisible max-h-0 max-w-0 flex-[0.0001] -translate-y-2 scale-95 opacity-0"
                : "flex-3 visible max-h-[50rem] max-w-full translate-y-0 scale-100 opacity-100"
            }`}
          >
            <div className="flex h-full w-full flex-col items-center justify-start rounded-md min-[75rem]:mb-6">
              <div className="flex h-full w-full flex-col items-center justify-between gap-6 overflow-hidden">
                <div className="relative flex min-h-0 w-full min-w-0 flex-1 flex-col items-center justify-center overflow-hidden max-[40rem]:min-h-[10.125rem]">
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
                  className="max-[96.25rem]:!hidden max-[67.5rem]:!flex"
                />
                <PieChartLegend
                  variant="desktop"
                  className="max-[96.25rem]:!flex max-[67.5rem]:!hidden"
                />
              </div>
            </div>
          </div>
          <div
            className="min-[40rem]:flex-4 flex w-full flex-col min-[40rem]:h-full"
            style={{ gap: "clamp(0.125rem, 1vh, 1.25rem)" }}
          >
            <div className="flex items-center justify-between border-b border-[#000035] max-[40rem]:flex-col-reverse max-[40rem]:items-start max-[40rem]:gap-2 dark:border-[#D7D7D7]">
              <div className="flex gap-10 max-[40rem]:w-full max-[40rem]:justify-around max-[40rem]:gap-2">
                <button
                  onClick={() => {
                    setActiveTab("recommended");
                    setCurrentPage(0);
                  }}
                  className={`relative pb-3 !font-['Bebas_Neue',sans-serif] text-2xl font-bold tracking-wider transition-colors max-[47.5rem]:text-xl ${
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
                  className={`relative pb-3 !font-['Bebas_Neue',sans-serif] text-2xl font-bold tracking-wider transition-colors max-[47.5rem]:text-xl ${
                    activeTab === "recently"
                      ? "text-[#0b0c28] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#0b0c28] dark:text-[#D7D7D7] dark:after:bg-white"
                      : "cursor-pointer text-[#000035] hover:text-gray-600 dark:text-[#D7D7D7]/40 dark:hover:text-gray-300"
                  }`}
                >
                  Recently added
                </button>
              </div>
              <div className="mr-10 max-[62.5rem]:mr-2 max-[62.5rem]:gap-1.5 flex items-center gap-3 pb-1.5 max-[40rem]:mr-0 max-[40rem]:hidden max-[40rem]:w-full max-[40rem]:justify-center">
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
                <div className="flex gap-4 max-[62.5rem]:gap-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-[0.0938rem] w-[0.625rem] rounded-full transition-colors ${
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
              className="grid w-full place-items-center max-[54.375rem]:grid-cols-2 min-[54.375rem]:grid-cols-3 min-[93.75rem]:grid-cols-4"
              style={{ rowGap: "calc(0.5rem * var(--card-scale, 1))" }}
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
                  <BookCard
                    key={book.book_id}
                    book={book}
                    onClick={() => {
                      setSelectedBookId(book.book_id);
                      setIsViewLoading(true);
                    }}
                    scale={cardScale}
                  />
                ))
              )}
              {isMobile && currentPage < totalPages - 1 && (
                <div
                  ref={observerTarget}
                  className="col-span-full h-10 w-full"
                />
              )}
            </div>
            {showSubscriptionInfo && (
              <div
                className="mt-auto flex w-full justify-start max-[40rem]:hidden md:ml-10"
                style={{
                  marginTop: "calc(0.1rem * var(--card-scale, 1))",
                  marginBottom: "calc(0.25rem * var(--card-scale, 1))",
                }}
              >
                <div
                  className="relative w-fit rounded-md transition-all duration-300"
                  style={{
                    fontSize: "calc(1.2rem * var(--card-scale, 1))",
                    padding: "calc(0.2rem * var(--card-scale, 1))",
                    paddingRight: "2.5rem",
                  }}
                >
                  <p className="text-[#0b0c28] dark:text-white">
                    {isExpired ? (
                      `Dear ${currentUserDisplayName} please note that your subscription has expired`
                    ) : (
                      <>
                        Dear {currentUserDisplayName}, please note that your
                        subscription will expire on{" "}
                        <span className="block font-bold">
                          {subscriptionExpirationLabel}.
                        </span>
                      </>
                    )}
                  </p>
                  <p className="mt-1 text-[#0b0c28] dark:text-white">
                    To renew your subscription, kindly visit the nearest branch.
                  </p>
                  <button
                    onClick={() => setShowSubscriptionInfo(false)}
                    className="absolute right-2 top-2 hidden rounded-full p-1 transition-colors hover:bg-black/5 max-[40rem]:block dark:hover:bg-white/5"
                  >
                    <X size={16} className="text-[#0b0c28] dark:text-white" />
                  </button>
                </div>
              </div>
            )}
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
                <LoadingSpinner size="sm" />
              </div>
            )}
          </ViewDetailsPopup>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
