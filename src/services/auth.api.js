// Authentication API Service
// Since the API doesn't have explicit auth endpoints, we'll use the Users API for login/signup

import { getAllUsers, getUserByName, createUser } from './users.api';
import { API_BASE_URL } from './api.config';

// Login - searches for user by email/username and validates
export const login = async (username, password) => {
  try {
    // Try to find user by name first
    const users = await getAllUsers();
    
    // Search for user by email or username
    const user = users.find(u => 
      u.email === username || 
      u.first_name?.toLowerCase() === username?.toLowerCase() ||
      u.last_name?.toLowerCase() === username?.toLowerCase()
    );

    if (!user) {
      throw new Error('User not found');
    }

    // In a real application, you would hash the password and compare with password_hash
    // For now, we'll store the user info in localStorage
    localStorage.setItem('authToken', JSON.stringify(user));
    localStorage.setItem('currentUser', JSON.stringify(user));

    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Signup - create a new user
export const signup = async (userData) => {
  try {
    console.log('Signup - Preparing user data:', userData);
    
    const userPayload = {
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      phone_number: userData.contact,
      password_hash: userData.password, // In production, this should be hashed
      role: 'Student',
      booksBought:[],
      booksReserved:[],
    };
    
    console.log('Signup - Sending user data to API:', userPayload);
    
    const user = await createUser(userPayload);
    
    console.log('Signup - Response from API:', user);

    // Store the user info
    localStorage.setItem('authToken', JSON.stringify(user));
    localStorage.setItem('currentUser', JSON.stringify(user));

    return user;
  } catch (error) {
    console.error('Signup error:', error);
    console.error('Error details:', error.response);
    console.error('Error message:', error.message);
    throw error;
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
};

// Get current user
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

