import apiClient from "../client";

export const getUsers = async (params = {}) => {
  try {
    return await apiClient.get('/users', { params });
  } catch (error) {
    console.error('Users fetch error:', error.response?.data || error.message);
    throw error;
  }
};

export const blockUsers = async (users) => {
  try {
    return await apiClient.put('/users/block',{users:users});
  } catch (error) {
    console.error('Error while blocking users:', error.response?.data || error.message);
    throw error;
  }
}

export const deleteUsers = async (users) => {
  try {
    return await apiClient.delete('/users/delete', { data: {users:users} });
  } catch (error) {
    console.error('Error while deleting users:', error.response?.data || error.message);
    throw error;
  }
}

export const activateUsers = async (users) => {
  try {
    return await apiClient.put('/users/activate', {users:users});
  } catch (error) {
    console.error('Error while activating users:', error.response?.data || error.message);
    throw error;
  }
}