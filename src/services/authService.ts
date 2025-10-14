import { api } from '../lib/api'
import type { LoginCredentials, RegisterCredentials, User } from '../types/auth'

export interface AuthResponse {
  data: User
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/api/auth/login', credentials)
    return response.data
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await api.post('/api/register', {
      username: credentials.username,
      password: credentials.password
    })
    return response.data
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/api/me')
    return response.data.data
  }
}
