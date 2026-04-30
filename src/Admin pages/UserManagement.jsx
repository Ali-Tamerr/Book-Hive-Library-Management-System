import { useState, useEffect } from "react";
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from "../hooks/useUsers.js";
import { useBranches } from "../hooks/useBranches.js";
import {
  useBookTransactions,
  useDeleteBookTransaction,
} from "../hooks/useBookTransactions.js";
import {
  useReservations,
  useDeleteReservation,
} from "../hooks/useReservations.js";
import { usePlans } from "../hooks/usePlans.js";

import UserFormPopup from "../components/UserFormPopup.jsx";
import DeleteConfirmationPopup from "../components/DeleteConfirmationPopup.jsx";
import ViewDetailsPopup from "../components/ViewDetailsPopup.jsx";
import RenewConfirmationPopup from "../components/RenewConfirmationPopup.jsx";
import CommonLayout from "../Layouts/CommonLayout.jsx";
import { FilePenLine, Trash2, ReceiptText, RotateCcw } from "lucide-react";

import { getCurrentUser } from "../services/auth.api";
import { getImageUrl } from "../services/api.config";

function UserManagement({ searchValue, setSearchValue }) {
  const currentUser = getCurrentUser();
  const isSuperAdmin = currentUser?.role === "Super Admin";

  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRenewPopup, setShowRenewPopup] = useState(false);
  const [selectedRenewUser, setSelectedRenewUser] = useState(null);
  const [deleteWarning, setDeleteWarning] = useState(null);
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    plan: "",
    role: "User",
    status: "Active",
    password: "",
    password_hash: "",
    branch_id: "",
  });

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUsers();
  const { data: branches = [] } = useBranches();
  const { data: plans = [] } = usePlans();

  const users = data ? data.pages.flatMap((page) => page.data || []) : [];

  // Infinite Scroll Handler
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;

    // Trigger update when scrolled to bottom (within 3.125rem)
    if (
      scrollHeight - scrollTop - clientHeight < 50 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const { data: bookTransactions = [] } = useBookTransactions();
  const deleteBookTransactionMutation = useDeleteBookTransaction();
  const { data: reservations = [] } = useReservations();
  const deleteReservationMutation = useDeleteReservation();

  if (isError) {
    return (
      <div className="p-10 text-center text-red-500">
        <h2 className="text-xl font-bold">Error Loading Users</h2>
        <p>{error?.message || "Unknown error occurred"}</p>
        <p className="mt-2 text-sm text-[#000035]">
          Check if the backend is running and the API endpoint "/api/Users" is
          accessible.
        </p>
      </div>
    );
  }

  // Backup: Window Scroll Listener (in case layout allows body scroll)
  useEffect(() => {
    const handleWindowScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    };

    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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

      const selectedRole =
        isSuperAdmin && formData.role ? formData.role : "User";
      const apiData = {
        user_id: formData.user_id.trim(),
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        role: selectedRole,
        plan: formData.plan || null,
        status: formData.status || "Active",
        password_hash: formData.password,
        created_by: currentUser?.user_id || null,
        branch_id: formData.branch_id ? parseInt(formData.branch_id, 10) : null,
      };

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
        branch_id: "",
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
        errorMsg.includes("duplicate") ||
        responseData.includes("duplicate")
      ) {
        setFormError("This email is already registered.");
      } else {
        setFormError("Failed to save user. Please try again.");
      }
    }
  };

  const handleEdit = (user) => {
    const isTargetSuperAdmin =
      user.role?.toLowerCase() === "super admin" ||
      user.role?.toLowerCase() === "superadmin";
    const isTargetAdmin = user.role === "Admin";

    if (isTargetSuperAdmin) {
      alert("Super Admin accounts cannot be edited.");
      return;
    }

    if (!isSuperAdmin && isTargetAdmin) {
      alert("Only Super Admins can edit Admin accounts.");
      return;
    }

    setFormError(null);
    setFormData({
      id: user.user_id,
      user_id: user.user_id,
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      plan: user.plan || "",
      role: user.role || "User",
      status: user.status || "Active",
      password: "",
      password_hash: user.password_hash || "",
      branch_id: user.branch_id || "",
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

  const handleRenew = (user) => {
    setSelectedRenewUser(user);
    setShowRenewPopup(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleConfirmRenew = async (selectedPlan) => {
    if (!selectedRenewUser) return;

    // Calculate new expiration date: 1 month from the moment of confirmation
    const now = new Date();
    const newEndDate = new Date(now);
    newEndDate.setMonth(newEndDate.getMonth() + 1);

    try {
      // Clean the payload to send only necessary fields to the backend
      // We explicitly exclude UI-only fields like 'name', 'formatted_exp_date', etc.
      const apiData = {
        user_id: selectedRenewUser.user_id,
        first_name: selectedRenewUser.first_name,
        last_name: selectedRenewUser.last_name,
        email: selectedRenewUser.email,
        role: selectedRenewUser.role,
        plan: selectedPlan || selectedRenewUser.plan || null,
        status: selectedRenewUser.status,
        password_hash: selectedRenewUser.password_hash,
        branch_id: selectedRenewUser.branch_id ? parseInt(selectedRenewUser.branch_id, 10) : null,
        image_url: selectedRenewUser.image_url || null,
        subscription_end_date: newEndDate.toISOString(),
      };

      await updateUserMutation.mutateAsync({
        id: selectedRenewUser.user_id,
        data: apiData,
      });
      setShowRenewPopup(false);
      setSelectedRenewUser(null);
    } catch (error) {
      console.error("Failed to renew user:", error);
      alert("Failed to renew user plan. Please try again.");
    }
  };

  const buttonBehaviour = () => {
    setFormError(null);
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
      branch_id: "",
    });
    setEditMode(false);
    setShowPopup(true);
  };

  const normalizeText = (value) =>
    String(value || "")
      .trim()
      .toLowerCase();

  const getUserBranchId = (user) => {
    if (!user) return null;

    const directBranchId = user.branch_id ?? user.branchId;
    if (
      directBranchId !== undefined &&
      directBranchId !== null &&
      directBranchId !== ""
    ) {
      return String(directBranchId).trim();
    }

    const nestedBranchId = user.branch?.branch_id ?? user.branch?.id;
    if (
      nestedBranchId !== undefined &&
      nestedBranchId !== null &&
      nestedBranchId !== ""
    ) {
      return String(nestedBranchId).trim();
    }

    return null;
  };

  const getUserBranchName = (user) => {
    if (!user) return "N/A";

    const directBranchName = user.branch_name ?? user.branchName;
    if (directBranchName) return directBranchName;

    if (typeof user.branch === "string" && user.branch.trim()) {
      return user.branch.trim();
    }

    const branchId = getUserBranchId(user);
    if (!branchId) return "N/A";

    const matchedBranch = branches.find(
      (branch) => String(branch.branch_id).trim() === String(branchId).trim(),
    );

    return matchedBranch?.name || `Branch ${branchId}`;
  };

  const currentRole = normalizeText(currentUser?.role);
  const isBranchScopedRole =
    currentRole === "admin" || currentRole === "librarian";
  const currentUserBranchId = getUserBranchId(currentUser);
  const currentUserBranchName = normalizeText(getUserBranchName(currentUser));

  const isSameBranch = (user) => {
    // If the current user has no branch assigned, we assume they can view all users?
    // Or we should handle this policy. For now, returning true to avoid empty list if branch is missing.
    if (
      !currentUserBranchId &&
      (!currentUserBranchName || currentUserBranchName === "n/a")
    ) {
      return true;
    }

    const userBranchId = getUserBranchId(user);
    if (currentUserBranchId && userBranchId) {
      return String(userBranchId).trim() === String(currentUserBranchId).trim();
    }

    if (currentUserBranchName && currentUserBranchName !== "n/a") {
      return normalizeText(getUserBranchName(user)) === currentUserBranchName;
    }

    return false;
  };

  const visibleUsers = users.filter((user) => {
    const role = user.role?.toLowerCase() || "";
    if (role === "super admin") return false;

    if (!isSuperAdmin && (role === "admin" || role === "librarian")) {
      return false;
    }

    if (isBranchScopedRole) {
      return isSameBranch(user);
    }

    return true;
  });

  const filteredUsers = (
    searchValue
      ? visibleUsers.filter(
          (user) =>
            `${user.first_name || ""} ${user.last_name || ""}`
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            user.user_id?.toString().includes(searchValue) ||
            getUserBranchName(user)
              .toLowerCase()
              .includes(searchValue.toLowerCase()),
        )
      : visibleUsers
  ).map((user) => ({
    ...user,
    name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
    formatted_exp_date: formatDate(user.subscription_end_date),
    branch_display: getUserBranchName(user),
    plan_display: plans.find((p) => p.id === user.plan)?.title || user.plan || "-",
  }));

  const title = "User Management";
  const buttonText = isSuperAdmin ? "Add User" : null;
  const columns = [
    { header: "User ID", accessor: "user_id" },
    { header: "Name", accessor: "name" },

    { header: "Email", accessor: "email" },
    ...(isSuperAdmin ? [{ header: "Branch", accessor: "branch_display" }] : []),
    { header: "Plan", accessor: "plan_display" },
    { header: "Exp Date", accessor: "formatted_exp_date" },
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

    const canEdit = isSuperAdmin
      ? !isSuperAdminAccount
      : !isAdminAccount && !isSuperAdminAccount;

    const getEditMessage = () => {
      if (isSuperAdminAccount) {
        return "Super Admin accounts cannot be edited.";
      }
      if (isAdminAccount && !isSuperAdmin) {
        return "Only Super Admins can edit Admin accounts.";
      }
      return "";
    };

    return (
      <div className="mx-auto flex w-max items-center justify-center">
        <button
          onClick={() => {
            if (!canEdit) {
              alert(getEditMessage());
              return;
            }
            handleEdit(user);
          }}
          className={`mr-2 text-lg transition-transform ${
            !canEdit
              ? "cursor-not-allowed opacity-40"
              : "cursor-pointer hover:scale-125"
          }`}
          title={!canEdit ? getEditMessage() : "Edit"}
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
        <button
          onClick={() => handleRenew(user)}
          className="ml-2 cursor-pointer text-lg transition-transform hover:scale-125"
          title="Renew"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    );
  };

  const getCreatorName = (createdById) => {
    if (!createdById) return { name: "N/A", role: "Not recorded" };
    const creator = users.find((u) => u.user_id === createdById);
    return creator
      ? {
          name: `${creator.first_name || ""} ${creator.last_name || ""}`.trim(),
          role: creator.role,
        }
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
      branches={branches}
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
        onScroll={handleScroll}
        onLoadMore={fetchNextPage}
        hasMore={hasNextPage}
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
        imageUrl={selectedUser ? getImageUrl(selectedUser.image_url) : null}
        variant="user"
        maxWidthClassOverride="max-w-[68.75rem]"
        data={
          selectedUser
            ? {
                Name: `${selectedUser.first_name || ""} ${selectedUser.last_name || ""}`.trim(),
                "ID User": selectedUser.user_id || "N/A",
                Email: selectedUser.email || "N/A",
                Plan:
                  plans.find((p) => p.id === selectedUser.plan)?.title ||
                  selectedUser.plan ||
                  "N/A",
                Branch: getUserBranchName(selectedUser),
              }
            : null
        }
        savedBy={selectedUser ? getCreatorName(selectedUser.created_by) : null}
      ></ViewDetailsPopup>
      <RenewConfirmationPopup
        show={showRenewPopup}
        onClose={() => {
          setShowRenewPopup(false);
          setSelectedRenewUser(null);
        }}
        user={selectedRenewUser}
        onConfirm={handleConfirmRenew}
      />
    </>
  );
}

export default UserManagement;
