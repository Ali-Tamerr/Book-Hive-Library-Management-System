import React, { useState, useMemo } from "react";
import Popup from "./Popup.jsx";
import FormButton from "./FormButton.jsx";
import TabButton from "./TabButton.jsx";
import RequestsTable from "./RequestsTable.jsx";
import {
  Users,
  Search,
  Check,
  X,
  BookOpen,
  MessageSquare,
  ReceiptText,
} from "lucide-react";



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
    currentUserRole !== "super admin";

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



  const filteredUserRequests = useMemo(() => {
    let filtered = requests.filter((request) => {
      if (showRejected) {
        return request.status === "Rejected";
      } else {
        if (request.status === "Rejected") return false;
        return true;
      }
    });

    if (shouldApplyBranchFilter) {
      filtered = filtered.filter(
        (request) => getRequestBranch(request) === currentUserBranch
      );
    }

    if (searchValue.trim()) {
      const searchLower = searchValue.toLowerCase();
      filtered = filtered.filter(
        (request) =>
          `${request.first_name || ""} ${request.last_name || ""}`
            .toLowerCase()
            .includes(searchLower) ||
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
        const userName = user
          ? `${user.first_name || ""} ${user.last_name || ""}`
              .trim()
              .toLowerCase()
          : "";
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
        const requestUserName = user
          ? `${user.first_name || ""} ${user.last_name || ""}`
              .trim()
              .toLowerCase()
          : "";
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
    return (
      <span className="text-xs font-medium">{request.status || "Pending"}</span>
    );
  };

  const getBookStatusBadge = (request) => {
    return (
      <span className="text-xs font-medium">{request.status || "Pending"}</span>
    );
  };

  const getUserName = (userId) => {
    const user = users.find((u) => u.user_id === userId);
    if (user?.first_name || user?.last_name)
      return `${user.first_name || ""} ${user.last_name || ""}`.trim();

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
    return "Search by Name or Email...";
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
      maxWidthClass="w-[95vw] lg:w-[90vw] max-w-[68.75rem]"
      panelClassName="h-[90vh] lg:max-h-[53.125rem]"
    >
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <TabButton
            label="User Requests"
            isActive={activeTab === "users"}
            onClick={() => {
              setActiveTab("users");
              setShowRejected(false);
            }}
            position="first"
            className="flex-1"
          />
          <TabButton
            label="Borrow Requests"
            isActive={activeTab === "books"}
            onClick={() => {
              setActiveTab("books");
              setShowRejected(false);
            }}
            position="middle"
            className="flex-1"
          />
          <TabButton
            label="Feedback Requests"
            isActive={activeTab === "feedback"}
            onClick={() => {
              setActiveTab("feedback");
              setShowRejected(false);
            }}
            position="last"
            className="flex-1"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#000035] dark:text-[#D7D7D7]"
              size={18}
            />
            <input
              type="text"
              placeholder={getSearchPlaceholder()}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="h-[3.125rem] w-full lg:w-[70%] rounded-xl border border-[#000035] py-3 pl-12 pr-4 text-[0.8125rem] placeholder-[#000035] outline-none dark:border-[#D7D7D7] dark:placeholder-[#D7D7D7]"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center overflow-hidden rounded-[0.625rem] border border-[#000035] dark:border-[#D7D7D7] min-h-[15.625rem]">
          <div className="min-w-[6.25rem] flex-1 overflow-auto">
            {activeTab === "users" ? (
              <RequestsTable
                isLoading={currentLoading}
                emptyMessage={
                  searchValue
                    ? "No requests match your search."
                    : showRejected
                      ? "No rejected requests."
                      : "No pending requests."
                }
                data={filteredUserRequests}
                keyExtractor={(req, idx) => req.request_id || idx}
                columns={[
                  { header: "Name", accessor: "name", render: (req) => `${req.first_name || ""} ${req.last_name || ""}`.trim() },
                  { header: "Email", accessor: "email", render: (req) => req.email },
                  { header: "Plan", accessor: "plan", render: (req) => req.plan || "N/A" },
                  { header: "Sent At", accessor: "created_at", render: (req) => formatDate(req.created_at) },
                  { header: "Status", accessor: "status", render: (req) => getUserStatusBadge(req) },
                  ...(showRejected ? [] : [{
                    header: "Actions",
                    accessor: "actions",
                    render: (request) => (
                      <div className="flex justify-center gap-2">
                        {request.status === "Pending" && (
                          <>
                            <button
                              onClick={() => onApprove && onApprove(request)}
                              className="cursor-pointer rounded-lg border border-[#000035] dark:border-[#D7D7D7] p-2 text-[#000035] dark:text-[#D7D7D7]"
                              title="Approve"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => onReject && onReject(request)}
                              className="cursor-pointer rounded-lg border border-[#000035] dark:border-[#D7D7D7] p-2 text-[#000035] dark:text-[#D7D7D7]"
                              title="Reject"
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}
                        {request.status !== "Pending" && (
                          <span className="text-sm italic text-[#000035] dark:text-[#D7D7D7]">
                            Processed
                          </span>
                        )}
                      </div>
                    )
                  }])
                ]}
              />
            ) : activeTab === "books" ? (
              <RequestsTable
                isLoading={currentLoading}
                emptyMessage={
                  searchValue
                    ? "No requests match your search."
                    : showRejected
                      ? "No rejected requests."
                      : "No pending requests."
                }
                data={filteredBookRequests}
                keyExtractor={(req, idx) => req.transaction_id || idx}
                columns={[
                  { header: "User Name", accessor: "user_name", render: (request) => getUserName(request.user_id) },
                  { header: "Book Name", accessor: "book_name", render: (request) => getBookName(request.book_id) },
                  { header: "Due Date", accessor: "due_date", render: (request) => formatDateShort(request.due_date) },
                  { header: "Requested At", accessor: "created_at", render: (request) => formatDate(request.created_at) },
                  { header: "Status", accessor: "status", render: (request) => getBookStatusBadge(request) },
                  ...(showRejected ? [] : [{
                    header: "Actions",
                    accessor: "actions",
                    render: (request) => (
                      <div className="flex justify-center gap-2">
                        {request.status === "Pending" && (
                          <>
                            <button
                              onClick={() => onApproveBook && onApproveBook(request)}
                              className="cursor-pointer rounded-lg border border-[#000035] dark:border-[#D7D7D7] p-2 text-[#000035] dark:text-[#D7D7D7]"
                              title="Approve"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => onRejectBook && onRejectBook(request)}
                              className="cursor-pointer rounded-lg border border-[#000035] dark:border-[#D7D7D7] p-2 text-[#000035] dark:text-[#D7D7D7]"
                              title="Reject"
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    )
                  }])
                ]}
              />
            ) : (
              <RequestsTable
                isLoading={currentLoading}
                emptyMessage={
                  searchValue
                    ? "No requests match your search."
                    : showRejected
                      ? "No rejected requests."
                      : "No pending requests."
                }
                data={filteredFeedbackRequests}
                keyExtractor={(req, idx) => req.request_id || req.feedback_id || idx}
                columns={[
                  { header: "User Name", accessor: "name", render: (request) => getUserName(request.user_id) },
                  { header: "ID User", accessor: "id", render: (request) => request.user_id },
                  { header: "Requested At", accessor: "created_at", render: (request) => formatDate(request.created_at) },
                  { header: "Actions", accessor: "actions", render: (request) => (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onApproveFeedback && onApproveFeedback(request)}
                        className="cursor-pointer rounded-lg border border-[#000035] dark:border-[#D7D7D7] p-2 text-[#000035] dark:text-[#D7D7D7]"
                        title="Approve"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => onRejectFeedback && onRejectFeedback(request)}
                        className="cursor-pointer rounded-lg border border-[#000035] dark:border-[#D7D7D7] p-2 text-[#000035] dark:text-[#D7D7D7]"
                        title="Reject"
                      >
                        <X size={16} />
                      </button>
                      <button
                        onClick={() => onViewFeedback && onViewFeedback(request)}
                        className="cursor-pointer rounded-lg border border-[#000035] dark:border-[#D7D7D7] p-2 text-[#000035] dark:text-[#D7D7D7]"
                        title="View Details"
                      >
                        <ReceiptText size={16} />
                      </button>
                    </div>
                  )}
                ]}
              />
            )}
          </div>
        </div>



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
