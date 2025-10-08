import { useCallback } from 'react'
import { authService } from '../services/authService'
import { userService } from '../services/userService'
import { useAuthContext } from '../contexts/AuthContext'
import type { LoginCredentials, RegisterCredentials, AuthError } from '../types/auth'

export const useAuth = () => {
  const { state, dispatch } = useAuthContext()

  const handleAuthError = useCallback((error: AuthError): string => {
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
  }, [])

  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    dispatch({ type: 'LOGIN_START' })
    
    try {
      const response = await authService.login(credentials)
      userService.saveUser(response.user, response.token)
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.user })
    } catch (error: any) {
      const errorMessage = handleAuthError(error)
      dispatch({ type: 'LOGIN_ERROR', payload: errorMessage })
      throw new Error(errorMessage)
    }
  }, [dispatch, handleAuthError])

  const register = useCallback(async (credentials: RegisterCredentials): Promise<void> => {
    dispatch({ type: 'LOGIN_START' })
    
    try {
      await authService.register(credentials)
      dispatch({ type: 'SET_LOADING', payload: false })
    } catch (error: any) {
      const errorMessage = handleAuthError(error)
      dispatch({ type: 'LOGIN_ERROR', payload: errorMessage })
      throw new Error(errorMessage)
    }
  }, [dispatch, handleAuthError])

  const logout = useCallback(() => {
    userService.removeUser()
    dispatch({ type: 'LOGOUT' })
  }, [dispatch])

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' })
  }, [dispatch])

  return {
    ...state,
    login,
    register,
    logout,
    clearError
  }
}
