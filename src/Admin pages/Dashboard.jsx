import { useState } from "react";
import { User, RotateCcw } from "lucide-react";
import { useUsers } from "../hooks/useUsers";
import { useBooks } from "../hooks/useBooks";
import { useOverdueBooks } from "../hooks/useOverdueBooks";
import { useBookCopies } from "../hooks/useBookCopies";
import { useBookTransactions } from "../hooks/useBookTransactions";
import { useBranches } from "../hooks/useBranches";
import { getCurrentUser } from "../services/auth.api";
import DashboardCard from "../components/DashboardCard";
import { useUserActivity } from "../hooks/useUserActivity";
import { isUserOnline } from "../services/userActivity.api";
import PieChart from "../components/PieChart";
import PieChartLegend from "../components/PieChartLegend";
import AdminDashboardCard from "../components/AdminDashboardCard.jsx";

function Dashboard() {
  const currentUser = getCurrentUser();
  const isSuperAdmin = currentUser?.role === "Super Admin";
  const [loadingAdmins, setLoadingAdmins] = useState({});
  useUserActivity();

  // Use React Query hooks - much cleaner!
  const {
    data: usersData,
    isLoading: usersLoading,
    refetch: refetchUsers,
  } = useUsers();

  const users = usersData
    ? usersData.pages.flatMap((page) => page.data || [])
    : [];

  const { data: books = [], isLoading: booksLoading } = useBooks();
  const { data: branches = [], isLoading: branchesLoading } = useBranches();
  const { data: bookCopies = [] } = useBookCopies();
  const { data: overdueBooksData = [], isLoading: overdueLoading } =
    useOverdueBooks();
  const { data: bookTransactions = [], isLoading: transactionsLoading } =
    useBookTransactions();

  const handleRefreshAdmins = (adminId) => {
    setLoadingAdmins((prev) => ({ ...prev, [adminId]: true }));
    refetchUsers().finally(() => {
      setLoadingAdmins((prev) => ({ ...prev, [adminId]: false }));
    });
  };

  // Calculate stats from data
  const transactionsLoadingState =
    usersLoading || booksLoading || overdueLoading || transactionsLoading;
  const librariansLoading = usersLoading || branchesLoading;

  const borrowedTransactions = Array.isArray(bookTransactions)
    ? bookTransactions.filter(
        (t) => t.transaction_type === "Check-Out" && t.status === "Completed",
      )
    : [];
  const returnedTransactions = borrowedTransactions.filter(
    (t) => t.return_date,
  );
  const currentlyBorrowedTransactions = borrowedTransactions.filter(
    (t) => !t.return_date,
  );
  const returnedBooks = returnedTransactions.length;
  const currentlyBorrowed = currentlyBorrowedTransactions.length;
  const totalBorrowed = borrowedTransactions.length;

  const stats = {
    totalBorrowed: totalBorrowed,
    currentlyBorrowed: currentlyBorrowed,
    returnedBooks: returnedBooks,
  };

  const getBookName = (bookCopyId) => {
    const copy = bookCopies.find(
      (c) => c.book_copy_id === bookCopyId || c.id === bookCopyId,
    );
    const actualBookId = copy?.book_id || bookCopyId;
    const book = books.find(
      (b) => b.book_id === actualBookId || b.id === actualBookId,
    );
    return book?.name || book?.title || "Unknown";
  };

  const getUserName = (userId) => {
    const user = users.find((u) => u.user_id === userId || u.id === userId);
    if (!user) return "Unknown";
    return user.full_name || user.name || user.username || "User";
  };

  const buildTransactionItem = (transaction) => ({
    id:
      transaction.transaction_id ||
      transaction.id ||
      `${transaction.user_id}-${transaction.book_id}-${transaction.created_at || ""}`,
    userName: transaction.user_name || getUserName(transaction.user_id),
    bookName:
      transaction.book_title ||
      transaction.book_name ||
      getBookName(transaction.book_id),
  });

  const borrowedItems = currentlyBorrowedTransactions
    .slice(0, 5)
    .map(buildTransactionItem);
  const overdueItems = (Array.isArray(overdueBooksData) ? overdueBooksData : [])
    .slice(0, 5)
    .map(buildTransactionItem);
  const returnedItems = returnedTransactions
    .slice(0, 5)
    .map(buildTransactionItem);

  const branchesById = new Map(
    branches.map((branch) => [
      branch.branch_id ?? branch.id,
      branch.name || branch.location || branch.address || "Unknown",
    ]),
  );

  const getBranchName = (user) => {
    const direct =
      user.branch ||
      user.branch_name ||
      user.branchName ||
      user.branch_location ||
      user.location ||
      user.address;
    if (direct) return direct;
    const branchId = user.branch_id ?? user.branchId;
    if (branchId !== undefined && branchId !== null) {
      return branchesById.get(branchId) || `Branch ${branchId}`;
    }
    return "N/A";
  };

  const adminUsers = Array.isArray(users)
    ? users.filter((user) => user.role === "Admin")
    : [];

  const displayAdmins = adminUsers
    .map((user) => ({
      id: user.user_id ?? user.id,
      name:
        user.name ||
        user.full_name ||
        user.username ||
        `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
        "Unknown",
      adminId: user.user_id ?? user.id,
      subtitle: `Librarian Branch: ${getBranchName(user)} \u2022 ${user.status || "Active"}`,
      isOnline: isUserOnline(user),
    }))
    .sort((a, b) => {
      if (a.isOnline !== b.isOnline) {
        return b.isOnline - a.isOnline;
      }
      return a.name.localeCompare(b.name);
    })
    .slice(0, 4);

  const renderTransactionList = (items, emptyText) => {
    if (transactionsLoadingState) {
      return (
        <li className="flex items-center gap-3 rounded-lg p-3 text-xs dark:text-[#121317]">
          Loading...
        </li>
      );
    }

    if (items.length === 0) {
      return (
        <li className="rounded-md bg-[#f5f7fb] p-2.5 text-xs text-gray-500 dark:bg-[#E3E3E3] dark:text-[#121317]">
          {emptyText}
        </li>
      );
    }

    return items.map((item) => (
      <li
        key={item.id}
        className="flex h-14 items-center gap-2.5 rounded-xl border border-[#0a0f33] bg-transparent px-2.5 py-3 text-xs dark:border-[#0a0f33] dark:bg-[#E3E3E3]"
      >
       <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full ">
                     <User className="h-full w-full text-[#0a0f33] dark:text-[#0a0f33]" />
                   </div>
        <div className="h-full w-[1.8px] rounded-full bg-[#0b0b3b] dark:bg-[#0a0f33]"></div>
        <div className="flex-1 overflow-hidden">
          <p className="truncate text-sm font-medium text-[#0a0f33] dark:text-[#121317]">
            {item.userName}
          </p>
          <p className="truncate text-xs font-medium text-[#6f7390] dark:text-[#121317]">
            Book Name: {item.bookName}
          </p>
        </div>
        <RotateCcw className="h-6 w-6 text-[#0a0f33] dark:text-[#121317]" />
      </li>
    ));
  };

  return (
    <section className="relative flex h-full w-full flex-1 flex-col overflow-hidden px-9 py-7 max-[1540px]:py-4 max-[1080px]:px-11 max-[430px]:w-dvw max-[430px]:px-4">
      <div className="flex min-h-0 flex-1 flex-row justify-between gap-12 overflow-y-auto max-[1540px]:flex-col max-[1540px]:gap-0 max-[1540px]:overflow-x-hidden max-[650px]:overflow-hidden">
        <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center overflow-hidden max-[1540px]:mx-0 max-[1540px]:h-fit max-[1540px]:flex-none max-[650px]:shrink">
          <div className="flex h-full w-full flex-col items-center justify-stretch rounded-lg max-[1540px]:h-fit">
            <div className="[430px]:px-0 [430px]:mx-0 flex h-full w-full flex-col items-center justify-between gap-10 max-[1540px]:my-0 max-[1540px]:h-fit max-[1540px]:max-w-full max-[1540px]:flex-row max-[1540px]:justify-center max-[1540px]:overflow-hidden max-[650px]:h-auto max-[650px]:gap-4 max-[430px]:scale-90">
              <PieChartLegend variant="mobile" />
              <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center pb-6 max-[1540px]:min-h-[162px] max-[1540px]:min-w-0 max-[1540px]:max-w-[250px] max-[1540px]:pb-0 max-[1080px]:max-w-[180px] max-[650px]:mb-0 max-[650px]:w-[120px]">
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

        <div className="flex min-h-0 w-full flex-1 flex-col gap-6 max-[1540px]:mt-6">
          {isSuperAdmin ? (
            <div className="grid h-full w-full auto-rows-fr grid-cols-2 gap-6 max-[900px]:grid-cols-1">
              <DashboardCard title="Borrowed Books">
                {renderTransactionList(borrowedItems, "No borrowed books")}
              </DashboardCard>
              <DashboardCard title="Overdue Borrowers">
                {renderTransactionList(overdueItems, "No overdue books")}
              </DashboardCard>
              <DashboardCard title="Returned Books">
                {renderTransactionList(returnedItems, "No returned books")}
              </DashboardCard>
              <AdminDashboardCard
                title="BookHive Librarian"
                loading={librariansLoading}
                displayAdmins={displayAdmins}
                handleRefreshAdmins={handleRefreshAdmins}
                loadingAdmins={loadingAdmins}
                emptyLabel="No librarians found"
              />
            </div>
          ) : (
            <div className="mx-auto w-full max-w-[900px]">
              <div className="grid w-full grid-cols-2 gap-6 max-[900px]:grid-cols-1">
                <div className="col-span-2 flex justify-center max-[900px]:col-span-1">
                  <DashboardCard
                    title="Borrowed Books"
                    className="h-auto min-h-[260px]"
                  >
                    {renderTransactionList(borrowedItems, "No borrowed books")}
                  </DashboardCard>
                </div>
                <DashboardCard
                  title="Overdue Borrowers"
                  className="h-auto min-h-[260px]"
                >
                  {renderTransactionList(overdueItems, "No overdue books")}
                </DashboardCard>
                <DashboardCard
                  title="Returned Books"
                  className="h-auto min-h-[260px]"
                >
                  {renderTransactionList(returnedItems, "No returned books")}
                </DashboardCard>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
