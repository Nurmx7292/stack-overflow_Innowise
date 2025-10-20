import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authService } from '../services/authService'
import { userService } from '../services/userService'
import { useAuthContext } from '../contexts/AuthContext'
import type { LoginCredentials, RegisterCredentials } from '../types/auth'

export const useAuth = () => {
  const { state, dispatch } = useAuthContext()
  const queryClient = useQueryClient()

  const userQuery = useQuery({
    queryKey: ['currentUser'],
    queryFn: authService.getCurrentUser,
    enabled: userService.isAuthenticated(),
    staleTime: 5 * 60 * 1000, 
    retry: (failureCount, error: any) => {
      if (error.response?.status === 401) {
        return false
      }
      return failureCount < 3
    }
  })

  const handleAuthError = (error: any): string => {
    const errors = error?.response?.data?.errors
    if (Array.isArray(errors) && errors.length > 0) {
      const failures = errors[0]?.failures
      if (Array.isArray(failures) && failures.length > 0) {
        return failures[0]
      }
    }
    if (error.response?.data?.message) return error.response.data.message
    if (error.message) return error.message
    return 'Authentication failed'
  }

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      userService.saveUser(response.data)
      queryClient.setQueryData(['user'], response.data)
      queryClient.setQueryData(['currentUser'], response.data)
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data })
    },
    onError: () => {}
  })

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onError: () => {}
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
    loginError: loginMutation.error ? handleAuthError(loginMutation.error) : undefined,
    registerError: registerMutation.error ? handleAuthError(registerMutation.error) : undefined,
    isLoginPending: loginMutation.isPending,
    isRegisterPending: registerMutation.isPending,
    isUserLoading: userQuery.isLoading
  }
}