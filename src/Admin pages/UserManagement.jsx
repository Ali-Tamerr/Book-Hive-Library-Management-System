import { useState, useEffect } from "react";
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from "../hooks/useUsers.js";
import {
  useUserRequests,
  useApproveUserRequest,
  useRejectUserRequest,
  useDeleteUserRequest,
} from "../hooks/useUserRequests.js";
import {
  useBookTransactions,
  useUpdateBookTransaction,
  useDeleteBookTransaction,
} from "../hooks/useBookTransactions.js";
import {
  useReservations,
  useDeleteReservation,
} from "../hooks/useReservations.js";
import { useBooks } from "../hooks/useBooks.js";
import { useBookCopies } from "../hooks/useBookCopies.js";
import UserFormPopup from "../components/UserFormPopup.jsx";
import DeleteConfirmationPopup from "../components/DeleteConfirmationPopup.jsx";
import ViewDetailsPopup from "../components/ViewDetailsPopup.jsx";
import ViewRequestsPopup from "../components/ViewRequestsPopup.jsx";
import CommonLayout from "../Layouts/CommonLayout.jsx";
import { FilePenLine, Trash2, ReceiptText } from "lucide-react";

import { getCurrentUser } from "../services/auth.api";

function UserManagement({ searchValue, setSearchValue }) {
  const currentUser = getCurrentUser();
  const isSuperAdmin = currentUser?.role === "Super Admin";

  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRequestsPopup, setShowRequestsPopup] = useState(false);
  const [pendingRequestId, setPendingRequestId] = useState(null);
  const [deleteWarning, setDeleteWarning] = useState(null);
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone_number: "",
    plan: "",
    role: "User",
    status: "Active",
    password: "",
    password_hash: "",
  });

  const { data: users = [], isLoading } = useUsers();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const { data: userRequests = [], isLoading: isLoadingRequests } =
    useUserRequests();
  const approveRequestMutation = useApproveUserRequest();
  const rejectRequestMutation = useRejectUserRequest();
  const deleteRequestMutation = useDeleteUserRequest();

  const { data: bookTransactions = [], isLoading: isLoadingBookTransactions } =
    useBookTransactions();
  const updateBookTransactionMutation = useUpdateBookTransaction();
  const deleteBookTransactionMutation = useDeleteBookTransaction();
  const { data: books = [] } = useBooks();
  const { data: bookCopies = [] } = useBookCopies();
  const { data: reservations = [] } = useReservations();
  const deleteReservationMutation = useDeleteReservation();

  const pendingBookRequests = bookTransactions.filter(
    (t) => t.status === "Pending" && t.transaction_type === "Check-Out",
  );

  const pendingReturnRequests = bookTransactions.filter(
    (t) => t.status === "Pending" && t.transaction_type === "Check-In",
  );

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
      if (!formData.phone_number || formData.phone_number.trim() === "") {
        alert("Phone number is required.");
        return;
      }

      const selectedRole =
        isSuperAdmin && formData.role ? formData.role : "User";
      const apiData = {
        user_id: formData.user_id.trim(),
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone_number,
        role: selectedRole,
        plan: formData.plan || null,
        status: formData.status || "Active",
        password_hash: formData.password,
        created_by: currentUser?.user_id || null,
      };

      console.log("Sending user data:", JSON.stringify(apiData, null, 2));

      if (editMode && formData.user_id) {
        const originalUser = users.find((u) => u.user_id === formData.user_id);
        if (
          originalUser &&
          (originalUser.role?.toLowerCase() === "super admin" ||
            originalUser.role?.toLowerCase() === "superadmin")
        ) {
          alert("Super Admin accounts cannot be edited.");
          return;
        }

        // Exclude created_by for updates to avoid FK violation and preserve original creator
        const { created_by, ...updateData } = apiData;

        if (!formData.password || formData.password.trim() === "") {
          updateData.password_hash = formData.password_hash;
        }
        await updateUserMutation.mutateAsync({
          id: formData.user_id,
          data: updateData,
        });
      } else {
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
      }
      setFormData({
        id: "",
        user_id: "",
        name: "",
        email: "",
        phone_number: "",
        plan: "",
        role: "User",
        status: "Active",
        password: "",
        password_hash: "",
      });
      setShowPopup(false);
      setEditMode(false);
      setFormError(null);
    } catch (error) {
      console.error("Failed to save user:", error);
      const errorMsg =
        error.response?.data?.message || error.message || JSON.stringify(error);
      const responseData = JSON.stringify(error.response?.data || {});
      if (
        errorMsg.includes("UQ_Users_PhoneNumber") ||
        responseData.includes("UQ_Users_PhoneNumber") ||
        responseData.includes("duplicate")
      ) {
        setFormError("This phone number is already registered.");
      } else {
        setFormError("Failed to save user. Please try again.");
      }
    }
  };

  const handleEdit = (user) => {
    if (
      user.role?.toLowerCase() === "super admin" ||
      user.role?.toLowerCase() === "superadmin"
    ) {
      alert("Super Admin accounts cannot be edited.");
      return;
    }
    setFormError(null);
    setFormData({
      id: user.user_id,
      user_id: user.user_id,
      name: user.name || "",
      email: user.email || "",
      phone_number: user.phone_number || "",
      plan: user.plan || "",
      role: user.role || "User",
      status: user.status || "Active",
      password: "",
      password_hash: user.password_hash || "",
    });
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = (id) => {
    setUserToDelete(id);

    const linkedTransactions = bookTransactions.filter((t) => t.user_id === id);
    const linkedReservations = reservations.filter((r) => r.user_id === id);

    if (linkedTransactions.length > 0 || linkedReservations.length > 0) {
      const transactionCount = linkedTransactions.length;
      const reservationCount = linkedReservations.length;
      let message = "This user have associated records:";
      if (transactionCount > 0)
        message += ` ${transactionCount} transaction(s)`;
      if (transactionCount > 0 && reservationCount > 0) message += " and";
      if (reservationCount > 0)
        message += ` ${reservationCount} reservation(s)`;
      message += ".";

      setDeleteWarning(
        message + " Deleting the user will permanently remove these records.",
      );
      setIsDeleteDisabled(false);
    } else {
      setDeleteWarning(null);
      setIsDeleteDisabled(false);
    }

    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      const user = users.find((u) => u.user_id === userToDelete);
      if (
        user &&
        (user.role?.toLowerCase() === "super admin" ||
          user.role?.toLowerCase() === "superadmin")
      ) {
        alert("Super Admin accounts cannot be deleted.");
        setShowDeleteConfirm(false);
        setUserToDelete(null);
        return;
      }
      try {
        // Delete associated transactions
        const userTransactions = bookTransactions.filter(
          (t) => t.user_id === userToDelete,
        );
        if (userTransactions.length > 0) {
          await Promise.all(
            userTransactions.map((t) =>
              deleteBookTransactionMutation.mutateAsync(t.transaction_id),
            ),
          );
        }

        // Delete associated reservations
        const userReservations = reservations.filter(
          (r) => r.user_id === userToDelete,
        );
        if (userReservations.length > 0) {
          await Promise.all(
            userReservations.map((r) =>
              deleteReservationMutation.mutateAsync(r.reservation_id),
            ),
          );
        }

        // Delete the user
        await deleteUserMutation.mutateAsync(userToDelete);

        setShowDeleteConfirm(false);
        setUserToDelete(null);
        setDeleteWarning(null);
      } catch (error) {
        console.error("Delete failed:", error);
        alert(
          "Failed to delete user or their associated records. Please try again.",
        );
        setShowDeleteConfirm(false);
        setUserToDelete(null);
        setDeleteWarning(null);
      }
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setShowViewDetails(true);
  };

  const buttonBehaviour = () => {
    setFormError(null);
    setFormData({
      id: "",
      user_id: "",
      name: "",
      email: "",
      phone_number: "",
      plan: "",
      role: "User",
      status: "Active",
      password: "",
      password_hash: "",
    });
    setPendingRequestId(null);
    setEditMode(false);
    setShowPopup(true);
  };

  const visibleUsers = users.filter((user) => {
    const role = user.role?.toLowerCase() || "";
    return role !== "super admin";
  });
  const filteredUsers = searchValue
    ? visibleUsers.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.user_id?.toString().includes(searchValue),
      )
    : visibleUsers;

  const title = "User Management";
  const buttonText = "Add User";
  const columns = [
    { header: "User ID", accessor: "user_id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Plan", accessor: "plan" },
    { header: "Contact No", accessor: "phone_number" },
    { header: "Action", accessor: "action" },
  ];

  const customActionRenderer = (user) => {
    const isSuperAdminAccount = user.role === "Super Admin";
    const isAdminAccount = user.role === "Admin";

    const canDelete = isSuperAdmin
      ? !isSuperAdminAccount
      : !isAdminAccount && !isSuperAdminAccount;

    const getDeleteMessage = () => {
      if (isSuperAdminAccount) {
        return "Super Admin accounts cannot be deleted.";
      }
      if (isAdminAccount && !isSuperAdmin) {
        return "Only Super Admins can delete Admin accounts.";
      }
      return "";
    };

    return (
      <div className="mx-auto flex w-max items-center justify-center">
        <button
          onClick={() => handleEdit(user)}
          className="mr-2 cursor-pointer text-lg transition-transform hover:scale-125"
          title="Edit"
        >
          <FilePenLine size={20} />
        </button>
        <button
          onClick={() => {
            if (!canDelete) {
              alert(getDeleteMessage());
              return;
            }
            handleDelete(user.user_id);
          }}
          className={`mr-2 text-lg transition-transform ${
            !canDelete
              ? "cursor-not-allowed opacity-40"
              : "cursor-pointer hover:scale-125"
          }`}
          title={!canDelete ? getDeleteMessage() : "Delete"}
        >
          <Trash2 size={20} />
        </button>
        <button
          onClick={() => handleView(user)}
          className="cursor-pointer text-lg transition-transform hover:scale-125"
          title="View"
        >
          <ReceiptText size={20} />
        </button>
      </div>
    );
  };

  const getCreatorName = (createdById) => {
    if (!createdById) return { name: "N/A", role: "Not recorded" };
    const creator = users.find((u) => u.user_id === createdById);
    return creator
      ? { name: creator.name, role: creator.role }
      : { name: createdById, role: "Unknown" };
  };

  const availableNumericIds = users
    .filter((u) => /^\d+$/.test(u.user_id))
    .map((u) => parseInt(u.user_id, 10));
  const nextUserId =
    availableNumericIds.length > 0 ? Math.max(...availableNumericIds) + 1 : 1;

  const formPopup = (
    <UserFormPopup
      showPopup={showPopup}
      editMode={editMode}
      formData={formData}
      setFormData={setFormData}
      handleAddUser={handleAddUser}
      setShowPopup={setShowPopup}
      setEditMode={setEditMode}
      isSuperAdmin={isSuperAdmin}
      error={formError}
      nextUserId={nextUserId}
    />
  );

  return (
    <>
      <CommonLayout
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        buttonBehaviour={buttonBehaviour}
        isLoading={isLoading}
        data={filteredUsers}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleView={handleView}
        title={title}
        buttonText={buttonText}
        columns={columns}
        formPopup={formPopup}
        customActionRenderer={customActionRenderer}
        secondaryButton={
          <button
            onClick={() => setShowRequestsPopup(true)}
            className="flex h-full min-w-[150px] cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#0b0b3b] bg-white text-sm font-medium text-[#0b0b3b] transition-colors hover:bg-[#1a1a6a] hover:bg-[#F0F0FF] max-[856px]:text-xs dark:border-[#121317] dark:bg-[#E8E8E8] dark:text-[#121317] dark:hover:bg-[#d4d4d4]"
          >
            View Requests
          </button>
        }
      />
      <DeleteConfirmationPopup
        show={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setUserToDelete(null);
          setDeleteWarning(null);
          setIsDeleteDisabled(false);
        }}
        onConfirm={confirmDelete}
        title="Delete User"
        // warningMessage={deleteWarning}
        isDeleteDisabled={isDeleteDisabled}
      />
      <ViewDetailsPopup
        show={showViewDetails}
        onClose={() => {
          setShowViewDetails(false);
          setSelectedUser(null);
        }}
        title="View User"
        data={
          selectedUser
            ? {
                "User ID": selectedUser.user_id,
                Name: selectedUser.name,
                Email: selectedUser.email,
                "Phone Number": selectedUser.phone_number,
                Plan: selectedUser.plan || "N/A",
              }
            : null
        }
        savedBy={selectedUser ? getCreatorName(selectedUser.created_by) : null}
      ></ViewDetailsPopup>
      <ViewRequestsPopup
        show={showRequestsPopup}
        onClose={() => setShowRequestsPopup(false)}
        requests={userRequests}
        isLoading={isLoadingRequests}
        onApprove={(request) => {
          setFormData({
            id: "",
            user_id: "",
            name: request.name || "",
            email: request.email || "",
            phone_number: request.phone_number || "",
            plan: request.plan || "",
            role: "User",
            status: "Active",
            password: request.password || "",
            password_hash: "",
          });
          setPendingRequestId(request.request_id);
          setShowRequestsPopup(false);
          setEditMode(false);
          setShowPopup(true);
        }}
        onReject={async (request) => {
          try {
            await rejectRequestMutation.mutateAsync({
              id: request.request_id,
              data: {
                name: request.name,
                email: request.email,
                password: request.password,
                phone_number: request.phone_number,
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
          try {
            await updateBookTransactionMutation.mutateAsync({
              id: request.transaction_id,
              data: {
                ...request,
                status: "Completed",
              },
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
        returnRequests={pendingReturnRequests}
        isLoadingReturns={isLoadingBookTransactions}
        onApproveReturn={async (request) => {
          try {
            const originalBorrow = bookTransactions.find(
              (t) =>
                t.book_id === request.book_id &&
                t.user_id === request.user_id &&
                t.transaction_type === "Check-Out" &&
                t.status === "Completed" &&
                !t.return_date,
            );

            if (originalBorrow) {
              await updateBookTransactionMutation.mutateAsync({
                id: originalBorrow.transaction_id,
                data: {
                  ...originalBorrow,
                  return_date: new Date().toISOString(),
                  status: "Completed",
                },
              });
            }

            await updateBookTransactionMutation.mutateAsync({
              id: request.transaction_id,
              data: {
                ...request,
                status: "Completed",
              },
            });
          } catch (error) {
            console.error("Failed to approve return request:", error);
            alert("Failed to approve return request. Please try again.");
          }
        }}
        onRejectReturn={async (request) => {
          try {
            await deleteBookTransactionMutation.mutateAsync(
              request.transaction_id,
            );
          } catch (error) {
            console.error("Failed to reject return request:", error);
            alert("Failed to reject return request. Please try again.");
          }
        }}
      />
    </>
  );
}

export default UserManagement;
