import apiClient from "../client";

export const login = async (credentials) => {
  try {
    return await apiClient.post('/auth/login', credentials);
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error
}};

export const createUser = async (userData) => {
  try {
    return await apiClient.post('/auth/register', userData);
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};

export const getSession = async () => {
  try {
    const { data } = await apiClient.get('/auth/me');
    return data || { user: null }; 
  } catch (error) {
    if (error.response?.status === 401) {
      return { user: null };
    }
    console.error('Session error:', error.message);
    return { user: null };
  }
};

export const logout = async () => {
  try{
    return await apiClient.post('/auth/logout')
  } catch (error) {
    console.error('Logout error:', error.response?.data || error.message);
    throw error;
  }
}
