import { useMutation } from '@tanstack/react-query'
import { authService } from '../services/authService'
import { userService } from '../services/userService'
import { useAuthContext } from '../contexts/AuthContext'
import type { LoginCredentials, RegisterCredentials, AuthError } from '../types/auth'

export const useAuth = () => {
  const { state, dispatch } = useAuthContext()

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
      userService.saveUser(response.user, response.token)
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.user })
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
    dispatch({ type: 'LOGOUT' })
  }

  return {
    ...state,
    login,
    register,
    logout,
    loginError: loginMutation.error?.message,
    registerError: registerMutation.error?.message,
    isLoginPending: loginMutation.isPending,
    isRegisterPending: registerMutation.isPending
  }
}