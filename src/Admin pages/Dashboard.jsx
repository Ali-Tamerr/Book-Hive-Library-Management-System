import { useState } from "react";
import { User } from "lucide-react";
import { useLibrarians } from "../hooks/useUsers";
import { useDashboardTransactions } from "../hooks/useBookTransactions";
import { getCurrentUser } from "../services/auth.api";
import DashboardCard from "../components/DashboardCard";
import { useUserActivity } from "../hooks/useUserActivity";
import { isUserOnline } from "../services/userActivity.api";
import PieChart from "../components/PieChart";
import PieChartLegend from "../components/PieChartLegend";
import AdminDashboardCard from "../components/AdminDashboardCard.jsx";
import ViewDetailsPopup from "../components/ViewDetailsPopup.jsx";
const MaximizeIcon = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M21.6914 2.71C21.6114 2.53 21.4714 2.38 21.2814 2.3C21.1914 2.27 21.1014 2.25 21.0014 2.25H17.0014C16.5914 2.25 16.2514 2.59 16.2514 3C16.2514 3.41 16.5914 3.75 17.0014 3.75H19.1914L14.4714 8.47C14.1814 8.76 14.1814 9.24 14.4714 9.53C14.6214 9.68 14.8114 9.75 15.0014 9.75C15.1914 9.75 15.3814 9.68 15.5314 9.53L20.2514 4.81V7C20.2514 7.41 20.5914 7.75 21.0014 7.75C21.4114 7.75 21.7514 7.41 21.7514 7V3C21.7514 2.9 21.7314 2.81 21.6914 2.71Z"
      fill="currentColor"
    />
    <path
      d="M8.47 14.4714L3.75 19.1914V17.0014C3.75 16.5914 3.41 16.2514 3 16.2514C2.59 16.2514 2.25 16.5914 2.25 17.0014V21.0014C2.25 21.1014 2.27 21.1914 2.31 21.2914C2.39 21.4714 2.53 21.6214 2.72 21.7014C2.8 21.7314 2.9 21.7514 3 21.7514H7C7.41 21.7514 7.75 21.4114 7.75 21.0014C7.75 20.5914 7.41 20.2514 7 20.2514H4.81L9.53 15.5314C9.82 15.2414 9.82 14.7614 9.53 14.4714C9.24 14.1814 8.76 14.1814 8.47 14.4714Z"
      fill="currentColor"
    />
    <path
      d="M2.2 14.75C1.85 14.75 1.54 14.5 1.47 14.15C1.33 13.45 1.25 12.72 1.25 12C1.25 6.07 6.07 1.25 12 1.25C12.73 1.25 13.46 1.32 14.17 1.47C14.58 1.55 14.84 1.95 14.76 2.35C14.68 2.76 14.27 3.01 13.88 2.94C13.25 2.81 12.63 2.75 12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 12.62 2.81 13.25 2.94 13.85C3.02 14.26 2.76 14.65 2.35 14.73C2.3 14.75 2.25 14.75 2.2 14.75Z"
      fill="currentColor"
    />
    <path
      d="M12.001 22.7483C11.271 22.7483 10.541 22.6783 9.83101 22.5283C9.42101 22.4483 9.16101 22.0483 9.24101 21.6483C9.32101 21.2383 9.73101 20.9883 10.121 21.0583C10.731 21.1783 11.361 21.2483 11.991 21.2483C17.091 21.2483 21.241 17.0983 21.241 11.9983C21.241 11.3783 21.181 10.7583 21.061 10.1483C20.981 9.73835 21.241 9.34835 21.651 9.26835C22.061 9.18835 22.451 9.44835 22.531 9.85835C22.671 10.5583 22.741 11.2783 22.741 11.9983C22.751 17.9283 17.931 22.7483 12.001 22.7483Z"
      fill="currentColor"
    />
  </svg>
);

function Dashboard() {
  const currentUser = getCurrentUser();
  const isSuperAdmin = currentUser?.role === "Super Admin";
  const [loadingAdmins, setLoadingAdmins] = useState({});
  const [selectedTransactionItem, setSelectedTransactionItem] = useState(null);
  useUserActivity();

  // Use React Query hooks - newly optimized tiny footprint
  const {
    data: librariansData,
    isLoading: librariansLoading,
    refetch: refetchLibrarians,
  } = useLibrarians();

  const { data: dashboardTransactions, isLoading: transactionsLoading } =
    useDashboardTransactions();

  const handleRefreshAdmins = (adminId) => {
    setLoadingAdmins((prev) => ({ ...prev, [adminId]: true }));
    refetchLibrarians().finally(() => {
      setLoadingAdmins((prev) => ({ ...prev, [adminId]: false }));
    });
  };

  const transactionsLoadingState = transactionsLoading;

  const stats = {
    totalBorrowed: dashboardTransactions?.total_borrowed || 0,
    currentlyBorrowed: dashboardTransactions?.currently_borrowed || 0,
    returnedBooks: dashboardTransactions?.returned_count || 0,
  };

  const buildTransactionItem = (transaction, sourceCard) => ({
    id: transaction.transaction_id || `tx-${Math.random()}`,
    userName: transaction.user_name || "Unknown",
    bookName: transaction.book_name || "Unknown",
    transactionType: transaction.transaction_type || "N/A",
    status: transaction.status || "N/A",
    borrowType: transaction.borrow_type || "N/A",
    dueDate: transaction.due_date || "N/A",
    returnDate: transaction.return_date || "N/A",
    createdAt: transaction.created_at || "N/A",
    sourceCard,
  });

  const formatSimpleDate = (value) => {
    if (!value || value === "N/A") return "N/A";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    return parsed.toLocaleDateString();
  };

  const borrowedItems = (dashboardTransactions?.borrowed || []).map((t) =>
    buildTransactionItem(t, "borrowed"),
  );
  const overdueItems = (dashboardTransactions?.overdue || []).map((t) =>
    buildTransactionItem(t, "overdue"),
  );
  const returnedItems = (dashboardTransactions?.returned || []).map((t) =>
    buildTransactionItem(t, "returned"),
  );

  const displayAdmins = Array.isArray(librariansData)
    ? librariansData
        .map((user) => ({
          ...user,
          adminId: user.user_id,
          id: user.user_id,
          subtitle: `Librarian Branch: ${user.branch_name || "N/A"}`,
          isOnline: isUserOnline(user),
        }))
        .sort((a, b) => {
          if (a.isOnline !== b.isOnline) return b.isOnline - a.isOnline;
          return (a.name || "").localeCompare(b.name || "");
        })
        .slice(0, 4)
    : [];

  const renderTransactionList = (items, emptyText) => {
    if (transactionsLoadingState) {
      return (
        <li className="flex items-center gap-3 rounded-lg p-3 text-xs dark:text-[#d3d6de]">
          Loading...
        </li>
      );
    }

    if (items.length === 0) {
      return (
        <li className="rounded-md p-2.5 text-center text-xs text-[#000035] dark:bg-transparent dark:text-[#c3c7d1]">
          {emptyText}
        </li>
      );
    }

    return items.map((item) => (
      <li
        key={item.id}
        className="flex h-14 items-center gap-2.5 rounded-xl border border-[#000035] bg-transparent px-2.5 py-3 text-xs dark:border-[rgba(185,189,200,0.78)]"
      >
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full">
          <User className="h-full w-full text-[#000035] dark:text-[#d3d6de]" />
        </div>
        <div className="h-full w-[1.8px] rounded-full bg-[#000035] dark:bg-[rgba(185,189,200,0.78)]"></div>
        <div className="flex-1 overflow-hidden">
          <p className="truncate text-sm font-medium text-[#000035] dark:text-[#d3d6de]">
            {item.userName}
          </p>
          <p className="truncate text-xs font-medium text-[#000035] dark:text-[#c3c7d1]">
            Book Name: {item.bookName}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSelectedTransactionItem(item)}
          className="inline-flex h-6 w-6 cursor-pointer items-center justify-center text-[#000035] transition-opacity hover:opacity-80 dark:text-[#d3d6de]"
          aria-label="View row details"
        >
          <MaximizeIcon className="h-6 w-6" />
        </button>
      </li>
    ));
  };

  const selectedDetails = selectedTransactionItem
    ? {
        "User Name": selectedTransactionItem.userName,
        "Book Name": selectedTransactionItem.bookName,
        "Due Date": formatSimpleDate(selectedTransactionItem.dueDate),
        ...(selectedTransactionItem.sourceCard === "returned"
          ? {
              "Return Date": formatSimpleDate(
                selectedTransactionItem.returnDate,
              ),
            }
          : {}),
      }
    : null;

  const compactCardClass =
    "!flex-none !w-[320px] !min-w-[320px] !h-full !min-h-[250px] max-[900px]:!w-full max-[900px]:max-w-[420px]";

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
            <div className="mx-auto mt-2 flex h-full min-h-0 w-full max-w-[700px] flex-col gap-5">
              <div className="flex min-h-0 flex-1 justify-center max-[900px]:block max-[900px]:w-full max-[900px]:max-w-[420px] max-[900px]:self-center">
                <DashboardCard
                  title="Borrowed Books"
                  className={compactCardClass}
                  listClassName="pt-2"
                >
                  {renderTransactionList(borrowedItems, "No borrowed books")}
                </DashboardCard>
              </div>

              <div className="grid min-h-0 w-full flex-1 auto-rows-fr grid-cols-2 place-items-stretch gap-6 max-[900px]:grid-cols-1">
                <DashboardCard
                  title="Overdue Borrowers"
                  className={compactCardClass}
                  listClassName="pt-2"
                >
                  {renderTransactionList(overdueItems, "No overdue books")}
                </DashboardCard>
                <DashboardCard
                  title="Returned Books"
                  className={compactCardClass}
                  listClassName="pt-2"
                >
                  {renderTransactionList(returnedItems, "No returned books")}
                </DashboardCard>
              </div>
            </div>
          )}
        </div>
      </div>

      <ViewDetailsPopup
        show={!!selectedTransactionItem}
        onClose={() => setSelectedTransactionItem(null)}
        title="Transaction Details"
        data={selectedDetails}
        variant="details"
      />
    </section>
  );
}

export default Dashboard;
