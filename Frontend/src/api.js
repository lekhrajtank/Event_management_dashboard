import axios from 'axios';

// Use environment variable for API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';  // Default to localhost if not in env

// Login request function
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;  // Contains the JWT token
  } catch (error) {
    const errorMessage = error.response 
      ? error.response.data.message 
      : error.message || 'Server Error';
    throw new Error(errorMessage);
  }
};

// Fetch protected data (example: fetching events)
export const fetchProtectedData = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('No authentication token found');

  try {
    const response = await axios.get(`${API_URL}/events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.message || 'Server Error';
    throw new Error(errorMessage);
  }
};
