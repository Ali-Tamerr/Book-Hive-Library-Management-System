import { useState } from "react";
import {
  useBranchesManagement,
  useCreateBranch,
  useUpdateBranch,
  useDeleteBranch,
} from "../hooks/useBranches";
import { useUsers } from "../hooks/useUsers";
import CommonLayout from "../Layouts/CommonLayout";
import BranchFormPopup from "../components/BranchFormPopup";
import DeleteConfirmationPopup from "../components/DeleteConfirmationPopup.jsx";
import ViewDetailsPopup from "../components/ViewDetailsPopup.jsx";
import { getCurrentUser } from "../services/auth.api";

function Branches({ searchValue, setSearchValue }) {
  const currentUser = getCurrentUser();
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState(null);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    contact_number: "",
  });

  const { data: branches = [], isLoading } = useBranchesManagement();
  const { data: usersData } = useUsers();
  const users = usersData
    ? usersData.pages.flatMap((page) => page.data || [])
    : [];
  const createBranchMutation = useCreateBranch();
  const updateBranchMutation = useUpdateBranch();
  const deleteBranchMutation = useDeleteBranch();

  const handleAddBranch = async (e) => {
    e.preventDefault();
    try {
      const apiData = {
        name: formData.name,
        location: formData.location,
        contact_number: formData.contact_number || null,
        created_by: currentUser?.user_id || null,
      };
      if (editMode && formData.branch_id) {
        await updateBranchMutation.mutateAsync({
          id: formData.branch_id,
          data: apiData,
        });
      } else {
        await createBranchMutation.mutateAsync(apiData);
      }
      setFormData({ name: "", location: "", contact_number: "" });
      setShowPopup(false);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save branch:", error);
      alert("Failed to save branch. Please try again.");
    }
  };

  const handleEdit = (branch) => {
    setFormData({
      branch_id: branch.branch_id,
      name: branch.name || "",
      location: branch.location || "",
      contact_number: branch.contact_number || "",
    });
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = (id) => {
    setBranchToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (branchToDelete) {
      try {
        await deleteBranchMutation.mutateAsync(branchToDelete);
        setShowDeleteConfirm(false);
        setBranchToDelete(null);
      } catch (error) {
        alert("Failed to delete branch. Please try again.");
        setShowDeleteConfirm(false);
        setBranchToDelete(null);
      }
    }
  };

  const handleView = (branch) => {
    setSelectedBranch(branch);
    setShowViewDetails(true);
  };

  const buttonBehaviour = () => {
    setFormData({ name: "", location: "", contact_number: "" });
    setEditMode(false);
    setShowPopup(true);
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

  const filteredBranches = searchValue
    ? branches.filter(
        (branch) =>
          branch.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          branch.location.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : branches;

  const title = "Branch Management";
  const buttonText = "Add Branch";
  const columns = [
    // { header: 'ID', accessor: 'branch_id' },
    { header: "Name", accessor: "name" },
    { header: "Contact No", accessor: "contact_number" },
    { header: "Location", accessor: "location" },

    {
      header: "Bo Quantity",
      accessor: "book_count",
    },
    { header: "Action", accessor: "action" },
  ];

  const formPopup = (
    <BranchFormPopup
      showPopup={showPopup}
      editMode={editMode}
      formData={formData}
      setFormData={setFormData}
      handleAddBranch={handleAddBranch}
      setShowPopup={setShowPopup}
      setEditMode={setEditMode}
    />
  );

  return (
    <>
      <CommonLayout
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        buttonBehaviour={buttonBehaviour}
        isLoading={isLoading}
        data={filteredBranches}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleView={handleView}
        title={title}
        buttonText={buttonText}
        columns={columns}
        formPopup={formPopup}
      />
      <DeleteConfirmationPopup
        show={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setBranchToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Branch"
      />
      <ViewDetailsPopup
        show={showViewDetails}
        onClose={() => {
          setShowViewDetails(false);
          setSelectedBranch(null);
        }}
        variant="details"
        title="View Branch"
        data={
          selectedBranch
            ? {
                "Branch ID": selectedBranch.branch_id,
                Name: selectedBranch.name,
                Location: selectedBranch.location,
                "Contact Number": selectedBranch.contact_number,
                "Books Count": selectedBranch.book_count,
              }
            : null
        }
        savedBy={
          selectedBranch ? getCreatorName(selectedBranch.created_by) : null
        }
      ></ViewDetailsPopup>
    </>
  );
}

export default Branches;
