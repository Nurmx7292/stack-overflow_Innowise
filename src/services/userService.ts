import type { User } from '../types/auth'

const USER_KEY = 'user'

interface UserWithExpiry extends User {
  expiresAt: number
}

export const userService = {
  saveUser(user: User, expiresInHours: number = 24): void {
    const userData: UserWithExpiry = {
      ...user,
      expiresAt: Date.now() + (expiresInHours * 60 * 60 * 1000)
    }
    localStorage.setItem(USER_KEY, JSON.stringify(userData))
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
      
      const user: UserWithExpiry = JSON.parse(userData)
      
      if (user.expiresAt && Date.now() > user.expiresAt) {
        this.removeUser()
        return null
      }
      
      const { expiresAt, ...userWithoutExpiry } = user
      return userWithoutExpiry
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

