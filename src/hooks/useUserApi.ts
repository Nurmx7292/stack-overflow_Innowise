import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userApiService } from '../services/userApiService'
import { userService } from '../services/userService'
import type { 
  UpdateUserData, 
  UpdatePasswordData, 
  UsersParams 
} from '../types/user'

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: userApiService.getCurrentUser,
    enabled: userService.isAuthenticated(),
    staleTime: 5 * 60 * 1000,
    retry: 3
  })
}

export const useUserById = (id: number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => userApiService.getUserById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 3
  })
}

export const useUserStatistic = (id: number) => {
  return useQuery({
    queryKey: ['userStatistic', id],
    queryFn: () => userApiService.getUserStatistic(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 3
  })
}

export const useUsers = (params: UsersParams = {}) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => userApiService.getUsers(params),
    staleTime: 5 * 60 * 1000,
    retry: 3
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: userApiService.updateUser,
    onSuccess: (_, variables) => {
      const currentUser = queryClient.getQueryData(['currentUser']) as any
      
      if (currentUser) {
        const updatedUser = { ...currentUser, username: variables.username }
        
        queryClient.setQueryData(['currentUser'], updatedUser)
        queryClient.setQueryData(['user'], updatedUser)
        
        userService.saveUser(updatedUser)
      }
      
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    retry: 1
  })
}

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: userApiService.updatePassword,
    retry: 1
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: userApiService.deleteUser,
    onSuccess: () => {
      queryClient.clear()
      userService.removeUser()
    },
    retry: 1
  })
}
