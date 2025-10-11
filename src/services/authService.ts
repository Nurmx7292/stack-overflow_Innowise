import type { LoginCredentials, RegisterCredentials, User, AuthError } from '../types/auth'

const API_BASE_URL = 'https://codelang.vercel.app'

export interface AuthResponse {
  user: User
}


export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    const data = await response.json()

    if (!response.ok) {
      const error: AuthError = {
        message: data.message || 'Login failed',
        errors: data.errors
      }
      throw error
    }
    return data.data
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      const error: AuthError = {
        message: data.message || 'Registration failed',
        errors: data.errors
      }
      throw error
    }

    return data.data
  },

  async getCurrentUser(): Promise<User> {
    const user = localStorage.getItem('user')
    if (!user) {
      throw new Error('No user found')
    }

    try {
      const userData = JSON.parse(user)
      if (userData.expiresAt && Date.now() > userData.expiresAt) {
        throw new Error('Session expired')
      }
      const { expiresAt, ...userWithoutExpiry } = userData
      return userWithoutExpiry
    } catch (error) {
      throw new Error('Invalid user data')
    }
  }
}
