export interface User {
  id: number
  username: string
  role: string
}

export interface Snippet {
  id: number
  language: string
  code: string
  user: User
}

export interface SnippetsResponse {
  data: Snippet[]
  meta: {
    itemsPerPage: number
    totalItems: number
    currentPage: number
    totalPages: number
    sortBy: [string, string][]
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

export interface SnippetsParams {
  userId?: number
  page?: number
  limit?: number
  sortBy?: string[]
  search?: string
  searchBy?: string[]
}

export interface CreateSnippetRequest {
  code: string
  language: string
}

export interface UpdateSnippetRequest {
  code?: string
  language?: string
}

export interface MarkSnippetRequest {
  mark: 'like' | 'dislike'
}

export interface MarkSnippetResponse {
  mark: 'like' | 'dislike'
}
