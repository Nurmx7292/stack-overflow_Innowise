import type { User } from '../types/auth'

const USER_KEY = 'user'

export const userService = {
  saveUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  removeUser(): void {
    localStorage.removeItem(USER_KEY)
  },

  getUser(): User | null {
    try {
      const userData = localStorage.getItem(USER_KEY)
      if (!userData || userData === 'undefined' || userData === 'null') {
        return null
      }
      
      return JSON.parse(userData)
    } catch (error) {
      console.error('Error parsing user data:', error)
      this.removeUser()
      return null
    }
  },

  isAuthenticated(): boolean {
    const user = this.getUser()
    return !!user
  }
}

