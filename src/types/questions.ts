export interface User {
  id: string
  username: string
  role: string
}

export interface Answer {
  id: string
  content: string
  questionId: string
  user: User
  isCorrect: boolean
}

export interface Question {
  id: string
  title: string
  description: string
  attachedCode?: string
  user: User
  answers?: Answer[]
  isResolved: boolean
}

export interface QuestionsParams {
  page?: number
  limit?: number
  sortBy?: string[]
  search?: string
  searchBy?: string[]
  userId?: string
}

export interface QuestionsResponse {
  data: Question[]
  meta: {
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
  links: {
    first: string
    previous: string
    current: string
    next: string
    last: string
  }
}

export interface CreateQuestionRequest {
  title: string
  description: string
  attachedCode?: string
}

export interface UpdateQuestionRequest {
  title?: string
  description?: string
  attachedCode?: string
}

export interface CreateAnswerRequest {
  content: string
  questionId: string
}

export interface UpdateAnswerRequest {
  content: string
}

export type AnswerState = 'correct' | 'incorrect'
