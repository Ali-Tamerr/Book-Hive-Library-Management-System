import React, { useState } from "react";
import { Bell } from "lucide-react";
import { useUsers, useCreateUser, useUpdateUser } from "../hooks/useUsers.js";
import {
  useUserRequests,
  useRejectUserRequest,
  useDeleteUserRequest,
} from "../hooks/useUserRequests.js";
import {
  useBookTransactions,
  useUpdateBookTransaction,
  useDeleteBookTransaction,
} from "../hooks/useBookTransactions.js";
import { useBooks } from "../hooks/useBooks.js";
import { useBookCopies, useUpdateBookCopy } from "../hooks/useBookCopies.js";
import UserFormPopup from "./UserFormPopup.jsx";
import ViewRequestsPopup from "./ViewRequestsPopup.jsx";
import { getCurrentUser } from "../services/auth.api";
import FeedbackDetailsPopup from "./FeedbackDetailsPopup.jsx";
import {
  useFeedbacks,
  useUpdateFeedbackStatus,
} from "../hooks/useFeedbacks.js";

const AdminNotifications = () => {
  const currentUser = getCurrentUser();
  const isSuperAdmin = currentUser?.role === "Super Admin";

  const [showRequestsPopup, setShowRequestsPopup] = useState(false);
  const [showUserFormPopup, setShowUserFormPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [pendingRequestId, setPendingRequestId] = useState(null);
  const [formError, setFormError] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    user_id: "",
    first_name: "",
    last_name: "",
    email: "",
    plan: "",
    role: "User",
    status: "Active",
    password: "",
    password_hash: "",
  });

  const { data } = useUsers();
  const users = data ? data.pages.flatMap((page) => page.data || []) : [];
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser(); // Needed if we decide to support edit, or for userForm logic
  const deleteRequestMutation = useDeleteUserRequest();
  const rejectRequestMutation = useRejectUserRequest();
  const { data: userRequests = [], isLoading: isLoadingRequests } =
    useUserRequests();

  const { data: bookTransactions = [], isLoading: isLoadingBookTransactions } =
    useBookTransactions();
  const updateBookTransactionMutation = useUpdateBookTransaction();
  const deleteBookTransactionMutation = useDeleteBookTransaction();
  const { data: books = [] } = useBooks();
  const updateBookCopyMutation = useUpdateBookCopy();
  const { data: bookCopies = [] } = useBookCopies();

  /* eslint-disable no-unused-vars */
  const EXPIRATION_DAYS = 7;

  const { data: feedbackData = [], isLoading: isLoadingFeedback } =
    useFeedbacks();
  const updateFeedbackMutation = useUpdateFeedbackStatus();

  // feedbackData might be exactly an array depending on how getAllFeedbacks formats it
  // Ensure it's an array for safe mapping:
  const feedbacksFromApi = Array.isArray(feedbackData)
    ? feedbackData
    : feedbackData.data || [];

  const isExpired = (createdAt) => {
    if (!createdAt) return false;
    const createdDate = new Date(createdAt);
    const expirationDate = new Date(
      createdDate.getTime() + EXPIRATION_DAYS * 24 * 60 * 60 * 1000,
    );
    return new Date() > expirationDate;
  };

  const pendingBookRequests = bookTransactions.filter(
    (t) => t.status === "Pending" && t.transaction_type === "Check-Out",
  );

  const pendingReturnRequests = bookTransactions.filter(
    (t) => t.status === "Pending" && t.transaction_type === "Check-In",
  );

  const pendingUserRequests = userRequests.filter(
    (req) => req.status === "Pending" && !isExpired(req.created_at),
  );

  const pendingFeedbackRequests = feedbacksFromApi.filter(
    (req) => req.status === "Pending",
  );

  const availableNumericIds = users
    .filter((u) => /^\d+$/.test(u.user_id))
    .map((u) => parseInt(u.user_id, 10));
  const nextUserId =
    availableNumericIds.length > 0 ? Math.max(...availableNumericIds) + 1 : 1;

  const [showFeedbackDetails, setShowFeedbackDetails] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const handleApproveFeedback = async (request) => {
    const feedbackId = request?.request_id ?? request?.feedback_id;
    if (!feedbackId) return;

    try {
      await updateFeedbackMutation.mutateAsync({
        ...request,
        id: feedbackId,
        status: "Approved",
      });
    } catch (error) {
      console.error("Failed to approve feedback:", error);
    }
  };

  const handleRejectFeedback = async (request) => {
    const feedbackId = request?.request_id ?? request?.feedback_id;
    if (!feedbackId) return;

    try {
      await updateFeedbackMutation.mutateAsync({
        ...request,
        id: feedbackId,
        status: "Rejected",
      });
    } catch (error) {
      console.error("Failed to reject feedback:", error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      if (!editMode && (!formData.user_id || formData.user_id.trim() === "")) {
        alert("User ID is required.");
        return;
      }
      if (
        !editMode &&
        (!formData.password || formData.password.trim() === "")
      ) {
        alert("Password is required for new users.");
        return;
      }
      if (!formData.first_name?.trim() || !formData.last_name?.trim()) {
        alert("First name and last name are required.");
        return;
      }

      const selectedRole =
        isSuperAdmin && formData.role ? formData.role : "User";
      const apiData = {
        user_id: formData.user_id.trim(),
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email?.trim() || null,
        role: selectedRole,
        plan: formData.plan || null,
        status: formData.status || "Active",
        password_hash: formData.password,
        created_by: currentUser?.user_id || null,
      };

      console.log("Sending user data:", JSON.stringify(apiData, null, 2));

      await createUserMutation.mutateAsync(apiData);

      if (pendingRequestId) {
        try {
          await deleteRequestMutation.mutateAsync(pendingRequestId);
          console.log("Request deleted successfully:", pendingRequestId);
        } catch (deleteError) {
          console.error("Failed to delete request:", deleteError);
        }
        setPendingRequestId(null);
      }

      setFormData({
        id: "",
        user_id: "",
        first_name: "",
        last_name: "",
        email: "",
        plan: "",
        role: "User",
        status: "Active",
        password: "",
        password_hash: "",
      });
      setShowUserFormPopup(false);
      setEditMode(false);
      setFormError(null);
    } catch (error) {
      console.error("Failed to save user:", error);
      const errorMsg =
        error.response?.data?.message || error.message || JSON.stringify(error);
      const responseData = JSON.stringify(error.response?.data || {});
      if (
        errorMsg.includes("duplicate") ||
        responseData.includes("duplicate")
      ) {
        setFormError("This email is already registered.");
      } else {
        setFormError("Failed to save user. Please try again.");
      }
    }
  };

  return (
    <>
      <button
        className="relative h-8 w-8 cursor-pointer transition-colors hover:text-[#1e255e] max-[1080px]:hidden dark:hover:text-[#9CA3AF]"
        title="Notifications"
        onClick={() => setShowRequestsPopup(true)}
      >
        <Bell className="h-full w-full" />
        {(pendingUserRequests.length > 0 ||
          pendingBookRequests.length > 0 ||
          pendingFeedbackRequests.length > 0) && (
          <span className="absolute right-0 top-0 block h-2.5 w-2.5 -translate-y-1/4 translate-x-1/4 transform rounded-full bg-red-500 ring-2 ring-white"></span>
        )}
      </button>

      <ViewRequestsPopup
        show={showRequestsPopup}
        onClose={() => setShowRequestsPopup(false)}
        currentUser={currentUser}
        requests={userRequests}
        isLoading={isLoadingRequests}
        onApprove={(request) => {
          const fallbackFullName = String(request.name || "").trim();
          const [fallbackFirstName = "", ...fallbackRest] = fallbackFullName
            ? fallbackFullName.split(/\s+/)
            : [""];

          setFormData({
            id: "",
            user_id: "",
            first_name: request.first_name || fallbackFirstName,
            last_name: request.last_name || fallbackRest.join(" "),
            email: request.email || "",
            plan: request.plan || "",
            role: "User",
            status: "Active",
            password: request.password || "",
            password_hash: "",
          });
          setPendingRequestId(request.request_id);
          setShowRequestsPopup(false);
          setEditMode(false);
          setShowUserFormPopup(true);
        }}
        onReject={async (request) => {
          try {
            const fallbackFullName = String(request.name || "").trim();
            const [fallbackFirstName = "", ...fallbackRest] = fallbackFullName
              ? fallbackFullName.split(/\s+/)
              : [""];

            await rejectRequestMutation.mutateAsync({
              id: request.request_id,
              data: {
                first_name: request.first_name || fallbackFirstName,
                last_name: request.last_name || fallbackRest.join(" "),
                email: request.email,
                password: request.password,
                plan: request.plan,
                status: "Rejected",
              },
            });
          } catch (error) {
            console.error("Failed to reject request:", error);
            alert("Failed to reject request. Please try again.");
          }
        }}
        bookRequests={pendingBookRequests}
        isLoadingBooks={isLoadingBookTransactions}
        users={users}
        books={books}
        bookCopies={bookCopies}
        onApproveBook={async (request) => {
          console.log("Admin approving borrow request:", request);
          try {
            const bookCopy = bookCopies.find(
              (bc) => bc.book_copy_id === request.book_id,
            );

            if (bookCopy) {
              await updateBookCopyMutation.mutateAsync({
                id: bookCopy.book_copy_id,
                data: { ...bookCopy, status: "Borrowed" },
              });
            }

            const updatedRequest = { ...request, status: "Completed" };
            await updateBookTransactionMutation.mutateAsync({
              id: request.transaction_id,
              data: updatedRequest,
            });
          } catch (error) {
            console.error("Failed to approve book request:", error);
            alert("Failed to approve book request. Please try again.");
          }
        }}
        onRejectBook={async (request) => {
          try {
            await deleteBookTransactionMutation.mutateAsync(
              request.transaction_id,
            );
          } catch (error) {
            console.error("Failed to reject book request:", error);
            alert("Failed to reject book request. Please try again.");
          }
        }}
        returnRequests={[]}
        isLoadingReturns={false}
        onApproveReturn={() => {}}
        onRejectReturn={() => {}}
        feedbackRequests={feedbacksFromApi}
        isLoadingFeedback={isLoadingFeedback}
        onApproveFeedback={handleApproveFeedback}
        onRejectFeedback={handleRejectFeedback}
        onViewFeedback={(request) => {
          setSelectedFeedback(request);
          setShowFeedbackDetails(true);
        }}
      />

      <UserFormPopup
        showPopup={showUserFormPopup}
        editMode={editMode}
        formData={formData}
        setFormData={setFormData}
        handleAddUser={handleAddUser}
        setShowPopup={setShowUserFormPopup}
        setEditMode={setEditMode}
        isSuperAdmin={isSuperAdmin}
        error={formError}
        nextUserId={nextUserId}
      />

      <FeedbackDetailsPopup
        show={showFeedbackDetails}
        onClose={() => setShowFeedbackDetails(false)}
        feedback={selectedFeedback}
        user={users.find((u) => u.user_id === selectedFeedback?.user_id)}
      />
    </>
  );
};

export default AdminNotifications;
