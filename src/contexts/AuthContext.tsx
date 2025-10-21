import { createContext, useContext, useReducer, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { AuthState } from '../types/auth'
import { userService } from '../services/userService'

interface AuthAction {
  type: 'LOGIN_SUCCESS' | 'LOGOUT'
  payload?: any
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false
      }
    default:
      return state
  }
}

interface AuthContextValue {
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const user = userService.getUser()
    
    if (user && userService.isAuthenticated()) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: user })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}