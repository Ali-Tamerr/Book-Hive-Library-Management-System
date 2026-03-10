import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, Search } from "lucide-react";
import ColorableLogo from "../components/ColorableLogo";
import LazyImage from "../components/LazyImage";
import PieChart from "../components/PieChart";
import ViewDetailsPopup from "../components/ViewDetailsPopup";
import { useBookCopies } from "../hooks/useBookCopies";
import { useBookTransactions } from "../hooks/useBookTransactions";
import { useBook, useBookCovers } from "../hooks/useBooks";
import { useBranches } from "../hooks/useBranches";
import { useCategories } from "../hooks/useCategories";
import { useUser } from "../hooks/useUsers";
import { getCurrentUser } from "../services/auth.api";
import { getImageUrl } from "../services/api.config";

const BOOKS_CACHE_KEY = "dashboardBooksCache.v2";
const PAGE_INDICATOR_COUNT = 4;

const normalizeArrayPayload = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
};

const normalizeBook = (book) => {
  if (!book || typeof book !== "object") return null;

  const rawImage =
    book.image_url ??
    book.image ??
    book.cover_url ??
    book.cover ??
    book.thumbnail ??
    null;

  const resolvedImage =
    getImageUrl(rawImage) ||
    (typeof rawImage === "string" &&
    /^(data:|https?:\/\/)/i.test(rawImage.trim())
      ? rawImage.trim()
      : "");

  return {
    book_id: book.book_id ?? book.id ?? book.isbn ?? book.name,
    name: book.name ?? book.title ?? "Untitled",
    category_id:
      book.category_id ??
      book.categoryId ??
      book.category?.category_id ??
      book.category?.id ??
      "",
    category:
      book.category_name ?? book.category?.category_name ?? book.category ?? "",
    created_at:
      book.created_at ??
      book.createdAt ??
      book.published_at ??
      book.updated_at ??
      null,
    image: resolvedImage,
  };
};

const getBooksPerPage = (width) => {
  if (width < 620) return 4;
  if (width < 1180) return 6;
  return 8;
};

const getDisplayName = (user) => {
  const fullName = [user?.first_name, user?.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();

  return fullName || user?.name || "User";
};

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
  const { data: booksSource, isLoading: booksLoading } = useBookCovers();
  const { data: categoriesData } = useCategories();
  const { data: branchesData } = useBranches();
  const { data: bookTransactionsData } = useBookTransactions();
  const { data: bookCopiesData } = useBookCopies();

  const [cachedBooks, setCachedBooks] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeTab, setActiveTab] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(0);
  const [booksPerPage, setBooksPerPage] = useState(() =>
    typeof window === "undefined" ? 8 : getBooksPerPage(window.innerWidth),
  );
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [isViewLoading, setIsViewLoading] = useState(false);

  const {
    data: selectedBookDetail,
    isLoading: selectedBookLoading,
    isFetching: selectedBookFetching,
  } = useBook(selectedBookId);

  useEffect(() => {
    try {
      const cachedValue = localStorage.getItem(BOOKS_CACHE_KEY);
      if (!cachedValue) return;

      const parsed = JSON.parse(cachedValue);
      if (Array.isArray(parsed)) {
        setCachedBooks(parsed);
      }
    } catch {
      setCachedBooks([]);
    }
  }, []);

  const liveBooks = useMemo(
    () =>
      normalizeArrayPayload(booksSource)
        .map(normalizeBook)
        .filter(Boolean),
    [booksSource],
  );

  useEffect(() => {
    if (liveBooks.length === 0) return;

    setCachedBooks(liveBooks);

    try {
      localStorage.setItem(BOOKS_CACHE_KEY, JSON.stringify(liveBooks));
    } catch {
      // Ignore storage quota or browser storage failures.
    }
  }, [liveBooks]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleResize = () => {
      setBooksPerPage(getBooksPerPage(window.innerWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!selectedBookFetching && !selectedBookLoading) {
      setIsViewLoading(false);
    }
  }, [selectedBookFetching, selectedBookLoading]);

  const displayBooks = liveBooks.length > 0 ? liveBooks : cachedBooks;

  const categories = useMemo(
    () =>
      normalizeArrayPayload(categoriesData)
        .slice()
        .sort((left, right) =>
          String(left.category_name ?? left.name ?? "").localeCompare(
            String(right.category_name ?? right.name ?? ""),
          ),
        ),
    [categoriesData],
  );

  const branches = useMemo(
    () => normalizeArrayPayload(branchesData),
    [branchesData],
  );

  const bookCopies = useMemo(
    () => normalizeArrayPayload(bookCopiesData),
    [bookCopiesData],
  );

  const bookTransactions = useMemo(
    () => normalizeArrayPayload(bookTransactionsData),
    [bookTransactionsData],
  );

  const bookPopularity = useMemo(() => {
    const copyToBookId = new Map();
    const popularityCount = {};

    bookCopies.forEach((copy) => {
      const copyKey = String(copy.book_copy_id ?? copy.id ?? "");
      const bookId = copy.book_id ?? copy.bookId ?? null;
      if (copyKey && bookId != null) {
        copyToBookId.set(copyKey, bookId);
      }
    });

    bookTransactions.forEach((transaction) => {
      const status = String(transaction.status ?? "").toLowerCase();
      const type = String(transaction.transaction_type ?? "").toLowerCase();

      if (type && type !== "check-out") return;
      if (status && status !== "completed") return;

      const transactionBookKey = String(
        transaction.book_copy_id ??
          transaction.book_id ??
          transaction.copy_id ??
          transaction.copyId ??
          "",
      );
      const resolvedBookId =
        copyToBookId.get(transactionBookKey) ??
        transaction.master_book_id ??
        transaction.book_reference_id ??
        transaction.book_master_id ??
        null;

      if (resolvedBookId == null) return;

      const popularityKey = String(resolvedBookId);
      popularityCount[popularityKey] =
        (popularityCount[popularityKey] || 0) + 1;
    });

    return popularityCount;
  }, [bookCopies, bookTransactions]);

  const filteredBooks = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();
    const selectedCategoryValue = String(selectedCategory);

    const result = displayBooks.filter((book) => {
      const matchesSearch = normalizedSearch
        ? String(book.name ?? "").toLowerCase().includes(normalizedSearch)
        : true;

      const matchesCategory = selectedCategoryValue
        ? String(book.category_id ?? book.category ?? "") ===
            selectedCategoryValue ||
          String(book.category ?? "").toLowerCase() ===
            selectedCategoryValue.toLowerCase()
        : true;

      return matchesSearch && matchesCategory;
    });

    if (activeTab === "recently") {
      return result.sort((left, right) => {
        const leftDate = new Date(left.created_at ?? 0).getTime();
        const rightDate = new Date(right.created_at ?? 0).getTime();

        if (leftDate !== rightDate) {
          return rightDate - leftDate;
        }

        return String(left.name ?? "").localeCompare(String(right.name ?? ""));
      });
    }

    return result.sort((left, right) => {
      const leftPopularity = bookPopularity[String(left.book_id)] || 0;
      const rightPopularity = bookPopularity[String(right.book_id)] || 0;

      if (leftPopularity !== rightPopularity) {
        return rightPopularity - leftPopularity;
      }

      const leftDate = new Date(left.created_at ?? 0).getTime();
      const rightDate = new Date(right.created_at ?? 0).getTime();

      if (leftDate !== rightDate) {
        return rightDate - leftDate;
      }

      return String(left.name ?? "").localeCompare(String(right.name ?? ""));
    });
  }, [activeTab, bookPopularity, displayBooks, searchValue, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / booksPerPage));

  useEffect(() => {
    setCurrentPage((previousPage) => Math.min(previousPage, totalPages - 1));
  }, [totalPages]);

  const pageWindowStart =
    totalPages > PAGE_INDICATOR_COUNT
      ? Math.min(
          Math.max(currentPage - Math.floor(PAGE_INDICATOR_COUNT / 2), 0),
          totalPages - PAGE_INDICATOR_COUNT,
        )
      : 0;

  const visiblePages = Array.from(
    { length: Math.min(totalPages, PAGE_INDICATOR_COUNT) },
    (_, index) => pageWindowStart + index,
  );

  const paginatedBooks = filteredBooks.slice(
    currentPage * booksPerPage,
    (currentPage + 1) * booksPerPage,
  );

  const userBorrowedTransactions = useMemo(() => {
    const currentUserId = String(currentUser?.user_id ?? "");

    if (!currentUserId) return [];

    return bookTransactions.filter((transaction) => {
      const userId = String(transaction.user_id ?? "");
      const type = String(transaction.transaction_type ?? "").toLowerCase();
      const status = String(transaction.status ?? "").toLowerCase();

      return (
        userId === currentUserId &&
        (!type || type === "check-out") &&
        (!status || status === "completed")
      );
    });
  }, [bookTransactions, currentUser?.user_id]);

  const userCurrentlyBorrowed = userBorrowedTransactions.filter(
    (transaction) => !transaction.return_date,
  ).length;
  const userReturnedBooks = userBorrowedTransactions.filter(
    (transaction) => !!transaction.return_date,
  ).length;
  const userTotalBorrowed = userBorrowedTransactions.length;

  const currentUserName = getDisplayName(currentUser);

  const subscriptionExpirationRaw =
    currentUser?.subscription_end_date ||
    currentUser?.subscription_expiration_date ||
    currentUser?.subscription_expiry_date ||
    currentUser?.plan_expiration_date ||
    currentUser?.expiration_date ||
    null;

  const subscriptionExpirationLabel = useMemo(() => {
    if (!subscriptionExpirationRaw) return "N/A";

    const parsedDate = new Date(subscriptionExpirationRaw);

    if (Number.isNaN(parsedDate.getTime())) {
      return "N/A";
    }

    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }, [subscriptionExpirationRaw]);

  const emptyStateMessage =
    searchValue.trim() || selectedCategory
      ? "No books match your current filters."
      : "No books are available right now.";

  const handleOpenBook = (bookId) => {
    setSelectedBookId(bookId);
    setIsViewLoading(true);
  };

  const inputClassName =
    "w-full rounded-[14px] border border-[rgba(0,0,53,0.55)] bg-transparent font-['Noto_Sans_Georgian',sans-serif] text-[0.92rem] leading-[1.2] text-[var(--accent)] outline-none transition-[border-color,box-shadow,background-color] duration-200 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,0,53,0.08)] dark:border-[rgba(215,215,215,0.48)] dark:focus:shadow-[0_0_0_3px_rgba(215,215,215,0.08)]";
  const tabButtonBase =
    "border-b-[3px] bg-transparent pb-[0.55rem] font-[family-name:var(--body-font)] text-[2.05rem] uppercase tracking-[0.03em] transition-[opacity,border-color] duration-200 xl:text-[2.35rem]";
  const pageNavClass =
    "inline-flex items-center justify-center bg-transparent text-[var(--accent)] transition-opacity duration-200 hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-30";
  const pageDotClass =
    "h-[2px] w-4 rounded-full bg-[rgba(0,0,53,0.35)] transition-[opacity,width,background-color] duration-200 hover:opacity-70 dark:bg-[rgba(215,215,215,0.32)]";

  return (
    <section className="flex min-h-full flex-col gap-6 px-9 py-7 text-[var(--accent)] [--pie-borrowed-color:#444548] [--pie-returned-color:#000035] max-[980px]:px-5 max-[980px]:py-6 max-[560px]:gap-[1.45rem] max-[560px]:px-4 dark:[--pie-borrowed-color:#5b5f67] dark:[--pie-returned-color:#d7d7d7]">
      <div className="grid items-center gap-4 [grid-template-columns:minmax(0,1.55fr)_minmax(220px,0.72fr)] max-[980px]:grid-cols-1">
        <label className="relative w-full max-w-[700px] max-[980px]:max-w-none">
          <Search
            className="pointer-events-none absolute left-[0.88rem] top-1/2 -translate-y-1/2 text-[var(--accent)]"
            size={16}
            strokeWidth={1.8}
          />
          <input
            type="text"
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value);
              setCurrentPage(0);
            }}
            placeholder="Search for book"
            className={`${inputClassName} min-h-[46px] py-[0.78rem] pl-10 pr-4 placeholder:text-[rgba(0,0,53,0.7)] dark:placeholder:text-[rgba(215,215,215,0.76)]`}
            aria-label="Search for a book"
          />
        </label>

        <label className="relative w-full max-w-[310px] justify-self-end max-[980px]:max-w-none max-[980px]:justify-self-stretch">
          <select
            value={selectedCategory}
            onChange={(event) => {
              setSelectedCategory(event.target.value);
              setCurrentPage(0);
            }}
            className={`${inputClassName} min-h-[46px] appearance-none py-[0.78rem] pl-4 pr-10`}
            aria-label="Filter books by category"
          >
            <option value="">Category</option>
            {categories.map((category) => (
              <option
                key={category.category_id ?? category.id}
                value={category.category_id ?? category.id ?? ""}
              >
                {category.category_name ?? category.name ?? "Unnamed category"}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-[0.88rem] top-1/2 -translate-y-1/2 text-[var(--accent)]"
            size={16}
            strokeWidth={1.8}
          />
        </label>
      </div>

      <div className="grid items-start gap-7 [grid-template-columns:minmax(0,1.7fr)_minmax(320px,0.98fr)] max-[1280px]:[grid-template-columns:minmax(0,1.5fr)_minmax(280px,0.9fr)] max-[980px]:grid-cols-1 xl:gap-12">
        <div className="flex flex-col gap-[1.85rem]">
          <div className="flex items-end justify-between gap-4 border-b border-[rgba(0,0,53,0.55)] pb-3 dark:border-[rgba(215,215,215,0.48)] max-[760px]:flex-col max-[760px]:items-start">
            <div className="flex flex-wrap gap-6">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("recommended");
                  setCurrentPage(0);
                }}
                className={`${tabButtonBase} ${
                  activeTab === "recommended"
                    ? "border-[var(--accent)] opacity-100"
                    : "border-transparent opacity-80"
                }`}
              >
                Recommended
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("recently");
                  setCurrentPage(0);
                }}
                className={`${tabButtonBase} ${
                  activeTab === "recently"
                    ? "border-[var(--accent)] opacity-100"
                    : "border-transparent opacity-80"
                }`}
              >
                Recently Added
              </button>
            </div>

            <div className="inline-flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(page - 1, 0))}
                disabled={currentPage === 0}
                className={pageNavClass}
                aria-label="Previous books page"
              >
                <ArrowLeft size={20} strokeWidth={1.8} />
              </button>

              <div className="inline-flex items-center gap-[0.45rem]">
                {visiblePages.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`${pageDotClass} ${
                      pageNumber === currentPage
                        ? "w-[22px] bg-[var(--accent)]"
                        : ""
                    }`}
                    aria-label={`Go to page ${pageNumber + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) => Math.min(page + 1, totalPages - 1))
                }
                disabled={currentPage >= totalPages - 1}
                className={pageNavClass}
                aria-label="Next books page"
              >
                <ArrowRight size={20} strokeWidth={1.8} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 content-start gap-y-11 gap-x-6 pt-[1.35rem] max-[1280px]:grid-cols-3 max-[760px]:grid-cols-2 max-[560px]:gap-x-4 max-[560px]:gap-y-8">
            {booksLoading && displayBooks.length === 0 ? (
              <div className="col-span-full flex min-h-[260px] items-center justify-center rounded-2xl border border-dashed border-[rgba(0,0,53,0.22)] text-center font-['Noto_Sans_Georgian',sans-serif] text-base text-[rgba(0,0,53,0.7)] dark:border-[rgba(215,215,215,0.2)] dark:text-[rgba(215,215,215,0.76)]">
                Loading books...
              </div>
            ) : paginatedBooks.length === 0 ? (
              <div className="col-span-full flex min-h-[260px] items-center justify-center rounded-2xl border border-dashed border-[rgba(0,0,53,0.22)] text-center font-['Noto_Sans_Georgian',sans-serif] text-base text-[rgba(0,0,53,0.7)] dark:border-[rgba(215,215,215,0.2)] dark:text-[rgba(215,215,215,0.76)]">
                {emptyStateMessage}
              </div>
            ) : (
              paginatedBooks.map((book) => (
                <article
                  key={book.book_id}
                  className="group flex w-full max-w-[156px] min-w-0 justify-self-center flex-col items-center gap-3"
                >
                  <div className="flex aspect-[0.74] w-full items-center justify-center overflow-hidden border border-[rgba(0,0,53,0.22)] bg-white/80 transition-[transform,box-shadow,border-color] duration-200 group-hover:-translate-y-0.5 group-hover:border-[rgba(0,0,53,0.55)] group-hover:shadow-[0_10px_22px_rgba(0,0,53,0.12)] dark:border-[rgba(215,215,215,0.2)] dark:bg-[rgba(21,22,27,0.92)] dark:group-hover:border-[rgba(215,215,215,0.48)]">
                    {book.image ? (
                      <LazyImage
                        src={book.image}
                        alt={book.name}
                        className="h-full w-full"
                      />
                    ) : (
                      <div className="p-3 text-center font-['Noto_Sans_Georgian',sans-serif] text-[0.8rem] font-bold leading-[1.35] text-[var(--accent)]">
                        {book.name}
                      </div>
                    )}
                  </div>

                  <h3 className="m-0 min-h-[2.8em] overflow-hidden text-center font-['Noto_Sans_Georgian',sans-serif] text-[0.96rem] font-bold leading-[1.38] text-[var(--accent)] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                    {book.name || "Untitled"}
                  </h3>

                  <button
                    type="button"
                    onClick={() => handleOpenBook(book.book_id)}
                    className="rounded-[12px] border border-[var(--accent)] bg-transparent px-[0.9rem] py-[0.48rem] font-['Noto_Sans_Georgian',sans-serif] text-[0.85rem] font-bold leading-[1.2] text-[var(--accent)] transition-[background-color,color,transform] duration-200 hover:-translate-y-px hover:bg-[#0a0b2b] hover:text-white dark:hover:bg-[#d7d7d7] dark:hover:text-[#121317]"
                  >
                    Explore Now
                  </button>
                </article>
              ))
            )}
          </div>

          <div className="mt-1 max-w-[560px]">
            <p className="m-0 font-['Noto_Sans_Georgian',sans-serif] text-[1.02rem] leading-[1.62] text-[var(--accent)]">
              Dear {currentUserName}, please note that your subscription will
              expire on{" "}
              <span className="font-bold">{subscriptionExpirationLabel}.</span>
            </p>
            <p className="m-0 font-['Noto_Sans_Georgian',sans-serif] text-[1.02rem] leading-[1.62] text-[var(--accent)]">
              To renew your subscription, kindly visit the nearest branch.
            </p>
          </div>
        </div>

        <aside className="flex flex-col items-center justify-start gap-6 pt-3 max-[980px]:order-2 max-[980px]:pt-0">
          <div className="flex aspect-square w-full max-w-[520px] items-center justify-center">
            <PieChart
              totalBorrowed={userTotalBorrowed}
              currentlyBorrowed={userCurrentlyBorrowed}
              returnedBooks={userReturnedBooks}
              className="h-full w-full"
            />
          </div>

          <div className="mt-2 grid w-full max-w-[360px] grid-cols-[auto_1px_minmax(0,1fr)] items-center gap-5 rounded-2xl border border-[rgba(0,0,53,0.55)] bg-transparent px-[1.35rem] py-[1.2rem] dark:border-[rgba(215,215,215,0.48)] max-[560px]:grid-cols-1 max-[560px]:justify-items-center max-[560px]:text-center">
            <div className="flex min-w-[78px] justify-center">
              <ColorableLogo className="h-[58px] w-[58px] text-[var(--accent)]" />
            </div>
            <div className="mb-10 mt-auto flex w-full justify-center">
              <div className="text-md w-fit rounded-md bg-white p-3 pr-6 dark:bg-transparent">
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
        </aside>
      </div>

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
          imageUrl={getImageUrl(
            selectedBookDetail?.image_url ?? selectedBookDetail?.image,
          )}
          imageAlt={selectedBookDetail?.name || "Book cover"}
          data={
            selectedBookLoading || isViewLoading || !selectedBookDetail
              ? null
              : {
                  "Book ID":
                    selectedBookDetail.book_id ?? selectedBookDetail.id ?? "N/A",
                  "Book Name": selectedBookDetail.name || "N/A",
                  ...(selectedBookDetail.author
                    ? { Author: selectedBookDetail.author }
                    : {}),
                  Branch:
                    selectedBookDetail.branch ||
                    branches.find(
                      (branch) =>
                        String(branch.branch_id ?? branch.id ?? "") ===
                        String(selectedBookDetail.branch_id ?? ""),
                    )?.name ||
                    "N/A",
                  Category:
                    categories.find(
                      (category) =>
                        String(category.category_id ?? category.id ?? "") ===
                        String(selectedBookDetail.category_id ?? ""),
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
            <div className="flex min-h-40 items-center justify-center">
              <div className="h-[34px] w-[34px] animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent" />
            </div>
          )}
        </ViewDetailsPopup>
      )}
    </section>
  );
}

export default Dashboard;
