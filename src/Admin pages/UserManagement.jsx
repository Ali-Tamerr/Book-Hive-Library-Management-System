import { useState, useEffect } from 'react';
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser
} from '../hooks/useUsers.js';
import UserFormPopup from '../components/UserFormPopup.jsx';
import DeleteConfirmationPopup from '../components/DeleteConfirmationPopup.jsx';
import ViewDetailsPopup from '../components/ViewDetailsPopup.jsx';
import CommonLayout from '../Layouts/CommonLayout.jsx';

function UserManagement({ searchValue }) {
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone_number: '',
    role: 'User',
    status: 'Active',
    password: ''
  });

  const { data: users = [], isLoading } = useUsers();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const apiData = {
        user_id: formData.user_id,
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone_number,
        role: formData.role,
        status: formData.status,
        password_hash: formData.password
      };

      if (editMode && formData.id) {
        if (!formData.password) {
          delete apiData.password_hash;
        }
        await updateUserMutation.mutateAsync({ id: formData.id, data: apiData });
      } else {
        await createUserMutation.mutateAsync(apiData);
      }
      setFormData({ id: '', name: '', email: '', phone_number: '', role: 'User', status: 'Active', password: '' });
      setShowPopup(false);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save user:", error);
      alert('Failed to save user. Please try again.');
    }
  };

  const handleEdit = (user) => {
    setFormData({
      user_id: user.user_id,
      name: user.name || '',
      email: user.email || '',
      phone_number: user.phone_number || '',
      role: user.role || 'User',
      status: user.status || 'Active',
      password: ''
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
    setFormData({ user_id: '', name: '', email: '', phone_number: '', role: 'User', status: 'Active', password: '' });
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
    { header: 'Contact No', accessor: 'phone_number' },
    { header: 'Role', accessor: 'role' },
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
          'Role': selectedUser.role,
          'Status': selectedUser.status
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

export default UserManagement;
