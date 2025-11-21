
import { getAllUsers, getUserByName, createUser } from './users.api';
import { API_BASE_URL } from './api.config';


export const login = async (username, password) => {
  try {
    const users = await getAllUsers();

    const user = users.find(u =>
      u.email === username ||
      u.first_name?.toLowerCase() === username?.toLowerCase() ||
      u.last_name?.toLowerCase() === username?.toLowerCase()
    );

    if (!user) {
      throw new Error('User not found');
    }
    localStorage.setItem('authToken', JSON.stringify(user));
    localStorage.setItem('currentUser', JSON.stringify(user));

    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const signup = async (userData) => {
  try {
    // Check if email already exists
    const users = await getAllUsers();
    const existingUser = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());

    if (existingUser) {
      throw new Error('This email is already linked to another account.');
    }

    const user = await createUser({
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      phone_number: userData.contact,
      password_hash: userData.password,
      role: 'User'
    });

    localStorage.setItem('authToken', JSON.stringify(user));
    localStorage.setItem('currentUser', JSON.stringify(user));

    return user;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};