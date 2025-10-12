import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authService } from '../services/authService'
import { userService } from '../services/userService'
import { useAuthContext } from '../contexts/AuthContext'
import type { LoginCredentials, RegisterCredentials, AuthError, User } from '../types/auth'

export const useAuth = () => {
  const { state, dispatch } = useAuthContext()
  const queryClient = useQueryClient()

  const userQuery = useQuery({
    queryKey: ['currentUser'],
    queryFn: async (): Promise<User> => {
      try {
        return await authService.getCurrentUser()
      } catch (error: any) {
        if (error.message.includes('401')) {
          userService.removeUser()
          queryClient.removeQueries({ queryKey: ['user'] })
          queryClient.removeQueries({ queryKey: ['currentUser'] })
          dispatch({ type: 'LOGOUT' })
        }
        throw error
      }
    },
    enabled: userService.isAuthenticated(),
    staleTime: 5 * 60 * 1000, 
    retry: (failureCount, error: any) => {
      if (error.message.includes('401')) {
        return false
      }
      return failureCount < 3
    }
  })

  const handleAuthError = (error: AuthError): string => {
    let errorMessage = error.message || 'Authentication failed'
    
    if (error.errors && error.errors.length > 0) {
      const firstError = error.errors[0]
      if (firstError.failures && firstError.failures.length > 0) {
        errorMessage = firstError.failures[0]
      } else if (firstError.message) {
        errorMessage = firstError.message
      }
    }
    
    return errorMessage
  }

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      userService.saveUser(response.data)
      queryClient.setQueryData(['user'], response.data)
      queryClient.setQueryData(['currentUser'], response.data)
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data })
    },
    onError: (error: AuthError) => {
      const errorMessage = handleAuthError(error)
      throw new Error(errorMessage)
    }
  })

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onError: (error: AuthError) => {
      const errorMessage = handleAuthError(error)
      throw new Error(errorMessage)
    }
  })

  const login = async (credentials: LoginCredentials): Promise<void> => {
    await loginMutation.mutateAsync(credentials)
  }

  const register = async (credentials: RegisterCredentials): Promise<void> => {
    await registerMutation.mutateAsync(credentials)
  }

  const logout = () => {
    userService.removeUser()
    queryClient.removeQueries({ queryKey: ['user'] })
    queryClient.removeQueries({ queryKey: ['currentUser'] })
    queryClient.clear()
    dispatch({ type: 'LOGOUT' })
  }

  const currentUser = userQuery.data || userService.getUser() || state.user
  const isAuthenticated = !!currentUser

  return {
    user: currentUser,
    isAuthenticated,
    login,
    register,
    logout,
    loginError: loginMutation.error?.message,
    registerError: registerMutation.error?.message,
    isLoginPending: loginMutation.isPending,
    isRegisterPending: registerMutation.isPending,
    isUserLoading: userQuery.isLoading
  }
}