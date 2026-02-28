import React, { useState, useMemo } from "react";
import Popup from "./Popup.jsx";
import FormButton from "./FormButton.jsx";
import TabButton from "./TabButton.jsx";
import {
  Users,
  Search,
  Check,
  X,
  BookOpen,
  MessageSquare,
  ReceiptText,
} from "lucide-react";

const EXPIRATION_DAYS = 7;

const ViewRequestsPopup = ({
  show,
  onClose,
  currentUser = null,
  requests = [],
  onApprove,
  onReject,
  isLoading = false,
  bookRequests = [],
  onApproveBook,
  onRejectBook,
  isLoadingBooks = false,
  feedbackRequests = [],
  onApproveFeedback,
  onRejectFeedback,
  onViewFeedback,
  isLoadingFeedback = false,
  users = [],
  books = [],
  bookCopies = [],
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [showRejected, setShowRejected] = useState(false);
  const [activeTab, setActiveTab] = useState("users");

  const normalizeBranchValue = (value) => {
    if (value === undefined || value === null) return null;
    return String(value).trim().toLowerCase();
  };

  const currentUserRole = String(currentUser?.role || "").toLowerCase();
  const isBranchScopedRole =
    currentUserRole === "admin" || currentUserRole === "librarian";

  const currentUserBranch =
    normalizeBranchValue(currentUser?.branch_id) ||
    normalizeBranchValue(currentUser?.branchId) ||
    normalizeBranchValue(currentUser?.branch) ||
    normalizeBranchValue(currentUser?.branch_name) ||
    normalizeBranchValue(currentUser?.branchName);

  const shouldApplyBranchFilter = isBranchScopedRole && !!currentUserBranch;

  const userBranchByUserId = useMemo(() => {
    const map = new Map();

    users.forEach((user) => {
      const userId = user?.user_id ?? user?.id;
      if (userId === undefined || userId === null) return;

      const branchValue =
        normalizeBranchValue(user?.branch_id) ||
        normalizeBranchValue(user?.branchId) ||
        normalizeBranchValue(user?.branch) ||
        normalizeBranchValue(user?.branch_name) ||
        normalizeBranchValue(user?.branchName);

      if (branchValue) {
        map.set(String(userId), branchValue);
      }
    });

    return map;
  }, [users]);

  const getRequestBranch = (request) => {
    const directBranch =
      normalizeBranchValue(request?.branch_id) ||
      normalizeBranchValue(request?.branchId) ||
      normalizeBranchValue(request?.branch) ||
      normalizeBranchValue(request?.branch_name) ||
      normalizeBranchValue(request?.branchName);

    if (directBranch) return directBranch;

    const userId = request?.user_id ?? request?.id;
    if (userId !== undefined && userId !== null) {
      return userBranchByUserId.get(String(userId)) || null;
    }

    return null;
  };

  const getBookRequestBranch = (request) => {
    const directBranch = getRequestBranch(request);
    if (directBranch) return directBranch;

    const copyId = request?.book_id ?? request?.book_copy_id;
    const copy = bookCopies.find(
      (bc) => (bc?.book_copy_id ?? bc?.id) === copyId,
    );

    const copyBranch =
      normalizeBranchValue(copy?.branch_id) ||
      normalizeBranchValue(copy?.branchId) ||
      normalizeBranchValue(copy?.branch);

    if (copyBranch) return copyBranch;

    return null;
  };

  const isExpired = (createdAt) => {
    if (!createdAt) return false;
    const createdDate = new Date(createdAt);
    const expirationDate = new Date(
      createdDate.getTime() + EXPIRATION_DAYS * 24 * 60 * 60 * 1000,
    );
    return new Date() > expirationDate;
  };

  const getDaysRemaining = (createdAt) => {
    if (!createdAt) return 0;
    const createdDate = new Date(createdAt);
    const expirationDate = new Date(
      createdDate.getTime() + EXPIRATION_DAYS * 24 * 60 * 60 * 1000,
    );
    const remaining = Math.ceil(
      (expirationDate - new Date()) / (24 * 60 * 60 * 1000),
    );
    return Math.max(0, remaining);
  };

  const filteredUserRequests = useMemo(() => {
    let filtered = requests.filter((request) => {
      if (showRejected) {
        return request.status === "Rejected";
      } else {
        if (request.status === "Rejected") return false;
        if (request.status === "Pending" && isExpired(request.created_at))
          return false;
        return true;
      }
    });

    if (shouldApplyBranchFilter) {
      filtered = filtered.filter(
        (request) => getRequestBranch(request) === currentUserBranch,
      );
    }

    if (searchValue.trim()) {
      const searchLower = searchValue.toLowerCase();
      filtered = filtered.filter(
        (request) =>
          request.name?.toLowerCase().includes(searchLower) ||
          request.email?.toLowerCase().includes(searchLower),
      );
    }

    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.created_at || 0);
      const dateB = new Date(b.created_at || 0);
      return dateB - dateA;
    });
  }, [
    requests,
    searchValue,
    showRejected,
    shouldApplyBranchFilter,
    currentUserBranch,
    userBranchByUserId,
  ]);

  const filteredBookRequests = useMemo(() => {
    let filtered = bookRequests.filter((request) => {
      if (showRejected) {
        return request.status === "Rejected";
      } else {
        return request.status === "Pending";
      }
    });

    if (shouldApplyBranchFilter) {
      filtered = filtered.filter(
        (request) => getBookRequestBranch(request) === currentUserBranch,
      );
    }

    if (searchValue.trim()) {
      const searchLower = searchValue.toLowerCase();
      filtered = filtered.filter((request) => {
        const user = users.find((u) => u.user_id === request.user_id);
        const bookCopy = bookCopies.find(
          (bc) => bc.book_copy_id === request.book_id,
        );
        const book = bookCopy
          ? books.find((b) => b.book_id === bookCopy.book_id)
          : null;
        const userName = user?.name?.toLowerCase() || "";
        const bookName = book?.name?.toLowerCase() || "";
        return userName.includes(searchLower) || bookName.includes(searchLower);
      });
    }

    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.created_at || 0);
      const dateB = new Date(b.created_at || 0);
      return dateB - dateA;
    });
  }, [
    bookRequests,
    searchValue,
    showRejected,
    users,
    books,
    bookCopies,
    shouldApplyBranchFilter,
    currentUserBranch,
    userBranchByUserId,
  ]);

  const filteredFeedbackRequests = useMemo(() => {
    let filtered = feedbackRequests.filter((request) => {
      if (showRejected) {
        return request.status === "Rejected";
      } else {
        return request.status === "Pending";
      }
    });

    if (shouldApplyBranchFilter) {
      filtered = filtered.filter(
        (request) => getRequestBranch(request) === currentUserBranch,
      );
    }

    if (searchValue.trim()) {
      const searchLower = searchValue.toLowerCase();
      filtered = filtered.filter((request) => {
        const user = users.find((u) => u.user_id === request.user_id);
        const requestUserName = user?.name?.toLowerCase() || "";
        const userIdStr = request.user_id?.toString() || "";
        return (
          requestUserName.includes(searchLower) ||
          userIdStr.includes(searchLower)
        );
      });
    }

    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.created_at || 0);
      const dateB = new Date(b.created_at || 0);
      return dateB - dateA;
    });
  }, [
    feedbackRequests,
    searchValue,
    showRejected,
    users,
    shouldApplyBranchFilter,
    currentUserBranch,
    userBranchByUserId,
  ]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateShort = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getUserStatusBadge = (request) => {
    if (request.status === "Pending") {
      const daysLeft = getDaysRemaining(request.created_at);
      if (daysLeft <= 0) {
        return (
          <span className="text-xs font-medium text-red-500">Expired</span>
        );
      }
      return (
        <span className="text-xs font-medium">Pending ({daysLeft}d left)</span>
      );
    }
    return (
      <span className="text-xs font-medium">{request.status || "Pending"}</span>
    );
  };

  const getBookStatusBadge = (request) => {
    if (request.status === "Rejected" && showRejected) {
      const daysLeft = getDaysRemaining(request.created_at);
      if (daysLeft <= 0) {
        return (
          <span className="text-xs font-medium text-red-500">Expired</span>
        );
      }
      return (
        <span className="text-xs font-medium text-red-500">
          Rejected ({daysLeft}d left)
        </span>
      );
    }
    return (
      <span className="text-xs font-medium">{request.status || "Pending"}</span>
    );
  };

  const getUserName = (userId) => {
    const user = users.find((u) => u.user_id === userId);
    if (user?.name) return user.name;

    // If users haven't been loaded yet, avoid briefly showing the raw ID
    // in the User Name column. Show a neutral loading state instead.
    if (!users.length && userId) {
      return "Loading...";
    }

    return userId || "Unknown";
  };

  const getBookName = (bookCopyId) => {
    const bookCopy = bookCopies.find((bc) => bc.book_copy_id === bookCopyId);
    if (!bookCopy) return bookCopyId || "Unknown";
    const book = books.find((b) => b.book_id === bookCopy.book_id);
    return book?.name || bookCopyId || "Unknown";
  };

  const getCurrentData = () => {
    if (activeTab === "users") return filteredUserRequests;
    if (activeTab === "books") return filteredBookRequests;
    if (activeTab === "feedback") return filteredFeedbackRequests;
    return [];
  };

  const getTotalData = () => {
    if (activeTab === "users")
      return requests
        .filter((r) => r.status !== "Rejected")
        .filter((r) =>
          shouldApplyBranchFilter
            ? getRequestBranch(r) === currentUserBranch
            : true,
        );
    if (activeTab === "books")
      return bookRequests
        .filter((r) => r.status !== "Rejected")
        .filter((r) =>
          shouldApplyBranchFilter
            ? getBookRequestBranch(r) === currentUserBranch
            : true,
        );
    if (activeTab === "feedback")
      return feedbackRequests
        .filter((r) => r.status !== "Rejected")
        .filter((r) =>
          shouldApplyBranchFilter
            ? getRequestBranch(r) === currentUserBranch
            : true,
        );
    return [];
  };

  const getCurrentLoading = () => {
    if (activeTab === "users") return isLoading;
    if (activeTab === "books") return isLoadingBooks;
    if (activeTab === "feedback") return isLoadingFeedback;
    return false;
  };

  const getTabIcon = () => {
    if (activeTab === "users") return <Users size={30} />;
    if (activeTab === "books") return <BookOpen size={30} />;
    if (activeTab === "feedback") return <MessageSquare size={30} />;
    return <Users size={30} />;
  };

  const getSearchPlaceholder = () => {
    if (activeTab === "feedback") return "Search by Name or ID...";
    return "Search by Phone or Name...";
  };

  const currentData = getCurrentData();
  const totalData = getTotalData();
  const currentLoading = getCurrentLoading();

  return (
    <Popup
      show={show}
      onClose={onClose}
      title="Requests"
      icon={getTabIcon()}
      maxWidthClass="max-w-[1100px] max-[856px]:scale-80"
      heightClass="min-h-[1000px]"
    >
      <div className="flex h-full flex-col gap-4">
        <div className="flex gap-2">
          <TabButton
            label="User Requests"
            isActive={activeTab === "users"}
            onClick={() => {
              setActiveTab("users");
              setShowRejected(false);
            }}
            position="first"
          />
          <TabButton
            label="Borrow Requests"
            isActive={activeTab === "books"}
            onClick={() => {
              setActiveTab("books");
              setShowRejected(false);
            }}
            position="middle"
          />
          <TabButton
            label="Feedback Requests"
            isActive={activeTab === "feedback"}
            onClick={() => {
              setActiveTab("feedback");
              setShowRejected(false);
            }}
            position="last"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder={getSearchPlaceholder()}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="h-[50px] w-[70%] rounded-xl border border-[#3D3E3E] py-3 pl-12 pr-4 text-[13px] outline-none focus:border-[#1e255e]"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden rounded-[10px] border border-[#8787A3]">
          <div className="min-w-[100px] flex-1 overflow-auto">
            {currentLoading ? (
              <div className="p-8 text-center text-gray-500 dark:text-[#D7D7D7]">
                Loading requests...
              </div>
            ) : currentData.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-[#D7D7D7]">
                {searchValue
                  ? "No requests match your search."
                  : showRejected
                    ? "No rejected requests."
                    : "No pending requests."}
              </div>
            ) : activeTab === "users" ? (
              <table className="w-full">
                <thead className="sticky top-0 bg-white">
                  <tr>
                    <th className="p-4 text-center text-sm font-semibold text-[#333]">
                      Name
                    </th>
                    <th className="p-4 text-center text-sm font-semibold text-[#333]">
                      Email
                    </th>
                    <th className="p-4 text-center text-sm font-semibold text-[#333]">
                      Contact No
                    </th>
                    <th className="p-4 text-center text-sm font-semibold text-[#333]">
                      Plan
                    </th>
                    <th className="p-4 text-center text-sm font-semibold text-[#333]">
                      Sent At
                    </th>
                    <th className="p-4 text-center text-sm font-semibold text-[#333]">
                      Status
                    </th>
                    {!showRejected && (
                      <th className="p-4 text-center text-sm font-semibold text-[#333]">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="border-t border-[#0a0f33]">
                  {filteredUserRequests.map((request, index) => (
                    <tr key={request.request_id || index}>
                      <td className="whitespace-nowrap p-4 text-center text-sm dark:text-[#D7D7D7]">
                        {request.name}
                      </td>
                      <td className="whitespace-nowrap p-4 text-center text-sm dark:text-[#D7D7D7]">
                        {request.email}
                      </td>
                      <td className="whitespace-nowrap p-4 text-center text-sm dark:text-[#D7D7D7]">
                        {request.phone_number}
                      </td>
                      <td className="whitespace-nowrap p-4 text-center text-sm dark:text-[#D7D7D7]">
                        {request.plan || "N/A"}
                      </td>
                      <td className="whitespace-nowrap p-4 text-center text-sm dark:text-[#D7D7D7]">
                        {formatDate(request.created_at)}
                      </td>
                      <td className="whitespace-nowrap p-4 text-center dark:text-[#D7D7D7]">
                        {getUserStatusBadge(request)}
                      </td>
                      {!showRejected && (
                        <td className="p-4">
                          <div className="flex justify-center gap-2">
                            {request.status === "Pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    onApprove && onApprove(request)
                                  }
                                  className="cursor-pointer rounded-lg border border-[#1e255e] bg-white p-2 text-[#1e255e]"
                                  title="Approve"
                                >
                                  <Check size={16} />
                                </button>
                                <button
                                  onClick={() => onReject && onReject(request)}
                                  className="cursor-pointer rounded-lg border border-[#1e255e] bg-white p-2 text-[#1e255e]"
                                  title="Reject"
                                >
                                  <X size={16} />
                                </button>
                              </>
                            )}
                            {request.status !== "Pending" && (
                              <span className="text-sm italic text-gray-400">
                                Processed
                              </span>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : activeTab === "books" ? (
              <table className="w-full">
                <thead className="sticky top-0 bg-white">
                  <tr>
                    <th className="p-4 text-center text-sm font-semibold text-[#333]">
                      User Name
                    </th>
                    <th className="p-4 text-center text-sm font-semibold text-[#333]">
                      Book Name
                    </th>
                    <th className="p-4 text-center text-sm font-semibold text-[#333]">
                      Due Date
                    </th>
                    <th className="p-4 text-center text-sm font-semibold text-[#333]">
                      Requested At
                    </th>
                    <th className="p-4 text-center text-sm font-semibold text-[#333]">
                      Status
                    </th>
                    {!showRejected && (
                      <th className="p-4 text-center text-sm font-semibold text-[#333]">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="border-t border-[#0a0f33]">
                  {filteredBookRequests.map((request, index) => (
                    <tr key={request.transaction_id || index}>
                      <td className="whitespace-nowrap p-4 text-center text-sm dark:text-[#D7D7D7]">
                        {getUserName(request.user_id)}
                      </td>
                      <td className="whitespace-nowrap p-4 text-center text-sm dark:text-[#D7D7D7]">
                        {getBookName(request.book_id)}
                      </td>
                      <td className="whitespace-nowrap p-4 text-center text-sm dark:text-[#D7D7D7]">
                        {formatDateShort(request.due_date)}
                      </td>
                      <td className="whitespace-nowrap p-4 text-center text-sm dark:text-[#D7D7D7]">
                        {formatDate(request.created_at)}
                      </td>
                      <td className="whitespace-nowrap p-4 text-center dark:text-[#D7D7D7]">
                        {getBookStatusBadge(request)}
                      </td>
                      {!showRejected && (
                        <td className="p-4">
                          <div className="flex justify-center gap-2">
                            {request.status === "Pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    onApproveBook && onApproveBook(request)
                                  }
                                  className="cursor-pointer rounded-lg border border-[#1e255e] bg-white p-2 text-[#1e255e]"
                                  title="Approve"
                                >
                                  <Check size={16} />
                                </button>
                                <button
                                  onClick={() =>
                                    onRejectBook && onRejectBook(request)
                                  }
                                  className="cursor-pointer rounded-lg border border-[#1e255e] bg-white p-2 text-[#1e255e]"
                                  title="Reject"
                                >
                                  <X size={16} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full">
                <thead className="sticky top-0 bg-white">
                  <tr>
                    <th className="p-4 text-center text-sm font-semibold text-[#333]">
                      User Name
                    </th>
                    <th className="p-4 text-center text-sm font-semibold text-[#333]">
                      ID User
                    </th>
                    <th className="p-4 text-center text-sm font-semibold text-[#333]">
                      Requested At
                    </th>
                    <th className="p-4 text-center text-sm font-semibold text-[#333]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="border-t border-[#0a0f33]">
                  {filteredFeedbackRequests.map((request, index) => (
                    <tr key={request.request_id || index}>
                      <td className="whitespace-nowrap p-4 text-center text-sm dark:text-[#D7D7D7]">
                        {getUserName(request.user_id)}
                      </td>
                      <td className="whitespace-nowrap p-4 text-center text-sm dark:text-[#D7D7D7]">
                        {request.user_id}
                      </td>
                      <td className="whitespace-nowrap p-4 text-center text-sm dark:text-[#D7D7D7]">
                        {formatDate(request.created_at)}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() =>
                              onApproveFeedback && onApproveFeedback(request)
                            }
                            className="cursor-pointer rounded-lg border border-[#1e255e] bg-white p-2 text-[#1e255e]"
                            title="Approve"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={() =>
                              onRejectFeedback && onRejectFeedback(request)
                            }
                            className="cursor-pointer rounded-lg border border-[#1e255e] bg-white p-2 text-[#1e255e]"
                            title="Reject"
                          >
                            <X size={16} />
                          </button>
                          <button
                            onClick={() =>
                              onViewFeedback && onViewFeedback(request)
                            }
                            className="cursor-pointer rounded-lg border border-[#1e255e] bg-white p-2 text-[#1e255e]"
                            title="View Details"
                          >
                            <ReceiptText size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* <div className="text-center text-sm text-gray-500">
          <div>
            Showing {currentData.length} of {totalData.length} requests
          </div>
          {activeTab === "users" && !showRejected && (
            <div className="mt-1 text-xs">
              Request expiration = {EXPIRATION_DAYS} days
            </div>
          )}
          {activeTab === "books" && showRejected && (
            <div className="mt-1 text-xs">
              Rejected request expiration = {EXPIRATION_DAYS} days
            </div>
          )}
        </div> */}

        <div className="flex justify-center gap-3">
          <FormButton onClick={onClose} isPrimary={false}>
            CLOSE
          </FormButton>
        </div>
      </div>
    </Popup>
  );
};

export default ViewRequestsPopup;
