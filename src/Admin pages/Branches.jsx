import { useState } from 'react';
import {
  useBranches,
  useCreateBranch,
  useUpdateBranch,
  useDeleteBranch
} from '../hooks/useBranches';
import CommonLayout from '../Layouts/CommonLayout';
import BranchFormPopup from '../components/BranchFormPopup';

function Branches({ searchValue }) {
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    contact_number: ''
  });

  const { data: branches = [], isLoading } = useBranches();
  const createBranchMutation = useCreateBranch();
  const updateBranchMutation = useUpdateBranch();
  const deleteBranchMutation = useDeleteBranch();

  const handleAddBranch = async (e) => {
    e.preventDefault();
    try {
      if (editMode && formData.branch_id) {
        await updateBranchMutation.mutateAsync({ id: formData.branch_id, data: formData });
      } else {
        await createBranchMutation.mutateAsync(formData);
      }
      setFormData({ name: '', location: '', contact_number: '' });
      setShowPopup(false);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save branch:", error);
      alert('Failed to save branch. Please try again.');
    }
  };

  const handleEdit = (branch) => {
    setFormData(branch);
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      try {
        await deleteBranchMutation.mutateAsync(id);
      } catch (error) {
        alert('Failed to delete branch. Please try again.');
      }
    }
  };

  const buttonBehaviour = () => {
    setFormData({ name: '', location: '', contact_number: '' });
    setEditMode(false);
    setShowPopup(true);
  };

  const filteredBranches = searchValue
    ? branches.filter(
      (branch) =>
        branch.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        branch.location.toLowerCase().includes(searchValue.toLowerCase())
    )
    : branches;

  const title = "Branch Management";
  const buttonText = "Add Branch";
  const columns = [
    { header: 'ID', accessor: 'branch_id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Location', accessor: 'location' },
    { header: 'Contact Number', accessor: 'contact_number' },
    { header: 'Action', accessor: 'action' },
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
    <CommonLayout
      searchValue={searchValue}
      buttonBehaviour={buttonBehaviour}
      isLoading={isLoading}
      data={filteredBranches}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      title={title}
      buttonText={buttonText}
      columns={columns}
      formPopup={formPopup}
    />
  );
}

export default Branches;
