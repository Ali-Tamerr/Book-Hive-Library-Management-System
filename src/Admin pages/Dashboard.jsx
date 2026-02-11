import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { User, Book, Building2, ShieldCheck, RefreshCw } from "lucide-react";
import { useUsers } from "../hooks/useUsers";
import { useBooks } from "../hooks/useBooks";
import { useReservations } from "../hooks/useReservations";
import { useBranches } from "../hooks/useBranches";
import { useOverdueBooks } from "../hooks/useOverdueBooks";
import { useBookCopies } from "../hooks/useBookCopies";
import { useBookTransactions } from "../hooks/useBookTransactions";
import { getCurrentUser } from "../services/auth.api";
import DashboardCard from "../components/DashboardCard";
import DashboardInfoCard from "../components/DashboardInfoCard";
import { useUserActivity } from "../hooks/useUserActivity";
import { isUserOnline } from "../services/userActivity.api";
import LogoIcon from "../assets/logo.svg?react";
import PieChart from "../components/PieChart";
import PieChartLegend from "../components/PieChartLegend";
import AdminDashboardCard from "../components/AdminDashboardCard.jsx";
import ViewDetailsPopup from "../components/ViewDetailsPopup";
import MaximizeIcon from "../assets/icons/maximize-circle.svg?react";

function Dashboard() {
  const location = useLocation();
  const [loadingAdmins, setLoadingAdmins] = useState({});
  const [currentUser] = useState(getCurrentUser());
  useUserActivity();

  const [viewDetailsItem, setViewDetailsItem] = useState(null);
  const [viewDetailsType, setViewDetailsType] = useState(null);
  const [showViewDetails, setShowViewDetails] = useState(false);

  const handleViewDetails = (item, type) => {
    setViewDetailsItem(item);
    setViewDetailsType(type);
    setShowViewDetails(true);
  };

  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/admin/dashboard")) {
      setActiveTab("dashboard");
    }
  }, [location.pathname]);

  // Use React Query hooks - much cleaner!
  const {
    data: users = [],
    isLoading: usersLoading,
    refetch: refetchUsers,
  } = useUsers();

  const getCreatorName = (createdById) => {
    if (!createdById || !Array.isArray(users))
      return { name: "N/A", role: "Not recorded" };
    const creator = users.find((u) => u.user_id === createdById);
    return creator
      ? { name: creator.name, role: creator.role }
      : { name: createdById, role: "Unknown" };
  };
  const { data: books = [], isLoading: booksLoading } = useBooks();
  const { data: reservations = [], isLoading: reservationsLoading } =
    useReservations();
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
  const loading =
    usersLoading ||
    booksLoading ||
    reservationsLoading ||
    branchesLoading ||
    overdueLoading ||
    transactionsLoading;

  const adminUsers = Array.isArray(users)
    ? users.filter((user) => user.role === "Admin")
    : [];

  const borrowedTransactions = Array.isArray(bookTransactions)
    ? bookTransactions.filter(
        (t) => t.transaction_type === "Check-Out" && t.status === "Completed",
      )
    : [];
  const returnedBooks = borrowedTransactions.filter(
    (t) => t.return_date,
  ).length;
  const currentlyBorrowed = borrowedTransactions.filter(
    (t) => !t.return_date,
  ).length;
  const totalBorrowed = borrowedTransactions.length;

  const stats = {
    totalUsers: Array.isArray(users) ? users.length : 0,
    totalBooks: Array.isArray(books)
      ? books.reduce((sum, book) => sum + (book.quantity || 0), 0)
      : 0,
    branchCount: Array.isArray(branches) ? branches.length : 0,
    totalBorrowed: totalBorrowed,
    currentlyBorrowed: currentlyBorrowed,
    returnedBooks: returnedBooks,
  };

  // Get overdue borrowers with user info
  const overdueBorrowers =
    (Array.isArray(overdueBooksData) ? overdueBooksData.slice(0, 5) : []).map(
      (book) => {
        const user = Array.isArray(users)
          ? users.find(
              (u) =>
                u.id === book.user_id ||
                u.first_name + " " + u.last_name === book.user_name,
            )
          : null;
        return {
          id: book.id,
          borrowedId: book.id,
          userName:
            book.user_name ||
            (user ? `${user.first_name} ${user.last_name}` : "Unknown"),
          userId: book.user_id || user?.id,
        };
      },
    ) || [];

  const displayAdmins = adminUsers
    .map((user) => ({
      id: user.user_id,
      name: user.name || "Unknown",
      adminId: user.user_id,
      isOnline: isUserOnline(user),
    }))
    .sort((a, b) => {
      if (a.isOnline !== b.isOnline) {
        return b.isOnline - a.isOnline;
      }
      return a.name.localeCompare(b.name);
    })
    .slice(0, 4);

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

        <div className="[1540px]:self-end flex min-h-0 shrink-0 flex-col items-end justify-start gap-[5vh] max-[1540px]:max-h-[135px] max-[1540px]:w-full max-[1540px]:shrink max-[1540px]:items-center max-[1200px]:max-h-none max-[1200px]:gap-0 max-[650px]:max-h-fit max-[650px]:shrink-0">
          <div className="flex flex-col gap-[3vh] max-[1540px]:mr-0 max-[1540px]:w-full max-[1540px]:flex-row max-[1540px]:justify-center max-[1540px]:gap-8 max-[1200px]:grid max-[1200px]:grid-cols-2 max-[1200px]:place-items-center max-[1200px]:content-center max-[1200px]:items-center max-[1200px]:gap-0 max-[1080px]:w-[110%] max-[1080px]:gap-2 max-[856px]:scale-90 max-[650px]:flex max-[650px]:w-full max-[650px]:scale-100 max-[650px]:flex-col max-[650px]:items-stretch max-[650px]:gap-1 max-[650px]:p-0 min-[1080px]:p-0">
            <div className="min-w-0 max-[1540px]:flex-1 max-[1200px]:flex max-[1200px]:w-fit max-[1200px]:justify-center max-[650px]:w-full">
              <DashboardInfoCard
                icon={<User className="h-full w-full text-[#0a0f33]" />}
                title="Total User Base"
                value={stats.totalUsers}
                loading={loading}
              />
            </div>
            <div className="min-w-0 max-[1540px]:flex-1 max-[1200px]:flex max-[1200px]:w-fit max-[1200px]:justify-center max-[650px]:w-full">
              <DashboardInfoCard
                icon={<Book className="h-full w-full text-[#0a0f33]" />}
                title="Total Book Count"
                value={stats.totalBooks}
                loading={loading}
              />
            </div>
            <div className="min-w-0 max-[1540px]:flex-1 max-[1200px]:col-span-2 max-[1200px]:flex max-[1200px]:w-fit max-[1200px]:justify-center max-[650px]:w-full">
              <DashboardInfoCard
                icon={<Building2 className="h-full w-full text-[#0a0f33]" />}
                title="Branch Count"
                value={stats.branchCount}
                loading={loading}
              />
            </div>
          </div>
          <div className="mr-5 block min-h-0 w-[396px] flex-1 overflow-y-auto max-[1540px]:hidden">
            <AdminDashboardCard
              loading={loading}
              displayAdmins={displayAdmins}
              handleRefreshAdmins={handleRefreshAdmins}
              loadingAdmins={loadingAdmins}
            />
          </div>
        </div>

        <div className="max-[1540px]:flex-20 flex min-h-0 w-max min-w-[180px] max-w-[405px] shrink-0 snap-x snap-mandatory flex-col gap-9 overflow-x-auto overflow-y-auto pr-4 max-[1540px]:max-h-[360px] max-[1540px]:w-full max-[1540px]:max-w-full max-[1540px]:shrink max-[1540px]:flex-row max-[1540px]:gap-4 max-[1540px]:rounded-lg max-[1080px]:mt-2 max-[856px]:scale-90 max-[650px]:min-h-0 max-[650px]:flex-1 max-[650px]:scale-100 max-[650px]:pr-0 max-[650px]:[scrollbar-width:none] max-[640px]:-mb-7 max-[650px]:[&::-webkit-scrollbar]:hidden">
          <div className="flex min-h-0 flex-1 snap-start flex-col">
            <DashboardCard title="Overdue Borrowers">
              {loading ? (
                <li className="flex items-center gap-3 rounded-lg p-3 text-xs">
                  Loading...
                </li>
              ) : overdueBorrowers.length > 0 ? (
                overdueBorrowers.map((borrower) => (
                  <li
                    key={borrower.id}
                    className="flex h-14 items-center gap-2.5 rounded-xl border border-[#0a0f33] bg-transparent px-2.5 py-3 text-xs dark:border-[#929292] dark:bg-[#929292]"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#0a0f33] dark:bg-[#929292]">
                      <User size={14} className="text-white dark:text-black" />
                    </div>
                    <div className="h-full w-[1.8px] rounded-full bg-[#0b0b3b] dark:bg-black"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#0a0f33] dark:text-black">
                        {borrower.userName}
                      </p>
                      <p className="text-xs font-medium text-[#6f7390] dark:text-black">
                        Borrowed ID: {borrower.borrowedId}
                      </p>
                    </div>
                    <MaximizeIcon
                      className="h-7 w-7 cursor-pointer text-[#0a0f33] dark:text-black"
                      onClick={() => handleViewDetails(borrower, "overdue")}
                    />
                  </li>
                ))
              ) : (
                <li className="rounded-lg p-3 text-xs text-gray-500">
                  No overdue books
                </li>
              )}
            </DashboardCard>
          </div>

          <div className="flex min-h-0 flex-1 snap-center flex-col">
            <DashboardCard title="Branch Network">
              {branchesLoading ? (
                <li className="flex items-center gap-3 rounded-lg p-3 text-xs">
                  Loading...
                </li>
              ) : Array.isArray(branches) && branches.length > 0 ? (
                branches.map((branch) => (
                  <li
                    key={branch.id}
                    className="flex h-14 items-center gap-2.5 rounded-xl border border-[#0a0f33] bg-transparent px-2.5 py-1.5 text-xs dark:border-[#292D32] dark:bg-[#929292]"
                  >
                    <div className="p4 flex h-7 w-9 shrink-0 items-center justify-center rounded-md">
                      <Building2 className="h-full w-full text-[#0a0f33] dark:text-black" />
                    </div>
                    <div className="h-full w-[1.8px] bg-[#0b0b3b] dark:bg-black"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#0a0f33] dark:text-black">
                        {branch.name}
                      </p>
                      <p className="text-xs font-medium text-[#0a0f33] dark:text-black">
                        {branch.location ||
                          branch.address ||
                          "Location not specified"}
                      </p>
                    </div>
                    <MaximizeIcon
                      className="h-7 w-7 cursor-pointer text-[#0a0f33] dark:text-black"
                      onClick={() => handleViewDetails(branch, "branch")}
                    />
                  </li>
                ))
              ) : (
                <li className="rounded-lg p-3 text-xs text-gray-500">
                  No branches found
                </li>
              )}
            </DashboardCard>
          </div>

          <div className="hidden h-[342px] snap-end flex-col max-[1540px]:flex max-[1540px]:h-full max-[1540px]:flex-1">
            <AdminDashboardCard
              loading={loading}
              displayAdmins={displayAdmins}
              handleRefreshAdmins={handleRefreshAdmins}
              loadingAdmins={loadingAdmins}
            />
          </div>
        </div>
      </div>

      {showViewDetails && (
        <ViewDetailsPopup
          show={showViewDetails}
          onClose={() => {
            setShowViewDetails(false);
            setViewDetailsItem(null);
            setViewDetailsType(null);
          }}
          title={
            viewDetailsType === "branch" ? "View Branch" : "Overdue Details"
          }
          data={(() => {
            if (!viewDetailsItem) return null;
            if (viewDetailsType === "overdue") {
              return {
                "Borrower Name": viewDetailsItem.userName,
                "Book ID": viewDetailsItem.borrowedId,
                "User ID": viewDetailsItem.userId || "N/A",
              };
            }
            return {
              "Branch ID": viewDetailsItem.branch_id,
              Name: viewDetailsItem.name,
              "Contact No": viewDetailsItem.contact_number,
              Location: viewDetailsItem.location,
              // 'Book Copies': (() => {
              //   const branchCopies = bookCopies.filter(bc => bc.branch_id === viewDetailsItem.branch_id);
              //   if (branchCopies.length === 0) return 'No books in this branch';
              //   const bookDetails = branchCopies.map(bc => {
              //     const book = books.find(b => b.book_id === bc.book_id);
              //     return `${book?.name || 'Unknown'} (${bc.book_copy_id})`;
              //   });
              //   return bookDetails.join(', ');
              // })()
            };
          })()}
          savedBy={
            viewDetailsType === "branch" && viewDetailsItem
              ? getCreatorName(viewDetailsItem.created_by)
              : null
          }
        />
      )}
    </section>
  );
}

export default Dashboard;
