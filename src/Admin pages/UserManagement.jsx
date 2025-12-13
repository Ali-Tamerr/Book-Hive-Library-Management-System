import { useState, useEffect } from 'react';
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser
} from '../hooks/useUsers.js';
import {
  useUserRequests,
  useApproveUserRequest,
  useRejectUserRequest
} from '../hooks/useUserRequests.js';
import UserFormPopup from '../components/UserFormPopup.jsx';
import DeleteConfirmationPopup from '../components/DeleteConfirmationPopup.jsx';
import ViewDetailsPopup from '../components/ViewDetailsPopup.jsx';
import ViewRequestsPopup from '../components/ViewRequestsPopup.jsx';
import CommonLayout from '../Layouts/CommonLayout.jsx';

import { getCurrentUser } from '../services/auth.api';

function UserManagement({ searchValue, setSearchValue }) {
  const currentUser = getCurrentUser();
  const isSuperAdmin = currentUser?.role === 'Super Admin';

  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRequestsPopup, setShowRequestsPopup] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone_number: '',
    plan: '',
    status: 'Active',
    password: '',
    password_hash: ''
  });

  const { data: users = [], isLoading } = useUsers();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const { data: userRequests = [], isLoading: isLoadingRequests } = useUserRequests();
  const approveRequestMutation = useApproveUserRequest();
  const rejectRequestMutation = useRejectUserRequest();

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const apiData = {
        user_id: formData.user_id,
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone_number,
        role: 'User',
        plan: formData.plan || null,
        status: formData.status,
        password_hash: formData.password
      };

      if (editMode && formData.user_id) {
        if (!formData.password || formData.password.trim() === '') {
          apiData.password_hash = formData.password_hash;
        }
        await updateUserMutation.mutateAsync({ id: formData.user_id, data: apiData });
      } else {
        await createUserMutation.mutateAsync(apiData);
      }
      setFormData({ id: '', user_id: '', name: '', email: '', phone_number: '', plan: '', status: 'Active', password: '', password_hash: '' });
      setShowPopup(false);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save user:", error);
      alert('Failed to save user. Please try again.');
    }
  };

  const handleEdit = (user) => {
    setFormData({
      id: user.user_id,
      user_id: user.user_id,
      name: user.name || '',
      email: user.email || '',
      phone_number: user.phone_number || '',
      plan: user.plan || '',
      status: user.status || 'Active',
      password: '',
      password_hash: user.password_hash || ''
    });
    setEditMode(true);
    setShowPopup(true);
  };

  const handleDelete = (id) => {
    setUserToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        await deleteUserMutation.mutateAsync(userToDelete);
        setShowDeleteConfirm(false);
        setUserToDelete(null);
      } catch (error) {
        alert('Failed to delete user. Please try again.');
        setShowDeleteConfirm(false);
        setUserToDelete(null);
      }
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setShowViewDetails(true);
  };

  const buttonBehaviour = () => {
    setFormData({ id: '', user_id: '', name: '', email: '', phone_number: '', plan: '', status: 'Active', password: '', password_hash: '' });
    setEditMode(false);
    setShowPopup(true);
  };

  const filteredUsers = searchValue
    ? users.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.user_id?.toString().includes(searchValue)
    )
    : users;

  const title = "User Management";
  const buttonText = "Add User";
  const columns = [
    { header: 'User ID', accessor: 'user_id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Plan', accessor: 'plan' },
    { header: 'Contact No', accessor: 'phone_number' },
    { header: 'Action', accessor: 'action' },
  ];

  const formPopup = (
    <UserFormPopup
      showPopup={showPopup}
      editMode={editMode}
      formData={formData}
      setFormData={setFormData}
      handleAddUser={handleAddUser}
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
        data={filteredUsers}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleView={handleView}
        title={title}
        buttonText={buttonText}
        columns={columns}
        formPopup={formPopup}
        secondaryButton={
          <button
            onClick={() => setShowRequestsPopup(true)}
            className="bg-white border border-[#0b0b3b] cursor-pointer h-full max-[856px]:text-xs text-[#0b0b3b] px-8 rounded-xl hover:bg-[#F0F0FF] transition-colors text-sm font-medium flex items-center gap-2"
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
        }}
        onConfirm={confirmDelete}
        title="Delete User"
      />
      <ViewDetailsPopup
        show={showViewDetails}
        onClose={() => {
          setShowViewDetails(false);
          setSelectedUser(null);
        }}
        title="View User"
        data={selectedUser ? {
          'User ID': selectedUser.user_id,
          'Name': selectedUser.name,
          'Email': selectedUser.email,
          'Phone Number': selectedUser.phone_number,
          'Plan': selectedUser.plan || 'N/A',
        } : null}
        savedBy={{
          name: 'Admin User',
          role: 'Admin'
        }}
      >
      </ViewDetailsPopup>
      <ViewRequestsPopup
        show={showRequestsPopup}
        onClose={() => setShowRequestsPopup(false)}
        requests={userRequests}
        isLoading={isLoadingRequests}
        onApprove={async (request) => {
          try {
            await approveRequestMutation.mutateAsync(request.request_id);
          } catch (error) {
            console.error('Failed to approve request:', error);
            alert('Failed to approve request. Please try again.');
          }
        }}
        onReject={async (request) => {
          try {
            await rejectRequestMutation.mutateAsync(request.request_id);
          } catch (error) {
            console.error('Failed to reject request:', error);
            alert('Failed to reject request. Please try again.');
          }
        }}
      />
    </>
  );
}

export default UserManagement;
