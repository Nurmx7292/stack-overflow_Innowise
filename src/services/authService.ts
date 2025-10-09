import type { LoginCredentials, RegisterCredentials, User, AuthError } from '../types/auth'

const API_BASE_URL = 'https://codelang.vercel.app'

export interface AuthResponse {
  user: User
  token: string
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

    return data
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

    return data
  },

  async getCurrentUser(): Promise<User> {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('No token found')
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to get user')
    }

    return data
  }
}
