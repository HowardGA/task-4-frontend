import { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/client'; 

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkSession = async () => {
    setIsLoading(true);
    try {
      const responseData = await apiClient.get('/auth/me');

      if (responseData && typeof responseData.user !== 'undefined') {
        setUser(responseData.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
      if (error.response) {
        console.error('Error response details:', error.response);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    setUser,
    checkSession
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};