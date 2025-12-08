import { useState } from 'react';
import {
  useBranches,
  useCreateBranch,
  useUpdateBranch,
  useDeleteBranch
} from '../hooks/useBranches';
import { useBookCopies } from '../hooks/useBookCopies';
import { useBooks } from '../hooks/useBooks';
import CommonLayout from '../Layouts/CommonLayout';
import BranchFormPopup from '../components/BranchFormPopup';
import DeleteConfirmationPopup from '../components/DeleteConfirmationPopup.jsx';
import ViewDetailsPopup from '../components/ViewDetailsPopup.jsx';

function Branches({ searchValue, setSearchValue }) {
  // Search searches: Name, Location
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState(null);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    contact_number: ''
  });

  const { data: branches = [], isLoading } = useBranches();
  const { data: bookCopies = [] } = useBookCopies();
  const { data: books = [] } = useBooks();
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
        alert('Failed to delete branch. Please try again.');
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
    {
      header: 'Book Count',
      accessor: 'book_count',
      render: (branch) => {
        const count = bookCopies.filter(bc => bc.branch_id === branch.branch_id).length;
        return (
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
            {count}
          </span>
        );
      }
    },
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
        title="View Branch"
        data={selectedBranch ? {
          'Branch ID': selectedBranch.branch_id,
          'Name': selectedBranch.name,
          'Location': selectedBranch.location,
          'Contact Number': selectedBranch.contact_number,
          'Book Copies': (() => {
            const branchCopies = bookCopies.filter(bc => bc.branch_id === selectedBranch.branch_id);
            if (branchCopies.length === 0) return 'No books in this branch';
            const bookDetails = branchCopies.map(bc => {
              const book = books.find(b => b.book_id === bc.book_id);
              return `${book?.name || 'Unknown'} (${bc.book_copy_id})`;
            });
            return bookDetails.join(', ');
          })()
        } : null}
        savedBy={{
          name: 'Admin User',
          role: 'Admin'
        }}
      >
      </ViewDetailsPopup>
    </>
  );
}

export default Branches;
