export interface UserStatistic {
  snippetsCount: number
  rating: number
  commentsCount: number
  likesCount: number
  dislikesCount: number
  questionsCount: number
  correctAnswersCount: number
  regularAnswersCount: number
}

export interface UserWithStatistic {
  id: number
  username: string
  role: string
  statistic: UserStatistic
}

export interface UpdateUserData {
  username: string
}

export interface UpdatePasswordData {
  oldPassword: string
  newPassword: string
}

export interface UpdateResponse {
  updatedCount: number
}

export interface UsersParams {
  page?: number
  limit?: number
  sortBy?: string[]
  search?: string
  searchBy?: string[]
}

export interface UsersMeta {
  itemsPerPage: number
  totalItems: number
  currentPage: number
  totalPages: number
  sortBy: [string, 'ASC' | 'DESC'][]
  searchBy: string[]
  search: string
  select: string[]
  filter: Record<string, any>
}

export interface UsersLinks {
  first: string
  previous: string
  current: string
  next: string
  last: string
}

export interface UsersResponse {
  data: User[]
  meta: UsersMeta
  links: UsersLinks
}

export interface User {
  id: number
  username: string
  role: string
}
