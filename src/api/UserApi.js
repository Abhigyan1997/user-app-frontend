import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/login`, userData);
};

export const fetchUsers = async () => {
  return await axios.get(API_URL);
};

export const updateUser = async (id, userData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      console.error('Error updating user:', error);
      // Optionally, you can throw an error to handle it in the component
      throw error;
    }
  };
export const deleteUser = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
