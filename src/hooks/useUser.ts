import { useQuery, useQueryClient } from '@tanstack/react-query'
import { userService } from '../services/userService'
import type { User } from '../types/auth'

export const useUser = () => {
  const queryClient = useQueryClient()

  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: (): User | null => {
      return userService.getUser()
    },
    enabled: userService.isAuthenticated(),
    staleTime: Infinity,
    retry: false
  })

  const invalidateUser = () => {
    queryClient.invalidateQueries({ queryKey: ['user'] })
  }

  const clearUserCache = () => {
    queryClient.removeQueries({ queryKey: ['user'] })
  }

  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    isAuthenticated: !!userQuery.data,
    invalidateUser,
    clearUserCache
  }
}