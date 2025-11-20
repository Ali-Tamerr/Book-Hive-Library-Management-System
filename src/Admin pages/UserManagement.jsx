import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser
} from '../hooks/useUsers';
import { getUserById } from '../services/users.api';
import CommonLayout from '../Layouts/CommonLayout';
import UserFormPopup from '../components/UserFormPopup';

function UserManagement({ searchValue }) {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    id: Math.floor(10000000 + Math.random() * 90000000),
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    role: 'User',
    password: '',
    booksBought: [],
    booksReserved: []
  });

  const { data: users = [], isLoading } = useUsers();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      if (editMode && formData.id) {
        const dataToUpdate = { ...editingUser, ...formData };
        if (formData.password) {
          dataToUpdate.password_hash = formData.password;
        }
        delete dataToUpdate.password;
        await updateUserMutation.mutateAsync({ id: formData.id, data: dataToUpdate });
      } else {
        const { password, ...userData } = formData;
        if (!password) {
          alert("Password is required for new users.");
          return;
        }
        await createUserMutation.mutateAsync({ ...userData, password_hash: password });
      }
      setFormData({ first_name: '', last_name: '', email: '', phone_number: '', role: 'User', password: '', booksBought: [], booksReserved: [] });
      setShowPopup(false);
      setEditMode(false);
      setEditingUser(null);
    } catch (error) {
      console.error("Failed to save user:", error);
      alert('Failed to save user. Please try again.');
    }
  };

  const handleEdit = async (user) => {
    try {
      const fullUserData = await getUserById(user.id);
      setEditingUser(fullUserData);
      setFormData({
        ...fullUserData,
        password: '',
      });
      setEditMode(true);
      setShowPopup(true);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      alert("Failed to fetch user details. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUserMutation.mutateAsync(id);
      } catch (error) {
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  const buttonBehaviour = () => {
    setFormData({ first_name: '', last_name: '', email: '', phone_number: '', role: 'User', password: '', booksBought: [], booksReserved: [] });
    setEditMode(false);
    setShowPopup(true);
  }

  const filteredUsers = searchValue
    ? users.filter(
      (user) =>
        `${user.first_name || ""} ${user.last_name || ""}`
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.id?.toString().includes(searchValue)
    )
    : users;

  const title = "User Management";
  const buttonText = "Add User";
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'first_name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone_number' },
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
    <CommonLayout
      searchValue={searchValue}
      buttonBehaviour={buttonBehaviour}
      isLoading={isLoading}
      data={filteredUsers.map(u => ({...u, name: `${u.first_name} ${u.last_name}`}))}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      title={title}
      buttonText={buttonText}
      columns={columns}
      formPopup={formPopup}
    />
  );
}

export default UserManagement;

