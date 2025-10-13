import { api } from '../lib/api'
import type { 
  User, 
  UserWithStatistic, 
  UpdateUserData, 
  UpdatePasswordData, 
  UpdateResponse,
  UsersParams,
  UsersResponse
} from '../types/user'

export const userApiService = {
  async getCurrentUser(): Promise<User> {
    const response = await api.get('/api/me')
    return response.data.data
  },

  async updateUser(data: UpdateUserData): Promise<UpdateResponse> {
    const response = await api.patch('/api/me', data)
    console.log(response)
    return response.data.data
  },

  async updatePassword(data: UpdatePasswordData): Promise<UpdateResponse> {
    const response = await api.patch('/api/me/password', data)
    return response.data.data
  },

  async deleteUser(): Promise<User> {
    const response = await api.delete('/api/me')
    return response.data.data
  },

  async getUserById(id: number): Promise<User> {
    const response = await api.get(`/api/users/${id}`)
    return response.data.data
  },

  async getUserStatistic(id: number): Promise<UserWithStatistic> {
    const response = await api.get(`/api/users/${id}/statistic`)
    return response.data.data
  },

  async getUsers(params: UsersParams = {}): Promise<UsersResponse> {
    const response = await api.get('/api/users', { params })
    return response.data.data
  }
}
