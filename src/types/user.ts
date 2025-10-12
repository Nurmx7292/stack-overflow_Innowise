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
