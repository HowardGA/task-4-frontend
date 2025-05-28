import { useQuery, useMutation } from '@tanstack/react-query';
import { getUsers, blockUsers, deleteUsers, activateUsers } from './userServices';

export const useUsers = (params = {}) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsers(params),
    select: (data) => ({
      users: data.data,
      pagination: data.pagination,
      sorting: data.sorting
    }),
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true
  });
};


export const useBlockUsers = (options = {}) => {
  return useMutation({
    mutationFn: blockUsers,
    ...options,
  });
};

export const useDeleteUsers = (options = {}) => {
  return useMutation({
    mutationFn: deleteUsers,
    ...options,
  });
};

export const useActivateUsers = (options = {}) => {
  return useMutation({
    mutationFn: activateUsers,
    ...options,
  });
};