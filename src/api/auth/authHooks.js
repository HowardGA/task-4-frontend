import {useMutation, useQuery} from '@tanstack/react-query';
import { login, createUser, getSession,logout } from './authServices';
import { useAuth } from '../../context/AuthContenxt';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (credentials) => login(credentials),
        onSuccess: (response) => {
            setUser(response.user); 
            navigate('/admin');
        },
        onError: (error) => {
          console.error(error)
        }
    })
}

export const useRegister = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => createUser(data),
    onSuccess: (response) => {
        console.log(response)
        setUser(response.user);
        navigate(response.user.status === 'BLOCKED' ? '/login' : '/admin');
    }
  });
};


export const useSession = () => {
  return useQuery({
    queryKey: ['auth-session'],
    queryFn: async () => {
      const sessionData = await getSession(); 
      return sessionData.user || null;
    },
    retry: false,
    staleTime: 5 * 60 * 1000, 
    refetchOnWindowFocus: true 
  });
};

export const useLogout = () => {
    const { setUser } = useAuth();
    return useMutation({
    mutationFn:logout,
    onSuccess: () => {
      setUser(null);
    }
  });
}