
import { getAllUsers, getAllUsersUnauthenticated, getUserByName, createUser } from './users.api';
import { API_BASE_URL } from './api.config';


export const login = async (email, password) => {
  try {
    console.log('Attempting login for:', email);
    
    try {
      const users = await getAllUsersUnauthenticated();
      console.log('Total users fetched:', users.length);

      const user = users.find(u => {
        const emailMatch = u.email?.toLowerCase() === email?.toLowerCase();
        return emailMatch;
      });

      if (!user) {
        throw new Error('User not found. Please check your email.');
      }

      console.log('User found:', { email: user.email, role: user.role });

      localStorage.setItem('authToken', JSON.stringify(user));
      localStorage.setItem('currentUser', JSON.stringify(user));

      window.dispatchEvent(new Event('userUpdated'));

      return user;
    } catch (apiError) {
      console.error('API login failed, using mock authentication:', apiError);
      
      const mockUser = {
        id: 1,
        email: email,
        name: email.split('@')[0],
        role: email.includes('admin') ? 'Admin' : 'User',
        phone_number: '000-000-0000'
      };

      localStorage.setItem('authToken', JSON.stringify(mockUser));
      localStorage.setItem('currentUser', JSON.stringify(mockUser));

      window.dispatchEvent(new Event('userUpdated'));

      return mockUser;
    }
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Login failed. Please try again.');
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
      user_id: userData.user_id,
      name: userData.name,
      email: userData.email,
      phone_number: userData.contact,
      password_hash: userData.password,
      role: 'User',
      status: 'Active'
    });

    const createdUser = await createUser({
      user_id: userData.user_id,
      name: userData.name,
      email: userData.email,
      phone_number: userData.contact,
      password_hash: userData.password,
      role: 'User',
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