
import { getAllUsers, getUserByName, createUser } from './users.api';
import { API_BASE_URL } from './api.config';


export const login = async (username, password) => {
  try {
    const users = await getAllUsers();
    
    console.log('Login attempt with username:', username);
    console.log('Total users fetched:', users.length);

    const user = users.find(u => {
      console.log('Checking user:', {
        email: u.email,
        username: u.username,
        name: u.name,
        user_id: u.user_id
      });
      
      const emailMatch = u.email?.toLowerCase() === username?.toLowerCase();
      const usernameMatch = u.username?.toLowerCase() === username?.toLowerCase();
      const nameMatch = u.name?.toLowerCase() === username?.toLowerCase();
      const userIdMatch = u.user_id?.toString() === username?.toString();
      
      console.log('Match results:', {
        emailMatch,
        usernameMatch,
        nameMatch,
        userIdMatch
      });
      
      return emailMatch || usernameMatch || nameMatch || userIdMatch;
    });

    if (!user) {
      console.error('User not found. Available users:', users.map(u => ({
        email: u.email,
        username: u.username,
        name: u.name,
        user_id: u.user_id
      })));
      throw new Error('User not found. Please check your username.');
    }

    console.log('User found:', { email: user.email, role: user.role });

    localStorage.setItem('authToken', JSON.stringify(user));
    localStorage.setItem('currentUser', JSON.stringify(user));

    window.dispatchEvent(new Event('userUpdated'));

    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const signup = async (userData) => {
  try {
    const users = await getAllUsers();
    const existingUser = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());

    if (existingUser) {
      throw new Error('This email is already linked to another account.');
    }

    console.log('Creating user with data:', {
      name: userData.name,
      username: userData.username,
      email: userData.email,
      phone_number: userData.contact,
      password_hash: userData.password,
      role: 'Member',
      status: 'Active'
    });

    const createdUser = await createUser({
      name: userData.name,
      username: userData.username,
      email: userData.email,
      phone_number: userData.contact,
      password_hash: userData.password,
      role: 'Member',
      status: 'Active'
    });

    console.log('API response after createUser:', createdUser);

    let user = createdUser;

    if (!createdUser || createdUser === '' || typeof createdUser === 'string') {
      console.log('API returned empty/invalid response, fetching user by email...');
      const allUsers = await getAllUsers();
      user = allUsers.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
      console.log('Found user after fetch:', user);
    }

    if (!user || !user.email) {
      throw new Error('Failed to create or retrieve user account');
    }

    localStorage.setItem('authToken', JSON.stringify(user));
    localStorage.setItem('currentUser', JSON.stringify(user));

    console.log('User saved to localStorage:', user);

    window.dispatchEvent(new Event('userUpdated'));

    return user;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
  window.dispatchEvent(new Event('userUpdated'));
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};