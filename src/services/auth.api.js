
import { getAllUsers, createUser } from './users.api';


export const login = async (phoneNumber, password) => {
  try {
    const users = await getAllUsers();
    
    if (!Array.isArray(users)) {
      throw new Error('Failed to fetch users. Please try again.');
    }
    
    console.log('Total users fetched:', users.length);

    const normalizedPhone = String(phoneNumber || '').trim();
    const user = users.find(
      (u) => String(u.phone_number || '').trim() === normalizedPhone,
    );

    if (!user) {
      console.error('User not found for phone number:', phoneNumber);
      throw new Error('User not found. Please check your phone number.');
    }

    console.log('User found:', { phone_number: user.phone_number, role: user.role });

    const storedPassword = user.password_hash || user.password || '';
    if (storedPassword !== password) {
      console.error('Password mismatch for user:', phoneNumber);
      throw new Error('Incorrect password. Please try again.');
    }

    console.log('Password verified successfully');

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
    if (!Array.isArray(users)) {
      throw new Error('Failed to fetch users. Please try again.');
    }
    const existingUser = users.find(
      (u) => String(u.phone_number || '').trim() === String(userData.contact || '').trim(),
    );

    if (existingUser) {
      throw new Error('This phone number is already linked to another account.');
    }

    console.log('Creating user with data:', {
      user_id: userData.user_id,
      name: userData.name,
      phone_number: userData.contact,
      password_hash: userData.password,
      role: 'User',
      status: 'Active'
    });

    const createdUser = await createUser({
      user_id: userData.user_id,
      name: userData.name,
      phone_number: userData.contact,
      password_hash: userData.password,
      role: 'User',
      status: 'Active'
    });

    console.log('API response after createUser:', createdUser);

    let user = createdUser;

    if (!createdUser || createdUser === '' || typeof createdUser === 'string') {
      console.log('API returned empty/invalid response, fetching user by phone number...');
      const allUsers = await getAllUsers();
      user = Array.isArray(allUsers)
        ? allUsers.find(
            (u) => String(u.phone_number || '').trim() === String(userData.contact || '').trim(),
          )
        : null;
      console.log('Found user after fetch:', user);
    }

    if (!user || !user.user_id) {
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

export const setCurrentUser = (user) => {
  localStorage.setItem('authToken', JSON.stringify(user));
  localStorage.setItem('currentUser', JSON.stringify(user));
  window.dispatchEvent(new Event('userUpdated'));
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};